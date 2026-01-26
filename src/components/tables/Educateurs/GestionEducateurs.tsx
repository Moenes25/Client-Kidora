import { useState, useMemo, useEffect } from "react";
import EducateurForm from "../Educateurs/EducateurForm";
import EducateurDetails from "../Educateurs/EducateurDetails";
import DeleteConfirmation from "../Educateurs/DeleteConfirmation";
import EducateursTable from "./EducateursTable";
import { convertBackendToEducateur, CreateEducateurDto, Educateur, UpdateEducateurDto } from "../Educateurs/Types";
import { educateurApi } from "../../../services/api/educateurApi";
import { RefreshCw, Search, Filter, X, Check, Ban, Trash2, UserPlus } from "lucide-react";

export default function GestionEducateurs() {
  // Filtres + recherche
  const [disponibiliteFilter, setDisponibiliteFilter] = useState<string>("");
  const [specialiteFilter, setSpecialiteFilter] = useState<string>("");
  const [query, setQuery] = useState("");

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEducateur, setSelectedEducateur] = useState<Educateur | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Données
  const [educateurs, setEducateurs] = useState<Educateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sélection multiple
  const [selectedEducateurs, setSelectedEducateurs] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => { fetchEducateurs(); }, []);
  const fetchEducateurs = async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await educateurApi.getAllEducateurs();
      const educateursData = users.map(convertBackendToEducateur);
      setEducateurs(educateursData);
    } catch (e: any) {
      setError(`Erreur de chargement: ${e.message}`);
      console.error("Erreur lors du chargement des éducateurs:", e);
    } finally {
      setLoading(false);
    }
  };

  // Options filtres
  const disponibiliteOptions = useMemo(() => {
    const set = new Set(
      educateurs.map(e => {
        const v = (e.disponibilite || "").toLowerCase();
        if (v === "disponible") return "Disponible";
        if (v === "occupe") return "Occupé";
        if (v === "absence") return "Absence";
        return e.disponibilite;
      })
    );
    return ["Toutes", ...Array.from(set)];
  }, [educateurs]);

  const specialiteOptions = useMemo(() => {
    const set = new Set(educateurs.map(e => e.specialite).filter(Boolean));
    return ["Toutes", ...Array.from(set)];
  }, [educateurs]);

  // Filtrer + rechercher
  const filteredData = useMemo(() => {
    const matchFilters = (e: Educateur) => {
      const disp = (e.disponibilite || "").toLowerCase();
      const okD =
        !disponibiliteFilter ||
        disponibiliteFilter === "Toutes" ||
        (disponibiliteFilter === "Disponible" && disp === "disponible") ||
        (disponibiliteFilter === "Occupé" && disp === "occupe") ||
        (disponibiliteFilter === "Absence" && disp === "absence");

      const okS = !specialiteFilter || specialiteFilter === "Toutes" || e.specialite === specialiteFilter;
      return okD && okS;
    };

    const q = query.trim().toLowerCase();
    const base = educateurs.filter(matchFilters);
    if (!q) return base;
    return base.filter(
      e =>
        `${e.prenom} ${e.nom}`.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.numTel?.toLowerCase().includes(q) ||
        e.specialite?.toLowerCase().includes(q)
    );
  }, [educateurs, disponibiliteFilter, specialiteFilter, query]);

  // Sélection
  useEffect(() => {
    setIsAllSelected(selectedEducateurs.length === filteredData.length && filteredData.length > 0);
  }, [selectedEducateurs, filteredData]);

  const handleSelectAll = () => {
    if (isAllSelected) setSelectedEducateurs([]);
    else setSelectedEducateurs(filteredData.map(e => e.id));
    setIsAllSelected(!isAllSelected);
  };
  const handleSelectEducateur = (id: string) =>
    setSelectedEducateurs(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  // Actions groupées
  const handleActivateSelected = async () => {
    try {
      setEducateurs(prev => prev.map(e => (selectedEducateurs.includes(e.id) ? { ...e, statut: "actif" } : e)));
      setSelectedEducateurs([]);
      alert(`${selectedEducateurs.length} éducateur(s) activé(s) avec succès`);
    } catch (e: any) {
      console.error("Erreur activation multiple:", e);
      alert(`Erreur: ${e.message}`);
    }
  };
  const handleDeactivateSelected = async () => {
    try {
      setEducateurs(prev => prev.map(e => (selectedEducateurs.includes(e.id) ? { ...e, statut: "inactif" } : e)));
      alert(`${selectedEducateurs.length} éducateur(s) désactivé(s) avec succès`);
      setSelectedEducateurs([]);
    } catch (e: any) {
      console.error("Erreur désactivation multiple:", e);
      alert(`Erreur: ${e.message}`);
    }
  };
  const handleDeleteSelected = async () => {
    if (!selectedEducateurs.length) return;
    const ok = window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEducateurs.length} éducateur(s) ?`);
    if (!ok) return; // ← sécurité
    try {
      setEducateurs(prev => prev.filter(e => !selectedEducateurs.includes(e.id)));
      setSelectedEducateurs([]);
      alert(`${selectedEducateurs.length} éducateur(s) supprimé(s) avec succès`);
    } catch (e: any) {
      console.error("Erreur suppression multiple:", e);
      alert(`Erreur: ${e.message}`);
    }
  };
  const handleCancelSelection = () => setSelectedEducateurs([]);

  // CRUD
  const handleCreateEducateur = async (data: CreateEducateurDto | UpdateEducateurDto, file?: File): Promise<boolean> => {
    try {
      if ("email" in data && "password" in data) {
        const newUser = await educateurApi.createEducateur(data as CreateEducateurDto, file);
        const newEduc = convertBackendToEducateur(newUser);
        setEducateurs(prev => [...prev, newEduc]);
        await fetchEducateurs();
        alert("Éducateur créé avec succès");
        return true;
      }
      return false;
    } catch (e: any) {
      console.error("Erreur création:", e);
      alert(`Erreur : ${e.message}`);
      return false;
    }
  };
  const handleEditEducateur = async (data: UpdateEducateurDto | CreateEducateurDto, file?: File): Promise<boolean> => {
    if (!selectedEducateur) return false;
    try {
      const updatedUser = await educateurApi.updateEducateur(selectedEducateur.id, data as UpdateEducateurDto, file);
      const updated = convertBackendToEducateur(updatedUser);
      setEducateurs(prev => prev.map(e => (e.id === updated.id ? updated : e)));
      await fetchEducateurs();
      setShowEditModal(false);
      return true;
    } catch (e: any) {
      console.error("Erreur mise à jour:", e);
      alert(`Erreur: ${e.message}`);
      return false;
    }
  };
  const handleDeleteEducateur = async (id: string) => {
    try {
      await educateurApi.deleteEducateur(id);
      setEducateurs(prev => prev.filter(e => e.id !== id));
      setShowDeleteModal(false);
      alert("Éducateur supprimé avec succès");
    } catch (e: any) {
      console.error("Erreur suppression:", e);
      alert(`Erreur: ${e.message}`);
    }
  };

  // Détails / Édition / Suppression (individuel)
  const handleViewDetails = (e: Educateur) => { setSelectedEducateur(e); setShowViewModal(true); };
  const handleEdit = (e: Educateur) => { setSelectedEducateur(e); setShowEditModal(true); };
  const handleDelete = (e: Educateur) => { setSelectedEducateur(e); setShowDeleteModal(true); };

  // Écrans d’état
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des éducateurs…</p>
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
              onClick={fetchEducateurs}
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
                  placeholder="Rechercher (nom, email, tél., spécialité)"
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={disponibiliteFilter}
                  onChange={(e) => setDisponibiliteFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {disponibiliteOptions.map(o => <option key={o}>{o}</option>)}
                </select>
                <select
                  value={specialiteFilter}
                  onChange={(e) => setSpecialiteFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {specialiteOptions.map(o => <option key={o}>{o}</option>)}
                </select>
                <button
                  onClick={() => { setDisponibiliteFilter(""); setSpecialiteFilter(""); setQuery(""); }}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
                >
                  <X className="h-4 w-4" /> Réinitialiser
                </button>
              </div>
            </div>

            {/* Droite */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchEducateurs}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
                title="Rafraîchir"
              >
                <RefreshCw className="h-4 w-4" /> Rafraîchir
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
                title="Nouvel éducateur"
              >
                <UserPlus className="h-4 w-4" /> Nouvel Éducateur
              </button>
            </div>
          </div>

          {/* Compteur */}
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredData.length} éducateur(s) trouvé(s)
            {selectedEducateurs.length > 0 && (
              <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">• {selectedEducateurs.length} sélectionné(s)</span>
            )}
          </div>
        </div>

        {/* Header actions groupées */}
        {selectedEducateurs.length > 0 && (
          <div className="sticky top-0 z-10 border-b border-emerald-600/20 bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                {selectedEducateurs.length} sélectionné(s)
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

        {/* Table / vide */}
        <EducateursTable
          educateurs={filteredData}
          selectedEducateurs={selectedEducateurs}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAll}
          onSelectEducateur={handleSelectEducateur}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modals */}
      <EducateurForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateEducateur}
        title="Nouvel Éducateur"
        subtitle="Remplissez les informations de l'éducateur"
        isEdit={false}
      />
      <EducateurForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        educateur={selectedEducateur}
        onSave={handleEditEducateur}
        title="Modifier l'Éducateur"
        subtitle={`Modifiez les informations de ${selectedEducateur?.prenom} ${selectedEducateur?.nom}`}
        isEdit={true}
      />
      <EducateurDetails
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        educateur={selectedEducateur}
        onEdit={() => selectedEducateur && handleEdit(selectedEducateur)}
      />
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        educateur={selectedEducateur}
        onConfirm={() => selectedEducateur && handleDeleteEducateur(selectedEducateur.id)}
      />
    </>
  );
}
