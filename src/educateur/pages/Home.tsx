// src/educateur/pages/Home.tsx
import PageMeta from "../../components/common/PageMeta";
import Metrics from "../components/Dashboard/Metrics";
import ClassesSummary from "../components/Dashboard/ClassesSummary";
import RecentActivities from "../components/Dashboard/RecentActivities";
import WeeklySchedule from "../components/Dashboard/WeeklySchedule";
import ChildrenToday from "../components/Dashboard/ChildrenToday";
import { useState } from "react"; // Ajouter useState
import { UserIcon, CheckCircleIcon, CloseIcon,PlusIcon,CalenderIcon } from "../../icons"; // Importer les icônes nécessaires
import { useNavigate } from "react-router";

export default function HomeEducateur() {
  const navigate = useNavigate();


  interface Activite {
  id: number;
  titre: string;
  description: string;
  type: 'creatif' | 'sportif' | 'educatif' | 'musical' | 'nature' | 'social';
  duree: number;
  date: string;
  heure: string;
  classe: string;
  enfantsMax: number;
  materiel: string[];
  objectifs: string[];
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
}

  interface Enfant {
  id: number;
  nom: string;
  present: boolean;
  classe: string;
  heureArrivee?: string;
  raison?: string;
  photo?: string;
}
const photosParClasse = {
    "(3-4) ans": [
      "images/3-4_ans/enfant_2.jpg",
      "images/3-4_ans/enfant_4.jpg", 
      "images/3-4_ans/enfant_3.jpg", // Bébé 3
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=150&h=150&fit=crop&crop=face", // Bébé 4
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // Bébé 5
    ],
    "(4-5) ans": [
      "images/3-4_ans/enfant_5.jpg",
      "images/3-4_ans/enfant_6.jpg",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // 4-5 ans 3
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-97dc7697c36?w=150&h=150&fit=crop&crop=face", // 4-5 ans 4
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", // 4-5 ans 5
    ],
    "(6-7) ans": [
      "images/3-4_ans/enfant_7.jpg",
      "images/3-4_ans/enfant_8.jpg",
      "images/3-4_ans/enfant_9.jpg",
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=150&h=150&fit=crop&crop=face", // 6-7 ans 4
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face", // 6-7 ans 5
    ],
    "(8-9) ans": [
      "images/3-4_ans/enfant_10.jpg",
      "images/3-4_ans/enfant_11.jpg",
       "images/3-4_ans/enfant_11.jpg",// 8-9 ans 3
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // 8-9 ans 4
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // 8-9 ans 5
    ],
    "(10-11) ans": [
      "images/3-4_ans/enfant_13.jpg",
       "images/3-4_ans/enfant_14.jpg",
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?w=150&h=150&fit=crop&crop=face", // 10-11 ans 3
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", // 10-11 ans 4
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // 10-11 ans 5
    ],
    "12 ans": [
      "images/3-4_ans/enfant_15.jpg",
      "images/3-4_ans/enfant_16.jpg",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face", // 12 ans 3
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // 12 ans 4
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // 12 ans 5
    ]
  };
  const defaultEnfants: Enfant[] = [
    { 
      id: 1, 
      nom: "Emma Dubois", 
      present: true, 
      heureArrivee: "08:30", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][0]
    },
    { 
      id: 2, 
      nom: "Lucas Martin", 
      present: true, 
      heureArrivee: "08:45", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][0]
    },
    { 
      id: 3, 
      nom: "Fatima Zahra", 
      present: true, 
      heureArrivee: "09:00", 
      classe: "12 ans",
      photo: photosParClasse["12 ans"][0]
    },
    { 
      id: 4, 
      nom: "Voussez Alain", 
      present: false, 
      raison: "Maladie", 
      classe: "(8-9) ans",
      photo: photosParClasse["(8-9) ans"][0]
    },
    { 
      id: 5, 
      nom: "Chloé Petit", 
      present: true, 
      heureArrivee: "08:15", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][1]
    },
    { 
      id: 6, 
      nom: "Mohamed Ali", 
      present: false, 
      raison: "Rendez-vous médical", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][1]
    },
    { 
      id: 7, 
      nom: "Léa Bernard", 
      present: true, 
      heureArrivee: "08:50", 
      classe: "12 ans",
      photo: photosParClasse["12 ans"][1]
    },
    { 
      id: 8, 
      nom: "Thomas Leroy", 
      present: true, 
      heureArrivee: "09:05", 
      classe: "(8-9) ans",
      photo: photosParClasse["(8-9) ans"][1]
    },
    { 
      id: 9, 
      nom: "Sophie Moreau", 
      present: true, 
      heureArrivee: "08:20", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][2]
    },
    { 
      id: 10, 
      nom: "Hugo Blanc", 
      present: false, 
      raison: "Vacances", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][2]
    },
    { 
      id: 11, 
      nom: "Anna Lambert", 
      present: true, 
      heureArrivee: "08:40", 
      classe: "(10-11) ans",
      photo: photosParClasse["(10-11) ans"][0]
    },
    { 
      id: 12, 
      nom: "Paul Dupont", 
      present: false, 
      raison: "Grippe", 
      classe: "(10-11) ans",
      photo: photosParClasse["(10-11) ans"][1]
    },
    { 
      id: 13, 
      nom: "Zoé Leroy", 
      present: true, 
      heureArrivee: "08:55", 
      classe: "(4-5) ans",
      photo: photosParClasse["(4-5) ans"][0]
    },
    { 
      id: 14, 
      nom: "Noah Martin", 
      present: true, 
      heureArrivee: "09:10", 
      classe: "(4-5) ans",
      photo: photosParClasse["(4-5) ans"][1]
    },
  ];

  // État pour gérer la modal de présence
  const [showGestionPresence, setShowGestionPresence] = useState(false);
  // État pour gérer les enfants (vous pouvez l'obtenir d'une API ou d'un contexte)
  const [enfants, setEnfants] = useState<Enfant[]>(

  defaultEnfants
);



  // Fonction pour basculer la présence d'un enfant
  const togglePresence = (id: number) => {
  setEnfants(prevEnfants => 
    prevEnfants.map(enfant => {
      if (enfant.id === id) {
        const nouveauPresent = !enfant.present;
        return {
          ...enfant,
          present: nouveauPresent,
          // Réinitialiser les champs en fonction de l'état
          raison: nouveauPresent ? undefined : enfant.raison || "Absence non spécifiée",
          heureArrivee: nouveauPresent ? new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : undefined
        };
      }
      return enfant;
    })
  );
};

  // Fonction pour sauvegarder les présences
  const sauvegarderPresences = () => {
    console.log("Présences sauvegardées:", enfants);
    setShowGestionPresence(false);
    // Ici, vous pourriez envoyer les données à votre API
    alert("Les présences ont été mises à jour avec succès !");
  };

  // États pour la modal d'ajout d'activité
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
  });
   // Fonction pour ajouter une activité
const ajouterActivite = () => {
  if (!nouvelleActivite.titre.trim()) {
    alert("Veuillez saisir un titre pour l'activité");
    return;
  }

  console.log("Nouvelle activité ajoutée:", nouvelleActivite);
  setShowAjouterActivite(false);
  
  // Réinitialiser le formulaire
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
  });
  
  alert("Activité ajoutée avec succès !");
  // Ici, vous pourriez envoyer les données à votre API
};
  return (
    <>
      <PageMeta
        title="Dashboard Éducateur | Système de Gestion"
        description="Tableau de bord pour les éducateurs - Suivi des enfants, présence et activités"
      />
      
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
          Bonjour, Éducateur 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-700">
          Voici un aperçu de votre journée
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-6">
        <Metrics />
      </div>

      {/* UNE SEULE grille principale */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* ===== COLONNE GAUCHE (8/12) ===== */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* 1. Classes Actives */}
          <ClassesSummary />
          
          {/* 2. Planning de la semaine */}
          <WeeklySchedule />
          
        </div>
        
        {/* ===== COLONNE DROITE (4/12) ===== */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* 1. Alertes IA */}
          <RecentActivities />
          
          {/* 2. Actions rapides */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-300 dark:bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowGestionPresence(true)} // Ouvrir la modal
                className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-50 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-100 transition-colors"
              >
                <span className="font-medium">Gérer présence</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-200 px-2 py-1 rounded">+</span>
              </button>
              <button 
              onClick={() => setShowAjouterActivite(true)}
              className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-50 text-green-600 dark:text-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-100 transition-colors">
                <span className="font-medium">Ajouter activité</span>
                <span className="text-xs bg-green-100 dark:bg-green-200 px-2 py-1 rounded">+</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-50 text-purple-600 dark:text-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-100 transition-colors">
                <span className="font-medium">Créer rapport</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-200 px-2 py-1 rounded">📊</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-50 text-amber-600 dark:text-amber-700 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-100 transition-colors">
                <span className="font-medium">Partager avec parents</span>
                <span className="text-xs bg-amber-100 dark:bg-amber-200 px-2 py-1 rounded">📧</span>
              </button>
            </div>
          </div>
          
        </div>
        
        {/* ===== DEUXIÈME LIGNE : ChildrenToday + Aujourd'hui ===== */}
        {/* ChildrenToday (6/12) - Passer les enfants en props */}
        <div className="col-span-12 lg:col-span-8">
          <ChildrenToday enfants={enfants} />
        </div>
        
        {/* Statistiques "Aujourd'hui" (4/12) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-300 dark:bg-white p-5 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
              Aujourd'hui
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                <span className="text-gray-600 dark:text-gray-700">Heures d'activités</span>
                <span className="font-semibold text-gray-900 dark:text-gray-900">4h 30m</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                <span className="text-gray-600 dark:text-gray-700">Enfants présents</span>
                <span className="font-semibold text-green-600 dark:text-green-700">
                  {Math.round((enfants.filter(e => e.present).length / enfants.length) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                <span className="text-gray-600 dark:text-gray-700">Tâches terminées</span>
                <span className="font-semibold text-blue-600 dark:text-blue-700">12/15</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                <span className="text-gray-600 dark:text-gray-700">Observations</span>
                <span className="font-semibold text-purple-600 dark:text-purple-700">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                <span className="text-gray-600 dark:text-gray-700">Absents</span>
                <span className="font-semibold text-amber-600 dark:text-amber-700">
                  {enfants.filter(e => !e.present).length}
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div> {/* Fin de la grille principale */}

      {/* Modal de gestion des présences */}
     // Modal de gestion des présences
{showGestionPresence && (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-[100000]">
    <div className="bg-white dark:bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-300 mt-16">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900">
              Gérer les présences
            </h3>
            <p className="text-gray-600 dark:text-gray-700">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <button 
            onClick={() => setShowGestionPresence(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-800"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        {/* Liste des enfants avec toggle */}
        <div className="space-y-3 mb-6">
          {enfants.map(enfant => (
            <div 
              key={enfant.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${enfant.present ? 'bg-green-100 text-green-600 dark:bg-green-200 dark:text-green-700' : 'bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-700'}`}>
                  {enfant.nom.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-900">
                    {enfant.nom}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-700">
                    {enfant.classe}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {enfant.present && enfant.heureArrivee && (
                  <span className="text-sm text-green-600 dark:text-green-700">
                    Arrivé à {enfant.heureArrivee}
                  </span>
                )}
                {!enfant.present && enfant.raison && (
                  <span className="text-sm text-red-600 dark:text-red-700">
                    {enfant.raison}
                  </span>
                )}
                <button
                  onClick={() => togglePresence(enfant.id)}
                  className={`px-4 py-2 rounded-lg font-medium ${enfant.present ? 'bg-red-50 text-red-600 dark:bg-red-100 dark:text-red-700 hover:bg-red-100 dark:hover:bg-red-200' : 'bg-green-50 text-green-600 dark:bg-green-100 dark:text-green-700 hover:bg-green-100 dark:hover:bg-green-200'}`}
                >
                  {enfant.present ? 'Marquer absent' : 'Marquer présent'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-50 dark:bg-green-100 rounded-lg flex items-center">
            <CheckCircleIcon className="size-5 text-green-600 dark:text-green-700 mr-3" />
            <div>
              <div className="text-xl font-bold text-green-600 dark:text-green-700">
                {enfants.filter(e => e.present).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-700">
                Présents
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-100 rounded-lg flex items-center">
            <CloseIcon className="size-5 text-red-600 dark:text-red-700 mr-3" />
            <div>
              <div className="text-xl font-bold text-red-600 dark:text-red-700">
                {enfants.filter(e => !e.present).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-700">
                Absents
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <button
            onClick={sauvegarderPresences}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sauvegarder les présences
          </button>
          <button
            onClick={() => setShowGestionPresence(false)}
            className="px-6 py-3 border border-gray-300 dark:border-gray-400 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>

  
)}

 {showAjouterActivite && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[100000]">
          <div className="bg-white dark:bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-300 mt-16">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900">
                    Ajouter une activité
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
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <PlusIcon className="size-5" />
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
    </>
  );
}
