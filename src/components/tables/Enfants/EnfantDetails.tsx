import { Enfant } from './types';
import Badge from "../../ui/badge/Badge";

interface EnfantDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant;
  onEdit: () => void;
}

export default function EnfantDetails({ isOpen, onClose, enfant, onEdit }: EnfantDetailsProps) {
  
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatutText = (statut: string) => {
    return statut === 'actif' ? 'Actif' : 
           statut === 'inactif' ? 'Inactif' : 
           'En attente';
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails de l'Enfant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {enfant.prenom} {enfant.nom}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Photo et infos de base */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="relative">
                <div className="w-24 h-24 overflow-hidden rounded-full">
                  <img
                    src={enfant.image}
                    alt={`${enfant.prenom} ${enfant.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === 'actif'
                        ? "success"
                        : enfant.statut === 'inactif'
                          ? "error"
                          : "warning"
                    }
                  >
                    {getStatutText(enfant.statut)}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {enfant.prenom} {enfant.nom}
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Âge</p>
                    <p className="font-medium">{enfant.age} ans</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Classe</p>
                    <p className="font-medium">{enfant.classe}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sur le parent */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Parent Référent</h5>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={enfant.parent.image}
                    alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {enfant.parent.prenom} {enfant.parent.nom}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Responsable légal
                  </p>
                </div>
                <button className="px-3 py-1.5 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50">
                  Contacter
                </button>
              </div>
            </div>

            {/* Dates importantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Dates importantes</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Inscrit le :</span>
                    <span className="font-medium">{formatDate(enfant.dateInscription)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dernier accès :</span>
                    <span className="font-medium">{formatDate(enfant.dernierAcces)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Informations</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID :</span>
                    <span className="font-medium">#{enfant.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Statut actuel :</span>
                    <Badge
                      size="sm"
                      color={
                        enfant.statut === 'actif'
                          ? "success"
                          : enfant.statut === 'inactif'
                            ? "error"
                            : "warning"
                      }
                    >
                      {getStatutText(enfant.statut)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}