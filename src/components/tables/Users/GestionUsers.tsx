import { useState, useMemo } from "react";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Utilisateur, UserFormData, UserFormErrors } from "./types";
import { tableData } from "./types";


export default function GestionUsers() {
  // États pour les filtres
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  
  // États pour la sélection multiple
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);
  
  // États pour la modification d'utilisateur
  const [editingUser, setEditingUser] = useState<Utilisateur | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({});
  const [errors, setErrors] = useState<UserFormErrors>({});

  // États pour la visualisation d'utilisateur
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<Utilisateur | null>(null);

  // États pour la suppression d'utilisateur
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<Utilisateur | null>(null);

  // États pour le changement de statut
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev!, [name]: value }));
    if (errors[name as keyof UserFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: UserFormErrors = {};
    if (!formData.nomPrenom?.trim()) newErrors.nomPrenom = "Le nom et prénom sont requis";
    if (!formData.email?.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.telephone?.trim()) newErrors.telephone = "Le téléphone est requis";
    return newErrors;
  };

  const handleSaveEdit = (formData: UserFormData) => {
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

  const handleView = (utilisateur: Utilisateur) => {
    setViewingUser(utilisateur);
    setIsViewModalOpen(true);
  };

  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setViewingUser(null);
  };

  const handleDelete = (utilisateur: Utilisateur) => {
    setDeletingUser(utilisateur);
    setIsDeleteModalOpen(true);
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

  const handleToggleStatus = (utilisateur: Utilisateur) => {
    console.log("Changer le statut de l'utilisateur:", utilisateur);
    
    // Simulation de chargement
    setUpdatingStatus(utilisateur.id);
    
    // Simuler une requête API avec setTimeout
    setTimeout(() => {
      const statutDisplay = utilisateur.statut === 'actif' ? 'Inactif' : 
                          utilisateur.statut === 'inactif' ? 'En attente' : 
                          'Actif';
      
      alert(`Statut de "${utilisateur.nomPrenom}" changé à "${statutDisplay}"`);
      
      setUpdatingStatus(null);
    }, 500);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header de sélection */}
      {showSelectionHeader && (
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

      {/* En-tête avec filtres */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtre par rôle */}
          <div className="w-full sm:w-auto">
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {roleOptions.map((option) => (
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

      {/* Table des utilisateurs */}
      <UsersTable
        users={filteredData}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        updatingStatus={updatingStatus}
      />
      
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
      
      {/* Modals */}
      <UserForm
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
      
      <UserDetails
        user={viewingUser}
        isOpen={isViewModalOpen}
        onClose={handleCloseView}
        onEdit={handleEdit}
      />
      
      <DeleteConfirmation
        user={deletingUser}
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}