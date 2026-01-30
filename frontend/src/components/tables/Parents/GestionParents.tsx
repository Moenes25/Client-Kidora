import { useState, useMemo, useEffect } from "react";
import ParentForm from "./ParentForm";
import ParentDetails from "./ParentDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import ParentsTable from "./ParentsTable";
import { convertBackendToFrontend, CreateParentDto, Parent, UpdateParentDto } from "./types";
import { tableData } from "./types";
import { parentApi } from "../../../services/api/parentApi";
import { StatutClient } from "../../../types/auth.types";
import { enfantApi } from "../../../services/api/enfantApi";
import { RefreshCw, Search, Filter, X, Check, Ban, Trash2, UserPlus } from "lucide-react";

export default function GestionParents() {
  // Filtres
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [relationFilter, setRelationFilter] = useState<string>("");
  const [query, setQuery] = useState("");

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Données
  const [parents, setParents] = useState<Parent[]>(tableData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sélection multiple
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => { fetchParents(); }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      setError(null);
      const parentsData = await parentApi.getAllParents();
      const enfantsData = await enfantApi.getAllEnfants();
      parentsData.forEach((p) => {
        const enfantFiltered = enfantsData.filter((e) => e.parentId === p.id);
        p.enfants.images = enfantFiltered.map((e) => e.imageUrl);
      });
      setParents(parentsData);
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des parents:", error);
    } finally {
      setLoading(false);
    }
  };

  // Options filtres
  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(parents.map((p) => p.statut)));
    return ["Tous", ...statuts];
  }, [parents]);

  const relationOptions = useMemo(() => {
    const relations = Array.from(new Set(parents.map((p) => p.relation)));
    return ["Toutes", ...relations];
  }, [parents]);

  // Filtre + recherche
  const filteredData = useMemo(() => {
    const f1 = parents.filter((p) => {
      const okS = !statutFilter || statutFilter === "Tous" || p.statut === statutFilter;
      const okR = !relationFilter || relationFilter === "Toutes" || p.relation === relationFilter;
      return okS && okR;
    });

    const q = query.trim().toLowerCase();
    if (!q) return f1;

    return f1.filter(
      (p) =>
        `${p.nom} ${p.prenom}`.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.telephone?.toLowerCase().includes(q)
    );
  }, [parents, statutFilter, relationFilter, query]);

  // Sélection
  useEffect(() => {
    setIsAllSelected(selectedParents.length === filteredData.length && filteredData.length > 0);
  }, [selectedParents, filteredData]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedParents([]);
    } else {
      setSelectedParents(filteredData.map((p) => p.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectParent = (id: string) => {
    setSelectedParents((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Actions groupées
  const handleActivateSelected = async () => {
    try {
      await Promise.all(selectedParents.map((id) => parentApi.updateParent(id, { statutClient: StatutClient.ACTIF })));
      setParents((prev) => prev.map((p) => (selectedParents.includes(p.id) ? { ...p, statut: "Actif" } : p)));
      setSelectedParents([]);
      alert(`${selectedParents.length} parent(s) activé(s) avec succès`);
    } catch (error: any) {
      console.error("Erreur lors de l'activation multiple:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeactivateSelected = async () => {
    try {
      await Promise.all(selectedParents.map((id) => parentApi.updateParent(id, { statutClient: StatutClient.INACTIF })));
      setParents((prev) => prev.map((p) => (selectedParents.includes(p.id) ? { ...p, statut: "Inactif" } : p)));
      alert(`${selectedParents.length} parent(s) désactivé(s) avec succès`);
      setSelectedParents([]);
    } catch (error: any) {
      console.error("Erreur lors de la désactivation multiple:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedParents.length) return;
    const ok = window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedParents.length} parent(s) ?`);
    if (!ok) return; // <-- fix: on ne supprime que si confirmé

    try {
      await Promise.all(selectedParents.map((id) => parentApi.deleteParent(id)));
      setParents((prev) => prev.filter((p) => !selectedParents.includes(p.id)));
      setSelectedParents([]);
      alert(`${selectedParents.length} parent(s) supprimé(s) avec succès`);
    } catch (error: any) {
      console.error("Erreur lors de la suppression multiple:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleCancelSelection = () => setSelectedParents([]);

  // CRUD
  const handleCreateParent = async (parentData: CreateParentDto | UpdateParentDto, imageFile?: File): Promise<boolean> => {
    try {
      if ("email" in parentData && "password" in parentData) {
        const newUser = await parentApi.createParent(parentData as CreateParentDto, imageFile);
        const newParent = convertBackendToFrontend(newUser);
        setParents((prev) => [...prev, newParent]);
        await fetchParents();
        alert("Parent créé avec succès");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Erreur lors de la création du parent:", error);
      alert(`Erreur : ${error.message}`);
      return false;
    }
  };

  const handleEditParent = async (parentData: UpdateParentDto, imageFile?: File): Promise<boolean> => {
    if (!selectedParent) return false;
    try {
      const updatedUser = await parentApi.updateParent(selectedParent.id, parentData, imageFile);
      const updatedParent = convertBackendToFrontend(updatedUser);
      setParents((prev) => prev.map((p) => (p.id === updatedParent.id ? updatedParent : p)));
      await fetchParents();
      setShowEditModal(false);
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour:", error);
      alert(`Erreur: ${error.message}`);
      return false;
    }
  };

  const handleDeleteParent = async (id: string) => {
    try {
      await parentApi.deleteParent(id);
      setParents((prev) => prev.filter((p) => p.id !== id));
      setShowDeleteModal(false);
      alert("Parent supprimé avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Actions individuelles
  const handleViewDetails = (parent: Parent) => { setSelectedParent(parent); setShowViewModal(true); };
  const handleEdit = (parent: Parent) => { setSelectedParent(parent); setShowEditModal(true); };
  const handleDelete = (parent: Parent) => { setSelectedParent(parent); setShowDeleteModal(true); };

  // Loading / Error
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des parents…</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-red-700">{error}</span>
            <button
              onClick={fetchParents}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" /> Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* Toolbar */}
        <div className="border-b border-gray-100 bg-gray-50/60 p-4 dark:border-white/[0.05] dark:bg-gray-900/40">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Gauche: recherche + filtres */}
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher (nom, email, tél.)"
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={relationFilter}
                  onChange={(e) => setRelationFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {relationOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <select
                  value={statutFilter}
                  onChange={(e) => setStatutFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {statutOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <button
                  onClick={() => { setRelationFilter(""); setStatutFilter(""); setQuery(""); }}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
                >
                  <X className="h-4 w-4" /> Réinitialiser
                </button>
              </div>
            </div>

            {/* Droite: actions rapides */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchParents}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
                title="Rafraîchir"
              >
                <RefreshCw className="h-4 w-4" /> Rafraîchir
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
                title="Nouveau parent"
              >
                <UserPlus className="h-4 w-4" /> Nouveau Parent
              </button>
            </div>
          </div>

          {/* Compteur */}
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredData.length} parent(s) trouvé(s)
            {selectedParents.length > 0 && (
              <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">• {selectedParents.length} sélectionné(s)</span>
            )}
          </div>
        </div>

        {/* Header actions groupées */}
        {selectedParents.length > 0 && (
          <div className="sticky top-0 z-10 border-b border-emerald-600/20 bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                {selectedParents.length} sélectionné(s)
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleActivateSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                  <Check className="h-4 w-4" /> Activer
                </button>
                <button onClick={handleDeactivateSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                  <Ban className="h-4 w-4" /> Désactiver
                </button>
                <button onClick={handleDeleteSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                  <Trash2 className="h-4 w-4" /> Supprimer
                </button>
                <button onClick={handleCancelSelection} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                  <X className="h-4 w-4" /> Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table / Vide */}
        {parents.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <UsersRound className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucun parent trouvé</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Commencez par ajouter votre premier parent.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Ajouter un parent
            </button>
          </div>
        ) : (
          <ParentsTable
            parents={filteredData}
            selectedParents={selectedParents}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            onSelectParent={handleSelectParent}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modals */}
      <ParentForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateParent}
        title="Nouveau Parent"
        subtitle="Remplissez les informations du parent"
        isEdit={false}
      />
      <ParentForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        parent={selectedParent}
        onSave={handleEditParent}
        title="Modifier le Parent"
        subtitle={`Modifiez les informations de ${selectedParent?.nom} ${selectedParent?.prenom}`}
        isEdit={true}
      />
      <ParentDetails isOpen={showViewModal} onClose={() => setShowViewModal(false)} parent={selectedParent} />
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        parent={selectedParent}
        onConfirm={() => selectedParent && handleDeleteParent(selectedParent.id)}
      />
    </>
  );
}
