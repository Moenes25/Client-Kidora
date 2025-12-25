import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState } from "react";

interface Educateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  image: string;
  specialite: string;
  experience: string;
  disponibilite: 'disponible' | 'occupe' | 'absence';
  classes: string[];
  dateEmbauche: string;
  statut: 'actif' | 'inactif';
}

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
  const [statutFilter, setStatutFilter] = useState<string>("");

  // Options pour les filtres
  const disponibiliteOptions = ["Toutes", "Disponible", "Occupé", "Absence"];
  const statutOptions = ["Tous", "Actif", "Inactif"];
  const [selectedEducateur, setSelectedEducateur] = useState<Educateur | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'disponibilite' | 'delete' | null>(null);
  const [editForm, setEditForm] = useState<Partial<Educateur>>({});

  // Filtrer les données
  const filteredEducateurs = educateursData.filter(educateur => {
    const matchesDisponibilite = !disponibiliteFilter || disponibiliteFilter === "Toutes" || 
      (disponibiliteFilter === "Disponible" && educateur.disponibilite === 'disponible') ||
      (disponibiliteFilter === "Occupé" && educateur.disponibilite === 'occupe') ||
      (disponibiliteFilter === "Absence" && educateur.disponibilite === 'absence');
    
    const matchesStatut = !statutFilter || statutFilter === "Tous" || 
      (statutFilter === "Actif" && educateur.statut === 'actif') ||
      (statutFilter === "Inactif" && educateur.statut === 'inactif');
    
    return matchesDisponibilite && matchesStatut;
  });

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
        statut: educateur.statut
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

  

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête avec filtres */}
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

          {/* Bouton pour réinitialiser les filtres */}
          <div className="w-full sm:w-auto flex items-end">
            <button
              onClick={() => {
                setDisponibiliteFilter("");
                setStatutFilter("");
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
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nom
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Spécialité
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Expérience
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Disponibilité
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Classes
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {filteredEducateurs.map((educateur) => (
              <TableRow key={educateur.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
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
                    <button  onClick={() => handleView(educateur)} 
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Voir les détails"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button  onClick={() => handleEdit(educateur)}
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
                    <button  onClick={() => handleDelete(educateur)}
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
            ))}
          </TableBody>
        </Table>
      </div>

     {/* {modalType === 'view' && selectedEducateur && (
   <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md my-8 mx-4">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Détails de {selectedEducateur.prenom} {selectedEducateur.nom}
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 overflow-hidden rounded-full">
              <img
                src={selectedEducateur.image}
                alt={`${selectedEducateur.prenom} ${selectedEducateur.nom}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedEducateur.prenom} {selectedEducateur.nom}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  size="sm"
                  color={getDisponibiliteColor(selectedEducateur.disponibilite)}
                >
                  {getDisponibiliteText(selectedEducateur.disponibilite)}
                </Badge>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedEducateur.statut === 'actif' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {selectedEducateur.statut === 'actif' ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedEducateur.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Téléphone
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedEducateur.telephone}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Spécialité
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedEducateur.specialite}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Expérience
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedEducateur.experience}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Date d'embauche
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatDate(selectedEducateur.dateEmbauche)}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Classes assignées
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedEducateur.classes.map((classe, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {classe}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{modalType === 'edit' && selectedEducateur && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Éditer {selectedEducateur.prenom} {selectedEducateur.nom}
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={editForm.nom || ''}
                onChange={(e) => setEditForm({...editForm, nom: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={editForm.prenom || ''}
                onChange={(e) => setEditForm({...editForm, prenom: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={editForm.email || ''}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={editForm.telephone || ''}
              onChange={(e) => setEditForm({...editForm, telephone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Spécialité
            </label>
            <input
              type="text"
              value={editForm.specialite || ''}
              onChange={(e) => setEditForm({...editForm, specialite: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Disponibilité
              </label>
              <select
                value={editForm.disponibilite || ''}
                onChange={(e) => setEditForm({...editForm, disponibilite: e.target.value as 'disponible' | 'occupe' | 'absence'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="disponible">Disponible</option>
                <option value="occupe">Occupé</option>
                <option value="absence">Absence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <select
                value={editForm.statut || ''}
                onChange={(e) => setEditForm({...editForm, statut: e.target.value as 'actif' | 'inactif'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Classes (séparées par des virgules)
            </label>
            <input
              type="text"
              value={editForm.classes?.join(', ') || ''}
              onChange={(e) => setEditForm({...editForm, classes: e.target.value.split(',').map(c => c.trim())})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Petite Section, Moyenne Section"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              onClick={saveEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{modalType === 'disponibilite' && selectedEducateur && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Changer la disponibilité
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Sélectionnez la nouvelle disponibilité pour {selectedEducateur.prenom} {selectedEducateur.nom}
          </p>

          <button
            onClick={() => changeDisponibilite('disponible')}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 dark:border-gray-700 dark:hover:bg-green-900/20 dark:hover:border-green-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-900 dark:text-white">Disponible</span>
            </div>
            {selectedEducateur.disponibilite === 'disponible' && (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={() => changeDisponibilite('occupe')}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 dark:border-gray-700 dark:hover:bg-yellow-900/20 dark:hover:border-yellow-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="font-medium text-gray-900 dark:text-white">Occupé</span>
            </div>
            {selectedEducateur.disponibilite === 'occupe' && (
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={() => changeDisponibilite('absence')}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 dark:border-gray-700 dark:hover:bg-red-900/20 dark:hover:border-red-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-medium text-gray-900 dark:text-white">Absence</span>
            </div>
            {selectedEducateur.disponibilite === 'absence' && (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
)} */}

{/* {modalType === 'delete' && selectedEducateur && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm">
      <div className="p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.24 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
            Supprimer l'éducateur
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer l'éducateur{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedEducateur.prenom} {selectedEducateur.nom}
              </span>
              ? Cette action est irréversible.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
)} */}

    </div>

    
  );
}