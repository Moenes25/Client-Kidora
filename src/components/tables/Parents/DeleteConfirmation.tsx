import { useEffect } from "react";
import { Parent } from "./types";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  onConfirm: () => void;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  parent, 
  onConfirm 
}: DeleteConfirmationProps) {
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-700 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Confirmer la suppression
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Êtes-vous sûr de vouloir supprimer ce parent ?
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={parent.image}
                  alt={parent.nom + " " + parent.prenom}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{parent.nom + " " + parent.prenom}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{parent.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cette action est irréversible. Toutes les informations concernant 
                <span className="font-medium"> {parent.nom + " " + parent.prenom} </span>
                seront définitivement supprimées.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}