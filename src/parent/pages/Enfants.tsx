import React, { useEffect, useState } from "react";
import type { ReactNode } from "react"
import { Link } from "react-router";
import { LayoutGrid, List, ChevronRight,  Sparkles } from "lucide-react";
import {
  CalendarDays, MessageSquareText, CheckCircle2, Clock3
} from "lucide-react";

import {
  Brain, MessageSquare, Users, Activity, Info, TrendingUp, TrendingDown
} from "lucide-react";


interface Rapport {
  id: number;
  enfant: string;
  type: string;
  titre: string;
  date: string;
  statut: 'nouveau' | 'lu' | 'archive';

}
type ViewMode = "grid" | "list";

const labelMap: Record<string, string> = {
  language: "Langage",
  motor: "Motricité",
  cognitive: "Cognition",
  social: "Social",
};
// styles selon le résultat
const resultStyle: Record<string, {chip: string; dot: string;}>
= {
  Excellent:   { chip: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                 dot:  "bg-gradient-to-r from-green-500 to-emerald-400" },
  "Très bon":  { chip: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
                 dot:  "bg-gradient-to-r from-teal-500 to-cyan-400" },
  Bon:         { chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                 dot:  "bg-gradient-to-r from-blue-500 to-sky-400" },
  "À améliorer": { chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                   dot:  "bg-gradient-to-r from-amber-500 to-orange-400" },
  default:     { chip: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80",
                 dot:  "bg-gradient-to-r from-slate-400 to-slate-300" },
};

function ResultBadge({value}:{value:string}) {
  const st = resultStyle[value] ?? resultStyle.default;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${st.chip}`}>{value}</span>;
}

function SkillPill({children}:{children:string}) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-white/10 dark:text-white/80 dark:ring-white/15">
      {children}
    </span>
  );
}

/* ---------------- Mini-UI réutilisable ---------------- */
function Chip({
  tone = "slate",
  children,
  className = "",
}: {
  tone?: "emerald" | "amber" | "indigo" | "slate";
  children: ReactNode;
  className?: string;
}) {
  const map = {
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    indigo:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200",
    slate: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
      <div
        className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-[width] duration-500"
        style={{ width: `${v}%` }}
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white ring-2 ring-cyan-500 dark:bg-slate-900" />
      </div>
    </div>
  );
}

function RadialGauge({ value, size = 56 }: { value: number; size?: number }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div
      className="relative rounded-full
                 bg-[conic-gradient(theme(colors.blue.500)_var(--p),theme(colors.slate.200)_0)]
                 dark:bg-[conic-gradient(theme(colors.cyan.400)_var(--p),theme(colors.slate.700)_0)]"
      style={{ ["--p" as any]: `${v}%`, width: size, height: size }}
      aria-label={`Performance ${v}%`}
    >
      <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
      <span className="absolute inset-0 grid place-items-center text-xs font-bold text-slate-800 dark:text-white">
        {v}%
      </span>
    </div>
  );
}

function SkillTag({
  children,
  kind = "good",
}: {
  children: ReactNode;
  kind?: "good" | "warn";
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1",
        kind === "good"
          ? "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-0"
          : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-0",
      ].join(" ")}
    >
      <Sparkles className="h-3.5 w-3.5 opacity-75" />
      {children}
    </span>
  );
}

function SubjectCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3 text-xs shadow-sm hover:shadow-md transition dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {value}%
        </span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}

function GradientFrame({ children }: { children: ReactNode }) {
  return (
    <div className="group relative rounded-[24px] p-[1px] shadow-xl bg-[linear-gradient(135deg,rgba(255,255,255,.65),rgba(255,255,255,.15))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.07))]">
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,.25), rgba(192,132,252,.25) 50%, rgba(34,211,238,.25))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {children}
    </div>
  );
}

// juste au-dessus de ton composant Enfants

// ordre des matières dans la liste
const orderedKeys: Array<keyof typeof labelMap> = [
  "language",
  "motor",
  "cognitive",
  "social",
];

// couleur par matière (comme sur ton exemple)
const subjectColor: Record<string, string> = {
  language: "from-blue-500 to-blue-400",     // bleu
  motor:    "from-emerald-500 to-emerald-400",// vert
  cognitive:"from-orange-500 to-amber-400",   // orange
  social:   "from-rose-500 to-rose-400",      // rouge/rose
};

// Rangée façon “liste compacte”
function ListRowSubject({
  label,
  value,
  colorKey,
}: {
  label: string;
  value: number;
  colorKey: string; // language | motor | cognitive | social
}) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  const barColor = subjectColor[colorKey] ?? "from-blue-500 to-cyan-500";

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-white/80 p-2.5
                    dark:border-white/10 dark:bg-white/[0.04]">
      {/* libellé à gauche */}
      <span className="shrink-0 w-28 text-[13px] font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>

      {/* barre au milieu */}
      <div className="relative grow h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-[width] duration-500`}
          style={{ width: `${v}%` }}
        />
        {/* petit curseur à la fin comme un “dot” */}
        <span
          className="absolute -translate-y-1/2 top-1/2 -right-1 h-3 w-3 rounded-full bg-white ring-2 ring-slate-300
                     dark:bg-slate-900 dark:ring-slate-600"
          style={{ right: `calc(${100 - v}% - 2px)` }}
        />
      </div>

      {/* % à droite */}
      <span className="shrink-0 w-10 text-right text-[13px] font-semibold text-slate-900 dark:text-white">
        {v}%
      </span>
    </div>
  );
}
// styles par domaine
const domainStyle: Record<string, { grad: string; chip: string; icon: JSX.Element }> = {
  language:  { grad: "from-blue-500 to-sky-400",   chip: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",   icon: <MessageSquare className="h-4 w-4" /> },
  motor:     { grad: "from-emerald-500 to-teal-400", chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300", icon: <Activity className="h-4 w-4" /> },
  cognitive: { grad: "from-amber-500 to-orange-400", chip: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300", icon: <Brain className="h-4 w-4" /> },
  social:    { grad: "from-rose-500 to-pink-400",   chip: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",   icon: <Users className="h-4 w-4" /> },
};

// libellé/badge selon score
function labelFor(v: number) {
  if (v >= 90) return { text: "Excellent",   cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" };
  if (v >= 75) return { text: "Bon",         cls: "bg-blue-100  text-blue-700  dark:bg-blue-900/30  dark:text-blue-300" };
  if (v >= 60) return { text: "Moyen",       cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" };
  return             { text: "À améliorer",  cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
}

// barre “pill” avec comparaison période précédente (barre fantôme)
function PillBar({
  label, value, previous, k,
}: { label: string; value: number; previous?: number; k: string }) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  const p = previous == null ? undefined : Math.max(0, Math.min(100, previous));
  const s = domainStyle[k] ?? domainStyle.language;
  const badge = labelFor(v);

  const trend = p == null ? 0 : Math.round(v - p);
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  const trendCls =
    trend > 0 ? "text-emerald-600 dark:text-emerald-300"
    : trend < 0 ? "text-rose-600 dark:text-rose-300"
    : "text-slate-400";

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`grid h-6 w-6 place-items-center rounded-full ${s.chip}`}>{s.icon}</span>
          <span className="font-medium text-slate-900 dark:text-white">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.cls}`}>{badge.text}</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{v}%</span>
        </div>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        {p != null && (
          <div className="absolute inset-y-0 left-0 rounded-full bg-slate-300/60 dark:bg-white/15" style={{ width: `${p}%` }} />
        )}
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

// Anneau de performance autour d'un avatar (conic-gradient + mask)
function RingAvatar({
  src, alt, percent,
}: { src: string; alt: string; percent: number }) {
  const p = Math.max(0, Math.min(100, percent ?? 0));
  return (
    <div
      className="relative grid place-items-center rounded-full"
      style={{ width: 84, height: 84 }}
    >
      {/* anneau */}
      <div
        className="absolute inset-0 rounded-full
                   bg-[conic-gradient(theme(colors.blue.500)_var(--p),theme(colors.slate.200)_0)]
                   dark:bg-[conic-gradient(theme(colors.cyan.400)_var(--p),theme(colors.slate.700)_0)]"
        style={{ ["--p" as any]: `${p}%` }}
      />
      {/* trou au centre (masque) */}
      <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
      {/* avatar */}
      <img
        src={src}
        alt={alt}
        className="relative z-10 h-18 w-18 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800"
        style={{ width: 72, height: 72 }}
      />
      {/* valeur */}
      <span className="absolute -bottom-4 text-[11px] font-bold text-slate-700 dark:text-slate-300">
        {p}%
      </span>
    </div>
  );
}

function ChipMini({ children, tone = "slate" }:{
  children: React.ReactNode;
  tone?: "emerald"|"amber"|"slate"|"indigo";
}) {
  const map = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
    amber:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    indigo:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200",
    slate:   "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}



const Enfants = () => {
  
const [trackingFilterType, setTrackingFilterType] = useState<"all" | "mensuelle" | "hebdomadaire" | "trimestrielle" | "spécifique">("all");
const [evaluationFilterType, setEvaluationFilterType] = useState<"all" | "mensuelle" | "hebdomadaire" | "trimestrielle" | "spécifique">("all");


  const [rapports] = useState<Rapport[]>([
    {
      id: 1,
      enfant: "Ahmed Ben Salah",
      type: "hebdomadaire",
      titre: "Progrès en Mathématiques",
      date: "12/01/2024",
      statut: 'nouveau'
    },
    {
      id: 2,
      enfant: "Sara Ben Salah",
      type: "mensuel",
      titre: "Bilan Mensuel",
      date: "10/01/2024",
      statut: 'lu'
    },
    {
      id: 3,
      enfant: "Mohamed Ben Salah",
      type: "trimestriel",
      titre: "Évaluation Trimestrielle",
      date: "05/01/2024",
      statut: 'lu'
    },
    {
      id: 4,
      enfant: "Nour Ben Salah",
      type: "spécial",
      titre: "Rapport Motricité",
      date: "03/01/2024",
      statut: 'nouveau'
    },
    {
      id: 5,
      enfant: "Ahmed Ben Salah",
      type: "hebdomadaire",
      titre: "Suivi Langue Française",
      date: "05/01/2024",
      statut: 'archive'
    }
  ]);

  const [evaluations] = useState([
    {
      id: 1,
      title: "Évaluation Hebdomadaire - Langage",
      child: "Ahmed",
      date: "12/01/2024",
      result: "Excellent",
      skills: ["Vocabulaire", "Prononciation", "Compréhension"],
      comment: "Progrès remarquables en expression orale. Vocabulaire enrichi.",
      educator: "Mme Fatma"
    },
    {
      id: 2,
      title: "Évaluation Mensuelle - Social",
      child: "Sara",
      date: "10/01/2024",
      result: "Bon",
      skills: ["Interaction", "Partage", "Coopération"],
      comment: "Bonne évolution dans les jeux de groupe. Continue à s'ouvrir aux autres.",
      educator: "Mme Amina"
    },
    {
      id: 3,
      title: "Évaluation Trimestrielle - Globale",
      child: "Mohamed",
      date: "05/01/2024",
      result: "Très bon",
      skills: ["Langage", "Cognition", "Motricité", "Social"],
      comment: "Développement harmonieux dans tous les domaines. Continue les bons efforts.",
      educator: "Mme Fatma"
    },
    {
      id: 4,
      title: "Évaluation Spécifique - Motricité",
      child: "Nour",
      date: "03/01/2024",
      result: "À améliorer",
      skills: ["Motricité fine", "Coordination"],
      comment: "Besoin de renforcer la coordination œil-main. Exercices spécifiques recommandés.",
      educator: "Mme Amina"
    }
  ]);

  const [evaluationHistory] = useState([
    { date: "12/01/2024", type: "Langage", result: "Excellent", trend: "up", change: "+5%" },
    { date: "05/01/2024", type: "Global", result: "Très bon", trend: "up", change: "+3%" },
    { date: "28/12/2023", type: "Social", result: "Bon", trend: "stable", change: "0%" },
    { date: "21/12/2023", type: "Cognition", result: "Excellent", trend: "up", change: "+7%" },
    { date: "14/12/2023", type: "Motricité", result: "À améliorer", trend: "down", change: "-2%" },
  ]);

  const [children] = useState([
    {
      id: 1,
      name: "Ahmed Ben Salah",
      age: "8 ans",
      class: "CE2",
      educator: "Mme Fatma",
      avatar: "/images/3-4_ans/enfant_1.jpg",
      educational: {
        level: "Niveau CE2 - Bon élève",
        strengths: ["Mathématiques", "Logique", "Calcul mental"],
        areasToImprove: ["Écriture", "Orthographe"],
        notes: "Très bon en calcul, besoin de travailler l'écriture",
        schoolType: "école"
     },
      health: {
        allergies: ["Aucune"],
        medicalNotes: "Porte des lunettes",
        vaccination: "À jour"
      },
      presence: {
        today: true,
        week: 4,
        month: 18
      },
      performance: 82,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      evolution: { 
      language: 85,
      motor: 78,
      cognitive: 90,
      social: 82
    }
    },
    {
      id: 2,
      name: "Sara Ben Salah",
      age: "6 ans",
      class: "CP",
      educator: "Mme Amina",
      avatar: "/images/3-4_ans/enfant_3.jpg",
      educational: {
        level: "Pré-scolaire - Développement normal",
        strengths: ["Socialisation", "Créativité", "Langage"],
        areasToImprove: ["Motricité fine", "Concentration"],
        notes: "S'adapte bien au groupe, créative dans les jeux",
        schoolType: "crèche"
      },
      health: {
        allergies: ["Lactose"],
        medicalNotes: "Asthme léger",
        vaccination: "À jour"
      },
      presence: {
        today: true,
        week: 5,
        month: 22
      },
      performance: 91,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      evolution: { 
      language: 95,
      motor: 88,
      cognitive: 85,
      social: 96
    }
    },
    {
      id: 3,
      name: "Mohamed Ben Salah",
      age: "10 ans",
      class: "CM2",
      educator: "M. Karim",
      avatar: "/images/3-4_ans/enfant_6.jpg",
      educational: {
        level: "Niveau CM2 - Moyen",
        strengths: ["Sciences", "Sport", "Mémoire"],
        areasToImprove: ["Rédaction", "Organisation"],
        notes: "Bon en sciences, besoin de structurer ses devoirs",
        schoolType: "école"
      },
      health: {
        allergies: ["Arachides"],
        medicalNotes: "Aucune",
        vaccination: "À jour"
      },
      presence: {
        today: false,
        week: 3,
        month: 16
      },
      performance: 75,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      evolution: { 
        language: 90,
        motor: 78,
        cognitive: 65,
        social: 92
    }
    },
    {
      id: 4,
      name: "Nour Ben Salah",
      age: "7 ans",
      class: "CE1",
      educator: "Mme Amina",
      avatar: "/images/3-4_ans/enfant_4.jpg",
      educational: {
        level: "Niveau CE1 - Bon en français",
        strengths: ["Lecture", "Expression", "Arts"],
        areasToImprove: ["Mathématiques", "Confiance"],
        notes: "Excellente lectrice, timide en groupe",
        schoolType: "école"
      },
      health: {
        allergies: ["Pollen"],
        medicalNotes: "Aucune",
        vaccination: "À jour"
      },
      presence: {
        today: true,
        week: 4,
        month: 19
      },
      performance: 88,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      evolution: { 
        language: 80,
        motor: 73,
        cognitive: 90,
        social: 93
    }
    },
   
  
  ]);

  const [selectedChildForTracking, setSelectedChildForTracking] = useState(children[0]?.name || "");
  const [aiInsights] = useState([
    {
      title: "Analyse IA : Développement",
      content: "Ahmed montre des progrès significatifs en mathématiques. Recommandation : activités de logique supplémentaires.",
      color: "text-blue-600 dark:text-blue-400",
      icon: "📈"
    },
    {
      title: "Alertes précoces",
      content: "Sara : excellente progression sociale. Mohamed : attention à la motricité fine.",
      color: "text-amber-600 dark:text-amber-400",
      icon: "🔔"
    },
    {
      title: "Comparaison normes",
      content: "Tous les enfants dans la moyenne nationale. Points forts : langage et créativité.",
      color: "text-green-600 dark:text-green-400",
      icon: "📊"
    }
  ]);
const filteredEvaluations = evaluations.filter((e) => {
  if (evaluationFilterType === "all") return true;
  return e.title.toLowerCase().includes(evaluationFilterType);
});


  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "grid"; // garde-fou SSR
    return (localStorage.getItem("kidora.childrenView") as ViewMode) || "grid";
  });

  useEffect(() => {
    // protège au cas SSR
    if (typeof window !== "undefined") {
      localStorage.setItem("kidora.childrenView", view);
    }
  }, [view]);

  const getNouveauxRapportsPourEnfant = (enfantNom: string) => {
    return rapports.filter(r => r.enfant === enfantNom && r.statut === 'nouveau').length;
  };
  const filterToSubjects: Record<string, string[]> = {
  all: ["language", "motor", "cognitive", "social"],
  mensuelle: ["language", "social"],       // exemple
  hebdomadaire: ["motor", "language"],     // exemple
  trimestrielle: ["cognitive", "motor"],   // exemple
  spécifique: ["social"],                  // exemple
};

const matchFilter = (key: string) => {
  return filterToSubjects[trackingFilterType]?.includes(key);
};


  return (
    // <div className="space-y-6 animate-fade-in">
     <div className="w-full mx-auto space-y-6 animate-fade-in">

          {/* Galerie des enfants */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Vos enfants</h2>
    <span className="text-xs text-slate-500 dark:text-slate-400">Cliquez pour suivre • Survolez pour actions</span>
  </div>

  <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
    {children.map((child) => {
      const isPresent = !!child.presence?.today;
      const nvx = rapports.filter(r => r.enfant === child.name && r.statut === "nouveau").length;

      return (
        <button
          key={child.id}
          onClick={() => setSelectedChildForTracking(child.name)}
         className="group relative flex flex-col items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-3 text-center
                    shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-2 hover:ring-sky-300/50 focus:outline-none focus:ring-2 focus:ring-sky-300
                     dark:border-white/10 dark:bg-white/[0.04]"
        >
          {/* halo doux */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-6 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-2xl"
          />

          {/* avatar + anneau + statut */}
          <div className="relative">
            <RingAvatar src={child.avatar} alt={child.name} percent={child.performance} />
            <span
              className={`absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full ring-2 ring-white dark:ring-slate-800
                          ${isPresent ? "bg-emerald-500" : "bg-amber-500"}`}
              title={isPresent ? "Présent" : "Absent"}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* nom + méta */}
          <div className="min-w-0">
            <h4 className="truncate font-semibold text-slate-900 dark:text-white">
              {child.name.split(" ")[0]}
            </h4>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{child.age} • {child.class}</p>
          </div>

          {/* chips statut */}
          <div className="flex items-center gap-1">
            <ChipMini tone={isPresent ? "emerald" : "amber"}>{isPresent ? "Présent" : "Absent"}</ChipMini>
            {nvx > 0 && <ChipMini tone="indigo">{nvx} nvx</ChipMini>}
          </div>

          {/* actions au survol */}
         <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-r from-indigo-50 to-cyan-50
                px-3 py-2 opacity-0 translate-y-2 transition-all duration-300
                group-hover:opacity-100 group-hover:translate-y-0 dark:from-indigo-900/90 dark:to-cyan-900/90">
                  <div className="flex items-center justify-center gap-2">
            <Link
              to={`/parent/enfant/${child.id}/activities`}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200
                         dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
              onClick={(e)=>e.stopPropagation()}
            >
              Activités
            </Link>
            <Link
              to={`/parent/enfant/${child.id}/reports`}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200
                         dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
              onClick={(e)=>e.stopPropagation()}
            >
              Rapports
            </Link>
            <Link
              to={`/parent/enfant/${child.id}/evaluations`}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-2.5 py-1 text-[11px] font-semibold text-white
                         hover:brightness-110"
              onClick={(e)=>e.stopPropagation()}
            >
              Évaluations
            </Link>
            </div>
          </div>

          {/* bordure sélectée si c'est l'enfant du suivi */}
          {selectedChildForTracking === child.name && (
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,.25), rgba(192,132,252,.25) 50%, rgba(34,211,238,.25))",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
              }}
            />
          )}
          
        </button>
      );
    })}
  </div>
</div>

      {/* Cartes enfants principales */}
      {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3"> */}
 <section className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 overflow-hidden">
      {/* décor doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <span className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      {/* Header + toggle */}
      <div className="relative z-10 mx-auto mb-4 flex max-w-7xl items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white"></h2>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-white/10">
          <button
            onClick={() => setView("grid")}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              view === "grid"
                ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900"
                : "text-slate-600 dark:text-white/80"
            }`}
            aria-pressed={view === "grid"}
          >
            <LayoutGrid className="h-4 w-4" /> Grille
          </button>
          <button
            onClick={() => setView("list")}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              view === "list"
                ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900"
                : "text-slate-600 dark:text-white/80"
            }`}
            aria-pressed={view === "list"}
          >
            <List className="h-4 w-4" /> Liste
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div
        className={`relative z-10 mx-auto max-w-7xl ${
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            : "space-y-4"
        }`}
      >
        {children.map((child) => {
          const nouveauxRapports = rapports.filter(
            (r) => r.enfant === child.name && r.statut === "nouveau"
          ).length;
          const isPresent = !!child.presence?.today;

          if (view === "list") {
            // —— LIST ROW
            return (
       <article
  key={`list-${child.id}`}
  className="group relative w-full grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-5 rounded-2xl border bg-white p-5 shadow-lg
             ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60"
>
  {/* Avatar + état */}
  <div className="relative">
    <img
      src={child.avatar}
      alt={child.name}
      className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800"
    />
    <span
      className={`absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full ring-2 ring-white dark:ring-slate-800 ${
        isPresent ? "bg-emerald-500" : "bg-amber-500"
      }`}
      title={isPresent ? "Présent" : "Absent"}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  </div>

  {/* Centre : infos + matières */}
  <div className="min-w-0">
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="truncate text-base font-bold text-slate-900 dark:text-white">{child.name}</h3>
      <span className="text-xs text-slate-600 dark:text-slate-300">{child.age} • {child.class}</span>
      <Chip tone={isPresent ? "emerald" : "amber"}>{isPresent ? "Présent" : "Absent"}</Chip>
      {nouveauxRapports > 0 && <Chip tone="indigo">{nouveauxRapports} nvx</Chip>}
    </div>


  {/* Matières – style liste (une rangée par matière) */}
<div className="mt-3 grid gap-2">
  {orderedKeys.map((k) => {
    const v = Number((child.evolution as any)?.[k] ?? 0);
    return (
      <ListRowSubject
        key={k}
        label={labelMap[k] ?? k}
        value={v}
        colorKey={k}
      />
    );
  })}
</div>


    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
      <span className="font-semibold">Synthèse :</span> {child.educational?.notes}
    </p>

    <div className="mt-4 flex flex-wrap gap-2">
      <Link
        to={`/parent/enfant/${child.id}/activities`}
        className="inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-blue-700
                   hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-blue-200"
      >
        Activités <ChevronRight className="h-3.5 w-3.5" />
      </Link>
      <Link
        to={`/parent/enfant/${child.id}/reports`}
        className="relative inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-purple-700
                   hover:bg-purple-50 dark:border-white/10 dark:bg-white/5 dark:text-purple-200"
      >
        Rapports <ChevronRight className="h-3.5 w-3.5" />
        {nouveauxRapports > 0 && (
          <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-rose-600
                           text-[10px] font-extrabold text-white shadow">
            {nouveauxRapports}
          </span>
        )}
      </Link>
      <Link
        to={`/parent/enfant/${child.id}/evaluations`}
        className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5
                   text-xs font-semibold text-white hover:brightness-110"
      >
        Évaluations <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </div>

  {/* Droite : mini-jauge compacte (ou remplace par simple % si tu préfères) */}
  <div className="hidden md:flex flex-col items-end">
    <RadialGauge value={child.performance} size={48} />
    <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Performance</span>
  </div>
</article>

            );
          }

          // —— GRID CARD
          return (
            <GradientFrame key={`grid-${child.id}`}>
             <article className="relative overflow-hidden rounded-[23px] border border-slate-200/70 bg-white p-6 shadow-sm hover:shadow-md dark:border-white/10 dark:bg-slate-900/60">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-2xl"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-fuchsia-400/10 blur-2xl"
                />

                <div
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
                    isPresent
                      ? "bg-emerald-500/90 text-white"
                      : "bg-amber-500/90 text-black"
                  }`}
                >
                  {isPresent ? "Présent" : "Absent"}
                </div>
                {nouveauxRapports > 0 && (
                  <div className="absolute right-22 top-4 rounded-full bg-rose-600 px-2 py-1 text-xs font-bold text-white shadow">
                    {nouveauxRapports} nvx
                  </div>
                )}

             {/* header (plus de jauge ici) */}
<div className="mb-4 flex items-center justify-between">
  <div className="flex items-center gap-4">
    <div className="relative">
      <span className={`absolute inset-0 -z-10 rounded-full opacity-40 blur-md bg-gradient-to-r ${child.color}`} />
      <img
        src={child.avatar}
        alt={child.name}
        className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800"
      />
    </div>
    <div>
      <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{child.name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{child.age} • {child.class}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Éducateur·rice : <span className="font-medium">{child.educator}</span>
      </p>
    </div>
  </div>
</div>


                <section className="grid grid-cols-1 gap-4 sm:grid-cols-5 ">
                <div className="sm:col-span-2 rounded-xl border border-slate-200/70 bg-white p-6 shadow-md hover:shadow-md p-4  dark:border-white/10 dark:bg-white/[0.03]">
  <div className="mb-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
    <span>Performance</span>
    <span>{child.educational?.schoolType === "crèche" ? "Dév." : "Scolaire"}</span>
  </div>

  <div className="flex items-center gap-4">
    <div className="shrink-0">
      <RadialGauge value={child.performance} size={56} />
    </div>
    <div className="w-full">
      <ProgressBar value={child.performance} />
      <div className="mt-1 text-right text-xs font-semibold text-slate-900 dark:text-white">
        {child.performance}%
      </div>
    </div>
  </div>
</div>


                  <div className="sm:col-span-3 rounded-xl border border-slate-200/70 bg-white p-6 shadow-md hover:shadow-md p-4  dark:border-white/10 dark:bg-white/[0.03]">
                    <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {child.educational?.schoolType === "crèche"
                        ? "Compétences principales"
                        : "Forces"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {child.educational?.strengths
                        ?.slice(0, 4)
                        .map((s: string, i: number) => (
                          <SkillTag key={i} kind="good">
                            {s}
                          </SkillTag>
                        ))}
                    </div>
                    <p className="mt-3 mb-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {child.educational?.schoolType === "crèche"
                        ? "À développer"
                        : "À améliorer"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {child.educational?.areasToImprove
                        ?.slice(0, 3)
                        .map((s: string, i: number) => (
                          <SkillTag key={i} kind="warn">
                            {s}
                          </SkillTag>
                        ))}
                    </div>
                  </div>
                </section>

                <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Synthèse :</span>{" "}
                  {child.educational?.notes}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Link
                    to={`/parent/enfant/${child.id}/activities`}
                    className="rounded-full border bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-blue-200"
                  >
                    Activités
                  </Link>
                  <Link
                    to={`/parent/enfant/${child.id}/reports`}
                    className="relative rounded-full border bg-white px-3 py-2 text-center text-sm font-medium text-purple-700 hover:bg-purple-50 dark:border-white/10 dark:bg-white/5 dark:text-purple-200"
                  >
                    Rapports
                    {nouveauxRapports > 0 && (
                      <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white shadow">
                        {nouveauxRapports}
                      </span>
                    )}
                  </Link>
                  <Link
                    to={`/parent/enfant/${child.id}/evaluations`}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white hover:brightness-110"
                  >
                    Évaluations
                  </Link>
                </div>
              </article>
            </GradientFrame>
          );
        })}
      </div>
    </section>



    {/* Section 4: Suivi pédagogique avec graphique à barres */}
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
  {/* header */}
  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Suivi pédagogique</h2>
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-white/80">
        <Info className="h-3.5 w-3.5" /> en temps réel
      </span>
    </div>

    {/* filtre période (optionnel à brancher plus tard) */}
  <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-white/10">
{["all", "mensuelle", "hebdomadaire", "trimestrielle", "spécifique"].map((type) => {
  const labelMap = {
    all: "Toutes",
    mensuelle: "Mensuelles",
    hebdomadaire: "Hebdomadaires",
    trimestrielle: "Trimestrielles",
    spécifique: "Spécifiques",
  } as const;

  const active = trackingFilterType === type;


  return (
    <button
      key={type}
     onClick={() => setTrackingFilterType(type)}

      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900"
          : "text-slate-600 dark:text-white/80"
      }`}
    >
      {labelMap[type]}
    </button>
  );
})}

</div>

  </div>

  {/* sélecteur d’enfant */}
  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Suivi pour :</label>
    <div className="flex flex-wrap gap-2">
      {children.map((ch) => {
        const active = ch.name === selectedChildForTracking;
        return (
          <button
            key={ch.id}
            onClick={() => setSelectedChildForTracking(ch.name)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              active
                ? `bg-gradient-to-r ${ch.color} text-white`
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
            }`}
          >
            <img src={ch.avatar} className="h-6 w-6 rounded-full object-cover" alt={ch.name} />
            {ch.name.split(" ")[0]}
          </button>
        );
      })}
    </div>
  </div>

  {/* données enfant sélectionné */}
  {(() => {
    const child = children.find((c) => c.name === selectedChildForTracking);
    if (!child) return null;

    const cur = child.evolution || { language: 85, motor: 78, cognitive: 90, social: 82 };

    // exemple de comparaison (à remplacer par tes vraies données si tu en as)
    const prev = {
      language: Math.max(0, Math.min(100, (cur.language ?? 0) - 2)),
      motor:    Math.max(0, Math.min(100, (cur.motor ?? 0) + 1)),
      cognitive:Math.max(0, Math.min(100, (cur.cognitive ?? 0) - 4)),
      social:   Math.max(0, Math.min(100, (cur.social ?? 0) + 2)),
    };

    return (
      <>
        {/* barres pill + comparaison */}
     <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
  {matchFilter("language") && (
    <PillBar k="language" label="Langage" value={cur.language} previous={prev.language} />
  )}
  {matchFilter("motor") && (
    <PillBar k="motor" label="Motricité" value={cur.motor} previous={prev.motor} />
  )}
  {matchFilter("cognitive") && (
    <PillBar k="cognitive" label="Cognition" value={cur.cognitive} previous={prev.cognitive} />
  )}
  {matchFilter("social") && (
    <PillBar k="social" label="Social" value={cur.social} previous={prev.social} />
  )}
</div>


        {/* insight + CTA */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="rounded-xl border border-slate-200/70 bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 text-sm shadow-sm dark:border-white/10 dark:from-indigo-900/20 dark:to-cyan-900/20">
            <p className="mb-1 font-semibold text-slate-900 dark:text-white">Recommandation pédagogique</p>
            <p className="text-slate-600 dark:text-slate-300">
              Renforcer <b>la motricité</b> par des activités de coordination 10 min/jour.
              Continuer la <b>stimulation du langage</b> via lecture à voix haute.
            </p>
          </div>

          <Link
            to="/parent/suivi-pedagogique"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
          >
            Détails complets
          </Link>
        </div>
      </>
    );
  })()}
</div>

     {/* Section 5: Évaluations rapides */}
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
  {/* Header */}
  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Évaluations rapides</h2>
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-white/80">
        <Clock3 className="h-3.5 w-3.5" /> dernières
      </span>
    </div>

    {/* joli sélecteur (remplace ton <select/>) */}
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-white/10">
        {["all", "mensuelle", "hebdomadaire", "trimestrielle", "spécifique"].map((type) => {
  const labelMap = {
    all: "Toutes",
    mensuelle: "Mensuelles",
    hebdomadaire: "Hebdomadaires",
    trimestrielle: "Trimestrielles",
    spécifique: "Spécifiques",
  } as const;

  const active = evaluationFilterType === type;


  return (
    <button
      key={type}
     onClick={() => setEvaluationFilterType(type)}

      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-white text-slate-900 shadow-sm dark:bg-white/90 dark:text-slate-900"
          : "text-slate-600 dark:text-white/80"
      }`}
    >
      {labelMap[type]}
    </button>
  );
})}
    </div>
  </div>

  {/* Cartes */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    
  {filteredEvaluations.map((evaluation) => {
      const child = children.find(c => c.name.split(" ")[0] === evaluation.child);
      const st = resultStyle[evaluation.result] ?? resultStyle.default;

      return (
        <article
          key={evaluation.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition
                     hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
        >
          {/* accent dégradé en haut */}
          <span className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${st.dot}`} />

          {/* header ligne 1 */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {child && (
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                />
              )}
              <div className="min-w-0">
                <h4 className="truncate font-semibold text-slate-900 dark:text-white">
                  {evaluation.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span className="truncate">{evaluation.child} • {evaluation.date}</span>
                </div>
              </div>
            </div>

            <ResultBadge value={evaluation.result} />
          </div>

          {/* compétences */}
          <div className="mb-3">
            <div className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-300">Compétences évaluées</div>
            <div className="flex flex-wrap gap-2">
              {evaluation.skills.map((s, i)=> <SkillPill key={i}>{s}</SkillPill>)}
            </div>
          </div>

          {/* commentaire (style “note”) */}
          <div className="relative rounded-xl border border-slate-200/70 bg-gradient-to-r from-indigo-50 to-cyan-50 p-3 text-sm shadow-xs
                          dark:border-white/10 dark:from-indigo-900/15 dark:to-cyan-900/15">
            <div className="mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <MessageSquareText className="h-4 w-4 opacity-70" />
              <span className="font-semibold">Commentaire éducatrice</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{evaluation.comment}</p>
          </div>

          {/* footer compact */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Évaluatrice&nbsp;: {evaluation.educator}
            </span>

      {child && (
  <Link
    to={`/parent/enfant/${child.id}/evaluations`}
    className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700
               dark:bg-white/10 dark:text-white/80"
  >
    Voir détail
  </Link>
)}

          </div>
        </article>
      );
    })}
  </div>
</div>


      {/* Évolution globale */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Résumé d'évolution globale</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Langage</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Motricité</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">88%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Cognition</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Social</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div> */}

  
    </div>
    
  );
};
 
export default Enfants;