import { useState, useMemo, useEffect } from "react";
import UsersTable from "./UsersTable";
import UserDetails from "./UserDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Utilisateur, converUserToUtilisateur } from "./types";
import { RoleUsers, StatutClient } from "../../../types/auth.types";
import { authApi } from "../../../services/api/authApi";
import {
  RefreshCw,
  Search,
  Filter,
  X,
  Check,
  Ban,
  Trash2,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";

export default function GestionUsers() {
  // Filtres
  const [roleFilter, setRoleFilter] = useState<string>("Tous");
  const [statutFilter, setStatutFilter] = useState<string>("Tous");
  const [query, setQuery] = useState("");

  // Données
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sélection multiple
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);

  // Modales
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<Utilisateur | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<Utilisateur | null>(null);

  // Changement de statut
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await authApi.getAllUsers();
      const usersDataConverted = usersData.map(converUserToUtilisateur);
      setUtilisateurs(usersDataConverted);
      setFilteredUsers(usersDataConverted);
    } catch (error: any) {
      setError(`Erreur de chargement: ${error.message}`);
      console.error("Erreur lors du chargement des utilisateurs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Options filtres
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(utilisateurs.map(u => u.role)));
    const readable = roles.map(role =>
      role === RoleUsers.PARENT ? "Parent" :
      role === RoleUsers.EDUCATEUR ? "Éducateur" :
      role === RoleUsers.ADMIN ? "Administrateur" : role
    );
    return ["Tous", ...readable];
  }, [utilisateurs]);

  const statutOptions = useMemo(() => {
    const statuts = Array.from(new Set(utilisateurs.map(u => u.statut)));
    const readable = statuts.map(s =>
      s === StatutClient.ACTIF ? "Actif" :
      s === StatutClient.INACTIF ? "Inactif" :
      s === StatutClient.EN_ATTENTE ? "En attente" : s
    );
    return ["Tous", ...readable];
  }, [utilisateurs]);

  // Filtrage
  useEffect(() => {
    const roleMap: Record<string, string> = {
      Parent: RoleUsers.PARENT, Éducateur: RoleUsers.EDUCATEUR, Administrateur: RoleUsers.ADMIN
    };
    const statutMap: Record<string, string> = {
      Actif: StatutClient.ACTIF, Inactif: StatutClient.INACTIF, "En attente": StatutClient.EN_ATTENTE
    };

    let base = [...utilisateurs];

    if (roleFilter !== "Tous") base = base.filter(u => u.role === roleMap[roleFilter]);
    if (statutFilter !== "Tous") base = base.filter(u => u.statut === statutMap[statutFilter]);

    const q = query.trim().toLowerCase();
    if (q) {
      base = base.filter(u =>
        u.nomPrenom.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.telephone?.toLowerCase().includes(q)
      );
    }

    setFilteredUsers(base);
    setSelectedUsers([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  }, [utilisateurs, roleFilter, statutFilter, query]);

  // Sélection
  const handleSelectUser = (id: string) => {
    setSelectedUsers(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      setShowSelectionHeader(next.length > 0);
      setIsSelectAll(next.length === filteredUsers.length && filteredUsers.length > 0);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedUsers([]);
      setIsSelectAll(false);
      setShowSelectionHeader(false);
    } else {
      const all = filteredUsers.map(u => u.id);
      setSelectedUsers(all);
      setIsSelectAll(true);
      setShowSelectionHeader(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectedUsers([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  };

  // Actions groupées (démo)
  const namesOfSelected = () =>
    filteredUsers.filter(u => selectedUsers.includes(u.id)).map(u => u.nomPrenom).join(", ");

  const handleActivateSelected = async () => {
    if (!selectedUsers.length) return;
    alert(`${selectedUsers.length} utilisateur(s) activé(s) : ${namesOfSelected()}`);
    handleCancelSelection();
  };

  const handleDeactivateSelected = async () => {
    if (!selectedUsers.length) return;
    alert(`${selectedUsers.length} utilisateur(s) désactivé(s) : ${namesOfSelected()}`);
    handleCancelSelection();
  };

  const handleDeleteSelected = async () => {
    if (!selectedUsers.length) return;
    if (!window.confirm(`Supprimer ${selectedUsers.length} utilisateur(s) ?`)) return;
    try {
      await Promise.all(selectedUsers.map(id => authApi.deleteUser(id)));
      setUtilisateurs(prev => prev.filter(u => !selectedUsers.includes(u.id)));
      alert(`${selectedUsers.length} utilisateur(s) supprimé(s) : ${namesOfSelected()}`);
      handleCancelSelection();
    } catch (e:any) {
      alert(`Erreur: ${e.message}`);
    }
  };

  // Individuel
  const handleView = (u: Utilisateur) => { setViewingUser(u); setIsViewModalOpen(true); };
  const handleCloseView = () => { setViewingUser(null); setIsViewModalOpen(false); };

  const handleDelete = (u: Utilisateur) => { setDeletingUser(u); setIsDeleteModalOpen(true); };
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    await authApi.deleteUser(deletingUser.id);
    setUtilisateurs(prev => prev.filter(x => x.id !== deletingUser.id));
    setSelectedUsers(prev => prev.filter(id => id !== deletingUser.id));
    alert(`Utilisateur "${deletingUser.nomPrenom}" supprimé`);
    setIsDeleteModalOpen(false);
    setDeletingUser(null);
  };
  const handleCancelDelete = () => { setIsDeleteModalOpen(false); setDeletingUser(null); };

  const handleToggleStatus = async (u: Utilisateur) => {
    setUpdatingStatus(u.id);
    setTimeout(() => {
      alert(`Statut de "${u.nomPrenom}" modifié`);
      setUpdatingStatus(null);
    }, 500);
  };

  // Loading / Error
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des utilisateurs…</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-red-700 font-medium">{error}</span>
            <button onClick={fetchUsers} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700">
              <RefreshCw className="h-4 w-4" /> Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Toolbar principale */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 dark:border-white/[0.05] bg-gray-50/60 dark:bg-gray-900/40">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Gauche: recherche + filtres */}
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (nom, email, tél.)"
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none ring-0 placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {roleOptions.map(o => <option key={o}>{o}</option>)}
                </select>
                <select
                  value={statutFilter}
                  onChange={(e) => setStatutFilter(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white"
                >
                  {statutOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <button
                onClick={() => { setRoleFilter("Tous"); setStatutFilter("Tous"); setQuery(""); }}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
              >
                <X className="h-4 w-4" /> Réinitialiser
              </button>
            </div>
          </div>

          {/* Droite: actions rapides */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300"
              title="Rafraîchir"
            >
              <RefreshCw className="h-4 w-4" /> Rafraîchir
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
              title="Inviter un utilisateur"
            >
              <UserPlus className="h-4 w-4" /> Inviter
            </button>
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredUsers.length} utilisateur(s) trouvé(s)
          {selectedUsers.length > 0 && (
            <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">
              • {selectedUsers.length} sélectionné(s)
            </span>
          )}
        </div>
      </div>

      {/* Header de sélection sticky */}
      {showSelectionHeader && (
        <div className="sticky top-0 z-10 border-b border-emerald-600/20 bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                {selectedUsers.length} sélectionné(s)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleActivateSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                <Check className="h-4 w-4" /> Activer
              </button>
              <button onClick={handleDeactivateSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                <Ban className="h-4 w-4" /> Désactiver
              </button>
              <button onClick={handleDeleteSelected} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                <Trash2 className="h-4 w-4" /> Supprimer
              </button>
              <button onClick={handleCancelSelection} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">
                <X className="h-4 w-4" /> Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <UsersTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        onView={handleView}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        updatingStatus={updatingStatus}
      />

      {/* Modals */}
      <UserDetails user={viewingUser} isOpen={isViewModalOpen} onClose={handleCloseView} />
      <DeleteConfirmation user={deletingUser} isOpen={isDeleteModalOpen} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
    </div>
  );
}
