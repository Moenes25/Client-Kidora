import { Users, Calendar } from "lucide-react";

interface ClassType {
  id: string;
  name: string;
  color: string;
  childrenCount: number;
  educator: string;
  capacity?: number;
}

interface ClassListProps {
  classes: ClassType[];
  selectedClass: string;
  onSelectClass: (classId: string) => void;
}

export default function ClassList({ classes, selectedClass, onSelectClass }: ClassListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Liste des classes
      </h2>
      
      <div className="space-y-3">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedClass === classItem.id
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => onSelectClass(classItem.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${classItem.color}-500`} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {classItem.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{classItem.childrenCount} enfants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2-3 ans</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Éducatrice
                </div>
                <div className="font-medium text-gray-800 dark:text-white">
                  {classItem.educator}
                </div>
              </div>
            </div>
            
            {/* Barre de progression capacité */}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Capacité</span>
                <span className="font-medium">
                  {classItem.childrenCount}/20
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-${classItem.color}-500 h-2 rounded-full`}
                  style={{ width: `${(classItem.childrenCount / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}