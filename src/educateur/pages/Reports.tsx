import PageMeta from "../../components/common/PageMeta";
import { useMemo, useState } from "react";
import {
  UserIcon,
  CalenderIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  FileIcon,
  CheckCircleIcon,
  CloseIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../../icons";



// ========= PDF EDU – thème par type =========
const PDF_THEME: Record<Rapport["type"], {
  label: string; head: [number, number, number]; bar: [number, number, number];
}> = {
  individuel_hebdomadaire: { label: "Individuel Hebdomadaire", head: [99, 102, 241], bar: [79, 70, 229] },     // indigo
  individuel_quotidien:    { label: "Individuel Quotidien",    head: [16, 185, 129], bar: [13, 148, 136] },     // emerald/teal
  classe_hebdomadaire:     { label: "Classe Hebdomadaire",     head: [168, 85, 247], bar: [192, 38, 211] },     // purple/fuchsia
  trimestriel:             { label: "Trimestriel",             head: [245, 158, 11], bar: [234, 88, 12] },       // amber/orange
};

const BRAND = {
  violet: [109, 40, 217] as [number, number, number],
  slate:  [15, 23, 42]   as [number, number, number],
  gray:   [100,116,139]  as [number, number, number],
  light:  [248,250,252]  as [number, number, number],
};

const KIDORA_LOGO_URL = "/logo.png";

// util pour charger le logo en dataURL (même pattern que parent)
async function toDataUrl(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  const blob = await res.blob();
  return await new Promise<string>((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(blob);
  });
}

// ========= Générateur PDF (vectoriel, comme côté Parent) =========
async function buildEducatorPDF(rapport: Rapport) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF("p", "mm", "a4");

  // géométrie & couleurs
  const margin = 18, HEADER_H = 26, FOOTER_H = 14;
  const pageWidth  = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentW   = pageWidth - margin * 2;
  let y = margin + HEADER_H;
  let pageNumber = 1;

  const theme = PDF_THEME[rapport.type];

  // helpers pagination
  const ensurePage = (need = 0) => {
    if (y + need > pageHeight - margin - FOOTER_H) {
      doc.addPage(); pageNumber++; drawHeader(); drawFooter(); y = margin + HEADER_H;
    }
  };
  const space = (h = 6) => { y += h; ensurePage(0); };

  // blocs UI
  const title = (t: string) => {
    ensurePage(18);
    doc.setFont("helvetica","bold"); doc.setFontSize(20); doc.setTextColor(...BRAND.slate);
    doc.text(t, margin, y);
    doc.setDrawColor(226,232,240); doc.setLineWidth(0.6);
    doc.line(margin, y+2, margin+70, y+2);
    space(14);
  };

  const section = (t: string) => {
    ensurePage(20);
    doc.setFillColor(...BRAND.light);
    doc.roundedRect(margin, y-6, contentW, 14, 3,3, "F");
    doc.setFillColor(...theme.head);
    doc.roundedRect(margin, y-6, 3, 14, 3,3, "F");
    doc.setFont("helvetica","bold"); doc.setFontSize(13); doc.setTextColor(...BRAND.slate);
    doc.text(t.toUpperCase(), margin+7, y+3);
    space(18);
  };

  const kv = (label: string, value: string) => {
    ensurePage(8);
    doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...BRAND.gray);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.setTextColor(17,24,39);
    const wrapped = doc.splitTextToSize(value, contentW - 60);
    doc.text(wrapped, margin + 60, y);
    space(8);
  };

  const textBlock = (value: string) => {
    doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.setTextColor(51,65,85);
    const wrapped = doc.splitTextToSize(value, contentW - 4);
    ensurePage(wrapped.length * 6 + 6);
    doc.text(wrapped, margin + 2, y);
    y += wrapped.length * 6; space(6);
  };

  const bullet = (items?: string[]) => {
    if (!items || !items.length) return;
    doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.setTextColor(31,41,55);
    items.forEach((it) => {
      const wrapped = doc.splitTextToSize(it, contentW - 10);
      ensurePage(wrapped.length * 6 + 2);
      doc.setFillColor(...theme.bar);
      doc.circle(margin + 2, y - 1.5, 1, "F");
      doc.text(wrapped, margin + 8, y);
      y += wrapped.length * 6; space(2);
    });
  };

  const bar = (label: string, value: number) => {
    ensurePage(14);
    doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(30,41,59);
    doc.text(label, margin, y);
    doc.setFont("helvetica","normal"); doc.text(`${value}%`, pageWidth - margin, y, { align: "right" });
    space(3);
    const w = contentW, fill = (w * Math.max(0, Math.min(100, value))) / 100;
    doc.setFillColor(226,232,240); doc.roundedRect(margin, y, w, 4, 2, 2, "F");
    doc.setFillColor(...theme.bar); doc.roundedRect(margin, y, Math.max(3, fill), 4, 2, 2, "F");
    space(10);
  };

  // header/footer
  let logo: string | undefined; try { logo = await toDataUrl(KIDORA_LOGO_URL); } catch {}
  const drawHeader = () => {
    doc.setFillColor(...theme.head); doc.rect(0, 0, pageWidth, 10, "F");
    doc.setFillColor(255,255,255);
    doc.roundedRect(margin-4, 10, pageWidth-(margin-4)*2, HEADER_H-6, 3,3, "F");
    if (logo) doc.addImage(logo, "PNG", margin, 13, 14, 14);
    doc.setFont("helvetica","bold"); doc.setFontSize(14); doc.setTextColor(17,24,39);
    doc.text("KIDORA", margin + 20, 19);
    doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(100,116,139);
    doc.text("Rapport pédagogique (Éducateur)", margin + 20, 24);
    doc.text(`Rapport #${rapport.id}`, pageWidth - margin, 18, { align: "right" });
    doc.text(new Date(rapport.dateCreation).toLocaleDateString("fr-FR"), pageWidth - margin, 24, { align: "right" });
  };
  const drawFooter = () => {
    doc.setDrawColor(226,232,240);
    doc.line(margin, pageHeight - FOOTER_H, pageWidth - margin, pageHeight - FOOTER_H);
    doc.setFontSize(9); doc.setTextColor(100,116,139);
    doc.text(`${typeLabel(rapport.type)} • ${rapport.titre}`, margin, pageHeight - 6);
    doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 6, { align: "right" });
  };

  // init page
  drawHeader(); drawFooter();

  // ======== CONTENU ========
  title("Rapport Pédagogique");

  // sous-titre coloré
  doc.setFontSize(13); doc.setTextColor(...theme.head);
  doc.text(rapport.titre, margin, y); space(10);

  section("Informations générales");
  kv("Type", PDF_THEME[rapport.type].label);
  kv("Période", rapport.periode);
  kv("Éducateur", rapport.auteur);
  kv("Créé le", new Date(rapport.dateCreation).toLocaleDateString("fr-FR"));
  kv("Statut", rapport.statut === "brouillon" ? "Brouillon" : rapport.statut === "finalise" ? "Finalisé" : rapport.statut === "envoye" ? "Envoyé" : "Archivé");
  kv("Importance", rapport.importance === "haute" ? "Haute priorité" : rapport.importance === "moyenne" ? "Priorité moyenne" : "Basse priorité");
  kv("Enfants concernés", String(rapport.enfantsConcernes));

  if (rapport.resume) {
    section("Résumé exécutif");
    textBlock(rapport.resume);
  }

  if (rapport.motsCles?.length) {
    section("Mots-clés");
    textBlock(rapport.motsCles.map(m => `#${m}`).join("   "));
  }

  if (rapport.actionsRecommandees?.length) {
    section("Actions recommandées");
    bullet(rapport.actionsRecommandees);
  }

  // petit indicateur visu (optionnel)
  section("Indicateurs");
  bar("Couverture d'objectifs", rapport.importance === "haute" ? 65 : rapport.importance === "moyenne" ? 78 : 90);
  bar("Suivi & communication", 85);

  // save
  const fname = `Rapport_Educateur_${rapport.id}_${rapport.titre.replace(/\s+/g,"_")}.pdf`;
  doc.save(fname);
}

/* -------------------- Types -------------------- */
interface Rapport {
  id: number;
  titre: string;
  type:
    | "individuel_hebdomadaire"
    | "individuel_quotidien"
    | "classe_hebdomadaire"
    | "trimestriel";
  periode: string;
  dateCreation: string;
  auteur: string;
  enfantsConcernes: number;
  statut: "brouillon" | "finalise" | "envoye" | "archive";
  resume?: string;
  actionsRecommandees?: string[];
  motsCles?: string[];
  importance: "faible" | "moyenne" | "haute";
}

interface ModeleRapport {
  id: number;
  nom: string;
  description: string;
  type: Rapport["type"];
  tempsEstime: number; // minutes
  sections: string[];
}

/* -------------------- Helpers visuels -------------------- */
const typeIcon = (t: Rapport["type"]) =>
  t === "individuel_hebdomadaire"
    ? "📅👤"
    : t === "individuel_quotidien"
    ? "📝👤"
    : t === "classe_hebdomadaire"
    ? "📅👥"
    : "📊📈";

const typeTone = (t: Rapport["type"]) =>
  t === "individuel_hebdomadaire"
    ? "indigo"
    : t === "individuel_quotidien"
    ? "emerald"
    : t === "classe_hebdomadaire"
    ? "purple"
    : "amber";

const toneBg = (tone: string) =>
  ({
    indigo: "from-indigo-500 to-violet-600",
    emerald: "from-emerald-500 to-teal-600",
    purple: "from-purple-500 to-fuchsia-600",
    amber: "from-amber-500 to-orange-600",
  }[tone] || "from-slate-500 to-slate-700");

const chipByType = (t: Rapport["type"]) =>
  ({
    individuel_hebdomadaire:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    individuel_quotidien:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    classe_hebdomadaire:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    trimestriel:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  }[t]);

const chipByStatut = (s: Rapport["statut"]) =>
  ({
    brouillon:
      "text-gray-700 dark:text-gray-300",
    finalise:
      "text-green-700 dark:text-green-300",
    envoye:
      "text-blue-700 dark:text-blue-300",
    archive:
      "text-purple-700 dark:text-purple-300",
  }[s]);

const chipByImportance = (p: Rapport["importance"]) =>
  ({
    haute:
      "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    moyenne:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    faible:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  }[p]);

const typeLabel = (t: Rapport["type"]) =>
  t === "individuel_hebdomadaire"
    ? "Individuel Hebdomadaire"
    : t === "individuel_quotidien"
    ? "Individuel Quotidien"
    : t === "classe_hebdomadaire"
    ? "Classe Hebdomadaire"
    : "Trimestriel";




/* Pills lisibles sur fond coloré */
function StatusPill({ statut }: { statut: Rapport["statut"] }) {
  const label =
    statut === "brouillon"
      ? "Brouillon"
      : statut === "finalise"
      ? "Finalisé"
      : statut === "envoye"
      ? "Envoyé"
      : "Archivé";
  return (
    <span
      className={`dark:text-slate-800 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 ${chipByStatut(
        statut
      )}`}
    >
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full ${
          statut === "brouillon"
            ? "bg-gray-400"
            : statut === "finalise"
            ? "bg-green-500"
            : statut === "envoye"
            ? "bg-blue-500"
            : "bg-purple-500"
        }`}
      />
      {label}
    </span>
  );
}
function TypePill({ type }: { type: Rapport["type"] }) {
  return (
    <span
      className={`rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 capitalize ${chipByType(
        type
      )}`}
    >
      {typeLabel(type)}
    </span>
  );
}

/* Mini composants */
function GlassStat({
  icon,
  label,
  value,
  ring = "indigo",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  ring?: "indigo" | "green" | "amber" | "cyan";
}) {
  const ringCls =
    ring === "green"
      ? "ring-green-300/50 dark:ring-green-400/20"
      : ring === "amber"
      ? "ring-amber-300/50 dark:ring-amber-400/20"
      : ring === "cyan"
      ? "ring-cyan-300/50 dark:ring-cyan-400/20"
      : "ring-indigo-300/50 dark:ring-indigo-400/20";
  return (
    <div className={`rounded-2xl bg-white/10 p-4 backdrop-blur ring-1 ${ringCls} shadow-[inset_0_1px_0_rgba(255,255,255,.25)]`}>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20">{icon}</div>
        <div>
          <div className="text-xs text-white/80">{label}</div>
          <div className="text-2xl font-extrabold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}
/* ---------- UI helpers (type → icône, couleurs) ---------- */
const TYPE_META_REPORT: Record<
  Rapport["type"],
  { label: string; emoji: string; grad: string; bar: string; dot: string }
> = {
  individuel_hebdomadaire: {
    label: "Individuel Hebdomadaire",
    emoji: "📅👤",
    grad: "from-indigo-500/15 via-violet-500/10 to-fuchsia-500/10",
    bar: "from-indigo-500 to-violet-600",
    dot: "bg-indigo-500",
  },
  individuel_quotidien: {
    label: "Individuel Quotidien",
    emoji: "📝👤",
    grad: "from-emerald-500/15 via-teal-500/10 to-cyan-500/10",
    bar: "from-emerald-500 to-teal-600",
    dot: "bg-emerald-500",
  },
  classe_hebdomadaire: {
    label: "Classe Hebdomadaire",
    emoji: "📅👥",
    grad: "from-purple-500/15 via-fuchsia-500/10 to-pink-500/10",
    bar: "from-purple-500 to-fuchsia-600",
    dot: "bg-purple-500",
  },
  trimestriel: {
    label: "Trimestriel",
    emoji: "📊📈",
    grad: "from-amber-500/15 via-orange-500/10 to-rose-500/10",
    bar: "from-amber-500 to-orange-600",
    dot: "bg-amber-500",
  },
};

/* ---------- Fancy progress bar ---------- */
function FancyBar({ pct, gradient }: { pct: number; gradient: string }) {
  const safe = Math.max(0, Math.min(100, pct));
  return (
    <div className="relative h-2.5 w-44 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-[width] duration-700`}
        style={{ width: `${safe}%` }}
      />
      {/* shimmer */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 -translate-x-16 animate-[shimmer_1.8s_ease_infinite] rounded-full bg-white/30 mix-blend-overlay"
        style={{ width: `${Math.max(15, safe * 0.3)}%` }}
      />
      <style>{`
        @keyframes shimmer { 
          0%{ transform: translateX(-4rem) } 
          100%{ transform: translateX(14rem) } 
        }
      `}</style>
    </div>
  );
}

/* ---------- Ligne de répartition ---------- */
function TypeRow({
  type,
  count,
  total,
}: {
  type: Rapport["type"];
  count: number;
  total: number;
}) {
  const meta = TYPE_META_REPORT[type];
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  return (
    <div
      className={`
        group relative grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl
        px-3 py-3 ring-1 ring-slate-200/70 dark:ring-white/10
        bg-white/70 dark:bg-slate-900/60
        hover:shadow-md transition
        overflow-hidden
      `}
    >
      {/* halo décoratif */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${meta.grad}`}
      />
      <div className="relative z-10 flex items-center gap-3">
      <div className="grid size-12 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 dark:bg-slate-800">
     <span className="text-md leading-none whitespace-nowrap">{meta.emoji}</span>
      </div>

        <div className="text-slate-800 dark:text-slate-200 font-medium">
          {TYPE_META_REPORT[type].label}
        </div>
      </div>

      <div className="relative z-10">
        <FancyBar pct={pct} gradient={meta.bar} />
      </div>

      <div className="relative z-10 flex items-center gap-2 pl-1">
        <span className={`inline-block size-2 rounded-full ${meta.dot}`} />
        <span className="tabular-nums font-semibold text-slate-900 dark:text-white">
          {count}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">({pct}%)</span>
      </div>
    </div>
  );
}

/* ---------- Carte complète Répartition ---------- */
function TypeBreakdownCard({
  total,
  data,
}: {
  total: number;
  data: {
    individuel_hebdomadaire: number;
    individuel_quotidien: number;
    classe_hebdomadaire: number;
    trimestriel: number;
  };
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      {/* gradient d’arrière-plan */}
      <div
        aria-hidden
        className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl"
      />
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Répartition par type
        </h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-300">
          Total : {total}
        </span>
      </div>

      <div className="relative z-10 grid gap-3">
        <TypeRow
          type="individuel_hebdomadaire"
          count={data.individuel_hebdomadaire}
          total={total}
        />
        <TypeRow
          type="individuel_quotidien"
          count={data.individuel_quotidien}
          total={total}
        />
        <TypeRow
          type="classe_hebdomadaire"
          count={data.classe_hebdomadaire}
          total={total}
        />
        <TypeRow
          type="trimestriel"
          count={data.trimestriel}
          total={total}
        />
      </div>
    </div>
  );
}

/* -------------------- Page -------------------- */
export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | Rapport["type"]>("all");
  const [filterStatut, setFilterStatut] = useState<
    "all" | Rapport["statut"]
  >("all");
  const [viewMode, setViewMode] = useState<"list" | "stats">("list");

  const [selectedRapport, setSelectedRapport] = useState<Rapport | null>(null);
  const [showModeleModal, setShowModeleModal] = useState(false);
  const [showViewRapport, setShowViewRapport] = useState(false);

  const [rapports, setRapports] = useState<Rapport[]>([
    {
      id: 1,
      titre: "Rapport Hebdomadaire - Classe (3-4) ans",
      type: "classe_hebdomadaire",
      periode: "08-12 Janvier 2024",
      dateCreation: "2024-01-12",
      auteur: "Mme. Dupont",
      enfantsConcernes: 8,
      statut: "envoye",
      resume:
        "Semaine productive avec focus sur la motricité fine. Excellent progrès pour Emma et Lucas.",
      actionsRecommandees: [
        "Continuer les activités de manipulation fine",
        "Renforcer l'autonomie vestimentaire",
        "Intégrer plus d'activités sensorielles",
      ],
      motsCles: ["motricité", "progrès", "socialisation"],
      importance: "moyenne",
    },
    {
      id: 2,
      titre: "Rapport Individuel Hebdomadaire - Fatima Zahra",
      type: "individuel_hebdomadaire",
      periode: "08-12 Janvier 2024",
      dateCreation: "2024-01-12",
      auteur: "Mme. Dupont",
      enfantsConcernes: 1,
      statut: "finalise",
      resume:
        "Progrès remarquables en mathématiques et leadership. Montre une grande maturité sociale.",
      actionsRecommandees: [
        "Encourager le tutorat des plus jeunes",
        "Défis mathématiques supplémentaires",
        "Responsabilités de classe",
      ],
      motsCles: ["leadership", "mathématiques", "maturité"],
      importance: "haute",
    },
    {
      id: 3,
      titre: "Rapport Individuel Quotidien - Lucas Martin",
      type: "individuel_quotidien",
      periode: "15 Janvier 2024",
      dateCreation: "2024-01-15",
      auteur: "M. Martin",
      enfantsConcernes: 1,
      statut: "brouillon",
      resume:
        "Journée difficile avec quelques crises émotionnelles. N'a pas bien dormi la nuit dernière.",
      actionsRecommandees: [
        "Adapter le rythme de la journée",
        "Instaurer un rituel de calme",
        "Communication avec les parents",
      ],
      motsCles: ["émotions", "sommeil", "adaptation"],
      importance: "moyenne",
    },
    {
      id: 4,
      titre: "Rapport Trimestriel - Développement Social",
      type: "trimestriel",
      periode: "Octobre-Décembre 2023",
      dateCreation: "2024-01-03",
      auteur: "Mme. Leroy",
      enfantsConcernes: 25,
      statut: "envoye",
      resume:
        "Amélioration significative des interactions sociales. Réduction des conflits de 40%.",
      actionsRecommandees: [
        "Maintenir les activités de groupe",
        "Travailler la résolution de conflits",
        "Renforcer l'empathie",
      ],
      motsCles: ["socialisation", "conflits", "empathie"],
      importance: "haute",
    },
    {
      id: 5,
      titre: "Rapport Individuel Quotidien - Emma Dubois",
      type: "individuel_quotidien",
      periode: "14 Janvier 2024",
      dateCreation: "2024-01-14",
      auteur: "Mme. Dupont",
      enfantsConcernes: 1,
      statut: "envoye",
      resume:
        "Journée excellente ! Participation active à toutes les activités. A aidé un camarade en difficulté.",
      actionsRecommandees: [
        "Encourager ce comportement d'entraide",
        "Responsabilités supplémentaires",
        "Félicitations aux parents",
      ],
      motsCles: ["entraide", "participation", "responsabilité"],
      importance: "faible",
    },
    {
      id: 6,
      titre: "Rapport Hebdomadaire - Classe (4-5) ans",
      type: "classe_hebdomadaire",
      periode: "01-05 Janvier 2024",
      dateCreation: "2024-01-05",
      auteur: "M. Martin",
      enfantsConcernes: 12,
      statut: "archive",
      resume:
        "Bonne reprise après les vacances. Progrès visibles en autonomie et en langage.",
      actionsRecommandees: [
        "Continuer le travail sur l'autonomie",
        "Enrichir le vocabulaire",
        "Activités de motricité globale",
      ],
      motsCles: ["autonomie", "langage", "progrès"],
      importance: "moyenne",
    },
    {
      id: 7,
      titre: "Rapport Trimestriel - Compétences Académiques",
      type: "trimestriel",
      periode: "Octobre-Décembre 2023",
      dateCreation: "2024-01-02",
      auteur: "Mme. Dupont",
      enfantsConcernes: 18,
      statut: "archive",
      resume:
        "Avancées significatives en lecture et écriture. Bon niveau général en mathématiques.",
      actionsRecommandees: [
        "Ateliers de lecture supplémentaires",
        "Défis mathématiques",
        "Suivi individualisé",
      ],
      motsCles: ["lecture", "mathématiques", "progrès"],
      importance: "haute",
    },
  ]);

  const modelesRapports: ModeleRapport[] = [
    {
      id: 1,
      nom: "Rapport Individuel Hebdomadaire",
      description: "Suivi hebdomadaire détaillé d'un enfant spécifique",
      type: "individuel_hebdomadaire",
      tempsEstime: 30,
      sections: [
        "Progrès de la semaine",
        "Développement social",
        "Développement cognitif",
        "Observations",
        "Objectifs semaine suivante",
      ],
    },
    {
      id: 2,
      nom: "Rapport Individuel Quotidien",
      description: "Suivi journalier rapide d'un enfant",
      type: "individuel_quotidien",
      tempsEstime: 10,
      sections: [
        "Humeur du jour",
        "Participation",
        "Relations sociales",
        "Événements marquants",
        "À signaler aux parents",
      ],
    },
    {
      id: 3,
      nom: "Rapport Classe Hebdomadaire",
      description: "Bilan hebdomadaire de l'ensemble de la classe",
      type: "classe_hebdomadaire",
      tempsEstime: 25,
      sections: [
        "Ambiance générale",
        "Projets réalisés",
        "Progrès collectifs",
        "Points d'attention",
        "Planning semaine suivante",
      ],
    },
    {
      id: 4,
      nom: "Rapport Trimestriel",
      description: "Évaluation complète sur 3 mois",
      type: "trimestriel",
      tempsEstime: 60,
      sections: [
        "Bilan académique",
        "Développement social",
        "Compétences acquises",
        "Objectifs atteints",
        "Projets futurs",
      ],
    },
  ];

  /* -------------------- Dérivés -------------------- */
  const filteredRapports = useMemo(() => {
    return rapports.filter((r) => {
      const q =
        r.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.resume?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.motsCles?.some((m) =>
          m.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const t = filterType === "all" || r.type === filterType;
      const s = filterStatut === "all" || r.statut === filterStatut;
      return q && t && s;
    });
  }, [rapports, searchTerm, filterType, filterStatut]);

  const stats = useMemo(() => {
    const envoyes = rapports.filter((r) => r.statut === "envoye").length;
    const brouillons = rapports.filter((r) => r.statut === "brouillon").length;
    const enfantsTotal = rapports.reduce(
      (sum, r) => sum + r.enfantsConcernes,
      0
    );
    const parType = {
      individuel_hebdomadaire: rapports.filter(
        (r) => r.type === "individuel_hebdomadaire"
      ).length,
      individuel_quotidien: rapports.filter(
        (r) => r.type === "individuel_quotidien"
      ).length,
      classe_hebdomadaire: rapports.filter(
        (r) => r.type === "classe_hebdomadaire"
      ).length,
      trimestriel: rapports.filter((r) => r.type === "trimestriel").length,
    };
    return {
      totalRapports: rapports.length,
      envoyes,
      brouillons,
      enfantsTotal,
      parType,
    };
  }, [rapports]);

  /* -------------------- Actions -------------------- */
  const handleCreerRapport = (modele: ModeleRapport) => {
    setShowModeleModal(false);
    console.log("Création d'un rapport avec le modèle:", modele.nom);
  };

 const handleExporterRapport = (rapport: Rapport) => {
  // ↳ identique à l’expérience parent (PDF vectoriel jsPDF)
  buildEducatorPDF(rapport);
};


  /* -------------------- Render -------------------- */
  return (
    <>
      <PageMeta
        title="Rapports et Bilans | Système de Gestion"
        description="Générez et consultez les rapports pédagogiques et bilans de développement"
      />

      {/* HERO créatif */}
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="relative z-10 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Rapports & Bilans ✨
              </h1>
              <p className="mt-1 text-white/90">
                Documentez, analysez et partagez le développement des enfants.
              </p>
            </div>

          </div>

          {/* KPIs en verre */}
          <div className="mt-4 grid max-w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <GlassStat
              icon={<FileIcon className="size-5 text-white" />}
              label="Total rapports"
              value={stats.totalRapports}
            />
            <GlassStat
              icon={<CheckCircleIcon className="size-5 text-white" />}
              label="Envoyés"
              value={stats.envoyes}
              ring="green"
            />
            <GlassStat
              icon={<span>✏️</span>}
              label="Brouillons"
              value={stats.brouillons}
              ring="amber"
            />
            <GlassStat
              icon={<UserIcon className="size-5 text-white" />}
              label="Enfants couverts"
              value={stats.enfantsTotal}
              ring="cyan"
            />
          </div>
        </div>
      </section>

      {/* Barre sticky : filtres & modes */}
      <div className="sticky top-2 z-[5] mb-6 rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex flex-1 items-center gap-3">
            
            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher (titre, résumé, mots-clés)…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>
            </div>

            {/* FILTER TYPE */}
            <div 
              className="
                relative group w-full max-w-xs
                transition-all duration-300 ease-out
                hover:scale-105
                active:scale-[0.98]
                focus-within:scale-105
              "
            >
              <div className="
                absolute -inset-[2px] rounded-xl
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                opacity-0
                group-hover:opacity-70
                group-focus-within:opacity-100
                blur-sm
                transition duration-500
                pointer-events-none
              " />
              <div className="
                relative z-10 rounded-xl
                bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                border-2 border-indigo-200 dark:border-indigo-900/50
                shadow-lg
                group-hover:shadow-xl
                group-focus-within:shadow-indigo-500/60
                group-focus-within:border-indigo-500 dark:group-focus-within:border-indigo-400
                transition-all
              ">
                <div className="
                  pointer-events-none absolute inset-y-0 left-3
                  flex items-center
                  text-indigo-600 dark:text-indigo-300
                ">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="
                    w-full appearance-none
                    pl-10 pr-10 py-3
                    text-sm font-bold
                    text-gray-900 dark:text-white
                    bg-transparent
                    focus:outline-none
                    cursor-pointer
                    transition-all duration-200
                  "
                >
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="all">📋 Tous les types</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="individuel_hebdomadaire">📊 Individuel Hebdo</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="individuel_quotidien">📝 Individuel Quotidien</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="classe_hebdomadaire">👥 Classe Hebdo</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="trimestriel">📅 Trimestriel</option>
                </select>
                <div className="
                  pointer-events-none absolute inset-y-0 right-3
                  flex items-center
                  text-indigo-600 dark:text-indigo-300
                  transition-transform duration-500 ease-out
                  group-focus-within:rotate-180
                ">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* FILTER STATUT */}
            <div className="relative group transition-all duration-300 ease-out hover:scale-105 active:scale-[0.98] focus-within:scale-105">
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-70 group-focus-within:opacity-100 blur-sm transition duration-500 pointer-events-none" />
              <div className="relative z-10 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-indigo-200 dark:border-indigo-900/50 shadow-lg group-hover:shadow-xl group-focus-within:shadow-indigo-500/60 group-focus-within:border-indigo-500 dark:group-focus-within:border-indigo-400 transition-all duration-300">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-indigo-600 dark:text-indigo-300 transition-all duration-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                </div>
                <select value={filterStatut} onChange={(e) => setFilterStatut(e.target.value as any)} className="w-full appearance-none pl-10 pr-10 py-3 text-sm font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none cursor-pointer transition-all duration-200">
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="all">✓ Tous statuts</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="brouillon">📋 Brouillon</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="finalise">✅ Finalisé</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="envoye">📤 Envoyé</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="archive">📦 Archivé</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-indigo-600 dark:text-indigo-300 transition-transform duration-500 ease-out group-focus-within:rotate-180">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <div className="flex gap-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 p-1.5 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 shadow-md">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300 min-w-[90px] text-center ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                📋 Liste
              </button>
              <button
                onClick={() => setViewMode("stats")}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300 min-w-[90px] text-center ${
                  viewMode === "stats"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                📊 Stats
              </button>
            </div>
            <button
              onClick={() => setShowModeleModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 h-10"
            >
              Nouveau Rapport
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- VUE STATS -------------------- */}
      {viewMode === "stats" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Répartition par type (barres animées) */}
        <TypeBreakdownCard
  total={stats.totalRapports}
  data={stats.parType}
/>


            {/* Timeline des échéances */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Échéancier
              </h3>
              <ol className="relative ml-3 space-y-6 border-l-2 border-dashed border-gray-200 pl-5 dark:border-gray-700">
                <li className="group relative">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-900/40" />
                  <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Rapports individuels quotidiens
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Tous les jours à 16h
                      </div>
                    </div>
                    <CalenderIcon className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </li>
                <li className="group relative">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-200 dark:ring-emerald-900/40" />
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/30">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Rapports classe hebdomadaires
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Tous les vendredis
                      </div>
                    </div>
                    <CalenderIcon className="size-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </li>
                <li className="group relative">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-amber-500 ring-4 ring-amber-200 dark:ring-amber-900/40" />
                  <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Rapports trimestriels
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        15 Mars 2024
                      </div>
                    </div>
                    <CalenderIcon className="size-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        /* -------------------- VUE LISTE -------------------- */
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-[1fr]">
            {filteredRapports.map((r) => {
              const tone = typeTone(r.type);
              return (
                <div
                  key={r.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  {/* Header coloré par type */}
                  <div
                    className={`flex items-center justify-between bg-gradient-to-r ${toneBg(
                      tone
                    )} px-5 py-4`}
                  >
                     <div className="">
                        {typeIcon(r.type)}
                      </div>
                    <div className="flex items-center gap-3 text-white">
                     
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold leading-tight">
                            {r.titre}
                          </h3>
                        
                        </div>
                        <div className="text-xs/5 opacity-90">
                          {r.periode} • {r.enfantsConcernes} enfant
                          {r.enfantsConcernes > 1 ? "s" : ""}
                        </div>
                          
                      </div>
                    </div>
                       <StatusPill statut={r.statut} />
                  </div>

                  {/* Body */}
                  <div className="flex grow flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <CalenderIcon className="size-4" />
                        Créé le{" "}
                        {new Date(r.dateCreation).toLocaleDateString("fr-FR")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <UserIcon className="size-4" />
                        {r.auteur}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs ${chipByImportance(
                          r.importance
                        )}`}
                      >
                        {r.importance === "haute"
                          ? "Haute priorité"
                          : r.importance === "moyenne"
                          ? "Priorité moyenne"
                          : "Basse priorité"}
                      </span>
                    </div>

                    {r.resume && (
                      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                        {r.resume}
                      </p>
                    )}

                    {!!r.motsCles?.length && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {r.motsCles.map((m, i) => (
                          <span
                            key={i}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            #{m}
                          </span>
                        ))}
                      </div>
                    )}

                    {!!r.actionsRecommandees?.length && (
                      <div className="mt-3">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Actions recommandées
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {r.actionsRecommandees.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-800">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-3 py-2 text-xs ${chipByType(
                              r.type
                            )}`}
                          >
                            {typeLabel(r.type)}
                          </span>
                          <span className="rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {r.enfantsConcernes} enfant
                            {r.enfantsConcernes > 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedRapport(r);
                              setShowViewRapport(true);
                            }}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                          >
                            Consulter
                          </button>
                          <button
                            onClick={() => handleExporterRapport(r)}
                            className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <DownloadIcon className="inline size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRapports.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <FileIcon className="mx-auto mb-3 size-10 opacity-70" />
              Aucun rapport ne correspond à vos filtres.
              <div className="mt-3">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterStatut("all");
                  }}
                  className="text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* -------------------- Modal : modèles -------------------- */}
      {showModeleModal && (
        <div className="fixed inset-0 z-[100000]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModeleModal(false)}
          />
          <div className="relative mx-auto mt-8 w-full max-w-3xl px-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Choisir un modèle de rapport
                </h3>
                <button
                  onClick={() => setShowModeleModal(false)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
                {modelesRapports.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-indigo-500 dark:border-gray-800 dark:hover:border-indigo-500"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                          {m.nom}
                        </div>
                        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          {m.description}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-500 dark:text-gray-500">
                            ⏱️ {m.tempsEstime} min
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-xs ${chipByType(
                              m.type
                            )}`}
                          >
                            {typeLabel(m.type)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCreerRapport(m)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Utiliser
                      </button>
                    </div>

                    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
                      <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sections incluses
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.sections.map((s, i) => (
                          <span
                            key={i}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                <button className="w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 transition-colors hover:border-indigo-500 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-500">
                  + Créer un modèle personnalisé
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- Modal : Consultation -------------------- */}
      {showViewRapport && selectedRapport && (
        <RapportViewModal
          rapport={selectedRapport}
          onClose={() => setShowViewRapport(false)}
          onExport={() => handleExporterRapport(selectedRapport)}
        />
      )}

      {/* -------------------- Section Export & résumé -------------------- */}
 
<div className="mt-8 space-y-6">

  {/* Carte principale en verre avec bordure dégradée */}
  <section className="relative overflow-hidden rounded-3xl p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur shadow-xl">
    {/* halos décoratifs */}
    <span aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
    <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

    {/* En-tête */}
    <header className="relative z-10 mb-6 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          📤 Export & partage
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Partagez vos rapports en un clic, avec des formats propres et professionnels.
        </p>
      </div>

      <span className="rounded-full bg-gradient-to-r from-blue-600/10 to-fuchsia-600/10 px-3 py-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-400/20">
        Recommandé
      </span>
    </header>

    {/* Actions principales */}
    <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Carte Action */}
      <button
        onClick={() => {/* TODO: hook export PDF global ou dernier rapport */}}
        className="group relative overflow-hidden rounded-2xl p-5 text-left
                   bg-white dark:bg-slate-900
                   border border-slate-200/80 dark:border-white/10
                   hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-2xl shadow-lg">📄</div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 dark:text-white">Export PDF</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Mise en page pro + en-tête</div>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div className="h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 group-hover:w-full transition-[width] duration-700" />
        </div>
      </button>

      <button
        onClick={() => {/* TODO: hook envoi email */}}
        className="group relative overflow-hidden rounded-2xl p-5 text-left
                   bg-white dark:bg-slate-900
                   border border-slate-200/80 dark:border-white/10
                   hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-2xl shadow-lg">📧</div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 dark:text-white">Envoyer par email</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Lien sécurisé pour les parents</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Tracking ouvertures</span>
          <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">Journal d’envoi</span>
        </div>
      </button>

      <button
        onClick={() => {/* TODO: hook impression */}}
        className="group relative overflow-hidden rounded-2xl p-5 text-left
                   bg-white dark:bg-slate-900
                   border border-slate-200/80 dark:border-white/10
                   hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-rose-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-2xl shadow-lg">🖨️</div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 dark:text-white">Imprimer</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Version papier optimisée</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Marges auto</span>
          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">En-têtes de page</span>
        </div>
      </button>
    </div>

    {/* Ligne d’aide */}
    <div className="relative z-10 mt-5 flex items-center justify-between rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3">
      <div className="text-xs text-slate-600 dark:text-slate-300">
        Astuce : <span className="font-semibold">glissez</span> un rapport sur un bouton pour pré-remplir l’action.
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        Raccourcis : <kbd className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-white/10">E</kbd> Export · <kbd className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-white/10">M</kbd> Mail · <kbd className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-white/10">P</kbd> Print
      </div>
    </div>
  </section>

  {/* Barre récap & actions globales */}
  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur p-5">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">{rapports.length} rapports</span> gérés dans le système
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {/* TODO: exporter tous les rapports */}}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 3v12m0 0l3.5-3.5M12 15l-3.5-3.5M3 21h18"/></svg>
          Exporter tout
        </button>

        <button
          onClick={() => {/* TODO: générer rapport mensuel */}}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700"
        >
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-sky-400/10 via-white/10 to-fuchsia-400/10" />
          <span className="relative z-10">Générer rapport mensuel</span>
        </button>

        <button
          onClick={() => {/* TODO: planifier envoi */}}
          className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:border-white/10 dark:hover:bg-white/10"
        >
          Planifier un envoi
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

/* -------------------- Modal “Consulter” -------------------- */
function RapportViewModal({
  rapport,
  onClose,
  onExport,
}: {
  rapport: Rapport;
  onClose: () => void;
  onExport: () => void;
}) {
  const tone = typeTone(rapport.type);
  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative z-[100001] mx-auto my-8 w-full max-w-5xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div
            className={`flex items-center justify-between bg-gradient-to-r ${toneBg(
              tone
            )} px-6 py-4 text-white`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center  text-xl">
                {typeIcon(rapport.type)}
              </div>
              <div>
                <div className="text-lg font-semibold">{rapport.titre}</div>
                <div className="text-xs opacity-90">
                  {rapport.periode} • {rapport.enfantsConcernes} enfant
                  {rapport.enfantsConcernes > 1 ? "s" : ""}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill statut={rapport.statut} />
              <TypePill type={rapport.type} />
              <button
                onClick={onClose}
                className="ml-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-5">
            {/* En-tête centré */}
            <div className="mb-2 border-b pb-5 text-center">
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                Rapport Pédagogique
              </div>
              <div className="mb-4 text-xl text-blue-600 dark:text-blue-400">
                {rapport.titre}
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                  <CalenderIcon className="size-4" />
                  {rapport.periode}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                  <UserIcon className="size-4" /> Éducateur : {rapport.auteur}
                </span>
              </div>
            </div>

            {/* Spécifique individuels : message + tableau progression */}
            {(rapport.type === "individuel_hebdomadaire" ||
              rapport.type === "individuel_quotidien") && (
              <div className="space-y-6">
                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:border-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-800">
                      <span className="text-xl">👨‍👩‍👧</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Message aux parents
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Observations détaillées sur votre enfant
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/60 p-4 dark:bg-gray-800/60">
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Cher(s) parent(s),</span>{" "}
                      voici un aperçu des progrès et points d’appui
                      constatés durant la période.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                    📊 Tableau de développement
                  </h4>
                  <ProgressRow label="Développement social" color="green" pct={90} note="Excellent" />
                  <ProgressRow label="Compétences cognitives" color="blue" pct={85} note="Très bon" />
                  <ProgressRow label="Expression émotionnelle" color="amber" pct={75} note="En progression" />
                </div>
              </div>
            )}

            {/* Résumé / Observations */}
            {rapport.resume && (
              <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-5 dark:border-emerald-800 dark:from-emerald-900/20 dark:to-green-900/20">
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                  🔍 Résumé & Observations
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{rapport.resume}</p>
              </div>
            )}

            {/* Actions recommandées */}
            {!!rapport.actionsRecommandees?.length && (
              <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                  💡 Recommandations
                </h4>
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {rapport.actionsRecommandees.map((a, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mots clés */}
            {!!rapport.motsCles?.length && (
              <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                  🔖 Mots-clés
                </h4>
                <div className="flex flex-wrap gap-1">
                  {rapport.motsCles.map((m, i) => (
                    <span
                      key={i}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      #{m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Signature */}
            <div className="border-t border-gray-200 pt-5 dark:border-gray-800">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                    📞 Contact
                  </h5>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      Éducateur :{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {rapport.auteur}
                      </span>
                    </p>
                    <p>Disponibilités : Lundi & Jeudi 16h30–17h30</p>
                    <p>Email : educateur@ecole-exemple.fr</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block border-t border-gray-300 pt-4 dark:border-gray-700">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {rapport.auteur}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Éducateur/Éducatrice
                    </p>
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      Établi le{" "}
                      {new Date().toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Rapport #{rapport.id} • Créé le{" "}
              {new Date(rapport.dateCreation).toLocaleDateString("fr-FR")}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Fermer
              </button>
              <button
                onClick={onExport}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700"
              >
                <DownloadIcon className="size-4" />
                Télécharger pour les parents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Ligne de progression (modal) -------------------- */
function ProgressRow({
  label,
  pct,
  note,
  color,
}: {
  label: string;
  pct: number;
  note: string;
  color: "green" | "blue" | "amber";
}) {
  const tone =
    color === "green"
      ? "from-green-500 to-emerald-600"
      : color === "amber"
      ? "from-amber-500 to-orange-600"
      : "from-sky-500 to-blue-600";
  const noteColor =
    color === "green"
      ? "text-green-600 dark:text-green-500"
      : color === "amber"
      ? "text-amber-600 dark:text-amber-500"
      : "text-blue-600 dark:text-blue-500";
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className={`font-medium ${noteColor}`}>{note}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${tone} transition-[width] duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
