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
    icon: <UserIcon className="size-5 text-black dark:text-white" />,
    color: "bg-orange-50 dark:bg-orange-900/20"
  },
{
  id: 1,
  child: "Voussez Alain",
  time: "09:30",
  message: "Semble moins actif que d'habitude",
  type: "observation",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      className="size-5 text-black dark:text-white"
      fill="currentColor"
    >
      <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z" />
    </svg>
  ),
  color: "bg-orange-50 dark:bg-orange-900/20"
},
  
  {
    id: 3,
    child: "Lucas Martin",
    time: "08:45",
    message: "Nouveau mot appris : 'Chandelle'",
    type: "apprentissage",
    icon: <ChatIcon className="size-5 text-black dark:text-white" />,
    color: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    id: 4,
    child: "Emma Dubois",
    time: "Hier 16:30",
    message: "Absence justifiée - Visite médicale",
    type: "absence",
    icon: <TimeIcon className="size-5 text-black dark:text-white" />,
    color: "bg-gray-50 dark:bg-gray-900/20"
  },
];

export default function RecentActivities({ onAjouterObservation }: RecentActivitiesProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Header avec fond indigo */}
      <div className="bg-indigo-500 text-white px-5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Alertes IA et Observations 
            </h3>
            <p className="text-sm text-indigo-100">
              Dernières observations 
            </p>
          </div>
          <button className="text-white text-sm font-medium hover:text-indigo-100">
            Tout voir →
          </button>
        </div>
      </div>

      {/* Contenu des activités */}
      <div className="p-5">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-colors group">
              <div className={`flex-shrink-0 ${activity.color} p-2 rounded-lg mr-3`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white group-hover:text-emerald-100">
                    {activity.child}
                  </h4>
                  <span className="text-xs text-emerald-100">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-emerald-50">
                  {activity.message}
                </p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-emerald-400/20 text-emerald-100 rounded border border-emerald-400/30">
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={onAjouterObservation}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow">
            Ajouter une observation
          </button>
        </div>
      </div>
    </div>
  );
}