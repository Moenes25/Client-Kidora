// pages/Home.tsx - Interface Parent améliorée selon cahier des charges
import { BellIcon, CalendarIcon, ClipboardCheckIcon, StarIcon, User2Icon, UserCircleIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CheckCircleIcon, UserGroup02Icon } from "../../icons";
import apiClient from "../../services/api/axiosConfig";
import { useAuth } from "../../context/AuthContext"; // si tu as ça
import { authApi } from "../../services/api/authApi";


const HomeParent = () => {
 /* const [children] = useState([
    {
      id: 1,
      name: "Ahmed Ben Salah",
      age: "8 ans",
      class: "CE2",
      educator: "Mme Fatma",
      avatar: "/images/3-4_ans/enfant_1.jpg",
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
      borderColor: "border-blue-100 dark:border-blue-800/30",
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
      borderColor: "border-blue-100 dark:border-blue-800/30",
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
      borderColor: "border-blue-100 dark:border-blue-800/30",
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
        language: 80,
        motor: 85,
        cognitive: 92,
        social: 78
      }
    },
    {
      id: 4,
      name: "Nour Ben Salah",
      age: "7 ans",
      class: "CE1",
      educator: "Mme Amina",
      avatar: "/images/3-4_ans/enfant_4.jpg",
      borderColor: "border-blue-100 dark:border-blue-800/30",
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
        language: 90,
        motor: 75,
        cognitive: 88,
        social: 85
      }
    }
  ]);*/


  const { user } = useAuth(); // récupère l'utilisateur connecté
  const [children, setChildren] = useState<any[]>([]); // données des enfants

useEffect(() => {
  const fetchChildrenAndEducators = async () => {
    if (!user?.id) return;
    try {
      // 1) Enfants du parent
      const { data: rawChildren } = await apiClient.get(`/enfants/BYIdPrent/${user.id}`);

      // 2) Adapter enfants (on garde aussi classId)
      const adapted = (rawChildren || []).map((enfant, index) => {
        const classObj = enfant.classe || {};
        const classId = classObj.id || classObj._id || enfant.classeId || null;

        return {
          id: enfant.id || enfant.idEnfant,
          name: `${enfant.prenom ?? ""} ${enfant.nom ?? ""}`.trim(),
          age: enfant.age ? `${enfant.age} ans` : "Âge inconnu",
          class: enfant.classeNom ? `${enfant.classeNom}` : (classObj.nom_classe || "Classe inconnue"),
          classId, // <<< important
          educator: "Éducateur inconnu", // provisoire, on hydrate après
          avatar: enfant.imageUrl ? authApi.getImageUrl(enfant.imageUrl) : "/images/avatar-default.png",
          health: {
            allergies: enfant.allergies ?? ["Aucune"],
            medicalNotes: enfant.notesSante ?? "Aucune remarque",
            vaccination: enfant.vaccination ?? "À jour",
          },
          presence: {
            today: enfant.presence?.today ?? false,
            week: enfant.presence?.week ?? 0,
            month: enfant.presence?.month ?? 0,
          },
          performance: enfant.performance ?? 80 + index * 3,
          color: enfant.color || "from-indigo-500 to-purple-500",
          bgColor: enfant.bgColor || "bg-white dark:bg-gray-900/40",
          borderColor: enfant.borderColor || "border-gray-200 dark:border-white/10",
          evolution: enfant.evolution ?? { language: 85, motor: 78, cognitive: 90, social: 82 },
        };
      });

      // 3) classIds uniques (non nuls)
      const classIds = Array.from(
        new Set(adapted.map(c => c.classId).filter(Boolean))
      );

      // 4) Récupérer les éducateurs par classe
      //    Endpoint d’après ton back: /api/educateurClasse/{id}/educateurs
      const mapByClass = {};
      await Promise.all(classIds.map(async (cid) => {
        try {
          const { data } = await apiClient.get(`/educateur-classe/${cid}/educateurs`);
          // data = Array<EducateurClasseResponseDTO>
          // on s’attend à { educateur: { nom, prenom, ... }, classe: {...} }
          const names = (data || [])
            .map(x => x?.educateur)
            .filter(Boolean)
            .map(e => [e?.prenom, e?.nom].filter(Boolean).join(" ").trim())
            .filter(Boolean);

          mapByClass[cid] = names.length ? names : ["Éducateur inconnu"];
        } catch {
          mapByClass[cid] = ["Éducateur inconnu"];
        }
      }));

      // 5) Hydrater la propriété educator pour chaque enfant
      const finalChildren = adapted.map(c => ({
        ...c,
        educator: c.classId ? (mapByClass[c.classId]?.join(", ") || "Éducateur inconnu") : "Éducateur inconnu",
      }));

      setChildren(finalChildren);
    } catch (error) {
      console.error("Erreur chargement enfants / éducateurs :", error);
    }
  };

  fetchChildrenAndEducators();
}, [user]);



// --- Onglet actif
const [tab, setTab] = useState<"today" | "tomorrow" | "week">("today");

// 1) Sources de données par onglet
type AgendaItem = {
  time: string;
  activity: string;
  type: "arrival" | "meal" | "activity" | "rest" | "learning" | "departure" | string;
  completed: boolean;
};

const [agenda] = useState<{
  today: AgendaItem[];
  tomorrow: AgendaItem[];
  week: AgendaItem[]; // tu peux mettre toute la semaine, ou un résumé
}>({
  today: [
    { time: "08:00", activity: "Accueil et jeu libre", type: "arrival",  completed: true },
    { time: "09:00", activity: "Atelier langage",      type: "learning", completed: true },
    { time: "10:30", activity: "Collation",            type: "meal",     completed: true },
    { time: "11:00", activity: "Activité motricité",   type: "activity", completed: false },
    { time: "12:30", activity: "Déjeuner",             type: "meal",     completed: false },
    { time: "13:30", activity: "Sieste",               type: "rest",     completed: false },
    { time: "15:00", activity: "Goûter",               type: "meal",     completed: false },
    { time: "15:30", activity: "Jeux extérieurs",      type: "activity", completed: false },
    { time: "16:30", activity: "Départ",               type: "departure",completed: false },
  ],
  tomorrow: [
    { time: "08:00", activity: "Accueil",              type: "arrival",  completed: false },
    { time: "09:15", activity: "Atelier lecture",      type: "learning", completed: false },
    { time: "10:30", activity: "Collation",            type: "meal",     completed: false },
    // ...
  ],
  week: [
    // Mets ici les items de la semaine (tu peux inclure un champ "day" si tu veux)
    { time: "08:00", activity: "Accueil (Lundi)",      type: "arrival",  completed: true  },
    { time: "09:00", activity: "Langage (Lundi)",      type: "learning", completed: true  },
    // ...
  ],
});

// 2) Utilitaires communs
const [showOnlyPending, setShowOnlyPending] = useState(false);
const [query, setQuery] = useState("");

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const nowMin = (() => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
})();

// 3) On choisit la source selon l’onglet
const source = tab === "today" ? agenda.today : tab === "tomorrow" ? agenda.tomorrow : agenda.week;

// 4) Filtre + tri appliqués sur la source (pas sur dailyAgenda)
const filtered = source
  .filter(i => (showOnlyPending ? !i.completed : true))
  .filter(i => (query.trim() ? i.activity.toLowerCase().includes(query.toLowerCase()) : true))
  .sort((a, b) => toMinutes(a.time) - toMinutes(b.time));

// 5) Recalcule les KPIs avec la liste source (pas la filtered pour garder la vérité du jour)
const done = source.filter(i => i.completed).length;
const total = source.length;
const pct = Math.round((done / Math.max(1, total)) * 100);

// (facultatif) repère “NOW” dans la liste filtrée
const nowIndex = filtered.findIndex(i => !i.completed && toMinutes(i.time) >= nowMin);

// 6) Couleurs/labels : pense à couvrir "learning" et "departure" pour éviter "Autre"
const typeDot: Record<string, string> = {
  arrival: "bg-blue-500",
  learning: "bg-indigo-500",
  meal: "bg-amber-500",
  activity: "bg-emerald-500",
  rest: "bg-purple-500",
  departure: "bg-slate-500",
  default: "bg-gray-400",
};
const typeEmoji: Record<string, string> = {
  arrival: "👋",
  learning: "📚",
  meal: "🍽️",
  activity: "🧩",
  rest: "😴",
  departure: "👋",
  default: "🗓️",
};


  const [todayActivities] = useState([
    {
      id: 1,
      title: "Atelier peinture libre",
      child: "Ahmed",
      time: "10:00",
      skills: ["Créativité", "Motricité fine"],
      media: ["photo", "video"],
      aiAssessment: "Très bon engagement, mélange de couleurs créatif"
    },
    {
      id: 2,
      title: "Construction blocs",
      child: "Sara",
      time: "11:30",
      skills: ["Logique", "Spatial"],
      media: ["photo"],
      aiAssessment: "Excellente résolution de problèmes"
    },
    {
      id: 3,
      title: "Jeux mathématiques",
      child: "Mohamed",
      time: "14:00",
      skills: ["Logique", "Calcul"],
      media: ["photo"],
      aiAssessment: "Bon progrès en calcul mental"
    },
    {
      id: 4,
      title: "Chant et rythme",
      child: "Nour",
      time: "15:30",
      skills: ["Musicalité", "Mémoire"],
      media: ["video"],
      aiAssessment: "Excellent sens du rythme"
    }
  ]);

  const [quickStats] = useState({
    attendance: {
      present: 3,
      absent: 1,
      rate: "75%"
    },
    activities: {
      completed: 8,
      planned: 12,
      rate: "67%"
    },
    meals: {
      eaten: 2,
      remaining: 3,
      notes: "Appétit normal"
    },
    naps: {
      duration: "1h30",
      quality: "Excellent"
    }
  });
  const [familyStats] = useState({
    satisfaction: 92,
    monthlyActivities: 32,
    attendanceRate: 94,
    learningProgress: 87
  });

 
// ---- Filtres Activités ----
const [selectedChild, setSelectedChild] = useState("__ALL__");
const [mediaFilter, setMediaFilter] = useState<"all"|"photo"|"video">("all");

const filteredActivities = todayActivities.filter(a => {
  const byChild = selectedChild === "__ALL__" || a.child === selectedChild;
  const byMedia =
    mediaFilter === "all" ||
    (mediaFilter === "photo" && a.media.includes("photo")) ||
    (mediaFilter === "video" && a.media.includes("video"));
  return byChild && byMedia;
});

// ---- Lightbox Galerie (aperçu image plein écran) ----
const [lightbox, setLightbox] = useState<{open:boolean; src?:string; caption?:string}>({open:false});
const openLightbox = (src?:string, caption?:string) => setLightbox({open:true, src, caption});
const closeLightbox = () => setLightbox({open:false});
// --- Messagerie (section 5) ---
const [msgTo, setMsgTo] = useState<"fatma" | "amina" | "karim">("amina");
const [msgBody, setMsgBody] = useState("");
const [sending, setSending] = useState(false);
const [toast, setToast] = useState<{open:boolean; title:string; desc?:string}>({
  open: false, title: "", desc: ""
});
const [childFilter, setChildFilter] =
  useState<'all' | 'present' | 'absent'>('all');

const visibleChildren = children.filter(c =>
  childFilter === 'all'
    ? true
    : childFilter === 'present'
      ? !!c.presence?.today
      : !c.presence?.today
);

function openToast(title: string, desc?: string) {
  setToast({ open: true, title, desc });
  // auto hide
  setTimeout(() => setToast(t => ({ ...t, open: false })), 2500);
}

async function handleSend() {
  if (!msgBody.trim()) {
    openToast("Message vide", "Ajoute un texte avant d’envoyer.");
    return;
  }
  try {
    setSending(true);
    // ici tu brancheras ton appel API si besoin
    await new Promise(r => setTimeout(r, 800)); // simulation réseau
    // succès
    const destinataire =
      msgTo === "fatma" ? "Mme Fatma" : msgTo === "amina" ? "Mme Amina" : "M. Karim";
    openToast("Message envoyé ✅", `Votre message a été envoyé à ${destinataire}.`);
    setMsgBody(""); // clear
  } finally {
    setSending(false);
  }
}


  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête avec badge de présence */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          {/* <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Tableau de Bord Familial
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p> */}
        </div>
        {/* <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
            quickStats.attendance.absent === 0 
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30' 
              : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              quickStats.attendance.absent === 0 ? 'bg-green-500' : 'bg-amber-500'
            }`}></div>
            <span className="font-medium">
              {quickStats.attendance.absent === 0 ? 'Tous présents' : `${quickStats.attendance.absent} absent(s)`}
            </span>
          </div>
        </div> */}
      </div>

    
      {/* CARTE FAMILLE AMÉLIORÉE */}
<div className="w-full">
  <section className="relative w-full max-w-none overflow-hidden rounded-3xl">
    {/* Fond : dégradé principal */}
    <div className="relative bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 p-6 sm:p-8 md:p-10 text-white rounded-3xl shadow-2xl">

      {/* Décors : blobs & grille douce */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* grille en pointillés */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
        {/* blobs */}
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
        {/* lueurs */}
        <div className="absolute left-1/3 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-2xl" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_auto_1fr]">
        {/* Colonne texte */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm ring-1 ring-white/20">
            <span className="text-base">👨‍👩‍👧‍👦</span>
            <span className="text-xs font-medium tracking-wide">Espace familial</span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[32px] font-extrabold leading-tight">
            Bienvenue dans votre espace familial
          </h2>

          <p className="mt-2 text-white/85 max-w-xl">
            Suivez en temps réel les progrès et activités éducatives de vos enfants.
          </p>

          {/* Statistiques courtes */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm">
                {/* fallback pour éviter un crash si les données n’arrivent pas */}
                {(2)} / {(4)} présents
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="text-sm">
                {(5)} activités aujourd’hui
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/parent/activites_enfants"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-indigo-700 shadow-sm transition hover:translate-y-[1px] hover:shadow-md"
            >
              Découvrir les activités
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="opacity-80">
                <path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              to="/parent/enfants"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 py-2 font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
            >
              Voir mes enfants
            </Link>
          </div>
        </div>

        {/* Colonne image (centrale) */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="h-36 w-36 rounded-2xl overflow-hidden ring-2 ring-white/25 shadow-xl">
              <img
                src="/images/logo/logo_famille.png"
                alt="Famille"
                className="h-full w-full object-cover"
              />
            </div>
            {/* mini badge décoratif */}
            <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 px-2 py-1 text-[10px] font-bold text-black shadow">
              ⭐ kidora Family
            </div>
          </div>
        </div>

        {/* Colonne cartes stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {/* Enfants */}
          <article className="rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                {/* UsersIcon */}
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold">
                  {Array.isArray(children) ? children.length : 0}
                </div>
                <div className="text-xs text-white/80">Enfants</div>
              </div>
            </div>
          </article>

          {/* Activités */}
          <article className="rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                {/* ClipboardCheckIcon */}
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 12v7a2 2 0 01-2 2H7l-4-4V5a2 2 0 012-2h7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold">
                  {quickStats?.activities?.completed ?? 0}
                </div>
                <div className="text-xs text-white/80">Activités</div>
              </div>
            </div>
          </article>

          {/* Performance (large) */}
          <article className="col-span-2 rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                {/* étoile */}
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-extrabold">
                    {Math.round(familyStats?.satisfaction ?? 0)}%
                  </div>
                  <div className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
                    +2.5%
                  </div>
                </div>
                <div className="mt-1 text-xs text-white/80">Performance</div>

                {/* mini “progress” ligne */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, familyStats?.satisfaction ?? 0))}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</div>


      {/* Section Profil enfants - AMÉLIORÉE */}
   <div className="w-full">
  <section className="relative w-full max-w-none">
    {/* En-tête */}
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow">
          {/* icône groupe simple (SVG inline pour éviter dépendances) */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Vos enfants
            <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
              {Array.isArray(children) ? children.length : 0}
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">État de vos enfants aujourd’hui</p>
        </div>
      </div>

      {/* Filtres rapides (statique ici, branchable plus tard) */}
      <div className="flex items-center gap-2">

<button
  onClick={() => setChildFilter('present')}
  aria-pressed={childFilter === 'present'}
  className={`rounded-full border px-3 py-1.5 text-xs transition
    ${childFilter === 'present'
      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
      : 'border-emerald-300/50 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200'}`}
>
  Présents
</button>

<button
  onClick={() => setChildFilter('absent')}
  aria-pressed={childFilter === 'absent'}
  className={`rounded-full border px-3 py-1.5 text-xs transition
    ${childFilter === 'absent'
      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
      : 'border-amber-300/50 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200'}`}
>
  Absents
</button>


        <Link
          to="/parent/enfants"
          className="ml-2 inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:opacity-95"
        >
          Voir tous
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </Link>
      </div>
    </header>

    {/* Grille cartes */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {visibleChildren.slice(0, 2).map((child) => {
        const isPresent = !!child.presence?.today;
        const progress =
          child.id === 1 ? 85 : child.id === 2 ? 92 : child.id === 3 ? 78 : 90;
        const activityEmoji = isPresent ? (child.id === 1 ? "✏️" : child.id === 2 ? "🧩" : child.id === 3 ? "🧮" : "🎵") : "🏠";
        const activityTitle = isPresent
          ? child.id === 1
            ? "Exercices de calcul mental"
            : child.id === 2
            ? "Jeux de logique"
            : child.id === 3
            ? "Problèmes mathématiques"
            : "Atelier rythme et chant"
          : "À la maison";
        const activityMeta = isPresent
          ? child.id === 1
            ? "Mathématiques • 10:00–11:00"
            : child.id === 2
            ? "Logique • 11:30–12:30"
            : child.id === 3
            ? "Calcul • 14:00–15:00"
            : "Musique • 15:30–16:30"
          : "Retour prévu demain";

        return (
          <article
            key={child.id}
            className={[
              "relative overflow-hidden rounded-2xl border shadow-lg transition-all",
              "hover:-translate-y-0.5 hover:shadow-xl",
              child.borderColor || "border-gray-200 dark:border-white/10",
              child.bgColor || "bg-white dark:bg-gray-900/40",
            ].join(" ")}
          >
            {/* ruban statut */}
            <div
              className={[
                "absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ring-1",
                isPresent
                  ? "bg-emerald-500/10 text-emerald-700 ring-emerald-400/30 dark:text-emerald-200"
                  : "bg-amber-500/10 text-amber-700 ring-amber-400/30 dark:text-amber-200",
              ].join(" ")}
            >
              {isPresent ? "Présent" : "Absent"}
            </div>

            <div className="p-6">
              {/* Header enfant */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* halo dégradé derrière l’avatar */}
                    <div className={["absolute inset-0 -z-10 rounded-full opacity-20 blur-md", child.color || "bg-gradient-to-r from-indigo-500 to-purple-500"].join(" ")} />
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow"
                    />
                    {/* dot présence */}
                    <span
                      className={[
                        "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-800",
                        isPresent ? "bg-emerald-500/90" : "bg-amber-500/90",
                      ].join(" ")}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{child.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {child.age} • {child.class}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Éducateur : <span className="font-medium">{child.educator}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Activité actuelle */}
              <div className="mb-6 rounded-xl border bg-gradient-to-r from-gray-50 to-white px-4 py-4 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-full text-base",
                      isPresent
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
                    ].join(" ")}
                  >
                    {activityEmoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{activityTitle}</div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{activityMeta}</div>
                  </div>
                </div>

                {isPresent && (
                  <div className="mt-3 border-t pt-3 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Progression</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {progress}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-[width] duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Santé + actions */}
              <footer className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      child.health?.allergies?.[0] === "Aucune" ? "bg-emerald-500" : "bg-sky-500",
                    ].join(" ")}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Santé : <span className="font-medium">Normale</span>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/parent/enfant/${child.id}/activities`}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    Activités
                  </Link>
                  <Link
                    to={`/parent/enfant/${child.id}/reports`}
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-95"
                  >
                    Rapport
                  </Link>
                </div>
              </footer>
            </div>
          </article>
        );
      })}

      {/* Cas “aucun enfant” */}
      {(!children || children.length === 0) && (
        <div className="col-span-full rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-white/15">
          <p className="font-medium text-gray-700 dark:text-gray-300">Aucun enfant pour le moment</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Ajoutez un profil enfant pour commencer à suivre ses activités.
          </p>
        </div>
      )}
    </div>
  </section>
</div>


      {/* Section Agenda et Notifications - AMÉLIORÉE */}
<div className="w-full">
  <section className="relative w-full mx-auto overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-gray-800">
    {/* décor doux */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>

    {/* Header riche */}
    <header className="relative z-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CalendarIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Agenda du jour</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mise à jour en temps réel</p>
        </div>
      </div>

      {/* Onglets + météo déco */}
      <div className="flex items-center gap-2">
        <nav aria-label="vue agenda" className="flex items-center rounded-full bg-gray-100 p-1 text-xs dark:bg-white/10">
          {(["today","tomorrow","week"] as const).map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3 py-1.5 rounded-full transition ${
                tab === k
                  ? "bg-white text-gray-900 shadow-sm dark:bg-white/90 dark:text-gray-900"
                  : "text-gray-600 dark:text-white/80"
              }`}
            >
              {k === "today" ? "Aujourd’hui" : k === "tomorrow" ? "Demain" : "Semaine"}
            </button>
          ))}
        </nav>

        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-0">
          🌤️ 22°C
        </span>
      </div>
    </header>

    {/* Barre d’outils */}
    <div className="relative z-10 flex flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {/* jauge circulaire */}
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
            <circle cx="18" cy="18" r="16" className="fill-none stroke-gray-200 dark:stroke-white/15" strokeWidth="4" />
            <circle
              cx="18" cy="18" r="16"
              className="fill-none stroke-[url(#grad)]"
              strokeDasharray={`${pct},100`} strokeDashoffset="0" strokeWidth="4" strokeLinecap="round"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-gray-700 dark:text-white">{pct}%</span>
        </div>

        <div className="min-w-[140px]">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Progression</span>
            <span>{done}/{total}</span>
          </div>
          <div className="h-2 w-44 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* recherche + filtre */}
      <div className="flex items-center gap-2">
        <label className="relative">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher une activité…"
            className="w-50 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none placeholder:text-gray-400
                       focus:ring-2 focus:ring-blue-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/60 dark:focus:ring-white/10"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
        </label>

        <button
          onClick={() => setShowOnlyPending(v => !v)}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition ring-1
                     ${showOnlyPending
                       ? "bg-indigo-600 text-white ring-indigo-600"
                       : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:ring-white/10"}`
          }
          aria-pressed={showOnlyPending}
        >
          {showOnlyPending ? "Tout" : "À venir"}
        </button>
      </div>
    </div>

    {/* Timeline */}
    <div className="relative z-10 px-6 pb-6 pt-4">
      {/* ligne centrale */}
      <div className="pointer-events-none absolute left-[4.1rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-white/15" />

      <ol className="space-y-2">
        {filtered.map((item, idx) => {
          const isNow = idx === nowIndex && nowIndex !== -1;
          const dot = typeDot[item.type] ?? typeDot.default;
          const emoji = typeEmoji[item.type] ?? typeEmoji.default;

          return (
            <li
              key={`${item.time}-${idx}`}
              className={`grid grid-cols-[4rem_1fr_auto] items-center gap-4 rounded-2xl border p-3 transition
                          ${item.completed
                            ? "border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-900/10"
                            : "border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"}`}
            >
              {/* Heure */}
              <time className={`text-center font-bold ${item.completed ? "text-emerald-700 dark:text-emerald-300" : "text-gray-800 dark:text-white"}`}>
                {item.time}
              </time>

              {/* contenu */}
              <div className="relative pl-6">
                {/* puce */}
                <span className={`absolute left-0 top-2 h-3 w-3 rounded-full ring-4 ring-white/80 dark:ring-gray-800/80 ${dot}`} />
                <div className="flex items-center gap-2">
                  <span className="text-base">{emoji}</span>
                  <span className={`font-medium ${item.completed ? "text-emerald-800 dark:text-emerald-200" : "text-gray-900 dark:text-white"}`}>
                    {item.activity}
                  </span>
                  {isNow && (
                    <span className="ml-1 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                      NOW
                    </span>
                  )}
                </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
  {item.type === "arrival" ? "Arrivée" :
   item.type === "meal" ? "Repas" :
   item.type === "activity" ? "Activité" :
   item.type === "rest" ? "Repos" :
   item.type === "learning" ? "Atelier" :
   item.type === "departure" ? "Départ" : "Autre"}
</div>

              </div>

              {/* état */}
              <div className="justify-self-end">
                {item.completed ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <CheckCircleIcon className="h-3.5 w-3.5" />
                    Terminé
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                    ⏳ À venir
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>

    {/* Confetti quand 100% */}
    {pct === 100 && (
      <div className="pointer-events-none absolute inset-0 animate-[pop_800ms_ease-out]">
        <div className="absolute inset-x-0 top-6 mx-auto h-1 w-1">
          <div className="confetti" />
        </div>
      </div>
    )}
  </section>

  {/* confetti CSS minimaliste */}
  <style>{`
    @keyframes pop { from { opacity:.0; transform:scale(.98)} to { opacity:1; transform:scale(1)} }
    .confetti {
      position: relative;
    }
    .confetti::before, .confetti::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle, #f43f5e 50%, transparent 51%) -6px -2px/8px 8px repeat,
        radial-gradient(circle, #10b981 50%, transparent 51%) 0px -2px/10px 10px repeat,
        radial-gradient(circle, #3b82f6 50%, transparent 51%) 4px -2px/7px 7px repeat,
        radial-gradient(circle, #eab308 50%, transparent 51%) 8px -2px/9px 9px repeat;
      opacity:.55;
      filter: blur(.4px);
      transform: translateY(0);
      animation: fall 1200ms ease-in forwards;
    }
    @keyframes fall {
      to { transform: translateY(60px); opacity:0; }
    }
  `}</style>
</div>


{/* Section 3: Activités récentes et galerie - Maintenant 3 colonnes */}
{/* ACTIVITÉS + GALERIE */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mx-auto">

  {/* ——— Activités récentes (2 colonnes) ——— */}
  <section className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
    {/* Header + filtres */}
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-6">
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Activités récentes</h2>

      <div className="flex flex-wrap items-center gap-2">
        {/* Filtre enfant */}
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none
                     focus:ring-2 focus:ring-blue-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:ring-white/10"
        >
          <option value="__ALL__">Tous les enfants</option>
          {children.map(c => (
            <option key={c.id} value={c.name.split(" ")[0]}>
              {c.name.split(" ")[0]}
            </option>
          ))}
        </select>

        {/* Filtre média */}
        <div className="flex items-center rounded-full bg-gray-100 p-1 text-xs dark:bg-white/10">
          {(["all","photo","video"] as const).map(k => (
            <button
              key={k}
              onClick={() => setMediaFilter(k)}
              className={`px-3 py-1.5 rounded-full transition ${
                mediaFilter === k
                  ? "bg-white text-gray-900 shadow-sm dark:bg-white/90 dark:text-gray-900"
                  : "text-gray-600 dark:text-white/80"
              }`}
            >
              {k === "all" ? "Tous" : k === "photo" ? "Photos" : "Vidéos"}
            </button>
          ))}
        </div>

        <Link
          to="/parent/activities"
          className="ml-1 text-sm font-semibold text-emerald-600 hover:opacity-90 dark:text-emerald-400"
        >
          Voir toutes →
        </Link>
      </div>
    </header>

    {/* Liste */}
    <div className="p-6 pt-0 space-y-4">
      {filteredActivities.slice(0, 4).map((activity) => {
        const child = children.find(c => c.name.split(" ")[0] === activity.child);

        return (
          <article
            key={activity.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/70 p-4 
                       transition hover:-translate-y-0.5 hover:bg-gray-100 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute -inset-x-6 -top-6 h-10 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {child && (
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white leading-tight">
                    {activity.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{activity.child}</span>
                    <span className="inline-block h-1 w-1 rounded-full bg-gray-400/60" />
                    <time className="font-medium text-gray-700 dark:text-gray-300">{activity.time}</time>
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 text-lg">
                {activity.media.includes("photo") && <span title="Photo">📷</span>}
                {activity.media.includes("video") && <span title="Vidéo">🎥</span>}
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {activity.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-[11px] font-medium
                             border border-gray-200 bg-white text-gray-700
                             dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Observations : </span>
              {activity.aiAssessment}
            </p>
          </article>
        );
      })}

      {/* Reco IA */}
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4
                      dark:border-emerald-500/20 dark:from-emerald-900/10 dark:to-teal-900/10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
            ✨
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Prochaine activité recommandée</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Jeu de construction pour développer la logique
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ——— Galerie (1 colonne) ——— */}
  <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
    <header className="flex items-center justify-between p-6">
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Galerie du jour</h2>
      <Link to="/parent/gallery" className="text-sm font-semibold text-purple-600 hover:opacity-90 dark:text-purple-300">
        Album complet →
      </Link>
    </header>

    {/* Collage responsive */}
    <div className="px-6 pb-6">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {/* Grande tuile */}
        <button
          onClick={() => openLightbox(children[0]?.avatar, children[0]?.name)}
          className="relative col-span-2 row-span-1 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 group"
        >
          <img
            src={children[0]?.avatar}
            alt={children[0]?.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-2 left-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <div className="text-sm font-semibold">{children[0]?.name?.split(" ")[0]}</div>
            <div className="text-xs">{children[0]?.age}</div>
          </div>
        </button>

        {/* 3 petites */}
        {children.slice(1, 4).map((child, i) => (
          <button
            key={child.id}
            onClick={() => openLightbox(child.avatar, child.name)}
            className={`relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 group ${
              i === 2 ? "col-span-2 aspect-[16/7]" : "aspect-square"
            }`}
          >
            <img
              src={child.avatar}
              alt={child.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-2 left-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-sm font-medium">(child.name?.split(" ")[0] || "")</div>
              <div className="text-xs">{child.age}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Highlight du jour */}
      <div className="mt-6 rounded-2xl border border-rose-200 bg-gradient-to-r from-pink-50 to-rose-50 p-4
                      dark:border-rose-500/20 dark:from-pink-900/10 dark:to-rose-900/10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300">
            🌟
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Moment préféré aujourd’hui</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Ahmed pendant l’atelier peinture</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>

    
 {/* Section 5: Messagerie rapide */}
<section className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-xl p-6">
  <header className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Messagerie & communication</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Contact rapide avec l’équipe éducative</p>
    </div>
    <Link
      to="/parent/messaging"
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:opacity-95"
    >
      Boîte de réception
    </Link>
  </header>

  {/* Composeur rapide */}
  <div className="mb-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 p-4 dark:bg-white/[0.03]">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">Envoyer à :</span>
      <select
        value={msgTo}
        onChange={(e) => setMsgTo(e.target.value as any)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs dark:border-white/15 dark:bg-white/5 dark:text-white"
      >
        <option value="fatma">Mme Fatma (Ahmed)</option>
        <option value="amina">Mme Amina (Sara & Nour)</option>
        <option value="karim">M. Karim (Mohamed)</option>
      </select>
    </div>

    <textarea
      rows={3}
      value={msgBody}
      onChange={(e) => setMsgBody(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          handleSend();
        }
      }}
      placeholder="Votre message… (Ctrl/⌘ + Enter pour envoyer)"
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400
                 focus:ring-2 focus:ring-blue-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/60 dark:focus:ring-white/10"
    />

    <div className="mt-3 flex items-center justify-between">
      <div className="flex gap-2 text-xs">
        <button
          type="button"
          className="rounded-full border px-3 py-1 dark:border-white/10 dark:text-white/80"
          onClick={() => openToast("Fonction à venir", "Envoi de pièces jointes bientôt disponible.")}
        >
          📎 Pièce jointe
        </button>
        <button
          type="button"
          className="rounded-full border px-3 py-1 dark:border-white/10 dark:text-white/80"
          onClick={() => openToast("Proposer un RDV", "Votre demande a été enregistrée.")}
        >
          📅 Proposer un RDV
        </button>
      </div>

      <button
        onClick={handleSend}
        disabled={sending}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white font-semibold
                    ${sending ? "bg-blue-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-95"}`}
      >
        {sending && <span className="size-3 animate-spin rounded-full border-2 border-white border-r-transparent" />}
        Envoyer
      </button>
    </div>
  </div>

  {/* Contacts rapides */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      { bg: "from-blue-500 to-cyan-500", label: "Éducatrice Ahmed", name: "Mme Fatma", value: "fatma" },
      { bg: "from-violet-500 to-fuchsia-500", label: "Éducatrice Sara & Nour", name: "Mme Amina", value: "amina" },
      { bg: "from-emerald-500 to-teal-500", label: "Éducateur Mohamed", name: "M. Karim", value: "karim" },
    ].map((c) => (
      <div key={c.value} className="rounded-xl border border-gray-200 dark:border-white/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${c.bg} grid place-items-center text-white`}>👩‍🏫</div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{c.label}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.name}</p>
          </div>
        </div>
        <button
          onClick={() => { setMsgTo(c.value as any); openToast("Destinataire sélectionné", `Vous écrivez à ${c.name}.`); }}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50
                     dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          Contacter
        </button>
      </div>
    ))}
  </div>

  {/* Sweet Alert (toast) */}
  <div
    className={[
      "pointer-events-none fixed mt-50 inset-x-0 top-3 z-[5000] grid place-items-center px-4 transition",
      toast.open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
    ].join(" ")}
    aria-live="polite"
  >
    <div className="pointer-events-auto max-w-md w-full rounded-2xl border bg-white/95 text-slate-900 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl
                    dark:bg-slate-900/95 dark:text-slate-100 dark:border-white/10 dark:ring-white/10">
      <div className="flex items-start gap-3 p-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">✅</div>
        <div className="flex-1">
          <div className="font-semibold">{toast.title}</div>
          {toast.desc && <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{toast.desc}</div>}
        </div>
        <button
          onClick={() => setToast(t => ({ ...t, open: false }))}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:text-slate-300"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-b-2xl bg-slate-200/60 dark:bg-white/10">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 animate-[toastbar_2.5s_linear_forwards]" />
      </div>
    </div>
  </div>

  {/* barre de progression du toast */}
  <style>{`
    @keyframes toastbar { from { width: 100% } to { width: 0% } }
  `}</style>
</section>




      {lightbox.open && (
  <div
    className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4"
    onClick={closeLightbox}
    role="dialog"
    aria-modal="true"
  >
    <figure className="max-w-3xl w-full">
      <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-2xl shadow-2xl" />
      {lightbox.caption && (
        <figcaption className="mt-2 text-center text-white/90">{lightbox.caption}</figcaption>
      )}
    </figure>
  </div>
)}

    </div>
  );
};

export default HomeParent;