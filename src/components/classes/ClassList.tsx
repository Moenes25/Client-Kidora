// src/components/classes/ClassList.tsx
import { Users, Calendar } from "lucide-react";


interface ClassListProps {
  classes: ClassInfo[];
  selectedClass: string;
  onSelectClass: (classId: string) => void;
}
export type ClassInfo = {
  id: string;
  name: string;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  childrenCount: number;
  educator: string;
  capacity?: number;
  occupancyRate?: number;
  lastActivity?: string;
};

  const classes: ClassInfo[] = [
    { id: "petits", name: "Petits (2-3 ans)", color: "blue",   childrenCount: 18, educator: "Marie Dubois", capacity: 20, lastActivity: "10:30" },
    { id: "moyens", name: "Moyens (3-4 ans)", color: "green",  childrenCount: 16, educator: "Jean Martin", capacity: 20, lastActivity: "Hier" },
    { id: "grands", name: "Grands (4-5 ans)", color: "purple", childrenCount: 14, educator: "Sophie Petit", capacity: 20, lastActivity: "09:15" },
  ];

const COLORS = {
  blue:   { dot: "#3b82f6",  soft: "bg-blue-50 dark:bg-blue-900/20",   badge: "text-blue-700 dark:text-blue-300" },
  green:  { dot: "#10b981",  soft: "bg-emerald-50 dark:bg-emerald-900/20", badge: "text-emerald-700 dark:text-emerald-300" },
  purple: { dot: "#8b5cf6",  soft: "bg-violet-50 dark:bg-violet-900/20",   badge: "text-violet-700 dark:text-violet-300" },
  orange: { dot: "#f59e0b",  soft: "bg-amber-50 dark:bg-amber-900/20",     badge: "text-amber-700 dark:text-amber-300" },
  pink:   { dot: "#ec4899",  soft: "bg-pink-50 dark:bg-pink-900/20",       badge: "text-pink-700 dark:text-pink-300" },
  indigo: { dot: "#6366f1",  soft: "bg-indigo-50 dark:bg-indigo-900/20",   badge: "text-indigo-700 dark:text-indigo-300" },
} as const;

export default function ClassList({ classes, selectedClass, onSelectClass }: ClassListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Liste des classes</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">{classes.length} classes actives</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {classes.map((c) => {
          const capacity = c.capacity ?? 20;
          const rate = Math.min(100, Math.round((c.childrenCount / capacity) * 100));
          const status =
            rate >= 90 ? { bg: "bg-rose-100 dark:bg-rose-900/30", fg: "text-rose-700 dark:text-rose-300", label: "Complet" } :
            rate >= 75 ? { bg: "bg-amber-100 dark:bg-amber-900/30", fg: "text-amber-800 dark:text-amber-300", label: "Très rempli" } :
                         { bg: "bg-emerald-100 dark:bg-emerald-900/30", fg: "text-emerald-800 dark:text-emerald-300", label: "Disponible" };

          const palette = COLORS[c.color];

          return (
            <button
              key={c.id}
              onClick={() => onSelectClass(c.id)}
              className={[
                "group relative overflow-hidden rounded-xl border p-5 text-left transition-all",
                selectedClass === c.id
                  ? "border-indigo-400 bg-indigo-50/50 shadow-sm dark:border-indigo-400/50 dark:bg-indigo-900/10"
                  : "border-gray-200 bg-white hover:shadow-sm dark:border-white/10 dark:bg-gray-900/50",
              ].join(" ")}
            >
              {/* décor */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-slate-100 blur-2xl dark:bg-white/5" />

              <div className="flex items-start gap-4">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-lg ${palette.soft}`}
                  style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,.2)" }}
                >
                  <span className="inline-block h-5 w-5 rounded-full" style={{ background: palette.dot }} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{c.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${status.bg} ${status.fg}`}>
                      {rate}% rempli
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-4 w-4" /> <strong className="text-gray-900 dark:text-white">{c.childrenCount}</strong> enfants
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {c.educator}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Capacité: {capacity}
                    </span>
                    {c.lastActivity && (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${palette.soft} ${palette.badge}`}>
                        📝 Activité: {c.lastActivity}
                      </span>
                    )}
                  </div>

                  {/* Progression */}
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Occupation</span>
                      <span className="font-medium text-gray-900 dark:text-white">{c.childrenCount}/{capacity} places</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${rate}%`, background: palette.dot }}
                      />
                    </div>
                  </div>
                </div>

                {/* point de sélection */}
                <span
                  className={[
                    "mt-1 inline-block h-2 w-2 rounded-full transition-all",
                    selectedClass === c.id ? "scale-125 bg-indigo-500" : "bg-gray-300 dark:bg-gray-600",
                  ].join(" ")}
                />
              </div>
            </button>
          );
        })}
      </div>

      {classes.length === 0 && (
        <div className="mt-6 grid place-items-center rounded-xl border border-dashed border-gray-300 p-10 text-center dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">Aucune classe trouvée.</p>
        </div>
      )}
    </div>
  );
}
