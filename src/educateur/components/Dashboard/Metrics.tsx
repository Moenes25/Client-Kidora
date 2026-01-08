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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Carte 1 : Total Enfants */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-blue-600 dark:to-blue-700">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-100 dark:text-blue-200">
                Total Enfants
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                3,782
              </h3>
              <p className="mt-1 text-xs text-blue-100/90 dark:text-blue-200/90">
                Dans toutes les classes
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
              <GroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="flex items-center gap-1.5">
              <div className="rounded-full bg-white/20 p-0.5">
                <ArrowUpIcon className="h-2.5 w-2.5 text-white" />
              </div>
              <span className="text-xs font-medium text-white">
                +2 nouveaux cette semaine
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carte 2 : Présents */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-emerald-600 dark:to-emerald-700">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100 dark:text-emerald-200">
                Présents
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                3,359
              </h3>
              <p className="mt-1 text-xs text-emerald-100/90 dark:text-emerald-200/90">
                89% de présence
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 backdrop-blur-sm">
              <ArrowUpIcon className="h-2.5 w-2.5 text-white" />
              <span className="text-xs font-semibold text-white">
                +17.05%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Carte 3 : Absents */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-amber-500 dark:to-amber-600">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-950">
                Absents
              </p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-900">
                423
              </h3>
              <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-950/80">
                Justifiés: 312
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/30 p-2.5 backdrop-blur-sm">
              <CloseIcon className="h-6 w-6 text-gray-900" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-900/20 dark:border-amber-950/20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/30 px-2 py-1 backdrop-blur-sm">
              <ArrowDownIcon className="h-2.5 w-2.5 text-gray-900" />
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-900">
                -9.05%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Carte 4 : Tâches */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-cyan-600 dark:to-cyan-700">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100 dark:text-cyan-200">
                Tâches
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                156
              </h3>
              <p className="mt-1 text-xs text-cyan-100/90 dark:text-cyan-200/90">
                42 à terminer
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
              <TaskIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">
                  Complétées
                </span>
                <span className="text-xs font-bold text-white">73%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div 
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: '73%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}