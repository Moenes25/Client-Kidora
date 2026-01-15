// components/nursery/RecentActivities.tsx
import { Activity, Utensils, Music, BookOpen, Palette, Gamepad } from "lucide-react";
import { useState } from "react";

interface ActivityItem {
  id: number;
  child: string;
  activity: string;
  type: 'meal' | 'nap' | 'learning' | 'play' | 'art' | 'music';
  time: string;
  duration: string;
  educator: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    child: "Emma Martin",
    activity: "Déjeuner",
    type: 'meal',
    time: "12:00 - 12:45",
    duration: "45 min",
    educator: "Marie Dubois"
  },
  {
    id: 2,
    child: "Lucas Dubois",
    activity: "Sieste",
    type: 'nap',
    time: "13:00 - 15:00",
    duration: "2h",
    educator: "Jean Martin"
  },
  {
    id: 3,
    child: "Chloé Bernard",
    activity: "Éveil musical",
    type: 'music',
    time: "10:00 - 10:45",
    duration: "45 min",
    educator: "Sophie Petit"
  },
  {
    id: 4,
    child: "Hugo Laurent",
    activity: "Peinture",
    type: 'art',
    time: "11:00 - 11:45",
    duration: "45 min",
    educator: "Marie Dubois"
  },
  {
    id: 5,
    child: "Léa Moreau",
    activity: "Lecture",
    type: 'learning',
    time: "09:30 - 10:15",
    duration: "45 min",
    educator: "Jean Martin"
  },
  {
    id: 6,
    child: "Noah Girard",
    activity: "Jeux éducatifs",
    type: 'play',
    time: "15:30 - 16:15",
    duration: "45 min",
    educator: "Sophie Petit"
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'meal': return <Utensils className="w-4 h-4" />;
    case 'nap': return <Activity className="w-4 h-4" />;
    case 'learning': return <BookOpen className="w-4 h-4" />;
    case 'play': return <Gamepad className="w-4 h-4" />;
    case 'art': return <Palette className="w-4 h-4" />;
    case 'music': return <Music className="w-4 h-4" />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'meal': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30';
    case 'nap': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
    case 'learning': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30';
    case 'play': return 'bg-green-100 text-green-600 dark:bg-green-900/30';
    case 'art': return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30';
    case 'music': return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30';
  }
};

export default function RecentActivities() {
  const [showAll, setShowAll] = useState(false);
  
  // Afficher seulement 3 activités par défaut, toutes si showAll est vrai
  const displayedActivities = showAll ? activities : activities.slice(0, 3);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-0 border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
      {/* Header avec bg-indigo-500 */}
      <div className="bg-indigo-500">
        <div className="flex justify-between items-center text-white p-4">
          <div>
            <h3 className="text-base font-semibold">
              Activités Récentes
            </h3>
            <p className="text-indigo-100 text-xs opacity-90">
              Suivi des activités de la journée
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-indigo-100">
              Aujourd'hui
            </span>
            <button className="p-1.5 hover:bg-indigo-600 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Note informative */}
        {/* <div className="mb-3 p-2.5 bg-indigo-600/40 rounded-lg mx-4">
          <div className="flex items-center gap-1.5 text-indigo-100 text-xs">
            <span>
              📋 {showAll ? `${activities.length} activités programmées aujourd'hui` : '3 activités récentes affichées'}
            </span>
          </div>
        </div> */}
      </div>

      {/* Liste des activités */}
      <div className="p-4">
        <div className="space-y-3">
          {displayedActivities.map((activity) => (
  <div key={activity.id} className="p-3 hover:bg-orange-600/90 rounded-lg transition-colors border border-orange-500/100 bg-orange-500">
    <div className="flex items-start gap-2">
      <div className={`p-2 rounded-lg ${
        activity.type === 'meal' ? 'bg-orange-200 text-orange-700' :
        activity.type === 'nap' ? 'bg-blue-200 text-blue-700' :
        activity.type === 'learning' ? 'bg-purple-200 text-purple-700' :
        activity.type === 'play' ? 'bg-green-200 text-green-700' :
        activity.type === 'art' ? 'bg-pink-200 text-pink-700' :
        'bg-indigo-200 text-indigo-700'
      } flex-shrink-0`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-grow min-w-0">
        <div className="mb-1">
          <h4 className="text-sm font-semibold text-white line-clamp-1">
            {activity.child}
          </h4>
          <p className="text-xs text-orange-100 line-clamp-1">
            {activity.activity}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-orange-100">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{activity.time}</span>
          </div>
          
          <div className="flex items-center gap-1 text-orange-100">
            <span className="text-orange-200">•</span>
            <span>{activity.duration}</span>
          </div>
          
          <div className="flex items-center gap-1 text-orange-100">
            <span className="text-orange-200">•</span>
            <span>{activity.educator}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
))}
          {/* {displayedActivities.map((activity) => (
            <div key={activity.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-100 bg-orange-500/100">
              <div className="flex items-start gap-2">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} flex-shrink-0`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="mb-1">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">
                      {activity.child}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {activity.activity}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{activity.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-gray-400">•</span>
                      <span>{activity.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-gray-400">•</span>
                      <span>{activity.educator}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Activités en cours: 2
              </span>
            </div>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline"
            >
              {showAll ? "Réduire le planning" : "Voir le planning complet →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}