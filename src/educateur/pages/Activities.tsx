// src/educateur/pages/Activities.tsx
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { 
  UserIcon,
  CalenderIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  CloseIcon,
  CheckCircleIcon
} from "../../icons";

interface Activite {
  id: number;
  titre: string;
  description: string;
  type: 'creatif' | 'sportif' | 'educatif' | 'musical' | 'nature' | 'social';
  duree: number; // en minutes
  date: string;
  heure: string;
  classe: string;
  enfantsInscrits: number;
  enfantsMax: number;
  materiel: string[];
  objectifs: string[];
  observation?: string;
  photo?: string;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  evaluations?: EvaluationEnfant[];
}

interface EvaluationEnfant {
  enfantId: number;
  nom: string;
  photo?: string;
  participation: 'excellente' | 'bonne' | 'moyenne' | 'faible' | 'absente';
  observations: string;
  competencesAcquises: string[];
  besoinAide: boolean;
  note: number; // 1-5
}



export default function ActivitiesPage() {
  const [showAjouterActivite, setShowAjouterActivite] = useState(false);
const [nouvelleActivite, setNouvelleActivite] = useState({
  titre: '',
  description: '',
  type: 'creatif' as const,
  duree: 60,
  date: new Date().toISOString().split('T')[0],
  heure: '09:00',
  classe: '(3-4) ans',
  enfantsMax: 12,
  materiel: [] as string[],
  objectifs: [] as string[],
  statut: 'planifie' as const
});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [activiteEnCours, setActiviteEnCours] = useState<Activite | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationEnfant[]>([]);
  
  const [activites, setActivites] = useState<Activite[]>([
    { 
      id: 1, 
      titre: "Atelier Peinture Libre", 
      description: "Expression artistique libre avec différentes techniques de peinture",
      type: 'creatif',
      duree: 90,
      date: "2024-01-15",
      heure: "09:30",
      classe: "(3-4) ans",
      enfantsInscrits: 8,
      enfantsMax: 10,
      materiel: ["Peinture", "Pinceaux", "Toiles", "Tabliers"],
      objectifs: ["Développer la créativité", "Coordination main-œil", "Expression des émotions"],
      observation: "Les enfants étaient très enthousiastes, Emma a créé une œuvre remarquable",
      statut: 'termine'
    },
    { 
      id: 2, 
      titre: "Jeux Collectifs au Parc", 
      description: "Activités sportives et jeux d'équipe pour développer la coopération",
      type: 'sportif',
      duree: 120,
      date: "2024-01-16",
      heure: "10:00",
      classe: "(6-7) ans",
      enfantsInscrits: 15,
      enfantsMax: 18,
      materiel: ["Ballons", "Cônes", "Certificats médicaux"],
      objectifs: ["Travail d'équipe", "Motricité globale", "Respect des règles"],
      statut: 'planifie'
    },
    { 
      id: 3, 
      titre: "Découverte des Instruments", 
      description: "Initiation aux différents instruments de musique",
      type: 'musical',
      duree: 60,
      date: "2024-01-15",
      heure: "14:00",
      classe: "(4-5) ans",
      enfantsInscrits: 12,
      enfantsMax: 12,
      materiel: ["Tambourins", "Maracas", "Xylophone", "Enregistrements"],
      objectifs: ["Sensibilisation musicale", "Rythme", "Écoute active"],
      observation: "Lucas a montré un intérêt particulier pour le xylophone",
      statut: 'en_cours'
    },
    { 
      id: 4, 
      titre: "Jardinage Éducatif", 
      description: "Planter et observer la croissance des plantes",
      type: 'nature',
      duree: 75,
      date: "2024-01-17",
      heure: "11:00",
      classe: "Toutes classes",
      enfantsInscrits: 20,
      enfantsMax: 25,
      materiel: ["Graines", "Pots", "Terre", "Arrosoirs"],
      objectifs: ["Patience", "Responsabilité", "Cycle de vie des plantes"],
      statut: 'planifie'
    },
    { 
      id: 5, 
      titre: "Expériences Scientifiques Simples", 
      description: "Découverte des sciences par l'expérimentation",
      type: 'educatif',
      duree: 80,
      date: "2024-01-14",
      heure: "13:30",
      classe: "(8-9) ans",
      enfantsInscrits: 10,
      enfantsMax: 12,
      materiel: ["Loupes", "Éprouvettes", "Colorants", "Documents"],
      objectifs: ["Curiosité scientifique", "Observation", "Hypothèses"],
      observation: "Fatima a posé des questions très pertinentes",
      statut: 'termine'
    },
    { 
      id: 6, 
      titre: "Atelier Conte et Imagination", 
      description: "Création d'histoires et développement du langage",
      type: 'social',
      duree: 45,
      date: "2024-01-18",
      heure: "10:30",
      classe: "(3-4) ans",
      enfantsInscrits: 9,
      enfantsMax: 10,
      materiel: ["Livres", "Marionnettes", "Accessoires"],
      objectifs: ["Développement du langage", "Imagination", "Écoute"],
      statut: 'planifie'
    },
  ]);

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
    statut: nouvelleActivite.statut
  };

  setActivites([...activites, newActivite]);
  setShowAjouterActivite(false);
  setNouvelleActivite({
    titre: '',
    description: '',
    type: 'creatif',
    duree: 60,
    date: new Date().toISOString().split('T')[0],
    heure: '09:00',
    classe: '(3-4) ans',
    enfantsMax: 12,
    materiel: [],
    objectifs: [],
    statut: 'planifie'
  });
  alert("Activité ajoutée avec succès !");
};

  const filteredActivites = activites.filter(activite => {
    const matchesSearch = 
      activite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activite.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || activite.type === filterType;
    const matchesStatut = filterStatut === "all" || activite.statut === filterStatut;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'creatif': return "🎨";
      case 'sportif': return "⚽";
      case 'educatif': return "📚";
      case 'musical': return "🎵";
      case 'nature': return "🌱";
      case 'social': return "👥";
      default: return "⭐";
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'creatif': return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case 'sportif': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'educatif': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'musical': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'nature': return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case 'social': return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'planifie': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'en_cours': return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'termine': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'annule': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  const demarrerEvaluation = (activite: Activite) => {
  setActiviteEnCours(activite);
  
  // Créer des évaluations vides pour chaque enfant
  const evaluationsInitiales: EvaluationEnfant[] = [
    { enfantId: 1, nom: "Emma Dubois", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 2, nom: "Lucas Martin", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 3, nom: "Fatima Zahra", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 4, nom: "Voussez Alain", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 5, nom: "Chloé Petit", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 6, nom: "Mohamed Ali", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 7, nom: "Léa Bernard", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
    { enfantId: 8, nom: "Thomas Leroy", participation: 'bonne' as const, observations: '', competencesAcquises: [], besoinAide: false, note: 3 },
  ].slice(0, activite.enfantsInscrits); // Limiter aux enfants inscrits

  setEvaluations(evaluationsInitiales);
  setShowEvaluationModal(true);
};

const sauvegarderEvaluations = () => {
  if (activiteEnCours) {
    console.log("Évaluations sauvegardées pour", activiteEnCours.titre, evaluations);
    
    // Mettre à jour l'activité avec les évaluations
    const activitesMaj = activites.map(a => 
      a.id === activiteEnCours.id 
        ? { ...a, evaluations: [...evaluations] }
        : a
    );
    
    setActivites(activitesMaj);
    setShowEvaluationModal(false);
    setActiviteEnCours(null);
    
    alert("Évaluations sauvegardées avec succès !");
  }
};

  return (
    <>
      <PageMeta
        title="Gestion des Activités | Système de Gestion"
        description="Planifiez, gérez et suivez les activités éducatives"
      />
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Activités
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Planifiez, gérez et suivez les activités éducatives
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
            onClick={() => setShowAjouterActivite(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <PlusIcon className="size-5" />

              Nouvelle activité
            </button>

            {showAjouterActivite && (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-[100000]">
    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 mt-16">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Ajouter une nouvelle activité
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Créez une nouvelle activité éducative
            </p>
          </div>
          <button 
            onClick={() => setShowAjouterActivite(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); ajouterActivite(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre de l'activité *
              </label>
              <input
                type="text"
                required
                value={nouvelleActivite.titre}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, titre: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                placeholder="Ex: Atelier Peinture Libre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type d'activité *
              </label>
              <select
                required
                value={nouvelleActivite.type}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, type: e.target.value as any})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              >
                <option value="creatif">Créatif</option>
                <option value="sportif">Sportif</option>
                <option value="educatif">Éducatif</option>
                <option value="musical">Musical</option>
                <option value="nature">Nature</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={nouvelleActivite.description}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="Décrivez l'activité..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={nouvelleActivite.date}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Heure *
              </label>
              <input
                type="time"
                required
                value={nouvelleActivite.heure}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, heure: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée (minutes) *
              </label>
              <input
                type="number"
                required
                min="15"
                max="240"
                value={nouvelleActivite.duree}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, duree: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Classe *
              </label>
              <select
                required
                value={nouvelleActivite.classe}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, classe: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              >
                <option value="(3-4) ans">(3-4) ans</option>
                <option value="(4-5) ans">(4-5) ans</option>
                <option value="(6-7) ans">(6-7) ans</option>
                <option value="(8-9) ans">(8-9) ans</option>
                <option value="(10-11) ans">(10-11) ans</option>
                <option value="12 ans">12 ans</option>
                <option value="Toutes classes">Toutes classes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre maximum d'enfants *
              </label>
              <input
                type="number"
                required
                min="1"
                max="30"
                value={nouvelleActivite.enfantsMax}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, enfantsMax: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Objectifs (séparés par des virgules)
            </label>
            <input
              type="text"
              value={nouvelleActivite.objectifs.join(', ')}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, objectifs: e.target.value.split(',').map(o => o.trim()).filter(o => o)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="Ex: Développer la créativité, Coordination main-œil, Expression des émotions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Matériel nécessaire (séparés par des virgules)
            </label>
            <input
              type="text"
              value={nouvelleActivite.materiel.join(', ')}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, materiel: e.target.value.split(',').map(m => m.trim()).filter(m => m)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="Ex: Peinture, Pinceaux, Toiles, Tabliers"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Créer l'activité
            </button>
            <button
              type="button"
              onClick={() => setShowAjouterActivite(false)}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
            
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Liste
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Calendrier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl border border-blue-400/20 dark:border-blue-700 shadow-md"> */}
       <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-blue-600 dark:to-blue-700">

    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-100 dark:text-blue-200"> Total Enfants
              </p>
         <h3 className="mt-2 text-2xl font-bold text-white">
          {activites.filter(a => a.statut === 'planifie').length}
        </h3>
      </div>
      <CalenderIcon className="size-6 text-white dark:text-white" />
    </div>
  </div>
  
  <div className="bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 p-4 rounded-2xl border border-amber-400/20 dark:border-amber-700 shadow-md">
    <div className="flex items-center justify-between">
      <div>
       <p className="text-xs font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-950">
                Absents
              </p>
       <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-900">
          {activites.filter(a => a.statut === 'en_cours').length}
        </h3>
      </div>
      <span className="text-2xl text-gray-900 dark:text-gray-900">⏱️</span>
    </div>
  </div>
  
  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 p-4 rounded-2xl border border-emerald-400/20 dark:border-emerald-700 shadow-md">
    <div className="flex items-center justify-between">
      <div>
       <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100 dark:text-emerald-200">Terminées</p>
         <h3 className="mt-2 text-2xl font-bold text-white">
          {activites.filter(a => a.statut === 'termine').length}
        </h3>
      </div>
      
              <CheckCircleIcon className="size-6 text-white dark:text-white"/>
 
    </div>
  </div>
  
  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 p-4 rounded-2xl border border-cyan-400/20 dark:border-cyan-700 shadow-md">
    <div className="flex items-center justify-between">
      <div>
       <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100 dark:text-cyan-200">Total enfants</p>
       <h3 className="mt-2 text-2xl font-bold text-white">
          {activites.reduce((sum, a) => sum + a.enfantsInscrits, 0)}
        </h3>
      </div>
      <UserIcon className="size-6 text-white dark:text-white" />
    </div>
  </div>
</div>

      {/* Barre de recherche et filtres */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher une activité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="creatif">Créatif</option>
              <option value="sportif">Sportif</option>
              <option value="educatif">Éducatif</option>
              <option value="musical">Musical</option>
              <option value="nature">Nature</option>
              <option value="social">Social</option>
            </select>
            
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="planifie">Planifié</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="annule">Annulé</option>
            </select>
          </div>
        </div>
      </div>

      {showEvaluationModal && activiteEnCours && (
  <div className="fixed inset-0 z-[100000] overflow-y-auto">
    <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setShowEvaluationModal(false)} />
    <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-2xl transition-all">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Évaluation des enfants
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {activiteEnCours.titre} - {new Date(activiteEnCours.date).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <button
            onClick={() => setShowEvaluationModal(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Résumé de l'activité */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${getTypeColor(activiteEnCours.type).split(' ')[0]} text-2xl`}>
                {getTypeIcon(activiteEnCours.type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{activiteEnCours.titre}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activiteEnCours.description}</p>
              </div>
            </div>
          </div>

          {/* Liste des évaluations */}
          <div className="space-y-4">
            {evaluations.map((evaluation, index) => (
              <div key={evaluation.enfantId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {evaluation.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">{evaluation.nom}</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enfant #{evaluation.enfantId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Note :</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => {
                            const newEvaluations = [...evaluations];
                            newEvaluations[index].note = star;
                            setEvaluations(newEvaluations);
                          }}
                          className={`text-xl ${star <= evaluation.note ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Participation
                    </label>
                    <select
                      value={evaluation.participation}
                      onChange={(e) => {
                        const newEvaluations = [...evaluations];
                        newEvaluations[index].participation = e.target.value as any;
                        setEvaluations(newEvaluations);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                    >
                      <option value="excellente">⭐ Excellente</option>
                      <option value="bonne">👍 Bonne</option>
                      <option value="moyenne">⚪ Moyenne</option>
                      <option value="faible">⚠️ Faible</option>
                      <option value="absente">❌ Absente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Besoin d'aide supplémentaire ?
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          const newEvaluations = [...evaluations];
                          newEvaluations[index].besoinAide = true;
                          setEvaluations(newEvaluations);
                        }}
                        className={`flex-1 py-2 rounded-lg ${evaluation.besoinAide ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700'} border`}
                      >
                        Oui
                      </button>
                      <button
                        onClick={() => {
                          const newEvaluations = [...evaluations];
                          newEvaluations[index].besoinAide = false;
                          setEvaluations(newEvaluations);
                        }}
                        className={`flex-1 py-2 rounded-lg ${!evaluation.besoinAide ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700'} border`}
                      >
                        Non
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Observations
                  </label>
                  <textarea
                    value={evaluation.observations}
                    onChange={(e) => {
                      const newEvaluations = [...evaluations];
                      newEvaluations[index].observations = e.target.value;
                      setEvaluations(newEvaluations);
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                    placeholder="Notes sur la participation de l'enfant..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compétences acquises (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={evaluation.competencesAcquises.join(', ')}
                    onChange={(e) => {
                      const newEvaluations = [...evaluations];
                      newEvaluations[index].competencesAcquises = e.target.value.split(',').map(c => c.trim()).filter(c => c);
                      setEvaluations(newEvaluations);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                    placeholder="Ex: a appris à découper, a compris les consignes..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Résumé des évaluations */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Résumé des évaluations</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                  {evaluations.filter(e => e.participation === 'excellente' || e.participation === 'bonne').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Bonnes participations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                  {evaluations.filter(e => e.participation === 'moyenne').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Participation moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-500">
                  {evaluations.filter(e => e.participation === 'faible' || e.participation === 'absente').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faible participation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {evaluations.filter(e => e.besoinAide).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Besoin d'aide</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
          <button
            type="button"
            onClick={() => setShowEvaluationModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={sauvegarderEvaluations}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Terminer l'activité avec évaluations
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredActivites.map(activite => (
            <div key={activite.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${getTypeColor(activite.type).split(' ')[0]} text-2xl`}>
                      {getTypeIcon(activite.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {activite.titre}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(activite.statut)}`}>
                          {activite.statut === 'planifie' ? 'Planifié' :
                           activite.statut === 'en_cours' ? 'En cours' :
                           activite.statut === 'termine' ? 'Terminé' : 'Annulé'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {activite.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                          <CalenderIcon className="size-4" />
                          {new Date(activite.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                          <span className="text-lg">🕐</span>
                          {activite.heure} ({activite.duree} min)
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                          <span className="text-lg">👥</span>
                          {activite.classe} • {activite.enfantsInscrits}/{activite.enfantsMax} enfants
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Objectifs :
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {activite.objectifs.slice(0, 2).map((objectif, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                              {objectif}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <EyeIcon className="size-4" />
                    Voir détails
                  </button>
                  {activite.statut === 'planifie' && (
                    <button className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-medium">
                      Démarrer
                    </button>
                  )}
                  {activite.statut === 'en_cours' && (
                   <button 
                  onClick={() => demarrerEvaluation(activite)}
                  className="px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors text-sm font-medium"
                >
                  Évaluer et terminer
                </button>
                  )}
                </div>
              </div>
              
              {activite.observation && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Observation :</strong> {activite.observation}
                  </div>
                </div>
              )}
              {activite.evaluations && activite.evaluations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📊 Évaluations des enfants :
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activite.evaluations.slice(0, 4).map(evaluation => (
                  <div key={evaluation.enfantId} className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded">
                    <div className="font-medium dark:text-white">{evaluation.nom}</div>
                    <div className="dark:text-gray-400">Participation: {evaluation.participation}</div>
                    <div className="flex items-center dark:text-gray-400">
                      Note: 
                      <span className="ml-1 text-yellow-500">
                        {'★'.repeat(evaluation.note)}
                        <span className="text-gray-300 dark:text-gray-600">{'★'.repeat(5 - evaluation.note)}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {activite.evaluations.length > 4 && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  + {activite.evaluations.length - 4} autres évaluations...
                </div>
              )}
            </div>
          )}
            </div>
          ))}
        </div>
      ) : (
        // Mode calendrier
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Calendrier des activités - Semaine du 15 Janvier 2024
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((jour, index) => (
              <div key={jour} className="text-center">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">{jour}</div>
                <div className="min-h-32 p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  {filteredActivites
                    .filter(a => new Date(a.date).getDay() === (index + 1) % 7)
                    .map(activite => (
                      <div 
                        key={activite.id}
                        className={`mb-2 p-2 rounded text-xs ${getStatutColor(activite.statut)}`}
                      >
                        <div className="font-medium truncate">{activite.titre}</div>
                        <div>{activite.heure}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}