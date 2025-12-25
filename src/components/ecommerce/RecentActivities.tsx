// components/nursery/RecentActivities.tsx
import { Activity, Utensils, Music, BookOpen, Palette, Gamepad } from "lucide-react";

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
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'meal': return <Utensils className="w-5 h-5" />;
    case 'nap': return <Activity className="w-5 h-5" />;
    case 'learning': return <BookOpen className="w-5 h-5" />;
    case 'play': return <Gamepad className="w-5 h-5" />;
    case 'art': return <Palette className="w-5 h-5" />;
    case 'music': return <Music className="w-5 h-5" />;
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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Activités Récentes
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Suivi des activités de la journée
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Aujourd'hui
          </span>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {activity.child}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {activity.activity}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-gray-800 dark:text-white font-medium">
                  {activity.time}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                  {activity.duration}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.educator}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Activités en cours: 2
            </span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            Voir le planning complet →
          </button>
        </div>
      </div>
    </div>
  );
}