// src/educateur/components/Dashboard/RecentActivities.tsx
import { UserIcon, CheckCircleIcon, ChatIcon, TimeIcon } from "../../../icons";

interface RecentActivitiesProps {
  onAjouterObservation?: () => void;
}

const activities = [
  {
    id: 1,
    child: "Voussez Alain",
    time: "09:30",
    message: "Semble moins actif que d'habitude",
    type: "observation",
    icon: <UserIcon className="size-5 text-orange-600 dark:text-orange-600" />,
    color: "bg-orange-100 dark:bg-orange-900/30"
  },
  {
    id: 2,
    child: "Fatima Zahra",
    time: "09:15",
    message: "A bien progressé en dessin",
    type: "progrès",
    icon: <CheckCircleIcon className="size-5 text-blue-600 dark:text-blue-600" />,
    color: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    id: 3,
    child: "Lucas Martin",
    time: "08:45",
    message: "Nouveau mot appris : 'Chandelle'",
    type: "apprentissage",
    icon: <ChatIcon className="size-5 text-gray-600 dark:text-gray-600" />,
    color: "bg-gray-100 dark:bg-gray-800"
  },
  {
    id: 4,
    child: "Emma Dubois",
    time: "Hier 16:30",
    message: "Absence justifiée - Visite médicale",
    type: "absence",
    icon: <TimeIcon className="size-5 text-gray-600 dark:text-gray-600" />,
    color: "bg-gray-100 dark:bg-gray-800"
  },
];

export default function RecentActivities({ onAjouterObservation }: RecentActivitiesProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Alertes IA et Observations 
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dernières observations 
          </p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 dark:text-blue-400">
          Tout voir →
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
            <div className={`flex-shrink-0 ${activity.color} p-2 rounded-lg mr-3`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {activity.child}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {activity.message}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                {activity.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={onAjouterObservation}
          className="w-full py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
          Ajouter une observation
        </button>
      </div>
    </div>
  );
}