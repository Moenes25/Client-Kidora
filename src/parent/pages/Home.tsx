// pages/Home.tsx - Interface Parent améliorée selon cahier des charges
import { useState } from "react";
import { Link } from "react-router";

const HomeParent = () => {
  const [children] = useState([
    {
      id: 1,
      name: "Lucas Martin",
      age: "8 ans",
      class: "CE2",
      educator: "Mme Sophie",
      avatar: "LM",
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
      evolution: {
        language: 85,
        motor: 78,
        cognitive: 90,
        social: 82
      }
    },
    {
      id: 2,
      name: "Emma Dubois",
      age: "6 ans",
      class: "CP",
      educator: "Mme Julie",
      avatar: "ED",
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
      message: "Lucas pendant l'atelier peinture",
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
      content: "Recommandation : lecture interactive 20min/jour pour Lucas",
      category: "education",
      child: "Lucas"
    },
    {
      title: "Analyse sommeil",
      content: "Emma : qualité de sommeil excellente cette semaine",
      category: "health",
      child: "Emma"
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
      child: "Lucas",
      time: "10:00",
      skills: ["Créativité", "Motricité fine"],
      media: ["photo", "video"],
      aiAssessment: "Très bon engagement, mélange de couleurs créatif"
    },
    {
      id: 2,
      title: "Construction blocs",
      child: "Emma",
      time: "11:30",
      skills: ["Logique", "Spatial"],
      media: ["photo"],
      aiAssessment: "Excellente résolution de problèmes"
    }
  ]);

  const [quickStats] = useState({
    attendance: {
      present: 2,
      absent: 0,
      rate: "100%"
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête dynamique avec stats rapides */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tableau de Bord Parent
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Tous présents</span>
          </div>
          {/* <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            🤖 IA Kidora
          </button> */}
        </div>
      </div>

      {/* Section 1: Profil enfants rapide */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {children.map((child) => (
          <div 
            key={child.id}
            className={`p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${child.bgColor}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${child.color} flex items-center justify-center text-white text-lg font-bold`}>
                  {child.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{child.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{child.age} • {child.class}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Éducatrice : {child.educator}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${child.presence.today ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                {child.presence.today ? "Présent" : "Absent"}
              </div>
            </div>

            {/* Mini évolution */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Évolution récente</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{child.evolution.language}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Langage</div>
                </div>
                <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{child.evolution.social}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Social</div>
                </div>
              </div>
            </div>

            {/* Santé rapide */}
            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Santé : </span>
                  <span className="font-medium text-green-600 dark:text-green-400">Normale</span>
                </div>
                <div className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                  {child.health.allergies.length === 0 ? 'Aucune allergie' : `${child.health.allergies.length} allergie(s)`}
                </div>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="flex justify-between">
              <Link 
                to={`/parent/enfant/${child.id}/activities`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Activités →
              </Link>
              <Link 
                to={`/parent/enfant/${child.id}/reports`}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                Rapport →
              </Link>
              <Link 
                to={`/parent/enfant/${child.id}/messages`}
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Messages →
              </Link>
            </div>
          </div>
        ))}

        {/* Carte statistiques quotidiennes */}
        <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">Aujourd'hui</h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-white">Présence</span>
                <span className="text-white font-bold">{quickStats.attendance.rate}</span>
              </div>
              <div className="text-white/80 text-sm">
                {quickStats.attendance.present}/{quickStats.attendance.present + quickStats.attendance.absent} enfants
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-white">Activités</span>
                <span className="text-white font-bold">{quickStats.activities.rate}</span>
              </div>
              <div className="text-white/80 text-sm">
                {quickStats.activities.completed}/{quickStats.activities.planned} terminées
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-white">Repas</span>
                <span className="text-white font-bold">{quickStats.meals.notes}</span>
              </div>
              <div className="text-white/80 text-sm">
                {quickStats.meals.eaten}/{quickStats.meals.eaten + quickStats.meals.remaining} pris
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-white">Sieste</span>
                <span className="text-white font-bold">{quickStats.naps.quality}</span>
              </div>
              <div className="text-white/80 text-sm">
                Durée : {quickStats.naps.duration}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <Link 
              to="/parent/agenda" 
              className="block text-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              Voir l'agenda complet
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: Agenda du jour et notifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Agenda du jour */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agenda du Jour</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mise à jour en temps réel
              </div>
            </div>
            
            <div className="space-y-3">
              {dailyAgenda.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    item.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30' 
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-12 text-center ${item.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    <div className="font-bold">{item.time}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'arrival' ? 'bg-blue-500' :
                        item.type === 'meal' ? 'bg-amber-500' :
                        item.type === 'activity' ? 'bg-green-500' :
                        item.type === 'rest' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className={`font-medium ${item.completed ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'}`}>
                        {item.activity}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    {item.completed ? (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                        ✓ Terminé
                      </span>
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

        {/* Notifications IA */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications IA</h2>
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
              {aiNotifications.length} nouvelles
            </span>
          </div>
          
          <div className="space-y-4">
            {aiNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                  notification.priority === 'high' 
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30'
                    : notification.priority === 'medium'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{notification.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Link 
              to="/parent/notifications" 
              className="block text-center px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
            >
              Voir toutes les notifications →
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3: Activités récentes et galerie */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activités récentes */}
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
            {todayActivities.map((activity) => (
              <div 
                key={activity.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{activity.child}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity.time}</span>
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
            ))}
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

        {/* Galerie et photos */}
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm">Moment {i}</div>
                  <div className="text-xs">Aujourd'hui</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              
              
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
                <h4 className="font-semibold text-gray-900 dark:text-white">Éducatrice Lucas</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mme Sophie</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
              Contacter
            </button>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">👨‍🏫</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Éducatrice Emma</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mme Julie</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
              Contacter
            </button>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🏫</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Administration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Direction</p>
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