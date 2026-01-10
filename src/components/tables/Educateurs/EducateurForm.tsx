import { Educateur } from "./Types";

interface EducateurFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<Educateur>;
  onFormChange: (field: keyof Educateur, value: any) => void;
  onSave: () => void;
  title: string;
  subtitle: string;
  isEdit?: boolean;
}

export default function EducateurForm({
    isOpen,
  onClose,
  formData,
  onFormChange,
  onSave,
  title,
  subtitle,
  isEdit = false
}:EducateurFormProps) {
    if (!isOpen) return null;

    const specialiteOptions = [
    "Pédagogie Montessori",
    "Langage et communication",
    "Activités créatives",
    "Psychologie infantile",
    "Motricité fine",
    "Éveil musical",
    "Langues étrangères",
    "Activités sportives",
    "Éveil sensoriel",
    "Mathématiques préscolaires"
  ];
  const classeOptions = [
    "Toute Petite Section",
    "Petite Section",
    "Moyenne Section",
    "Grande Section",
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2"
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Photo */}
              <div className="flex items-center gap-4">
                {/* <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div> */}
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={formData.image}
                    alt={`${formData.prenom} ${formData.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.image || "/images/user/default-avatar.jpg"}
                    onChange={(e) => onFormChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="/images/user/default-avatar.jpg"
                  />
                </div>
              </div>

              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.nom || ''}
                    onChange={(e) => onFormChange('nom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Martin"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.prenom || ''}
                    onChange={(e) => onFormChange('prenom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Sophie"
                    required
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => onFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="exemple@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone || ''}
                    onChange={(e) => onFormChange('telephone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+33 6 12 34 56 78"
                    required
                  />
                </div>
              </div>

              {/* Spécialité et Expérience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spécialité *
                  </label>
                  <select
                    value={formData.specialite || ''}
                    onChange={(e) => onFormChange('specialite', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Sélectionnez une spécialité</option>
                    {specialiteOptions.map((specialite, index) => (
                      <option key={index} value={specialite}>{specialite}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expérience *
                  </label>
                  <select
                    value={formData.experience || ''}
                    onChange={(e) => onFormChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Sélectionnez une expérience</option>
                    <option value="Débutant">Débutant</option>
                    <option value="1-3 ans">1-3 ans</option>
                    <option value="3-5 ans">3-5 ans</option>
                    <option value="5-10 ans">5-10 ans</option>
                    <option value="10+ ans">10+ ans</option>
                  </select>
                </div>
              </div>

              {/* Disponibilité et Statut */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Disponibilité initiale
                  </label>
                  <select
                    value={formData.disponibilite || 'disponible'}
                    onChange={(e) => onFormChange('disponibilite', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="occupe">Occupé</option>
                    <option value="absence">Absence</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statut
                  </label>
                  <select
                    value={formData.statut || 'actif'}
                    onChange={(e) => onFormChange('statut', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>

              {/* Classes assignées */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Classes assignées
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {classeOptions.map((classe, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`classe-${index}`}
                        checked={formData.classes?.includes(classe) || false}
                        onChange={(e) => {
                          const currentClasses = formData.classes || [];
                          if (e.target.checked) {
                            onFormChange('classes', [...currentClasses, classe]);
                          } else {
                            onFormChange('classes', currentClasses.filter(c => c !== classe));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label 
                        htmlFor={`classe-${index}`}
                        className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {classe}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aperçu */}
            {!isEdit && (  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Aperçu du profil</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-lg">👨‍🏫</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.prenom || "Prénom"} {formData.nom || "Nom"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.specialite || "Spécialité"} • {formData.experience || "Expérience"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        (formData.disponibilite === 'disponible') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        (formData.disponibilite === 'occupe') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {formData.disponibilite === 'disponible' ? 'Disponible' : 
                         formData.disponibilite === 'occupe' ? 'Occupé' : 'Absence'}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        formData.statut === 'actif' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {formData.statut === 'actif' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              )}
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
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {isEdit ? 'Enregistrer' : 'Créer l\'éducateur'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

