// pages/Home.tsx - Interface Parent améliorée selon cahier des charges
import { BellIcon, CalendarIcon, ClipboardCheckIcon, StarIcon, User2Icon, UserCircleIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { CheckCircleIcon, UserGroup02Icon } from "../../icons";

const HomeParent = () => {
  const [children] = useState([
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
  ]);

  const [dailyAgenda] = useState([
    { time: "08:00", activity: "Accueil et jeu libre", type: "arrival", completed: true },
    { time: "09:00", activity: "Atelier langage", type: "learning", completed: true },
    { time: "10:30", activity: "Collation", type: "meal", completed: true },
    { time: "11:00", activity: "Activité motricité", type: "activity", completed: false },
    { time: "12:30", activity: "Déjeuner", type: "meal", completed: false },
    { time: "13:30", activity: "Sieste", type: "rest", completed: false },
    { time: "15:00", activity: "Goûter", type: "meal", completed: false },
    { time: "15:30", activity: "Jeux extérieurs", type: "activity", completed: false },
    { time: "16:30", activity: "Départ", type: "departure", completed: false }
  ]);

  const [aiNotifications] = useState([
    {
      id: 1,
      type: "health",
      title: "État de santé quotidien",
      message: "Tous les enfants en bonne forme aujourd'hui",
      time: "09:15",
      priority: "low",
      icon: "❤️"
    },
    {
      id: 2,
      type: "activity",
      title: "Photo activité disponible",
      message: "Ahmed pendant l'atelier peinture",
      time: "10:45",
      priority: "medium",
      icon: "📸"
    },
    {
      id: 3,
      type: "alert",
      title: "Rapport IA hebdomadaire",
      message: "Rapport de progression disponible",
      time: "Hier, 18:00",
      priority: "high",
      icon: "📊"
    },
    {
      id: 4,
      type: "reminder",
      title: "Facture à régler",
      message: "Paiement mensuel dû dans 3 jours",
      time: "Demain",
      priority: "medium",
      icon: "💰"
    }
  ]);

  const [aiInsights] = useState([
    {
      title: "Conseil pédagogique IA",
      content: "Recommandation : lecture interactive 20min/jour pour Ahmed",
      category: "education",
      child: "Ahmed"
    },
    {
      title: "Analyse sommeil",
      content: "Sara : qualité de sommeil excellente cette semaine",
      category: "health",
      child: "Sara"
    },
    {
      title: "Prédiction développement",
      content: "Progression prévue : +12% en compétences sociales (30 jours)",
      category: "prediction",
      child: "Tous"
    }
  ]);

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
      <div className="flex justify-center ">
        <div className="max-w-6xl w-full " >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            {/* Effet de fond */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              {/* Texte à gauche */}
              <div className="flex-1">
                {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4"> */}
                  {/* <span className="text-xs">👨‍👩‍👧‍👦</span>
                  <span className="text-xs font-medium">Espace Familial</span> */}
              {/* </div> */}
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Bienvenue dans votre espace familial</h2>
              <p className="text-white/80 mb-6 max-w-lg">Suivez en temps réel les progrès et activités éducatives de vos enfants</p>
              
              {/* Statistiques rapides */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  {/* <span className="text-sm">{quickStats.attendance.present}/{children.length} présents</span> */}
                   <span className="text-sm">2/4 présents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  {/* <span className="text-sm">{familyStats.monthlyActivities} activités ce mois</span> */}
                  <span className="text-sm">5 activités aujourd'hui</span>
                </div>
              </div>
            </div>
            
            {/* Image au milieu */}
            <div className="hidden lg:block mx-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden  shadow-lg">
                  <img 
                    src="/images/logo/logo_famille.png" 
                    alt="Famille"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Effet de décoration */}
                {/* <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                  <span className="text-xs">⭐</span>
                </div> */}
              </div>
            </div>
            
            {/* Cartes statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {/* Carte Enfants */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{children.length}</div>
                    <div className="text-xs text-white/80">Enfants</div>
                  </div>
                </div>
              </div>
              
              {/* Carte Activités */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <ClipboardCheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{quickStats.activities.completed}</div>
                    <div className="text-xs text-white/80">Activités</div>
                  </div>
                </div>
              </div>
              
              {/* Carte Performance */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    {/* <StarIcon className="w-5 h-5 text-white fill-white" /> */}
                    <svg className="w-5 h-5 text-white bg-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">{familyStats.satisfaction}%</div>
                      <div className="text-xs px-2 py-1 bg-white/20 rounded-full">+2.5%</div>
                    </div>
                    <div className="text-xs text-white/80">Pérformance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Section Profil enfants - AMÉLIORÉE */}
      <div className="flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <UserGroup02Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vos Enfants</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">etat de vos enfants aujourd'hui</p>
              </div>
            </div>
            <Link 
              to="/parent/enfants"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              Voir tous <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {children.slice(0, 2).map((child) => (
              <div 
                key={child.id}
                className={`rounded-2xl shadow-lg ${child.bgColor} ${child.borderColor} border transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="p-6">
                  {/* En-tête de la carte enfant */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${child.color} opacity-20`}></div>
                        <img 
                          src={child.avatar} 
                          alt={child.name}
                          className="relative w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-lg"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-r ${child.color} flex items-center justify-center`}>
                          {child.presence.today ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{child.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{child.age} • {child.class}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Éducateur : {child.educator}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      child.presence.today 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {child.presence.today ? "Présent" : "Absent"}
                    </div>
                  </div>

                  {/* Évolution avec graphique simple */}
                  {/* <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Progression cette semaine</h4>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">+{child.performance}%</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {Object.entries(child.evolution).map(([key, value]) => (
                        <div key={key} className="text-center group">
                          <div className="relative h-16 flex items-end justify-center mb-2">
                            <div 
                              className="w-3 rounded-t-lg bg-gradient-to-t from-gray-300 to-gray-100 dark:from-gray-600 dark:to-gray-700 absolute bottom-0"
                              style={{ height: '40%' }}
                            ></div>
                            <div 
                              className={`w-3 rounded-t-lg bg-gradient-to-t ${child.color} absolute bottom-0 transition-all duration-500`}
                              style={{ height: `${value}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Activité actuelle */}
<div className="mb-6">
  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Activité actuelle</h4>
  <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        child.presence.today 
          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
      }`}>
        {child.presence.today ? 
          child.id === 1 ? "✏️" :  // Ahmed - écriture/calcul
          child.id === 2 ? "🧩" :  // Sara - puzzle
          child.id === 3 ? "🧮" :  // Mohamed - calcul
          "🎵"                     
          : "🏠"}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900 dark:text-white">
          {child.presence.today ? 
            child.id === 1 ? "Exercices de calcul mental" :
            child.id === 2 ? "Jeux de logique" :
            child.id === 3 ? "Problèmes mathématiques" :
            "Atelier rythme et chant"
            : "À la maison"}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {child.presence.today 
            ? child.id === 1 ? "Mathématiques • 10:00 - 11:00" :
              child.id === 2 ? "Logique • 11:30 - 12:30" :
              child.id === 3 ? "Calcul • 14:00 - 15:00" :
              "Musique • 15:30 - 16:30"
            : "Retour prévu demain"}
        </div>
      </div>
    </div>
    {child.presence.today && (
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Progression</span>
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            {child.id === 1 ? "85%" :
             child.id === 2 ? "92%" :
             child.id === 3 ? "78%" :
             "90%"}
          </span>
        </div>
        <div className="mt-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            style={{ 
              width: child.id === 1 ? '85%' :
                     child.id === 2 ? '92%' :
                     child.id === 3 ? '78%' :
                     '90%'
            }}
          ></div>
        </div>
      </div>
    )}
  </div>
</div>
                  {/* Santé et actions rapides */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        child.health.allergies[0] === "Aucune" ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Santé : <span className="font-medium">Normale</span>
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Link 
                        to={`/parent/enfant/${child.id}/activities`}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Activités
                      </Link>
                      <Link 
                        to={`/parent/enfant/${child.id}/reports`}
                        className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity"
                      >
                        Rapport
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Agenda et Notifications - AMÉLIORÉE */}
<div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
  {/* Agenda du jour - Prend toute la largeur maintenant */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <CalendarIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agenda du Jour</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mise à jour en temps réel</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {quickStats.activities.completed}/{quickStats.activities.planned} terminés
      </div>
    </div>
    
    <div className="space-y-3">
      {dailyAgenda.map((item, index) => (
        <div 
          key={index}
          className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
            item.completed 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/30' 
              : 'bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className={`w-14 text-center ${
            item.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
          }`}>
            <div className="font-bold text-lg">{item.time}</div>
          </div>
          
          <div className="flex-1 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${
              item.type === 'arrival' ? 'bg-blue-500' :
              item.type === 'meal' ? 'bg-amber-500' :
              item.type === 'activity' ? 'bg-green-500' :
              item.type === 'rest' ? 'bg-purple-500' :
              'bg-gray-500'
            }`}></div>
            <span className={`font-medium ${
              item.completed ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'
            }`}>
              {item.activity}
            </span>
          </div>
          
          <div>
            {item.completed ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                <CheckCircleIcon className="w-3 h-3" />
                <span>Terminé</span>
              </div>
            ) : (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                ⏳ À venir
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Section 3: Activités récentes et galerie - Maintenant 3 colonnes */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {/* Activités récentes - Prend 2 colonnes */}
  <div className="lg:col-span-2">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activités Récentes</h2>
        <Link 
          to="/parent/activities_enfants"
          className="text-sm text-green-600 dark:text-green-400 hover:underline"
        >
          Voir toutes →
        </Link>
      </div>
      
      <div className="space-y-4">
        {todayActivities.slice(0, 3).map((activity) => {
          const child = children.find(c => c.name.split(" ")[0] === activity.child);
          return (
            <div 
              key={activity.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {child && (
                    <img 
                      src={child.avatar} 
                      alt={child.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{activity.child}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {activity.media.includes("photo") && (
                    <span className="text-blue-500">📷</span>
                  )}
                  {activity.media.includes("video") && (
                    <span className="text-purple-500">🎥</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {activity.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Observations : </span>
                {activity.aiAssessment}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <span className="text-green-600 dark:text-green-400">✨</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Prochaine activité recommandée</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Jeu de construction pour développer la logique</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Galerie et photos - Prend 1 colonne */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Galerie du Jour</h2>
      <Link 
        to="/parent/gallery"
        className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
      >
        Album complet →
      </Link>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      {children.slice(0, 4).map((child, index) => (
        <div key={child.id} className="aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative group cursor-pointer">
          <img 
            src={child.avatar} 
            alt={child.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-sm font-medium">{child.name.split(" ")[0]}</div>
            <div className="text-xs">{child.age}</div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
          <span className="text-pink-600 dark:text-pink-400">🌟</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Moment préféré aujourd'hui</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Ahmed pendant l'atelier peinture</p>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Section 5: Messagerie rapide */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messagerie & Communication</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Contact rapide avec l'équipe éducative</p>
          </div>
          <Link 
            to="/parent/messaging"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Nouveau message
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">👩‍🏫</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Éducatrice Ahmed</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mme Fatma</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
              Contacter
            </button>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">👩‍🏫</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Éducatrice Sara & Nour</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mme Amina</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
              Contacter
            </button>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">👨‍🏫</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Éducateur Mohamed</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">M. Karim</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
              Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeParent;