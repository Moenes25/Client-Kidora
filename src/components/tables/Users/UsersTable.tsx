import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Utilisateur } from './types';

interface UsersTableProps {
  users: Utilisateur[];
  selectedUsers: number[];
  onSelectUser: (id: number) => void;
  onSelectAll: () => void;
  isSelectAll: boolean;
  onView: (user: Utilisateur) => void;
  onEdit: (user: Utilisateur) => void;
  onDelete: (user: Utilisateur) => void;
  onToggleStatus: (user: Utilisateur) => void;
  updatingStatus: number | null;
}

export default function UsersTable({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll, 
  isSelectAll,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  updatingStatus
}: UsersTableProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getRoleDisplay = (role: string) => {
    return role === 'parent' ? 'Parent' : 'Éducateur';
  };

  const getRoleColor = (role: string) => {
    return role === 'parent' 
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700'
      : 'bg-purple-50 text-purple-600 dark:bg-purple-100 dark:text-purple-700';
  };

  return (
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
                  onChange={onSelectAll}
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
          {users.map((user) => (
            <TableRow key={user.id} className={selectedUsers.includes(user.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
              <TableCell className="px-5 py-4 sm:px-6 text-start">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={user.image}
                        alt={user.nomPrenom}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.nomPrenom}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {formatDate(user.dateCreation)}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {getRoleDisplay(user.role)}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <div className="space-y-1">
                  <a 
                    href={`mailto:${user.email}`} 
                    className="block text-sm hover:text-blue-600 hover:underline"
                  >
                    {user.email}
                  </a>
                  <a 
                    href={`tel:${user.telephone}`} 
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:underline"
                  >
                    {user.telephone}
                  </a>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <Badge
                  size="sm"
                  color={
                    user.statut === 'actif'
                      ? "success"
                      : user.statut === 'en_attente'
                        ? "warning"
                        : "error"
                  }
                >
                  {user.statut === 'actif' ? 'Actif' : 
                   user.statut === 'inactif' ? 'Inactif' : 
                   'En attente'}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <div className="space-y-1">
                  <span className="block text-sm">
                    {formatDate(user.derniereConnexion)}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {new Date(user.derniereConnexion).toLocaleTimeString('fr-FR', {
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
                    onClick={() => onView(user)}
                    // className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
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
                    onClick={() => onEdit(user)}
                    // className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                  className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                    title="Éditer"
                  >
                    {/* <svg
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2v-5m1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg> */}
                     <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                  </button>

                  {/* Désactiver/Réactiver */}
                  <button 
                    onClick={() => onToggleStatus(user)}
                    disabled={updatingStatus === user.id}
                    className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors disabled:opacity-50"
                    title={user.statut === "actif" ? "Désactiver" : "Réactiver"}
                  >
                    {updatingStatus === user.id ? (
                      <svg className="w-4.5 h-4.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : user.statut === "actif" ? (
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
                    onClick={() => onDelete(user)}
                    // className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
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
  );
}