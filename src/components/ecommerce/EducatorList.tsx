// components/nursery/EducatorList.tsx
import { useState } from "react";
import { UserCheck, UserX, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Educator {
  id: number;
  name: string;
  role: string;
  status: 'present' | 'absent' | 'vacation';
  avatar: string;
  assignedClass: string;
  timeIn?: string;
  timeOut?: string;
}

const allEducators: Educator[] = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Éducatrice principale",
    status: 'present',
    avatar: "/images/3-4_ans/educatrice_1.jpg",
    assignedClass: "C1",
    timeIn: "08:00",
    timeOut: "17:00"
  },
  {
    id: 2,
    name: "Jean Martin",
    role: "Assistant éducateur",
    status: 'present',
    avatar: "/images/user/user-35.jpg",
    assignedClass: "C2",
    timeIn: "08:30",
    timeOut: "17:30"
  },
  {
    id: 3,
    name: "Sophie Petit",
    role: "Éducatrice",
    status: 'present',
    avatar: "/images/user/user-36.jpg",
    assignedClass: "C3",
    timeIn: "08:15",
    timeOut: "16:45"
  },
  {
    id: 4,
    name: "Luc Bernard",
    role: "Assistant",
    status: 'present',
    avatar: "/images/user/user-37.jpg",
    assignedClass: "C4",
    timeIn: "09:00",
    timeOut: "18:00"
  },
  {
    id: 5,
    name: "Camille Rousseau",
    role: "Stagiaire",
    status: 'present',
    avatar: "/images/user/user-38.jpg",
    assignedClass: "C5",
    timeIn: "08:45",
    timeOut: "16:30"
  },
  {
    id: 6,
    name: "Thomas Leroy",
    role: "Éducateur spécialisé",
    status: 'present',
    avatar: "/images/user/user-39.jpg",
    assignedClass: "C6",
    timeIn: "08:20",
    timeOut: "17:15"
  },
  {
    id: 7,
    name: "Julie Moreau",
    role: "Éducatrice spécialisée",
    status: 'absent',
    avatar: "/images/user/user-40.jpg",
    assignedClass: "C7"
  },
  {
    id: 8,
    name: "Pierre Lefèvre",
    role: "Directeur",
    status: 'vacation',
    avatar: "/images/user/user-41.jpg",
    assignedClass: "Toutes classes"
  }
];

export default function EducatorList() {
  const [showAllPresent, setShowAllPresent] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Filtrer les éducateurs présents aujourd'hui
  const presentEducators = allEducators.filter(edu => edu.status === 'present');
  
  // Filtrer les autres éducateurs (absents ou en vacances)
  const otherEducators = allEducators.filter(edu => edu.status !== 'present');
  
  // Nombre à afficher par défaut (les 4 premiers)
  const defaultVisibleCount = 4;
  
  // Éducateurs présents à afficher (4 par défaut, ou tous si showAllPresent)
  const visiblePresentEducators = showAllPresent 
    ? presentEducators 
    : presentEducators.slice(0, defaultVisibleCount);
  
  // Éducateurs non présents à afficher (4 par défaut, ou tous si showAllTeam)
  const visibleOtherEducators = showAllTeam
    ? otherEducators
    : otherEducators.slice(0, defaultVisibleCount);
  
  // Statistiques
  const stats = {
    total: allEducators.length,
    present: presentEducators.length,
    absent: allEducators.filter(edu => edu.status === 'absent').length,
    vacation: allEducators.filter(edu => edu.status === 'vacation').length
  };

  const getStatusIcon = (status: Educator['status']) => {
    switch (status) {
      case 'present': return <UserCheck className="w-4 h-4 text-green-500" />;
      case 'absent': return <UserX className="w-4 h-4 text-red-500" />;
      case 'vacation': return <Calendar className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Educator['status']) => {
    switch (status) {
      case 'present': return "Présent";
      case 'absent': return "Absent";
      case 'vacation': return "En congés";
    }
  };

  const getStatusColor = (status: Educator['status']) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'absent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'vacation': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getAvatarColor = (status: Educator['status']) => {
    switch (status) {
      case 'present': return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
      case 'absent': return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300';
      case 'vacation': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    // <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
   <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
   <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Équipe présente aujourd'hui
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats.present}/{stats.total} éducateurs présents
          </p>
        </div>
      </div>

      {/* Statistiques rapides */}
      {/* <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-1">
            <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-white">{stats.present}</span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Présents</span>
        </div>
        <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-1">
            <UserX className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-white">{stats.absent}</span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Absents</span>
        </div>
        <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-1">
            <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-white">{stats.vacation}</span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">En congés</span>
        </div>
      </div> */}

      {/* Liste des éducateurs présents */}
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Présents aujourd'hui ({presentEducators.length})
          </h4>
          {presentEducators.length > defaultVisibleCount && (
            <button 
              onClick={() => setShowAllPresent(!showAllPresent)}
              className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline flex items-center gap-1"
            >
              {showAllPresent ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Voir moins
                </>
              ) : (
                <>
                  Voir les {presentEducators.length - defaultVisibleCount} autres
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {visiblePresentEducators.map((educator) => (
          <div 
            key={educator.id} 
            className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900/10"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
                  {imageErrors[educator.id] ? (
                    <div className={`w-full h-full ${getAvatarColor(educator.status)} flex items-center justify-center`}>
                      <span className="text-sm font-semibold">
                        {educator.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={educator.avatar}
                      alt={educator.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(educator.id)}
                    />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {getStatusIcon(educator.status)}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800 dark:text-white truncate">
                    {educator.name}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {educator.role}
                </p>
                {educator.timeIn && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {educator.timeIn} - {educator.timeOut}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {educator.assignedClass}
              </span>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>En ligne</span>
              </div>
            </div>
          </div>
        ))}

        {presentEducators.length > defaultVisibleCount && !showAllPresent && (
          <div className="text-center pt-2">
            <div className="text-xs text-gray-500">
              + {presentEducators.length - defaultVisibleCount} éducateur(s) présent(s)
            </div>
          </div>
        )}
      </div>

 
    </div>
  );
}