import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import DeleteConfirmation from "./Educateurs/DeleteConfirmation";
import EducateurForm from "./Educateurs/EducateurForm";
import EducateurDetails from "./Educateurs/EducateurDetails";
import {Educateur} from "./Educateurs/Types";
// interface Educateur {
//   id: number;
//   nom: string;
//   prenom: string;
//   email: string;
//   telephone: string;
//   image: string;
//   specialite: string;
//   experience: string;
//   disponibilite: 'disponible' | 'occupe' | 'absence';
//   classes: string[];
//   dateEmbauche: string;
//   statut: 'actif' | 'inactif';
// }

// Define the table data using the interface
const educateursData: Educateur[] = [
  {
    id: 1,
    nom: "Bernard",
    prenom: "Laura",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    image: "/images/user/user-21.jpg",
    specialite: "Pédagogie Montessori",
    experience: "8 ans",
    disponibilite: 'disponible',
    classes: ["Petite Section", "Moyenne Section"],
    dateEmbauche: "2020-03-15",
    statut: 'actif'
  },
  {
    id: 2,
    nom: "Moreau",
    prenom: "Pierre",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    image: "/images/user/user-25.jpg",
    specialite: "Langage et communication",
    experience: "5 ans",
    disponibilite: 'occupe',
    classes: ["Grande Section", "CP"],
    dateEmbauche: "2021-08-22",
    statut: 'actif'
  },
  {
    id: 3,
    nom: "Leroy",
    prenom: "Julie",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    image: "/images/user/user-33.jpg",
    specialite: "Activités créatives",
    experience: "3 ans",
    disponibilite: 'disponible',
    classes: ["Toute Petite Section", "Petite Section"],
    dateEmbauche: "2022-01-10",
    statut: 'actif'
  },
  {
    id: 4,
    nom: "Blanc",
    prenom: "Marc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    image: "/images/user/user-27.jpg",
    specialite: "Psychologie infantile",
    experience: "12 ans",
    disponibilite: 'absence',
    classes: ["CE1", "CE2"],
    dateEmbauche: "2015-09-05",
    statut: 'inactif'
  },
  {
    id: 5,
    nom: "Dubois",
    prenom: "Émilie",
    email: "emilie.dubois@email.com",
    telephone: "+33 6 90 12 34 56",
    image: "/images/user/user-22.jpg",
    specialite: "Motricité fine",
    experience: "6 ans",
    disponibilite: 'disponible',
    classes: ["Moyenne Section", "Grande Section"],
    dateEmbauche: "2021-04-18",
    statut: 'actif'
  },
  {
    id: 6,
    nom: "Garcia",
    prenom: "Thomas",
    email: "thomas.garcia@email.com",
    telephone: "+33 6 01 23 45 67",
    image: "/images/user/user-28.jpg",
    specialite: "Éveil musical",
    experience: "4 ans",
    disponibilite: 'occupe',
    classes: ["Petite Section", "Moyenne Section"],
    dateEmbauche: "2022-11-30",
    statut: 'actif'
  },
  {
    id: 7,
    nom: "Petit",
    prenom: "Charlotte",
    email: "charlotte.petit@email.com",
    telephone: "+33 6 12 34 56 78",
    image: "/images/user/user-23.jpg",
    specialite: "Langues étrangères",
    experience: "7 ans",
    disponibilite: 'disponible',
    classes: ["CP", "CE1"],
    dateEmbauche: "2020-06-25",
    statut: 'actif'
  },
  {
    id: 8,
    nom: "Rousseau",
    prenom: "Nicolas",
    email: "nicolas.rousseau@email.com",
    telephone: "+33 6 23 45 67 89",
    image: "/images/user/user-29.jpg",
    specialite: "Activités sportives",
    experience: "9 ans",
    disponibilite: 'absence',
    classes: ["Grande Section", "CP"],
    dateEmbauche: "2018-02-14",
    statut: 'inactif'
  },
];

export default function GestionEducateurs() {
  const [disponibiliteFilter, setDisponibiliteFilter] = useState<string>("");
  const [specialiteFilter, setSpecialiteFilter] = useState<string>("");
  
  // Nouveaux états pour la sélection
  const [selectedEducateurs, setSelectedEducateurs] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Educateur>>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    image: "/images/user/default-avatar.jpg",
    specialite: "",
    experience: "",
    disponibilite: 'disponible',
    classes: [],
    statut: 'actif'
  });

  // Options pour les filtres
  const disponibiliteOptions = ["Toutes", "Disponible", "Occupé", "Absence"];
  
  // Extraire toutes les spécialités uniques des éducateurs
  const specialiteOptions = ["Toutes", ...new Set(educateursData.map(e => e.specialite))];
  
  const [selectedEducateur, setSelectedEducateur] = useState<Educateur | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'disponibilite' | 'delete' | null>(null);
  const [editForm, setEditForm] = useState<Partial<Educateur>>({});

  // Filtrer les données
  const filteredEducateurs = educateursData.filter(educateur => {
    const matchesDisponibilite = !disponibiliteFilter || disponibiliteFilter === "Toutes" || 
      (disponibiliteFilter === "Disponible" && educateur.disponibilite === 'disponible') ||
      (disponibiliteFilter === "Occupé" && educateur.disponibilite === 'occupe') ||
      (disponibiliteFilter === "Absence" && educateur.disponibilite === 'absence');
    
    const matchesSpecialite = !specialiteFilter || specialiteFilter === "Toutes" || 
      educateur.specialite === specialiteFilter;
    
    return matchesDisponibilite && matchesSpecialite;
  });

  // Gestion de la sélection
  useEffect(() => {
    if (selectedEducateurs.length === filteredEducateurs.length && filteredEducateurs.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedEducateurs, filteredEducateurs]);

  // Sélectionner/déselectionner tous
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEducateurs([]);
    } else {
      const allIds = filteredEducateurs.map(educateur => educateur.id);
      setSelectedEducateurs(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  // Sélectionner/déselectionner un éducateur
  const handleSelectEducateur = (id: number) => {
    if (selectedEducateurs.includes(id)) {
      setSelectedEducateurs(selectedEducateurs.filter(educateurId => educateurId !== id));
    } else {
      setSelectedEducateurs([...selectedEducateurs, id]);
    }
  };

  // Actions multiples
  const handleActivateSelected = () => {
    // Ici, vous implémenteriez l'activation des éducateurs sélectionnés
    console.log(`Activation de ${selectedEducateurs.length} éducateur(s)`);
    setSelectedEducateurs([]);
  };

  const handleDeactivateSelected = () => {
    // Ici, vous implémenteriez la désactivation des éducateurs sélectionnés
    console.log(`Désactivation de ${selectedEducateurs.length} éducateur(s)`);
    setSelectedEducateurs([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEducateurs.length} éducateur(s) ?`)) {
      // Ici, vous implémenteriez la suppression des éducateurs sélectionnés
      console.log(`Suppression de ${selectedEducateurs.length} éducateur(s)`);
      setSelectedEducateurs([]);
    }
  };

  const handleCancelSelection = () => {
    setSelectedEducateurs([]);
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Obtenir la couleur du badge de disponibilité
  const getDisponibiliteColor = (disponibilite: string) => {
    switch(disponibilite) {
      case 'disponible': return "success";
      case 'occupe': return "warning";
      case 'absence': return "error";
      default: return "primary";
    }
  };

  // Obtenir le texte de disponibilité
  const getDisponibiliteText = (disponibilite: string) => {
    switch(disponibilite) {
      case 'disponible': return "Disponible";
      case 'occupe': return "Occupé";
      case 'absence': return "Absence";
      default: return "Inconnu";
    }
  };

  const handleView = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setModalType('view');
  };

  // Éditer l'éducateur
  const handleEdit = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setEditForm({
      nom: educateur.nom,
      prenom: educateur.prenom,
      email: educateur.email,
      telephone: educateur.telephone,
      specialite: educateur.specialite,
      experience: educateur.experience,
      disponibilite: educateur.disponibilite,
      classes: [...educateur.classes],
      statut: educateur.statut,
      image: educateur.image
     
    });
    setModalType('edit');
  };

  // Changer la disponibilité
  const handleChangeDisponibilite = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setModalType('disponibilite');
  };

  // Supprimer l'éducateur
  const handleDelete = (educateur: Educateur) => {
    setSelectedEducateur(educateur);
    setModalType('delete');
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    if (selectedEducateur) {
      // Ici, vous implémenteriez la suppression réelle
      console.log(`Éducateur ${selectedEducateur.prenom} ${selectedEducateur.nom} supprimé`);
      closeModal();
    }
  };

  // Sauvegarder les modifications
  const saveEdit = () => {
    if (selectedEducateur && editForm) {
      // Ici, vous implémenteriez la sauvegarde réelle
      console.log(`Éducateur ${selectedEducateur.prenom} ${selectedEducateur.nom} modifié`, editForm);
      closeModal();
    }
  };

  // Changer la disponibilité
  const changeDisponibilite = (newDisponibilite: 'disponible' | 'occupe' | 'absence') => {
    if (selectedEducateur) {
      // Ici, vous implémenteriez le changement de disponibilité
      console.log(`Disponibilité de ${selectedEducateur.prenom} ${selectedEducateur.nom} changée à ${newDisponibilite}`);
      closeModal();
    }
  };

  // Fermer le modal
  const closeModal = () => {
    setSelectedEducateur(null);
    setModalType(null);
    setEditForm({});
  };

  // Ajouter un éducateur
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const saveAdd = () => {
    console.log("Nouvel éducateur:", addForm);
    
    // Simulation de création
    const newEducateur: Educateur = {
      id: educateursData.length + 1,
      nom: addForm.nom || "",
      prenom: addForm.prenom || "",
      email: addForm.email || "",
      telephone: addForm.telephone || "",
      image: addForm.image || "/images/user/default-avatar.jpg",
      specialite: addForm.specialite || "",
      experience: addForm.experience || "",
      disponibilite: addForm.disponibilite || 'disponible',
      classes: addForm.classes || [],
      dateEmbauche: new Date().toISOString().split('T')[0],
      statut: addForm.statut || 'actif'
    };
    
    console.log("Éducateur créé:", newEducateur);
    alert(`Éducateur "${newEducateur.prenom} ${newEducateur.nom}" ajouté avec succès !`);
    
    // Réinitialiser le formulaire
    setAddForm({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      image: "/images/user/default-avatar.jpg",
      specialite: "",
      experience: "",
      disponibilite: 'disponible',
      classes: [],
      statut: 'actif'
    });
    
    setShowAddModal(false);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddForm({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      image: "/images/user/default-avatar.jpg",
      specialite: "",
      experience: "",
      disponibilite: 'disponible',
      classes: [],
      statut: 'actif'
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête avec titre et bouton */}
      <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-white dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Liste des Educateurs
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gérez les éducateurs et leurs informations
            </p>
          </div>
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md"
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
            Nouveau Educateur
          </button>
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtre par disponibilité */}
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
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par spécialité */}
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
                setDisponibiliteFilter("");
                setSpecialiteFilter("");
              }}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>
        
        {/* Compteur de résultats */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredEducateurs.length} éducateur(s) trouvé(s)
          {selectedEducateurs.length > 0 && (
            <span className="ml-2 font-medium text-blue-600 dark:text-blue-400">
              • {selectedEducateurs.length} sélectionné(s)
            </span>
          )}
        </div>
      </div>

      {/* Header d'actions multiples (apparaît quand des éléments sont sélectionnés) */}
      {selectedEducateurs.length > 0 && (
        <div className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
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

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-700">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-white bg-white/20 border-white/30 rounded focus:ring-white dark:focus:ring-white focus:ring-2 mr-3"
                  />
                  Nom
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Spécialité
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Expérience
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Disponibilité
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Classes
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {filteredEducateurs.map((educateur) => {
              const isSelected = selectedEducateurs.includes(educateur.id);
              return (
                <TableRow 
                  key={educateur.id}
                  className={isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""}
                >
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectEducateur(educateur.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={educateur.image}
                            alt={`${educateur.prenom} ${educateur.nom}`}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {educateur.prenom} {educateur.nom}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {educateur.telephone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <a 
                      href={`mailto:${educateur.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {educateur.email}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                      {educateur.specialite}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{educateur.experience}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={getDisponibiliteColor(educateur.disponibilite)}
                    >
                      {getDisponibiliteText(educateur.disponibilite)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex flex-wrap gap-1">
                      {educateur.classes.map((classe, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-800 dark:text-gray-300"
                        >
                          {classe}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleView(educateur)} 
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                        title="Voir les détails"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(educateur)}
                        className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                        title="Éditer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleChangeDisponibilite(educateur)} 
                        className="p-1.5 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-yellow-900/30"
                        title="Changer disponibilité"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(educateur)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      {modalType === 'view' && selectedEducateur && (
        <EducateurDetails
          isOpen={true}
          onClose={closeModal}
          educateur={selectedEducateur}
          onEdit={() => {
            setModalType('edit');
            setEditForm({
              nom: selectedEducateur.nom,
              prenom: selectedEducateur.prenom,
              email: selectedEducateur.email,
              telephone: selectedEducateur.telephone,
              specialite: selectedEducateur.specialite,
              experience: selectedEducateur.experience,
              disponibilite: selectedEducateur.disponibilite,
              classes: [...selectedEducateur.classes],
              statut: selectedEducateur.statut
            });
          }}
        />
      )}

      {modalType === 'edit' && selectedEducateur && (
        <EducateurForm
          isOpen={true}
          onClose={closeModal}
          formData={editForm}
          onFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
          onSave={saveEdit}
          title="Modifier l'éducateur"
          subtitle={`Modifier le profil de ${selectedEducateur.prenom} ${selectedEducateur.nom}`}
          isEdit={true}
        />
      )}

      {showAddModal && (
        <EducateurForm
          isOpen={true}
          onClose={closeAddModal}
          formData={addForm}
          onFormChange={(field, value) => setAddForm(prev => ({ ...prev, [field]: value }))}
          onSave={saveAdd}
          title="Ajouter un éducateur"
          subtitle="Créer un nouveau profil d'éducateur"
          isEdit={false}
        />
      )}

      {/* Note: Les modaux 'disponibilite' et 'delete' ne sont pas encore implémentés dans les composants séparés */}
      {modalType === 'delete' && selectedEducateur && (
        <DeleteConfirmation
          isOpen={true}
          onClose={closeModal}
          educateur={selectedEducateur}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}