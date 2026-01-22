// src/parent/pages/Evaluations.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import {
  CalenderIcon,
  AngleLeftIcon,
  DownloadIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../../icons";

/* ======================= Types ======================= */
interface Evaluation {
  id: number;
  enfantId: number;
  type: "hebdomadaire" | "mensuel" | "trimestriel" | "specifique";
  domaine: string;
  date: string; // JJ/MM/AAAA
  educateur: string;
  note: number; // 0..100
  resultat: "excellent" | "tres_bon" | "bon" | "moyen" | "a_ameliorer";
  commentaire: string;
  competences: {
    nom: string;
    score: number; // 0..100
    evolution: "up" | "down" | "stable";
    commentaire: string;
  }[];
  recommandations: string[];
  pointsForts: string[];
  pointsAameliorer: string[];
  activiteAssociee?: string;
}

/* ======================= UI Meta ======================= */
const TYPE_META: Record<
  Evaluation["type"],
  { label: string; emoji: string; grad: string; chip: string }
> = {
  hebdomadaire: {
    label: "Hebdomadaire",
    emoji: "📅",
    grad: "from-sky-500 to-blue-500",
    chip:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  mensuel: {
    label: "Mensuel",
    emoji: "📊",
    grad: "from-indigo-500 to-violet-500",
    chip:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
  trimestriel: {
    label: "Trimestriel",
    emoji: "📈",
    grad: "from-fuchsia-500 to-pink-500",
    chip:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  },
  specifique: {
    label: "Spécifique",
    emoji: "🎯",
    grad: "from-emerald-500 to-teal-500",
    chip:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
};

const RESULT_META: Record<
  Evaluation["resultat"],
  { label: string; chip: string }
> = {
  excellent: {
    label: "⭐ Excellent",
    chip:
      "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-emerald-300 border-green-200/70 dark:border-emerald-800/50",
  },
  tres_bon: {
    label: "👍 Très bon",
    chip:
      "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-cyan-300 border-blue-200/70 dark:border-blue-800/50",
  },
  bon: {
    label: "✅ Bon",
    chip:
      "bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50",
  },
  moyen: {
    label: "⚪ Moyen",
    chip:
      "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-300 border-orange-200/70 dark:border-orange-800/50",
  },
  a_ameliorer: {
    label: "⚠️ À améliorer",
    chip:
      "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-pink-300 border-red-200/70 dark:border-red-800/50",
  },
};

/* ======================= Helpers UI ======================= */
function ScoreRing({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const hue =
    v >= 90
      ? "147, 68%"
      : v >= 80
      ? "217, 80%"
      : v >= 70
      ? "37, 90%"
      : v >= 60
      ? "20, 90%"
      : "350, 85%";
  return (
    <div className="relative grid size-16 place-items-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(hsl(${hue}, 50%) ${v * 3.6}deg, hsl(0,0%,90%) 0)`,
          filter: "saturate(1.1)",
        }}
      />
      <div className="absolute inset-[6px] rounded-full bg-white dark:bg-slate-900" />
      <div className="relative z-10 text-sm font-extrabold text-slate-900 dark:text-white">
        {v}
        <span className="text-[10px] opacity-70">/100</span>
      </div>
    </div>
  );
}

/*function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: string;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-slate-500">
            {label}
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {value}
          </div>
          {hint && <div className="text-[11px] text-slate-500">{hint}</div>}
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}*/

function Bar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const color =
    v >= 80 ? "bg-green-500" : v >= 60 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div className={`h-full ${color}`} style={{ width: `${v}%` }} />
    </div>
  );
}

/* ======================= Utils ======================= */
const frDate = (s: string) => {
  const [dd, mm, yyyy] = s.split("/").map((x) => parseInt(x, 10));
  return new Date(yyyy, mm - 1, dd).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/** Essaie de convertir un logo (URL) en DataURL pour jsPDF. */
const toDataURL = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = (this as HTMLImageElement).naturalWidth;
        canvas.height = (this as HTMLImageElement).naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve("");
        ctx.drawImage(this as CanvasImageSource, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        resolve("");
      }
    };
    img.onerror = () => resolve("");
    img.src = url;
  });

/* ======================= PDF ======================= */
// Mets ici ton logo si dispo (URL publique). S’il n’est pas accessible en CORS,
// le header tombera automatiquement sur le wordmark “Kidora”.
const KIDORA_LOGO_URL = "/logo.png";

async function handleDownloadPDF(enfantName: string, e: Evaluation) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF("p", "mm", "a4");

  const margin = 16;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const line = (h = 6) => {
    y += h;
    if (y > pageHeight - margin) {
      footer();
      doc.addPage();
      y = margin;
      header();
      y += 6;
    }
  };

  const header = (logoDataUrl?: string) => {
    doc.setFillColor(240, 245, 255);
    doc.rect(0, 0, pageWidth, 20, "F");

    if (logoDataUrl) {
      try {
        doc.addImage(logoDataUrl, "PNG", margin, 6, 18, 8);
      } catch {}
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30);
      doc.text("Kidora", margin + 22, 13);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30, 58, 138);
      doc.text("Kidora", margin, 13);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(34);
    doc.text("Évaluation pédagogique", pageWidth - margin, 13, {
      align: "right",
    });
    y = 26;
  };

  const footer = () => {
    doc.setDrawColor(220);
    doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(`© Kidora — Rapport #${e.id}`, margin, pageHeight - 11);
    doc.text(
      `Généré le ${new Date().toLocaleDateString("fr-FR")}`,
      pageWidth - margin,
      pageHeight - 11,
      { align: "right" }
    );
  };

  const pill = (text: string, bg: [number, number, number]) => {
    const padX = 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const w = doc.getTextWidth(text) + padX * 2;
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.roundedRect(margin, y - 5, w, 8, 2, 2, "F");
    doc.setTextColor(40);
    doc.text(text, margin + padX, y + 1.5);
    line(8);
    doc.setTextColor(0);
  };

  const section = (label: string, bg: [number, number, number]) => {
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.rect(margin, y - 5, contentWidth, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(40);
    doc.text(label, margin + 3, y + 1.5);
    line(12);
    doc.setTextColor(0);
  };

  const kv = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text(`${label} :`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15);
    doc.text(value, margin + 38, y);
    line(6);
  };

  const paragraph = (value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20);
    const wrapped = doc.splitTextToSize(value, contentWidth);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 5.2;
    line(2);
  };

  const bullets = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20);
    items.forEach((it) => {
      const wrapped = doc.splitTextToSize(it, contentWidth - 6);
      doc.text("•", margin, y);
      doc.text(wrapped, margin + 6, y);
      y += wrapped.length * 5.2;
      line(1.5);
    });
  };

  const progress = (label: string, value: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.text(label, margin, y);
    doc.text(`${value}/100`, pageWidth - margin, y, { align: "right" });
    line(3.5);

    const w = contentWidth;
    const filled = Math.max(0, Math.min(100, value)) * (w / 100);
    doc.setFillColor(235);
    doc.rect(margin, y, w, 5, "F");

    const color =
      value >= 90
        ? [34, 197, 94]
        : value >= 80
        ? [59, 130, 246]
        : value >= 70
        ? [245, 158, 11]
        : [244, 63, 94];
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, y, filled, 5, "F");
    line(8);
  };

  const logoDataUrl = KIDORA_LOGO_URL ? await toDataURL(KIDORA_LOGO_URL) : "";
  header(logoDataUrl);

  section("Informations générales", [224, 240, 255]);
  kv("Enfant", enfantName);
  kv("Domaine", e.domaine);
  kv("Type", TYPE_META[e.type].label);
  kv("Date", e.date);
  kv("Éducateur", e.educateur);

  section("Commentaire de l'éducateur", [245, 235, 255]);
  paragraph(e.commentaire);

  pill(
    `Résultat : ${RESULT_META[e.resultat].label.replace(/[⭐👍✅⚪⚠️]/g, "").trim()}`,
    [230, 250, 240]
  );

  section("Compétences évaluées", [232, 245, 238]);
  e.competences.forEach((c) => {
    progress(c.nom, c.score);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(90);
    const wrap = doc.splitTextToSize(c.commentaire, contentWidth);
    doc.text(wrap, margin, y);
    y += wrap.length * 4.8;
    line(3);
  });

  section("Points forts", [255, 246, 230]);
  bullets(e.pointsForts);

  section("Points à améliorer", [255, 236, 236]);
  bullets(e.pointsAameliorer);

  section("Recommandations pour la maison", [235, 240, 255]);
  bullets(e.recommandations);

  if (e.activiteAssociee) {
    pill(`Activité associée : ${e.activiteAssociee}`, [240, 240, 240]);
  }

  footer();
  doc.save(
    `Evaluation_${enfantName.replace(/\s+/g, "_")}_${e.domaine}_${e.date.replace(
      /\//g,
      "-"
    )}.pdf`
  );
}
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
      <div className="text-lg font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}
/* ======================= Page ======================= */
export default function ParentEvaluationsPage() {
  const { childId } = useParams<{ childId?: string }>();

  const [enfant, setEnfant] = useState<{
    id: number;
    name: string;
    age: string;
    class: string;
    avatar: string;
  } | null>(null);
  const [filterType, setFilterType] = useState<"all" | Evaluation["type"]>(
    "all"
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "oldest" | "best">("recent");

  // mêmes enfants que ta page Activities
  const enfants = [
    {
      id: 1,
      name: "Ahmed Ben Salah",
      age: "8 ans",
      class: "CE2",
      avatar: "/images/3-4_ans/enfant_1.jpg",
    },
    {
      id: 2,
      name: "Sara Ben Salah",
      age: "6 ans",
      class: "CP",
      avatar: "/images/3-4_ans/enfant_3.jpg",
    },
    {
      id: 3,
      name: "Mohamed Ben Salah",
      age: "10 ans",
      class: "CM2",
      avatar: "/images/3-4_ans/enfant_6.jpg",
    },
    {
      id: 4,
      name: "Nour Ben Salah",
      age: "7 ans",
      class: "CE1",
      avatar: "/images/3-4_ans/enfant_4.jpg",
    },
  ];

  const evaluations: Evaluation[] = [
    {
      id: 1,
      enfantId: 1,
      type: "hebdomadaire",
      domaine: "Mathématiques",
      date: "12/01/2024",
      educateur: "Mme Fatma",
      note: 92,
      resultat: "excellent",
      commentaire:
        "Ahmed a fait des progrès remarquables en calcul mental. Il participe activement aux exercices de logique et montre une grande curiosité mathématique.",
      competences: [
        {
          nom: "Calcul mental",
          score: 95,
          evolution: "up",
          commentaire:
            "Très rapide en calcul mental, dépasse les attentes pour son âge",
        },
        {
          nom: "Résolution de problèmes",
          score: 90,
          evolution: "up",
          commentaire: "Approche méthodique, propose plusieurs solutions",
        },
        {
          nom: "Géométrie",
          score: 88,
          evolution: "stable",
          commentaire:
            "Bonne compréhension des formes et des concepts spatiaux",
        },
        {
          nom: "Logique",
          score: 93,
          evolution: "up",
          commentaire: "Excellent raisonnement déductif",
        },
      ],
      recommandations: [
        "Continuer les exercices quotidiens de calcul mental",
        "Introduire des défis mathématiques plus complexes",
        "Encourager la participation aux clubs de mathématiques",
      ],
      pointsForts: [
        "Rapidité d'exécution",
        "Curiosité intellectuelle",
        "Persévérance face aux difficultés",
      ],
      pointsAameliorer: ["Présentation des travaux", "Vérification des calculs écrits"],
      activiteAssociee: "Atelier Mathématiques Avancées",
    },
    {
      id: 2,
      enfantId: 1,
      type: "trimestriel",
      domaine: "Langage et Communication",
      date: "05/01/2024",
      educateur: "Mme Amina",
      note: 85,
      resultat: "bon",
      commentaire:
        "Bon développement du vocabulaire et de l'expression orale. Ahmed s'exprime avec plus d'aisance mais doit encore travailler la structure des phrases complexes.",
      competences: [
        {
          nom: "Expression orale",
          score: 88,
          evolution: "up",
          commentaire:
            "Prises de parole plus fréquentes et structurées",
        },
        {
          nom: "Vocabulaire",
          score: 90,
          evolution: "up",
          commentaire: "Vocabulaire riche et varié pour son âge",
        },
        {
          nom: "Compréhension écrite",
          score: 82,
          evolution: "stable",
          commentaire: "Bonne compréhension des textes simples",
        },
        {
          nom: "Grammaire",
          score: 80,
          evolution: "up",
          commentaire: "Progrès en conjugaison et accords",
        },
      ],
      recommandations: [
        "Lire quotidiennement des histoires variées",
        "Pratiquer l'expression orale en situations réelles",
        "Exercices de grammaire ludiques",
      ],
      pointsForts: ["Vocabulaire étendu", "Fluidité verbale", "Curiosité linguistique"],
      pointsAameliorer: ["Syntaxe des phrases complexes", "Précision grammaticale"],
    },
    {
      id: 3,
      enfantId: 1,
      type: "mensuel",
      domaine: "Développement Social",
      date: "10/01/2024",
      educateur: "M. Karim",
      note: 88,
      resultat: "bon",
      commentaire:
        "Ahmed interagit bien avec ses camarades. Il commence à prendre des initiatives dans les jeux collectifs et montre de l'empathie.",
      competences: [
        {
          nom: "Coopération",
          score: 87,
          evolution: "up",
          commentaire: "Joue bien en équipe, partage les responsabilités",
        },
        {
          nom: "Empathie",
          score: 85,
          evolution: "up",
          commentaire: "Sensible aux émotions des autres",
        },
        {
          nom: "Résolution de conflits",
          score: 82,
          evolution: "stable",
          commentaire: "Apprend à gérer les désaccords verbalement",
        },
        {
          nom: "Leadership",
          score: 90,
          evolution: "up",
          commentaire: "Prend naturellement des initiatives",
        },
      ],
      recommandations: [
        "Encourager le tutorat des plus jeunes",
        "Activités de groupe variées",
        "Développement des compétences sociales",
      ],
      pointsForts: ["Esprit d'équipe", "Leadership naturel", "Sensibilité aux autres"],
      pointsAameliorer: ["Gestion de la frustration", "Expression des désaccords"],
      activiteAssociee: "Jeux Collectifs au Parc",
    },
    {
      id: 4,
      enfantId: 1,
      type: "specifique",
      domaine: "Motricité Fine",
      date: "03/01/2024",
      educateur: "Mme Fatma",
      note: 78,
      resultat: "moyen",
      commentaire:
        "Amélioration notable en motricité fine. Ahmed montre plus de précision dans ses gestes mais nécessite encore de l'entraînement pour certaines tâches.",
      competences: [
        {
          nom: "Précision",
          score: 80,
          evolution: "up",
          commentaire: "Meilleure coordination main-œil",
        },
        {
          nom: "Endurance",
          score: 76,
          evolution: "up",
          commentaire: "Tient plus longtemps les instruments",
        },
        {
          nom: "Contrôle",
          score: 78,
          evolution: "stable",
          commentaire: "Gestes plus fluides et contrôlés",
        },
      ],
      recommandations: ["Exercices de découpage quotidiens", "Jeux de construction fins", "Activités de modelage"],
      pointsForts: ["Persévérance", "Amélioration constante", "Volonté d'apprendre"],
      pointsAameliorer: ["Vitesse d'exécution", "Précision sous contrainte de temps"],
      activiteAssociee: "Atelier Peinture Libre",
    },
  ];

  /* ---------- Enfant ciblé ---------- */
  useEffect(() => {
    if (childId) {
      const enfantData = enfants.find((e) => e.id.toString() === childId);
      setEnfant(enfantData || enfants[0]);
    } else {
      setEnfant(enfants[0]);
    }
  }, [childId]);

  /* ---------- Filtrage / recherche / tri ---------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = evaluations.filter(
      (e) =>
        (!childId || e.enfantId.toString() === childId) &&
        (filterType === "all" ? true : e.type === filterType)
    );
    if (q) {
      list = list.filter((e) => {
        const blob = [
          e.domaine,
          e.commentaire,
          e.educateur,
          e.activiteAssociee || "",
          ...e.pointsForts,
          ...e.pointsAameliorer,
          ...e.recommandations,
          ...e.competences.map((c) => `${c.nom} ${c.commentaire}`),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      });
    }
    list = list.sort((A, B) => {
      if (sort === "best") return B.note - A.note;
      const d = (s: string) => {
        const [dd, mm, yyyy] = s.split("/").map((x) => parseInt(x, 10));
        return new Date(yyyy, mm - 1, dd).getTime();
      };
      return sort === "recent" ? d(B.date) - d(A.date) : d(A.date) - d(B.date);
    });
    return list;
  }, [evaluations, childId, filterType, query, sort]);

  /* ---------- Stats ---------- */
  const stats = useMemo(() => {
    const total = filtered.length;
    const moy = total
      ? Math.round(filtered.reduce((s, e) => s + e.note, 0) / total)
      : 0;
    const ex = filtered.filter((e) => e.resultat === "excellent").length;
    const bon = filtered.filter((e) => e.note >= 80).length;
    return { total, moyenne: moy, excellents: ex, bons: bon };
  }, [filtered]);

  if (!enfant) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-pulse text-slate-500 dark:text-slate-400">
          Chargement…
        </div>
      </div>
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
  /* ======================= Render ======================= */
  return (
    <>
      <PageMeta
        title={`Évaluations de ${enfant.name}`}
        description={`Suivez les évaluations de ${enfant.name}`}
      />

    {/* HERO */}
<section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
  <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
  <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

  <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex items-center gap-5">
      {/* même avatar que dans Activity */}
      <RingAvatar src={enfant.avatar} alt={enfant.name} />

      <div>
        <div className="mb-1">
          <Link to="/parent/enfants" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
            <AngleLeftIcon className="size-4" />
            Retour aux enfants
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Évaluations de {enfant.name}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {enfant.age} • {enfant.class} • {stats.total} éval.
        </p>
      </div>
    </div>

    {/* Stats (mise en page identique à Activity) */}
    <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
      <StatCard label="Moyenne" value={`${stats.moyenne}/100`} />
      <StatCard label="⭐ Excellents" value={stats.excellents} />
      <StatCard label="Notes ≥ 80/100" value={stats.bons} />
      <StatCard label="Total" value={stats.total} />
    </div>
  </div>

  {/* Filtres + recherche */}
  <div className="relative z-10 mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div className="flex flex-wrap items-center gap-2">
      {(["all", "hebdomadaire", "mensuel", "trimestriel", "specifique"] as const).map((t) => {
        const active = filterType === t;
        const grad = t === "all" ? "from-slate-500 to-slate-400" : TYPE_META[t as Evaluation["type"]].grad;
        const label = t === "all" ? "Tous" : TYPE_META[t as Evaluation["type"]].label;
        return (
          <button
            key={t}
            onClick={() => setFilterType(t as any)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              active
                ? `bg-gradient-to-r ${grad} text-white shadow`
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>

    <div className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
      <div className="relative flex-1 sm:max-w-[340px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
     <input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Rechercher (domaine, compétences, éducateur…)"
  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm 
    focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 
    dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
/>

      </div>
      <div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
        >
          <option value="recent">Plus récentes</option>
          <option value="oldest">Plus anciennes</option>
          <option value="best">Mieux notées</option>
        </select>
      </div>
    </div>
  </div>
</section>


      {/* LISTE (style proche Activities) */}
      <div className="mt-6 space-y-4">
        {filtered.map((e) => {
          const t = TYPE_META[e.type];
          const r = RESULT_META[e.resultat];
          return (
            <article
              key={e.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
            >
              {/* accent & halo */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${t.grad}`}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 right-10 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl"
              />

              <div className="flex items-start justify-between gap-4">
                {/* titre + meta */}
                <div className="flex min-w-0 items-center gap-4">
                 <div className="grid size-16 place-items-center rounded-xl bg-white ring-4 ring-white dark:bg-white/[0.04] dark:ring-white/[0.04]">
               <ScoreRing value={e.note} />
              </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                      {e.domaine}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <CalenderIcon className="size-3.5" />
                        {frDate(e.date)} • {e.educateur}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${r.chip}`}
                      >
                        {r.label}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.chip}`}
                      >
                        <span className="mr-1">{t.emoji}</span>
                        {t.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="shrink-0 flex gap-2">
                  <button
                    onClick={() => handleDownloadPDF(enfant.name, e)}
                    className="rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-3 py-2 text-sm font-semibold text-white shadow hover:from-emerald-700 hover:to-green-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      <DownloadIcon className="size-4" />
                      PDF
                    </span>
                  </button>
                </div>
              </div>

              {/* commentaire */}
              <p className="mt-3 text-slate-700 dark:text-slate-300">
                {e.commentaire}
              </p>

              {/* compétences */}
              <div className="mt-4">
                <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Compétences évaluées
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {e.competences.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200/70 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {c.nom}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {c.score}/100
                          </span>
                          {c.evolution === "up" ? (
                            <ArrowUpIcon className="size-4 text-green-500" />
                          ) : c.evolution === "down" ? (
                            <ArrowDownIcon className="size-4 text-rose-500" />
                          ) : (
                            <span className="text-slate-400">→</span>
                          )}
                        </div>
                      </div>
                      <Bar value={c.score} />
                      <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
                        {c.commentaire}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* tags */}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Points forts
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {e.pointsForts.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Recommandations
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {e.recommandations.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* footer carte */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {e.activiteAssociee && (
                    <>
                      Activité : <span className="font-medium">{e.activiteAssociee}</span> •{" "}
                    </>
                  )}
                  Rapport #{e.id}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-slate-900">
          <div className="text-4xl">📊</div>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Aucune évaluation trouvée pour {enfant.name}
          </p>
        </div>
      )}
    </>
  );
}
