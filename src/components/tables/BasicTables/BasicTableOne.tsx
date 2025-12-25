import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { useState, useMemo, useEffect } from "react";

interface Parent {
  id: number;
  nomPrenom: string;
  email: string;
  telephone: string;
  relation: string;
  enfants: {
    images: string[];
  };
  statut: string;
  profession: string;
  image: string;
}

// Define the table data using the interface
const tableData: Parent[] = [
  {
    id: 1,
    nomPrenom: "Sophie Martin",
    email: "sophie.martin@email.com",
    telephone: "+33 6 12 34 56 78",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_10.jpg",
        "/images/3-4_ans/enfant_13.jpg",
      ]
    },
    statut: "Actif",
    profession: "Enseignante",
    image: "/images/user/user-09.jpg"
  },
  {
    id: 2,
    nomPrenom: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    telephone: "+33 6 23 45 67 89",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
      ]
    },
    statut: "Actif",
    profession: "Ingénieur",
    image: "/images/user/user-17.jpg"
  },
  {
    id: 3,
    nomPrenom: "Marie Lambert",
    email: "marie.lambert@email.com",
    telephone: "+33 6 34 56 78 90",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_9.jpg",
        "/images/3-4_ans/enfant_12.jpg",
        "/images/3-4_ans/enfant_11.jpg",
      ]
    },
    statut: "En attente",
    profession: "Médecin",
    image: "/images/user/user-12.jpg"
  },
  {
    id: 4,
    nomPrenom: "Jean Petit",
    email: "jean.petit@email.com",
    telephone: "+33 6 45 67 89 01",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
        "/images/3-4_ans/enfant_6.jpg",
        "/images/3-4_ans/enfant_7.jpg",
      ]
    },
    statut: "Inactif",
    profession: "Architecte",
    image: "/images/user/user-10.jpg"
  },
  {
    id: 5,
    nomPrenom: "Laura Bernard",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
      ]
    },
    statut: "Actif",
    profession: "Avocate",
    image: "/images/user/user-21.jpg"
  },
  {
    id: 6,
    nomPrenom: "Pierre Moreau",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_10.jpg",
        "/images/3-4_ans/enfant_11.jpg",
      ]
    },
    statut: "Actif",
    profession: "Commercial",
    image: "/images/user/user-25.jpg"
  },
  {
    id: 7,
    nomPrenom: "Julie Leroy",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
      ]
    },
    statut: "En attente",
    profession: "Infirmière",
    image: "/images/user/user-33.jpg"
  },
  {
    id: 8,
    nomPrenom: "Marc Blanc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_16.jpg"
      ]
    },
    statut: "Actif",
    profession: "Chef de projet",
    image: "/images/user/user-27.jpg"
  }
];

// Modal de création
function CreateParentModal({ isOpen, onClose, onSave }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (parent: Omit<Parent, 'id' | 'enfants'>) => void;
}) {
  const [formData, setFormData] = useState({
    nomPrenom: "",
    email: "",
    telephone: "",
    relation: "Mère",
    statut: "Actif",
    profession: "",
    image: "/images/user/default-avatar.jpg"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData({
        nomPrenom: "",
        email: "",
        telephone: "",
        relation: "Mère",
        statut: "Actif",
        profession: "",
        image: "/images/user/default-avatar.jpg"
      });
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomPrenom.trim()) newErrors.nomPrenom = "Le nom et prénom sont requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.profession.trim()) newErrors.profession = "La profession est requise";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSave(formData);
      onClose();
    } else {
      setErrors(formErrors);
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
                Nouveau Parent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remplissez les informations du parent
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  name="nomPrenom"
                  value={formData.nomPrenom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nomPrenom 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="Ex: Sophie Martin"
                />
                {errors.nomPrenom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nomPrenom}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
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
                    <option value="Actif">Actif</option>
                    <option value="En attente">En attente</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo de profil (URL)
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="/images/user/default-avatar.jpg"
                />
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
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Créer le parent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Modal de détails
function ViewDetailsModal({ 
  isOpen, 
  onClose, 
  parent 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  parent: Parent | null;
}) {
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

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails du Parent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Informations détaillées
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

          <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <img
                  src={parent.image}
                  alt={parent.nomPrenom}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {parent.nomPrenom}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    size="sm"
                    color={
                      parent.statut === "Actif"
                        ? "success"
                        : parent.statut === "En attente"
                          ? "warning"
                          : "error"
                    }
                  >
                    {parent.statut}
                  </Badge>
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700 rounded-full">
                    {parent.relation}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a href={`mailto:${parent.email}`} className="hover:text-blue-600 hover:underline">
                      {parent.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Téléphone</h5>
                  <p className="text-gray-900 dark:text-white">
                    <a href={`tel:${parent.telephone}`} className="hover:text-blue-600 hover:underline">
                      {parent.telephone}
                    </a>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Profession</h5>
                  <p className="text-gray-900 dark:text-white">{parent.profession}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre d'enfants</h5>
                  <p className="text-gray-900 dark:text-white">{parent.enfants.images.length}</p>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Enfants</h5>
              <div className="flex flex-wrap gap-3">
                {parent.enfants.images.map((image, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                      <img
                        src={image}
                        alt={`Enfant ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Enfant {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de modification
function EditParentModal({ 
  isOpen, 
  onClose, 
  parent, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  parent: Parent | null;
  onSave: (id: number, updatedParent: Parent) => void;
}) {
  const [formData, setFormData] = useState<Parent | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && parent) {
      document.body.style.overflow = 'hidden';
      setFormData(parent);
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, parent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev!, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    if (!formData) return {};
    const newErrors: Record<string, string> = {};
    if (!formData.nomPrenom.trim()) newErrors.nomPrenom = "Le nom et prénom sont requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.profession.trim()) newErrors.profession = "La profession est requise";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSave(formData.id, formData);
      onClose();
    } else {
      setErrors(formErrors);
    }
  };

  if (!isOpen || !parent || !formData) return null;

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modifier le Parent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modifiez les informations du parent
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={formData.image}
                    alt={formData.nomPrenom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo de profil (URL)
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="/images/user/default-avatar.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  name="nomPrenom"
                  value={formData.nomPrenom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nomPrenom 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="Ex: Sophie Martin"
                />
                {errors.nomPrenom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nomPrenom}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
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
                    <option value="Actif">Actif</option>
                    <option value="En attente">En attente</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
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
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Continuation de la modal de suppression
function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  parent, 
  onConfirm 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  parent: Parent | null;
  onConfirm: (id: number) => void;
}) {
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

          {/* Content */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={parent.image}
                  alt={parent.nomPrenom}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{parent.nomPrenom}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{parent.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cette action est irréversible. Toutes les informations concernant 
                <span className="font-medium"> {parent.nomPrenom} </span> 
                seront définitivement supprimées.
              </p>
            </div>
          </div>

          {/* Footer */}
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
              onClick={() => {
                onConfirm(parent.id);
                onClose();
              }}
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

export default function BasicTableOne() {
  // États pour les filtres
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [relationFilter, setRelationFilter] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [parents, setParents] = useState<Parent[]>(tableData);

  // Options uniques pour les filtres
  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(parents.map(parent => parent.statut)));
    return ["Tous", ...statuts];
  }, [parents]);

  const relationOptions = useMemo(() => {
    const relations = Array.from(new Set(parents.map(parent => parent.relation)));
    return ["Toutes", ...relations];
  }, [parents]);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return parents.filter(parent => {
      const matchesStatut = !statutFilter || statutFilter === "Tous" || parent.statut === statutFilter;
      const matchesRelation = !relationFilter || relationFilter === "Toutes" || parent.relation === relationFilter;
      return matchesStatut && matchesRelation;
    });
  }, [parents, statutFilter, relationFilter]);

  // Fonction pour créer un nouveau parent
  const handleCreateParent = (newParentData: Omit<Parent, 'id' | 'enfants'>) => {
    const newParent: Parent = {
      id: parents.length > 0 ? Math.max(...parents.map(p => p.id)) + 1 : 1,
      ...newParentData,
      enfants: {
        images: []
      }
    };
    
    setParents(prev => [...prev, newParent]);
  };

  // Fonction pour modifier un parent
  const handleEditParent = (id: number, updatedParent: Parent) => {
    setParents(prev => prev.map(parent => 
      parent.id === id ? updatedParent : parent
    ));
  };

  // Fonction pour supprimer un parent
  const handleDeleteParent = (id: number) => {
    setParents(prev => prev.filter(parent => parent.id !== id));
  };

  // Fonctions pour gérer les boutons d'action
  const handleViewDetails = (parent: Parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
  };

  const handleEdit = (parent: Parent) => {
    setSelectedParent(parent);
    setShowEditModal(true);
  };

  const handleDelete = (parent: Parent) => {
    setSelectedParent(parent);
    setShowDeleteModal(true);
  };

  // Fonction pour basculer le statut (Actif/Inactif)
const handleToggleStatus = (parent: Parent) => {
  setParents(prev => prev.map(p => 
    p.id === parent.id 
      ? { 
          ...p, 
          statut: p.statut === "Actif" ? "Inactif" : "Actif" 
        } 
      : p
  ));
};

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* En-tête avec titre et bouton */}
        <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-white dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Liste des Parents
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Gérez les parents et leurs informations
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouveau Parent
            </button>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filtre par relation */}
            <div className="w-full sm:w-auto">
              <label htmlFor="relationFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Relation
              </label>
              <select
                id="relationFilter"
                value={relationFilter}
                onChange={(e) => setRelationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {relationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par statut */}
            <div className="w-full sm:w-auto">
              <label htmlFor="statutFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <select
                id="statutFilter"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {statutOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => {
                  setStatutFilter("");
                  setRelationFilter("");
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </div>
          
          {/* Compteur de résultats */}
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredData.length} parent(s) trouvé(s)
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nom et Prénom
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Téléphone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Relation
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Enfants
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Statut
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Profession
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={parent.image}
                            alt={parent.nomPrenom}
                          />
                        </div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {parent.nomPrenom}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <a href={`mailto:${parent.email}`} className="hover:text-blue-600 hover:underline">
                      {parent.email}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <a href={`tel:${parent.telephone}`} className="hover:text-blue-600 hover:underline">
                      {parent.telephone}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700 rounded-full">
                      {parent.relation}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {parent.enfants.images.slice(0, 3).map((image, index) => (
                        <div
                          key={index}
                          className="relative w-8 h-8 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <img
                            width={32}
                            height={32}
                            src={image}
                            alt={`Enfant ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {parent.enfants.images.length > 3 && (
                        <div className="relative w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-white rounded-full dark:border-gray-900 dark:bg-gray-700">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            +{parent.enfants.images.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        parent.statut === "Actif"
                          ? "success"
                          : parent.statut === "En attente"
                            ? "warning"
                            : "error"
                      }
                    >
                      {parent.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {parent.profession}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-1.5"> {/* gap-2 changé en gap-1.5 */}
                      {/* Voir détails */}
                      <button 
                        onClick={() => handleViewDetails(parent)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" // p-1 changé en p-1.5
                        title="Voir détails"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-5 h-5 changé en w-4.5 h-4.5 */}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {/* Modifier */}
                      <button 
                        onClick={() => handleEdit(parent)}
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors" // p-1 changé en p-1.5
                        title="Modifier"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-5 h-5 changé en w-4.5 h-4.5 */}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      {/* Désactiver/Réactiver */}
                      <button 
                        onClick={() => handleToggleStatus(parent)}
                        className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors" // p-1 changé en p-1.5
                        title={parent.statut === "Actif" ? "Désactiver" : "Réactiver"}
                      >
                        {parent.statut === "Actif" ? (
                          // Icône pour désactiver (œil barré)
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-5 h-5 changé en w-4.5 h-4.5 */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          // Icône pour réactiver (œil normal)
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-5 h-5 changé en w-4.5 h-4.5 */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Supprimer */}
                      <button 
                        onClick={() => handleDelete(parent)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" // p-1 changé en p-1.5
                        title="Supprimer"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-5 h-5 changé en w-4.5 h-4.5 */}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal de création */}
      <CreateParentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateParent}
      />

      {/* Modal de détails */}
      <ViewDetailsModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        parent={selectedParent}
      />

      {/* Modal de modification */}
      <EditParentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        parent={selectedParent}
        onSave={handleEditParent}
      />

      {/* Modal de suppression */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        parent={selectedParent}
        onConfirm={handleDeleteParent}
      />
    </>
  );
}