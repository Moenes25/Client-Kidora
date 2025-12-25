import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState, useMemo } from "react";

interface Utilisateur {
  id: number;
  nomPrenom: string;
  email: string;
  telephone: string;
  role: 'parent' | 'educateur';
  statut: 'actif' | 'inactif' | 'en_attente';
  dateCreation: string;
  derniereConnexion: string;
  image: string;
  enfants?: {
    images: string[];
  };
  classe?: string;
}

// Define the table data using the interface
const tableData: Utilisateur[] = [
  {
    id: 1,
    nomPrenom: "Sophie Martin",
    email: "sophie.martin@email.com",
    telephone: "+33 6 12 34 56 78",
    role: 'parent',
    statut: 'actif',
    dateCreation: "2024-01-15",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-09.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
      ]
    }
  },
  {
    id: 2,
    nomPrenom: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    telephone: "+33 6 23 45 67 89",
    role: 'parent',
    statut: 'actif',
    dateCreation: "2024-01-20",
    derniereConnexion: "2024-03-19",
    image: "/images/user/user-17.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_3.jpg",
      ]
    }
  },
  {
    id: 3,
    nomPrenom: "Marie Lambert",
    email: "marie.lambert@email.com",
    telephone: "+33 6 34 56 78 90",
    role: 'parent',
    statut: 'en_attente',
    dateCreation: "2024-02-05",
    derniereConnexion: "2024-02-05",
    image: "/images/user/user-12.jpg",
    enfants: {
      images: []
    }
  },
  {
    id: 4,
    nomPrenom: "Jean Petit",
    email: "jean.petit@email.com",
    telephone: "+33 6 45 67 89 01",
    role: 'parent',
    statut: 'inactif',
    dateCreation: "2023-12-10",
    derniereConnexion: "2024-01-15",
    image: "/images/user/user-10.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
        "/images/3-4_ans/enfant_6.jpg",
      ]
    }
  },
  {
    id: 5,
    nomPrenom: "Laura Bernard",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    role: 'educateur',
    statut: 'actif',
    dateCreation: "2024-01-10",
    derniereConnexion: "2024-03-21",
    image: "/images/user/user-21.jpg",
    classe: "(3-4) ans"
  },
  {
    id: 6,
    nomPrenom: "Pierre Moreau",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    role: 'educateur',
    statut: 'actif',
    dateCreation: "2024-01-25",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-25.jpg",
    classe: "(6-7) ans"
  },
  {
    id: 7,
    nomPrenom: "Julie Leroy",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    role: 'educateur',
    statut: 'en_attente',
    dateCreation: "2024-02-15",
    derniereConnexion: "2024-02-15",
    image: "/images/user/user-33.jpg",
    classe: "(4-5) ans"
  },
  {
    id: 8,
    nomPrenom: "Marc Blanc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    role: 'educateur',
    statut: 'inactif',
    dateCreation: "2023-11-30",
    derniereConnexion: "2024-01-10",
    image: "/images/user/user-27.jpg",
    classe: "(8-9) ans"
  }
];

export default function BasicTablesUsers() {
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");

  // Options uniques pour les filtres
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(tableData.map(user => user.role)));
    return ["Tous", ...roles.map(r => r === 'parent' ? 'Parent' : 'Éducateur')];
  }, []);

  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(tableData.map(user => user.statut)));
    return ["Tous", ...statuts.map(s => 
      s === 'actif' ? 'Actif' : 
      s === 'inactif' ? 'Inactif' : 
      'En attente'
    )];
  }, []);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return tableData.filter(user => {
      const matchesRole = !roleFilter || roleFilter === "Tous" || 
        (roleFilter === "Parent" && user.role === 'parent') ||
        (roleFilter === "Éducateur" && user.role === 'educateur');
      
      const matchesStatut = !statutFilter || statutFilter === "Tous" || 
        (statutFilter === "Actif" && user.statut === 'actif') ||
        (statutFilter === "Inactif" && user.statut === 'inactif') ||
        (statutFilter === "En attente" && user.statut === 'en_attente');
      
      return matchesRole && matchesStatut;
    });
  }, [roleFilter, statutFilter]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Obtenir l'affichage du rôle
  const getRoleDisplay = (role: string) => {
    return role === 'parent' ? 'Parent' : 'Éducateur';
  };

  // Obtenir la couleur du badge de rôle
  const getRoleColor = (role: string) => {
    return role === 'parent' 
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700'
      : 'bg-purple-50 text-purple-600 dark:bg-purple-100 dark:text-purple-700';
  };

  // Gérer les actions sur les utilisateurs
  const handleEdit = (utilisateur: Utilisateur) => {
    console.log("Éditer l'utilisateur:", utilisateur);
    // Implémentez votre logique d'édition ici
  };

  const handleDelete = (utilisateur: Utilisateur) => {
    console.log("Supprimer l'utilisateur:", utilisateur);
    // Implémentez votre logique de suppression ici
  };

  const handleView = (utilisateur: Utilisateur) => {
    console.log("Voir les détails de l'utilisateur:", utilisateur);
    // Implémentez votre logique de visualisation ici
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête avec filtres */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtre par rôle */}
          <div className="w-full sm:w-auto">
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {roleOptions.map((option) => (
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
                setRoleFilter("");
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
          {filteredData.length} utilisateur(s) trouvé(s)
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
                Utilisateur
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Rôle
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Contact
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
                Dernière connexion
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
            {filteredData.map((utilisateur) => (
              <TableRow key={utilisateur.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={utilisateur.image}
                        alt={utilisateur.nomPrenom}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {utilisateur.nomPrenom}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {formatDate(utilisateur.dateCreation)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(utilisateur.role)}`}>
                    {getRoleDisplay(utilisateur.role)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <a 
                      href={`mailto:${utilisateur.email}`} 
                      className="block text-sm hover:text-blue-600 hover:underline"
                    >
                      {utilisateur.email}
                    </a>
                    <a 
                      href={`tel:${utilisateur.telephone}`} 
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:underline"
                    >
                      {utilisateur.telephone}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      utilisateur.statut === 'actif'
                        ? "success"
                        : utilisateur.statut === 'en_attente'
                          ? "warning"
                          : "error"
                    }
                  >
                    {utilisateur.statut === 'actif' ? 'Actif' : 
                     utilisateur.statut === 'inactif' ? 'Inactif' : 
                     'En attente'}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <span className="block text-sm">
                      {formatDate(utilisateur.derniereConnexion)}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {new Date(utilisateur.derniereConnexion).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    {/* Bouton Voir */}
                    <button
                      onClick={() => handleView(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Voir les détails"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>

                    {/* Bouton Éditer */}
                    <button
                      onClick={() => handleEdit(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => handleDelete(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                      title="Supprimer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}