import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Parent } from "./types";
import { imageApi } from "../../../services/api/imageService";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ParentsTableProps {
  parents: Parent[];
  selectedParents: string[];
  isAllSelected: boolean;
  onSelectAll: () => void;
  onSelectParent: (id: string) => void;
  onViewDetails: (parent: Parent) => void;
  onEdit: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

type ImageCache = Record<string, string>;

const badgeColor = (s: string) =>
  s === "Actif" ? "success" : s === "En attente" ? "warning" : s === "Inactif" ? "error" : "primary";

const ParentsTable: React.FC<ParentsTableProps> = ({
  parents,
  selectedParents,
  isAllSelected,
  onSelectAll,
  onSelectParent,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const [imageCache, setImageCache] = useState<ImageCache>({});
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  useEffect(() => {
    if (parents.length) void loadParentsImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents]);

  const loadParentsImages = async (): Promise<void> => {
    setLoadingImages(true);
    const next: ImageCache = { ...imageCache };
    const slice = parents.slice(0, 20);
    await Promise.all(
      slice.map(async (p) => {
        if (p.image && !next[p.id]) {
          try {
            const url = await imageApi.getImage(p.image);
            next[p.id] = url;
          } catch {
            next[p.id] = "/default-avatar.png";
          }
        }
      })
    );
    setImageCache(next);
    setLoadingImages(false);
  };

  const loadSingle = async (p: Parent): Promise<void> => {
    if (!p.image || imageCache[p.id]) return;
    try {
      const url = await imageApi.getImage(p.image);
      setImageCache((prev) => ({ ...prev, [p.id]: url }));
    } catch {
      setImageCache((prev) => ({ ...prev, [p.id]: "/default-avatar.png" }));
    }
  };

  const getParentImage = (p: Parent): string => {
    if (!p.image) return "/default-avatar.png";
    if (imageCache[p.id]) return imageCache[p.id];
    if (!loadingImages) void loadSingle(p);
    return "/placeholder-avatar.png";
  };

  useEffect(() => {
    // cleanup blobs on unmount / change
    return () => {
      Object.values(imageCache).forEach((u) => {
        if (u?.startsWith("blob:")) URL.revokeObjectURL(u);
      });
    };
  }, [imageCache]);

  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ): void => {
    e.currentTarget.src = "/default-avatar.png";
    setImageCache((p) => ({ ...p, [id]: "/default-avatar.png" }));
  };

  const childUrl = (path: string): string => {
    if (!path) return "/default-child-avatar.png";
    if (path.startsWith("http")) return path;
    return imageApi.getImageUrl
      ? imageApi.getImageUrl(path)
      : `http://localhost:8086/${encodeURI(path.startsWith("/") ? path.substring(1) : path)}`;
  };

 return (
  <div
    className="
      w-full overflow-x-hidden
      [&_*]:min-w-0
    "
  >
    <Table
      className="
        w-full table-fixed border-collapse
      "
    >
      {/* Largeurs en % (somme = 100) -> pas de dépassement */}
      <colgroup>
        <col className="w-[24%]" /> {/* Nom & Prénom */}
        <col className="w-[18%]" /> {/* Email */}
        <col className="w-[12%]" /> {/* Téléphone */}
        <col className="w-[8%]"  /> {/* Relation */}
        <col className="w-[10%]" /> {/* Enfants */}
        <col className="w-[8%]"  /> {/* Statut */}
        <col className="w-[12%]" /> {/* Profession */}
        <col className="w-[8%]"  /> {/* Actions */}
      </colgroup>

      <TableHeader className="sticky top-0 z-[5] border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm">
        <TableRow>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                className="mr-3 h-4 w-4 rounded border-white/30 bg-white/20 text-white focus:ring-2 focus:ring-white"
              />
              Nom et Prénom
            </div>
          </TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Email</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Téléphone</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Relation</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Enfants</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Statut</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Profession</TableCell>
          <TableCell isHeader className="px-5 py-3 text-start font-medium">Actions</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-gray-100 dark:divide-white/10">
        {parents.map((p) => {
          const selected = selectedParents.includes(p.id);
          const avatar = getParentImage(p);
          return (
            <TableRow
              key={p.id}
              className={[
                selected ? "bg-blue-50/80 dark:bg-blue-900/20" : "",
                "transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40",
              ].join(" ")}
            >
              {/* Nom & Prénom */}
              <TableCell className="px-5 py-4 text-start">
                <div className="flex min-w-0 items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelectParent(p.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white dark:ring-gray-900 shrink-0">
                      <img
                        width={40}
                        height={40}
                        src={avatar}
                        onError={(e) => handleImgError(e, p.id)}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        alt=""
                      />
                      <span
                        className={[
                          "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
                          p.statut === "Actif" ? "bg-emerald-500" : p.statut === "En attente" ? "bg-amber-500" : "bg-rose-500",
                        ].join(" ")}
                      />
                    </div>
                    <span className="min-w-0 truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                      {p.nom} {p.prenom}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Email (truncate) */}
              <TableCell className="px-4 py-3 text-start">
                <a
                  href={`mailto:${p.email}`}
                  className="block truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
                  title={p.email}
                >
                  {p.email}
                </a>
              </TableCell>

              {/* Téléphone (nowrap) */}
              <TableCell className="px-4 py-3 text-start text-sm text-gray-700 dark:text-gray-300">
                <span className="whitespace-nowrap">
                  <a href={`tel:${p.telephone}`} className="hover:underline">{p.telephone}</a>
                </span>
              </TableCell>

              {/* Relation */}
              <TableCell className="px-4 py-3 text-start">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {p.relation}
                </span>
              </TableCell>

              {/* Enfants */}
              <TableCell className="px-4 py-3 text-start">
                <div className="flex -space-x-2">
                  {p.enfants.images.slice(0, 3).map((img, i) => (
                    <div key={i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white dark:border-gray-900 shrink-0">
                      <img
                        width={32}
                        height={32}
                        src={childUrl(img)}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/default-child-avatar.png"; }}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  ))}
                  {p.enfants.images.length > 3 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-700 dark:border-gray-900 dark:bg-gray-700 dark:text-gray-300 shrink-0">
                      +{p.enfants.images.length - 3}
                    </div>
                  )}
                </div>
              </TableCell>

              {/* Statut */}
              <TableCell className="px-4 py-3 text-start">
                <Badge size="sm" color={badgeColor(p.statut)}>{p.statut}</Badge>
              </TableCell>

              {/* Profession (truncate) */}
              <TableCell className="px-4 py-3 text-start">
                <span className="block truncate text-sm text-gray-700 dark:text-gray-300" title={p.profession}>
                  {p.profession}
                </span>
              </TableCell>

              {/* Actions (nowrap) */}
              <TableCell className="px-4 py-3 text-start">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <button onClick={() => onViewDetails(p)} className="rounded p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30" title="Voir détails">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => onEdit(p)} className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30" title="Modifier">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(p)} className="rounded p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30" title="Supprimer">
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

};

export default ParentsTable;
