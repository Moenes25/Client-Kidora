import { Enfant, EnfantFormData } from './types';

interface EnfantFormProps {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant | null;
  formData: Partial<EnfantFormData>;
  onFormChange: (field: keyof Enfant, value: any) => void;
  onSave: () => void;
  parentOptions: string[];
  isEditing?: boolean;
}

export default function EnfantForm({ 
  isOpen, 
  onClose, 
  enfant, 
  formData, 
  onFormChange, 
  onSave, 
  parentOptions,
  isEditing = false
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
                
                {isEditing && (
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 overflow-hidden rounded-full">
                      <img
                        src={enfant?.image || ''}
                        alt={`${enfant?.prenom} ${enfant?.nom}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Photo (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.image || enfant?.image || ''}
                        onChange={(e) => onFormChange('image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        placeholder="/images/..."
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom {!isEditing && '*'}
                    </label>
                    <input
                      type="text"
                      required={!isEditing}
                      value={formData.nom || ''}
                      onChange={(e) => onFormChange('nom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom {!isEditing && '*'}
                    </label>
                    <input
                      type="text"
                      required={!isEditing}
                      value={formData.prenom || ''}
                      onChange={(e) => onFormChange('prenom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      placeholder="Entrez le prénom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Âge {!isEditing && '*'}
                    </label>
                    <input
                      type="number"
                      required={!isEditing}
                      min="0"
                      max="18"
                      value={formData.age || 3}
                      onChange={(e) => onFormChange('age', parseInt(e.target.value) || 3)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Classe {!isEditing && '*'}
                    </label>
                    <select
                      required={!isEditing}
                      value={formData.classe || 'Petite Section'}
                      onChange={(e) => onFormChange('classe', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      {classes.map(classe => (
                        <option key={classe} value={classe}>{classe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!isEditing && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL de la photo
                    </label>
                    <input
                      type="text"
                      value={formData.image || '/images/default-child.jpg'}
                      onChange={(e) => onFormChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      placeholder="/images/..."
                    />
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statut {!isEditing && '*'}
                  </label>
                  <select
                    required={!isEditing}
                    value={formData.statut || 'en_attente'}
                    onChange={(e) => onFormChange('statut', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="en_attente">En attente</option>
                  </select>
                </div>
              </div>

              {/* Informations du parent */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Parent référent {!isEditing && '*'}
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isEditing ? 'Parent actuel' : 'Sélectionner un parent existant'}
                  </label>
                  <select
                    required={!isEditing}
                    value={`${formData.parent?.prenom || ''} ${formData.parent?.nom || ''}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedParent = parentOptions
                          .filter(opt => opt !== "Tous")
                          .find(opt => opt === e.target.value);
                        
                        if (selectedParent) {
                          const [prenom, nom] = selectedParent.split(' ');
                          onFormChange('parent', {
                            nom: nom || '',
                            prenom: prenom || '',
                            image: formData.parent?.image || '/images/default-parent.jpg'
                          });
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4"
                  >
                    <option value="">Sélectionnez un parent...</option>
                    {parentOptions
                      .filter(option => option !== "Tous")
                      .map(parent => (
                        <option key={parent} value={parent}>
                          {parent}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Affichage du parent sélectionné */}
                {formData.parent?.nom && formData.parent?.prenom && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {isEditing ? 'Parent actuel :' : 'Parent sélectionné :'}
                    </h5>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                        <img
                          src={formData.parent.image || '/images/default-parent.jpg'}
                          alt={`${formData.parent.prenom} ${formData.parent.nom}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-parent.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.parent.prenom} {formData.parent.nom}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
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