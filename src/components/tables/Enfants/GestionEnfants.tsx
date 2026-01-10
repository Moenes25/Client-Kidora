import { useState } from "react";
import EnfantsTable from "./EnfantsTable";
import EnfantForm from "./EnfantForm";
import EnfantDetails from "./EnfantDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Enfant, EnfantFormData, enfantsData } from "./types";



export default function GestionEnfants() {
  // États pour les filtres
  const [viewMode, setViewMode] = useState<'liste' | 'grille'>('liste');
  const [classeFilter, setClasseFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>("");
  
  // États pour la sélection multiple
  const [selectedEnfants, setSelectedEnfants] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);

  // États pour les modals
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [editForm, setEditForm] = useState<EnfantFormData>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEnfant, setNewEnfant] = useState<EnfantFormData>({
    nom: "",
    prenom: "",
    age: 3,
    classe: "Petite Section",
    image: "/images/default-child.jpg",
    statut: 'en_attente',
    dateInscription: new Date().toISOString().split('T')[0],
    dernierAcces: new Date().toISOString().split('T')[0],
    parent: {
      nom: "",
      prenom: "",
      image: "/images/default-parent.jpg"
    }
  });

  // Options pour les filtres
  const classeOptions = ["Toutes", "Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1"];
  const statutOptions = ["Tous", "Actif", "Inactif", "En attente"];
  const parentOptions = ["Tous", "Sophie Martin", "Thomas Dubois", "Marie Lambert", "Jean Petit", "Laura Bernard", "Pierre Moreau", "Julie Leroy", "Marc Blanc"]; 

  // Filtrer les données
  const filteredEnfants = enfantsData.filter(enfant => {
    const matchesClasse = !classeFilter || classeFilter === "Toutes" || enfant.classe === classeFilter;
    const matchesStatut = !statutFilter || statutFilter === "Tous" || 
      (statutFilter === "Actif" && enfant.statut === 'actif') ||
      (statutFilter === "Inactif" && enfant.statut === 'inactif') ||
      (statutFilter === "En attente" && enfant.statut === 'en_attente');
    const matchesParent = !parentFilter || parentFilter === "Tous" || 
      `${enfant.parent.prenom} ${enfant.parent.nom}` === parentFilter; 
    
    return matchesClasse && matchesStatut && matchesParent;
  });

  // Gestion de la sélection
  const handleSelectEnfant = (enfantId: number) => {
    setSelectedEnfants(prev => {
      const newSelected = prev.includes(enfantId)
        ? prev.filter(id => id !== enfantId)
        : [...prev, enfantId];
      
      if (newSelected.length > 0 && !showSelectionHeader) {
        setShowSelectionHeader(true);
      } else if (newSelected.length === 0 && showSelectionHeader) {
        setShowSelectionHeader(false);
      }
      
      setIsSelectAll(newSelected.length === filteredEnfants.length);
      
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedEnfants([]);
      setIsSelectAll(false);
      setShowSelectionHeader(false);
    } else {
      const allIds = filteredEnfants.map(enfant => enfant.id);
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

  const handleDeleteSelected = () => {
    if (selectedEnfants.length === 0) return;
    
    const enfantsNames = filteredEnfants
      .filter(enfant => selectedEnfants.includes(enfant.id))
      .map(enfant => `${enfant.prenom} ${enfant.nom}`)
      .join(', ');
    
    console.log(`Suppression des enfants sélectionnés: ${enfantsNames}`);
    alert(`${selectedEnfants.length} enfant(s) supprimé(s) : ${enfantsNames}`);
    
    handleCancelSelection();
  };

  // Gestion des actions sur les enfants
  const handleView = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
    setModalType('view');
  };

  const handleEdit = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
    setEditForm({
      nom: enfant.nom,
      prenom: enfant.prenom,
      age: enfant.age,
      classe: enfant.classe,
      statut: enfant.statut,
      image: enfant.image,
      parent: enfant.parent
    });
    setModalType('edit');
  };

  const handleDelete = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
    setModalType('delete');
  };

  const handleSaveEdit = () => {
    if (selectedEnfant && editForm) {
      console.log("Sauvegarder modifications:", editForm);
      alert(`Modifications sauvegardées pour ${editForm.prenom} ${editForm.nom}`);
      closeModal();
    }
  };

  const confirmDelete = () => {
    if (selectedEnfant) {
      console.log(`Suppression de ${selectedEnfant.prenom} ${selectedEnfant.nom}`);
      alert(`Enfant "${selectedEnfant.prenom} ${selectedEnfant.nom}" supprimé`);
      closeModal();
    }
  };

  const closeModal = () => {
    setSelectedEnfant(null);
    setModalType(null);
    setEditForm({});
  };

  // Gestion de l'ajout d'un nouvel enfant
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNew = () => {
    // Générer un nouvel ID
    const newId = Math.max(...enfantsData.map(e => e.id)) + 1;
    
    // Créer le nouvel enfant
    const nouvelEnfant: Enfant = {
      id: newId,
      nom: newEnfant.nom || "",
      prenom: newEnfant.prenom || "",
      age: newEnfant.age || 3,
      classe: newEnfant.classe || "Petite Section",
      image: newEnfant.image || "/images/default-child.jpg",
      statut: newEnfant.statut || 'en_attente',
      dateInscription: newEnfant.dateInscription || new Date().toISOString().split('T')[0],
      dernierAcces: newEnfant.dernierAcces || new Date().toISOString().split('T')[0],
      parent: {
        nom: newEnfant.parent?.nom || "",
        prenom: newEnfant.parent?.prenom || "",
        image: newEnfant.parent?.image || "/images/default-parent.jpg"
      }
    };

    console.log("Nouvel enfant ajouté:", nouvelEnfant);
    alert(`Enfant "${nouvelEnfant.prenom} ${nouvelEnfant.nom}" ajouté avec succès`);
    
    // Réinitialiser le formulaire
    setNewEnfant({
      nom: "",
      prenom: "",
      age: 3,
      classe: "Petite Section",
      image: "/images/default-child.jpg",
      statut: 'en_attente',
      dateInscription: new Date().toISOString().split('T')[0],
      dernierAcces: new Date().toISOString().split('T')[0],
      parent: {
        nom: "",
        prenom: "",
        image: "/images/default-parent.jpg"
      }
    });
    
    setIsAddModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewEnfant({
      nom: "",
      prenom: "",
      age: 3,
      classe: "Petite Section",
      image: "/images/default-child.jpg",
      statut: 'en_attente',
      dateInscription: new Date().toISOString().split('T')[0],
      dernierAcces: new Date().toISOString().split('T')[0],
      parent: {
        nom: "",
        prenom: "",
        image: "/images/default-parent.jpg"
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête principal avec titre et bouton d'ajout */}
      <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-white dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Liste des Enfants
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gérez les enfants et leurs informations
            </p>
          </div>
          
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouveau Enfant
          </button>
        </div>
      </div>

      {/* Filtres et options de vue */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Filtre par classe */}
            <div className="w-full sm:w-auto">
              <label htmlFor="classeFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Classe
              </label>
              <select
                id="classeFilter"
                value={classeFilter}
                onChange={(e) => setClasseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {classeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par statut */}
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
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par parent */}
            <div className="w-full sm:w-auto">
              <label htmlFor="parentFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent
              </label>
              <select
                id="parentFilter"
                value={parentFilter}
                onChange={(e) => setParentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {parentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => {
                  setClasseFilter("");
                  setStatutFilter("");
                  setParentFilter("");
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Boutons de changement de vue */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Vue :</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
              <button
                onClick={() => setViewMode('liste')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'liste' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Vue liste"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grille')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'grille' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Vue grille"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Compteur de résultats */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredEnfants.length} enfant(s) trouvé(s)
        </div>
      </div>

      {/* Header de sélection */}
      {showSelectionHeader && (
        <div className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                    {selectedEnfants.length}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  enfant(s) sélectionné(s)
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
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

      {/* Tableau des enfants */}
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
      />

      {/* Message si aucun enfant trouvé */}
      {filteredEnfants.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9.708a4 4 0 01-7 0" />
            </svg>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
              Aucun enfant trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Essayez de modifier vos critères de filtrage
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {modalType === 'view' && selectedEnfant && (
        <EnfantDetails
          isOpen={true}
          onClose={closeModal}
          enfant={selectedEnfant}
          onEdit={() => handleEdit(selectedEnfant)}
        />
      )}

      {modalType === 'edit' && selectedEnfant && (
        <EnfantForm
          isOpen={true}
          onClose={closeModal}
          enfant={selectedEnfant}
          formData={editForm}
          onFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
          onSave={handleSaveEdit}
          parentOptions={parentOptions.filter(opt => opt !== "Tous")}
          isEditing={true}
        />
      )}

      {modalType === 'delete' && selectedEnfant && (
        <DeleteConfirmation
          isOpen={true}
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
          onFormChange={(field, value) => setNewEnfant(prev => ({ ...prev, [field]: value }))}
          onSave={handleSaveNew}
          parentOptions={parentOptions.filter(opt => opt !== "Tous")}
          isEditing={false}
        />
      )}
    </div>
  );
}