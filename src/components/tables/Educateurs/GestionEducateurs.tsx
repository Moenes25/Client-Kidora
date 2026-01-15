import { useState, useMemo, useEffect } from "react";
import EducateurForm from "../Educateurs/EducateurForm";
import EducateurDetails from "../Educateurs/EducateurDetails";
import DeleteConfirmation from "../Educateurs/DeleteConfirmation";
import EducateursTable from "./EducateursTable";
import { convertBackendToEducateur, CreateEducateurDto, Educateur, UpdateEducateurDto } from "../Educateurs/Types";
import { educateurApi } from "../../../services/api/educateurApi";

export default function GestionEducateurs() {
  // États pour les filtres
  const [disponibiliteFilter, setDisponibiliteFilter] = useState<string>("");
  const [specialiteFilter, setSpecialiteFilter] = useState<string>("");
  
  // États pour les modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEducateur, setSelectedEducateur] = useState<Educateur | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // États pour les données (DÉCOMMENTER)
  const [educateurs, setEducateurs] = useState<Educateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour la sélection multiple
  const [selectedEducateurs, setSelectedEducateurs] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    fetchEducateurs();
  }, []);

  const fetchEducateurs = async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await educateurApi.getAllEducateurs();
      const educateursData = users.map(convertBackendToEducateur);
      setEducateurs(educateursData);
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des éducateurs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Options uniques pour les filtres
  const disponibiliteOptions = useMemo(() => {
    const disponibilites = Array.from(new Set(educateurs.map(educateur => {
      switch(educateur.disponibilite.toLowerCase()) {
        case 'disponible': return "Disponible";
        case 'occupe': return "Occupé";
        case 'absence': return "Absence";
        default: return educateur.disponibilite;
      }
    })));
    return ["Toutes", ...disponibilites];
  }, [educateurs]);

  const specialiteOptions = useMemo(() => {
    const specialites = Array.from(new Set(educateurs.map(educateur => educateur.specialite)));
    return ["Toutes", ...specialites];
  }, [educateurs]);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return educateurs.filter(educateur => {
      const matchesDisponibilite = !disponibiliteFilter || 
        disponibiliteFilter === "Toutes" || 
        (disponibiliteFilter === "Disponible" && educateur.disponibilite.toLowerCase() === 'disponible') ||
        (disponibiliteFilter === "Occupé" && educateur.disponibilite.toLowerCase() === 'occupe') ||
        (disponibiliteFilter === "Absence" && educateur.disponibilite.toLowerCase() === 'absence');
      
      const matchesSpecialite = !specialiteFilter || 
        specialiteFilter === "Toutes" || 
        educateur.specialite === specialiteFilter;
      
      return matchesDisponibilite && matchesSpecialite;
    });
  }, [educateurs, disponibiliteFilter, specialiteFilter]);

  // Gestion de la sélection
  useEffect(() => {
    if (selectedEducateurs.length === filteredData.length && filteredData.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedEducateurs, filteredData]);

  // Gestion des sélections
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEducateurs([]);
    } else {
      const allIds = filteredData.map(educateur => educateur.id);
      setSelectedEducateurs(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectEducateur = (id: string) => {
    if (selectedEducateurs.includes(id)) {
      setSelectedEducateurs(selectedEducateurs.filter(educateurId => educateurId !== id));
    } else {
      setSelectedEducateurs([...selectedEducateurs, id]);
    }
  };

  // Actions multiples
  const handleActivateSelected = async () => {
    try {
      // Implémentez l'activation des éducateurs sélectionnés
      setEducateurs(prev => prev.map(educateur => 
        selectedEducateurs.includes(educateur.id) 
          ? { ...educateur, statut: "actif" } 
          : educateur
      ));
      setSelectedEducateurs([]);
      alert(`${selectedEducateurs.length} éducateur(s) activé(s) avec succès`);
    } catch (error: any) {
      console.error('Erreur lors de l\'activation multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeactivateSelected = async () => {
    try {
      // Implémentez la désactivation des éducateurs sélectionnés
      setEducateurs(prev => prev.map(educateur => 
        selectedEducateurs.includes(educateur.id) 
          ? { ...educateur, statut: "inactif" } 
          : educateur
      ));
      alert(`${selectedEducateurs.length} éducateur(s) désactivé(s) avec succès`);
      setSelectedEducateurs([]);
    } catch (error: any) {
      console.error('Erreur lors de la désactivation multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEducateurs.length} éducateur(s) ?`)) {
      try {
        // Implémentez la suppression multiple
        // Note: Vous devriez aussi appeler l'API pour supprimer plusieurs éducateurs
        setEducateurs(prev => prev.filter(educateur => !selectedEducateurs.includes(educateur.id)));
        setSelectedEducateurs([]);
        alert(`${selectedEducateurs.length} éducateur(s) supprimé(s) avec succès`);
      } catch (error: any) {
        console.error('Erreur lors de la suppression multiple:', error);
        alert(`Erreur: ${error.message}`);
      }
    }
  };

  const handleCancelSelection = () => {
    setSelectedEducateurs([]);
  };

  // CRUD operations
  const handleCreateEducateur = async (educateurData: CreateEducateurDto | UpdateEducateurDto, imageFile?: File): Promise<boolean> => {
    try {
      if ('email' in educateurData && 'password' in educateurData) {
        const newUser = await educateurApi.createEducateur(educateurData as CreateEducateurDto, imageFile);
        const newEducateur = convertBackendToEducateur(newUser);
        // Option 1: Ajouter localement et rafraîchir
        setEducateurs(prev => [...prev, newEducateur]);
        // Option 2: Rafraîchir depuis l'API
        await fetchEducateurs();
        alert('Éducateur créé avec succès');
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'éducateur:', error);
      alert(`Erreur : ${error.message}`);
      return false;
    }
  };

  const handleEditEducateur = async (educateurData: UpdateEducateurDto | CreateEducateurDto, imageFile?: File): Promise<boolean> => {
    if (!selectedEducateur) return false;
    try {
      const updatedUser = await educateurApi.updateEducateur(selectedEducateur.id, educateurData as UpdateEducateurDto, imageFile);
      const updatedEducateur = convertBackendToEducateur(updatedUser);
      // Mise à jour locale
      setEducateurs(prev => prev.map(educateur => 
        educateur.id === updatedEducateur.id ? updatedEducateur : educateur
      ));
      // Rafraîchir depuis l'API si nécessaire
      await fetchEducateurs();
      setShowEditModal(false);
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour:', error);
      alert(`Erreur: ${error.message}`);
      return false;
    }
  };

  const handleDeleteEducateur = async (id: string) => {
    try {
      await educateurApi.deleteEducateur(id);
      // Mise à jour locale
      setEducateurs(prev => prev.filter(educateur => educateur.id !== id));
      setShowDeleteModal(false);
      alert('Éducateur supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Handlers pour les actions
  const handleViewDetails = (educateur: Educateur) => {
    console.log("Éducateur sélectionné pour détails:", educateur); 
    setSelectedEducateur(educateur);
    setShowViewModal(true);
  };

  const handleEdit = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setShowEditModal(true);
  };

  const handleDelete = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des éducateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
          <button 
            onClick={fetchEducateurs}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* En-tête avec indicateur de chargement */}
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Tous les Éducateurs
              </h2> */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {educateurs.length} éducateur(s) au total
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Bouton rafraîchir */}
              <button
                onClick={fetchEducateurs}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                title="Rafraîchir"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Rafraîchir
              </button>
              
              {/* Bouton créer */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Nouvel Éducateur
              </button>
            </div>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="disponibiliteFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Disponibilité
              </label>
              <select
                id="disponibiliteFilter"
                value={disponibiliteFilter}
                onChange={(e) => setDisponibiliteFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {disponibiliteOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="specialiteFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Spécialité
              </label>
              <select
                id="specialiteFilter"
                value={specialiteFilter}
                onChange={(e) => setSpecialiteFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {specialiteOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => { setDisponibiliteFilter(""); setSpecialiteFilter(""); }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredData.length} éducateur(s) trouvé(s)
            {selectedEducateurs.length > 0 && (
              <span className="ml-2 font-medium text-blue-600 dark:text-blue-400">
                • {selectedEducateurs.length} sélectionné(s)
              </span>
            )}
          </div>
        </div>

        {/* Header d'actions multiples */}
        {selectedEducateurs.length > 0 && (
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-b border-blue-100 dark:border-blue-800/30 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                      {selectedEducateurs.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    éducateur(s) sélectionné(s)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleActivateSelected} 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Activer
                </button>
                <button 
                  onClick={handleDeactivateSelected} 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                  </svg>
                  Désactiver
                </button>
                <button 
                  onClick={handleDeleteSelected} 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
                <button 
                  onClick={handleCancelSelection} 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message si pas de données */}
        {educateurs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Aucun éducateur trouvé
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Commencez par ajouter votre premier éducateur.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un éducateur
            </button>
          </div>
        ) : (
          /* Tableau */
          <EducateursTable
            educateurs={filteredData} // RÉACTIVER cette ligne
            selectedEducateurs={selectedEducateurs}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            onSelectEducateur={handleSelectEducateur}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
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