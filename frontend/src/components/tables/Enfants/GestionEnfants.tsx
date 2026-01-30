import { useEffect, useState, useMemo } from "react";
import EnfantsTable from "./EnfantsTable";
import EnfantForm from "./EnfantForm";
import EnfantDetails from "./EnfantDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Enfant, EnfantFormData } from "./types";
import { enfantApi, EnfantResponse } from "../../../services/api/enfantApi";
import { parentApi } from "../../../services/api/parentApi";
import { Parent } from "../Parents/types";
import { StatutClient } from "../../../types/auth.types";
import { RefreshCw, Search, X, Trash2, Check, Ban, Plus } from "lucide-react";

type ParentOption = { label: string; value: string };

export default function GestionEnfants() {
  // vue + filtres + recherche
  const [viewMode, setViewMode] = useState<"liste" | "grille">("liste");
  const [classeFilter, setClasseFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>(""); // parentId
  const [query, setQuery] = useState("");

  // data
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // sélection multiple
  const [selectedEnfants, setSelectedEnfants] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);

  // modals + forms
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(null);
  const [editForm, setEditForm] = useState<EnfantFormData>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEnfant, setNewEnfant] = useState<EnfantFormData & { parentId: string }>({
    nom: "",
    prenom: "",
    age: 3,
    classe: "Petite Section",
    image: "/images/default-child.jpg",
    statut: StatutClient.EN_ATTENTE,
    parentId: ""
  });

  const [parents, setParents] = useState<Parent[]>([]);
  const parentOptions: ParentOption[] = useMemo(
    () => [{ label: "Tous", value: "" }, ...parents.map(p => ({ label: `${p.prenom} ${p.nom}`, value: p.id }))],
    [parents]
  );

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [enfantsData, parentsData] = await Promise.all([
        enfantApi.getAllEnfants(),
        parentApi.getAllParents()
      ]);
      setParents(parentsData);

      const converted: Enfant[] = enfantsData.map((e: EnfantResponse) => ({
        id: e.idEnfant,
        nom: e.nom,
        prenom: e.prenom,
        age: e.age,
        classe: e.classe,
        imageUrl: e.imageUrl || "/images/default-child.jpg",
        parentId: e.parentId || "",
        statut: StatutClient.ACTIF,
        dateInscription: new Date().toISOString().split("T")[0],
        dernierAcces: new Date().toISOString().split("T")[0]
      }));

      setEnfants(converted);
    } catch (e: any) {
      setError(`Erreur de chargement: ${e.message}`);
      console.error("Erreur lors du chargement des données:", e);
    } finally {
      setLoading(false);
    }
  };

  // filtrage + recherche
  const filteredEnfants = useMemo(() => {
    let base = [...enfants];

    if (classeFilter && classeFilter !== "Toutes") {
      base = base.filter(e => e.classe === classeFilter);
    }

    if (statutFilter && statutFilter !== "Tous") {
      base = base.filter(e =>
        statutFilter === "Actif" ? e.statut === StatutClient.ACTIF :
        statutFilter === "Inactif" ? e.statut === StatutClient.INACTIF :
        statutFilter === "En attente" ? e.statut === StatutClient.EN_ATTENTE : true
      );
    }

    if (parentFilter) {
      base = base.filter(e => e.parentId === parentFilter); // <-- FIX : filtre sur parentId
    }

    const q = query.trim().toLowerCase();
    if (q) {
      base = base.filter(e => {
        const parent = parents.find(p => p.id === e.parentId);
        const parentName = parent ? `${parent.prenom} ${parent.nom}`.toLowerCase() : "";
        return (
          `${e.prenom} ${e.nom}`.toLowerCase().includes(q) ||
          e.classe.toLowerCase().includes(q) ||
          parentName.includes(q)
        );
      });
    }

    // reset sélection quand ça change
    setSelectedEnfants([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);

    return base;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enfants, classeFilter, statutFilter, parentFilter, query, parents]);

  // options
  const classeOptions = ["Toutes","Toute Petite Section","Petite Section","Moyenne Section","Grande Section","CP","CE1"];
  const statutOptions = ["Tous", "Actif", "Inactif", "En attente"];

  // sélection
  const handleSelectEnfant = (id: string) => {
    setSelectedEnfants(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      setShowSelectionHeader(next.length > 0);
      setIsSelectAll(next.length === filteredEnfants.length);
      return next;
    });
  };
  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedEnfants([]);
      setIsSelectAll(false);
      setShowSelectionHeader(false);
    } else {
      const allIds = filteredEnfants.map(e => e.id);
      setSelectedEnfants(allIds);
      setIsSelectAll(true);
      setShowSelectionHeader(true);
    }
  };
  const handleCancelSelection = () => {
    setSelectedEnfants([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  };

  // actions groupées
  const handleBulkActivate = async () => {
    if (!selectedEnfants.length) return;
    try {
      await Promise.all(selectedEnfants.map(id =>
        enfantApi.updateEnfant(id, { /* payload côté serveur si besoin */ })
      ));
      setEnfants(prev => prev.map(e => selectedEnfants.includes(e.id) ? { ...e, statut: StatutClient.ACTIF } : e));
      handleCancelSelection();
      alert("Enfant(s) activé(s) avec succès");
    } catch (e: any) {
      console.error(e);
      alert(`Erreur: ${e.message}`);
    }
  };

  const handleBulkDeactivate = async () => {
    if (!selectedEnfants.length) return;
    try {
      await Promise.all(selectedEnfants.map(id =>
        enfantApi.updateEnfant(id, { /* payload côté serveur si besoin */ })
      ));
      setEnfants(prev => prev.map(e => selectedEnfants.includes(e.id) ? { ...e, statut: StatutClient.INACTIF } : e));
      handleCancelSelection();
      alert("Enfant(s) désactivé(s) avec succès");
    } catch (e: any) {
      console.error(e);
      alert(`Erreur: ${e.message}`);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedEnfants.length) return;
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEnfants.length} enfant(s) ?`)) return;
    try {
      await Promise.all(selectedEnfants.map(id => enfantApi.deleteEnfant(id)));
      setEnfants(prev => prev.filter(e => !selectedEnfants.includes(e.id)));
      handleCancelSelection();
      alert("Suppression effectuée");
    } catch (e: any) {
      console.error("Erreur lors de la suppression multiple:", e);
      alert(`Erreur: ${e.message}`);
    }
  };

  // handlers individuels (inchangés sauf petites sécurités)
  const handleView = (e: Enfant) => { setSelectedEnfant(e); setModalType("view"); };
  const handleEdit = (e: Enfant) => {
    setSelectedEnfant(e);
    setEditForm({
      nom: e.nom,
      prenom: e.prenom,
      age: e.age,
      classe: e.classe,
      statut: e.statut,
      image: e.imageUrl,
      parentId: e.parentId
    });
    setModalType("edit");
  };
  const handleDelete = (e: Enfant) => { setSelectedEnfant(e); setModalType("delete"); };

  const handleSaveEdit = async () => {
    if (!selectedEnfant) return;
    try {
      await enfantApi.updateEnfant(selectedEnfant.id, {
        nom: editForm.nom || "",
        prenom: editForm.prenom || "",
        age: editForm.age || 3,
        classe: editForm.classe || ""
      });
      setEnfants(prev => prev.map(x => (x.id === selectedEnfant.id ? { ...x, ...editForm } : x)));
      closeModal();
    } catch (e: any) {
      console.error("Erreur...", e);
      alert(`Erreur: ${e.message}`);
    }
  };

  const confirmDelete = async () => {
    if (!selectedEnfant) return;
    try {
      await enfantApi.deleteEnfant(selectedEnfant.id);
      setEnfants(prev => prev.filter(e => e.id !== selectedEnfant.id));
      setSelectedEnfants(prev => prev.filter(id => id !== selectedEnfant.id));
      alert(`Enfant "${selectedEnfant.prenom} ${selectedEnfant.nom}" supprimé`);
      closeModal();
    } catch (e: any) {
      console.error("Erreur lors de la suppression:", e);
      alert(`Erreur: ${e.message}`);
    }
  };

  const closeModal = () => {
    setSelectedEnfant(null);
    setModalType(null);
    setEditForm({});
  };

  // ajout
  const handleAddNew = () => setIsAddModalOpen(true);

  const handleSaveNew = async () => {
    try {
      if (!newEnfant.parentId) throw new Error("Veuillez sélectionner un parent valide");
      if (!imageFile) throw new Error("Veuillez sélectionner une photo pour l'enfant");

      const res = await enfantApi.ajouterEnfant(
        {
          nom: newEnfant.nom || "",
          prenom: newEnfant.prenom || "",
          age: newEnfant.age || 3,
          classe: newEnfant.classe || "Petite Section"
        },
        newEnfant.parentId,
        imageFile
      );

      const created: Enfant = {
        id: res.idEnfant,
        nom: res.nom,
        prenom: res.prenom,
        age: res.age,
        classe: res.classe,
        imageUrl: res.imageUrl || "/images/default-child.jpg",
        parentId: res.parentId,
        statut: StatutClient.ACTIF,
        dateInscription: new Date().toISOString().split("T")[0],
        dernierAcces: new Date().toISOString().split("T")[0]
      };

      setEnfants(prev => [...prev, created]);
      setNewEnfant({
        nom: "",
        prenom: "",
        age: 3,
        classe: "Petite Section",
        image: "/images/default-child.jpg",
        statut: StatutClient.EN_ATTENTE,
        parentId: ""
      });
      setImageFile(null);
      setIsAddModalOpen(false);
      alert(`Enfant "${created.prenom} ${created.nom}" ajouté avec succès`);
    } catch (e: any) {
      console.error("Erreur lors de l'ajout:", e);
      alert(`Erreur: ${e.message}`);
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewEnfant({
      nom: "",
      prenom: "",
      age: 3,
      classe: "Petite Section",
      image: "/images/default-child.jpg",
      statut: StatutClient.EN_ATTENTE,
      parentId: ""
    });
    setImageFile(null);
  };

  const getParentInfo = (parentId: string) => {
    const p = parents.find(pp => pp.id === parentId);
    return p || ({ nom: "Non", prenom: "Parent", image: "/images/default-parent.jpg", email: "", telephone: "", id: parentId } as Parent);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des enfants…</p>
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
              onClick={fetchData}
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Toolbar : recherche + filtres + actions rapides */}
      <div className="border-b border-gray-100 bg-gray-50/60 p-4 dark:border-white/[0.05] dark:bg-gray-900/40">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Gauche */}
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (nom, classe, parent)"
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <select
              value={classeFilter}
              onChange={(e) => setClasseFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
            >
              {classeOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <select
              value={statutFilter}
              onChange={(e) => setStatutFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
            >
              {statutOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            {/* FIX : value=id, affichage=nom complet */}
            <select
              value={parentFilter}
              onChange={(e) => setParentFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
            >
              {parentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              onClick={() => { setClasseFilter(""); setStatutFilter(""); setParentFilter(""); setQuery(""); }}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
            >
              <X className="h-4 w-4" /> Réinitialiser
            </button>
          </div>

          {/* Droite */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
              title="Rafraîchir"
            >
              <RefreshCw className="h-4 w-4" /> Rafraîchir
            </button>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
              title="Nouvel enfant"
            >
              <Plus className="h-4 w-4" /> Nouvel Enfant
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredEnfants.length} enfant(s) trouvé(s)
          {selectedEnfants.length > 0 && (
            <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">
              • {selectedEnfants.length} sélectionné(s)
            </span>
          )}
        </div>
      </div>

      {/* Header d’actions groupées */}
      {showSelectionHeader && (
        <div className="sticky top-0 z-10 border-b border-emerald-600/20 bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
              {selectedEnfants.length} sélectionné(s)
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleBulkActivate} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                <Check className="h-4 w-4" /> Activer
              </button>
              <button onClick={handleBulkDeactivate} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
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

      {/* Table/Grid */}
      <EnfantsTable
        enfants={filteredEnfants}
        viewMode={viewMode}
        selectedEnfants={selectedEnfants}
        onSelectEnfant={handleSelectEnfant}
        onSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        parents={parents}
      />

      {/* Modals */}
      {filteredEnfants.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">Aucun enfant trouvé</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Essayez de modifier vos critères de filtrage</p>
        </div>
      )}

      {modalType === "view" && selectedEnfant && (
        <EnfantDetails
          isOpen
          onClose={closeModal}
          enfant={selectedEnfant}
          onEdit={() => handleEdit(selectedEnfant)}
          parent={getParentInfo(selectedEnfant.parentId)}
        />
      )}

      {modalType === "edit" && selectedEnfant && (
        <EnfantForm
          isOpen
          onClose={closeModal}
          enfant={selectedEnfant}
          formData={editForm as EnfantFormData & { parentId: string }}
          onFormChange={(f, v) => setEditForm(prev => ({ ...prev, [f]: v }))}
          onSave={handleSaveEdit}
          parentOptions={parents}
          isEditing
          onImageChange={(file) => setImageFile(file)}
        />
      )}

      {modalType === "delete" && selectedEnfant && (
        <DeleteConfirmation
          isOpen
          onClose={closeModal}
          enfant={selectedEnfant}
          onDelete={confirmDelete}
        />
      )}

      {isAddModalOpen && (
        <EnfantForm
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          enfant={null}
          formData={newEnfant}
          onFormChange={(f, v) => setNewEnfant(prev => ({ ...prev, [f]: v }))}
          onSave={handleSaveNew}
          parentOptions={parents}
          onImageChange={(file) => setImageFile(file)}
          isEditing={false}
        />
      )}
    </div>
  );
}
