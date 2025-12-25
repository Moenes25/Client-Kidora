// src/educateur/components/Dashboard/RecentActivities.tsx
import { UserIcon, CheckCircleIcon, ChatIcon , TimeIcon } from "../../../icons";

const activities = [
  {
    id: 1,
    child: "Voussez Alain",
    time: "09:30",
    message: "Semble moins actif que d'habitude",
    type: "observation",
    icon: <UserIcon className="size-5 text-blue-600 dark:text-blue-700" />,
    color: "bg-blue-100 dark:bg-blue-100"
  },
  {
    id: 2,
    child: "Fatima Zahra",
    time: "09:15",
    message: "A bien progressé en dessin",
    type: "progrès",
    icon: <CheckCircleIcon className="size-5 text-green-600 dark:text-green-700" />,
    color: "bg-green-100 dark:bg-green-100"
  },
  {
    id: 3,
    child: "Lucas Martin",
    time: "08:45",
    message: "Nouveau mot appris : 'Chandelle'",
    type: "apprentissage",
    icon: <ChatIcon  className="size-5 text-purple-600 dark:text-purple-700" />,
    color: "bg-purple-100 dark:bg-purple-100"
  },
  {
    id: 4,
    child: "Emma Dubois",
    time: "Hier 16:30",
    message: "Absence justifiée - Visite médicale",
    type: "absence",
    icon: <TimeIcon className="size-5 text-amber-600 dark:text-amber-700" />,
    color: "bg-amber-100 dark:bg-amber-100"
  },
];

export default function RecentActivities() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-300 dark:bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900">
            Alertes IA et Observations 
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-700">
            Dernières observations 
          </p>
        </div>
        <button className="text-blue-600 dark:text-blue-700 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-800">
          Tout voir →
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-100 rounded-lg transition-colors group">
            <div className={`flex-shrink-0 ${activity.color} p-2 rounded-lg mr-3`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-700">
                  {activity.child}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-700">
                  {activity.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-700">
                {activity.message}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 rounded">
                {activity.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-200">
        <button className="w-full py-2.5 bg-gray-50 dark:bg-gray-100 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors text-sm font-medium">
          Ajouter une observation
        </button>
      </div>
    </div>
  );
}