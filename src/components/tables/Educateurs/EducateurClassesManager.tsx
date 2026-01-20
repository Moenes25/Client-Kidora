// components/tables/Educateurs/EducateurClassesManager.tsx
import { useState, useEffect } from "react";
import { Educateur } from "./Types";
import { classService, ClasseResponseDto } from "../../../services/api/classService";
import { educateurClasseApi, EducateurClasseResponseDTO } from "../../../services/api/educateurClasseService";

interface EducateurClassesManagerProps {
  educateur: Educateur;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EducateurClassesManager({
  educateur,
  isOpen,
  onClose,
  onSuccess
}: EducateurClassesManagerProps) {
  const [classeOptions, setClasseOptions] = useState<ClasseResponseDto[]>([]);
  const [currentAssignations, setCurrentAssignations] = useState<EducateurClasseResponseDTO[]>([]);
  const [selectedClasseIds, setSelectedClasseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && educateur?.id) {
      loadData();
    }
  }, [isOpen, educateur]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger toutes les classes disponibles
      const classes = await classService.getAllClasses();
      setClasseOptions(classes);
      
      // Charger les assignations actuelles
      const assignations = await educateurClasseApi.getClassesByEducateur(educateur.id);
      setCurrentAssignations(assignations);
      
      // Initialiser les classes sélectionnées
      const currentClasseIds = assignations.map(a => a.classeId);
      setSelectedClasseIds(currentClasseIds);
      
      setError(null);
    } catch (error: any) {
      console.error("Erreur lors du chargement des données:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleClasseSelection = (classeId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedClasseIds(prev => [...prev, classeId]);
    } else {
      setSelectedClasseIds(prev => prev.filter(id => id !== classeId));
    }
  };

  const getClasseName = (classeId: string): string => {
    const classe = classeOptions.find(c => c.id === classeId);
    return classe ? classe.nom_classe : "Classe inconnue";
  };

  const getClasseColor = (classeId: string): string => {
    const classe = classeOptions.find(c => c.id === classeId);
    return classe ? classe.couleur_classe : "gray";
  };

  const handleSave = async () => {
    if (!educateur?.id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // IDs actuels et nouveaux
      const currentIds = currentAssignations.map(a => a.classeId);
      const selectedIds = selectedClasseIds;
      
      // Trouver les classes à ajouter
      const classesToAdd = selectedIds.filter(id => !currentIds.includes(id));
      
      // Trouver les classes à retirer
      const classesToRemove = currentIds.filter(id => !selectedIds.includes(id));
      
      console.log("Classes à ajouter:", classesToAdd);
      console.log("Classes à retirer:", classesToRemove);
      
      // Ajouter les nouvelles assignations
      const addPromises = classesToAdd.map(classeId => 
        educateurClasseApi.assignerEducateurAClasse({
          educateurId: educateur.id,
          classeId: classeId,
          dateAssignation: new Date().toISOString()
        })
      );
      
      // Retirer les assignations supprimées
      const removePromises = classesToRemove.map(classeId => {
        // Trouver l'assignation correspondante
        const assignation = currentAssignations.find(a => a.classeId === classeId);
        return assignation 
          ? educateurClasseApi.deleteEducateurClasse(assignation.id)
          : Promise.resolve();
      });
      
      // Exécuter toutes les opérations
      await Promise.all([...addPromises, ...removePromises]);
      
      alert("Classes assignées mises à jour avec succès");
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour des classes:", error);
      setError(error.message || "Erreur lors de la mise à jour des classes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveClasse = async (classeId: string) => {
    if (!confirm(`Voulez-vous vraiment retirer cet éducateur de la classe ${getClasseName(classeId)} ?`)) {
      return;
    }
    
    try {
      const assignation = currentAssignations.find(a => a.classeId === classeId);
      if (assignation) {
        await educateurClasseApi.deleteEducateurClasse(assignation.id);
        
        // Mettre à jour localement
        setSelectedClasseIds(prev => prev.filter(id => id !== classeId));
        setCurrentAssignations(prev => prev.filter(a => a.classeId !== classeId));
        
        alert("Éducateur retiré de la classe avec succès");
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error("Erreur lors du retrait:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gestion des classes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {educateur.prenom} {educateur.nom}
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

          {/* Contenu */}
          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement...</span>
              </div>
            ) : (
              <>
                {/* Classes actuellement assignées */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Classes actuellement assignées
                  </h4>
                  {currentAssignations.length === 0 ? (
                    <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                      Aucune classe assignée
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentAssignations.map(assignation => (
                        <div 
                          key={assignation.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ 
                                backgroundColor: `var(--color-${getClasseColor(assignation.classeId)})` 
                              }}
                            ></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {assignation.classeNom}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Assigné le: {new Date(assignation.dateAssignation).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveClasse(assignation.classeId)}
                            className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          >
                            Retirer
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ajouter de nouvelles classes */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Ajouter à d'autres classes
                  </h4>
                  
                  {classeOptions.length === 0 ? (
                    <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                      Aucune classe disponible
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {classeOptions
                        .filter(classe => !currentAssignations.some(a => a.classeId === classe.id))
                        .map(classe => (
                          <div key={classe.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <input
                              type="checkbox"
                              id={`add-classe-${classe.id}`}
                              checked={selectedClasseIds.includes(classe.id)}
                              onChange={(e) => handleClasseSelection(classe.id, e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label 
                              htmlFor={`add-classe-${classe.id}`}
                              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2 flex-1"
                            >
                              <span 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: `var(--color-${classe.couleur_classe})` }}
                              ></span>
                              {classe.nom_classe}
                              <span className="text-xs text-gray-500 ml-auto">
                                ({classe.trancheAge})
                              </span>
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Aperçu des changements */}
                {selectedClasseIds.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      {selectedClasseIds.length} classe(s) seront assignées
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClasseIds.map(classeId => {
                        const classe = classeOptions.find(c => c.id === classeId);
                        const isCurrent = currentAssignations.some(a => a.classeId === classeId);
                        
                        return classe ? (
                          <span 
                            key={classeId}
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                              isCurrent 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}
                          >
                            <span 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: `var(--color-${classe.couleur_classe})` }}
                            ></span>
                            {classe.nom_classe}
                            {isCurrent && (
                              <span className="text-[10px] ml-1">(actuelle)</span>
                            )}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Pied de page */}
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting || loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer les modifications'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}