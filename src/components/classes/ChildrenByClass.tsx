import { Users, Calendar,  UserCheck } from "lucide-react";

interface ClassInfo {
  id: string;
  name: string;
  color: string;
  childrenCount: number;
  educator: string;
}

interface ChildrenByClassProps {
  selectedClass: string;
  classes: ClassInfo[];
}

export default function ChildrenByClass({ selectedClass, classes }: ChildrenByClassProps) {
  // Données d'exemple pour les enfants
  const childrenData = {
    petits: [
      { id: 1, name: "Emma Martin", age: "2 ans", parent: "Sophie Martin", status: "present" },
      { id: 2, name: "Lucas Dubois", age: "2.5 ans", parent: "Marie Dubois", status: "present" },
      { id: 3, name: "Chloé Bernard", age: "3 ans", parent: "Jean Bernard", status: "absent" },
      { id: 4, name: "Hugo Laurent", age: "2 ans", parent: "Camille Laurent", status: "present" },
    ],
    moyens: [
      { id: 5, name: "Léa Petit", age: "3.5 ans", parent: "Thomas Petit", status: "present" },
      { id: 6, name: "Nathan Roux", age: "4 ans", parent: "Julie Roux", status: "present" },
    ],
    grands: [
      { id: 7, name: "Zoé Moreau", age: "4.5 ans", parent: "Pierre Moreau", status: "present" },
      { id: 8, name: "Maxime Leroy", age: "5 ans", parent: "Sarah Leroy", status: "present" },
    ]
  };

  const selectedClassData = classes.find(cls => cls.id === selectedClass);
  const children = selectedClass === "all" 
    ? [] 
    : childrenData[selectedClass as keyof typeof childrenData] || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {selectedClass === "all" ? "Tous les enfants" : `Enfants - ${selectedClassData?.name}`}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedClass === "all" ? "48 enfants au total" : `${children.length} enfants`}
          </p>
        </div>
        {selectedClass !== "all" && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${selectedClassData?.color}-100 dark:bg-${selectedClassData?.color}-900/30 text-${selectedClassData?.color}-600`}>
            {selectedClassData?.childrenCount}/20
          </div>
        )}
      </div>

      {selectedClass === "all" ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            Sélectionnez une classe pour voir les enfants
          </p>
        </div>
      ) : (
        <>
          {/* Statistiques rapides */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {children.filter(c => c.status === "present").length}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Présents</span>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {selectedClassData?.childrenCount}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Inscrits</span>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                {selectedClassData?.educator.split(" ")[0]}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Éducatrice</span>
            </div>
          </div>

          {/* Liste des enfants */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {children.map((child) => (
              <div 
                key={child.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${
                    child.status === "present" 
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30" 
                      : "bg-red-100 text-red-600 dark:bg-red-900/30"
                  } flex items-center justify-center`}>
                    <span className="font-semibold">
                      {child.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {child.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{child.age}</span>
                      <span>•</span>
                      <span>{child.parent}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`w-3 h-3 rounded-full ${
                    child.status === "present" ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {child.status === "present" ? "Présent" : "Absent"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30">
              Voir tous les enfants →
            </button>
          </div>
        </>
      )}
    </div>
  );
}