import { useEffect, useState } from "react";
import Badge from "../../ui/badge/Badge";
import { Parent } from "./types";
import { imageApi } from "../../../services/api/imageService";

interface ParentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
}

export default function ParentDetails({ isOpen, onClose, parent }: ParentDetailsProps) {
  const [parentImageUrl, setParentImageUrl] = useState<string>('/default-avatar.png');
  const [childrenImageUrls, setChildrenImageUrls] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Charger les images quand le modal s'ouvre ou quand le parent change
  useEffect(() => {
    if (isOpen && parent) {
      loadAllImages();
    } else {
      // Réinitialiser les URLs quand le modal se ferme
      setParentImageUrl('/default-avatar.png');
      setChildrenImageUrls([]);
    }
  }, [isOpen, parent]);

  const loadAllImages = async () => {
    if (!parent) return;
    
    setLoadingImages(true);
    try {
      // Charger l'image du parent
      if (parent.image) {
        try {
          const parentUrl = await imageApi.getImage(parent.image);
          setParentImageUrl(parentUrl);
        } catch (error) {
          console.error('Erreur de chargement de l\'image du parent:', error);
          setParentImageUrl('/default-avatar.png');
        }
      }

      // Charger les images des enfants
      if (parent.enfants?.images?.length > 0) {
        const childPromises = parent.enfants.images.map(async (imagePath, index) => {
          try {
            if (!imagePath || imagePath.trim() === '') {
              return '/default-child-avatar.png';
            }
            return await imageApi.getImage(imagePath);
          } catch (error) {
            console.error(`Erreur de chargement de l'image enfant ${index + 1}:`, error);
            return '/default-child-avatar.png';
          }
        });

        const childUrls = await Promise.all(childPromises);
        setChildrenImageUrls(childUrls);
      }
    } catch (error) {
      console.error('Erreur générale de chargement des images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  // Nettoyage des URLs blob
  useEffect(() => {
    return () => {
      // Nettoyer l'URL du parent
      if (parentImageUrl && parentImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(parentImageUrl);
      }
      
      // Nettoyer les URLs des enfants
      childrenImageUrls.forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [parentImageUrl, childrenImageUrls]);

  if (!isOpen || !parent) return null;

  const getBadgeColor = (statut: string) => {
    switch(statut) {
      case "Actif": return "success";
      case "En attente": return "warning";
      case "Inactif": return "error";
      default: return "primary";
    }
  };

  // Gestionnaire d'erreur pour les images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/default-avatar.png';
  };

  const handleChildImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    e.currentTarget.src = '/default-child-avatar.png';
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails du Parent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Informations détaillées
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

          <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Section Photo et infos du parent */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                {loadingImages ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
                ) : (
                  <img
                    src={parentImageUrl}
                    alt={`${parent.prenom} ${parent.nom}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {parent.nom} {parent.prenom}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    size="sm"
                    color={getBadgeColor(parent.statut)}
                  >
                    {parent.statut}
                  </Badge>
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                    {parent.relation}
                  </span>
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a 
                      href={`mailto:${parent.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {parent.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Téléphone</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a 
                      href={`tel:${parent.telephone}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {parent.telephone}
                    </a>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Profession</h5>
                  <p className="text-gray-900 dark:text-white">{parent.profession || 'Non spécifié'}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre d'enfants</h5>
                  <p className="text-gray-900 dark:text-white">
                    {parent.enfants?.images?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Section Enfants */}
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Enfants</h5>
              {parent.enfants?.images?.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 italic">Aucun enfant associé</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {loadingImages ? (
                    // Placeholders pendant le chargement
                    Array.from({ length: parent.enfants?.images?.length || 0 }).map((_, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                          <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
                        </div>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Chargement...</p>
                      </div>
                    ))
                  ) : (
                    // Images chargées
                    childrenImageUrls.map((imageUrl, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                          <img
                            src={imageUrl}
                            alt={`Enfant ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => handleChildImageError(e, index)}
                            loading="lazy"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Enfant {index + 1}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}