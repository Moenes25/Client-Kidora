// src/educateur/pages/Home.tsx
import PageMeta from "../../components/common/PageMeta";
import Metrics from "../components/Dashboard/Metrics";
import ClassesSummary from "../components/Dashboard/ClassesSummary";
import RecentActivities from "../components/Dashboard/RecentActivities";
import WeeklySchedule from "../components/Dashboard/WeeklySchedule";
import ChildrenToday from "../components/Dashboard/ChildrenToday";
import { useState } from "react";
import { UserIcon, CheckCircleIcon, CloseIcon, PlusIcon, CalenderIcon } from "../../icons";
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
      "images/3-4_ans/enfant_3.jpg",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
    "(4-5) ans": [
      "images/3-4_ans/enfant_5.jpg",
      "images/3-4_ans/enfant_6.jpg",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-97dc7697c36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    ],
    "(6-7) ans": [
      "images/3-4_ans/enfant_7.jpg",
      "images/3-4_ans/enfant_8.jpg",
      "images/3-4_ans/enfant_9.jpg",
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
    ],
    "(8-9) ans": [
      "images/3-4_ans/enfant_10.jpg",
      "images/3-4_ans/enfant_11.jpg",
      "images/3-4_ans/enfant_11.jpg",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
    "(10-11) ans": [
      "images/3-4_ans/enfant_13.jpg",
      "images/3-4_ans/enfant_14.jpg",
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    ],
    "12 ans": [
      "images/3-4_ans/enfant_15.jpg",
      "images/3-4_ans/enfant_16.jpg",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    ]
  };

  const defaultEnfants: Enfant[] = [
    { id: 1, nom: "Emma Dubois", present: true, heureArrivee: "08:30", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][0] },
    { id: 2, nom: "Lucas Martin", present: true, heureArrivee: "08:45", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][0] },
    { id: 3, nom: "Fatima Zahra", present: true, heureArrivee: "09:00", classe: "12 ans", photo: photosParClasse["12 ans"][0] },
    { id: 4, nom: "Voussez Alain", present: false, raison: "Maladie", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][0] },
    { id: 5, nom: "Chloé Petit", present: true, heureArrivee: "08:15", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][1] },
    { id: 6, nom: "Mohamed Ali", present: false, raison: "Rendez-vous médical", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][1] },
    { id: 7, nom: "Léa Bernard", present: true, heureArrivee: "08:50", classe: "12 ans", photo: photosParClasse["12 ans"][1] },
    { id: 8, nom: "Thomas Leroy", present: true, heureArrivee: "09:05", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][1] },
    { id: 9, nom: "Sophie Moreau", present: true, heureArrivee: "08:20", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][2] },
    { id: 10, nom: "Hugo Blanc", present: false, raison: "Vacances", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][2] },
    { id: 11, nom: "Anna Lambert", present: true, heureArrivee: "08:40", classe: "(10-11) ans", photo: photosParClasse["(10-11) ans"][0] },
    { id: 12, nom: "Paul Dupont", present: false, raison: "Grippe", classe: "(10-11) ans", photo: photosParClasse["(10-11) ans"][1] },
    { id: 13, nom: "Zoé Leroy", present: true, heureArrivee: "08:55", classe: "(4-5) ans", photo: photosParClasse["(4-5) ans"][0] },
    { id: 14, nom: "Noah Martin", present: true, heureArrivee: "09:10", classe: "(4-5) ans", photo: photosParClasse["(4-5) ans"][1] },
  ];

  // États principaux
  const [showGestionPresence, setShowGestionPresence] = useState(false);
  const [enfants, setEnfants] = useState<Enfant[]>(defaultEnfants);
  const [showAjouterActivite, setShowAjouterActivite] = useState(false);
  const [showAjouterObservation, setShowAjouterObservation] = useState(false);
  
  // État pour la nouvelle activité
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

  // État pour la nouvelle observation
  const [nouvelleObservation, setNouvelleObservation] = useState({
      typeCible: 'enfant', // 'enfant' ou 'classe'
      cibleId: '', // ID de l'enfant ou nom de la classe
      date: new Date().toISOString().split('T')[0],
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      
      // 3 champs principaux seulement
      domaine: 'comportement', // Domaine d'observation
      sentiment: 'neutre', // Sentiment général
      descriptionRapide: '', // Description en 1-2 phrases
      
      // Champs optionnels rapides
      intensite: 'moyenne', // Intensité
      contexte: 'activite_libre', // Contexte rapid
  });

  const [observationGeneree, setObservationGeneree] = useState<string>('');

  // Données pour les listes déroulantes
  const categoriesObservation = [
    { value: 'comportement', label: 'Comportement' },
    { value: 'apprentissage', label: 'Apprentissage' },
    { value: 'social', label: 'Interaction sociale' },
    { value: 'emotionnel', label: 'Développement émotionnel' },
    { value: 'cognitif', label: 'Développement cognitif' },
    { value: 'physique', label: 'Développement physique' },
    { value: 'creativite', label: 'Créativité' },
    { value: 'autonomie', label: 'Autonomie' },
    { value: 'sante', label: 'Santé & Bien-être' },
  ];

  const comportementsOptions = [
    { value: 'participation_active', label: 'Participation active' },
    { value: 'concentration', label: 'Concentration' },
    { value: 'cooperation', label: 'Coopération' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'perseverance', label: 'Persévérance' },
    { value: 'creativite', label: 'Créativité' },
    { value: 'curiosite', label: 'Curiosité' },
    { value: 'agitation', label: 'Agitation' },
    { value: 'isolement', label: 'Isolement' },
    { value: 'opposition', label: 'Opposition' },
    { value: 'impulsivite', label: 'Impulsivité' },
    { value: 'anxiete', label: 'Anxiété' },
    { value: 'fatigue', label: 'Fatigue' },
    { value: 'enthousiasme', label: 'Enthousiasme' },
  ];

  const contexteOptions = [
    { value: 'activite_libre', label: 'Activité libre' },
    { value: 'atelier_dirige', label: 'Atelier dirigé' },
    { value: 'repas', label: 'Repas' },
    { value: 'recreation', label: 'Récréation' },
    { value: 'transition', label: 'Transition' },
    { value: 'groupe_entier', label: 'Groupe entier' },
    { value: 'petit_groupe', label: 'Petit groupe' },
    { value: 'activite_exterieure', label: 'Activité extérieure' },
    { value: 'activite_interieure', label: 'Activité intérieure' },
  ];

  const classes = ['(3-4) ans', '(4-5) ans', '(6-7) ans', '(8-9) ans', '(10-11) ans', '12 ans'];
   


  const domainesObservation = [
  { value: 'comportement', label: '👥 Comportement', icon: '👥' },
  { value: 'apprentissage', label: '📚 Apprentissage', icon: '📚' },
  { value: 'social', label: '🤝 Social', icon: '🤝' },
  { value: 'emotionnel', label: '😊 Émotionnel', icon: '😊' },
  { value: 'autonomie', label: '🌟 Autonomie', icon: '🌟' },
];

// Sentiments (couleurs émotionnelles)
const sentimentsOptions = [
  { value: 'tres_positif', label: 'Très positif 🟢', color: 'bg-green-100 text-green-800' },
  { value: 'positif', label: 'Positif 🟡', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'neutre', label: 'Neutre ⚪', color: 'bg-gray-100 text-gray-800' },
  { value: 'preoccupant', label: 'Préoccupant 🟠', color: 'bg-orange-100 text-orange-800' },
  { value: 'inquietant', label: 'Inquiétant 🔴', color: 'bg-red-100 text-red-800' },
];

// Contextes rapides
const contextesRapides = [
  { value: 'activite_libre', label: 'Activité libre' },
  { value: 'atelier_dirige', label: 'Atelier dirigé' },
  { value: 'repas', label: 'Repas' },
  { value: 'recreation', label: 'Récréation' },
  { value: 'transition', label: 'Transition' },
  { value: 'arrivee', label: 'Arrivée' },
  { value: 'depart', label: 'Départ' },
];

// Intensités simples
const intensitesOptions = [
  { value: 'faible', label: 'Faible' },
  { value: 'moyenne', label: 'Moyenne' },
  { value: 'forte', label: 'Forte' },
];
  // Fonction pour générer l'observation avec IA
  const genererObservationIA = () => {
  const enfant = enfants.find(e => e.nom === nouvelleObservation.cibleId);
  const classe = nouvelleObservation.typeCible === 'classe' ? nouvelleObservation.cibleId : enfant?.classe;
  const domaineLabel = domainesObservation.find(d => d.value === nouvelleObservation.domaine)?.label || nouvelleObservation.domaine;
  const sentimentLabel = sentimentsOptions.find(s => s.value === nouvelleObservation.sentiment)?.label || '';
  const contexteLabel = contextesRapides.find(c => c.value === nouvelleObservation.contexte)?.label || '';
  
  // Texte IA fluide et rapide
  let observation = `📝 OBSERVATION RAPIDE\n\n`;
  
  // En-tête
  if (nouvelleObservation.typeCible === 'enfant' && enfant) {
    observation += `👤 ${enfant.nom} (${enfant.classe})\n`;
  } else {
    observation += `👥 Classe : ${classe}\n`;
  }
  observation += `📅 ${nouvelleObservation.date} ${nouvelleObservation.heure}\n`;
  observation += `🏷️ ${domaineLabel.split(' ')[1]}\n\n`;
  
  // Description principale
  observation += `💬 DESCRIPTION :\n`;
  
  if (nouvelleObservation.typeCible === 'enfant' && enfant) {
    observation += `${enfant.nom.split(' ')[0]} `;
  } else {
    observation += `Le groupe `;
  }
  
  // Ajouter le sentiment
  const sentimentText = {
    'tres_positif': 'a montré des signes très positifs',
    'positif': 'a présenté des aspects positifs',
    'neutre': 'a été observé dans son fonctionnement habituel',
    'preoccupant': 'a présenté quelques aspects préoccupants',
    'inquietant': 'a montré des signes inquiétants'
  };
  
  observation += sentimentText[nouvelleObservation.sentiment as keyof typeof sentimentText] || 'a été observé';
  
  // Ajouter contexte si sélectionné
  if (nouvelleObservation.contexte) {
    observation += ` pendant ${contexteLabel.toLowerCase()}. `;
  } else {
    observation += `. `;
  }
  
  // Ajouter l'intensité
  if (nouvelleObservation.intensite) {
    observation += `L'intensité de cette observation est ${nouvelleObservation.intensite}. `;
  }
  
  // Description rapide fournie
  if (nouvelleObservation.descriptionRapide) {
    observation += `\n📋 Note éducateur : "${nouvelleObservation.descriptionRapide}"`;
  }
  
  // Analyse contextuelle rapide
  observation += `\n\n🔍 ANALYSE :\n`;
  
  const analysesRapides = {
    'comportement': `Cette observation comportementale reflète les interactions et réactions dans le contexte éducatif.`,
    'apprentissage': `Cette situation d'apprentissage illustre les processus cognitifs en jeu.`,
    'social': `Cette interaction sociale met en lumière les compétences relationnelles.`,
    'emotionnel': `Cette expression émotionnelle informe sur le bien-être et la régulation affective.`,
    'autonomie': `Cette situation témoigne du développement de l'autonomie et de l'indépendance.`,
  };
  
  observation += analysesRapides[nouvelleObservation.domaine as keyof typeof analysesRapides] || 
                 `Cette observation documente le développement observé.`;
  
  setObservationGeneree(observation);
};

  // Fonction pour sauvegarder l'observation
  const sauvegarderObservation = () => {
    if (!nouvelleObservation.cibleId) {
      alert("Veuillez sélectionner une cible pour l'observation");
      return;
    }
    
    console.log("Observation sauvegardée:", {
      ...nouvelleObservation,
      observationGeneree
    });
    
    alert("Observation sauvegardée avec succès !\n\nL'observation générée par l'IA a été enregistrée.");
    
    // Réinitialiser
    setNouvelleObservation({
      typeCible: 'enfant', // 'enfant' ou 'classe'
      cibleId: '', // ID de l'enfant ou nom de la classe
      date: new Date().toISOString().split('T')[0],
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      
      // 3 champs principaux seulement
      domaine: 'comportement', // Domaine d'observation
      sentiment: 'neutre', // Sentiment général
      descriptionRapide: '', // Description en 1-2 phrases
      
      // Champs optionnels rapides
      intensite: 'moyenne', // Intensité
      contexte: 'activite_libre', // Contexte rapid
    });
    
    setObservationGeneree('');
    setShowAjouterObservation(false);
  };

  // Fonctions existantes
  const togglePresence = (id: number) => {
    setEnfants(prevEnfants => 
      prevEnfants.map(enfant => {
        if (enfant.id === id) {
          const nouveauPresent = !enfant.present;
          return {
            ...enfant,
            present: nouveauPresent,
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

  const sauvegarderPresences = () => {
    console.log("Présences sauvegardées:", enfants);
    setShowGestionPresence(false);
    alert("Les présences ont été mises à jour avec succès !");
  };

  const ajouterActivite = () => {
    if (!nouvelleActivite.titre.trim()) {
      alert("Veuillez saisir un titre pour l'activité");
      return;
    }

    console.log("Nouvelle activité ajoutée:", nouvelleActivite);
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
    });
    
    alert("Activité ajoutée avec succès !");
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
          <RecentActivities onAjouterObservation={() => setShowAjouterObservation(true)} />
          
          {/* 2. Actions rapides */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-300 dark:bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowGestionPresence(true)}
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
        <div className="col-span-12 lg:col-span-8">
          <ChildrenToday enfants={enfants} />
        </div>
        
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
        
      </div>

      {/* Modal de gestion des présences */}
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

              <div className="space-y-3 mb-6">
                {enfants.map(enfant => (
                  <div key={enfant.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors">
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

      {/* Modal ajouter activité */}
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

      {/* Modal d'ajout d'observation avec IA */}
      {showAjouterObservation && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setShowAjouterObservation(false)} />
          <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ajouter une observation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Saisie rapide pour 100+ enfants
                  </p>
                </div>
                <button
                  onClick={() => setShowAjouterObservation(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); genererObservationIA(); }}>
                <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Section Type et Cible */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Cible de l'observation
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Type d'observation *
                        </label>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setNouvelleObservation({...nouvelleObservation, typeCible: 'enfant', cibleId: ''})}
                            className={`px-4 py-3 rounded-lg border text-left ${nouvelleObservation.typeCible === 'enfant' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${nouvelleObservation.typeCible === 'enfant' ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <span className="text-lg">👤</span>
                              </div>
                              <div>
                                <div className="font-medium">Observation individuelle</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Suivi d'un enfant spécifique
                                </div>
                              </div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setNouvelleObservation({...nouvelleObservation, typeCible: 'classe', cibleId: ''})}
                            className={`px-4 py-3 rounded-lg border text-left ${nouvelleObservation.typeCible === 'classe' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${nouvelleObservation.typeCible === 'classe' ? 'bg-purple-100 dark:bg-purple-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <span className="text-lg">👥</span>
                              </div>
                              <div>
                                <div className="font-medium">Observation de classe</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Suivi du groupe entier
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {nouvelleObservation.typeCible === 'enfant' ? 'Sélectionner un enfant *' : 'Sélectionner une classe *'}
                        </label>
                        {nouvelleObservation.typeCible === 'enfant' ? (
                          <select
                            required
                            value={nouvelleObservation.cibleId}
                            onChange={(e) => setNouvelleObservation({...nouvelleObservation, cibleId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            <option value="">Sélectionnez un enfant...</option>
                            {enfants.map(enfant => (
                              <option key={enfant.id} value={enfant.nom}>
                                {enfant.nom} ({enfant.classe})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            required
                            value={nouvelleObservation.cibleId}
                            onChange={(e) => setNouvelleObservation({...nouvelleObservation, cibleId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            <option value="">Sélectionnez une classe...</option>
                            {classes.map(classe => (
                              <option key={classe} value={classe}>{classe}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={nouvelleObservation.date}
                          onChange={(e) => setNouvelleObservation({...nouvelleObservation, date: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Heure
                        </label>
                        <input
                          type="time"
                          value={nouvelleObservation.heure}
                          onChange={(e) => setNouvelleObservation({...nouvelleObservation, heure: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Domaine et Sentiment */}
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Analyse de l'observation
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Domaine d'observation *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {domainesObservation.map(domaine => (
                            <button
                              key={domaine.value}
                              type="button"
                              onClick={() => setNouvelleObservation({...nouvelleObservation, domaine: domaine.value})}
                              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${nouvelleObservation.domaine === domaine.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                            >
                              <div className="text-xl mb-1">{domaine.icon}</div>
                              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {domaine.label.split(' ')[1]}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Impression générale *
                        </label>
                        <div className="space-y-2">
                          {sentimentsOptions.map(sentiment => (
                            <button
                              key={sentiment.value}
                              type="button"
                              onClick={() => setNouvelleObservation({...nouvelleObservation, sentiment: sentiment.value})}
                              className={`w-full px-4 py-2 rounded-lg border flex items-center justify-between transition-all ${nouvelleObservation.sentiment === sentiment.value ? 'ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${sentiment.color.split(' ')[0]}`}></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {sentiment.label.split(' ')[1]}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {sentiment.label.split(' ')[2]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Description et Contexte */}
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Détails de l'observation
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Note rapide (1-2 phrases) *
                        </label>
                        <textarea
                          required
                          value={nouvelleObservation.descriptionRapide}
                          onChange={(e) => setNouvelleObservation({...nouvelleObservation, descriptionRapide: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          placeholder="Ex: A bien participé à l'activité, semblait fatigué en fin de journée, a aidé un camarade en difficulté..."
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Soyez concis mais précis. Cette note servira de base à l'IA pour générer l'observation complète.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Moment
                          </label>
                          <select
                            value={nouvelleObservation.contexte}
                            onChange={(e) => setNouvelleObservation({...nouvelleObservation, contexte: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            <option value="">Non spécifié</option>
                            {contextesRapides.map(contexte => (
                              <option key={contexte.value} value={contexte.value}>{contexte.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Intensité
                          </label>
                          <select
                            value={nouvelleObservation.intensite}
                            onChange={(e) => setNouvelleObservation({...nouvelleObservation, intensite: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            {intensitesOptions.map(intensite => (
                              <option key={intensite.value} value={intensite.value}>{intensite.label}</option>
                            ))}
                          </select>
                        </div>
                        
                      
                      </div>
                    </div>
                  </div>

                  {/* Section Prévisualisation IA */}
                  {observationGeneree && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-lg">🤖</span>
                        Observation générée par l'IA
                      </h4>
                      
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 max-h-[200px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 dark:text-gray-300">
                          {observationGeneree}
                        </pre>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(observationGeneree)}
                          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                        >
                          <span>📋</span>
                          Copier le texte
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setShowAjouterObservation(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!nouvelleObservation.cibleId || !nouvelleObservation.descriptionRapide}
                    className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${!nouvelleObservation.cibleId || !nouvelleObservation.descriptionRapide ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'}`}
                  >
                    <span className="text-lg">🤖</span>
                    Générer avec IA
                  </button>
                  {observationGeneree && (
                    <button
                      type="button"
                      onClick={sauvegarderObservation}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Enregistrer
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}