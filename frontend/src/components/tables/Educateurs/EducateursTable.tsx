// EducateursTable.tsx
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Educateur } from "../Educateurs/Types";
import { educateurApi } from "../../../services/api/educateurApi";
import { convertBackendToEducateur } from "../Educateurs/Types";
import { useEffect, useState } from "react";
import imageApi from "../../../services/api/imageService";
import { useEducateurImages } from '../../../hooks/useEducateurImages';

interface EducateursTableProps {
  educateurs: Educateur[];
  selectedEducateurs: string[];
  isAllSelected: boolean;
  onSelectAll: () => void;
  onSelectEducateur: (id: string) => void;
  onViewDetails: (educateur: Educateur) => void;
  onEdit: (educateur: Educateur) => void;
  onDelete: (educateur: Educateur) => void;
  onRefresh?: () => void;
}

interface ImageCache {
  [educateurId: string]: string;
}

export default function EducateursTable({
  educateurs,
  selectedEducateurs,
  isAllSelected,
  onSelectAll,
  onSelectEducateur,
  onViewDetails,
  onEdit,
  onDelete,
  onRefresh
}: EducateursTableProps) {
  
  // const [educateurs, setEducateurs] = useState<Educateur[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [imageCache, setImageCache] = useState<ImageCache>({});
  
  // useEffect(() => {
  //   fetchEducateurs();
  // }, []);

 

  useEffect(() => {
    if (educateurs.length > 0) {
      loadEducateursImages();
    };
  }, [educateurs]);

  // const fetchEducateurs = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     // Appel à l'API
  //     const users = await educateurApi.getAllEducateurs();
      
  //     // Conversion des données backend -> frontend
  //     const educateursData = users.map(convertBackendToEducateur);
      
  //     // Mise à jour de l'état
  //     setEducateurs(educateursData);
  //     console.log("les educateurs sont :", educateursData);
      
  //   } catch (error: any) {
  //     setError(`Erreur de chargement: ${error.message}`);
  //     console.error("Erreur lors du chargement des éducateurs:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   const loadEducateursImages = async () => {
    const newCache: ImageCache = { ...imageCache };
    
    for (const educateur of educateurs) {
      // Ne charger que si l'image n'est pas déjà en cache
      if (educateur.image && !newCache[educateur.id]) {
        try {
          const imageUrl = await imageApi.getImage(educateur.image);
          newCache[educateur.id] = imageUrl;
        } catch (error) {
          console.error(`Erreur de chargement de l'image pour ${educateur.prenom} ${educateur.nom}:`, error);
          newCache[educateur.id] = '/default-avatar.png'; // Image par défaut
        }
      }
    }
    
    setImageCache(newCache);
  };

  // Fonction pour obtenir l'URL d'une image depuis le cache
  const getEducateurImage = (educateur: Educateur): string => {
    if (!educateur.image) {
      return '/default-avatar.png';
    }
    
    // Si l'image est déjà en cache
    if (imageCache[educateur.id]) {
      return imageCache[educateur.id];
    }
    
    // Sinon, charger l'image à la volée (lazy loading)
    if (educateur.image) {
      loadSingleImage(educateur);
    }
    
    // Retourner une image de placeholder pendant le chargement
    return '/placeholder-avatar.png';
  };

   const loadSingleImage = async (educateur: Educateur) => {
    if (!educateur.image || imageCache[educateur.id]) return;
    
    try {
      const imageUrl = await imageApi.getImage(educateur.image);
      setImageCache(prev => ({
        ...prev,
        [educateur.id]: imageUrl
      }));
    } catch (error) {
      console.error(`Erreur de chargement de l'image pour ${educateur.id}:`, error);
      setImageCache(prev => ({
        ...prev,
        [educateur.id]: '/default-avatar.png'
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(imageCache).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageCache]);


  //  if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  //         <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des éducateurs...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="p-6">
  //       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
  //         <div className="flex items-center">
  //           <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
  //             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  //           </svg>
  //           <span className="text-red-700 font-medium">{error}</span>
  //         </div>
  //         <button 
  //           onClick={fetchEducateurs}
  //           className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
  //         >
  //           Réessayer
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }


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

   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, educateurId: string) => {
    e.currentTarget.src = '/default-avatar.png';
    // Mettre à jour le cache avec l'image par défaut
    setImageCache(prev => ({
      ...prev,
      [educateurId]: '/default-avatar.png'
    }));
  };

  return (
    <div className="max-w-full overflow-x-auto">
      {/* <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/50 border-b">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {educateurs.length} éducateur(s)
          </span>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          title="Rafraîchir"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rafraîchir
        </button>
      </div> */}
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-indigo-500 ">
          <TableRow>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAllSelected && educateurs.length > 0}
                  onChange={onSelectAll}
                  disabled={educateurs.length === 0}
                  className="w-4 h-4 text-white bg-white/20 border-white/30 rounded focus:ring-white dark:focus:ring-white focus:ring-2 mr-3"
                />
                Nom
              </div>
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Email
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Spécialité
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Expérience
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Disponibilité
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Classes
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]"> */}
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {educateurs.length === 0 ? (
            <TableRow>
              <TableCell  className="px-4 py-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">Aucun éducateur trouvé</p>
                </div>
              </TableCell>
            </TableRow>
          ) :
          (educateurs.map((educateur) => {
            const isSelected = selectedEducateurs.includes(educateur.id);
            const educateurImageUrl = getEducateurImage(educateur);
            return (
              <TableRow key={educateur.id} className={isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectEducateur(educateur.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={educateurImageUrl}
                          // alt={`${educateur.prenom} ${educateur.nom}`}
                           onError={(e) => handleImageError(e, educateur.id)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {educateur.prenom} {educateur.nom}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {educateur.numTel}
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
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => onViewDetails(educateur)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      title="Voir détails"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onEdit(educateur)}
                      className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(educateur)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          }))}
        </TableBody>
      </Table>
    </div>
  );
}