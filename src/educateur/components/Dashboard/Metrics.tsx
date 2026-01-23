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
<div className="flex items-center justify-center rounded-lg bg-white/10 p-2.5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="h-6 w-6 text-emerald-200 dark:text-emerald-100"
    fill="currentColor"
  >
    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" />
  </svg>
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
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-slate-700 dark:to-slate-800">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-200 dark:text-slate-300">
                Absents
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                423
              </h3>
              <p className="mt-1 text-xs text-slate-200/90 dark:text-slate-300/90">
                Justifiés: 312
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
              <CloseIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 backdrop-blur-sm">
              <ArrowDownIcon className="h-2.5 w-2.5 text-white" />
              <span className="text-xs font-semibold text-white">
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