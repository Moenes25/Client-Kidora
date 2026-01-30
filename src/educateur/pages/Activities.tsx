import PageMeta from "../../components/common/PageMeta";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Calendar } from "lucide-react";
import {
  UserIcon,
  CalenderIcon,
  EyeIcon,
  PlusIcon,
  CloseIcon,
  CheckCircleIcon,
  MailIcon,
} from "../../icons";

/* -------------------- Types -------------------- */
interface Activite {
  id: number;
  titre: string;
  description: string;
  type: "creatif" | "sportif" | "educatif" | "musical" | "nature" | "social";
  duree: number; // minutes
  date: string;  // YYYY-MM-DD
  heure: string; // HH:mm
  classe: string;
  enfantsInscrits: number;
  enfantsMax: number;
  materiel: string[];
  objectifs: string[];
  observation?: string;
  photo?: string;
  statut: "planifie" | "en_cours" | "termine" | "annule";
  evaluations?: EvaluationEnfant[];
}

interface EvaluationEnfant {
  enfantId: number;
  nom: string;
  photo?: string;
  participation: "excellente" | "bonne" | "moyenne" | "faible" | "absente";
  observations: string;
  competencesAcquises: string[];
  besoinAide: boolean;
  note: number; // 1-5
}

/* -------------------- Helpers visuels -------------------- */
const typeIcon = (t: Activite["type"]) =>
  t === "creatif" ? "🎨" :
  t === "sportif" ? "⚽" :
  t === "educatif" ? "📚" :
  t === "musical" ? "🎵" :
  t === "nature" ? "🌱" : "👥";

const typeTone = (t: Activite["type"]) =>
  t === "creatif" ? "purple" :
  t === "sportif" ? "emerald" :
  t === "educatif" ? "indigo" :
  t === "musical" ? "amber" :
  t === "nature" ? "green" : "pink";

const toneBg = (tone: string) =>
  ({
    purple: "from-purple-500 to-fuchsia-600",
    emerald: "from-emerald-500 to-teal-600",
    indigo: "from-indigo-500 to-violet-600",
    amber: "from-amber-500 to-orange-600",
    green: "from-green-500 to-emerald-600",
    pink: "from-pink-500 to-rose-600",
  }[tone] || "from-slate-500 to-slate-600");

const chipByType = (t: Activite["type"]) =>
  ({
    creatif: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    sportif: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    educatif: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    musical: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    nature: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    social: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  }[t]);

const chipByStatut = (s: Activite["statut"]) =>
  ({
    planifie: "text-blue-700 dark:text-blue-300",
    en_cours: "text-amber-700 dark:text-amber-300",
    termine: "text-green-700 dark:text-green-300",
    annule: "text-rose-700 dark:text-rose-300",
  }[s]);

/* Petites puces “pills” lisibles sur un header dégradé */
function StatusPill({ statut }: { statut: Activite["statut"] }) {
  const label = statut === "planifie" ? "Planifié" : statut === "en_cours" ? "En cours" : statut === "termine" ? "Terminé" : "Annulé";
  return (
    <span className={`inline-flex items-center gap-2 dark:text-slate-800  rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 ${chipByStatut(statut)}`}>
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${
        statut==="planifie" ? "bg-blue-500" : statut==="en_cours" ? "bg-amber-500" : statut==="termine" ? "bg-green-500" : "bg-rose-500"
      }`} />
      {label}
    </span>
  );
}

function TypePill({ type }: { type: Activite["type"] }) {
  return (
    <span className={`rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 capitalize ${chipByType(type)}`}>
      {type}
    </span>
  );
}

function GlassStat({
  icon,
  label,
  value,
  tone = "indigo",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone?: "indigo" | "green" | "amber" | "pink";
}) {
  const ring =
    tone === "green"
      ? "ring-green-300/50 dark:ring-green-400/20"
      : tone === "amber"
      ? "ring-amber-300/50 dark:ring-amber-400/20"
      : tone === "pink"
      ? "ring-pink-300/50 dark:ring-pink-400/20"
      : "ring-indigo-300/50 dark:ring-indigo-400/20";
  return (
    <div className={`rounded-2xl bg-white/10 p-4 backdrop-blur ring-1 ${ring} shadow-[inset_0_1px_0_rgba(255,255,255,.25)]`}>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20">{icon}</div>
        <div className="min-w-0">
          <div className="text-xs text-white/80">{label}</div>
          <div className="truncate text-2xl font-extrabold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function CapacityBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Capacité</span>
        <span>{value}/{max} ({pct}%)</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      {children}
    </span>
  );
}

/* -------------------- Page -------------------- */
export default function ActivitiesPage() {
  const [showAjouterActivite, setShowAjouterActivite] = useState(false);
  const [detailActivite, setDetailActivite] = useState<Activite | null>(null); // NEW: modal détails
  const [nouvelleActivite, setNouvelleActivite] = useState({
    titre: "",
    description: "",
    type: "creatif" as const,
    duree: 60,
    date: new Date().toISOString().split("T")[0],
    heure: "09:00",
    classe: "(3-4) ans",
    enfantsMax: 12,
    materiel: [] as string[],
    objectifs: [] as string[],
    statut: "planifie" as const,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [activiteEnCours, setActiviteEnCours] = useState<Activite | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationEnfant[]>([]);

  const [activites, setActivites] = useState<Activite[]>([
    {
      id: 1,
      titre: "Atelier Peinture Libre",
      description: "Expression artistique libre avec différentes techniques de peinture",
      type: "creatif",
      duree: 90,
      date: "2024-01-15",
      heure: "09:30",
      classe: "(3-4) ans",
      enfantsInscrits: 8,
      enfantsMax: 10,
      materiel: ["Peinture", "Pinceaux", "Toiles", "Tabliers"],
      objectifs: ["Créativité", "Coordination main-œil", "Expression des émotions"],
      observation: "Les enfants étaient très enthousiastes, Emma a créé une œuvre remarquable",
      statut: "termine",
    },
    {
      id: 2,
      titre: "Jeux Collectifs au Parc",
      description: "Activités sportives et jeux d'équipe pour développer la coopération",
      type: "sportif",
      duree: 120,
      date: "2024-01-16",
      heure: "10:00",
      classe: "(6-7) ans",
      enfantsInscrits: 15,
      enfantsMax: 18,
      materiel: ["Ballons", "Cônes", "Certificats médicaux"],
      objectifs: ["Travail d'équipe", "Motricité globale", "Respect des règles"],
      statut: "planifie",
    },
    {
      id: 3,
      titre: "Découverte des Instruments",
      description: "Initiation aux différents instruments de musique",
      type: "musical",
      duree: 60,
      date: "2024-01-15",
      heure: "14:00",
      classe: "(4-5) ans",
      enfantsInscrits: 12,
      enfantsMax: 12,
      materiel: ["Tambourins", "Maracas", "Xylophone", "Enregistrements"],
      objectifs: ["Sensibilisation musicale", "Rythme", "Écoute active"],
      observation: "Lucas a montré un intérêt particulier pour le xylophone",
      statut: "en_cours",
    },
    {
      id: 4,
      titre: "Jardinage Éducatif",
      description: "Planter et observer la croissance des plantes",
      type: "nature",
      duree: 75,
      date: "2024-01-17",
      heure: "11:00",
      classe: "Toutes classes",
      enfantsInscrits: 20,
      enfantsMax: 25,
      materiel: ["Graines", "Pots", "Terre", "Arrosoirs"],
      objectifs: ["Patience", "Responsabilité", "Cycle de vie des plantes"],
      statut: "planifie",
    },
    {
      id: 5,
      titre: "Expériences Scientifiques Simples",
      description: "Découverte des sciences par l'expérimentation",
      type: "educatif",
      duree: 80,
      date: "2024-01-14",
      heure: "13:30",
      classe: "(8-9) ans",
      enfantsInscrits: 10,
      enfantsMax: 12,
      materiel: ["Loupes", "Éprouvettes", "Colorants", "Documents"],
      objectifs: ["Curiosité scientifique", "Observation", "Hypothèses"],
      observation: "Fatima a posé des questions très pertinentes",
      statut: "termine",
    },
    {
      id: 6,
      titre: "Atelier Conte et Imagination",
      description: "Création d'histoires et développement du langage",
      type: "social",
      duree: 45,
      date: "2024-01-18",
      heure: "10:30",
      classe: "(3-4) ans",
      enfantsInscrits: 9,
      enfantsMax: 10,
      materiel: ["Livres", "Marionnettes", "Accessoires"],
      objectifs: ["Langage", "Imagination", "Écoute"],
      statut: "planifie",
    },
  ]);

  /* -------------------- Dérivés -------------------- */
  const filteredActivites = useMemo(() => {
    return activites.filter((a) => {
      const q =
        a.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase());
      const t = filterType === "all" || a.type === (filterType as any);
      const s = filterStatut === "all" || a.statut === (filterStatut as any);
      return q && t && s;
    });
  }, [activites, searchTerm, filterType, filterStatut]);

  const kpis = useMemo(() => {
    const plan = activites.filter((a) => a.statut === "planifie").length;
    const enCours = activites.filter((a) => a.statut === "en_cours").length;
    const done = activites.filter((a) => a.statut === "termine").length;
    const inscrits = activites.reduce((n, a) => n + a.enfantsInscrits, 0);
    return { plan, enCours, done, inscrits };
  }, [activites]);

  /* -------------------- Actions -------------------- */
  const ajouterActivite = () => {
    const newActivite: Activite = {
      id: activites.length + 1,
      titre: nouvelleActivite.titre,
      description: nouvelleActivite.description,
      type: nouvelleActivite.type,
      duree: nouvelleActivite.duree,
      date: nouvelleActivite.date,
      heure: nouvelleActivite.heure,
      classe: nouvelleActivite.classe,
      enfantsInscrits: 0,
      enfantsMax: nouvelleActivite.enfantsMax,
      materiel: nouvelleActivite.materiel,
      objectifs: nouvelleActivite.objectifs,
      statut: nouvelleActivite.statut,
    };
    setActivites((prev) => [...prev, newActivite]);
    setShowAjouterActivite(false);
    setNouvelleActivite({
      titre: "",
      description: "",
      type: "creatif",
      duree: 60,
      date: new Date().toISOString().split("T")[0],
      heure: "09:00",
      classe: "(3-4) ans",
      enfantsMax: 12,
      materiel: [],
      objectifs: [],
      statut: "planifie",
    });
    alert("Activité ajoutée avec succès !");
  };

  const demarrerEvaluation = (activite: Activite) => {
    setActiviteEnCours(activite);
    const ev: EvaluationEnfant[] = [
      { enfantId: 1, nom: "Emma Dubois", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 2, nom: "Lucas Martin", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 3, nom: "Fatima Zahra", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 4, nom: "Voussez Alain", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 5, nom: "Chloé Petit", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 6, nom: "Mohamed Ali", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 7, nom: "Léa Bernard", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
      { enfantId: 8, nom: "Thomas Leroy", participation: "bonne", observations: "", competencesAcquises: [], besoinAide: false, note: 3 },
    ].slice(0, activite.enfantsInscrits);
    setEvaluations(ev);
    setShowEvaluationModal(true);
  };

  const sauvegarderEvaluations = () => {
    if (!activiteEnCours) return;
    const maj = activites.map((a) =>
      a.id === activiteEnCours.id ? { ...a, statut: "termine", evaluations: [...evaluations] } : a
    );
    setActivites(maj);
    setShowEvaluationModal(false);
    setActiviteEnCours(null);
    alert("Évaluations sauvegardées avec succès !");
  };

  /* -------------------- Render -------------------- */
  return (
    <>
      <PageMeta title="Gestion des Activités | Système de Gestion" description="Planifiez, gérez et suivez les activités éducatives" />

      {/* HERO créatif */}
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="relative z-10 p-6">
          <h1 className="text-2xl font-bold tracking-tight">Activités ✨</h1>
          <p className="mt-1 text-white/90">Planifiez, animez et suivez les progrès des enfants.</p>

          <div className="mt-4 grid max-w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <GlassStat icon={<CalenderIcon className="size-5 text-white" />} label="Planifiées" value={kpis.plan} />
            <GlassStat icon={<span>⏳</span>} label="En cours" value={kpis.enCours} tone="amber" />
            <GlassStat icon={<CheckCircleIcon className="size-5 text-white" />} label="Terminées" value={kpis.done} tone="green" />
            <GlassStat icon={<UserIcon className="size-5 text-white" />} label="Total enfants" value={kpis.inscrits} tone="pink" />
          </div>
        </div>
      </section>

      {/* Barre sticky : recherche & filtres + actions */}
      <div className="sticky top-2 z-[5] mb-6 rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex flex-1 items-center gap-3">
            
            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher une activité (titre, description)…"
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
                  onChange={(e) => setFilterType(e.target.value)}
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
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="all">🎯 Tous les types</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="creatif">🎨 Créatif</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="sportif">⚽ Sportif</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="educatif">📚 Éducatif</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="musical">🎵 Musical</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="nature">🌱 Nature</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="social">👥 Social</option>
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
                <select value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)} className="w-full appearance-none pl-10 pr-10 py-3 text-sm font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none cursor-pointer transition-all duration-200">
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="all">✓ Tous statuts</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="planifie">📋 Planifié</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="en_cours">⏳ En cours</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="termine">✅ Terminé</option>
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold" value="annule">❌ Annulé</option>
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
                onClick={() => setViewMode("calendar")}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300 min-w-[90px] text-center ${
                  viewMode === "calendar"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                📅 Calendrier
              </button>
            </div>
            <button
              onClick={() => setShowAjouterActivite(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Nouvelle activité
            </button>
          </div>
        </div>
      </div>


      {/* LISTE / CALENDRIER */}
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-[1fr] animate-fade-in">
          {filteredActivites.map((a, idx) => {
            const tone = typeTone(a.type);
            return (
              <article key={a.id} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300/70 ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:shadow-2xl" style={{ animation: `slideUp 0.5s ease-out ${idx * 0.05}s both` }}>
                {/* Header dégradé par type — FIX: pills lisibles */}
                <div className={`flex items-center justify-between bg-gradient-to-r ${toneBg(tone)} px-5 py-4 transition-all duration-300 group-hover:brightness-110`}>
                  <div className="flex items-center gap-3 text-white">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-xl">{typeIcon(a.type)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold leading-tight">{a.titre}</h3>
                       
                      </div>
                      <div className="text-xs/5 opacity-90">{a.classe} • {a.heure} • {a.duree} min</div>
                       <StatusPill statut={a.statut} />
                    </div>
                  </div>
                  <TypePill type={a.type} />
                </div>

                {/* Body + Footer collé en bas */}
                <div className="flex grow flex-col p-5">
                  <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{a.description}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <CalenderIcon className="size-4" />
                      {new Date(a.date).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="inline-flex items-center gap-1">🕐 {a.heure}</span>
                    <span className="inline-flex items-center gap-1">👥 {a.enfantsInscrits}/{a.enfantsMax}</span>
                  </div>

                  <CapacityBar value={a.enfantsInscrits} max={a.enfantsMax} />

                  {!!a.objectifs.length && (
                    <div className="mt-3">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Objectifs</div>
                      <div className="flex flex-wrap gap-1">
                        {a.objectifs.slice(0, 3).map((o, i) => <Tag key={i}>{o}</Tag>)}
                      </div>
                    </div>
                  )}
                 {a.observation && (
                      <div className="mt-3 rounded-lg bg-gray-200 p-3 text-sm text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                        <span className="font-medium">Observation :</span> {a.observation}
                      </div>
                    )}
                  {/* Footer */}
                  <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">{a.classe}</span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">{a.duree} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDetailActivite(a)}
                          className="inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-blue-200"
                        >
                          <EyeIcon className="size-3.5" />
                          Détails
                        </button>

                        {a.statut === "planifie" && (
                          <button
                            onClick={() =>
                              setActivites((prev) =>
                                prev.map((x) => (x.id === a.id ? { ...x, statut: "en_cours" } : x))
                              )
                            }
                            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                          >
                            Démarrer
                          </button>
                        )}

                        {a.statut === "en_cours" && (
                          <button
                            onClick={() => demarrerEvaluation(a)}
                            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                          >
                            Évaluer & terminer
                          </button>
                        )}
                      </div>
                    </div>

                  
                  </div>
                </div>
              </article>
            );
          })}
          {filteredActivites.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Aucune activité ne correspond aux filtres.
            </div>
          )}
        </div>
      ) : (
        /* ---------------- Calendrier hebdo amélioré ---------------- */
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Calendrier des activités (semaine)
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              * Cliquez sur un événement pour voir les détails
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-7">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((jour, i) => {
              const todayIdx = (new Date().getDay() + 6) % 7; // 0=Lun
              return (
                <div key={jour} className={`rounded-xl border p-2 ${todayIdx===i ? "border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900/40" : "border-gray-200 dark:border-gray-800"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium text-gray-700 dark:text-gray-300">{jour}</div>
                    {todayIdx===i && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">Aujourd’hui</span>}
                  </div>

                  <div className="space-y-2">
                    {filteredActivites
                      .filter((a) => new Date(a.date).getDay() === ((i + 1) % 7)) // 0=Dim
                      .sort((a,b)=>a.heure.localeCompare(b.heure))
                      .map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setDetailActivite(a)}
                          className={`group w-full rounded-lg p-2 text-left text-xs transition hover:shadow ${chipByType(a.type)} ring-1 ring-black/5 dark:ring-white/10`}
                          title={`${a.titre} — ${a.heure}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="truncate font-semibold text-gray-900 dark:text-white">{a.titre}</div>
                            <span className={` dark:text-slate-800 ml-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold shadow-sm ring-1 ring-black/5 ${chipByStatut(a.statut)}`}>
                              {a.statut === "planifie" ? "Planifié" : a.statut === "en_cours" ? "En cours" : a.statut === "termine" ? "Terminé" : "Annulé"}
                            </span>
                          </div>
                          <div className="mt-0.5 text-gray-700 dark:text-gray-300">{a.heure} • {a.classe}</div>
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------- Modale: Ajouter une activité -------------------- */}
      {showAjouterActivite && (
        <div className="fixed inset-0 z-[100000]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAjouterActivite(false)} />
          <div className="relative mx-auto mt-2 w-full max-w-3xl px-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nouvelle activité</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Créez une activité et visualisez-la en direct</p>
                </div>
                <button onClick={() => setShowAjouterActivite(false)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                  <CloseIcon className="size-5" />
                </button>
              </div>

              <div className="grid max-h-[80vh] gap-6 overflow-y-auto p-6 md:grid-cols-[1.2fr,1fr]">
                {/* Form */}
                <form
                  onSubmit={(e) => { e.preventDefault(); ajouterActivite(); }}
                  className="space-y-4 dark:text-gray-300"
                >
                  <div>
                    <label className="mb-1 block text-sm font-medium  ">Titre *</label>
                    <input
                      value={nouvelleActivite.titre}
                      onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, titre: e.target.value })}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      placeholder="Ex : Atelier Peinture Libre"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Type *</label>
                      <select
                        value={nouvelleActivite.type}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, type: e.target.value as any })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      >
                        <option value="creatif">Créatif</option>
                        <option value="sportif">Sportif</option>
                        <option value="educatif">Éducatif</option>
                        <option value="musical">Musical</option>
                        <option value="nature">Nature</option>
                        <option value="social">Social</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Classe *</label>
                      <select
                        value={nouvelleActivite.classe}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, classe: e.target.value })}
                        className="w-full  rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      >
                        {["(3-4) ans","(4-5) ans","(6-7) ans","(8-9) ans","(10-11) ans","12 ans","Toutes classes"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium dark:text-gray-300">Description *</label>
                    <textarea
                      value={nouvelleActivite.description}
                      onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, description: e.target.value })}
                      rows={3}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      placeholder="Décrivez l’activité…"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Date *</label>
                      <input
                        type="date"
                        value={nouvelleActivite.date}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, date: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Heure *</label>
                      <input
                        type="time"
                        value={nouvelleActivite.heure}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, heure: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Durée (min) *</label>
                      <input
                        type="range"
                        min={15}
                        max={240}
                        step={15}
                        value={nouvelleActivite.duree}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, duree: parseInt(e.target.value) || 0 })}
                        className="w-full"
                      />
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{nouvelleActivite.duree} min</div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Objectifs</label>
                      <TagEditor
                        value={nouvelleActivite.objectifs}
                        onChange={(v) => setNouvelleActivite({ ...nouvelleActivite, objectifs: v })}
                        placeholder="ex: écoute, coopération…" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Matériel</label>
                      <TagEditor
                        value={nouvelleActivite.materiel}
                        onChange={(v) => setNouvelleActivite({ ...nouvelleActivite, materiel: v })}
                        placeholder="ex: peinture, ciseaux…"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Capacité max *</label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={nouvelleActivite.enfantsMax}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, enfantsMax: parseInt(e.target.value) || 0 })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Statut</label>
                      <select
                        value={nouvelleActivite.statut}
                        onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, statut: e.target.value as any })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                      >
                        <option value="planifie">Planifié</option>
                        <option value="en_cours">En cours</option>
                        <option value="termine">Terminé</option>
                        <option value="annule">Annulé</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                      Créer l’activité
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAjouterActivite(false)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Annuler
                    </button>
                  </div>
                </form>

                {/* Preview */}
                <div className="space-y-3">
                  <div className={`rounded-xl border p-4 dark:border-gray-800 ${chipByType(nouvelleActivite.type)}`}>
                    <div className="mb-1 text-sm font-semibold">Prévisualisation</div>
                    <div className="rounded-lg border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
                      <div className="text-xs text-gray-500">
                        {nouvelleActivite.date} • {nouvelleActivite.heure} • {nouvelleActivite.duree} min
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {nouvelleActivite.titre || "Titre de l’activité"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {nouvelleActivite.description || "Description…"}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {nouvelleActivite.type}
                        </span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          {nouvelleActivite.classe}
                        </span>
                      </div>
                      {!!nouvelleActivite.objectifs.length && (
                        <div className="mt-3">
                          <div className="text-xs font-medium text-gray-500">Objectifs</div>
                          <ul className="mt-1 list-inside list-disc text-sm text-gray-700 dark:text-gray-200">
                            {nouvelleActivite.objectifs.map((o, i) => (
                              <li key={i}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    Astuce : limitez à 2–3 objectifs pour rester focalisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- Modale: Évaluation -------------------- */}
      {showEvaluationModal && activiteEnCours && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowEvaluationModal(false)} />
          <div className="relative z-[100001] mx-auto my-8 w-full max-w-4xl px-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Évaluation des enfants</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activiteEnCours.titre} — {new Date(activiteEnCours.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <button onClick={() => setShowEvaluationModal(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  ✕
                </button>
              </div>

              <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-4">
                {/* résumé */}
                <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl text-2xl ${chipByType(activiteEnCours.type)}`}>{typeIcon(activiteEnCours.type)}</div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{activiteEnCours.titre}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{activiteEnCours.description}</div>
                    </div>
                  </div>
                </div>

                {/* items */}
                <div className="space-y-4">
                  {evaluations.map((ev, idx) => (
                    <div key={ev.enfantId} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-200 text-sm font-semibold dark:bg-gray-700">
                            {ev.nom.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{ev.nom}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400"># {ev.enfantId}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                const cp = [...evaluations];
                                cp[idx].note = s;
                                setEvaluations(cp);
                              }}
                              className={`text-xl leading-none ${s <= ev.note ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Participation</label>
                          <select
                            value={ev.participation}
                            onChange={(e) => {
                              const cp = [...evaluations];
                              cp[idx].participation = e.target.value as any;
                              setEvaluations(cp);
                            }}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <option value="excellente">⭐ Excellente</option>
                            <option value="bonne">👍 Bonne</option>
                            <option value="moyenne">⚪ Moyenne</option>
                            <option value="faible">⚠️ Faible</option>
                            <option value="absente">❌ Absente</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium">Besoin d'aide ?</label>
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                const cp = [...evaluations];
                                cp[idx].besoinAide = true;
                                setEvaluations(cp);
                              }}
                              className={`flex-1 rounded-lg border px-3 py-2 ${ev.besoinAide ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300" : "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
                            >
                              Oui
                            </button>
                            <button
                              onClick={() => {
                                const cp = [...evaluations];
                                cp[idx].besoinAide = false;
                                setEvaluations(cp);
                              }}
                              className={`flex-1 rounded-lg border px-3 py-2 ${!ev.besoinAide ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300" : "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
                            >
                              Non
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium">Observations</label>
                        <textarea
                          value={ev.observations}
                          onChange={(e) => {
                            const cp = [...evaluations];
                            cp[idx].observations = e.target.value;
                            setEvaluations(cp);
                          }}
                          rows={2}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                          placeholder="Notes sur la participation…"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium">Compétences acquises (séparées par virgules)</label>
                        <input
                          type="text"
                          value={ev.competencesAcquises.join(", ")}
                          onChange={(e) => {
                            const cp = [...evaluations];
                            cp[idx].competencesAcquises = e.target.value.split(",").map((x) => x.trim()).filter(Boolean);
                            setEvaluations(cp);
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                          placeholder="ex: découper, suivre une consigne…"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Résumé */}
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                  <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Résumé</h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Summary number={evaluations.filter((e) => ["excellente", "bonne"].includes(e.participation)).length} label="Bonnes participations" tone="green" />
                    <Summary number={evaluations.filter((e) => e.participation === "moyenne").length} label="Participation moyenne" tone="amber" />
                    <Summary number={evaluations.filter((e) => ["faible", "absente"].includes(e.participation)).length} label="Faible participation" tone="rose" />
                    <Summary number={evaluations.filter((e) => e.besoinAide).length} label="Besoin d'aide" tone="indigo" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <button onClick={() => setShowEvaluationModal(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Annuler
                </button>
                <button onClick={sauvegarderEvaluations} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Terminer l'activité avec évaluations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- Modale: Détails activité -------------------- */}
      {detailActivite && (
        <DetailsModal activite={detailActivite} onClose={() => setDetailActivite(null)} />
      )}
    </>
  );
}

/* -------------------- Petits composants -------------------- */
function TagEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const add = (t: string) => {
    const v = t.trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setDraft("");
  };
  return (
    <div className="rounded-lg border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span key={t} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            {t}
            <button className="ml-1 text-indigo-500 hover:text-indigo-700" onClick={() => onChange(value.filter((x) => x !== t))} aria-label="Supprimer">
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          placeholder={placeholder}
          className="min-w-[160px] flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

function Summary({ number, label, tone }: { number: number; label: string; tone: "green" | "amber" | "rose" | "indigo" }) {
  const map = {
    green: "text-green-600 dark:text-green-400",
    amber: "text-amber-600 dark:text-amber-400",
    rose: "text-rose-600 dark:text-rose-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
  } as const;
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${map[tone]}`}>{number}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

/* -------------------- Modal Détails -------------------- */
function DetailsModal({ activite, onClose }: { activite: Activite; onClose: () => void }) {
  const type = activite.type;
  const tone = typeTone(type);
  return (
    <div className="fixed inset-0 z-[100000]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-8 w-full max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className={`flex items-center justify-between bg-gradient-to-r ${toneBg(tone)} px-6 py-4 text-white`}>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-2xl">{typeIcon(type)}</div>
              <div>
                <div className="text-lg font-semibold">{activite.titre}</div>
                <div className="text-xs opacity-90">{activite.classe} • {activite.heure} • {activite.duree} min</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill statut={activite.statut} />
              <TypePill type={activite.type} />
              <button onClick={onClose} className="ml-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25">✕</button>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Description</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{activite.description}</div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Informations</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  📅 {new Date(activite.date).toLocaleDateString("fr-FR")} • 🕐 {activite.heure}<br/>
                  👥 {activite.enfantsInscrits}/{activite.enfantsMax}
                </div>
              </div>

              {activite.observation && (
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Observation</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{activite.observation}</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {!!activite.objectifs.length && (
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Objectifs</div>
                  <div className="flex flex-wrap gap-1">
                    {activite.objectifs.map((o, i) => <Tag key={i}>{o}</Tag>)}
                  </div>
                </div>
              )}

              {!!activite.materiel.length && (
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Matériel</div>
                  <div className="flex flex-wrap gap-1">
                    {activite.materiel.map((m, i) => <Tag key={i}>{m}</Tag>)}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Créer une observation
                  </button>
                  <button className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 inline-flex items-center gap-2">
                    <MailIcon className="size-4" /> Contacter les parents
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
            <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}