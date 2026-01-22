import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Utilisateur } from './types';
import { RoleUsers, StatutClient } from "../../../types/auth.types";
import { useEffect, useState } from "react";
import { imageApi } from "../../../services/api/imageService";

interface UsersTableProps {
  users: Utilisateur[];
  selectedUsers: string[];
  onSelectUser: (id: string) => void;
  onSelectAll: () => void;
  isSelectAll: boolean;
  onView: (user: Utilisateur) => void;
  onDelete: (user: Utilisateur) => void;
  onToggleStatus: (user: Utilisateur) => void;
  updatingStatus: string | null;
}

interface ImageCache {
  [userId: string]: string;
}

export default function UsersTable({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll, 
  isSelectAll,
  onView,
  onDelete,
  onToggleStatus,
  updatingStatus
}: UsersTableProps) {
  
  const [imageCache, setImageCache] = useState<ImageCache>({});
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  
  // Charger les images quand la liste d'utilisateurs change
  useEffect(() => {
    if (users.length > 0) {
      loadUsersImages();
    }
  }, [users]);

  const loadUsersImages = async () => {
    setLoadingImages(true);
    const newCache: ImageCache = { ...imageCache };
    const usersToLoad = users.slice(0, 20); // Limiter à 20 images pour les performances

    const loadPromises = usersToLoad.map(async (user) => {
      // Ne charger que si l'image n'est pas déjà en cache
      if (user.image && !newCache[user.id]) {
        try {
          const imageUrl = await imageApi.getImage(user.image);
          newCache[user.id] = imageUrl;
        } catch (error) {
          console.error(`Erreur de chargement de l'image pour ${user.nomPrenom}:`, error);
          newCache[user.id] = '/default-avatar.png';
        }
      }
    });

    await Promise.all(loadPromises);
    setImageCache(newCache);
    setLoadingImages(false);
  };

  // Obtenir l'URL de l'image d'un utilisateur
  const getUserImage = (user: Utilisateur): string => {
    if (!user || !user.image || user.image.trim() === '') {
      return '/default-avatar.png';
    }
    
    // Si l'image est déjà en cache
    if (imageCache[user.id]) {
      return imageCache[user.id];
    }
    
    // Sinon, charger l'image à la volée (lazy loading)
    loadSingleImage(user);
    
    // Retourner un placeholder pendant le chargement
    return '/placeholder-avatar.png';
  };

  // Charger une image individuelle
  const loadSingleImage = async (user: Utilisateur) => {
    if (!user.image || imageCache[user.id]) return;
    
    try {
      const imageUrl = await imageApi.getImage(user.image);
      setImageCache(prev => ({
        ...prev,
        [user.id]: imageUrl
      }));
    } catch (error) {
      console.error(`Erreur de chargement de l'image pour ${user.id}:`, error);
      setImageCache(prev => ({
        ...prev,
        [user.id]: '/default-avatar.png'
      }));
    }
  };

  // Nettoyer les URLs blob
  useEffect(() => {
    return () => {
      Object.values(imageCache).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageCache]);

  // Gestionnaire d'erreur pour les images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, userId: string) => {
    e.currentTarget.src = '/default-avatar.png';
    setImageCache(prev => ({
      ...prev,
      [userId]: '/default-avatar.png'
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getRoleDisplay = (role: string) => {
    return role === RoleUsers.PARENT  ? 'Parent' : role === RoleUsers.EDUCATEUR ? 'Éducateur' : 'Adminstrateur';
  };

  const getRoleColor = (role: string) => {
    return role === 'parent' 
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300';
  };

  const getStatusColor = (statut: string | null) => {
    if (!statut) return "dark";
    
    const statutUpper = statut.toUpperCase();
    
    if (statutUpper === StatutClient.ACTIF || statutUpper === 'ACTIF') {
      return "success";
    } 
    else if (statutUpper === StatutClient.EN_ATTENTE || statutUpper === 'EN_ATTENTE') {
      return "warning";
    }
    else if (statutUpper === StatutClient.INACTIF || statutUpper === 'INACTIF') {
      return "error";
    }
    
    return "dark";
  };

  const getStatusDisplay = (statut: string | null) => {
    if (!statut) return 'Non défini';
    
    const statutUpper = statut.toUpperCase();
    
    if (statutUpper === StatutClient.ACTIF || statutUpper === 'ACTIF') {
      return 'Actif';
    }
    else if (statutUpper === StatutClient.INACTIF || statutUpper === 'INACTIF') {
      return 'Inactif';
    }
    else if (statutUpper === StatutClient.EN_ATTENTE || statutUpper === 'EN_ATTENTE') {
      return 'En attente';
    }
    
    return statut;
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        {/* Table Header */}
        <TableHeader className="border-b border-gray-100 bg-indigo-500 ">
          <TableRow>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-white bg-white/20 border-white/30 rounded focus:ring-white dark:focus:ring-white focus:ring-2 mr-3"
                />
                <span className="ml-2">Utilisateur</span>
              </div>
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Rôle
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Contact
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Statut
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Dernière connexion
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
          {users.map((user) => {
            const userImageUrl = getUserImage(user);
            
            return (
              <TableRow key={user.id} className={selectedUsers.includes(user.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => onSelectUser(user.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={userImageUrl}
                          // alt={user.nomPrenom}
                          onError={(e) => handleImageError(e, user.id)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.nomPrenom}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {formatDate(user.dateCreation)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {getRoleDisplay(user.role)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <a 
                      href={`mailto:${user.email}`} 
                      className="block text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {user.email}
                    </a>
                    <a 
                      href={`tel:${user.telephone}`} 
                      className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:underline dark:hover:text-blue-300"
                    >
                      {user.telephone}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={getStatusColor(user.statut)}
                  >
                    {getStatusDisplay(user.statut)}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <span className="block text-sm">
                      {formatDate(user.derniereConnexion)}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {new Date(user.derniereConnexion).toLocaleTimeString('fr-FR', {
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
                      onClick={() => onView(user)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
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

                    {/* Désactiver/Réactiver */}
                    <button 
                      onClick={() => onToggleStatus(user)}
                      disabled={updatingStatus === user.id}
                      className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors dark:text-amber-500 dark:hover:text-amber-400 dark:hover:bg-amber-900/30 disabled:opacity-50"
                      title={user.statut === StatutClient.ACTIF ? "Désactiver" : "Réactiver"}
                    >
                      {updatingStatus === user.id ? (
                        <svg className="w-4.5 h-4.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : user.statut === StatutClient.ACTIF ? (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}