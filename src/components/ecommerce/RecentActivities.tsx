// components/nursery/RecentActivities.tsx
import React, { useMemo, useState } from "react";
import {
  Activity,
  Utensils,
  Music,
  BookOpen,
  Palette,
  Gamepad,
  CalendarDays,
  Sparkles,
} from "lucide-react";

type Kind = "meal" | "nap" | "learning" | "play" | "art" | "music";

interface ActivityItem {
  id: number;
  child: string;
  activity: string;
  type: Kind;
  time: string;
  duration: string;
  educator: string;
  avatar?: string;
}

const DATA: ActivityItem[] = [
  { id: 1, child: "Emma Martin", activity: "Déjeuner", type: "meal", time: "12:00 – 12:45", duration: "45 min", educator: "Marie Dubois" },
  { id: 2, child: "Lucas Dubois", activity: "Sieste", type: "nap", time: "13:00 – 15:00", duration: "2 h", educator: "Jean Martin" },
  { id: 3, child: "Chloé Bernard", activity: "Éveil musical", type: "music", time: "10:00 – 10:45", duration: "45 min", educator: "Sophie Petit" },
  { id: 4, child: "Hugo Laurent", activity: "Peinture", type: "art", time: "11:00 – 11:45", duration: "45 min", educator: "Marie Dubois" },
  { id: 5, child: "Léa Moreau", activity: "Lecture", type: "learning", time: "09:30 – 10:15", duration: "45 min", educator: "Jean Martin" },
  { id: 6, child: "Noah Girard", activity: "Jeux éducatifs", type: "play", time: "15:30 – 16:15", duration: "45 min", educator: "Sophie Petit" },
];

/* ---------- UI helpers ---------- */
const ICONS: Record<Kind, React.ReactNode> = {
  meal: <Utensils className="h-3.5 w-3.5" />,
  nap: <Activity className="h-3.5 w-3.5" />,
  learning: <BookOpen className="h-3.5 w-3.5" />,
  play: <Gamepad className="h-3.5 w-3.5" />,
  art: <Palette className="h-3.5 w-3.5" />,
  music: <Music className="h-3.5 w-3.5" />,
};

const PALETTE: Record<
  Kind,
  { dot: string; pill: string; ring: string; soft: string }
> = {
  meal:    { dot: "bg-orange-500", pill: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200", ring: "ring-orange-200/60 dark:ring-orange-800/40", soft: "from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10" },
  nap:     { dot: "bg-sky-500",    pill: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200",       ring: "ring-sky-200/60 dark:ring-sky-800/40",       soft: "from-sky-50 to-blue-50 dark:from-sky-900/10 dark:to-blue-900/10" },
  learning:{ dot: "bg-violet-500", pill: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200", ring: "ring-violet-200/60 dark:ring-violet-800/40", soft: "from-violet-50 to-fuchsia-50 dark:from-violet-900/10 dark:to-fuchsia-900/10" },
  play:    { dot: "bg-emerald-500",pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200", ring: "ring-emerald-200/60 dark:ring-emerald-800/40", soft: "from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10" },
  art:     { dot: "bg-pink-500",   pill: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200",   ring: "ring-pink-200/60 dark:ring-pink-800/40",     soft: "from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10" },
  music:   { dot: "bg-indigo-500", pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200", ring: "ring-indigo-200/60 dark:ring-indigo-800/40", soft: "from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10" },
};

function EducatorAvatar({ name, src }: { name: string; src?: string }) {
  const initials = useMemo(
    () => name.split(" ").map(n => n[0]).slice(0, 2).join(""),
    [name]
  );
  return (
    <div className="grid h-6 w-6 place-items-center overflow-hidden rounded-full border border-white/70 bg-white text-[10px] font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
      {src ? <img src={src} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}

/* ---------- Component ---------- */
export default function RecentActivities() {
  const [showAll, setShowAll] = useState(false);
  const [scope, setScope] = useState<"today" | "week">("today");

  const items = showAll ? DATA : DATA.slice(0, 4);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* décor discret */}
      <svg className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 opacity-20 dark:opacity-10" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#g)" />
      </svg>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-4 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <div>
              <h3 className="text-base font-semibold">Activités récentes</h3>
              <p className="text-xs text-white/80">Suivi des moments de la journée</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/15 p-1 backdrop-blur">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setScope("today")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  scope === "today" ? "bg-white text-gray-900" : "text-white/90 hover:bg-white/10"
                }`}
              >
                Aujourd’hui
              </button>
              <button
                onClick={() => setScope("week")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  scope === "week" ? "bg-white text-gray-900" : "text-white/90 hover:bg-white/10"
                }`}
              >
                Semaine
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative px-5 py-4">
        <div className="relative">
          {/* ligne de temps */}
          <div className="absolute left-[11px] top-1 bottom-1 w-px bg-gradient-to-b from-indigo-200 via-gray-200 to-transparent dark:from-indigo-900/40 dark:via-gray-700/60" />

          <ul className="space-y-3">
            {items.map((a) => {
              const p = PALETTE[a.type];
              return (
                <li key={a.id} className="relative pl-7">
                  {/* dot */}
                  <span className={`absolute left-0 top-2.5 h-3 w-3 rounded-full ring-2 ${p.dot} ${p.ring}`} />

                  {/* card */}
                  <div
                    className={`group overflow-hidden rounded-xl border border-gray-200/70 bg-gradient-to-br ${p.soft} p-3 backdrop-blur transition hover:shadow-md dark:border-gray-800/70`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg ${p.pill}`}>
                        {ICONS[a.type]}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {a.child}
                          </h4>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${p.pill}`}>
                            {a.activity}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-600 dark:text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5 opacity-70" />
                            {a.time}
                          </span>
                          <span className="opacity-50">•</span>
                          <span>{a.duration}</span>
                          <span className="opacity-50">•</span>
                          <span className="inline-flex items-center gap-1">
                            <EducatorAvatar name={a.educator} />
                            {a.educator}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* hint */}
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
            {showAll
              ? `${DATA.length} activités affichées pour ${scope === "today" ? "aujourd’hui" : "la semaine"}`
              : `Aperçu – ${items.length}/${DATA.length} activités`}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-200 pt-4 text-xs dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Activités en cours : 2
            </div>
            <button
              onClick={() => setShowAll((v) => !v)}
              className="rounded-lg bg-indigo-50 px-3 py-1.5 font-medium text-indigo-700 transition hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
            >
              {showAll ? "Réduire le planning" : "Voir le planning complet →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
