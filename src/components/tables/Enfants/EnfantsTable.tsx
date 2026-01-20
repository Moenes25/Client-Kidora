import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Enfant } from './types';
import { StatutClient } from "../../../types/auth.types";
import { Parent } from "../Parents/types";
import {  useCallback } from "react";
import { imageApi } from "../../../services/api/imageService";

interface EnfantsTableProps {
  enfants: Enfant[];
  viewMode: 'liste' | 'grille';
  selectedEnfants: string[];
  onSelectEnfant: (id: string) => void;
  onSelectAll: () => void;
  isSelectAll: boolean;
  onView: (enfant: Enfant) => void;
  onEdit: (enfant: Enfant) => void;
  onDelete: (enfant: Enfant) => void;
  parents: Parent[];
}


export default function EnfantsTable({ 
  enfants, 
  viewMode, 
  selectedEnfants, 
  onSelectEnfant, 
  onSelectAll, 
  isSelectAll,
  onView,
  onEdit,
  onDelete,
  parents
}: EnfantsTableProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const getStatutText = (statut: string) => {
    return statut === StatutClient.ACTIF ? 'Actif' : 
           statut === StatutClient.INACTIF ? 'Inactif' : 'En attente';
          
  };
  
  const getParentInfo = (parentId: string) => {
    const parent = parents.find(p => p.id === parentId);
    return parent || {
      nom: 'Non',
      prenom: 'Parent',
      image: '',
      email: '',
      telephone: '',
      id: parentId
    };
  };

  

  // Obtenir l'URL d'une image depuis le cache ou charger
  const getImageUrl = useCallback((imagePath: string, type: 'enfant' | 'parent', id: string): string => {
   
    
    // Si pas d'image, retourner image par défaut
    if (!imagePath || imagePath.trim() === '') {
      return type === 'enfant' 
              ? imageApi.getImageUrl('/uploads/enfants/default-avatar-enfant.png') 
              : imageApi.getImageUrl('/uploads/users/default-avatar-parent.png');
    }
    
    
    // Retourner un placeholder pendant le chargement
    return imageApi.getImageUrl(imagePath)
  },[])

  // Gestionnaire d'erreur pour les images
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'enfant' | 'parent') => {
    e.currentTarget.src = type === 'enfant' 
    ? imageApi.getImageUrl('/uploads/enfants/default-avatar-enfant.png')
    : imageApi.getImageUrl('/uploads/users/default-avatar-parent.png');
  }, []);

  if (viewMode === 'grille') {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {enfants.map((enfant) => {
            const parent = getParentInfo(enfant.parentId);
            const enfantImageUrl = getImageUrl(enfant.imageUrl, 'enfant', enfant.id);
            const parentImageUrl = getImageUrl(parent.image, 'parent', parent.id);
            
            return (
              <div 
                key={enfant.id} 
                className={`border rounded-lg p-4 hover:shadow-lg transition-shadow dark:hover:border-gray-600 ${selectedEnfants.includes(enfant.id) ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedEnfants.includes(enfant.id)}
                      onChange={() => onSelectEnfant(enfant.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden rounded-full relative">
                        <img
                          width={48}
                          height={48}
                          src={enfantImageUrl}
                          alt={`${enfant.prenom} ${enfant.nom}`}
                          onError={(e) => handleImageError(e, "enfant")}
                          className="w-full h-full object-cover"
                          loading="lazy"
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
                  </div>
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === StatutClient.ACTIF
                        ? "success"
                        : enfant.statut === StatutClient.INACTIF
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
                    <div className="w-8 h-8 overflow-hidden rounded-full relative">
                      <img
                        width={32}
                        height={32}
                        src={parentImageUrl}
                        alt={`${parent.prenom} ${parent.nom}`}
                        onError={(e) => handleImageError(e, "parent")}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Parent
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {parent.prenom} {parent.nom}
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
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => onView(enfant)}
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
                      onClick={() => onEdit(enfant)}
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(enfant)}
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
            );
          })}
        </div>
      </div>
    );
  }

  // Mode Liste
  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-indigo-500 ">
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2">Enfant</span>
              </div>
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Parent
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Âge & Classe
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
              Date d'inscription
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-white text-start text-theme-xs"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {enfants.map((enfant) => {
            const parent = getParentInfo(enfant.parentId);
            const enfantImageUrl = getImageUrl(enfant.imageUrl, 'enfant', enfant.id);
            const parentImageUrl = getImageUrl(parent.image, 'parent', parent.id);
            
            return (
              <TableRow key={enfant.id} className={selectedEnfants.includes(enfant.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedEnfants.includes(enfant.id)}
                      onChange={() => onSelectEnfant(enfant.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full relative">
                        <img
                          width={40}
                          height={40}
                          src={enfantImageUrl}
                          alt={`${enfant.prenom} ${enfant.nom}`}
                          onError={(e) => handleImageError(e, 'enfant')}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {enfant.prenom} {enfant.nom}
                        </span>
                        {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          ID: {enfant.id}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 overflow-hidden rounded-full relative">
                      <img
                        width={24}
                        height={24}
                        src={parentImageUrl}
                        alt={`${parent.prenom} ${parent.nom}`}
                        onError={(e) => handleImageError(e, 'parent')}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="block text-sm">{parent.prenom} {parent.nom}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <span className="block text-sm">{enfant.age} ans</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">{enfant.nomClasse}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === StatutClient.ACTIF
                        ? "success"
                        : enfant.statut === StatutClient.INACTIF
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
                      onClick={() => onView(enfant)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                      title="Voir les détails"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onEdit(enfant)}
                      className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(enfant)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
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
  );
}