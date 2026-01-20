import { useEffect, useState } from "react";
import EnfantsTable from "./EnfantsTable";
import EnfantForm from "./EnfantForm";
import EnfantDetails from "./EnfantDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Enfant, EnfantFormData } from "./types";
import { enfantApi, EnfantResponse } from "../../../services/api/enfantApi";
import { parentApi } from "../../../services/api/parentApi";
import { Parent } from "../Parents/types";
import { StatutClient } from "../../../types/auth.types";

interface GestionEnfantsProps {
  onCountChange?: (count: number) => void;
}


export default function GestionEnfants({ onCountChange }: GestionEnfantsProps) {
  // États pour les filtres
  const [viewMode, setViewMode] = useState<'liste' | 'grille'>('liste');
  const [classeFilter, setClasseFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>("");
  
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [filteredEnfants, setFilteredEnfants] = useState<Enfant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  
  // États pour la sélection multiple
  const [selectedEnfants, setSelectedEnfants] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  // États pour les modals
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
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
  // const [parentOptions, setParentOptions] = useState<string[]>(["Tous"]);
  const [parentOptions, setParentOptions] = useState<Array<{id: string, label: string}>>([{id: "all", label: "Tous"}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("fetchData"); 
      setLoading(true);
      setError(null);
      
      // Charger les enfants
      const enfantsData = await enfantApi.getAllEnfants();
      
      // Charger les parents
      const parentsData = await parentApi.getAllParents();
      console.log(" liste parents", parentsData);
      
      setParents(parentsData);
      
      // Créer les options de parent pour le filtre
      const options = [{id: "all", label: "Tous"}, ...parentsData.map(p => ({id: p.id, label: `${p.prenom} ${p.nom}`}))];
      setParentOptions(options);
      
      console.log("parentsData  ==> ", parentsData);
      // Convertir les données API en format frontend
      const convertedEnfants: Enfant[] = enfantsData.map((enfant: EnfantResponse) => {
        console.log("enfant", enfant);
        const parent = parentsData.find(p => p.id === enfant.parentId);
         console.log("parent === >", parent);
        return {
          id: enfant.idEnfant,
          nom: enfant.nom,
          prenom: enfant.prenom,
          age: enfant.age,
          classe: enfant.classe,
          nomClasse: enfant.classeNom,
          imageUrl: enfant.imageUrl || '/images/default-child.jpg',
          parentId: parent?.id || '',
          statut: StatutClient.ACTIF, // À adapter selon votre logique métier
          dateInscription: new Date().toISOString().split('T')[0], // À adapter
          dernierAcces: new Date().toISOString().split('T')[0] // À adapter
        };
      });
      
      setEnfants(convertedEnfants);
      setFilteredEnfants(convertedEnfants);
      if (onCountChange) {
        onCountChange(convertedEnfants.length);
      }
      
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    let filtered = enfants;
    
    if (classeFilter && classeFilter !== "Toutes") {
      filtered = filtered.filter(enfant => enfant.classe === classeFilter);
    }
    
    if (statutFilter && statutFilter !== "Tous") {
      filtered = filtered.filter(enfant => {
        if (statutFilter === "Actif") return enfant.statut === StatutClient.ACTIF;
        if (statutFilter === "Inactif") return enfant.statut === StatutClient.INACTIF;
        if (statutFilter === "En attente") return enfant.statut === StatutClient.EN_ATTENTE;
        // if (statutFilter === "Inactif") return enfant.statut === 'inactif';
        // if (statutFilter === "En attente") return enfant.statut === 'en_attente';
        return true;
      });
    }
    
    if (parentFilter && parentFilter !== "all") {
      filtered = filtered.filter(enfant => 
        enfant.parentId === parentFilter
      );
    }
    
    setFilteredEnfants(filtered);
    // Réinitialiser la sélection quand les filtres changent
    setSelectedEnfants([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  }, [enfants, classeFilter, statutFilter, parentFilter]);

  // Options pour les filtres
  const classeOptions = ["Toutes", 
    // "Toute Petite Section", 
    // "Petite Section", 
    // "Moyenne Section", 
    // "Grande Section", 
    // "CP", 
    // "CE1"
  ];
  const statutOptions = ["Tous", "Actif", "Inactif", "En attente"];
  // const parentOptions = ["Tous", "Sophie Martin", "Thomas Dubois", "Marie Lambert", "Jean Petit", "Laura Bernard", "Pierre Moreau", "Julie Leroy", "Marc Blanc"]; 


  // Gestion de la sélection
  const handleSelectEnfant = (enfantId: string) => {
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

  const handleDeleteSelected = async () => {
    if (selectedEnfants.length === 0) return;
    
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEnfants.length} enfant(s) ?`)) {
      return;
    }
    
    try {
      // Supprimer chaque enfant sélectionné
      const promises = selectedEnfants.map(id => enfantApi.deleteEnfant(id));
      await Promise.all(promises);
      
      // Mettre à jour localement
      setEnfants(prev => prev.filter(enfant => !selectedEnfants.includes(enfant.id)));
      
      const enfantsNames = filteredEnfants
        .filter(enfant => selectedEnfants.includes(enfant.id))
        .map(enfant => `${enfant.prenom} ${enfant.nom}`)
        .join(', ');
      
      alert(`${selectedEnfants.length} enfant(s) supprimé(s) : ${enfantsNames}`);
      
      handleCancelSelection();
      
    } catch (error: any) {
      console.error('Erreur lors de la suppression multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
  };


  // Gestion des actions sur les enfants
  const handleView = (enfant: Enfant) => {
    console.log("view", enfant);
    setSelectedEnfant(enfant);
    setModalType('view');
  };

  const handleEdit = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
    console.log("Enfant sélectionné pour édition:", enfant);
    setEditForm({
      nom: enfant.nom,
      prenom: enfant.prenom,
      age: enfant.age,
      classe: enfant.classe,
      statut: enfant.statut,
      image: enfant.imageUrl,
      parentId: enfant.parentId
      
    });
    setModalType('edit');
  };

  const handleDelete = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
    setModalType('delete');
  };

  const handleSaveEdit = async () => { // Ajouté async
  if (!selectedEnfant) return;
   console.log("l'enfant à modifier est",selectedEnfant)
  try {
     // Préparation des données pour l'API
    const updatedData = {
      nom: editForm.nom ,
      prenom: editForm.prenom ,
      age: editForm.age || selectedEnfant.age,
      classe: editForm.classe || selectedEnfant.classe,
      // Inclure le parentId si modifié
      parentId: editForm.parentId || selectedEnfant.parentId
    };
    console.log("la donnée à envoyer",updatedData)
    const response = imageFile ? 
    await enfantApi.updateEnfant(selectedEnfant.id, updatedData, imageFile) : 
    await enfantApi.updateEnfant(selectedEnfant.id, updatedData);
     
    console.log("la reponse de l'API",response)
    
    // Mise à jour locale
    setEnfants(prev => prev.map(e => 
      e.id === selectedEnfant.id 
        ? {
          ...e, 
          nom : updatedData.nom || e.nom,
          prenom : updatedData.prenom || e.prenom,
          age : updatedData.age || e.age,
          classe : updatedData.classe || e.classe,
          parentId : updatedData.parentId || e.parentId,
          imageUrl : response.imageUrl || '/uploads/enfants/default-avatar-enfant.png'
        }
        : e
    ));
    closeModal();
  } catch (error: any) {
    console.error("Erreur...", error);
    alert(`Erreur: ${error.message}`);
  }
};

  const confirmDelete = async () => { 
    if (!selectedEnfant) return;
    
    try {
      await enfantApi.deleteEnfant(selectedEnfant.id);
      
      // Mettre à jour localement
      setEnfants(prev => prev.filter(e => e.id !== selectedEnfant.id));
      setSelectedEnfants(prev => prev.filter(id => id !== selectedEnfant.id));
      
      alert(`Enfant "${selectedEnfant.prenom} ${selectedEnfant.nom}" supprimé`);
      closeModal();
      
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      alert(`Erreur: ${error.message}`);
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

  const handleSaveNew = async () => {
    try {
      if (!newEnfant.parentId) {
      throw new Error("Veuillez sélectionner un parent valide");
    }
    if (!imageFile) {
      throw new Error("Veuillez sélectionner une photo pour l'enfant");
    }
      // Trouver le parent sélectionné
      const selectedParentName = `${newEnfant.parentId}`;
      
      
      // if (!parent) {
      //   throw new Error("Veuillez sélectionner un parent valide");
      // }
      
      // Ajouter l'enfant via l'API
      const response = await enfantApi.ajouterEnfant(
        {
          nom: newEnfant.nom || '',
          prenom: newEnfant.prenom || '',
          age: newEnfant.age || 3,
          classe: newEnfant.classe || 'Petite Section'
        },
        newEnfant.parentId,
        imageFile
        // Note: Vous devez ajouter la gestion de l'image ici
      );
      // const parent = parents.find(p => p.id === newEnfant.parentId);
      // Créer le nouvel enfant pour l'affichage

      const parent = parents.find(p => p.id === newEnfant.parentId);
      if (!parent) {
        throw new Error("Veuillez sélectionner un parent valide");
      }
      const nouvelEnfant: Enfant = {
        id: response.idEnfant,
        nom: response.nom,
        prenom: response.prenom,
        age: response.age,
        classe: response.classe,
        nomClasse: response.classeNom,
        imageUrl: response.imageUrl || '/images/default-child.jpg',
        parentId: response.parentId,
        statut: StatutClient.ACTIF,
        dateInscription: new Date().toISOString().split('T')[0],
        dernierAcces: new Date().toISOString().split('T')[0]
      };
      
      // Ajouter à la liste
      setEnfants(prev => [...prev, nouvelEnfant]);
      
      alert(`Enfant "${nouvelEnfant.prenom} ${nouvelEnfant.nom}" ajouté avec succès`);
      
      // Réinitialiser le formulaire
      setNewEnfant({
        nom: "",
        prenom: "",
        age: 3,
        classe: "Petite Section",
        image: "/images/default-child.jpg",
        statut: StatutClient.EN_ATTENTE,
        parentId: ""
      });
      
      setIsAddModalOpen(false);
      
    } catch (error: any) {
      console.error("Erreur lors de l'ajout:", error);
      alert(`Erreur: ${error.message}`);
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
    const parent = parents.find(p => p.id === parentId);
    return parent || {
      nom: 'Non',
      prenom: 'Parent',
      image: '/images/default-parent.jpg',
      email: '',
      telephone: ''
    } as Parent;
  };
   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des enfants...</p>
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
            onClick={fetchData}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête principal avec titre et bouton d'ajout */}
      <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-white dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Liste des Enfants
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gérez les enfants et leurs informations
            </p> */}
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
                  <option key={option.id} value={option.id}>
                    {option.label}
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
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600  border-b border-blue-100 dark:border-blue-800/30 p-3">
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
        parents={parents}
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
          parent={getParentInfo(selectedEnfant.parentId)}
        />
      )}

      {modalType === 'edit' && selectedEnfant && (
        <EnfantForm
          isOpen={true}
          onClose={closeModal}
          enfant={selectedEnfant}
          formData={editForm as EnfantFormData & { parentId: string }}
          // formData={editForm}
          onFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
          onSave={handleSaveEdit}
          parentOptions={parents}
          // parentOptions={parentOptions.filter(opt => opt !== "Tous")}
          isEditing={true}
          onImageChange={(file) => setImageFile(file)}
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
          parentOptions={parents}
          // parentOptions={parentOptions.filter(opt => opt !== "Tous")}
          onImageChange={(file) => setImageFile(file)}
          isEditing={false}
        />
      )}
    </div>
  );
}