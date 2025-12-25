// src/educateur/pages/Activities.tsx
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { 
  UserIcon,
  CalenderIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  CloseIcon
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
      case 'creatif': return "bg-purple-100 text-purple-800 dark:bg-purple-100 dark:text-purple-700";
      case 'sportif': return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-700";
      case 'educatif': return "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-blue-700";
      case 'musical': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-100 dark:text-yellow-700";
      case 'nature': return "bg-emerald-100 text-emerald-800 dark:bg-emerald-100 dark:text-emerald-700";
      case 'social': return "bg-pink-100 text-pink-800 dark:bg-pink-100 dark:text-pink-700";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
    }
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'planifie': return "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-blue-700";
      case 'en_cours': return "bg-amber-100 text-amber-800 dark:bg-amber-100 dark:text-amber-700";
      case 'termine': return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-700";
      case 'annule': return "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-700";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
              Gestion des Activités
            </h1>
            <p className="text-gray-600 dark:text-gray-700 mt-1">
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
    <div className="bg-white dark:bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-300 mt-16">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900">
              Ajouter une nouvelle activité
            </h3>
            <p className="text-gray-600 dark:text-gray-700">
              Créez une nouvelle activité éducative
            </p>
          </div>
          <button 
            onClick={() => setShowAjouterActivite(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-800"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); ajouterActivite(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Titre de l'activité *
              </label>
              <input
                type="text"
                required
                value={nouvelleActivite.titre}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, titre: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Atelier Peinture Libre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Type d'activité *
              </label>
              <select
                required
                value={nouvelleActivite.type}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, type: e.target.value as any})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
              Description *
            </label>
            <textarea
              required
              value={nouvelleActivite.description}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Décrivez l'activité..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={nouvelleActivite.date}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Heure *
              </label>
              <input
                type="time"
                required
                value={nouvelleActivite.heure}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, heure: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Durée (minutes) *
              </label>
              <input
                type="number"
                required
                min="15"
                max="240"
                value={nouvelleActivite.duree}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, duree: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Classe *
              </label>
              <select
                required
                value={nouvelleActivite.classe}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, classe: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
                Nombre maximum d'enfants *
              </label>
              <input
                type="number"
                required
                min="1"
                max="30"
                value={nouvelleActivite.enfantsMax}
                onChange={(e) => setNouvelleActivite({...nouvelleActivite, enfantsMax: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
              Objectifs (séparés par des virgules)
            </label>
            <input
              type="text"
              value={nouvelleActivite.objectifs.join(', ')}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, objectifs: e.target.value.split(',').map(o => o.trim()).filter(o => o)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Développer la créativité, Coordination main-œil, Expression des émotions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
              Matériel nécessaire (séparés par des virgules)
            </label>
            <input
              type="text"
              value={nouvelleActivite.materiel.join(', ')}
              onChange={(e) => setNouvelleActivite({...nouvelleActivite, materiel: e.target.value.split(',').map(m => m.trim()).filter(m => m)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="px-6 py-3 border border-gray-300 dark:border-gray-400 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
            
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-200 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-300'}`}
              >
                Liste
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-300'}`}
              >
                Calendrier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-100 dark:to-blue-50 p-4 rounded-2xl border border-blue-200 dark:border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-700 font-medium">Planifiées</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mt-1">
                {activites.filter(a => a.statut === 'planifie').length}
              </h3>
            </div>
            <CalenderIcon className="size-6 text-blue-600 dark:text-blue-700" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-100 dark:to-amber-50 p-4 rounded-2xl border border-amber-200 dark:border-amber-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 dark:text-amber-700 font-medium">En cours</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mt-1">
                {activites.filter(a => a.statut === 'en_cours').length}
              </h3>
            </div>
            <span className="text-2xl">⏱️</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-100 dark:to-green-50 p-4 rounded-2xl border border-green-200 dark:border-green-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-700 font-medium">Terminées</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mt-1">
                {activites.filter(a => a.statut === 'termine').length}
              </h3>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-100 dark:to-purple-50 p-4 rounded-2xl border border-purple-200 dark:border-purple-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-700 font-medium">Total enfants</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mt-1">
                {activites.reduce((sum, a) => sum + a.enfantsInscrits, 0)}
              </h3>
            </div>
            <UserIcon className="size-6 text-purple-600 dark:text-purple-700" />
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
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
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
              className="px-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
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

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredActivites.map(activite => (
            <div key={activite.id} className="bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300 p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${getTypeColor(activite.type).split(' ')[0]} text-2xl`}>
                      {getTypeIcon(activite.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
                          {activite.titre}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(activite.statut)}`}>
                          {activite.statut === 'planifie' ? 'Planifié' :
                           activite.statut === 'en_cours' ? 'En cours' :
                           activite.statut === 'termine' ? 'Terminé' : 'Annulé'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-700 mb-3">
                        {activite.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                          <CalenderIcon className="size-4" />
                          {new Date(activite.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                          <span className="text-lg">🕐</span>
                          {activite.heure} ({activite.duree} min)
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                          <span className="text-lg">👥</span>
                          {activite.classe} • {activite.enfantsInscrits}/{activite.enfantsMax} enfants
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-800 mb-1">
                          Objectifs :
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {activite.objectifs.slice(0, 2).map((objectif, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 px-2 py-0.5 rounded">
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
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <EyeIcon className="size-4" />
                    Voir détails
                  </button>
                  {activite.statut === 'planifie' && (
                    <button className="px-4 py-2 bg-green-50 dark:bg-green-100 text-green-600 dark:text-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-200 transition-colors text-sm font-medium">
                      Démarrer
                    </button>
                  )}
                  {activite.statut === 'en_cours' && (
                    <button className="px-4 py-2 bg-amber-50 dark:bg-amber-100 text-amber-600 dark:text-amber-700 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-200 transition-colors text-sm font-medium">
                      Terminer
                    </button>
                  )}
                </div>
              </div>
              
              {activite.observation && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-200">
                  <div className="text-sm text-gray-600 dark:text-gray-700">
                    <strong>Observation :</strong> {activite.observation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Mode calendrier
        <div className="bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300 p-5">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900">
              Calendrier des activités - Semaine du 15 Janvier 2024
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((jour, index) => (
              <div key={jour} className="text-center">
                <div className="font-medium text-gray-700 dark:text-gray-800 mb-2">{jour}</div>
                <div className="min-h-32 p-2 border border-gray-200 dark:border-gray-300 rounded-lg">
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