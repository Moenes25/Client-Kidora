import { Users, Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import classService, { ClasseResponseDto } from "../../services/api/classService"; // Ajustez le chemin

// Interface pour les props du composant ClassList
interface ClassListProps {
  selectedClass: string;
  onSelectClass: (classId: string) => void;
}

export default function ClassList({ selectedClass, onSelectClass }: ClassListProps) {
  const [classes, setClasses] = useState<ClasseResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("name");

  // Fonction pour charger les classes
  const loadClasses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await classService.getAllClasses();
      setClasses(data);
    } catch (err) {
      console.error("Erreur lors du chargement des classes:", err);
      setError("Impossible de charger les classes. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les classes au montage du composant
  useEffect(() => {
    loadClasses();
  }, []);

  // Fonction pour trier les classes
  const getSortedClasses = () => {
    const sorted = [...classes];
    
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.nom_classe.localeCompare(b.nom_classe));
      case "childrenCount":
        // Note: childrenCount n'est pas dans ClasseResponseDto, on utilise capacité
        return sorted.sort((a, b) => b.capacite - a.capacite);
      case "occupancy":
        // Tri par capacité (pourcentage fictif)
        return sorted.sort((a, b) => b.capacite - a.capacite);
      case "capacity":
        return sorted.sort((a, b) => b.capacite - a.capacite);
      default:
        return sorted;
    }
  };

  // Fonction pour obtenir une couleur basée sur la couleur_classe
  const getColorClass = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string, accent: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", accent: "bg-blue-500" },
      green: { bg: "bg-green-100", text: "text-green-600", accent: "bg-green-500" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", accent: "bg-purple-500" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", accent: "bg-orange-500" },
      pink: { bg: "bg-pink-100", text: "text-pink-600", accent: "bg-pink-500" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", accent: "bg-indigo-500" },
      red: { bg: "bg-red-100", text: "text-red-600", accent: "bg-red-500" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-600", accent: "bg-yellow-500" },
      teal: { bg: "bg-teal-100", text: "text-teal-600", accent: "bg-teal-500" },
    };
    
    return colorMap[color] || colorMap.blue;
  };

  // Calculer le taux d'occupation (fictif pour l'exemple)
  const calculateOccupancyRate = (capacity: number) => {
    // Pour l'exemple, on génère un nombre aléatoire entre 30% et 95%
    const randomRate = Math.floor(Math.random() * 65) + 30;
    return randomRate;
  };

  // Obtenir le nombre d'enfants fictif basé sur la capacité
  const getChildrenCount = (capacity: number) => {
    const occupancyRate = calculateOccupancyRate(capacity);
    return Math.floor((capacity * occupancyRate) / 100);
  };

  // Formater la date de création (si disponible)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Récemment";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch {
      return "Récemment";
    }
  };

  const sortedClasses = getSortedClasses();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header amélioré */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Liste des classes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isLoading ? "Chargement..." : `${classes.length} classe(s) active(s)`}
          </p>
        </div>
        
        {/* Filtres et bouton de rafraîchissement */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadClasses}
            disabled={isLoading}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Chargement..." : "Rafraîchir"}
          </button>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm pl-10 pr-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent appearance-none"
            >
              <option value="name">Trier par nom</option>
              <option value="capacity">Trier par capacité</option>
              <option value="childrenCount">Trier par occupation</option>
            </select>
          </div>
        </div>
      </div>

      {/* État de chargement */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !isLoading && (
        <div className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={loadClasses}
            className="mt-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-700 dark:text-red-300 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Liste vide */}
      {!isLoading && !error && classes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune classe disponible
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune classe n'a été créée pour le moment.
          </p>
        </div>
      )}

      {/* Liste des classes */}
      {!isLoading && !error && classes.length > 0 && (
        <div className="space-y-4">
          {sortedClasses.map((classItem) => {
            const colorClass = getColorClass(classItem.couleur_classe);
            const childrenCount = getChildrenCount(classItem.capacite);
            const occupancyRate = (childrenCount / classItem.capacite) * 100;
            
            const occupancyColor = occupancyRate >= 90 ? "bg-red-500" : 
                                 occupancyRate >= 75 ? "bg-yellow-500" : 
                                 "bg-green-500";
            
            const occupancyTextColor = occupancyRate >= 90 ? "text-red-800 dark:text-red-300" : 
                                     occupancyRate >= 75 ? "text-yellow-800 dark:text-yellow-300" : 
                                     "text-green-800 dark:text-green-300";
            
            const occupancyBgColor = occupancyRate >= 90 ? "bg-red-100 dark:bg-red-900/30" : 
                                   occupancyRate >= 75 ? "bg-yellow-100 dark:bg-yellow-900/30" : 
                                   "bg-green-100 dark:bg-green-900/30";

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
                    <div className={`w-12 h-12 rounded-lg ${colorClass.bg} dark:${colorClass.bg.replace('bg-', 'dark:bg-')}/30 flex items-center justify-center`}>
                      <div className={`w-6 h-6 rounded-full ${colorClass.accent}`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {classItem.nom_classe}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${occupancyBgColor} ${occupancyTextColor}`}>
                          {Math.round(occupancyRate)}% rempli
                        </span>
                      </div>
                      
                      {/* Description si disponible */}
                      {classItem.description_classe && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {classItem.description_classe}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{childrenCount} élèves</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{classItem.created_by_nom || "Créateur"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Capacité: {classItem.capacite}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Indicateur de sélection */}
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    selectedClass === classItem.id ? 'bg-blue-500 scale-150' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                </div>
                
                {/* Informations supplémentaires */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tranche d'âge</p>
                    <p className="font-medium text-gray-800 dark:text-white">{classItem.trancheAge}</p>
                  </div>
                  {classItem.salle && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Salle</p>
                      <p className="font-medium text-gray-800 dark:text-white">{classItem.salle}</p>
                    </div>
                  )}
                </div>
                
                {/* Barre de progression améliorée */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progression d'occupation</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {childrenCount}/{classItem.capacite} places
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${occupancyColor}`}
                      style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0</span>
                    <span>{Math.floor(classItem.capacite / 2)}</span>
                    <span>{classItem.capacite}</span>
                  </div>
                </div>
                
                {/* Dernière activité */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Créée le {formatDate()} par {classItem.created_by_nom || "Utilisateur"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}