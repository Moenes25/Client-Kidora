import { useState, useMemo, useEffect } from "react";
import ParentForm from "./ParentForm";
import ParentDetails from "./ParentDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import ParentsTable from "./ParentsTable";
import { Parent } from "./types";
import { tableData } from "./types";


export default function GestionParents() {
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
  
  // États pour la sélection multiple
  const [selectedParents, setSelectedParents] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

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

  const handleSelectParent = (id: number) => {
    if (selectedParents.includes(id)) {
      setSelectedParents(selectedParents.filter(parentId => parentId !== id));
    } else {
      setSelectedParents([...selectedParents, id]);
    }
  };

  // Actions multiples
  const handleActivateSelected = () => {
    setParents(prev => prev.map(parent => 
      selectedParents.includes(parent.id) ? { ...parent, statut: "Actif" } : parent
    ));
    setSelectedParents([]);
  };

  const handleDeactivateSelected = () => {
    setParents(prev => prev.map(parent => 
      selectedParents.includes(parent.id) ? { ...parent, statut: "Inactif" } : parent
    ));
    setSelectedParents([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedParents.length} parent(s) ?`)) {
      setParents(prev => prev.filter(parent => !selectedParents.includes(parent.id)));
      setSelectedParents([]);
    }
  };

  const handleCancelSelection = () => {
    setSelectedParents([]);
  };

  // CRUD operations
  const handleCreateParent = (parentData: Omit<Parent, 'id' | 'enfants'>) => {
    const newParent: Parent = {
      id: parents.length > 0 ? Math.max(...parents.map(p => p.id)) + 1 : 1,
      ...parentData,
      enfants: { images: [] }
    };
    setParents(prev => [...prev, newParent]);
  };

  const handleEditParent = (parentData: Omit<Parent, 'id' | 'enfants'> | Parent) => {
  if ('id' in parentData && selectedParent) {
    const updatedParent: Parent = {
      id: selectedParent.id,
      nomPrenom: parentData.nomPrenom,
      email: parentData.email,
      telephone: parentData.telephone,
      relation: parentData.relation,
      statut: parentData.statut,
      profession: parentData.profession,
      image: parentData.image,
      enfants: selectedParent.enfants // Conserver les enfants existants
    };
    
    setParents(prev => prev.map(parent => 
      parent.id === updatedParent.id ? updatedParent : parent
    ));
    setShowEditModal(false); // ← AJOUTÉ: fermer le modal après la sauvegarde
  }
};

  const handleDeleteParent = (id: number) => {
    setParents(prev => prev.filter(parent => parent.id !== id));
  };

  // Handlers pour les actions
  const handleViewDetails = (parent: Parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
  };

  const handleEdit = (parent: Parent) => {
    setSelectedParent(parent);
     setShowEditModal(true)
    // Ouvrir le formulaire d'édition
    // Note: Vous devrez ajuster pour utiliser ParentForm
  };

  const handleDelete = (parent: Parent) => {
    setSelectedParent(parent);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* En-tête */}
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Toutes les Parents
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Gérez les parents et leurs informations
              </p>
            </div>
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
          <div className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
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
                <button onClick={handleActivateSelected} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Activer
                </button>
                <button onClick={handleDeactivateSelected} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                  </svg>
                  Désactiver
                </button>
                <button onClick={handleDeleteSelected} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
                <button onClick={handleCancelSelection} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tableau */}
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
        subtitle={`Modifiez les informations de ${selectedParent?.nomPrenom}`}
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