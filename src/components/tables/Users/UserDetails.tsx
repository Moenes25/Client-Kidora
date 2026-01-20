import { useState, useEffect } from "react";
import { RoleUsers, StatutClient } from '../../../types/auth.types';
import { Utilisateur } from './types';
import { imageApi } from "../../../services/api/imageService";

interface UserDetailsProps {
  user: Utilisateur | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetails({ user, isOpen, onClose }: UserDetailsProps) {
  const [userImageUrl, setUserImageUrl] = useState<string>('/default-avatar.png');


  // Charger les images quand le modal s'ouvre ou quand l'utilisateur change
  useEffect(() => {
    if (isOpen && user) {
      loadAllImages();
    } else {
      const defaultImage = imageApi.getImageUrl('/uploads/users/default-avatar-user.jpg');
      setUserImageUrl(defaultImage);
    }
  }, [isOpen, user]);

  const loadAllImages =  () => {
    if (!user) return;
      if (user.image) {
          const imageUrl =  imageApi.getImageUrl(user.image);
          setUserImageUrl(imageUrl);
        } else {
          const defaultImageUrl =  imageApi.getImageUrl('/uploads/users/default-avatar-user.jpg');
          setUserImageUrl(defaultImageUrl);
        }
      

   
  };



  if (!isOpen || !user) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (statut: string) => {
    switch(statut) {
      case StatutClient.ACTIF: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case StatutClient.INACTIF: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case StatutClient.EN_ATTENTE: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getRoleDisplay = (role: string) => {
    return role === RoleUsers.PARENT  ? 'Parent' : role === RoleUsers.EDUCATEUR ? 'Éducateur' : 'Adminstrateur';
  };

  const countEnfants = () => {
    return user.enfants?.images?.length || 0;
  };

  // Gestionnaire d'erreur pour les images
  const handleUserImageError = () => {
   const defaultImage = imageApi.getImageUrl('/uploads/users/default-avatar-user.png');
  setUserImageUrl(defaultImage);
  };

  const handleChildImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
     e.currentTarget.src = imageApi.getImageUrl('/uploads/enfants/default-avatar-enfant.png');
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails de l'Utilisateur
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Informations complètes de {user.nomPrenom}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Section Profil */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="relative">
                <div className="w-20 h-20 overflow-hidden rounded-full">
                 
                    <img
                      src={userImageUrl}
                      alt={user.nomPrenom}
                      className="w-full h-full object-cover"
                      onError={handleUserImageError}
                      loading="lazy"
                    />
                  
                </div>
                <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 text-xs rounded-full border-2 border-white dark:border-gray-800 ${
                  user.role === RoleUsers.PARENT
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                    : user.role === RoleUsers.EDUCATEUR
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {getRoleDisplay(user.role)}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{user.nomPrenom}</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Membre depuis le {formatDate(user.dateCreation)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.statut)}`}>
                    {user.statut === StatutClient.ACTIF ? 'Actif' : 
                    user.statut === StatutClient.INACTIF ? 'Inactif' :
                    'En attente'}
                  </span>
                  {user.classe && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                      {user.classe}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Informations de Contact</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${user.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${user.telephone}`} className="text-gray-800 dark:text-gray-300 hover:underline">
                      {user.telephone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Activité</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dernière connexion:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(user.derniereConnexion)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date d'inscription:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(user.dateCreation)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Enfants (pour les parents) */}
            {user.role === RoleUsers.PARENT && user.enfants && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">Enfants inscrits</h5>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {countEnfants()} enfant{countEnfants() > 1 ? 's' : ''}
                  </span>
                </div>
                {user.enfants.images.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Aucun enfant inscrit
                  </p>
                ) :  (
                  // Images chargées
                  <div className="flex gap-2">
                    {user.enfants.images.map((imagePath, index) => (
                      <div key={index} className="w-12 h-12 overflow-hidden rounded-full">
                        <img
                          src={imageApi.getImageUrl(imagePath)}
                          alt={`Enfant ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={handleChildImageError}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section Classe (pour les éducateurs) */}
            {user.role === RoleUsers.EDUCATEUR && user.classe && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Classe assignée</h5>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">🏫</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.classe}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Classe principale</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                // onEdit(user);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Modifier cet utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}