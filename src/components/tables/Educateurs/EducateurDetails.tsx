import Badge from "../../ui/badge/Badge";
import { Educateur } from "./Types";

interface EducateurDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  educateur: Educateur;
  onEdit: () => void;
}

export default function EducateurDetails({
    isOpen,
  onClose,
  educateur,
  onEdit
}: EducateurDetailsProps) {
    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDisponibiliteColor = (disponibilite: string) => {
    switch(disponibilite) {
      case 'disponible': return "success";
      case 'occupe': return "warning";
      case 'absence': return "error";
      default: return "primary";
    }
  };

  const getDisponibiliteText = (disponibilite: string) => {
    switch(disponibilite) {
      case 'disponible': return "Disponible";
      case 'occupe': return "Occupé";
      case 'absence': return "Absence";
      default: return "Inconnu";
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
                    Détails de l'Éducateur
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {educateur.prenom} {educateur.nom}
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
                  <div className="w-20 h-20 overflow-hidden rounded-full">
                    <img
                      src={educateur.image}
                      alt={`${educateur.prenom} ${educateur.nom}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {educateur.prenom} {educateur.nom}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        size="sm"
                        color={getDisponibiliteColor(educateur.disponibilite)}
                      >
                        {getDisponibiliteText(educateur.disponibilite)}
                      </Badge>
                      <Badge
                        size="sm"
                        color={educateur.statut === 'actif' ? 'success' : 'error'}
                      >
                        {educateur.statut === 'actif' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>
                </div>
    
                {/* Informations de contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">Contact</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${educateur.email}`} className="text-blue-600 hover:underline">
                          {educateur.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-800 dark:text-gray-300">{educateur.telephone}</span>
                      </div>
                    </div>
                  </div>
    
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">Spécialisation</h5>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Spécialité:</span>
                        <span className="ml-2 font-medium">{educateur.specialite}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Expérience:</span>
                        <span className="ml-2 font-medium">{educateur.experience}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Embauché le:</span>
                        <span className="ml-2 font-medium">{formatDate(educateur.dateEmbauche)}</span>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Classes assignées */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Classes Assignées</h5>
                  <div className="flex flex-wrap gap-2">
                    {educateur.classes.map((classe, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {classe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
    
              <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={onEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  
}
