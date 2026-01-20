import { StatutClient } from '../../../types/auth.types';
import { Enfant } from './types';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant;
  onDelete: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  enfant, 
  onDelete,
  title = "Supprimer l'enfant",
  message = "Êtes-vous sûr de vouloir supprimer l'enfant"
}: DeleteConfirmationProps) {
  
  if (!isOpen) return null;

  const getStatutText = (statut: string) => {
    return statut === 'actif' ? 'Actif' : 
           statut === 'inactif' ? 'Inactif' : 
           'En attente';
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Confirmez la suppression
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {message}
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {enfant.prenom} {enfant.nom}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Cette action ne peut pas être annulée.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
              {/* <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={enfant.imageUrl}
                    alt={`${enfant.prenom} ${enfant.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{enfant.prenom} {enfant.nom}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                      {enfant.classe}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      enfant.statut === StatutClient.ACTIF
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : enfant.statut === StatutClient.INACTIF
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {getStatutText(enfant.statut)}
                    </span>
                  </div>
                </div>
              </div> */}

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Attention :</span> La suppression de cet enfant entraînera :
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Perte de toutes les données associées</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Suppression du profil de l'enfant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Les parents seront notifiés</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}