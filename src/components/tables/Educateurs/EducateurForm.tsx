import { useEffect, useState } from "react";
import { CreateEducateurDto, Educateur, UpdateEducateurDto } from "./Types";
import { RoleUsers, StatutClient } from "../../../types/auth.types";

interface EducateurFormProps {
  isOpen: boolean;
  onClose: () => void;
  educateur?: Educateur | null;
  // onFormChange: (field: keyof Educateur, value: any) => void;
  onSave: (educateurData: CreateEducateurDto | UpdateEducateurDto, imageFile?: File) => Promise<boolean>;
  title: string;
  subtitle: string;
  isEdit?: boolean;
}

export default function EducateurForm({
    isOpen,
  onClose,
  educateur,
  // onFormChange,
  onSave,
  title,
  subtitle,
  isEdit = false
}:EducateurFormProps) {

  const [formData, setFormData] = useState<Partial<Educateur>>({
    nom: "",
    prenom: "",
    email: "",
    numTel: "",
    image: "/images/user/default-avatar.jpg",
    specialite: "",
    experience: 0,
    disponibilite: 'Disponible',
    classes: [],
    statut: StatutClient.ACTIF
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("DefaultPassword123!");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (educateur && isEdit) {
        setFormData({
          nom: educateur.nom,
          prenom: educateur.prenom,
          email: educateur.email,
          numTel: educateur.numTel,
          image: educateur.image,
          specialite: educateur.specialite,
          experience: educateur.experience,
          disponibilite: educateur.disponibilite,
          classes: educateur.classes,
          statut: educateur.statut
        });
      } else {
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          numTel: "",
          image: "/images/user/default-avatar.jpg",
          specialite: "",
          experience: 0,
          disponibilite: 'Disponible',
          classes: [],
          statut: StatutClient.ACTIF
        });
      }
      setPassword("DefaultPassword123!");
      setImageFile(null);
      setErrors({});
    }
  }, [isOpen, educateur, isEdit]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Prévisualisation
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

   const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom?.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom?.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.email?.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.numTel?.trim()) newErrors.numTel = "Le téléphone est requis";
    if (!formData.specialite?.trim()) newErrors.specialite = "La spécialité est requise";
    // if (!formData.experience?.trim()) newErrors.experience = "L'expérience est requise";
    // else if (isNaN(Number(formData.experience))) newErrors.experience = "L'expérience doit être un nombre";
    if (!isEdit && !password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    }
    
    return newErrors;
  };


  //   if (!isOpen) return null;

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
     setIsSubmitting(true);
      
    try {
      let dataToSend;
      if (isEdit) {
        console.log("formData", formData);
        dataToSend = {
          nom: formData.nom,
          prenom: formData.prenom,
          numTel: formData.numTel,
          experience: formData.experience,
          disponibilite: formData.disponibilite,
          classe: formData.classes?.[0] || '',
          specialisation: formData.specialite,
          statutClient: formData.statut,
        } as UpdateEducateurDto;
      } else {
        console.log("formData", formData);
        dataToSend = {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: password,
          numTel: formData.numTel,
          experience: formData.experience,
          disponibilite: formData.disponibilite,
          classe: formData.classes?.[0] || '',
          specialisation: formData.specialite,
          statutClient: formData.statut,
          role: RoleUsers.EDUCATEUR
        } as CreateEducateurDto;
        console.log("dataToSend", dataToSend);
      }
      const success = await onSave(dataToSend, imageFile || undefined);
      if (success) {
        onClose();
      }
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
    
  };
  const handleFormChange = (field: keyof Educateur, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

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
                    // alt={`${formData.prenom} ${formData.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo (URL)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, GIF. Max: 5MB
                  </p>
                </div>
              </div>
              {!isEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mot de passe *
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } dark:bg-gray-700 dark:text-white`}
                    placeholder="Mot de passe"
                  />
                  {/* <button
                    type="button"
                    onClick={() => {
                      const newPassword = generateRandomPassword();
                      setPassword(newPassword);
                    }}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Générer
                  </button> */}
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Le mot de passe sera envoyé par email à l'éducateur
                </p>
              </div>
            )}

              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.nom || ''}
                    onChange={(e) => handleFormChange('nom', e.target.value)}
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
                    onChange={(e) => handleFormChange('prenom', e.target.value)}
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
                    onChange={(e) => handleFormChange('email', e.target.value)}
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
                    value={formData.numTel || ''}
                    onChange={(e) => handleFormChange('numTel', e.target.value)}
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
                    onChange={(e) => handleFormChange('specialite', e.target.value)}
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
                   <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={formData.experience || ''}
                    onChange={(e) => handleFormChange('experience', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } dark:bg-gray-700 dark:text-white`}
                    placeholder="Ex: 3.5"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                  )}
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
                    onChange={(e) => handleFormChange('disponibilite', e.target.value)}
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
                    onChange={(e) => handleFormChange('statut', e.target.value)}
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
                          handleFormChange('classes', [...currentClasses, classe]);
                        } else {
                          handleFormChange('classes', currentClasses.filter(c => c !== classe));
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
                     {formData.specialite || "Spécialité"} • {formData.experience ? `${formData.experience} ans` : "0 an"}
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
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEdit ? 'Enregistrement...' : 'Création...'}
                </>
              ) : (
                <>{isEdit ? 'Enregistrer' : 'Créer l\'éducateur'}</>
              )}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

