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

// Mets ceci à la place de ta fonction handleDownloadPDF actuelle
async function handleDownloadPDF(enfantName: string, e: Evaluation) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF("p", "mm", "a4");

  /* ---------- Palette / méta ---------- */
  const TYPE_COLOR: Record<Evaluation["type"], [number, number, number]> = {
    hebdomadaire: [14, 165, 233],   // sky
    mensuel:      [99, 102, 241],   // indigo
    trimestriel:  [217, 70, 239],   // fuchsia
    specifique:   [16, 185, 129],   // emerald
  };
  const typeRGB = TYPE_COLOR[e.type];
  const brand = {
    slate: [15, 23, 42] as [number, number, number],
    gray: [100, 116, 139] as [number, number, number],
    light: [248, 250, 252] as [number, number, number],
    border: [226, 232, 240] as [number, number, number],
  };

  /* ---------- Mise en page ---------- */
  const margin = 16;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - margin * 2;
  let y = margin + 26; // espace header
  let pageNumber = 1;

  const needPage = (h = 0) => {
    if (y + h > pageH - margin - 14) {
      footer();
      doc.addPage(); pageNumber++;
      header();
      y = margin + 26;
    }
  };
  const space = (h = 6) => { y += h; needPage(0); };

  /* ---------- Helpers de rendu ---------- */
  const hline = (y0: number) => {
    doc.setDrawColor(...brand.border);
    doc.line(margin, y0, pageW - margin, y0);
  };

  const tag = (text: string, x: number, y0: number, fill: [number, number, number]) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    const padX = 3.8, h = 8;
    const w = doc.getTextWidth(text) + padX * 2;
    doc.setFillColor(...fill); doc.roundedRect(x, y0 - h + 1, w, h, 2, 2, "F");
    doc.setTextColor(255, 255, 255); doc.text(text, x + padX, y0 - 2);
    doc.setTextColor(...brand.slate);
  };

  const section = (label: string) => {
    needPage(16);
    doc.setFillColor(...brand.light);
    doc.roundedRect(margin, y - 6, contentW, 14, 3, 3, "F");
    doc.setFillColor(...typeRGB);
    doc.roundedRect(margin, y - 6, 3, 14, 3, 3, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.setTextColor(...brand.slate);
    doc.text(label.toUpperCase(), margin + 7, y + 3);
    space(14);
  };

  const kv = (k: string, v: string) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...brand.gray);
    doc.text(k.toUpperCase(), margin, y);
    doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(17, 24, 39);
    const wrap = doc.splitTextToSize(v, contentW - 58);
    doc.text(wrap, margin + 58, y);
    space(8);
  };

  const paragraph = (text: string) => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(31, 41, 55);
    const wrap = doc.splitTextToSize(text, contentW - 4);
    needPage(wrap.length * 6 + 6);
    doc.text(wrap, margin + 2, y);
    y += wrap.length * 6; space(4);
  };

  const bullets = (items: string[]) => {
    if (!items?.length) return;
    doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(31, 41, 55);
    items.forEach(it => {
      const wrap = doc.splitTextToSize(it, contentW - 10);
      needPage(wrap.length * 6 + 2);
      doc.circle(margin + 2, y - 1.5, 1.2, "F");
      doc.text(wrap, margin + 8, y);
      y += wrap.length * 6; space(2);
    });
  };

  const bar = (label: string, value: number) => {
    const v = Math.max(0, Math.min(100, value));
    needPage(14);
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(30, 41, 59);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal"); doc.text(`${v}/100`, pageW - margin, y, { align: "right" });
    space(3);

    const w = contentW, filled = (w * v) / 100;
    doc.setFillColor(235, 239, 245); doc.roundedRect(margin, y, w, 5, 2, 2, "F");

    // couleur en fonction du score
    const col = v >= 90 ? [34, 197, 94] : v >= 80 ? [59, 130, 246] : v >= 70 ? [245, 158, 11] : [244, 63, 94];
    doc.setFillColor(col[0], col[1], col[2]); doc.roundedRect(margin, y, Math.max(3, filled), 5, 2, 2, "F");
    space(9);
  };

  const evoArrow = (evo: "up" | "down" | "stable") => {
    // petit pictogramme vectoriel pour éviter les emojis
    const x = pageW - margin - 18, y0 = y - 2;
    if (evo === "up") {
      doc.setDrawColor(34, 197, 94);
      doc.line(x, y0 + 4, x + 6, y0 - 2); doc.line(x + 6, y0 - 2, x + 10, y0 + 2);
    } else if (evo === "down") {
      doc.setDrawColor(244, 63, 94);
      doc.line(x, y0 - 2, x + 6, y0 + 4); doc.line(x + 6, y0 + 4, x + 10, y0);
    } else {
      doc.setDrawColor(148, 163, 184);
      doc.line(x, y0 + 1, x + 10, y0 + 1);
    }
    doc.setDrawColor(...brand.border);
  };

  /* ---------- Header / Footer ---------- */
  const header = (logo?: string, avatar?: string) => {
    // bandeau haut
    doc.setFillColor(...typeRGB); doc.rect(0, 0, pageW, 8, "F");

    // carte header
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin - 3, 8, pageW - (margin - 3) * 2, 24, 3, 3, "F");

    // logo ou wordmark
    if (logo) { try { doc.addImage(logo, "PNG", margin, 11, 14, 14); } catch {} }
    doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(17, 24, 39);
    doc.text("KIDORA", margin + (logo ? 20 : 0), 17);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...brand.gray);
    doc.text("Évaluation pédagogique", margin + (logo ? 20 : 0), 22);

    // bloc droite: id + date + type tag
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...brand.gray);
    doc.text(`Rapport #${e.id}`, pageW - margin - 18, 15, { align: "right" });
    doc.text(e.date, pageW - margin - 18, 20, { align: "right" });
    tag(TYPE_META[e.type].label, pageW - margin - 18 - 64, 26, [typeRGB[0], typeRGB[1], typeRGB[2]]);

    // avatar enfant (optionnel)
    if (avatar) {
      try {
        doc.addImage(avatar, "JPEG", pageW - margin - 14, 10.5, 14, 14);
        doc.setDrawColor(...brand.border); doc.circle(pageW - margin - 7, 17.5, 8, "S");
      } catch {}
    }
  };

  const footer = () => {
    hline(pageH - 14);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...brand.gray);
    doc.text(`${enfantName} • ${e.educateur}`, margin, pageH - 7);
    const txt = `Page ${pageNumber}`; const tw = doc.getTextWidth(txt);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(pageW - margin - tw - 8, pageH - 11, tw + 6, 8, 3, 3, "F");
    doc.setTextColor(51, 65, 85); doc.text(txt, pageW - margin - 5, pageH - 5, { align: "right" });
    doc.setTextColor(...brand.slate);
  };

  /* ---------- Logo + avatar (facultatifs, CORS safe) ---------- */
  const logoDataUrl = KIDORA_LOGO_URL ? await toDataURL(KIDORA_LOGO_URL) : "";
  // si tu as l’avatar dans ton state enfant, tu peux le passer ici:
  // const avatarDataUrl = await toDataURL(enfant.avatar)  // si nécessaire
  header(logoDataUrl /*, avatarDataUrl*/);
  footer();

  /* ---------- Titre & méta score ---------- */
  doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(...brand.slate);
  doc.text(e.domaine, margin, y); space(6);

  // “score card”
 // ----- SCORE CARD (calé sur le haut) -----
const CARD_H = 20;
const top = y - CARD_H / 2;         // cadre centré autour de y
needPage(CARD_H + 2);

doc.setFillColor(255, 255, 255);
doc.setDrawColor(...brand.border);
doc.roundedRect(margin, top, contentW, CARD_H, 3, 3, "S");

// score (gros chiffre)
doc.setFont("helvetica", "bold");
doc.setFontSize(28);
doc.setTextColor(...typeRGB);
doc.text(`${e.note}`, margin + 8, top + 12);

// libellé sous le score
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(...brand.gray);
doc.text("Note globale /100", margin + 8, top + 17);

// tag résultat, baseline bien À L’INTÉRIEUR du cadre
tag(
  RESULT_META[e.resultat].label.replace(/[⭐👍✅⚪⚠️]/g, "").trim(),
  margin + 48,
  top + 17,               // <- au lieu de y + 10
  [30, 41, 59]
);

// avancer le curseur sous la carte
y = top + CARD_H;
space(6);


  /* ---------- Infos générales ---------- */
  section("Informations générales");
  kv("Enfant", enfantName);
  kv("Type", TYPE_META[e.type].label);
  kv("Date", e.date);
  kv("Éducateur", e.educateur);

  /* ---------- Commentaire ---------- */
  section("Commentaire de l'éducateur");
  paragraph(e.commentaire);

  /* ---------- Compétences ---------- */
  section("Compétences évaluées");
  e.competences.forEach((c) => {
    bar(c.nom, c.score);
    // flèche d’évolution à droite de la ligne de titre
    evoArrow(c.evolution);
    // commentaire de compétence
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); doc.setTextColor(...brand.gray);
    const wrap = doc.splitTextToSize(c.commentaire, contentW);
    needPage(wrap.length * 4.8 + 4);
    doc.text(wrap, margin, y);
    y += wrap.length * 4.8; space(4);
  });

  /* ---------- Points forts / À améliorer / Recos ---------- */
  section("Points forts");
  bullets(e.pointsForts);

  section("Points à améliorer");
  bullets(e.pointsAameliorer);

  section("Recommandations pour la maison");
  bullets(e.recommandations);

  /* ---------- Enregistrement ---------- */
  const fname = `Evaluation_${enfantName.replace(/\s+/g, "_")}_${e.domaine.replace(/\s+/g,"_")}_${e.date.replace(/\//g, "-")}.pdf`;
  doc.save(fname);
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
