import { Enfant, EnfantFormData } from './types';
import { Parent } from '../Parents/types';
interface EnfantFormProps {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant | null;
  formData: Partial<EnfantFormData> & { parentId: string };
  onFormChange: (field: keyof (EnfantFormData & { parentId?: string }), value: any) => void;
  onSave: () => void;
  parentOptions: Parent[];
  isEditing?: boolean;
  imageFile?: File | null;
  onImageChange?: (file: File) => void;
}

export default function EnfantForm({ 
  isOpen, 
  onClose, 
  enfant, 
  formData, 
  onFormChange, 
  onSave, 
  parentOptions,
  isEditing = false,
  imageFile = null,
  onImageChange
}: EnfantFormProps) {
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const classes = ["Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1", "CE2"];

  const title = isEditing ? "Modifier l'Enfant" : "Ajouter un nouvel enfant";
  const subtitle = isEditing ? `${enfant?.prenom} ${enfant?.nom}` : "Remplissez les informations de l'enfant";
  const saveButtonText = isEditing ? "Enregistrer" : "Ajouter l'enfant";

  // Fonction pour gérer le changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onImageChange) {
        onImageChange(file);
      }
      
      // Prévisualisation temporaire
      const reader = new FileReader();
      reader.onloadend = () => {
        onFormChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
    const getSelectedParent = (): Parent | undefined => {
    // Si on a un parentId, trouver le parent correspondant
    if (formData.parentId) {
      return parentOptions.find(p => p.id === formData.parentId);
    }
    
    // Sinon, chercher par nom et prénom
    
    
    return undefined;
  };
   const selectedParent = getSelectedParent();

   const updateParentFromSelection = (parentId: string) => {
    const parent = parentOptions.find(p => p.id === parentId);
    if (parent) {
      onFormChange('parentId', parentId);
      // onFormChange('parent', {
      //   nom: parent.nom || '',
      //   prenom: parent.prenom || '',
      //   image: parent.image || '/images/default-parent.jpg'
      // });
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
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Informations de l'enfant */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Informations de l'enfant
                </h4>
                
                {/* Photo de l'enfant */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-white dark:border-gray-700 shadow-lg">
                      <img
                        src={formData.image || enfant?.imageUrl || '/images/default-child.jpg'}
                        alt={`${formData.prenom || ''} ${formData.nom || ''}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-child.jpg';
                        }}
                      />
                    </div>
                    <label 
                      htmlFor="image-upload"
                      className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                      title="Changer la photo"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required ={!isEditing}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Cliquez sur l'icône pour {!isEditing ? 'sélectionner' : 'changer'} la photo
                  </p>
                  {!isEditing && !imageFile && (
                    <p className="text-xs text-red-500 mt-1">
                      Une photo est requise
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom || ''}
                      onChange={(e) => onFormChange('nom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.prenom || ''}
                      onChange={(e) => onFormChange('prenom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Entrez le prénom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Âge *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="18"
                      value={formData.age || ''}
                      onChange={(e) => onFormChange('age', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Âge de l'enfant"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Classe *
                    </label>
                    <select
                      required
                      value={formData.classe || ''}
                      onChange={(e) => onFormChange('classe', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez une classe</option>
                      {classes.map(classe => (
                        <option key={classe} value={classe}>{classe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.statut || 'en_attente'}
                      onChange={(e) => onFormChange('statut', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                      <option value="en_attente">En attente</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Informations du parent */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Parent référent {!isEditing && '*'}
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isEditing ? 'Parent actuel' : 'Sélectionner un parent *'}
                  </label>
                  <select
                    required={!isEditing}
                    value={formData.parentId || selectedParent?.id || ''}
                    onChange={(e) => {
                      updateParentFromSelection(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Sélectionnez un parent...</option>
                    {parentOptions.map(parent => (
                      <option key={parent.id} value={parent.id}>
                        {parent.prenom} {parent.nom} ({parent.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Affichage du parent sélectionné */}
                {selectedParent && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {isEditing ? 'Parent actuel :' : 'Parent sélectionné :'}
                    </h5>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                        <img
                          src={selectedParent.image || '/images/default-parent.jpg'}
                          alt={`${selectedParent.prenom} ${selectedParent.nom}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-parent.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedParent.prenom} {selectedParent.nom}
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>{selectedParent.email}</p>
                          <p>{selectedParent.telephone}</p>
                          <p className="mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              selectedParent.statut === 'Actif' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : selectedParent.statut === 'Inactif'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {selectedParent.statut}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message si aucun parent disponible */}
                {parentOptions.length === 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      Aucun parent disponible. Veuillez d'abord créer un compte parent.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={
                  !formData.nom || 
                  !formData.prenom || 
                  !formData.age || 
                  !formData.classe || 
                  (!isEditing && !formData.parentId)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saveButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}