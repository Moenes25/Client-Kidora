import { useState, useEffect } from "react";
import { Parent ,CreateParentDto, UpdateParentDto, Relation} from "./types";
import { RoleUsers, StatutClient } from "../../../types/auth.types";
import { imageApi } from "../../../services/api/imageService";
interface ParentFormProps {
  isOpen: boolean;
  onClose: () => void;
  parent?: Parent | null;
  onSave: (parentData: CreateParentDto | UpdateParentDto, imageFile?: File) => Promise<boolean>;
  title: string;
  subtitle: string;
  isEdit?: boolean;
}


interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  relation: string;
  statut: string; // 'Actif' | 'En attente' | 'Inactif'
  profession: string;
  image: string;
  password?: string; // Uniquement pour la création
}
export default function ParentForm({
  isOpen,
  onClose,
  parent,
  onSave,
  title,
  subtitle,
  isEdit = false
}: ParentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "" ,
    relation: Relation.PERE,
    statut: StatutClient.ACTIF,
    profession: "",
    image: "/images/user/default-avatar.jpg",
    password:isEdit ?undefined:'"DefaultPassword123!"'
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('/images/user/default-avatar.jpg');
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadParentImage = async () => {
      if (isOpen && parent && parent.image) {
        setLoadingImage(true);
        try {
          // Utiliser getImage pour charger l'image avec authentification
          const imageUrl = await imageApi.getImage(parent.image);
          setPreviewUrl(imageUrl);
          setFormData(prev => ({ ...prev, image: parent.image || '/images/user/default-avatar.jpg' }));
        } catch (error) {
          console.error('Erreur de chargement de l\'image:', error);
          setPreviewUrl('/images/user/default-avatar.jpg');
        } finally {
          setLoadingImage(false);
        }
      } else {
        setPreviewUrl('/images/user/default-avatar.jpg');
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (parent && isEdit) {
        setFormData({
          nom: parent.nom ||"",
          prenom: parent.prenom ||"",
          email: parent.email ,
          telephone: parent.telephone ||"",
          relation: parent.relation ,
          statut: parent.statut ,
          profession: parent.profession ,
          image: parent.image ,
          password : undefined
          
        });
        loadParentImage();
      } else {
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          relation: Relation.PERE,
          statut: StatutClient.ACTIF,
          profession: "",
          image: "/images/user/default-avatar-parent.png",
          password :"DefaultPassword123!"
        });
      }
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [isOpen, parent, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setImageFile(file);
    
    // Créer une URL pour la prévisualisation
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, image: imageUrl }));
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nom.trim()) newErrors.nomPrenom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.nomPrenom = "Le prénom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.profession.trim()) newErrors.profession = "La profession est requise";
    return newErrors;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        let dataToSend
        if (isEdit) {
          dataToSend = {
            nom : formData.nom,
            prenom : formData.prenom,
            numTel : formData.telephone,
            profession : formData.profession,
            relation : formData.relation,
            statutClient : formData.statut,
          } as UpdateParentDto;
        } else {
          dataToSend = {
            nom : formData.nom,
            prenom : formData.prenom,
            email : formData.email,
            password : formData.password,
            numTel : formData.telephone,
            profession : formData.profession,
            relation : formData.relation,
            statutClient : formData.statut,
            role : RoleUsers.PARENT
          } as CreateParentDto;

      }
       const success = await onSave(dataToSend, imageFile || undefined);
       if (success) {
          onClose();
       }
     } catch (error) {
        console.error('Erreur lors de la soumission:', error);
      } finally {
        setIsSubmitting(false);
      }
      
    } else {
      setErrors(formErrors);
    }
  };
  const handleImageError = () => {
    setPreviewUrl('/images/user/default-avatar.jpg');
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
                {/* Section Photo */}
                <div className="flex items-center gap-4">
                <div className="w-16 h-16 overflow-hidden rounded-full relative">
                  {loadingImage ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  )}
                  {isEdit && parent?.image && !loadingImage && (
                    <div className="absolute bottom-0 right-0 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Actuelle
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo de profil
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
                  {isEdit && (
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour conserver l'image actuelle
                    </p>
                  )}
                </div>
              </div>

                {/* Champs Nom et Prénom séparés */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nom 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                      } dark:bg-gray-700 dark:text-white`}
                      placeholder="Ex: Martin"
                    />
                    {errors.nom && (
                      <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.prenom 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                      } dark:bg-gray-700 dark:text-white`}
                      placeholder="Ex: Sophie"
                    />
                    {errors.prenom && (
                      <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
                    )}
                  </div>
                </div>

                {/* Champ email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } dark:bg-gray-700 dark:text-white`}
                    placeholder="exemple@email.com"
                    disabled={isEdit} // L'email ne peut pas être modifié en édition
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                  {isEdit && (
                    <p className="mt-1 text-xs text-gray-500">
                      L'email ne peut pas être modifié
                    </p>
                  )}
                </div>

                {/* Champ mot de passe (uniquement pour la création) */}
                {!isEdit && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                      } dark:bg-gray-700 dark:text-white`}
                      placeholder="Mot de passe sécurisé"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Le mot de passe doit contenir au moins 8 caractères
                    </p>
                  </div>
                )}

                {/* Les autres champs restent similaires mais adaptés */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.telephone 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                      } dark:bg-gray-700 dark:text-white`}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profession *
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.profession 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                      } dark:bg-gray-700 dark:text-white`}
                      placeholder="Ex: Enseignante"
                    />
                    {errors.profession && (
                      <p className="mt-1 text-sm text-red-600">{errors.profession}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Relation
                    </label>
                    <select
                      name="relation"
                      value={formData.relation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Mère">Mère</option>
                      <option value="Père">Père</option>
                      <option value="Tuteur">Tuteur</option>
                      <option value="Tutrice">Tutrice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      
                      <option value={StatutClient.ACTIF}>Actif</option>
                      <option value={StatutClient.EN_ATTENTE}>En attente</option>
                      <option value={StatutClient.INACTIF}>Inactif</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Boutons de soumission */}
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
                    <>{isEdit ? 'Enregistrer les modifications' : 'Créer le parent'}</>
                  )}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}