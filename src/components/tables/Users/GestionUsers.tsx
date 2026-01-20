// GestionUsers.tsx - Version corrigée
import { useState, useMemo, useEffect } from "react";
import UsersTable from "./UsersTable";
import UserDetails from "./UserDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Utilisateur, converUserToUtilisateur } from "./types";
import { RoleUsers, StatutClient, User } from "../../../types/auth.types";
import { authApi } from "../../../services/api/authApi";

interface GestionUsersProps {
  onCountChange?: (count: number) => void;
}

export default function GestionUsers({ onCountChange }: GestionUsersProps) {
  // États pour les filtres
  const [roleFilter, setRoleFilter] = useState<string>("Tous");
  const [statutFilter, setStatutFilter] = useState<string>("Tous");

  // États pour les données
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour la sélection multiple
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);
  
  // États pour la visualisation d'utilisateur
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<Utilisateur | null>(null);

  // États pour la suppression d'utilisateur
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<Utilisateur | null>(null);

  // États pour le changement de statut
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // ÉTAPE 1: Charger les utilisateurs au montage du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Appel API pour récupérer tous les utilisateurs
      const usersData = await authApi.getAllUsers();
      // Conversion des données API -> format frontend
      const usersDataConverted = usersData.map(converUserToUtilisateur);
      setUtilisateurs(usersDataConverted);
      setFilteredUsers(usersDataConverted);
      if (onCountChange) {
        onCountChange(usersDataConverted.length);
      }
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des utilisateurs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ÉTAPE 2: Préparer les options de filtres basées sur les données réelles
  const roleOptions = useMemo(() => {
    // Extraire les rôles uniques des utilisateurs
    const roles = Array.from(new Set(utilisateurs.map(user => user.role)));
    // Convertir en format lisible pour l'affichage
    const readableRoles = roles.map(role => {
      switch(role) {
        case RoleUsers.PARENT: return 'Parent';
        case RoleUsers.EDUCATEUR: return 'Éducateur';
        case RoleUsers.ADMIN: return 'Administrateur';
        default: return role;
      }
    });
    return ["Tous", ...readableRoles];
  }, [utilisateurs]); // Se recalcule quand `utilisateurs` change

  const statutOptions = useMemo(() => {
    // Extraire les statuts uniques des utilisateurs
    const statuts = Array.from(new Set(utilisateurs.map(user => user.statut)));
    // Convertir en format lisible pour l'affichage
    const readableStatuts = statuts.map(statut => {
      switch(statut) {
        case StatutClient.ACTIF: return 'Actif';
        case StatutClient.INACTIF: return 'Inactif';
        case StatutClient.EN_ATTENTE: return 'En attente';
        default: return statut;
      }
    });
    return ["Tous", ...readableStatuts];
  }, [utilisateurs]);

  // ÉTAPE 3: Filtrer les utilisateurs quand les filtres ou données changent
  useEffect(() => {
    let filtered = utilisateurs;
    
    // Filtre par rôle
    if (roleFilter && roleFilter !== "Tous") {
      // Mapping des options d'affichage vers les valeurs internes
      const roleMap: Record<string, string> = {
        'Parent': RoleUsers.PARENT,
        'Éducateur': RoleUsers.EDUCATEUR,
        'Administrateur': RoleUsers.ADMIN
      };
      const roleKey = roleMap[roleFilter];
      filtered = filtered.filter(user => user.role === roleKey);
    }
    
    // Filtre par statut
    if (statutFilter && statutFilter !== "Tous") {
      // Mapping des options d'affichage vers les valeurs d'enum
      const statutMap: Record<string, string> = {
        'Actif': StatutClient.ACTIF,
        'Inactif': StatutClient.INACTIF,
        'En attente': StatutClient.EN_ATTENTE
      };
      const statutKey = statutMap[statutFilter] || statutFilter;
      filtered = filtered.filter(user => user.statut === statutKey);
    }
    
    setFilteredUsers(filtered);
    // Réinitialiser la sélection quand les filtres changent
    setSelectedUsers([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  }, [utilisateurs, roleFilter, statutFilter]);

  // ÉTAPE 4: Gestion de la sélection des utilisateurs
  const handleSelectUser = (userId: string) => {
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
      setIsSelectAll(newSelected.length === filteredUsers.length && filteredUsers.length > 0);
      
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
      // Sélectionner tout (utiliser filteredUsers, pas filteredData)
      const allIds = filteredUsers.map(user => user.id);
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

  // ÉTAPE 5: Actions multiples avec appels API
  const handleActivateSelected = async () => {
    if (selectedUsers.length === 0) return;
     
    
    const usersNames = filteredUsers
      .filter(user => selectedUsers.includes(user.id))
      .map(user => user.nomPrenom)
      .join(', ');
    
    console.log(`Activation des utilisateurs sélectionnés: ${usersNames}`);
    alert(`${selectedUsers.length} utilisateur(s) activé(s) : ${usersNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
    // if (selectedUsers.length === 0) return;
    
    // try {
    //   // Appeler l'API pour chaque utilisateur sélectionné
    //   const promises = selectedUsers.map(userId => 
    //     authApi.updateUserStatus(userId, StatutClient.ACTIF)
    //   );
    //   await Promise.all(promises);
      
    //   // Mettre à jour localement
    //   setUtilisateurs(prev => prev.map(user => 
    //     selectedUsers.includes(user.id) 
    //       ? { ...user, statut: StatutClient.ACTIF }
    //       : user
    //   ));
      
    //   const usersNames = filteredUsers
    //     .filter(user => selectedUsers.includes(user.id))
    //     .map(user => user.nomPrenom)
    //     .join(', ');
      
    //   alert(`${selectedUsers.length} utilisateur(s) activé(s) : ${usersNames}`);
      
    //   // Réinitialiser la sélection
    //   handleCancelSelection();
      
    // } catch (error: any) {
    //   console.error('Erreur lors de l\'activation multiple:', error);
    //   alert(`Erreur: ${error.message}`);
    // }
  };

  const handleDeactivateSelected = async () => {
     if (selectedUsers.length === 0) return;
    
    const usersNames = filteredUsers
      .filter(user => selectedUsers.includes(user.id))
      .map(user => user.nomPrenom)
      .join(', ');
    
    console.log(`Désactivation des utilisateurs sélectionnés: ${usersNames}`);
    alert(`${selectedUsers.length} utilisateur(s) désactivé(s) : ${usersNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
    // if (selectedUsers.length === 0) return;
    
    // try {
    //   // Appeler l'API pour chaque utilisateur sélectionné
    //   const promises = selectedUsers.map(userId => 
    //     authApi.updateUserStatus(userId, StatutClient.INACTIF)
    //   );
    //   await Promise.all(promises);
      
    //   // Mettre à jour localement
    //   setUtilisateurs(prev => prev.map(user => 
    //     selectedUsers.includes(user.id) 
    //       ? { ...user, statut: StatutClient.INACTIF }
    //       : user
    //   ));
      
    //   const usersNames = filteredUsers
    //     .filter(user => selectedUsers.includes(user.id))
    //     .map(user => user.nomPrenom)
    //     .join(', ');
      
    //   alert(`${selectedUsers.length} utilisateur(s) désactivé(s) : ${usersNames}`);
      
    //   // Réinitialiser la sélection
    //   handleCancelSelection();
      
    // } catch (error: any) {
    //   console.error('Erreur lors de la désactivation multiple:', error);
    //   alert(`Erreur: ${error.message}`);
    // }
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return;
    
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedUsers.length} utilisateur(s) ?`)) {
      return;
    }
    
    try {
      // Appeler l'API pour chaque utilisateur sélectionné
      const promises = selectedUsers.map(userId => 
        authApi.deleteUser(userId)
      );
      await Promise.all(promises);
      
      // Mettre à jour localement
      setUtilisateurs(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      
      const usersNames = filteredUsers
        .filter(user => selectedUsers.includes(user.id))
        .map(user => user.nomPrenom)
        .join(', ');
      
      alert(`${selectedUsers.length} utilisateur(s) supprimé(s) : ${usersNames}`);
      
      // Réinitialiser la sélection
      handleCancelSelection();
      
    } catch (error: any) {
      console.error('Erreur lors de la suppression multiple:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // ÉTAPE 6: Actions individuelles sur les utilisateurs
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

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    
    try {
      await authApi.deleteUser(deletingUser.id);
      
      // Mettre à jour localement
      setUtilisateurs(prev => prev.filter(u => u.id !== deletingUser.id));
      setSelectedUsers(prev => prev.filter(id => id !== deletingUser.id));
      
      alert(`Utilisateur "${deletingUser.nomPrenom}" supprimé avec succès !`);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      
    } catch (error: any) {
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingUser(null);
  };

  const handleToggleStatus = async (utilisateur: Utilisateur) => {
     console.log("Changer le statut de l'utilisateur:", utilisateur);
    
    // Simulation de chargement
    setUpdatingStatus(utilisateur.id);
    
    // Simuler une requête API avec setTimeout
    setTimeout(() => {
      const statutDisplay = utilisateur.statut === StatutClient.ACTIF ? 'Inactif' :
                          utilisateur.statut === StatutClient.INACTIF ? 'En attente' :
                          'Actif';
      
      alert(`Statut de "${utilisateur.nomPrenom}" changé à "${statutDisplay}"`);
      
      setUpdatingStatus(null);
    }, 500);
    // try {
    //   setUpdatingStatus(utilisateur.id);
      
    //   // Déterminer le nouveau statut
    //   const newStatus = utilisateur.statut === StatutClient.ACTIF 
    //     ? StatutClient.INACTIF 
    //     : StatutClient.ACTIF;
      
    //   // Appeler l'API pour changer le statut
    //   await authApi.updateUserStatus(utilisateur.id, newStatus);
      
    //   // Mettre à jour localement
    //   setUtilisateurs(prev => prev.map(u => 
    //     u.id === utilisateur.id ? { ...u, statut: newStatus } : u
    //   ));
      
    //   const statutDisplay = newStatus === StatutClient.ACTIF ? 'Actif' : 'Inactif';
    //   alert(`Statut de "${utilisateur.nomPrenom}" changé à "${statutDisplay}"`);
      
    // } catch (error: any) {
    //   alert(`Erreur: ${error.message}`);
    // } finally {
    //   setUpdatingStatus(null);
    // }
  };

  // ÉTAPE 7: Affichage des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
          <button 
            onClick={fetchUsers}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* En-tête avec titre et rafraîchissement */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Gestion des Utilisateurs
            </h2> */}
            {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {utilisateurs.length} utilisateur(s) au total
            </p> */}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Rafraîchir"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Rafraîchir
            </button>
          </div>
        </div>
      </div>

      {/* Header de sélection */}
      {showSelectionHeader && (
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600  border-b border-blue-100 dark:border-blue-800/30 p-3">
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

      {/* Barre de filtres */}
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
                setRoleFilter("Tous");
                setStatutFilter("Tous");
              }}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>
        
        {/* Compteur de résultats */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredUsers.length} utilisateur(s) trouvé(s)
          {selectedUsers.length > 0 && (
            <span className="ml-2 font-medium text-blue-600 dark:text-blue-400">
              • {selectedUsers.length} sélectionné(s)
            </span>
          )}
        </div>
      </div>

      {/* Table des utilisateurs */}
      {filteredUsers.length > 0 ? (
        <UsersTable
          users={filteredUsers} // Utiliser filteredUsers, pas filteredData
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          isSelectAll={isSelectAll}
          onView={handleView}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          updatingStatus={updatingStatus}
        />
      ) : (
        <div className="p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
              Aucun utilisateur trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {utilisateurs.length === 0 
                ? "Aucun utilisateur dans le système" 
                : "Essayez de modifier vos critères de filtrage"}
            </p>
          </div>
        </div>
      )}
      
      {/* Modals */}
      <UserDetails
        user={viewingUser}
        isOpen={isViewModalOpen}
        onClose={handleCloseView}
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