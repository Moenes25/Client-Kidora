import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState, useMemo, useEffect } from "react";

interface Utilisateur {
  id: number;
  nomPrenom: string;
  email: string;
  telephone: string;
  role: 'parent' | 'educateur';
  statut: 'actif' | 'inactif' | 'en_attente';
  dateCreation: string;
  derniereConnexion: string;
  image: string;
  enfants?: {
    images: string[];
  };
  classe?: string;
}

// Define the table data using the interface
const tableData: Utilisateur[] = [
  {
    id: 1,
    nomPrenom: "Sophie Martin",
    email: "sophie.martin@email.com",
    telephone: "+33 6 12 34 56 78",
    role: 'parent',
    statut: 'actif',
    dateCreation: "2024-01-15",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-09.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
      ]
    }
  },
  {
    id: 2,
    nomPrenom: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    telephone: "+33 6 23 45 67 89",
    role: 'parent',
    statut: 'actif',
    dateCreation: "2024-01-20",
    derniereConnexion: "2024-03-19",
    image: "/images/user/user-17.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_3.jpg",
      ]
    }
  },
  {
    id: 3,
    nomPrenom: "Marie Lambert",
    email: "marie.lambert@email.com",
    telephone: "+33 6 34 56 78 90",
    role: 'parent',
    statut: 'en_attente',
    dateCreation: "2024-02-05",
    derniereConnexion: "2024-02-05",
    image: "/images/user/user-12.jpg",
    enfants: {
      images: []
    }
  },
  {
    id: 4,
    nomPrenom: "Jean Petit",
    email: "jean.petit@email.com",
    telephone: "+33 6 45 67 89 01",
    role: 'parent',
    statut: 'inactif',
    dateCreation: "2023-12-10",
    derniereConnexion: "2024-01-15",
    image: "/images/user/user-10.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
        "/images/3-4_ans/enfant_6.jpg",
      ]
    }
  },
  {
    id: 5,
    nomPrenom: "Laura Bernard",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    role: 'educateur',
    statut: 'actif',
    dateCreation: "2024-01-10",
    derniereConnexion: "2024-03-21",
    image: "/images/user/user-21.jpg",
    classe: "(3-4) ans"
  },
  {
    id: 6,
    nomPrenom: "Pierre Moreau",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    role: 'educateur',
    statut: 'actif',
    dateCreation: "2024-01-25",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-25.jpg",
    classe: "(6-7) ans"
  },
  {
    id: 7,
    nomPrenom: "Julie Leroy",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    role: 'educateur',
    statut: 'en_attente',
    dateCreation: "2024-02-15",
    derniereConnexion: "2024-02-15",
    image: "/images/user/user-33.jpg",
    classe: "(4-5) ans"
  },
  {
    id: 8,
    nomPrenom: "Marc Blanc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    role: 'educateur',
    statut: 'inactif',
    dateCreation: "2023-11-30",
    derniereConnexion: "2024-01-10",
    image: "/images/user/user-27.jpg",
    classe: "(8-9) ans"
  }
];

export default function BasicTablesUsers() {
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  
  // États pour la sélection multiple
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);
  
  const [editingUser, setEditingUser] = useState<Utilisateur | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Utilisateur>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<Utilisateur | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<Utilisateur | null>(null);

  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  
  // Options uniques pour les filtres
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(tableData.map(user => user.role)));
    return ["Tous", ...roles.map(r => r === 'parent' ? 'Parent' : 'Éducateur')];
  }, []);

  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(tableData.map(user => user.statut)));
    return ["Tous", ...statuts.map(s => 
      s === 'actif' ? 'Actif' : 
      s === 'inactif' ? 'Inactif' : 
      'En attente'
    )];
  }, []);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return tableData.filter(user => {
      const matchesRole = !roleFilter || roleFilter === "Tous" || 
        (roleFilter === "Parent" && user.role === 'parent') ||
        (roleFilter === "Éducateur" && user.role === 'educateur');
      
      const matchesStatut = !statutFilter || statutFilter === "Tous" || 
        (statutFilter === "Actif" && user.statut === 'actif') ||
        (statutFilter === "Inactif" && user.statut === 'inactif') ||
        (statutFilter === "En attente" && user.statut === 'en_attente');
      
      return matchesRole && matchesStatut;
    });
  }, [roleFilter, statutFilter]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Obtenir l'affichage du rôle
  const getRoleDisplay = (role: string) => {
    return role === 'parent' ? 'Parent' : 'Éducateur';
  };

  // Obtenir la couleur du badge de rôle
  const getRoleColor = (role: string) => {
    return role === 'parent' 
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700'
      : 'bg-purple-50 text-purple-600 dark:bg-purple-100 dark:text-purple-700';
  };

  // Gestion de la sélection
  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => {
      const newSelected = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      
      // Afficher/cacher le header de sélection
      if (newSelected.length > 0 && !showSelectionHeader) {
        setShowSelectionHeader(true);
      } else if (newSelected.length === 0 && showSelectionHeader) {
        setShowSelectionHeader(false);
      }
      
      // Mettre à jour l'état "sélectionner tout"
      setIsSelectAll(newSelected.length === filteredData.length);
      
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      // Désélectionner tout
      setSelectedUsers([]);
      setIsSelectAll(false);
      setShowSelectionHeader(false);
    } else {
      // Sélectionner tout
      const allIds = filteredData.map(user => user.id);
      setSelectedUsers(allIds);
      setIsSelectAll(true);
      setShowSelectionHeader(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectedUsers([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  };

  const handleActivateSelected = () => {
    if (selectedUsers.length === 0) return;
    
    const usersNames = filteredData
      .filter(user => selectedUsers.includes(user.id))
      .map(user => user.nomPrenom)
      .join(', ');
    
    console.log(`Activation des utilisateurs sélectionnés: ${usersNames}`);
    alert(`${selectedUsers.length} utilisateur(s) activé(s) : ${usersNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
  };

  const handleDeactivateSelected = () => {
    if (selectedUsers.length === 0) return;
    
    const usersNames = filteredData
      .filter(user => selectedUsers.includes(user.id))
      .map(user => user.nomPrenom)
      .join(', ');
    
    console.log(`Désactivation des utilisateurs sélectionnés: ${usersNames}`);
    alert(`${selectedUsers.length} utilisateur(s) désactivé(s) : ${usersNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    
    const usersNames = filteredData
      .filter(user => selectedUsers.includes(user.id))
      .map(user => user.nomPrenom)
      .join(', ');
    
    console.log(`Suppression des utilisateurs sélectionnés: ${usersNames}`);
    alert(`${selectedUsers.length} utilisateur(s) supprimé(s) : ${usersNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
  };

  // Gérer les actions sur les utilisateurs
  const handleEdit = (utilisateur: Utilisateur) => {
    setEditingUser(utilisateur);
    setFormData({
      nomPrenom: utilisateur.nomPrenom,
      email: utilisateur.email,
      telephone: utilisateur.telephone,
      role: utilisateur.role,
      statut: utilisateur.statut,
      image: utilisateur.image,
      classe: utilisateur.classe
    });
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (isEditModalOpen && editingUser) {
      document.body.style.overflow = 'hidden';
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditModalOpen, editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev!, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomPrenom?.trim()) newErrors.nomPrenom = "Le nom et prénom sont requis";
    if (!formData.email?.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.telephone?.trim()) newErrors.telephone = "Le téléphone est requis";
    return newErrors;
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Sauvegarder les modifications:", formData);
      alert(`Modifications sauvegardées pour ${formData.nomPrenom}`);
      handleCloseEdit();
    } else {
      setErrors(formErrors);
    }
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    setFormData({});
    setErrors({});
  };

  const handleDelete = (utilisateur: Utilisateur) => {
    setDeletingUser(utilisateur);
    setIsDeleteModalOpen(true);
  };

  const handleView = (utilisateur: Utilisateur) => {
    setViewingUser(utilisateur);
    setIsViewModalOpen(true);
  };

  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setViewingUser(null);
  };

  const EditUserModal = () => {
    if (!isEditModalOpen || !editingUser) return null;

    return (
      <div className="fixed inset-0 z-[100000] overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={handleCloseEdit} />
        <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Modifier l'Utilisateur
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Modifiez les informations de {editingUser.nomPrenom}
                </p>
              </div>
              <button
                onClick={handleCloseEdit}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 overflow-hidden rounded-full">
                    <img
                      src={formData.image || editingUser.image}
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
                      value={formData.image || ""}
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
                    value={formData.nomPrenom || ""}
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
                      value={formData.email || ""}
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
                      value={formData.telephone || ""}
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
                      Rôle
                    </label>
                    <select
                      name="role"
                      value={formData.role || "parent"}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="parent">Parent</option>
                      <option value="educateur">Éducateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      name="statut"
                      value={formData.statut || "actif"}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="actif">Actif</option>
                      <option value="en_attente">En attente</option>
                      <option value="inactif">Inactif</option>
                    </select>
                  </div>
                </div>

                {formData.role === "educateur" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Classe
                    </label>
                    <input
                      type="text"
                      name="classe"
                      value={formData.classe || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: (3-4) ans"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCloseEdit}
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
  };

  const ViewUserModal = () => {
    if (!isViewModalOpen || !viewingUser) return null;

    // Fonction pour formater le statut
    const getStatusColor = (statut: string) => {
      switch(statut) {
        case 'actif': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case 'inactif': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        case 'en_attente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      }
    };

    // Fonction pour formater le rôle
    const getRoleDisplay = (role: string) => {
      return role === 'parent' ? 'Parent' : 'Éducateur';
    };

    // Fonction pour compter les enfants
    const countEnfants = () => {
      return viewingUser.enfants?.images?.length || 0;
    };

    return (
      <div className="fixed inset-0 z-[100000] overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={handleCloseView} />
        <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Détails de l'Utilisateur
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informations complètes de {viewingUser.nomPrenom}
                </p>
              </div>
              <button
                onClick={handleCloseView}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Section Profil */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="relative">
                  <div className="w-20 h-20 overflow-hidden rounded-full">
                    <img
                      src={viewingUser.image}
                      alt={viewingUser.nomPrenom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 text-xs rounded-full border-2 border-white dark:border-gray-800 ${
                    viewingUser.role === 'parent' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {getRoleDisplay(viewingUser.role)}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{viewingUser.nomPrenom}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Membre depuis le {formatDate(viewingUser.dateCreation)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(viewingUser.statut)}`}>
                      {viewingUser.statut === 'actif' ? 'Actif' : 
                      viewingUser.statut === 'inactif' ? 'Inactif' : 
                      'En attente'}
                    </span>
                    {viewingUser.classe && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                        {viewingUser.classe}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Informations de Contact</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${viewingUser.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {viewingUser.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${viewingUser.telephone}`} className="text-gray-800 dark:text-gray-300 hover:underline">
                        {viewingUser.telephone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Activité</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Dernière connexion:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(viewingUser.derniereConnexion)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date d'inscription:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(viewingUser.dateCreation)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Enfants (pour les parents) */}
              {viewingUser.role === 'parent' && viewingUser.enfants && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900 dark:text-white">Enfants inscrits</h5>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {countEnfants()} enfant{countEnfants() > 1 ? 's' : ''}
                    </span>
                  </div>
                  {viewingUser.enfants.images.length > 0 ? (
                    <div className="flex gap-2">
                      {viewingUser.enfants.images.map((image, index) => (
                        <div key={index} className="w-12 h-12 overflow-hidden rounded-full">
                          <img
                            src={image}
                            alt={`Enfant ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Aucun enfant inscrit
                    </p>
                  )}
                </div>
              )}

              {/* Section Classe (pour les éducateurs) */}
              {viewingUser.role === 'educateur' && viewingUser.classe && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Classe assignée</h5>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400">🏫</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{viewingUser.classe}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Classe principale</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseView}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCloseView();
                  handleEdit(viewingUser);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Modifier cet utilisateur
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleConfirmDelete = () => {
    if (deletingUser) {
      console.log("Confirmation de suppression pour:", deletingUser);
      alert(`Utilisateur "${deletingUser.nomPrenom}" supprimé avec succès !`);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingUser(null);
  };

  const DeleteConfirmationModal = () => {
    if (!isDeleteModalOpen || !deletingUser) return null;

    return (
      <div className="fixed inset-0 z-[100000] overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={handleCancelDelete} />
        <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Confirmer la suppression
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cette action est irréversible
                </p>
              </div>
              <button
                onClick={handleCancelDelete}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              {/* Icône d'avertissement */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              {/* Message de confirmation */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Êtes-vous sûr de vouloir supprimer ?
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous êtes sur le point de supprimer l'utilisateur <span className="font-semibold text-gray-900 dark:text-white">{deletingUser.nomPrenom}</span>.
                  Cette action ne peut pas être annulée.
                </p>
              </div>

              {/* Détails de l'utilisateur à supprimer */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={deletingUser.image}
                      alt={deletingUser.nomPrenom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{deletingUser.nomPrenom}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                        {getRoleDisplay(deletingUser.role)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        deletingUser.statut === 'actif' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : deletingUser.statut === 'inactif'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {deletingUser.statut === 'actif' ? 'Actif' : 
                        deletingUser.statut === 'inactif' ? 'Inactif' : 
                        'En attente'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conséquences de la suppression */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      Toutes les données associées seront perdues
                    </span>
                  </div>
                  {deletingUser.role === 'parent' && deletingUser.enfants?.images && deletingUser.enfants.images.length > 0 && (
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {deletingUser.enfants.images.length} enfant(s) associé(s) ne seront plus accessibles
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      L'historique des activités sera définitivement effacé
                    </span>
                  </div>
                </div>
              </div>

              {/* Avertissement final */}
              <div className="text-center mb-6">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  ⚠️ Attention : Cette action est définitive et ne peut pas être annulée.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isDeleteModalOpen && deletingUser) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDeleteModalOpen, deletingUser]);

  const handleToggleStatus = (utilisateur: Utilisateur) => {
    console.log("Changer le statut de l'utilisateur:", utilisateur);
    
    // Définir le nouveau statut
    let nouveauStatut: 'actif' | 'inactif' | 'en_attente';
    
    switch(utilisateur.statut) {
      case 'actif':
        nouveauStatut = 'inactif';
        break;
      case 'inactif':
        nouveauStatut = 'en_attente';
        break;
      case 'en_attente':
        nouveauStatut = 'actif';
        break;
      default:
        nouveauStatut = 'actif';
    }
    
    // Simulation de chargement
    setUpdatingStatus(utilisateur.id);
    
    // Simuler une requête API avec setTimeout
    setTimeout(() => {
      console.log(`Statut changé de "${utilisateur.statut}" à "${nouveauStatut}" pour ${utilisateur.nomPrenom}`);
      
      const statutDisplay = nouveauStatut === 'actif' ? 'Actif' : 
                          nouveauStatut === 'inactif' ? 'Inactif' : 
                          'En attente';
      
      alert(`Statut de "${utilisateur.nomPrenom}" changé à "${statutDisplay}"`);
      
      setUpdatingStatus(null);
      
    }, 500);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header de sélection */}
      

      {/* En-tête avec filtres */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtre par rôle */}
          <div className="w-full sm:w-auto">
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <div className="relative group hover:scale-105 focus-within:animate-pulse transition-transform duration-800 ease-out">
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:border-blue-400 dark:hover:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 dark:focus:shadow-blue-500/50 dark:focus:ring-blue-400 appearance-none"
              >
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-focus-within:animate-bounce transition-all duration-300 group-focus-within:rotate-180 group-focus-within:scale-110 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtre par statut */}
          <div className="w-full sm:w-auto">
            <label htmlFor="statutFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Statut
            </label>
            <div className="relative group hover:scale-105 focus-within:animate-pulse transition-transform duration-200 ease-out">
              <select
                id="statutFilter"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:border-blue-400 dark:hover:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 dark:focus:shadow-blue-500/50 dark:focus:ring-blue-400 appearance-none"
              >
                {statutOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-focus-within:animate-bounce transition-all duration-300 group-focus-within:rotate-180 group-focus-within:scale-110 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bouton pour réinitialiser les filtres */}
          <div className="w-full sm:w-auto flex items-end">
            <button
              onClick={() => {
                setRoleFilter("");
                setStatutFilter("");
              }}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>
        
        {/* Compteur de résultats */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredData.length} utilisateur(s) trouvé(s)
        </div>
      </div>

       {selectedUsers.length > 0 && (
          <div className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                      {selectedUsers.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    utilisateur(s) sélectionné(s)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleActivateSelected}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Activer
                </button>
                
                <button
                  onClick={handleDeactivateSelected}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                  </svg>
                  Désactiver
                </button>
                
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
                
                <button
                  onClick={handleCancelSelection}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}


      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-700">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2">Utilisateur</span>
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Rôle
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Contact
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Statut
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Dernière connexion
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-white text-start text-theme-xs"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {filteredData.map((utilisateur) => (
              <TableRow key={utilisateur.id} className={selectedUsers.includes(utilisateur.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(utilisateur.id)}
                      onChange={() => handleSelectUser(utilisateur.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={utilisateur.image}
                          alt={utilisateur.nomPrenom}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {utilisateur.nomPrenom}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {formatDate(utilisateur.dateCreation)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(utilisateur.role)}`}>
                    {getRoleDisplay(utilisateur.role)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <a 
                      href={`mailto:${utilisateur.email}`} 
                      className="block text-sm hover:text-blue-600 hover:underline"
                    >
                      {utilisateur.email}
                    </a>
                    <a 
                      href={`tel:${utilisateur.telephone}`} 
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:underline"
                    >
                      {utilisateur.telephone}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      utilisateur.statut === 'actif'
                        ? "success"
                        : utilisateur.statut === 'en_attente'
                          ? "warning"
                          : "error"
                    }
                  >
                    {utilisateur.statut === 'actif' ? 'Actif' : 
                     utilisateur.statut === 'inactif' ? 'Inactif' : 
                     'En attente'}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="space-y-1">
                    <span className="block text-sm">
                      {formatDate(utilisateur.derniereConnexion)}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {new Date(utilisateur.derniereConnexion).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    {/* Bouton Voir */}
                    <button
                      onClick={() => handleView(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Voir les détails"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>

                    {/* Bouton Éditer */}
                    <button
                      onClick={() => handleEdit(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    {/* Désactiver/Réactiver */}
                    <button 
                      onClick={() => handleToggleStatus(utilisateur)}
                      className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors"
                      title={utilisateur.statut === "actif" ? "Désactiver" : "Réactiver"}
                    >
                      {utilisateur.statut === "actif" ? (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => handleDelete(utilisateur)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                      title="Supprimer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Message si aucun utilisateur trouvé */}
      {filteredData.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
              Aucun utilisateur trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Essayez de modifier vos critères de filtrage
            </p>
          </div>
        </div>
      )}
      
      <EditUserModal />
      <ViewUserModal />
      <DeleteConfirmationModal />
    </div>
  );
}