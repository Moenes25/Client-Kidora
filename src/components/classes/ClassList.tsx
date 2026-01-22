import { Users, Calendar } from "lucide-react";

// Interface pour les props du composant ClassList
interface ClassListProps {
  classes: ClassType[];
  selectedClass: string;
  onSelectClass: (classId: string) => void;
}

// Interface pour les données d'une classe
interface ClassType {
  id: string;
  name: string;
  color: string;
  childrenCount: number;
  educator: string;
  capacity?: number;
  occupancyRate?: number; // Nouveau: taux d'occupation
  lastActivity?: string; // Nouveau: dernière activité
}

export default function ClassList({ classes, selectedClass, onSelectClass }: ClassListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header amélioré */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Liste des classes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {classes.length} classes actives
          </p>
        </div>
        
        {/* Filtres */}
        <div className="flex items-center gap-2">
          <select className="text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
            <option>Trier par</option>
            <option>Nom</option>
            <option>Nombre d'enfants</option>
            <option>Taux d'occupation</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {classes.map((classItem) => {
          const occupancyRate = (classItem.childrenCount / (classItem.capacity || 20)) * 100;
          const occupancyColor = occupancyRate >= 90 ? "bg-red-500" : 
                               occupancyRate >= 75 ? "bg-yellow-500" : 
                               "bg-green-500";
          
          return (
            <div
              key={classItem.id}
              className={`p-5 rounded-xl cursor-pointer transition-all duration-200 border ${
                selectedClass === classItem.id
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
              }`}
              onClick={() => onSelectClass(classItem.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  {/* Icône de classe avec couleur */}
                  <div className={`w-12 h-12 rounded-lg bg-${classItem.color}-100 dark:bg-${classItem.color}-900/30 flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded-full bg-${classItem.color}-500`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {classItem.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        occupancyRate >= 90 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        occupancyRate >= 75 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {Math.round(occupancyRate)}% rempli
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{classItem.childrenCount} enfants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{classItem.educator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Capacité: 20</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Indicateur de sélection */}
                <div className={`w-2 h-2 rounded-full transition-all ${
                  selectedClass === classItem.id ? 'bg-blue-500 scale-150' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              </div>
              
              {/* Barre de progression améliorée */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progression d'occupation</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {classItem.childrenCount}/20 places
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${occupancyColor}`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>
              
              {/* Dernière activité */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  📝 Dernière activité: Aujourd'hui à 10:30
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}