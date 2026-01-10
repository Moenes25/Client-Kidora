import { useEffect } from "react";
import Badge from "../../ui/badge/Badge";
import { Parent } from "./types";

interface ParentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
}

export default function ParentDetails({ isOpen, onClose, parent }: ParentDetailsProps) {
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

  if (!isOpen || !parent) return null;

  const getBadgeColor = (statut: string) => {
    switch(statut) {
      case "Actif": return "success";
      case "En attente": return "warning";
      case "Inactif": return "error";
      default: return "primary";
    }
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
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <img
                  src={parent.image}
                  alt={parent.nomPrenom}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {parent.nomPrenom}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    size="sm"
                    color={getBadgeColor(parent.statut)}
                  >
                    {parent.statut}
                  </Badge>
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700 rounded-full">
                    {parent.relation}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a href={`mailto:${parent.email}`} className="hover:text-blue-600 hover:underline">
                      {parent.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Téléphone</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a href={`tel:${parent.telephone}`} className="hover:text-blue-600 hover:underline">
                      {parent.telephone}
                    </a>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Profession</h5>
                  <p className="text-gray-900 dark:text-white">{parent.profession}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre d'enfants</h5>
                  <p className="text-gray-900 dark:text-white">{parent.enfants.images.length}</p>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Enfants</h5>
              <div className="flex flex-wrap gap-3">
                {parent.enfants.images.map((image, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                      <img
                        src={image}
                        alt={`Enfant ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Enfant {index + 1}</p>
                  </div>
                ))}
              </div>
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