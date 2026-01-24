// components/nursery/EducatorList.tsx
import { useMemo, useState } from "react";
import {
  UserCheck,
  UserX,
  Calendar,
  ChevronDown,
  ChevronUp,
  Users,
  Wifi,
} from "lucide-react";

interface Educator {
  id: number;
  name: string;
  role: string;
  status: "present" | "absent" | "vacation";
  avatar: string;
  assignedClass: string;
  timeIn?: string;
  timeOut?: string;
}

const allEducators: Educator[] = [
  { id: 1, name: "Marie Dubois", role: "Éducatrice principale", status: "present", avatar: "/images/3-4_ans/educatrice_1.jpg", assignedClass: "C1", timeIn: "08:00", timeOut: "17:00" },
  { id: 2, name: "Jean Martin", role: "Assistant éducateur", status: "present", avatar: "/images/user/user-35.jpg", assignedClass: "C2", timeIn: "08:30", timeOut: "17:30" },
  { id: 3, name: "Sophie Petit", role: "Éducatrice", status: "present", avatar: "/images/user/user-36.jpg", assignedClass: "C3", timeIn: "08:15", timeOut: "16:45" },
  { id: 4, name: "Luc Bernard", role: "Assistant", status: "present", avatar: "/images/user/user-37.jpg", assignedClass: "C4", timeIn: "09:00", timeOut: "18:00" },
  { id: 5, name: "Camille Rousseau", role: "Stagiaire", status: "present", avatar: "/images/user/user-38.jpg", assignedClass: "C5", timeIn: "08:45", timeOut: "16:30" },
  { id: 6, name: "Thomas Leroy", role: "Éducateur spécialisé", status: "present", avatar: "/images/user/user-39.jpg", assignedClass: "C6", timeIn: "08:20", timeOut: "17:15" },
  { id: 7, name: "Julie Moreau", role: "Éducatrice spécialisée", status: "absent", avatar: "/images/user/user-40.jpg", assignedClass: "C7" },
  { id: 8, name: "Pierre Lefèvre", role: "Directeur", status: "vacation", avatar: "/images/user/user-41.jpg", assignedClass: "Toutes classes" },
];

export default function EducatorList() {
  const [showAllPresent, setShowAllPresent] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const presentEducators = useMemo(
    () => allEducators.filter((e) => e.status === "present"),
    []
  );
  const otherEducators = useMemo(
    () => allEducators.filter((e) => e.status !== "present"),
    []
  );

  const defaultVisibleCount = 4;
  const visiblePresent = showAllPresent
    ? presentEducators
    : presentEducators.slice(0, defaultVisibleCount);
  const visibleOthers = showAllTeam
    ? otherEducators
    : otherEducators.slice(0, defaultVisibleCount);

  const stats = {
    total: allEducators.length,
    present: presentEducators.length,
    absent: allEducators.filter((e) => e.status === "absent").length,
    vacation: allEducators.filter((e) => e.status === "vacation").length,
  };

  const getStatusIcon = (s: Educator["status"]) =>
    s === "present" ? (
      <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
    ) : s === "absent" ? (
      <UserX className="h-3.5 w-3.5 text-rose-400" />
    ) : (
      <Calendar className="h-3.5 w-3.5 text-amber-400" />
    );

  const getStatusPill = (s: Educator["status"]) =>
    s === "present"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
      : s === "absent"
      ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";

  const handleImageError = (id: number) =>
    setImageErrors((p) => ({ ...p, [id]: true }));

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Dégradé header + badge total */}
      <div className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Équipe aujourd’hui</h3>
            <p className="text-xs text-white/85">
              {stats.present}/{stats.total} éducateurs présents
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
            <Users className="h-3.5 w-3.5" />
            {stats.total} membres
          </div>
        </div>

        {/* Stats rapides “glass” */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <UserCheck className="h-4 w-4 text-emerald-300" />
              <span className="text-sm font-bold">{stats.present}</span>
            </div>
            <div className="text-[11px] text-white/85">Présents</div>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <UserX className="h-4 w-4 text-rose-300" />
              <span className="text-sm font-bold">{stats.absent}</span>
            </div>
            <div className="text-[11px] text-white/85">Absents</div>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-bold">{stats.vacation}</span>
            </div>
            <div className="text-[11px] text-white/85">En congés</div>
          </div>
        </div>
      </div>

      {/* Liste Présents */}
      <div className="flex-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Présents aujourd’hui ({presentEducators.length})
          </h4>
          {presentEducators.length > defaultVisibleCount && (
            <button
              onClick={() => setShowAllPresent((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-900/30"
            >
              {showAllPresent ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" /> Voir moins
                </>
              ) : (
                <>
                  Voir les {presentEducators.length - defaultVisibleCount} autres
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {visiblePresent.map((e) => (
            <div
              key={e.id}
              className="group flex items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm backdrop-blur transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                  <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-gray-700">
                    {imageErrors[e.id] ? (
                      <div className="grid h-full w-full place-items-center bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                        <span className="text-sm font-bold">
                          {e.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={e.avatar}
                        alt={e.name}
                        className="h-full w-full object-cover"
                        onError={() => handleImageError(e.id)}
                      />
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 grid h-4.5 w-4.5 place-items-center rounded-full bg-white shadow dark:bg-gray-800">
                    {getStatusIcon(e.status)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-gray-900 dark:text-white">
                      {e.name}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(
                        e.status
                      )}`}
                    >
                      {e.status === "present"
                        ? "Présent"
                        : e.status === "absent"
                        ? "Absent"
                        : "En congés"}
                    </span>
                  </div>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {e.role}
                  </p>
                  {e.timeIn && (
                    <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                      ⏰ {e.timeIn} – {e.timeOut}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                  {e.assignedClass}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <Wifi className="h-3.5 w-3.5" />
                  En ligne
                </span>
              </div>
            </div>
          ))}

          {/* “Autres membres” */}
          {otherEducators.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Autres membres ({otherEducators.length})
                </h4>
                {otherEducators.length > defaultVisibleCount && (
                  <button
                    onClick={() => setShowAllTeam((v) => !v)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  >
                    {showAllTeam ? (
                      <>
                        <ChevronUp className="h-3.5 w-3.5" /> Réduire
                      </>
                    ) : (
                      <>
                        Voir tout <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {(showAllTeam ? visibleOthers : visibleOthers).map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/60 p-2.5 dark:border-gray-800 dark:bg-gray-800/50"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={e.avatar}
                          alt={e.name}
                          className="h-full w-full object-cover"
                          onError={(ev) => {
                            (ev.currentTarget as HTMLImageElement).src =
                              "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(e.name) +
                              "&background=8b5cf6&color=fff&size=32";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {e.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {e.role}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(
                        e.status
                      )}`}
                    >
                      {e.status === "absent" ? "Absent" : "En congés"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
