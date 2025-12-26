// pages/ActivitiesEnfants.tsx - Version Parent (consultation seulement)
import { useState } from "react";
import { Link } from "react-router";

const ActivitiesEnfants = () => {
  const [activities] = useState([
    {
      id: 1,
      title: "Atelier Peinture Libre",
      child: "Lucas",
      date: "Aujourd'hui, 10:30",
      type: "Créativité",
      skills: ["Motricité fine", "Couleurs", "Expression"],
      status: "Terminé",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      media: ["photo", "video"],
      educatorAssessment: {
        text: "Excellent engagement, mélange de couleurs créatif. Lucas a montré beaucoup d'imagination.",
        educator: "Mme Sophie",
        date: "15/01/2024",
        rating: 4.5
      },
      objectives: ["Développer la créativité", "Améliorer la motricité fine"],
      materials: ["Peintures", "Pinceaux", "Papier"]
    },
    {
      id: 2,
      title: "Jeux de Construction",
      child: "Emma",
      date: "Aujourd'hui, 14:00",
      type: "Logique",
      skills: ["Esprit logique", "Coordination", "Patience"],
      status: "En cours",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      media: ["photo"],
      educatorAssessment: {
        text: "Progression notable en résolution de problèmes. Emma a construit une structure complexe avec précision.",
        educator: "Mme Julie",
        date: "15/01/2024",
        rating: 5
      },
      objectives: ["Développer la logique spatiale", "Travailler la patience"],
      materials: ["Légos", "Blocs de construction"]
    },
    {
      id: 3,
      title: "Lecture Interactive",
      child: "Mohamed",
      date: "Demain, 09:00",
      type: "Langage",
      skills: ["Vocabulaire", "Compréhension", "Expression"],
      status: "Planifié",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      media: [],
      educatorAssessment: null,
      objectives: ["Améliorer le vocabulaire", "Développer la compréhension"],
      materials: ["Livres", "Cartes-images"]
    },
    {
      id: 4,
      title: "Sortie au Parc",
      child: "Tous",
      date: "Hier, 15:30",
      type: "Social",
      skills: ["Interaction", "Motricité globale", "Découverte"],
      status: "Terminé",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      media: ["photo", "video"],
      educatorAssessment: {
        text: "Interaction sociale excellente. Les enfants ont bien joué ensemble et découvert la nature.",
        educator: "M. Thomas",
        date: "14/01/2024",
        rating: 4
      },
      objectives: ["Développer les interactions sociales", "Découverte de l'environnement"],
      materials: ["Jeux extérieurs", "Lunettes de soleil"]
    }
  ]);

  const [aiAnalysis] = useState([
    {
      title: "Analyse IA : Développement",
      content: "Lucas montre une progression de 15% en créativité ce mois-ci.",
      type: "progression",
      icon: "📈",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Recommandation d'activités",
      content: "Basé sur les performances, proposer des puzzles pour Emma.",
      type: "recommandation",
      icon: "✨",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Prédiction compétences",
      content: "Mohamed devrait atteindre le niveau cible en langage d'ici 30 jours.",
      type: "prediction",
      icon: "🔮",
      color: "from-green-500 to-emerald-500"
    }
  ]);

  const [selectedChild, setSelectedChild] = useState("Tous");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  const filteredActivities = activities.filter(activity => {
    if (selectedChild !== "Tous" && activity.child !== selectedChild) return false;
    if (selectedType !== "Tous" && activity.type !== selectedType) return false;
    if (selectedStatus !== "Tous" && activity.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Activités Éducatives
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Consultez les activités et évaluations de vos enfants
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium">
            {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrer par enfant
          </label>
          <select 
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Tous">Tous les enfants</option>
            <option value="Lucas">Lucas</option>
            <option value="Emma">Emma</option>
            <option value="Mohamed">Mohamed</option>
            <option value="Tous">Tous (activités groupées)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type d'activité
          </label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Tous">Tous les types</option>
            <option value="Créativité">Créativité</option>
            <option value="Logique">Logique</option>
            <option value="Langage">Langage</option>
            <option value="Social">Social</option>
            <option value="Motricité">Motricité</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Statut
          </label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Terminé">Terminé</option>
            <option value="En cours">En cours</option>
            <option value="Planifié">Planifié</option>
          </select>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {activities.filter(a => a.status === "Terminé").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Activités terminées</div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {activities.filter(a => a.media.length > 0).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Avec photos/vidéos</div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {activities.filter(a => a.educatorAssessment).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Évaluations disponibles</div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Array.from(new Set(activities.map(a => a.child))).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Enfants concernés</div>
        </div>
      </div>

      {/* Grille d'activités */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Bandeau couleur */}
            <div className={`h-2 ${activity.color}`}></div>
            
            <div className="p-6">
              {/* En-tête activité */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{activity.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{activity.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.status === "Terminé" 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : activity.status === "En cours"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                  }`}>
                    {activity.status}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {activity.type}
                  </span>
                </div>
              </div>

              {/* Informations enfant */}
              <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201a4 4 0 01-4.9 4.9m4.9-4.9a8 8 0 01-9.9 9.9"/>
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-white">{activity.child}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    {activity.media.some(media => media === "photo") && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">📷 Photos</span>
                     )}
                    {activity.media.some(media => media === "video") && (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded">🎥 Vidéos</span>
                    )}
                   {activity.media.some(media => media === "audio") && (
                   <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded">🎵 Audio</span>
                   )}
                 </div>
              </div>

              {/* Objectifs et compétences */}
              <div className="mb-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objectifs pédagogiques :</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.objectives.map((objective, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                        {objective}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compétences travaillées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Évaluation de l'éducateur */}
              {activity.educatorAssessment && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Évaluation de l'éducateur :</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(activity.educatorAssessment.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {activity.educatorAssessment.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    {activity.educatorAssessment.text}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Éducateur : {activity.educatorAssessment.educator}</span>
                    <span>{activity.educatorAssessment.date}</span>
                  </div>
                </div>
              )}

              {/* Matériels utilisés */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Matériels utilisés :</h4>
                <div className="flex flex-wrap gap-2">
                  {activity.materials.map((material, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions consultation */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.media.length} média{activity.media.length > 1 ? 's' : ''} disponible{activity.media.length > 1 ? 's' : ''}
                </div>
                <div className="flex gap-3">
                  <button 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    disabled={activity.media.length === 0}
                  >
                    Voir médias
                  </button>
                  <Link 
                    to={`/parent/activity/${activity.id}/details`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 rounded-lg transition-opacity"
                  >
                    Détails complets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    

      {/* Galerie des activités */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Galerie des Activités</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {activities.filter(a => a.media.length > 0).length} activité{activities.filter(a => a.media.length > 0).length > 1 ? 's' : ''} avec médias
            </p>
          </div>
          <Link 
            to="/parent/gallery"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Accéder à la galerie complète
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities
            .filter(a => a.media.length > 0)
            .slice(0, 4)
            .map((activity, index) => (
              <div key={activity.id} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <div className="text-sm font-medium">{activity.child}</div>
                    <div className="text-xs">{activity.title.substring(0, 15)}...</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                    {activity.media.length} média{activity.media.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Guide d'utilisation pour parent */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       
          
          
        </div>
      </div>
    </div>
  );
};

export default ActivitiesEnfants;