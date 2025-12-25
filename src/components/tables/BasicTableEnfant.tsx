import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState } from "react";

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  image: string;
  parent: {
    nom: string;
    prenom: string;
    image: string;
  };
  statut: 'actif' | 'inactif' | 'en_attente';
  dateInscription: string;
  dernierAcces: string;
}

// Define the table data using the interface
const enfantsData: Enfant[] = [
  {
    id: 1,
    nom: "Martin",
    prenom: "Lucas",
    age: 4,
    classe: "Petite Section",
    image: "/images/3-4_ans/enfant_1.jpg",
    parent: {
      nom: "Martin",
      prenom: "Sophie",
      image: "/images/user/user-09.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-15",
    dernierAcces: "2024-03-20"
  },
  {
    id: 2,
    nom: "Dubois",
    prenom: "Emma",
    age: 3,
    classe: "Toute Petite Section",
    image: "/images/3-4_ans/enfant_2.jpg",
    parent: {
      nom: "Dubois",
      prenom: "Thomas",
      image: "/images/user/user-17.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-20",
    dernierAcces: "2024-03-19"
  },
  {
    id: 3,
    nom: "Lambert",
    prenom: "Hugo",
    age: 5,
    classe: "Moyenne Section",
    image: "/images/3-4_ans/enfant_3.jpg",
    parent: {
      nom: "Lambert",
      prenom: "Marie",
      image: "/images/user/user-12.jpg"
    },
    statut: 'en_attente',
    dateInscription: "2024-02-05",
    dernierAcces: "2024-02-05"
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Léa",
    age: 6,
    classe: "Grande Section",
    image: "/images/3-4_ans/enfant_4.jpg",
    parent: {
      nom: "Petit",
      prenom: "Jean",
      image: "/images/user/user-10.jpg"
    },
    statut: 'inactif',
    dateInscription: "2023-12-10",
    dernierAcces: "2024-01-15"
  },
  {
    id: 5,
    nom: "Bernard",
    prenom: "Nathan",
    age: 4,
    classe: "Petite Section",
    image: "/images/3-4_ans/enfant_5.jpg",
    parent: {
      nom: "Bernard",
      prenom: "Laura",
      image: "/images/user/user-21.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-10",
    dernierAcces: "2024-03-21"
  },
  {
    id: 6,
    nom: "Moreau",
    prenom: "Chloé",
    age: 7,
    classe: "CP",
    image: "/images/3-4_ans/enfant_6.jpg",
    parent: {
      nom: "Moreau",
      prenom: "Pierre",
      image: "/images/user/user-25.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-25",
    dernierAcces: "2024-03-20"
  },
  {
    id: 7,
    nom: "Leroy",
    prenom: "Mathis",
    age: 5,
    classe: "Moyenne Section",
    image: "/images/3-4_ans/enfant_7.jpg",
    parent: {
      nom: "Leroy",
      prenom: "Julie",
      image: "/images/user/user-33.jpg"
    },
    statut: 'en_attente',
    dateInscription: "2024-02-15",
    dernierAcces: "2024-02-15"
  },
  {
    id: 8,
    nom: "Blanc",
    prenom: "Zoé",
    age: 8,
    classe: "CE1",
    image: "/images/3-4_ans/enfant_8.jpg",
    parent: {
      nom: "Blanc",
      prenom: "Marc",
      image: "/images/user/user-27.jpg"
    },
    statut: 'inactif',
    dateInscription: "2023-11-30",
    dernierAcces: "2024-01-10"
  },
];

export default function GestionEnfants() {
  const [viewMode, setViewMode] = useState<'liste' | 'grille'>('liste');
  const [classeFilter, setClasseFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>("");

  // Options pour les filtres
  const classeOptions = ["Toutes", "Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1"];
  const statutOptions = ["Tous", "Actif", "Inactif", "En attente"];
  const parentOptions = ["Tous", "Sophie Martin", "Thomas Dubois", "Marie Lambert", "Jean Petit", "Laura Bernard", "Pierre Moreau", "Julie Leroy", "Marc Blanc"]; // AJOUTER ICI
  // Filtrer les données
  const filteredEnfants = enfantsData.filter(enfant => {
    const matchesClasse = !classeFilter || classeFilter === "Toutes" || enfant.classe === classeFilter;
    const matchesStatut = !statutFilter || statutFilter === "Tous" || 
      (statutFilter === "Actif" && enfant.statut === 'actif') ||
      (statutFilter === "Inactif" && enfant.statut === 'inactif') ||
      (statutFilter === "En attente" && enfant.statut === 'en_attente');
      const matchesParent = !parentFilter || parentFilter === "Tous" || // AJOUTER ICI
    `${enfant.parent.prenom} ${enfant.parent.nom}` === parentFilter; // AJOUTER ICI
  
    
    return matchesClasse && matchesStatut && matchesParent;
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

  // Obtenir le texte du statut
  const getStatutText = (statut: string) => {
    return statut === 'actif' ? 'Actif' : 
           statut === 'inactif' ? 'Inactif' : 
           'En attente';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête avec filtres et boutons de vue */}
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


            {/* AJOUTER ICI - Filtre par parent */}
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

      {/* Affichage en mode Liste */}
      {viewMode === 'liste' ? (
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Enfant
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Parent
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Âge & Classe
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Statut
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Date d'inscription
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
              {filteredEnfants.map((enfant) => (
                <TableRow key={enfant.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={enfant.image}
                          alt={`${enfant.prenom} ${enfant.nom}`}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {enfant.prenom} {enfant.nom}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          ID: {enfant.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 overflow-hidden rounded-full">
                        <img
                          width={24}
                          height={24}
                          src={enfant.parent.image}
                          alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                        />
                      </div>
                      <div>
                        <span className="block text-sm">{enfant.parent.prenom} {enfant.parent.nom}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="space-y-1">
                      <span className="block text-sm">{enfant.age} ans</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{enfant.classe}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        enfant.statut === 'actif'
                          ? "success"
                          : enfant.statut === 'inactif'
                            ? "error"
                            : "warning"
                      }
                    >
                      {getStatutText(enfant.statut)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatDate(enfant.dateInscription)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                        title="Voir les détails"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                        title="Éditer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
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
      ) : (
        // Affichage en mode Grille
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEnfants.map((enfant) => (
              <div 
                key={enfant.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow dark:border-gray-700 dark:hover:border-gray-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img
                        width={48}
                        height={48}
                        src={enfant.image}
                        alt={`${enfant.prenom} ${enfant.nom}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {enfant.prenom} {enfant.nom}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {enfant.age} ans • {enfant.classe}
                      </p>
                    </div>
                  </div>
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === 'actif'
                        ? "success"
                        : enfant.statut === 'inactif'
                          ? "error"
                          : "warning"
                    }
                  >
                    {getStatutText(enfant.statut)}
                  </Badge>
                </div>

                {/* Parent */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        width={32}
                        height={32}
                        src={enfant.parent.image}
                        alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Parent
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enfant.parent.prenom} {enfant.parent.nom}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informations */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Inscrit le :</span>
                    <span className="text-gray-700 dark:text-gray-300">{formatDate(enfant.dateInscription)}</span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Dernier accès :</span>
                    <span className="text-gray-700 dark:text-gray-300">{formatDate(enfant.dernierAcces)}</span>
                  </div> */}
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                    title="Voir les détails"
                  >
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Voir
                  </button>
                  <div className="flex space-x-2">
                    <button
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}