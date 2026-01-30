import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Utilisateur } from "./types";
import { RoleUsers, StatutClient } from "../../../types/auth.types";
import { useEffect, useState } from "react";
import { imageApi } from "../../../services/api/imageService";
import { Eye, RefreshCw, Power, PowerOff, Trash2 } from "lucide-react";

interface UsersTableProps {
  users: Utilisateur[];
  selectedUsers: string[];
  onSelectUser: (id: string) => void;
  onSelectAll: () => void;
  isSelectAll: boolean;
  onView: (user: Utilisateur) => void;
  onDelete: (user: Utilisateur) => void;
  onToggleStatus: (user: Utilisateur) => void;
  updatingStatus: string | null;
}

interface ImageCache { [userId: string]: string; }

export default function UsersTable({
  users, selectedUsers, onSelectUser, onSelectAll, isSelectAll,
  onView, onDelete, onToggleStatus, updatingStatus
}: UsersTableProps) {
  const [imageCache, setImageCache] = useState<ImageCache>({});
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  useEffect(() => { if (users.length) loadUsersImages(); }, [users]);

  const loadUsersImages = async () => {
    setLoadingImages(true);
    const newCache: ImageCache = { ...imageCache };
    const usersToLoad = users.slice(0, 20);

    await Promise.all(usersToLoad.map(async (u) => {
      if (u.image && !newCache[u.id]) {
        try {
          const url = await imageApi.getImage(u.image);
          newCache[u.id] = url;
        } catch {
          newCache[u.id] = "/default-avatar.png";
        }
      }
    }));

    setImageCache(newCache);
    setLoadingImages(false);
  };

  const getUserImage = (u: Utilisateur) => {
    if (!u?.image) return "/default-avatar.png";
    if (imageCache[u.id]) return imageCache[u.id];
    loadSingleImage(u);
    return "/placeholder-avatar.png";
  };

  const loadSingleImage = async (u: Utilisateur) => {
    if (!u.image || imageCache[u.id]) return;
    try {
      const url = await imageApi.getImage(u.image);
      setImageCache((p) => ({ ...p, [u.id]: url }));
    } catch {
      setImageCache((p) => ({ ...p, [u.id]: "/default-avatar.png" }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(imageCache).forEach((url) => { if (url?.startsWith("blob:")) URL.revokeObjectURL(url); });
    };
  }, [imageCache]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, id: string) => {
    e.currentTarget.src = "/default-avatar.png";
    setImageCache((p) => ({ ...p, [id]: "/default-avatar.png" }));
  };

  const fmtDate = (s: string) =>
    new Date(s).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  const roleDisplay = (r: string) =>
    r === RoleUsers.PARENT ? "Parent" : r === RoleUsers.EDUCATEUR ? "Éducateur" : "Administrateur";

  const roleColor = (r: string) =>
    r === RoleUsers.PARENT
      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
      : r === RoleUsers.EDUCATEUR
      ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300"
      : "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300";

  const statusColor = (s: string | null) => {
    const u = (s || "").toUpperCase();
    if (u === StatutClient.ACTIF) return "success";
    if (u === StatutClient.EN_ATTENTE) return "warning";
    if (u === StatutClient.INACTIF) return "error";
    return "dark";
    };

  const statusDisplay = (s: string | null) => {
    const u = (s || "").toUpperCase();
    if (u === StatutClient.ACTIF) return "Actif";
    if (u === StatutClient.INACTIF) return "Inactif";
    if (u === StatutClient.EN_ATTENTE) return "En attente";
    return "Non défini";
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        {/* Header sticky avec gradient léger */}
        <TableHeader className="sticky top-0 z-[5] border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm">
          <TableRow>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={onSelectAll}
                  className="mr-3 h-4 w-4 rounded border-white/30 bg-white/20 text-white focus:ring-2 focus:ring-white"
                />
                Utilisateur
              </div>
            </TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">Rôle</TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">Contact</TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">Statut</TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">Dernière connexion</TableCell>
            <TableCell isHeader className="px-5 py-3 font-medium text-white text-start">Actions</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {users.map((u) => {
            const img = getUserImage(u);
            const selected = selectedUsers.includes(u.id);
            return (
              <TableRow
                key={u.id}
                className={[
                  selected ? "bg-blue-50/80 dark:bg-blue-900/20" : "bg-white/0",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors",
                ].join(" ")}
              >
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onSelectUser(u.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white dark:ring-gray-900">
                        <img
                          width={40}
                          height={40}
                          src={img}
                          onError={(e) => handleImageError(e, u.id)}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {/* anneau statut visuel */}
                        <span
                          className={[
                            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
                            statusDisplay(u.statut) === "Actif" ? "bg-emerald-500" :
                            statusDisplay(u.statut) === "En attente" ? "bg-amber-500" : "bg-rose-500",
                          ].join(" ")}
                        />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-gray-800 dark:text-white/90">{u.nomPrenom}</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">{fmtDate(u.dateCreation)}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${roleColor(u.role)}`}>
                    {roleDisplay(u.role)}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                  <div className="space-y-1">
                    <a href={`mailto:${u.email}`} className="block text-blue-600 hover:underline dark:text-blue-400">
                      {u.email}
                    </a>
                    <a href={`tel:${u.telephone}`} className="block text-gray-700 hover:underline dark:text-gray-300">
                      {u.telephone}
                    </a>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <Badge size="sm" color={statusColor(u.statut)}>{statusDisplay(u.statut)}</Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <span>{fmtDate(u.derniereConnexion)}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {new Date(u.derniereConnexion).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-start">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(u)}
                      className="rounded p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Voir les détails"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onToggleStatus(u)}
                      disabled={updatingStatus === u.id}
                      className="rounded p-1.5 text-amber-600 hover:bg-amber-50 disabled:opacity-50 dark:text-amber-500 dark:hover:bg-amber-900/30"
                      title={statusDisplay(u.statut) === "Actif" ? "Désactiver" : "Réactiver"}
                    >
                      {updatingStatus === u.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : statusDisplay(u.statut) === "Actif" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => onDelete(u)}
                      className="rounded p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
