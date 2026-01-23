import { useMemo, useState } from "react";
import { UserIcon, CheckCircleIcon, CloseIcon } from "../../../icons";
import { Sparkles, Search, Filter } from "lucide-react";

/* ----------------------------------------------------------------
   Types
-----------------------------------------------------------------*/
interface Enfant {
  id: number;
  nom: string;
  present: boolean;
  heureArrivee?: string;
  raison?: string;
  photo?: string;
  classe?: string;
}
interface ChildrenTodayProps {
  enfants?: Enfant[];
}

/* ----------------------------------------------------------------
   Helpers UI
-----------------------------------------------------------------*/
const classeTone = (classe?: string) => {
  if (!classe) return "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-300";
  if (classe.includes("3-4"))
    return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300";
  if (classe.includes("4-5"))
    return "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300";
  if (classe.includes("6-7"))
    return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300";
  if (classe.includes("8-9"))
    return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300";
  if (classe.includes("10-11"))
    return "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300";
  return "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-300";
};

/* ----------------------------------------------------------------
   Composant principal
-----------------------------------------------------------------*/
export default function ChildrenToday({ enfants: enfantsExternes }: ChildrenTodayProps) {
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");
  const [q, setQ] = useState("");

  // Photos par classe (conservées de ta version)
  const photosParClasse = {
    "(3-4) ans": [
      "images/3-4_ans/enfant_2.jpg",
      "images/3-4_ans/enfant_4.jpg",
      "images/3-4_ans/enfant_3.jpg",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
    "(4-5) ans": [
      "images/3-4_ans/enfant_5.jpg",
      "images/3-4_ans/enfant_6.jpg",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-97dc7697c36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    ],
    "(6-7) ans": [
      "images/3-4_ans/enfant_7.jpg",
      "images/3-4_ans/enfant_8.jpg",
      "images/3-4_ans/enfant_9.jpg",
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
    ],
    "(8-9) ans": [
      "images/3-4_ans/enfant_10.jpg",
      "images/3-4_ans/enfant_11.jpg",
      "images/3-4_ans/enfant_11.jpg",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
    "(10-11) ans": [
      "images/3-4_ans/enfant_13.jpg",
      "images/3-4_ans/enfant_14.jpg",
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    ],
    "12 ans": [
      "images/3-4_ans/enfant_15.jpg",
      "images/3-4_ans/enfant_16.jpg",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    ],
  };

  const defaultEnfants: Enfant[] = [
    { id: 1, nom: "Emma Dubois", present: true, heureArrivee: "08:30", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][0] },
    { id: 2, nom: "Lucas Martin", present: true, heureArrivee: "08:45", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][0] },
    { id: 3, nom: "Fatima Zahra", present: true, heureArrivee: "09:00", classe: "12 ans", photo: photosParClasse["12 ans"][0] },
    { id: 4, nom: "Voussez Alain", present: false, raison: "Maladie", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][0] },
    { id: 5, nom: "Chloé Petit", present: true, heureArrivee: "08:15", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][1] },
    { id: 6, nom: "Mohamed Ali", present: false, raison: "Rendez-vous médical", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][1] },
    { id: 7, nom: "Léa Bernard", present: true, heureArrivee: "08:50", classe: "12 ans", photo: photosParClasse["12 ans"][1] },
    { id: 8, nom: "Thomas Leroy", present: true, heureArrivee: "09:05", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][1] },
    { id: 9, nom: "Sophie Moreau", present: true, heureArrivee: "08:20", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][2] },
    { id: 10, nom: "Hugo Blanc", present: false, raison: "Vacances", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][2] },
    { id: 11, nom: "Anna Lambert", present: true, heureArrivee: "08:40", classe: "(10-11) ans", photo: photosParClasse["(10-11) ans"][0] },
    { id: 12, nom: "Paul Dupont", present: false, raison: "Grippe", classe: "(10-11) ans", photo: photosParClasse["(10-11) ans"][1] },
    { id: 13, nom: "Zoé Leroy", present: true, heureArrivee: "08:55", classe: "(4-5) ans", photo: photosParClasse["(4-5) ans"][0] },
    { id: 14, nom: "Noah Martin", present: true, heureArrivee: "09:10", classe: "(4-5) ans", photo: photosParClasse["(4-5) ans"][1] },
  ];

  const enfants = useMemo(() => enfantsExternes || defaultEnfants, [enfantsExternes]);

  const enfantsFiltres = useMemo(() => {
    const base =
      filter === "present" ? enfants.filter(e => e.present) :
      filter === "absent"  ? enfants.filter(e => !e.present) :
      enfants;
    if (!q.trim()) return base;
    const s = q.trim().toLowerCase();
    return base.filter(e =>
      e.nom.toLowerCase().includes(s) ||
      (e.classe || "").toLowerCase().includes(s)
    );
  }, [enfants, filter, q]);

  const countPresent = enfants.filter(e => e.present).length;
  const countAbsent = enfants.length - countPresent;
  const pctPresent = Math.round((countPresent / enfants.length) * 100);

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5">
      {/* Header créatif */}
      <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white">
        {/* halos */}
        <span aria-hidden className="pointer-events-none absolute -top-6 -left-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 opacity-90" />
                <h3 className="text-lg font-semibold">Enfants aujourd’hui</h3>
              </div>
              <p className="mt-0.5 text-sm text-white/90">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                <CheckCircleIcon className="size-3.5 text-white" />
                {countPresent} présents
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                <CloseIcon className="size-3.5 text-white" />
                {countAbsent} absents
              </span>
            </div>
          </div>

          {/* Toolbar: filtres + search */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="inline-flex overflow-hidden rounded-xl ring-1 ring-white/25 bg-white/10 backdrop-blur"
              role="tablist"
              aria-label="Filtrer la présence"
            >
              {(["all", "present", "absent"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  role="tab"
                  aria-selected={filter === k}
                  className={[
                    "px-3.5 py-2 text-xs font-semibold transition",
                    filter === k ? "bg-white/90 text-emerald-700" : "text-white/90 hover:bg-white/15",
                  ].join(" ")}
                  title={
                    k === "all"
                      ? "Tous les enfants"
                      : k === "present"
                      ? "Enfants présents"
                      : "Enfants absents"
                  }
                >
                  {k === "all" ? `Tous (${enfants.length})` : k === "present" ? `Présents (${countPresent})` : `Absents (${countAbsent})`}
                </button>
              ))}
            </div>

            <label className="group relative w-full sm:w-72" aria-label="Rechercher un enfant">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/90" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher nom ou classe…"
                className="w-full rounded-xl border border-white/20 bg-white/15 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/80 outline-none focus:ring-2 focus:ring-white/40"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.06) inset, 0 10px 30px rgba(0,0,0,.12)" }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Liste / cartes */}
      <div className="p-5">
        {enfantsFiltres.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
            <UserIcon className="size-10 mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-500 dark:text-white/70">Aucun enfant ne correspond à ce filtre</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {enfantsFiltres.map((e) => (
              <CardEnfant key={e.id} e={e} />
            ))}
          </div>
        )}

        {/* footer stats */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700 dark:text-white/85">Taux de présence</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{pctPresent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width] duration-500"
              style={{ width: `${pctPresent}%` }}
            />
          </div>

          <button
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
            title="Ouvrir la gestion des présences"
            onClick={() => alert("Ouvrir la gestion des présences (branche sur ton modal)")}
          >
            <Filter className="h-4 w-4" />
            Modifier les présences
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Carte Enfant
-----------------------------------------------------------------*/
function CardEnfant({ e }: { e: Enfant }) {
  const initials = e.nom.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <article
      className="group relative rounded-2xl border border-slate-200 bg-white/60 p-3 shadow-sm ring-1 ring-black/0 transition hover:bg-white/80 hover:shadow-md hover:ring-black/5 dark:border-white/10 dark:bg-white/5"
      title={`${e.nom} • ${e.present ? "Présent" : "Absent"}`}
    >
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
           style={{ boxShadow: "0 10px 40px rgba(2, 6, 23, .06)" }} />

      {/* avatar + badge */}
      <div className="relative mx-auto mb-3 h-16 w-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/30 via-teal-400/30 to-indigo-400/30 blur-md opacity-0 group-hover:opacity-100 transition" />
        <div className={`relative h-16 w-16 overflow-hidden rounded-full border-2 ${e.present ? "border-emerald-200 dark:border-emerald-800/60" : "border-rose-200 dark:border-rose-800/60"}`}>
          {e.photo ? (
            <img src={e.photo} alt={e.nom} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className={`grid h-full w-full place-items-center ${e.present ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-rose-50 dark:bg-rose-900/20"}`}>
              <span className={`text-sm font-bold ${e.present ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* dot status */}
        <span
          className={`absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white dark:border-slate-900 ${
            e.present ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {e.present ? (
            <CheckCircleIcon className="size-3 text-white animate-[pulse_2s_ease-in-out_infinite]" />
          ) : (
            <CloseIcon className="size-3 text-white" />
          )}
        </span>
      </div>

      {/* nom */}
      <div className="text-center">
        <div className="max-w-[120px] truncate text-sm font-semibold text-slate-900 dark:text-white">{e.nom}</div>
        <div className="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium
          transition-colors
          bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-white/70
          group-hover:bg-slate-200/80 group-hover:text-slate-700">
          {e.present ? "Présent" : "Absent"}
        </div>
      </div>

      {/* infos */}
      <div className="mt-2 space-y-1 text-center text-[12px] text-slate-500 dark:text-white/70">
        {e.present ? (
          <div className="inline-flex items-center justify-center gap-1">
            <CheckCircleIcon className="size-3 text-emerald-500" />
            <span>Arrivé {e.heureArrivee}</span>
          </div>
        ) : (
          <div className="text-rose-500 dark:text-rose-300">{e.raison || "Absence"}</div>
        )}
        {e.classe && (
          <div className={`mx-auto w-fit rounded px-2 py-0.5 font-medium ${classeTone(e.classe)}`}>{e.classe}</div>
        )}
      </div>
    </article>
  );
}
