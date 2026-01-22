// src/parent/pages/SuiviPedagogique.tsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router";
import {
  LayoutGrid, List, ChevronLeft, CalendarDays, Sparkles,
  TrendingUp, TrendingDown, Search, Info, Users, Activity as ActIcon,
  Brain, MessageSquare
} from "lucide-react";

/* ================================== Types ================================== */
type SubjectKey = "language" | "motor" | "cognitive" | "social";
type Period = "all" | "mensuelle" | "hebdomadaire" | "trimestrielle" | "spécifique";
type ViewMode = "grid" | "list";

type Child = {
  id: number;
  name: string;
  age: string;
  class: string;
  educator: string;
  avatar: string;
  performance: number;
  color: string;   // tailwind grad from-.. to-..
  evolution: Record<SubjectKey, number>;
  notes: string;
  present: boolean;
};

const labelMap: Record<SubjectKey, string> = {
  language: "Langage",
  motor: "Motricité",
  cognitive: "Cognition",
  social: "Social",
};

const subjectStyle: Record<SubjectKey, {
  grad: string; chip: string; icon: React.ReactNode;
}> = {
  language:  { grad: "from-blue-500 to-sky-400", chip: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: <MessageSquare className="h-4 w-4" /> },
  motor:     { grad: "from-emerald-500 to-teal-400", chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: <ActIcon className="h-4 w-4" /> },
  cognitive: { grad: "from-amber-500 to-orange-400", chip: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: <Brain className="h-4 w-4" /> },
  social:    { grad: "from-rose-500 to-pink-400", chip: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300", icon: <Users className="h-4 w-4" /> },
};

/* ================================ Mini UI ================================== */
function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
      <div className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-[width] duration-500" style={{ width: `${v}%` }}>
        <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white ring-2 ring-cyan-500 dark:bg-slate-900" />
      </div>
    </div>
  );
}

function RadialGauge({ value, size = 56 }: { value: number; size?: number }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div
      className="relative rounded-full bg-[conic-gradient(theme(colors.blue.500)_var(--p),theme(colors.slate.200)_0)] dark:bg-[conic-gradient(theme(colors.cyan.400)_var(--p),theme(colors.slate.700)_0)]"
      style={{ ["--p" as any]: `${v}%`, width: size, height: size }}
      aria-label={`Performance ${v}%`}
    >
      <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
      <span className="absolute inset-0 grid place-items-center text-xs font-bold text-slate-800 dark:text-white">{v}%</span>
    </div>
  );
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "emerald"|"amber"|"slate"|"indigo" }) {
  const map = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
    amber:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    indigo:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200",
    slate:   "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80",
  } as const;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[tone]}`}>{children}</span>;
}

function PillBar({ k, value, prev }: { k: SubjectKey; value: number; prev?: number }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  const p = prev == null ? undefined : Math.max(0, Math.min(100, prev));
  const s = subjectStyle[k];
  const trend = p == null ? 0 : Math.round(v - p);
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  const trendCls = trend > 0 ? "text-emerald-600 dark:text-emerald-300" : trend < 0 ? "text-rose-600 dark:text-rose-300" : "text-slate-400";

  const label =
    v >= 90 ? "Excellent" :
    v >= 75 ? "Bon" :
    v >= 60 ? "Moyen" : "À améliorer";

  const labelCls =
    v >= 90 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
    v >= 75 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
    v >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`grid h-6 w-6 place-items-center rounded-full ${s.chip}`}>{s.icon}</span>
          <span className="font-medium text-slate-900 dark:text-white">{labelMap[k]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${labelCls}`}>{label}</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{v}%</span>
        </div>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        {p != null && <div className="absolute inset-y-0 left-0 rounded-full bg-slate-300/60 dark:bg-white/15" style={{ width: `${p}%` }} />}
        <div className={`relative h-full rounded-full bg-gradient-to-r ${s.grad}`} style={{ width: `${v}%` }}>
          <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white ring-2 ring-slate-300 dark:bg-slate-900 dark:ring-slate-600" />
        </div>
      </div>

      {p != null && (
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Précédent : {p}%</span>
          <span className={`inline-flex items-center gap-1 font-medium ${trendCls}`}>
            <TrendIcon className="h-3.5 w-3.5" /> {trend === 0 ? "stable" : `${trend > 0 ? "+" : ""}${trend}%`}
          </span>
        </div>
      )}
    </div>
  );
}

/* ================================ Données démo =============================== */
const childrenSeed: Child[] = [
  {
    id: 1,
    name: "Ahmed Ben Salah",
    age: "8 ans",
    class: "CE2",
    educator: "Mme Fatma",
    avatar: "/images/3-4_ans/enfant_1.jpg",
    performance: 82,
    color: "from-blue-500 to-cyan-500",
    present: true,
    evolution: { language: 85, motor: 78, cognitive: 90, social: 82 },
    notes: "Très bon en calcul, besoin de travailler l'écriture."
  },
  {
    id: 2,
    name: "Sara Ben Salah",
    age: "6 ans",
    class: "CP",
    educator: "Mme Amina",
    avatar: "/images/3-4_ans/enfant_3.jpg",
    performance: 91,
    color: "from-purple-500 to-pink-500",
    present: true,
    evolution: { language: 95, motor: 88, cognitive: 85, social: 96 },
    notes: "S'adapte bien au groupe, très créative."
  },
  {
    id: 3,
    name: "Mohamed Ben Salah",
    age: "10 ans",
    class: "CM2",
    educator: "M. Karim",
    avatar: "/images/3-4_ans/enfant_6.jpg",
    performance: 75,
    color: "from-green-500 to-emerald-500",
    present: false,
    evolution: { language: 90, motor: 78, cognitive: 65, social: 92 },
    notes: "Bon en sciences, à structurer ses devoirs."
  },
  {
    id: 4,
    name: "Nour Ben Salah",
    age: "7 ans",
    class: "CE1",
    educator: "Mme Amina",
    avatar: "/images/3-4_ans/enfant_4.jpg",
    performance: 88,
    color: "from-amber-500 to-orange-500",
    present: true,
    evolution: { language: 80, motor: 73, cognitive: 90, social: 93 },
    notes: "Excellente lectrice, un peu timide en groupe."
  },
];

/* ============================== Page principale ============================= */
export default function SuiviPedagogique() {
  const [view, setView] = useState<ViewMode>(() => (localStorage.getItem("kidora.suiviView") as ViewMode) || "grid");
  useEffect(() => localStorage.setItem("kidora.suiviView", view), [view]);

  const [period, setPeriod] = useState<Period>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"best" | "worst" | "alpha">("best");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = childrenSeed.filter(c =>
      q ? c.name.toLowerCase().includes(q) || c.class.toLowerCase().includes(q) : true
    );

    // sort
    out.sort((A, B) => {
      if (sort === "alpha") return A.name.localeCompare(B.name);
      const pa = avg(A.evolution), pb = avg(B.evolution);
      return sort === "best" ? pb - pa : pa - pb;
    });

    return out;
  }, [query, sort]);

  // Pseudo "périodes" -> on masque/affiche certains sujets (mêmes règles que ton composant)
  const filterToSubjects: Record<Period, SubjectKey[]> = {
    all: ["language", "motor", "cognitive", "social"],
    mensuelle: ["language", "social"],
    hebdomadaire: ["motor", "language"],
    trimestrielle: ["cognitive", "motor"],
    spécifique: ["social"],
  };
  const showSubject = (k: SubjectKey) => filterToSubjects[period].includes(k);

  return (
    <div className="space-y-6">
      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/parent" className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80">
              <ChevronLeft className="h-4 w-4" /> Retour
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Suivi pédagogique — Détails complets</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">Vue globale de tous les enfants • en temps réel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-white/10">
            <button onClick={() => setView("grid")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${view === "grid" ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900" : "text-slate-600 dark:text-white/80"}`}>
              <LayoutGrid className="h-4 w-4" /> Grille
            </button>
            <button onClick={() => setView("list")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${view === "list" ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900" : "text-slate-600 dark:text-white/80"}`}>
              <List className="h-4 w-4" /> Liste
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="relative z-10 mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-white/10">
            {(["all","mensuelle","hebdomadaire","trimestrielle","spécifique"] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${period===p ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900" : "text-slate-600 dark:text-white/80"}`}>
                {p==="all"?"Toutes":p[0].toUpperCase()+p.slice(1)+"s"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Filtrer par nom, classe…"
                className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:border-white/10 dark:bg-white/10 dark:text-white/90"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            <select
              value={sort}
              onChange={(e)=>setSort(e.target.value as any)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200 dark:border-white/10 dark:bg-black dark:text-white"
            >
              <option value="best">Meilleures moyennes</option>
              <option value="worst">Moyennes les plus faibles</option>
              <option value="alpha">Ordre alphabétique</option>
            </select>
          </div>
        </div>
      </section>

      {/* ======================= Contenu liste/grille ======================= */}
      {view === "list" ? (
        <div className="space-y-4">
          {list.map(child => (
            <article key={child.id} className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-5 rounded-2xl border bg-white p-5 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
              {/* avatar */}
              <div className="relative">
                <img src={child.avatar} className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800" alt={child.name} />
                <span title={child.present ? "Présent":"Absent"} className={`absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full ring-2 ring-white dark:ring-slate-800 ${child.present ? "bg-emerald-500":"bg-amber-500"}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              {/* centre */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-bold text-slate-900 dark:text-white">{child.name}</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-300">{child.age} • {child.class}</span>
                  <Badge tone={child.present ? "emerald" : "amber"}>{child.present ? "Présent" : "Absent"}</Badge>
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Éducateur·rice : <span className="font-medium">{child.educator}</span></p>

                <div className="mt-3 grid gap-2">
                  {(Object.keys(labelMap) as SubjectKey[]).filter(showSubject).map(k => (
                    <Row key={k} label={labelMap[k]} value={child.evolution[k]} k={k} />
                  ))}
                </div>

                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Synthèse :</span> {child.notes}</p>
              </div>

              {/* droite */}
              <div className="hidden md:flex flex-col items-end">
                <RadialGauge value={child.performance} size={52} />
                <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Performance</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {list.map(child => (
            <article key={child.id} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
              <span aria-hidden className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-2xl" />
              <span aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-2xl" />
              {/* header */}
              <div className="mb-4 flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className={`absolute inset-0 -z-10 rounded-full opacity-40 blur-md bg-gradient-to-r ${child.color}`} />
                    <img src={child.avatar} alt={child.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{child.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{child.age} • {child.class}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Éducateur·rice : <span className="font-medium">{child.educator}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow ${child.present ? "bg-emerald-500/90 text-white":"bg-amber-500/90 text-black"}`}>
                    {child.present ? "Présent" : "Absent"}
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <RadialGauge value={child.performance} size={48} />
                  </div>
                </div>
              </div>

              {/* contenu */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(Object.keys(labelMap) as SubjectKey[]).filter(showSubject).map(k => {
                  const prev = Math.max(0, Math.min(100, child.evolution[k] + (k==="motor"?1:k==="social"?2:-2)));
                  return <PillBar key={k} k={k} value={child.evolution[k]} prev={prev} />;
                })}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200/70 bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 text-sm shadow-sm dark:border-white/10 dark:from-indigo-900/20 dark:to-cyan-900/20">
                <div className="mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <Info className="h-4 w-4 opacity-70" />
                  <span className="font-semibold">Recommandation</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Continuer la <b>stimulation du langage</b> (lecture à voix haute) et renforcer la <b>motricité</b> par 10 min/jour d’exercices de coordination.
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ====================== Encadré “dernières évaluations” ====================== */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dernières évaluations</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-white/80">
            <CalendarDays className="h-3.5 w-3.5" /> 30 derniers jours
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {list.slice(0,4).map((c,i)=>(
            <div key={i} className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <div className="mb-2 flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">Évaluation – {c.name.split(" ")[0]}</p>
                    <Badge tone="indigo">IA</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Synthèse rapide générée</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip kind="good">Points forts : {top2(c.evolution).join(", ")}</Chip>
                <Chip kind="warn">À renforcer : {low1(c.evolution)}</Chip>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =============================== Petits blocs =============================== */
function Row({ label, value, k }: { label: string; value: number; k: SubjectKey }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  const c = subjectStyle[k].grad;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-white/80 p-2.5 dark:border-white/10 dark:bg-white/[0.04]">
      <span className="w-28 shrink-0 text-[13px] font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <div className="relative grow h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${c}`} style={{ width: `${v}%` }} />
        <span className="absolute top-1/2 -translate-y-1/2 -right-1 h-3 w-3 rounded-full bg-white ring-2 ring-slate-300 dark:bg-slate-900 dark:ring-slate-600" style={{ right: `calc(${100 - v}% - 2px)` }} />
      </div>
      <span className="w-10 shrink-0 text-right text-[13px] font-semibold text-slate-900 dark:text-white">{v}%</span>
    </div>
  );
}

function Chip({ children, kind = "good" }: { children: React.ReactNode; kind?: "good" | "warn" }) {
  return (
    <span className={[
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1",
      kind === "good"
        ? "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-0"
        : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-0",
    ].join(" ")}>
      <Sparkles className="h-3.5 w-3.5 opacity-75" />
      {children}
    </span>
  );
}

/* =============================== Helpers =================================== */
function avg(obj: Record<SubjectKey, number>) {
  const v = Object.values(obj);
  return Math.round(v.reduce((a,b)=>a+b,0)/v.length);
}
function top2(evo: Record<SubjectKey, number>) {
  return Object.entries(evo)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,2)
    .map(([k])=>labelMap[k as SubjectKey]);
}
function low1(evo: Record<SubjectKey, number>) {
  return labelMap[
    Object.entries(evo).sort((a,b)=>a[1]-b[1])[0][0] as SubjectKey
  ];
}
