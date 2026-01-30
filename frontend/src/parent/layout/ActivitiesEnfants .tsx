// pages/ActivitiesEnfants.tsx - Version Premium Professionnelle
import { useState } from "react";
import { Link } from "react-router";

const ActivitiesEnfants = () => {
  const objectifsPedas: Record<string, string> = {
  "4-5": "Développement des compétences motrices fondamentales, initiation au langage et premières interactions sociales.",
  "5-6": "Préparation aux apprentissages scolaires avec motricité fine, vocabulaire de base, logique.",
  "6-7": "Lecture, écriture, calcul. Développement de l'autonomie et des habiletés sociales.",
  "8-9": "Renforcement des savoirs de base, développement du raisonnement, créativité et curiosité.",
  "10-11": "Approfondissement des matières scolaires, autonomie, esprit critique et projets complexes.",
};
  // États pour la navigation
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("4-5");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // Groupes d'âge avec design premium
  const ageGroups = [
    { 
      id: "4-5", 
      label: "4-5 ans", 
      subtitle: "Maternelle", 
      icon: "👶",
      color: "from-indigo-500 via-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20",
      description: "Développement des compétences fondamentales"
    },
    { 
      id: "5-6", 
      label: "5-6 ans", 
      subtitle: "Pré-scolaire", 
      icon: "🧒",
      color: "from-teal-500 via-emerald-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-900/20 dark:via-emerald-900/20 dark:to-cyan-900/20",
      description: "Préparation aux apprentissages scolaires"
    },
    { 
      id: "6-7", 
      label: "6-7 ans", 
      subtitle: "CP", 
      icon: "📚",
      color: "from-amber-500 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20",
      description: "Acquisition des fondamentaux"
    },
    { 
      id: "8-9", 
      label: "8-9 ans", 
      subtitle: "CE1-CE2", 
      icon: "🌟",
      color: "from-rose-500 via-pink-500 to-fuchsia-500",
      bgColor: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-fuchsia-900/20",
      description: "Consolidation des connaissances"
    },
    { 
      id: "10-11", 
      label: "10-11 ans", 
      subtitle: "CM1-CM2", 
      icon: "🚀",
      color: "from-blue-500 via-cyan-500 to-sky-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-sky-900/20",
      description: "Approfondissement et autonomie"
    },
  ];

  // Catégories d'activités avec design premium
  const categoriesByAge = {
    "4-5": [
      { id: "motricite", name: "Motricité", icon: "🤸‍♂️", color: "from-blue-500 to-cyan-500", iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100" },
      { id: "langage", name: "Langage", icon: "🗣️", color: "from-purple-500 to-pink-500", iconBg: "bg-gradient-to-br from-purple-100 to-pink-100" },
      { id: "sensoriel", name: "Sensoriel", icon: "👁️", color: "from-emerald-500 to-teal-500", iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100" },
      { id: "creativite", name: "Créativité", icon: "🎨", color: "from-amber-500 to-orange-500", iconBg: "bg-gradient-to-br from-amber-100 to-orange-100" },
      { id: "social", name: "Social", icon: "👥", color: "from-rose-500 to-red-500", iconBg: "bg-gradient-to-br from-rose-100 to-red-100" },
    ],
    "5-6": [
      { id: "lecture", name: "Lecture", icon: "📖", color: "from-indigo-500 to-purple-500", iconBg: "bg-gradient-to-br from-indigo-100 to-purple-100" },
      { id: "ecriture", name: "Écriture", icon: "✍️", color: "from-blue-500 to-cyan-500", iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100" },
      { id: "calcul", name: "Calcul", icon: "🧮", color: "from-emerald-500 to-green-500", iconBg: "bg-gradient-to-br from-emerald-100 to-green-100" },
      { id: "logique", name: "Logique", icon: "🧠", color: "from-amber-500 to-yellow-500", iconBg: "bg-gradient-to-br from-amber-100 to-yellow-100" },
      { id: "motricite-fine", name: "Motricité Fine", icon: "✋", color: "from-rose-500 to-pink-500", iconBg: "bg-gradient-to-br from-rose-100 to-pink-100" },
    ],
    "6-7": [
      { id: "francais", name: "Français", icon: "🇫🇷", color: "from-blue-500 to-indigo-500", iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100" },
      { id: "maths", name: "Maths", icon: "➕", color: "from-purple-500 to-pink-500", iconBg: "bg-gradient-to-br from-purple-100 to-pink-100" },
      { id: "decouverte", name: "Découverte", icon: "🔍", color: "from-emerald-500 to-teal-500", iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100" },
      { id: "arts", name: "Arts", icon: "🎭", color: "from-amber-500 to-orange-500", iconBg: "bg-gradient-to-br from-amber-100 to-orange-100" },
      { id: "sport", name: "Sport", icon: "⚽", color: "from-red-500 to-rose-500", iconBg: "bg-gradient-to-br from-red-100 to-rose-100" },
    ],
    "8-9": [
  { id: "lecture-avancee", name: "Lecture Avancée", icon: "📚", color: "from-indigo-500 to-blue-500", iconBg: "bg-gradient-to-br from-indigo-100 to-blue-100" },
  { id: "experiences", name: "Expériences", icon: "🧪", color: "from-green-500 to-teal-500", iconBg: "bg-gradient-to-br from-green-100 to-teal-100" },
  { id: "musique", name: "Musique", icon: "🎵", color: "from-pink-500 to-rose-500", iconBg: "bg-gradient-to-br from-pink-100 to-rose-100" },
],

"10-11": [
  { id: "programmation", name: "Programmation", icon: "💻", color: "from-blue-600 to-purple-600", iconBg: "bg-gradient-to-br from-blue-100 to-purple-100" },
  { id: "sciences", name: "Sciences", icon: "🔬", color: "from-green-500 to-emerald-500", iconBg: "bg-gradient-to-br from-green-100 to-emerald-100" },
  { id: "art-numerique", name: "Art Numérique", icon: "🖌️", color: "from-rose-500 to-pink-500", iconBg: "bg-gradient-to-br from-rose-100 to-pink-100" },
],

  };

  // Activités premium
  const activitiesByCategory = {
    "motricite": [
      { 
        id: "mot1", 
        title: "Parcours Psychomoteur", 
        duration: "45 min", 
        points: 30, 
        description: "Développement de la coordination et de l'équilibre",
        difficulty: "Facile",
        icon: "🏃‍♂️",
        skills: ["Coordination", "Équilibre", "Agilité"],
        color: "from-blue-400 to-blue-600",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20"
      },
      { 
        id: "mot2", 
        title: "Jeux de Ballon", 
        duration: "30 min", 
        points: 20, 
        description: "Amélioration de la coordination œil-main",
        difficulty: "Moyen",
        icon: "⚽",
        skills: ["Précision", "Réflexes", "Collaboration"],
        color: "from-emerald-400 to-emerald-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20"
      },
      { 
        id: "mot3", 
        title: "Danse Rythmique", 
        duration: "25 min", 
        points: 15, 
        description: "Expression corporelle et sens du rythme",
        difficulty: "Facile",
        icon: "💃",
        skills: ["Rythme", "Expression", "Créativité"],
        color: "from-purple-400 to-purple-600",
        bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20"
      },
    ],
    "langage": [
      { 
        id: "lang1", 
        title: "Jeu des Sons", 
        duration: "20 min", 
        points: 25, 
        description: "Discrimination auditive des phonèmes",
        difficulty: "Facile",
        icon: "👂",
        skills: ["Écoute", "Reconnaissance", "Mémoire"],
        color: "from-amber-400 to-amber-600",
        bgColor: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20"
      },
      { 
        id: "lang2", 
        title: "Histoires à Compléter", 
        duration: "30 min", 
        points: 30, 
        description: "Développement de l'imagination et du vocabulaire",
        difficulty: "Moyen",
        icon: "📖",
        skills: ["Créativité", "Vocabulaire", "Compréhension"],
        color: "from-indigo-400 to-indigo-600",
        bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20"
      },
      { 
        id: "lang3", 
        title: "Vocabulaire en Images", 
        duration: "25 min", 
        points: 20, 
        description: "Association mots-images et enrichissement lexical",
        difficulty: "Facile",
        icon: "🖼️",
        skills: ["Vocabulaire", "Association", "Mémoire visuelle"],
        color: "from-rose-400 to-rose-600",
        bgColor: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/20"
      },
      
    ],
    "lecture-avancee": [
  {
    id: "lec1",
    title: "Club de Lecture",
    duration: "40 min",
    points: 40,
    description: "Discussion autour d’un chapitre avec des questions ouvertes",
    difficulty: "Moyen",
    icon: "📖",
    skills: ["Compréhension", "Analyse", "Expression"],
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/20",
  }
],

"experiences": [
  {
    id: "exp1",
    title: "Volcan Maison",
    duration: "30 min",
    points: 35,
    description: "Réaliser une éruption volcanique avec du vinaigre et bicarbonate",
    difficulty: "Facile",
    icon: "🌋",
    skills: ["Observation", "Curiosité", "Méthode scientifique"],
    color: "from-green-400 to-teal-500",
    bgColor: "bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/20",
  }
],

"programmation": [
  {
    id: "prog1",
    title: "Découverte Scratch",
    duration: "45 min",
    points: 50,
    description: "Créer une animation simple avec Scratch",
    difficulty: "Moyen",
    icon: "🧑‍💻",
    skills: ["Logique", "Création", "Résolution de problème"],
    color: "from-blue-600 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/20",
  }
],

"sciences": [
  {
    id: "sci1",
    title: "Cycle de l'eau",
    duration: "30 min",
    points: 40,
    description: "Créer une maquette du cycle de l’eau à la maison",
    difficulty: "Facile",
    icon: "💧",
    skills: ["Connaissances", "Observation", "Créativité"],
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/20",
  }
],

"art-numerique": [
  {
    id: "art1",
    title: "Crée ton Emoji",
    duration: "25 min",
    points: 30,
    description: "Dessiner un emoji en pixel art avec un outil numérique",
    difficulty: "Facile",
    icon: "🎨",
    skills: ["Design", "Créativité", "Informatique"],
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/20",
  }
],

  };

  // Fonctions utilitaires
  const getCurrentActivities = () => {
    if (!selectedCategory) return [];
    return activitiesByCategory[selectedCategory as keyof typeof activitiesByCategory] || [];
  };

  const getSelectedActivityDetails = () => {
    if (!selectedActivity) return null;
    return getCurrentActivities().find(a => a.id === selectedActivity) || null;
  };

  const handleAgeGroupSelect = (ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId);
    setSelectedCategory(null);
    setSelectedActivity(null);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedActivity(null);
  };


  return (
    <div className=" w-full mx-auto min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 py-2 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="text-center mb-4 relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            {/* <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Activités Éducatives
              </h1>
            </div> */}
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Des activités pédagogiques expertes, adaptées à chaque étape du développement de votre enfant
            </p>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {selectedCategory ? `${getCurrentActivities().length} activités disponibles` : "Sélectionnez l'âge pour commencer"}
              </span>
            </div>
          </div>
        </div>

        {/* Workflow Progress Indicator */}
        {/* <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 -z-10"></div>
            
            {[
              { step: 1, label: "Âge", active: true },
              { step: 2, label: "Domaine", active: !!selectedAgeGroup },
              { step: 3, label: "Activité", active: !!selectedCategory },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-500 ${
                  item.active
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-110"
                    : "bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700"
                }`}>
                  {item.step}
                </div>
                <span className={`mt-2 text-sm font-medium transition-colors ${
                  item.active ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Étape 1 : Sélection d'âge - Design Premium */}
        <div className="relative ">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-white">👶</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white dark:text-white">
                    Sélectionnez l'âge de votre enfant
                  </h2>
                  <p className="text-slate-900 dark:text-slate-300 mt-1">
                    Choisissez la tranche d'âge correspondante pour des activités adaptées
                  </p>
                </div>
              </div>
              
              <div className="hidden lg:block px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl shadow-inner">
                <div className="text-sm text-slate-500 dark:text-slate-400">Sélection actuelle</div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {ageGroups.find(g => g.id === selectedAgeGroup)?.label}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ageGroups.map((ageGroup) => (
                <button
                  key={ageGroup.id}
                  onClick={() => handleAgeGroupSelect(ageGroup.id)}
                  className={`relative group p-6 rounded-2xl border-2 transition-all duration-500 ${
                    selectedAgeGroup === ageGroup.id
                      ? `border-transparent bg-gradient-to-br ${ageGroup.color} text-white shadow-2xl scale-105`
                      : "border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg"
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div className={`text-4xl ${selectedAgeGroup === ageGroup.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                      {ageGroup.icon}
                    </div>
                    
                    <div>
                      <div className={`text-2xl font-bold ${selectedAgeGroup === ageGroup.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {ageGroup.label}
                      </div>
                      <div className={`text-sm mt-1 ${selectedAgeGroup === ageGroup.id ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}`}>
                        {ageGroup.subtitle}
                      </div>
                    </div>
                    
                    <div className={`text-xs ${selectedAgeGroup === ageGroup.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      {ageGroup.description}
                    </div>
                  </div>
                  
                  {selectedAgeGroup === ageGroup.id && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            

            {/* Info Card */}
            <div className={`mt-8 p-6 rounded-2xl ${ageGroups.find(g => g.id === selectedAgeGroup)?.bgColor} border border-white/20`}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center shadow-md">
                  <span className="text-3xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Objectifs pédagogiques spécifiques</h4>
              <p className="text-slate-700 dark:text-slate-300">
                      {objectifsPedas[selectedAgeGroup] || "Objectifs pédagogiques adaptés à l'âge de votre enfant."}
              </p>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Étape 2 : Sélection de catégorie */}
        {selectedAgeGroup && (
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Choisissez un domaine d'apprentissage
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      Sélectionnez la compétence que vous souhaitez développer chez votre enfant
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm"
                >
                  ← Retour
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {categoriesByAge[selectedAgeGroup as keyof typeof categoriesByAge]?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`group relative p-5 rounded-2xl border-2 transition-all duration-500 ${
                      selectedCategory === category.id
                        ? `border-transparent bg-gradient-to-br ${category.color} shadow-2xl scale-105`
                        : "border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg"
                    }`}
                  >
                    <div className="text-center space-y-5">
                      <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl ${selectedCategory === category.id ? 'bg-white/20' : category.iconBg} shadow-md`}>
                        {category.icon}
                      </div>
                      
                      <div>
                        <div className={`font-semibold ${selectedCategory === category.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          {category.name}
                        </div>
                      </div>
                    </div>
                    
                    {selectedCategory === category.id && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Skills Visualization */}
              {selectedCategory && (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                      Compétences développées
                    </h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Niveau de progression
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {["Langage & Communication", "Pensée Logique", "Créativité Artistique", "Développement Social"].map((skill, index) => {
                      const score = Math.floor(Math.random() * 30) + 70;
                      const colors = [
                        "from-blue-400 to-cyan-500",
                        "from-purple-400 to-pink-500",
                        "from-emerald-400 to-teal-500",
                        "from-amber-400 to-orange-500"
                      ];
                      
                      return (
                        <div key={index} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">{skill}</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white">{score}%</div>
                          </div>
                          
                          <div className="relative">
                            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r ${colors[index]}`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                              <span>Débutant</span>
                              <span>Avancé</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Étape 3 : Sélection d'activité */}
        {selectedCategory && (
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl text-white">📝</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Sélectionnez une activité
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {getCurrentActivities().length} activité{getCurrentActivities().length > 1 ? 's' : ''} disponible{getCurrentActivities().length > 1 ? 's' : ''} dans cette catégorie
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {getCurrentActivities().map((activity) => (
                  <div
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity.id)}
                    className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                      selectedActivity === activity.id
                        ? "border-blue-500 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-2xl scale-105"
                        : "border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl"
                    }`}
                  >
                    <div className="space-y-6">
                      {/* Activity Header */}
                      <div className="flex items-start justify-between">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${activity.bgColor} shadow-lg`}>
                          {activity.icon}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                            activity.difficulty === "Facile" 
                              ? "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-400"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-400"
                          }`}>
                            {activity.difficulty}
                          </span>
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-semibold">{activity.points} points</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Content */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          {activity.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                          {activity.description}
                        </p>
                        
                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {activity.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Activity Footer */}
                      <div className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{activity.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {selectedActivity === activity.id ? (
                            <>
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse"></div>
                              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Sélectionnée</span>
                            </>
                          ) : (
                            <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                              Sélectionner →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Details Panel */}
              {selectedActivity && getSelectedActivityDetails() && (
                <div className="mt-12 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl shadow-2xl border border-emerald-100/30 dark:border-emerald-900/30">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                          <span className="text-3xl text-white">✨</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Activité sélectionnée
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            Prêt à commencer l'apprentissage avec votre enfant
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Prêt à commencer
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                      { label: "Durée", value: getSelectedActivityDetails()?.duration, icon: "⏱️", color: "from-blue-400 to-cyan-500" },
                      { label: "Points", value: `${getSelectedActivityDetails()?.points} pts`, icon: "⭐", color: "from-amber-400 to-yellow-500" },
                      { label: "Âge cible", value: ageGroups.find(g => g.id === selectedAgeGroup)?.label, icon: "👶", color: "from-purple-400 to-pink-500" },
                      { label: "Difficulté", value: getSelectedActivityDetails()?.difficulty, icon: "📊", color: "from-emerald-400 to-teal-500" },
                    ].map((stat, index) => (
                      <div key={index} className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 shadow-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                            <span className="text-2xl text-white">{stat.icon}</span>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <button className="group relative px-16 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Commencer l'activité
                      </span>
                    </button>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm">
                      Cette activité sera enregistrée dans le parcours éducatif de votre enfant
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guide d'utilisation élégant */}
        {!selectedCategory && (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-10 shadow-2xl border border-white/40 dark:border-slate-700/50">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Guide d'utilisation
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Suivez ces étapes simples pour sélectionner les activités parfaites pour votre enfant
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "01", title: "Sélection de l'âge", desc: "Identifiez la tranche d'âge correspondant au niveau de développement actuel de votre enfant", icon: "👶", color: "from-blue-500 to-cyan-500" },
                { number: "02", title: "Choix du domaine", desc: "Sélectionnez le type de compétence que vous souhaitez développer ou renforcer", icon: "🎯", color: "from-purple-500 to-pink-500" },
                { number: "03", title: "Lancement d'activité", desc: "Démarrez l'activité choisie et accompagnez votre enfant dans son apprentissage", icon: "🚀", color: "from-emerald-500 to-teal-500" },
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center gap-5 mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <div className="text-3xl text-white font-bold">{step.number}</div>
                      </div>
                      <div className="text-5xl">{step.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 group-hover:from-purple-500 group-hover:to-pink-500 transition-colors"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesEnfants;