// pages/Enfants.tsx
import { useState } from "react";
import { Link } from "react-router";

const Enfants = () => {
  const [evaluations] = useState([
    {
      id: 1,
      title: "Évaluation Hebdomadaire - Langage",
      child: "Lucas",
      date: "12/01/2024",
      result: "Excellent",
      skills: ["Vocabulaire", "Prononciation", "Compréhension"],
      comment: "Progrès remarquables en expression orale. Vocabulaire enrichi.",
      educator: "Mme Sophie"
    },
    {
      id: 2,
      title: "Évaluation Mensuelle - Social",
      child: "Emma",
      date: "10/01/2024",
      result: "Bon",
      skills: ["Interaction", "Partage", "Coopération"],
      comment: "Bonne évolution dans les jeux de groupe. Continue à s'ouvrir aux autres.",
      educator: "Mme Julie"
    },
    {
      id: 3,
      title: "Évaluation Trimestrielle - Globale",
      child: "Lucas",
      date: "05/01/2024",
      result: "Très bon",
      skills: ["Langage", "Cognition", "Motricité", "Social"],
      comment: "Développement harmonieux dans tous les domaines. Continue les bons efforts.",
      educator: "Mme Sophie"
    },
    {
      id: 4,
      title: "Évaluation Spécifique - Motricité",
      child: "Emma",
      date: "03/01/2024",
      result: "À améliorer",
      skills: ["Motricité fine", "Coordination"],
      comment: "Besoin de renforcer la coordination œil-main. Exercices spécifiques recommandés.",
      educator: "Mme Julie"
    }
  ]);

  const [evaluationHistory] = useState([
    { date: "12/01/2024", type: "Langage", result: "Excellent", trend: "up", change: "+5%" },
    { date: "05/01/2024", type: "Global", result: "Très bon", trend: "up", change: "+3%" },
    { date: "28/12/2023", type: "Social", result: "Bon", trend: "stable", change: "0%" },
    { date: "21/12/2023", type: "Cognition", result: "Excellent", trend: "up", change: "+7%" },
    { date: "14/12/2023", type: "Motricité", result: "À améliorer", trend: "down", change: "-2%" },
  ]);

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
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
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
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 3,
      name: "Mohamed Ali",
      age: "10 ans",
      class: "CM2",
      educator: "M. Thomas",
      avatar: "MA",
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
      bgColor: "bg-green-50 dark:bg-green-900/20"
    }
  ]);

  const [selectedChildForTracking, setSelectedChildForTracking] = useState(children[0]?.name || "");
  const [aiInsights] = useState([
    {
      title: "Analyse IA : Développement",
      content: "Lucas montre des progrès significatifs en mathématiques. Recommandation : activités de logique supplémentaires.",
      color: "text-blue-600 dark:text-blue-400",
      icon: "📈"
    },
    {
      title: "Alertes précoces",
      content: "Emma : excellente progression sociale. Mohamed : attention à la motricité fine.",
      color: "text-amber-600 dark:text-amber-400",
      icon: "🔔"
    },
    {
      title: "Comparaison normes",
      content: "Tous les enfants dans la moyenne nationale. Points forts : langage et créativité.",
      color: "text-green-600 dark:text-green-400",
      icon: "📊"
    }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profil des Enfants
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Suivez le développement complet de chaque enfant
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          + Ajouter un enfant
        </button>
      </div>

      {/* Cartes enfants principales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {children.map((child) => (
          <div 
            key={child.id}
            className={`p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${child.bgColor}`}
          >
            {/* En-tête profil */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${child.color} flex items-center justify-center text-white text-xl font-bold`}>
                  {child.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{child.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{child.age} • {child.class}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Éducatrice : {child.educator}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${child.presence.today ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                {child.presence.today ? "Présent" : "Absent"}
              </div>
            </div>

            {/* Santé */}
            <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Santé & Médical</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Allergies :</span>
                  <span className="font-medium">{child.health.allergies.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Notes médicales :</span>
                  <span className="font-medium">{child.health.medicalNotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Vaccination :</span>
                  <span className="font-medium text-green-600 dark:text-green-400">{child.health.vaccination}</span>
                </div>
              </div>
            </div>

            {/* Présence */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Présence</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{child.presence.week}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Cette semaine</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{child.presence.month}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Ce mois</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{child.performance}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Performance</div>
                </div>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="grid grid-cols-3 gap-3">
              <Link 
                to={`/parent/enfant/${child.id}/activities`}
                className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-center transition-colors"
              >
                <div className="text-blue-600 dark:text-blue-400 font-medium">Activités</div>
              </Link>
              <Link 
                to={`/parent/enfant/${child.id}/reports`}
                className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-center transition-colors"
              >
                <div className="text-purple-600 dark:text-purple-400 font-medium">Rapports</div>
              </Link>
              <Link 
                to={`/parent/enfant/${child.id}/evaluations`}
                className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-center transition-colors"
              >
                <div className="text-green-600 dark:text-green-400 font-medium">Évaluations</div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      

      {/* Section 4: Suivi pédagogique */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Suivi Pédagogique</h2>
          <Link 
            to="/parent/suivi-pedagogique" 
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            Détails complets
          </Link>
        </div>

        {/* Sélection d'enfant pour le suivi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suivi pour :
          </label>
          <div className="flex flex-wrap gap-2">
            {children.map((child) => (
              <button
                key={child.id}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  child.name === selectedChildForTracking
                    ? `bg-gradient-to-r ${child.color} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedChildForTracking(child.name)}
              >
                {child.name}
              </button>
            ))}
          </div>
        </div>

        {/* Compétences avec barres de progression */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-900 dark:text-white font-medium">Langage</span>
              <span className="text-gray-600 dark:text-gray-300">85%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Objectif hebdomadaire : +5% de vocabulaire
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-900 dark:text-white font-medium">Motricité</span>
              <span className="text-gray-600 dark:text-gray-300">78%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Objectif hebdomadaire : coordination main-œil
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-900 dark:text-white font-medium">Cognition</span>
              <span className="text-gray-600 dark:text-gray-300">92%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Objectif hebdomadaire : résolution de problèmes
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-900 dark:text-white font-medium">Social</span>
              <span className="text-gray-600 dark:text-gray-300">88%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '88%' }}></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Objectif hebdomadaire : partage et coopération
            </div>
          </div>
        </div>

       
      </div>

      {/* Section 5: Évaluations rapides */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Évaluations Rapides</h2>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
              <option>Mensuelles</option>
              <option>Hebdomadaires</option>
              <option>Trimestrielles</option>
            </select>
          </div>
        </div>

        {/* Grille d'évaluations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{evaluation.title}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {evaluation.child} • {evaluation.date}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  evaluation.result === "Excellent" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" :
                  evaluation.result === "Bon" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                  "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                }`}>
                  {evaluation.result}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Compétences évaluées :</div>
                <div className="flex flex-wrap gap-2">
                  {evaluation.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Commentaire éducatrice :</strong> {evaluation.comment}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Évaluatrice : {evaluation.educator}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Évolution globale */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Résumé d'évolution globale</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Langage</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Motricité</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">88%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Cognition</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Social</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enfants;