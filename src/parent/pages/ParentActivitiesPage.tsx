// src/parent/pages/Activities.tsx
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/Modal";
import { CalenderIcon, AngleLeftIcon, EyeIcon } from "../../icons";

/* ======================= Types ======================= */
interface ActiviteEnfant {
  id: number;
  titre: string;
  description: string;
  type: "creatif" | "sportif" | "educatif" | "musical" | "nature" | "social";
  date: string;   // ISO string (YYYY-MM-DD)
  heure: string;  // HH:mm
  duree: number;  // minutes
  classe: string;
  educateur: string;
  materiel: string[];
  objectifs: string[];
  observation?: string;
  evaluation?: EvaluationActivite;
}
interface EvaluationActivite {
  participation: "excellente" | "bonne" | "moyenne" | "faible";
  observations: string;
  competencesAcquises: string[];
  note: number; // 1..5
}

/* ======================= UI Meta ======================= */
const typeMeta: Record<
  ActiviteEnfant["type"],
  { label: string; emoji: string; chip: string; grad: string; ring: string }
> = {
  creatif: {
    label: "Créatif",
    emoji: "🎨",
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    grad: "from-purple-500 to-fuchsia-400",
    ring: "ring-purple-300/60 dark:ring-purple-500/50",
  },
  sportif: {
    label: "Sportif",
    emoji: "⚽",
    chip: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    grad: "from-emerald-500 to-green-400",
    ring: "ring-emerald-300/60 dark:ring-emerald-500/50",
  },
  educatif: {
    label: "Éducatif",
    emoji: "📚",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    grad: "from-blue-500 to-sky-400",
    ring: "ring-sky-300/60 dark:ring-sky-500/50",
  },
  musical: {
    label: "Musical",
    emoji: "🎵",
    chip: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    grad: "from-amber-500 to-yellow-400",
    ring: "ring-amber-300/60 dark:ring-amber-500/50",
  },
  nature: {
    label: "Nature",
    emoji: "🌱",
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    grad: "from-teal-500 to-emerald-400",
    ring: "ring-teal-300/60 dark:ring-teal-500/50",
  },
  social: {
    label: "Social",
    emoji: "👥",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    grad: "from-rose-500 to-pink-400",
    ring: "ring-rose-300/60 dark:ring-rose-500/50",
  },
};

const participationChip: Record<
  NonNullable<EvaluationActivite["participation"]>,
  { label: string; chip: string }
> = {
  excellente: {
    label: "⭐ Excellente",
    chip: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  bonne: {
    label: "👍 Bonne",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  moyenne: {
    label: "⚪ Moyenne",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  faible: {
    label: "⚠️ Faible",
    chip: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
};

/* ======================= Petits composants ======================= */
function TypePill({ type }: { type: ActiviteEnfant["type"] }) {
  const t = typeMeta[type];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${t.chip}`}>
      <span className="text-sm">{t.emoji}</span>
      {t.label}
    </span>
  );
}

function RatingStars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, value));
  const empty = 5 - full;
  return (
    <span className="inline-flex text-yellow-500">
      {"★".repeat(full)}
      <span className="text-gray-300 dark:text-gray-600">{"★".repeat(empty)}</span>
    </span>
  );
}

function RingAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative grid place-items-center" style={{ width: 90, height: 90 }}>
      <div
        className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(theme(colors.blue.500),theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.blue.500))] opacity-90"
        style={{ filter: "saturate(1.1)" }}
      />
      <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
      <img
        src={src}
        alt={alt}
        className="relative z-10 h-20 w-20 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow"
      />
    </div>
  );
}

/* Formatage utils */
const frDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });

/* ======================= Page ======================= */
export default function ParentActivitiesPage() {
  const { childId } = useParams<{ childId?: string }>();

  const [enfant, setEnfant] = useState<{ id: number; name: string; age: string; class: string; avatar: string } | null>(null);
  const [filterType, setFilterType] = useState<"all" | ActiviteEnfant["type"]>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "oldest" | "best">("recent");
  const [selectedActivite, setSelectedActivite] = useState<ActiviteEnfant | null>(null);

  /* ---------- Données locales (démo) ---------- */
  const enfants = [
    { id: 1, name: "Ahmed Ben Salah", age: "8 ans", class: "CE2", avatar: "/images/3-4_ans/enfant_1.jpg" },
    { id: 2, name: "Sara Ben Salah", age: "6 ans", class: "CP", avatar: "/images/3-4_ans/enfant_3.jpg" },
    { id: 3, name: "Mohamed Ben Salah", age: "10 ans", class: "CM2", avatar: "/images/3-4_ans/enfant_6.jpg" },
    { id: 4, name: "Nour Ben Salah", age: "7 ans", class: "CE1", avatar: "/images/3-4_ans/enfant_4.jpg" },
  ];

  const activites: ActiviteEnfant[] = [
    {
      id: 1,
      titre: "Atelier Peinture Libre",
      description: "Expression artistique libre avec différentes techniques de peinture",
      type: "creatif",
      date: "2024-01-15",
      heure: "09:30",
      duree: 90,
      classe: "(3-4) ans",
      educateur: "Mme Fatma",
      materiel: ["Peinture", "Pinceaux", "Toiles", "Tabliers"],
      objectifs: ["Développer la créativité", "Coordination main-œil", "Expression des émotions"],
      observation: "Les enfants étaient très enthousiastes.",
      evaluation: {
        participation: "excellente",
        observations: "Ahmed a créé une œuvre remarquable avec des couleurs vives et harmonieuses. Très concentré.",
        competencesAcquises: ["Mélange des couleurs", "Précision du geste", "Expression créative"],
        note: 5,
      },
    },
    {
      id: 2,
      titre: "Jeux Collectifs au Parc",
      description: "Activités sportives et jeux d'équipe pour développer la coopération",
      type: "sportif",
      date: "2024-01-16",
      heure: "10:00",
      duree: 120,
      classe: "(6-7) ans",
      educateur: "M. Karim",
      materiel: ["Ballons", "Cônes"],
      objectifs: ["Travail d'équipe", "Motricité globale", "Respect des règles"],
      evaluation: {
        participation: "bonne",
        observations: "Bon leadership. A encouragé ses camarades et respecté les règles.",
        competencesAcquises: ["Leadership", "Esprit d'équipe", "Coordination"],
        note: 4,
      },
    },
    {
      id: 3,
      titre: "Découverte des Instruments",
      description: "Initiation aux différents instruments de musique",
      type: "musical",
      date: "2024-01-15",
      heure: "14:00",
      duree: 60,
      classe: "(4-5) ans",
      educateur: "Mme Amina",
      materiel: ["Tambourins", "Maracas", "Xylophone"],
      objectifs: ["Sensibilisation musicale", "Rythme", "Écoute active"],
      evaluation: {
        participation: "moyenne",
        observations: "Intéressé mais timide au début. A participé après observation.",
        competencesAcquises: ["Reconnaissance des sons", "Respect du rythme"],
        note: 3,
      },
    },
    {
      id: 4,
      titre: "Jardinage Éducatif",
      description: "Planter et observer la croissance des plantes",
      type: "nature",
      date: "2024-01-17",
      heure: "11:00",
      duree: 75,
      classe: "Toutes classes",
      educateur: "Mme Fatma",
      materiel: ["Graines", "Pots", "Terre", "Arrosoirs"],
      objectifs: ["Patience", "Responsabilité", "Cycle de vie des plantes"],
      evaluation: {
        participation: "excellente",
        observations: "Très curieux et attentif. Questions pertinentes sur la croissance.",
        competencesAcquises: ["Soin des plantes", "Observation scientifique", "Patience"],
        note: 5,
      },
    },
    {
      id: 5,
      titre: "Expériences Scientifiques Simples",
      description: "Découverte des sciences par l'expérimentation",
      type: "educatif",
      date: "2024-01-14",
      heure: "13:30",
      duree: 80,
      classe: "(8-9) ans",
      educateur: "M. Karim",
      materiel: ["Loupes", "Éprouvettes", "Colorants"],
      objectifs: ["Curiosité scientifique", "Observation", "Hypothèses"],
      evaluation: {
        participation: "bonne",
        observations: "Grand intérêt. A formulé des hypothèses pertinentes.",
        competencesAcquises: ["Méthode scientifique", "Observation", "Curiosité"],
        note: 4,
      },
    },
    {
      id: 6,
      titre: "Atelier Conte et Imagination",
      description: "Création d'histoires et développement du langage",
      type: "social",
      date: "2024-01-18",
      heure: "10:30",
      duree: 45,
      classe: "(3-4) ans",
      educateur: "Mme Amina",
      materiel: ["Livres", "Marionnettes", "Accessoires"],
      objectifs: ["Langage", "Imagination", "Écoute"],
      evaluation: {
        participation: "faible",
        observations: "Un peu timide pour s'exprimer devant le groupe. Écoute attentive.",
        competencesAcquises: ["Écoute active", "Compréhension des histoires"],
        note: 2,
      },
    },
  ];

  /* ---------- Load enfant ---------- */
  useEffect(() => {
    if (childId) {
      const enfantData = enfants.find((e) => e.id.toString() === childId);
      setEnfant(enfantData || enfants[0]);
    } else {
      setEnfant(enfants[0]);
    }
  }, [childId]);

  /* ---------- Filtrage / Recherche / Tri ---------- */
  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = activites.filter((a) => (filterType === "all" ? true : a.type === filterType));
    if (q) {
      list = list.filter((a) => {
        const blob = [
          a.titre,
          a.description,
          a.educateur,
          a.classe,
          ...a.objectifs,
          ...a.materiel,
          a.evaluation?.observations || "",
          ...(a.evaluation?.competencesAcquises || []),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      });
    }
    list = list.sort((A, B) => {
      if (sort === "recent") return new Date(B.date).getTime() - new Date(A.date).getTime();
      if (sort === "oldest") return new Date(A.date).getTime() - new Date(B.date).getTime();
      // best
      const na = A.evaluation?.note ?? 0;
      const nb = B.evaluation?.note ?? 0;
      if (nb !== na) return nb - na;
      return new Date(B.date).getTime() - new Date(A.date).getTime();
    });
    return list;
  }, [activites, filterType, query, sort]);

  /* ---------- Groupé par date pour timeline ---------- */
  const groupedByDay = useMemo(() => {
    const map = new Map<string, ActiviteEnfant[]>();
    filteredSorted.forEach((a) => {
      const k = a.date; // yyyy-mm-dd
      map.set(k, [...(map.get(k) || []), a]);
    });
    // tri des jours (desc par défaut sauf si oldest)
    const days = [...map.entries()].sort(([d1], [d2]) =>
      sort === "oldest" ? new Date(d1).getTime() - new Date(d2).getTime() : new Date(d2).getTime() - new Date(d1).getTime()
    );
    return days;
  }, [filteredSorted, sort]);

  /* ---------- Stats ---------- */
  const stats = useMemo(() => {
    const total = filteredSorted.length;
    const excellentes = filteredSorted.filter((a) => a.evaluation?.participation === "excellente").length;
    const notes4 = filteredSorted.filter((a) => (a.evaluation?.note ?? 0) >= 4).length;
    const totalMinutes = filteredSorted.reduce((acc, a) => acc + a.duree, 0);
    const uniqueTypes = new Set(filteredSorted.map((a) => a.type)).size;
    return { total, excellentes, notes4, totalMinutes, uniqueTypes };
  }, [filteredSorted]);

  if (!enfant) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-pulse text-slate-500 dark:text-slate-400">Chargement…</div>
      </div>
    );
  }

  /* ======================= Render ======================= */
  return (
    <>
      <PageMeta title={`Activités de ${enfant.name}`} description={`Suivez les activités de ${enfant.name} à l'école`} />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <RingAvatar src={enfant.avatar} alt={enfant.name} />
            <div>
              <div className="mb-1">
                <Link to="/parent/enfants" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
                  <AngleLeftIcon className="size-4" />
                  Retour aux enfants
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activités de {enfant.name}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {enfant.age} • {enfant.class}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-5">
            <StatCard label="Activités" value={stats.total} />
            <StatCard label="⭐ Excellentes" value={stats.excellentes} />
            <StatCard label="Notes ≥ 4/5" value={stats.notes4} />
            <StatCard label="Durée (min)" value={stats.totalMinutes} />
            <StatCard label="Types" value={stats.uniqueTypes} />
          </div>
        </div>

        {/* Filtres + recherche */}
        <div className="relative z-10 mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "creatif", "sportif", "educatif", "musical", "nature", "social"] as const).map((t) => {
              const active = filterType === t;
              const asType = t !== "all" ? (t as ActiviteEnfant["type"]) : "creatif";
              const grad = t === "all" ? "from-slate-500 to-slate-400" : typeMeta[asType].grad;
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(t as any)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active ? `bg-gradient-to-r ${grad} text-white shadow` : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80"
                  }`}
                >
                  {t === "all" ? "Tous" : typeMeta[t as ActiviteEnfant["type"]].label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative flex-1 sm:max-w-[340px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (titre, objectifs, éducateur…) "
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10"
              />
            </div>
            <div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/5"
              >
                <option value="recent">Plus récentes</option>
                <option value="oldest">Plus anciennes</option>
                <option value="best">Mieux notées</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE GROUPÉE PAR JOUR */}
      {groupedByDay.length > 0 ? (
        <div className="mt-6">
          <div className="relative">
            {/* Ligne de timeline */}
            <div className="pointer-events-none absolute left-[10px] top-0 h-full w-[2px] rounded bg-slate-200 dark:bg-white/10" />
            <ul className="space-y-6">
              {groupedByDay.map(([day, items]) => (
                <li key={day}>
                  {/* en-tête jour */}
                  <div className="mb-3 ml-4 flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-sky-300/60 dark:bg-slate-900 dark:ring-sky-500/40">
                      <CalenderIcon className="size-4 text-sky-500" />
                    </span>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      {frDate(day)}
                    </div>
                  </div>

                  {/* cartes du jour */}
                  <div className="space-y-4">
                    {items.map((a) => {
                      const t = typeMeta[a.type];
                      const p = a.evaluation?.participation ? participationChip[a.evaluation.participation] : null;
                      return (
                        <article
                          key={a.id}
                          className="group relative ml-14 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          {/* Accent dégradé + point timeline */}
                          <span className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${t.grad}`} />
                          <span className="absolute left-[-14px] top-6 grid size-4 place-items-center rounded-full border-2 border-white bg-sky-400 shadow ring-2 ring-sky-200/60 dark:border-slate-900 dark:ring-sky-500/40" />

                          {/* halo décor */}
                          <span aria-hidden className="pointer-events-none absolute -top-10 right-10 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl" />

                          <div className="flex items-start justify-between gap-3">
                            {/* titre + meta */}
                            <div className="flex min-w-0 items-start gap-3">
                              <div className={`grid h-11 w-11 place-items-center rounded-lg text-xl ring-4 ${t.ring} bg-white/70`}>
                                {t.emoji}
                              </div>
                              <div className="min-w-0">
                                <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white">{a.titre}</h3>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                  <span className="inline-flex items-center gap-1">
                                    <CalenderIcon className="size-3.5" />
                                    {frDate(a.date)} • {a.heure}
                                  </span>
                                  <span className="text-slate-400">•</span>
                                  <span>{a.duree} min</span>
                                  <span className="text-slate-400">•</span>
                                  <TypePill type={a.type} />
                                </div>
                              </div>
                            </div>

                            {/* évaluation */}
                            {a.evaluation && (
                              <div className="shrink-0 text-right">
                                <div className="mb-1">
                                  <RatingStars value={a.evaluation.note} />
                                </div>
                                {p && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.chip}`}>{p.label}</span>}
                              </div>
                            )}
                          </div>

                          <p className="mt-3 text-slate-700 dark:text-slate-300">{a.description}</p>

                          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200/70 bg-white p-3 text-sm shadow-xs dark:border-white/10 dark:bg-white/0">
                              <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Infos</div>
                              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2">
                                  <span className="text-base">👩‍🏫</span> Éducateur : {a.educateur}
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-base">👥</span> Classe : {a.classe}
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-base">🧰</span> Matériel :
                                  <span className="truncate">{" "}{a.materiel.join(", ")}</span>
                                </li>
                              </ul>
                            </div>

                            <div className="rounded-xl border border-slate-200/70 bg-white p-3 text-sm shadow-xs dark:border-white/10 dark:bg-white/0">
                              <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Objectifs</div>
                              <div className="flex flex-wrap gap-1">
                                {a.objectifs.map((o, i) => (
                                  <span key={i} className="rounded-full bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                    {o}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {a.evaluation && (
                            <div className="mt-4 rounded-xl border border-slate-200/70 bg-gradient-to-r from-indigo-50 to-cyan-50 p-3 text-sm shadow-xs dark:border-white/10 dark:from-indigo-900/15 dark:to-cyan-900/15">
                              <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">Observation de l’éducateur</div>
                              <p className="text-slate-700 dark:text-slate-300">{a.evaluation.observations}</p>
                            </div>
                          )}

                          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-white/10">
                            <button
                              onClick={() => setSelectedActivite(a)}
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
                            >
                              <EyeIcon className="size-4" />
                              Voir détails complets
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-slate-900">
          <div className="text-4xl">🎈</div>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Aucune activité trouvée pour {enfant.name}</p>
        </div>
      )}

      {/* MODAL */}
      {selectedActivite && (
        <Modal open={!!selectedActivite} onClose={() => setSelectedActivite(null)} className="mt-16">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className={`grid h-12 w-12 place-items-center rounded-lg text-2xl ring-4 ${typeMeta[selectedActivite.type].ring} bg-white/70`}>
                {typeMeta[selectedActivite.type].emoji}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedActivite.titre}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {frDate(selectedActivite.date)} • {selectedActivite.heure}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedActivite(null)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white/80"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] space-y-6 overflow-y-auto px-6 py-6">
            {/* Description */}
            <div className="rounded-xl bg-sky-50 px-4 py-3 dark:bg-sky-900/20">
              <div className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Description</div>
              <p className="text-slate-700 dark:text-slate-300">{selectedActivite.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Infos */}
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">📅 Informations pratiques</div>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CalenderIcon className="size-4" /> Date : {frDate(selectedActivite.date)}</li>
                  <li className="flex items-center gap-2"><span className="text-base">🕐</span> Heure : {selectedActivite.heure} (Durée : {selectedActivite.duree} min)</li>
                  <li className="flex items-center gap-2"><span className="text-base">👩‍🏫</span> Éducateur : {selectedActivite.educateur}</li>
                  <li className="flex items-center gap-2"><span className="text-base">👥</span> Classe : {selectedActivite.classe}</li>
                </ul>
              </div>

              {/* Objectifs */}
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">🎯 Objectifs pédagogiques</div>
                <ul className="space-y-1">
                  {selectedActivite.objectifs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Matériel */}
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">🔧 Matériel</div>
              <div className="flex flex-wrap gap-2">
                {selectedActivite.materiel.map((m, i) => (
                  <span key={i} className="rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-white/10 dark:text-white/80">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Évaluation */}
            {selectedActivite.evaluation ? (
              <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 p-4 dark:from-emerald-900/20 dark:to-green-900/20">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    📊 Évaluation de {enfant.name.split(" ")[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <RatingStars value={selectedActivite.evaluation.note} />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedActivite.evaluation.note}/5</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-300">Participation</div>
                    <span className={`inline-flex rounded-lg px-3 py-2 text-sm font-medium ${participationChip[selectedActivite.evaluation.participation].chip}`}>
                      {participationChip[selectedActivite.evaluation.participation].label}
                    </span>
                  </div>

                  <div>
                    <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-300">Compétences acquises</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedActivite.evaluation.competencesAcquises.map((c, i) => (
                        <span key={i} className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-300">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                  <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">Observations de l’éducateur</div>
                  <p className="text-slate-700 dark:text-slate-300">{selectedActivite.evaluation.observations}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-100 px-4 py-3 text-slate-700 dark:bg-white/10 dark:text-white/80">
                Aucune évaluation disponible pour cette activité.
              </div>
            )}

            {/* Observation générale */}
            {selectedActivite.observation && (
              <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-900/20">
                <div className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">📝 Observation</div>
                <p className="text-slate-700 dark:text-slate-300">{selectedActivite.observation}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4 dark:border-white/10">
            <button
              onClick={() => setSelectedActivite(null)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
            >
              Fermer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ======================= Sous-composant Stat ======================= */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
      <div className="text-lg font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}
