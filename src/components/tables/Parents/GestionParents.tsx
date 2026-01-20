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

interface GestionParentsProps {
  onCountChange?: (count: number) => void;
}

export default function GestionParents({ onCountChange }: GestionParentsProps) {
  // États pour les filtres
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [relationFilter, setRelationFilter] = useState<string>("");
  
  // États pour les modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // États pour les données
  const [parents, setParents] = useState<Parent[]>(tableData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour la sélection multiple
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      setError(null);
      const parentsData = await parentApi.getAllParents();
      const enfantsData = await enfantApi.getAllEnfants();
      parentsData.forEach(parent => {
        const enfantFiltered = enfantsData.filter(enfant => enfant.parentId === parent.id);
        parent.enfants.images = enfantFiltered.map(enfant => enfant.imageUrl);
        parent.enfants.prenoms = enfantFiltered.map(enfant => enfant.prenom);
        
      });
      console.log("parentsData", parentsData);
      setParents(parentsData);
      if (onCountChange) {
        onCountChange(parentsData.length);
      }
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des parents:", error);
    } finally {
      setLoading(false);
    }
  };

  // Options uniques pour les filtres
  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(parents.map(parent => parent.statut)));
    return ["Tous", ...statuts];
  }, [parents]);

  const relationOptions = useMemo(() => {
    const relations = Array.from(new Set(parents.map(parent => parent.relation)));
    return ["Toutes", ...relations];
  }, [parents]);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return parents.filter(parent => {
      const matchesStatut = !statutFilter || statutFilter === "Tous" || parent.statut === statutFilter;
      const matchesRelation = !relationFilter || relationFilter === "Toutes" || parent.relation === relationFilter;
      return matchesStatut && matchesRelation;
    });
  }, [parents, statutFilter, relationFilter]);

  // Gestion de la sélection
  useEffect(() => {
    if (selectedParents.length === filteredData.length && filteredData.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedParents, filteredData]);

  // Gestion des sélections
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedParents([]);
    } else {
      const allIds = filteredData.map(parent => parent.id);
      setSelectedParents(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectParent = (id: string) => {
    if (selectedParents.includes(id)) {
      setSelectedParents(selectedParents.filter(parentId => parentId !== id));
    } else {
      setSelectedParents([...selectedParents, id]);
    }
  };

  // Actions multiples
  const handleActivateSelected = async () => {
    try {
       const promises = selectedParents.map(id => 
        parentApi.updateParent(id, { statutClient: StatutClient.ACTIF })
      );
      await Promise.all(promises);

      setParents(prev => prev.map(parent => 
        selectedParents.includes(parent.id) 
          ? { ...parent, statut: "Actif" } 
          : parent
      ));
       setSelectedParents([]);
       alert(`${selectedParents.length} parent(s) activé(s) avec succès`);
    } catch (error: any) {
      console.error('Erreur lors de l\'activation multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
    
   
  };

  const handleDeactivateSelected = async() => {
    try {
        const promises = selectedParents.map(id => 
        parentApi.updateParent(id, { statutClient: StatutClient.INACTIF })
        );
        await Promise.all(promises);
         setParents(prev => prev.map(parent => 
          selectedParents.includes(parent.id) ? { ...parent, statut: "Inactif" } : parent
       ));
       alert(`${selectedParents.length} parent(s) désactivé(s) avec succès`);
    setSelectedParents([]);
    } catch (error: any) {
      console.error('Erreur lors de la désactivation multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
   
  };

  const handleDeleteSelected =  async() => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedParents.length} parent(s) ?`)) {
       return;
    }
     try {
       const promises = selectedParents.map(id => 
        parentApi.deleteParent(id)
      );
      await Promise.all(promises);
       setParents(prev => prev.filter(parent => !selectedParents.includes(parent.id)));
       setSelectedParents([]);
       alert(`${selectedParents.length} parent(s) supprimé(s) avec succès`);
     } catch (error:any) {
      console.error('Erreur lors de la suppression multiple:', error);
      alert(`Erreur: ${error.message}`);
     }
  };

  const handleCancelSelection = () => {
    setSelectedParents([]);
  };

  // CRUD operations
  const handleCreateParent = async (parentData: CreateParentDto | UpdateParentDto , imageFile?: File) : Promise<boolean>=> {
    try {
       if ('email' in parentData && 'password' in parentData) {
         const newUser = await parentApi.createParent(parentData as CreateParentDto, imageFile);
       const newParent = convertBackendToFrontend(newUser);
       setParents(prev => [...prev, newParent]);
       await fetchParents();
      
      alert('Parent créé avec succès');
       return true;
       }
       return false;
      
    }
    catch (error: any) {
      console.error('Erreur lors de la création du parent:', error);
      alert(`Erreur : ${error.message}`);
      return false;
    }
    
  };

  const handleEditParent = async (parentData: UpdateParentDto, imageFile?: File): Promise<boolean> => {
     if (!selectedParent) return false;
     try {
       const updatedUser = await parentApi.updateParent(selectedParent.id, parentData, imageFile);
        const updatedParent = convertBackendToFrontend(updatedUser);
         setParents(prev => prev.map(parent => 
              parent.id === updatedParent.id ? updatedParent : parent
          ));
          await fetchParents();
          setShowEditModal(false);
          return true;
     } catch (error: any) {
      console.error('Erreur lors de la mise à jour:', error);
      alert(`Erreur: ${error.message}`);
      return false;
      
     }

};

  const handleDeleteParent = async(id: string) => {
    try {
      await parentApi.deleteParent(id);
      setParents(prev => prev.filter(parent => parent.id !== id));
      setShowDeleteModal(false);
      alert('Parent supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      alert(`Erreur: ${error.message}`);
    }
    
  };

  // Handlers pour les actions
  const handleViewDetails = (parent: Parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
  };

  const handleEdit = (parent: Parent) => {
    setSelectedParent(parent);
     setShowEditModal(true)
  };

  const handleDelete = (parent: Parent) => {
    setSelectedParent(parent);
    setShowDeleteModal(true);
  };
if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des parents...</p>
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
            onClick={fetchParents}
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
                Toutes les Parents
              </h2> */}
              {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {parents.length} parent(s) au total
              </p> */}
            </div>
            <div className="flex items-center gap-3">
              {/* Bouton rafraîchir */}
              <button
                onClick={fetchParents}
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
                Nouveau Parent
              </button>
            </div>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="relationFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Relation
              </label>
              <select
                id="relationFilter"
                value={relationFilter}
                onChange={(e) => setRelationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {relationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="statutFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <select
                id="statutFilter"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {statutOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => { setStatutFilter(""); setRelationFilter(""); }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredData.length} parent(s) trouvé(s)
            {selectedParents.length > 0 && (
              <span className="ml-2 font-medium text-blue-600 dark:text-blue-400">
                • {selectedParents.length} sélectionné(s)
              </span>
            )}
          </div>
        </div>

        {/* Header d'actions multiples */}
        {selectedParents.length > 0 && (
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600  dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                      {selectedParents.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    parent(s) sélectionné(s)
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
        {parents.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Aucun parent trouvé
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Commencez par ajouter votre premier parent.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un parent
            </button>
          </div>
        ) : (
          /* Tableau */
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

      <ParentDetails
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        parent={selectedParent}
      />

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        parent={selectedParent}
        onConfirm={() => selectedParent && handleDeleteParent(selectedParent.id)}
      />
    </>
  );
}