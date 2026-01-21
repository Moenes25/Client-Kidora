import { Users, Calendar,  UserCheck, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardService, EnfantWithClass } from "../../services/api/dashboardService";
import { enfantApi } from "../../services/api/enfantApi";
import { imageApi} from "../../services/api/imageService";

interface ChildrenByClassProps {
  selectedClass: string;
}
interface ClassInfo {
  id: string;
  name: string;
  couleur: string;
  childrenCount: number;
  educator: string;
}

interface ChildrenByClassProps {
  selectedClass: string;
  classes: ClassInfo[];
}

export default function ChildrenByClass({ selectedClass, classes }: ChildrenByClassProps) {
  
  const [enfants, setEnfants] = useState<EnfantWithClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [statutFilter, setStatutFilter] = useState<string>('all');
  

    useEffect(() => {
    if (selectedClass && selectedClass !== "all") {
      loadEnfantsByClasse(selectedClass);
    } else {
      setEnfants([]);
      setClassInfo(null);
    }
  }, [selectedClass]);

  const loadEnfantsByClasse = async (classeId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const enfantsData = await dashboardService.getEnfantsByClasseId(classeId);
      setEnfants(enfantsData);
      
      // Si vous avez besoin d'informations supplémentaires sur la classe
      if (enfantsData.length > 0) {
        setClassInfo({
          id: classeId,
          name: enfantsData[0].classeNom || "Classe",
          couleur: enfantsData[0].couleurClasse || "blue",
          childrenCount: enfantsData.length,
          educator: "Éducateur principal" // Vous devrez récupérer ça depuis votre API
        });
      }
      
      
      
    } catch (err) {
      console.error("Erreur lors du chargement des enfants:", err);
      setError("Impossible de charger les enfants de cette classe.");
      setEnfants([]);
    } finally {
      setIsLoading(false);
    }
  };
    const filteredEnfants = statutFilter === 'all' 
    ? enfants 
    : enfants.filter(enfant => 
        // Adaptez cette condition selon vos besoins
        statutFilter === 'present' // Exemple
      );

  const presentCount = Math.floor(enfants.length * 0.8); // Simulation
  const absentCount = enfants.length - presentCount;

  if (selectedClass === "all") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Sélectionnez une classe
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Veuillez sélectionner une classe pour voir les enfants inscrits
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => loadEnfantsByClasse(selectedClass)}
            className="mt-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-700 dark:text-red-300 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

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
            {classInfo?.name ? `Enfants - ${classInfo.name}` : 'Enfants de la classe'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {enfants.length} enfant(s) inscrit(s)
          </p>
        </div>
        {classInfo && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${classInfo.couleur}-100 dark:bg-${classInfo.couleur}-900/30 text-${classInfo.couleur}-600`}>
            {enfants.length}/20
          </div>
        )}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setStatutFilter('all')}
          className={`px-3 py-1 rounded-lg text-sm ${
            statutFilter === 'all' 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setStatutFilter('present')}
          className={`px-3 py-1 rounded-lg text-sm ${
            statutFilter === 'present' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          Présents
        </button>
        <button
          onClick={() => setStatutFilter('absent')}
          className={`px-3 py-1 rounded-lg text-sm ${
            statutFilter === 'absent' 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          Absents
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              {presentCount}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Présents aujourd'hui</span>
        </div>
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              {enfants.length}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Inscrits</span>
        </div>
        {/* <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-lg font-bold text-gray-800 dark:text-white mb-1">
            {Math.round((enfants.length / 20) * 100)}%
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Remplissage</span>
        </div> */}
      </div>

      {/* Liste des enfants */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {filteredEnfants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {enfants.length === 0 ? "Aucun enfant inscrit dans cette classe" : "Aucun enfant correspond au filtre"}
            </p>
          </div>
        ) : (
          filteredEnfants.map((enfant) => (
            <div 
              key={enfant.idEnfant} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                {/* Photo de l'enfant */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {enfant.imageUrl ? (
                      <img 
                        src={imageApi.getImageUrl(enfant.imageUrl)}
                        alt={`${enfant.prenom} ${enfant.nom}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                        <span className="font-semibold text-blue-600 dark:text-blue-300">
                          {enfant.prenom.charAt(0)}{enfant.nom.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Indicateur de présence (simulé) */}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                    Math.random() > 0.3 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {enfant.prenom} {enfant.nom}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{enfant.age} ans</span>
                    <span>•</span>
                    <span>Classe: {enfant.classeNom}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      ID: {enfant.idEnfant.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Informations supplémentaires */}
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {enfant.classeNom || 'Classe'}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    onClick={() => {
                      // Action pour voir les détails
                      console.log('Voir détails de', enfant.idEnfant);
                    }}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      {enfants.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            Exporter la liste
          </button>
          <button className="flex-1 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            Marquer les présences
          </button>
        </div>
      )}
    </div>
  );
}