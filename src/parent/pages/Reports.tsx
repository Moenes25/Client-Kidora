// src/parent/pages/Reports.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/Modal";
import { DownloadIcon, EyeIcon, CalenderIcon, AngleLeftIcon } from "../../icons";


/* -------------------------------- Types -------------------------------- */
interface Competence {
  nom: string;
  niveau: number; // 0..100
}
type TRapportType = "quotidien" | "hebdomadaire" | "trimestriel" | "special";
type TRapportStatut = "nouveau" | "lu" | "archive";

interface Rapport {
  id: number;
  enfant: string;
  type: TRapportType;
  titre: string;
  date: string;
  educateur: string;
  statut: TRapportStatut;
  resume: string;
  pointsForts: string[];
  recommandations: string[];
  competences: Competence[];
}

/* -------------------------- Meta d'interface UI ------------------------- */
const typeMeta: Record<
  TRapportType,
  { label: string; chip: string; grad: string; emoji: string }
> = {
  quotidien: {
    label: "Quotidien",
    chip:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    grad: "from-emerald-500 to-green-400",
    emoji: "📅",
  },
  hebdomadaire: {
    label: "Hebdomadaire",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    grad: "from-sky-500 to-blue-500",
    emoji: "📊",
  },
  trimestriel: {
    label: "Trimestriel",
    chip:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    grad: "from-violet-500 to-fuchsia-500",
    emoji: "📈",
  },
  special: {
    label: "Spécial",
    chip:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    grad: "from-amber-500 to-orange-500",
    emoji: "⭐",
  },
};

const statutMeta: Record<TRapportStatut, string> = {
  nouveau:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  lu: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  archive:
    "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
};

/* ---------------------------- Petits composants ---------------------------- */
function Chip({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function Bar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const color =
    v >= 90 ? "bg-green-500" : v >= 80 ? "bg-blue-500" : v >= 70 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div className={`h-full ${color}`} style={{ width: `${v}%` }} />
    </div>
  );
}

/* -------------------------------- Données -------------------------------- */
const enfants = [
  { id: 1, name: "Ahmed Ben Salah", avatar: "/images/3-4_ans/enfant_1.jpg" },
  { id: 2, name: "Sara Ben Salah", avatar: "/images/3-4_ans/enfant_3.jpg" },
  { id: 3, name: "Mohamed Ben Salah", avatar: "/images/3-4_ans/enfant_6.jpg" },
  { id: 4, name: "Nour Ben Salah", avatar: "/images/3-4_ans/enfant_4.jpg" },
];

const rapportsSeed: Rapport[] = [
  {
    id: 1,
    enfant: "Ahmed Ben Salah",
    type: "hebdomadaire",
    titre: "Progrès en Mathématiques et Socialisation",
    date: "12/01/2024",
    educateur: "Mme Fatma",
    statut: "nouveau",
    resume:
      "Excellent progrès cette semaine en mathématiques. Ahmed montre une grande curiosité et participe activement aux activités de groupe.",
    pointsForts: ["Calcul mental", "Travail d'équipe", "Curiosité"],
    recommandations: [
      "Continuer les exercices de logique",
      "Encourager le tutorat des plus jeunes",
    ],
    competences: [
      { nom: "Mathématiques", niveau: 92 },
      { nom: "Socialisation", niveau: 88 },
      { nom: "Langage", niveau: 85 },
    ],
  },
  {
    id: 2,
    enfant: "Sara Ben Salah",
    type: "quotidien",
    titre: "Bilan de la Journée - Participation Active",
    date: "10/01/2024",
    educateur: "Mme Amina",
    statut: "lu",
    resume:
      "Journée productive pour Sara. Excellente participation aux activités et bonnes interactions sociales.",
    pointsForts: ["Participation", "Créativité", "Empathie"],
    recommandations: ["Encourager l'expression orale", "Activités de groupe"],
    competences: [
      { nom: "Participation", niveau: 95 },
      { nom: "Créativité", niveau: 90 },
      { nom: "Motricité fine", niveau: 87 },
    ],
  },
  {
    id: 3,
    enfant: "Mohamed Ben Salah",
    type: "trimestriel",
    titre: "Évaluation Trimestrielle Complète",
    date: "05/01/2024",
    educateur: "M. Karim",
    statut: "lu",
    resume:
      "Développement harmonieux dans tous les domaines. Excellente progression en sciences et sport.",
    pointsForts: ["Sciences", "Sport", "Leadership"],
    recommandations: [
      "Activités scientifiques supplémentaires",
      "Encadrement d'activités sportives",
    ],
    competences: [
      { nom: "Sciences", niveau: 89 },
      { nom: "Sport", niveau: 94 },
      { nom: "Leadership", niveau: 82 },
    ],
  },
  {
    id: 4,
    enfant: "Nour Ben Salah",
    type: "quotidien",
    titre: "Suivi Motricité Fine",
    date: "03/01/2024",
    educateur: "Mme Amina",
    statut: "nouveau",
    resume:
      "Amélioration significative en motricité fine. Nour montre plus de précision dans ses gestes.",
    pointsForts: ["Persévérance", "Concentration", "Précision"],
    recommandations: ["Exercices de découpage", "Jeux de construction fins"],
    competences: [
      { nom: "Motricité fine", niveau: 78 },
      { nom: "Concentration", niveau: 85 },
      { nom: "Patience", niveau: 80 },
    ],
  },
  {
    id: 5,
    enfant: "Ahmed Ben Salah",
    type: "quotidien",
    titre: "Suivi Langue Française",
    date: "05/01/2024",
    educateur: "Mme Fatma",
    statut: "archive",
    resume:
      "Bon progrès en vocabulaire. Doit travailler la conjugaison des verbes.",
    pointsForts: ["Vocabulaire", "Expression orale"],
    recommandations: ["Lire quotidiennement", "Exercices de conjugaison"],
    competences: [
      { nom: "Vocabulaire", niveau: 88 },
      { nom: "Conjugaison", niveau: 75 },
      { nom: "Compréhension", niveau: 82 },
    ],
  },
  {
    id: 6,
    enfant: "Sara Ben Salah",
    type: "trimestriel",
    titre: "Bilan Trimestriel Développement Global",
    date: "15/12/2023",
    educateur: "Mme Amina",
    statut: "lu",
    resume:
      "Progression remarquable dans tous les domaines. Sara montre une grande maturité.",
    pointsForts: ["Lecture", "Raisonnement", "Autonomie"],
    recommandations: ["Livres plus complexes", "Projets personnels"],
    competences: [
      { nom: "Lecture", niveau: 96 },
      { nom: "Raisonnement", niveau: 92 },
      { nom: "Autonomie", niveau: 89 },
    ],
  },
  {
    id: 7,
    enfant: "Mohamed Ben Salah",
    type: "hebdomadaire",
    titre: "Rapport Hebdomadaire - Activités Physiques",
    date: "08/01/2024",
    educateur: "M. Karim",
    statut: "lu",
    resume:
      "Bonne semaine d'activités physiques. Mohamed montre de l'endurance et du leadership.",
    pointsForts: ["Endurance", "Coordination", "Esprit d'équipe"],
    recommandations: ["Sports collectifs", "Entraînements réguliers"],
    competences: [
      { nom: "Endurance", niveau: 91 },
      { nom: "Coordination", niveau: 88 },
      { nom: "Esprit d'équipe", niveau: 85 },
    ],
  },
];

/* --------------------------------- Page --------------------------------- */
export default function ParentReportsPage() {
  const { childId } = useParams<{ childId?: string }>();
  const navigate = useNavigate();

  const [data] = useState<Rapport[]>(rapportsSeed);
  const [selectedChild, setSelectedChild] = useState<string>("Tous les enfants");
  const [filterType, setFilterType] = useState<TRapportType | "all">("all");
  const [filterStatut, setFilterStatut] = useState<TRapportStatut | "all">(
    "all"
  );
  
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
 const [selectedRapport, setSelectedRapport] = useState<Rapport | null>(null);

  // 👉 ref du contenu à imprimer (tout le panel du modal)
  const modalPrintRef = useRef<HTMLDivElement | null>(null);
function createPdfClone(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;

  // 1️⃣ Supprimer tous les SVG (cause principale de oklch)
  clone.querySelectorAll("svg").forEach(el => el.remove());

  // 2️⃣ Supprimer toutes les classes Tailwind problématiques
  clone.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");

    const htmlEl = el as HTMLElement;
    htmlEl.style.all = "unset";
    htmlEl.style.color = "#000";
    htmlEl.style.background = "#fff";
    htmlEl.style.backgroundColor = "#fff";
    htmlEl.style.boxShadow = "none";
    htmlEl.style.borderColor = "#000";
    htmlEl.style.fontFamily = "Arial, Helvetica, sans-serif";
    htmlEl.style.fontSize = "12px";
  });

  // 3️⃣ Style minimal PDF
  clone.style.padding = "24px";
  clone.style.width = "794px"; // A4 px
  clone.style.background = "#fff";
  clone.style.color = "#000";

  return clone;
}
const handleDownloadPDFVisual = async (fileBaseName: string) => {
  const el = modalPrintRef.current;
  if (!el) return;

  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  // 🔥 CLONE PDF SAFE
  const pdfNode = createPdfClone(el);

  // Injecter hors écran
  pdfNode.style.position = "fixed";
  pdfNode.style.top = "-10000px";
  pdfNode.style.left = "0";
  document.body.appendChild(pdfNode);

  try {
    const canvas = await html2canvas(pdfNode, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`${fileBaseName}.pdf`);
  } finally {
    document.body.removeChild(pdfNode);
  }
};



  /* Sélection auto de l'enfant via l'URL */
  useEffect(() => {
    if (childId) {
      const e = enfants.find((x) => x.id.toString() === childId);
      setSelectedChild(e ? e.name : "Tous les enfants");
    } else {
      setSelectedChild("Tous les enfants");
    }
  }, [childId]);

  /* Filtres & recherche */
  const filtered = useMemo(() => {
    return data.filter((r) => {
      if (selectedChild !== "Tous les enfants" && r.enfant !== selectedChild)
        return false;
      if (filterType !== "all" && r.type !== filterType) return false;
      if (filterStatut !== "all" && r.statut !== filterStatut) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const blob =
          `${r.titre} ${r.resume} ${r.enfant} ${r.educateur} ${r.pointsForts.join(" ")} ${r.recommandations.join(" ")}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [data, selectedChild, filterType, filterStatut, query]);

  /* Stats mini */
  const stats = useMemo(() => {
    return {
      total: filtered.length,
      nonLus: filtered.filter((r) => r.statut === "nouveau").length,
      parType: {
        quotidien: filtered.filter((r) => r.type === "quotidien").length,
        hebdomadaire: filtered.filter((r) => r.type === "hebdomadaire").length,
        trimestriel: filtered.filter((r) => r.type === "trimestriel").length,
        special: filtered.filter((r) => r.type === "special").length,
      },
    };
  }, [filtered]);

  const currentChild = enfants.find(
    (e) => childId && e.id.toString() === childId
  );

  /* ------------------------------ PDF export ------------------------------ */


const KIDORA_LOGO_URL = "/logo.png";

const handleDownloadPDF = async (rapport: Rapport) => {
  const { jsPDF } = await import("jspdf");

  /* ------------------ util: logo ------------------ */
  const toDataUrl = async (url: string) => {
    const res = await fetch(url, { cache: "force-cache" });
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.readAsDataURL(blob);
    });
  };

  const doc = new jsPDF("p", "mm", "a4");

  /* ------------------ Config globale ------------------ */
  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;

  const HEADER_H = 26;
  const FOOTER_H = 14;

  let y = margin + HEADER_H;
  let pageNumber = 1;

  const brand = {
    violet: [109, 40, 217],
    slate: [15, 23, 42],
    gray: [100, 116, 139],
    light: [248, 250, 252],
  };

  /* ------------------ helpers ------------------ */
  const ensurePage = (need = 0) => {
    if (y + need > pageHeight - margin - FOOTER_H) {
      doc.addPage();
      pageNumber++;
      drawHeader();
      drawFooter();
      y = margin + HEADER_H;
    }
  };

  const space = (h = 6) => {
    y += h;
    ensurePage(0);
  };

  /* ------------------ UI helpers ------------------ */
  const title = (text: string) => {
    ensurePage(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...brand.slate);
    doc.text(text, margin, y);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(margin, y + 2, margin + 70, y + 2);

    space(14);
  };

  const section = (text: string) => {
    ensurePage(20);

    doc.setFillColor(...brand.light);
    doc.roundedRect(margin, y - 6, contentWidth, 14, 3, 3, "F");

    doc.setFillColor(...brand.violet);
    doc.roundedRect(margin, y - 6, 3, 14, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...brand.slate);
    doc.text(text.toUpperCase(), margin + 7, y + 3);

    space(18);
  };

  const kv = (label: string, value: string) => {
    ensurePage(8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...brand.gray);
    doc.text(label.toUpperCase(), margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(17, 24, 39);

    const wrapped = doc.splitTextToSize(value, contentWidth - 60);
    doc.text(wrapped, margin + 60, y);

    space(8);
  };

  const textBlock = (value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);

    const wrapped = doc.splitTextToSize(value, contentWidth - 4);
    ensurePage(wrapped.length * 6 + 6);
    doc.text(wrapped, margin + 2, y);

    y += wrapped.length * 6;
    space(6);
  };

  const bullet = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(31, 41, 55);

    items.forEach((it) => {
      const wrapped = doc.splitTextToSize(it, contentWidth - 10);
      ensurePage(wrapped.length * 6 + 2);

      doc.circle(margin + 2, y - 1.5, 1, "F");
      doc.text(wrapped, margin + 8, y);

      y += wrapped.length * 6;
      space(2);
    });
  };

  const progressBar = (label: string, value: number) => {
    ensurePage(14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(label, margin, y);

    doc.setFont("helvetica", "normal");
    doc.text(`${value}%`, pageWidth - margin, y, { align: "right" });

    space(3);

    const barW = contentWidth;
    const filled = (barW * value) / 100;

    doc.setFillColor(226, 232, 240);
    doc.roundedRect(margin, y, barW, 4, 2, 2, "F");

    doc.setFillColor(
      value >= 85 ? 34 : value >= 70 ? 245 : 244,
      value >= 85 ? 197 : value >= 70 ? 158 : 63,
      value >= 85 ? 94 : value >= 70 ? 11 : 94
    );
    doc.roundedRect(margin, y, Math.max(3, filled), 4, 2, 2, "F");

    space(10);
  };

  /* ------------------ Header / Footer ------------------ */
  const drawHeader = (logo?: string) => {
    doc.setFillColor(...brand.violet);
    doc.rect(0, 0, pageWidth, 10, "F");

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin - 4, 10, pageWidth - (margin - 4) * 2, HEADER_H - 6, 3, 3, "F");

    if (logo) doc.addImage(logo, "PNG", margin, 13, 14, 14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39);
    doc.text("KIDORA", margin + 20, 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("Rapport pédagogique", margin + 20, 24);

    doc.text(`Rapport #${rapport.id}`, pageWidth - margin, 18, { align: "right" });
    doc.text(rapport.date, pageWidth - margin, 24, { align: "right" });
  };

  const drawFooter = () => {
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - FOOTER_H, pageWidth - margin, pageHeight - FOOTER_H);

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Rapport pédagogique • ${rapport.enfant}`, margin, pageHeight - 6);
    doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 6, { align: "right" });
  };

  /* ------------------ Init ------------------ */
  let logo;
  try { logo = await toDataUrl(KIDORA_LOGO_URL); } catch {}
  drawHeader(logo);
  drawFooter();

  /* ------------------ Contenu ------------------ */
  title("Rapport Pédagogique");

  doc.setFontSize(13);
  doc.setTextColor(67, 56, 202);
  doc.text(rapport.titre, margin, y);
  space(10);

  section("Informations générales");
  kv("Enfant", rapport.enfant);
  kv("Type", typeMeta[rapport.type].label);
  kv("Date", rapport.date);
  kv("Éducateur", rapport.educateur);

  section("Résumé exécutif");
  textBlock(rapport.resume);

  section("Compétences évaluées");
  rapport.competences.forEach(c => progressBar(c.nom, c.niveau));

  section("Points forts");
  bullet(rapport.pointsForts);

  section("Recommandations pour la maison");
  bullet(rapport.recommandations);

  /* ------------------ Save ------------------ */
  doc.save(
    `Rapport_${rapport.enfant.replace(/\s+/g, "_")}_${rapport.date.replace(/\//g, "-")}.pdf`
  );
};




  /* -------------------------------- Render -------------------------------- */

  return (
    <>
      <PageMeta
        title={
          currentChild
            ? `Rapports - ${currentChild.name}`
            : "Rapports Pédagogiques | Espace Parent"
        }
        description="Consultez les rapports détaillés sur le développement de vos enfants"
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {childId && (
              <Link
                to="/parent/enfants"
                className="mb-2 inline-flex items-center gap-2 text-sky-600 hover:underline"
              >
                <AngleLeftIcon className="size-4" />
                Retour aux enfants
              </Link>
            )}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentChild
                ? `Rapports de ${currentChild.name}`
                : "Rapports pédagogiques"}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {currentChild
                ? `Suivez le développement de ${currentChild.name.split(" ")[0]}`
                : "Suivez le développement de vos enfants grâce aux rapports des éducateurs"}
            </p>
          </div>

          {/* mini stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {stats.total}
              </div>
              <div className="text-[11px] text-slate-500">Total</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-lg font-bold text-rose-600 dark:text-rose-300">
                {stats.nonLus}
              </div>
              <div className="text-[11px] text-slate-500">Non lus</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {stats.parType.hebdomadaire}
              </div>
              <div className="text-[11px] text-slate-500">Hebdo</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {stats.parType.trimestriel}
              </div>
              <div className="text-[11px] text-slate-500">Trimestriels</div>
            </div>
          </div>
        </div>

        {/* Filtres & recherche */}
        <div className="relative z-10 mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
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
                placeholder="Rechercher dans les rapports…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!childId && (
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/5"
              >
                <option value="Tous les enfants">Tous les enfants</option>
                {enfants.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            )}

            {/* Pills Type */}
            {(["all", "quotidien", "hebdomadaire", "trimestriel", "special"] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    filterType === t
                      ? `bg-gradient-to-r ${
                          t === "all" ? "from-slate-500 to-slate-400" : typeMeta[t as TRapportType].grad
                        } text-white shadow`
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80"
                  }`}
                >
                  {t === "all" ? "Tous" : typeMeta[t as TRapportType].label}
                </button>
              )
            )}

            {/* Statut */}
            {(["all", "nouveau", "lu", "archive"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatut(s as any)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  filterStatut === s
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80"
                }`}
              >
                {s === "all" ? "Tout statut" : s === "lu" ? "Lu" : s === "archive" ? "Archivé" : "Nouveau"}
              </button>
            ))}

            {/* Vue */}
            <div className="ml-2 rounded-lg bg-slate-100 p-1 dark:bg-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm dark:bg白/90".replace("白","white")
                    : "text-slate-600 dark:text-white/80"
                }`}
              >
                Grille
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-white/90"
                    : "text-slate-600 dark:text-white/80"
                }`}
              >
                Liste
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LISTES */}
      {viewMode === "grid" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const t = typeMeta[r.type];
            return (
              <article
                key={r.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
              >
                {/* Accent dégradé */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${t.grad}`}
                />
                {/* Badge & actions */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip className={t.chip}>
                      <span className="mr-1">{t.emoji}</span>
                      {t.label}
                    </Chip>
                    <Chip className={statutMeta[r.statut]}>
                      {r.statut === "nouveau"
                        ? "Nouveau"
                        : r.statut === "lu"
                        ? "Lu"
                        : "Archivé"}
                    </Chip>
                  </div>
                </div>

                <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {r.titre}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <CalenderIcon className="size-3.5" />
                    {r.date}
                  </span>
                  {!childId && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="inline-flex items-center gap-1">
                        <span>👶</span>
                        {r.enfant.split(" ")[0]}
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-3 line-clamp-3 text-sm text-slate-700 dark:text-slate-300">
                  {r.resume}
                </p>

                {/* Compétences (2 aperçus) */}
                <div className="mt-4 space-y-2">
                  {r.competences.slice(0, 2).map((c, i) => (
                    <div key={i} className="text-xs">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium">{c.nom}</span>
                        <span>{c.niveau}%</span>
                      </div>
                      <Bar value={c.niveau} />
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Éducateur : {r.educateur}
                    </span>
                    <button
                      onClick={() => setSelectedRapport(r)}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
                    >
                      <EyeIcon className="size-4" />
                      Consulter
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((r) => {
            const t = typeMeta[r.type];
            return (
              <article
                key={r.id}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${t.grad}`}
                />
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Chip className={t.chip}>
                        <span className="mr-1">{t.emoji}</span>
                        {t.label}
                      </Chip>
                      <Chip className={statutMeta[r.statut]}>
                        {r.statut === "nouveau"
                          ? "Nouveau"
                          : r.statut === "lu"
                          ? "Lu"
                          : "Archivé"}
                      </Chip>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {r.titre}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <CalenderIcon className="size-4" />
                        {r.date}
                      </span>
                      {!childId && (
                        <span className="inline-flex items-center gap-1">
                          <span>👶</span>
                          {r.enfant}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <span>👩‍🏫</span>
                        {r.educateur}
                      </span>
                    </div>

                    <p className="mt-3 text-slate-700 dark:text-slate-300">
                      {r.resume}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.pointsForts.map((p, i) => (
                        <Chip
                          key={i}
                          className="bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                        >
                          {p}
                        </Chip>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 ml-22">
                      {r.competences.map((c, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-slate-200 p-3 text-center dark:bg-slate-800/50"
                        >
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            {c.nom}
                          </div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">
                            {c.niveau}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-[200px] space-y-2">
                    <button
                      onClick={() => setSelectedRapport(r)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <EyeIcon className="size-4" />
                      Consulter
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-slate-900">
          <div className="text-4xl">📄</div>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {currentChild
              ? `Aucun rapport trouvé pour ${currentChild.name}`
              : "Aucun rapport trouvé avec ces critères"}
          </p>
          {childId && (
            <button
              onClick={() => navigate("/parent/enfants")}
              className="mt-2 text-sky-600 hover:underline"
            >
              Retour à la liste des enfants
            </button>
          )}
        </div>
      )}

      {/* MODAL */}
    {selectedRapport && (
  <Modal
    open={!!selectedRapport}
    onClose={() => setSelectedRapport(null)}
    className="max-h-[70vh] md:max-h-[85vh] flex flex-col mt-14"
  >
    {/* 👉👉👉 AJOUT : on entoure tout le panel par la ref */}
     <div ref={modalPrintRef} className="flex min-h-0 flex-1 flex-col">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-12 w-12 place-items-center rounded-lg text-2xl text-white ring-4 ring-white/40 dark:ring-white/20 bg-gradient-to-br ${typeMeta[selectedRapport.type].grad}`}
          >
            {typeMeta[selectedRapport.type].emoji}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Rapport {typeMeta[selectedRapport.type].label}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pour les parents • {selectedRapport.date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">

          <button
            onClick={() => setSelectedRapport(null)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white/80"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      </div>

          {/* Body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {/* En-tête élégant */}
            <div className="mb-6 border-b pb-6 text-center">
              <div className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
                Rapport Pédagogique
              </div>
              <div className="mb-4 text-xl text-sky-600 dark:text-sky-400">
                {selectedRapport.titre}
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">
                  <CalenderIcon className="size-4" />
                  {selectedRapport.date}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">
                  <span>👩‍🏫</span>
                  {selectedRapport.educateur}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${typeMeta[selectedRapport.type].chip}`}>
                  {typeMeta[selectedRapport.type].label}
                </span>
              </div>
            </div>

            {/* Résumé */}
            <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-5 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 className="mb-2 flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                <span>📋</span> Résumé exécutif
              </h4>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                {selectedRapport.resume}
              </p>
            </div>

            {/* Tableau compétences */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                <span>📊</span> Tableau de développement
              </h4>
              <div className="space-y-4">
                {selectedRapport.competences.map((c, i) => (
                  <div key={i}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {c.nom}
                      </span>
                      <span
                        className={`font-medium ${
                          c.niveau >= 90
                            ? "text-green-600 dark:text-green-400"
                            : c.niveau >= 80
                            ? "text-blue-600 dark:text-blue-400"
                            : c.niveau >= 70
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {c.niveau >= 90
                          ? "Excellent"
                          : c.niveau >= 80
                          ? "Très bon"
                          : c.niveau >= 70
                          ? "Bon"
                          : "À améliorer"}
                      </span>
                    </div>
                    <Bar value={c.niveau} />
                  </div>
                ))}
              </div>
            </div>

            {/* Points forts */}
            <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 p-5 dark:from-emerald-900/20 dark:to-green-900/20">
              <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                <span>⭐</span> Points forts identifiés
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {selectedRapport.pointsForts.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/70 p-3 dark:bg-white/5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          i === 0
                            ? "bg-emerald-500"
                            : i === 1
                            ? "bg-sky-500"
                            : "bg-violet-500"
                        }`}
                      />
                      <span className="font-medium text-slate-800 dark:text-slate-300">
                        Point fort {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {p}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-sky-50 p-5 dark:from-indigo-900/20 dark:to-sky-900/20">
              <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                <span>💡</span> Suggestions pour la maison
              </h4>
              <div className="space-y-3">
                {selectedRapport.recommandations.map((reco, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        i === 0
                          ? "bg-violet-100 dark:bg-violet-800/50"
                          : i === 1
                          ? "bg-sky-100 dark:bg-sky-800/50"
                          : "bg-emerald-100 dark:bg-emerald-800/50"
                      }`}
                    >
                      <span className="text-xl">
                        {i === 0 ? "📚" : i === 1 ? "🎮" : "🗣️"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-300">
                        {i === 0
                          ? "Lecture quotidienne"
                          : i === 1
                          ? "Jeux éducatifs"
                          : "Dialoguer sur les émotions"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {reco}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-slate-800/40">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Rapport #{selectedRapport.id} • Enfant : {selectedRapport.enfant}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedRapport(null)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          >
            Fermer
          </button>
          {/* 👉 Ce bouton utilise aussi la capture visuelle */}
          <button
           onClick={() => handleDownloadPDF(selectedRapport)}

            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700"
          >
            <DownloadIcon className="size-4" />
            Télécharger
          </button>
        </div>
      </div>
    </div>
    {/* 👆 fin du wrapper ref */}
  </Modal>
      )}
    </>
  );
}
