// src/educateur/components/Dashboard/ClassesSummary.tsx
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Classes Actives
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vue d'ensemble des classes
          </p>
        </div>
        {/* <button className="text-blue-600 text-sm font-medium hover:text-blue-700 dark:text-blue-400">
          Voir toutes →
        </button> */}
      </div>

      {/* Sélecteur de classe */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Classe actuelle
        </label>
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">
                {selectedClass.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedClass.level} • {selectedClass.present}/{selectedClass.totalChildren} enfants présents
              </div>
            </div>
            {isExpanded ? (
              <ChevronUpIcon className="size-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="size-5 text-gray-500" />
            )}
          </button>
          
          {isExpanded && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              {classesData.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => {
                    setSelectedClass(classItem);
                    setIsExpanded(false);
                  }}
                  className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {classItem.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {classItem.level} • {classItem.present}/{classItem.totalChildren} enfants
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistiques de la classe sélectionnée */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {selectedClass.totalChildren}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Enfants
          </div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {selectedClass.present}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Présents
          </div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {selectedClass.activities}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Activités
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Actions Rapides
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium">
            Marquer Présence
          </button>
          <button className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium">
            Ajouter Activité
          </button>
        </div>
      </div>
    </div>
  );
}