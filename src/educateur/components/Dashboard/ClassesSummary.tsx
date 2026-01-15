import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, GroupIcon, UserIcon } from "../../../icons";

const classesData = [
  { 
    id: 1, 
    name: "Class Faracha", 
    level: "(3-4) ans", 
    totalChildren: 2, 
    present: 1, 
    activities: 1,
    teacher: "Mme. Dupont"
  },
  { 
    id: 2, 
    name: "Suite E5", 
    level: "(6-7) ans", 
    totalChildren: 21, 
    present: 18, 
    activities: 3,
    teacher: "M. Martin"
  },
  { 
    id: 3, 
    name: "Class Papillon", 
    level: "12 ans", 
    totalChildren: 15, 
    present: 14, 
    activities: 2,
    teacher: "Mme. Leroy"
  },
  { 
    id: 4, 
    name: "Class Soleil", 
    level: "(8-9) ans",
    totalChildren: 25, 
    present: 23, 
    activities: 4,
    teacher: "M. Bernard"
  },
];

export default function ClassesSummary() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-0 border border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col shadow-sm">
      {/* Header compact */}
      <div className="bg-indigo-500">
        <div className="flex justify-between items-center text-white p-3">
          <div>
            <h3 className="text-base font-semibold">
              Classes Actives
            </h3>
            <p className="text-indigo-100 text-xs opacity-90 mt-0.5">
              Vue d'ensemble des classes
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal compact */}
      <div className="p-4 flex-grow">
        {/* Sélecteur de classe compact */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Classe actuelle
            </label>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              {classesData.length} disponibles
            </span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-sm group"
            >
              <div className="text-left">
                <div className="font-semibold text-white">
                  {selectedClass.name}
                </div>
                <div className="text-amber-100/90 text-xs mt-0.5">
                  {selectedClass.level} • {selectedClass.teacher}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                  {selectedClass.present}/{selectedClass.totalChildren}
                </div>
                {isExpanded ? (
                  <ChevronUpIcon className="size-4 text-amber-100" />
                ) : (
                  <ChevronDownIcon className="size-4 text-amber-100" />
                )}
              </div>
            </button>
            
            {isExpanded && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                {classesData.map((classItem) => (
                  <button
                    key={classItem.id}
                    onClick={() => {
                      setSelectedClass(classItem);
                      setIsExpanded(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${selectedClass.id === classItem.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {classItem.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          {classItem.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                          {classItem.present}/{classItem.totalChildren}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          présents
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistiques compactes */}
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800/50 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  {selectedClass.totalChildren}
                </div>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                  Enfants
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
              <div className="text-center">
                <div className="text-xl font-bold text-green-700 dark:text-green-300">
                  {selectedClass.present}
                </div>
                <div className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                  Présents
                </div>
                <div className="text-xs text-green-500 dark:text-green-400 mt-0.5">
                  {Math.round((selectedClass.present / selectedClass.totalChildren) * 100)}%
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800/50 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                  {selectedClass.activities}
                </div>
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-1">
                  Activités
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations enseignante compacte */}
        <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10 rounded-lg border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center shadow-sm">
              <UserIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                Enseignante
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {selectedClass.teacher}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                Classe: {selectedClass.name}
              </p>
            </div>
          </div>
        </div>

        {/* Actions rapides compactes */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-semibold shadow-sm flex items-center justify-center gap-2">
              <span className="text-sm">✓</span>
              Marquer Présence
            </button>
            <button className="p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 text-sm font-semibold shadow-sm flex items-center justify-center gap-2">
              <span className="text-sm">+</span>
              Ajouter Activité
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}