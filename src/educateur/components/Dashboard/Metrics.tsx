// src/educateur/components/Dashboard/Metrics.tsx
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  CheckCircleIcon,
  CloseIcon,
  TaskIcon,
  UserIcon
} from "../../../icons";
import Badge from "../../../components/ui/badge/Badge";

export default function Metrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      
      {/* Carte 1 : Total Enfants */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-5 dark:from-blue-900/10 dark:to-gray-900 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Total Enfants
            </span>
            <h4 className="mt-1 font-bold text-gray-900 text-2xl dark:text-white">
              3,782
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Dans toutes les classes
            </p>
          </div>
          <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full dark:bg-blue-900/30">
            <GroupIcon className="text-blue-600 size-7 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">+2 nouveaux cette semaine</span>
          </div>
        </div>
      </div>
      
      {/* Carte 2 : Présents */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-white p-5 dark:from-green-900/10 dark:to-gray-900 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Présents
            </span>
            <h4 className="mt-1 font-bold text-gray-900 text-2xl dark:text-white">
              3,359
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              89% de présence
            </p>
          </div>
          <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full dark:bg-green-900/30">
            <CheckCircleIcon className="text-green-600 size-7 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Badge color="success" className="text-xs">
            <ArrowUpIcon className="size-3" />
            +17.05% cette semaine
          </Badge>
        </div>
      </div>

      {/* Carte 3 : Absents */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-red-50 to-white p-5 dark:from-red-900/10 dark:to-gray-900 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              Absents
            </span>
            <h4 className="mt-1 font-bold text-gray-900 text-2xl dark:text-white">
              423
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Justifiés: 312
            </p>
          </div>
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full dark:bg-red-900/30">
            <CloseIcon className="text-red-600 size-7 dark:text-red-400" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Badge color="error" className="text-xs">
            <ArrowDownIcon className="size-3" />
            -9.05% cette semaine
          </Badge>
        </div>
      </div>

      {/* Carte 4 : Tâches */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white p-5 dark:from-purple-900/10 dark:to-gray-900 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Tâches
            </span>
            <h4 className="mt-1 font-bold text-gray-900 text-2xl dark:text-white">
              156
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              42 à terminer
            </p>
          </div>
          <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full dark:bg-purple-900/30">
            <TaskIcon className="text-purple-600 size-7 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">73% complétées</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: '73%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}