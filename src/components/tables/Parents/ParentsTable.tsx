import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Parent } from "./types";
import { useEffect, useState } from "react";
import { imageApi } from "../../../services/api/imageService";
import { StatutClient } from "../../../types/auth.types";

interface ParentsTableProps {
  parents: Parent[];
  selectedParents: string[];
  isAllSelected: boolean;
  onSelectAll: () => void;
  onSelectParent: (id: string) => void;
  onViewDetails: (parent: Parent) => void;
  onEdit: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

// Supprimer le cache d'images blob car on utilise maintenant des URLs directes
export default function ParentsTable({
  parents,
  selectedParents,
  isAllSelected,
  onSelectAll,
  onSelectParent,
  onViewDetails,
  onEdit,
  onDelete
}: ParentsTableProps) {

  const getBadgeColor = (statut: string) => {
    switch(statut) {
      case StatutClient.ACTIF: return "success";
      case StatutClient.EN_ATTENTE: return "warning";
      case StatutClient.INACTIF: return "error";
      default: return "primary";
    }
  };

  // Simplifier la gestion des images - pas besoin de useEffect pour précharger
  const getParentImageUrl = (parent: Parent): string => {
    if (!parent.image) {
      return '/uploads/users/default-avatar-parent.png';
    }
    
    // Utiliser la méthode simplifiée getImageUrl
    return imageApi.getImageUrl(parent.image);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = imageApi.getImageUrl('/uploads/users/default-avatar-parent.png');
  };

  const getChildImageUrl = (imagePath: string): string => {
    if (!imagePath || imagePath === '') {
      return '/uploads/users/default-avatar-enfant.png';
    }
    
    // Utiliser getImageUrl pour les enfants aussi
    return imageApi.getImageUrl(imagePath);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="border-b bg-indigo-500">
          <TableRow>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-white bg-white/20 border-white/30 rounded focus:ring-white dark:focus:ring-white focus:ring-2 mr-3"
                />
                Nom et Prénom
              </div>
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Email
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Téléphone
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Relation
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Enfants
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Statut
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Profession
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start text-theme-xs">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {parents.map((parent) => {
            const isSelected = selectedParents.includes(parent.id);
            const parentImageUrl = getParentImageUrl(parent);
            
            return (
              <TableRow key={parent.id} className={isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectParent(parent.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={parentImageUrl}
                          alt={`${parent.prenom} ${parent.nom}`}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {parent.nom + " " + parent.prenom}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <a href={`mailto:${parent.email}`} className="hover:text-blue-600 hover:underline">
                    {parent.email}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <a href={`tel:${parent.telephone}`} className="hover:text-blue-600 hover:underline">
                    {parent.telephone}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700 rounded-full">
                    {parent.relation}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {parent.enfants.images.slice(0, 3).map((image, index) => (
                      <div
                        key={`parent-${parent.id}-enfant-${index}`}
                        className="relative w-8 h-8 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={32}
                          height={32}
                          src={getChildImageUrl(image)}
                          alt={`Enfant ${index + 1}`}
                          onError={(e) => e.currentTarget.src = imageApi.getImageUrl('/uploads/enfants/default-avatar-enfant.png')}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    {parent.enfants.images.length > 3 && (
                      <div className="relative w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-white rounded-full dark:border-gray-900 dark:bg-gray-700">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          +{parent.enfants.images.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getBadgeColor(parent.statut)}>
                    {parent.statut}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {parent.profession}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => onViewDetails(parent)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      title="Voir détails"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onEdit(parent)}
                      className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(parent)}
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
          })}
        </TableBody>
      </Table>
    </div>
  );
}