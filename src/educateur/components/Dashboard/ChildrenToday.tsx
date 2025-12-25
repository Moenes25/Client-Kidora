// src/educateur/components/Dashboard/ChildrenToday.tsx
import { useState } from "react";
import { UserIcon, CheckCircleIcon, CloseIcon } from "../../../icons";

interface Enfant {
  id: number;
  nom: string;
  present: boolean;
  heureArrivee?: string;
  raison?: string;
  photo?: string;
  classe?: string;
}

interface ChildrenTodayProps {
  enfants?: Enfant[];
}

export default function ChildrenToday({ enfants: enfantsExternes }: ChildrenTodayProps) {
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');
  
  // Photos spécifiques par catégorie d'âge
  const photosParClasse = {
    "(3-4) ans": [
      "images/3-4_ans/enfant_2.jpg",
      "images/3-4_ans/enfant_4.jpg", 
      "images/3-4_ans/enfant_3.jpg", // Bébé 3
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=150&h=150&fit=crop&crop=face", // Bébé 4
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // Bébé 5
    ],
    "(4-5) ans": [
      "images/3-4_ans/enfant_5.jpg",
      "images/3-4_ans/enfant_6.jpg",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // 4-5 ans 3
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-97dc7697c36?w=150&h=150&fit=crop&crop=face", // 4-5 ans 4
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", // 4-5 ans 5
    ],
    "(6-7) ans": [
      "images/3-4_ans/enfant_7.jpg",
      "images/3-4_ans/enfant_8.jpg",
      "images/3-4_ans/enfant_9.jpg",
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=150&h=150&fit=crop&crop=face", // 6-7 ans 4
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face", // 6-7 ans 5
    ],
    "(8-9) ans": [
      "images/3-4_ans/enfant_10.jpg",
      "images/3-4_ans/enfant_11.jpg",
       "images/3-4_ans/enfant_11.jpg",// 8-9 ans 3
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // 8-9 ans 4
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // 8-9 ans 5
    ],
    "(10-11) ans": [
      "images/3-4_ans/enfant_13.jpg",
       "images/3-4_ans/enfant_14.jpg",
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?w=150&h=150&fit=crop&crop=face", // 10-11 ans 3
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", // 10-11 ans 4
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // 10-11 ans 5
    ],
    "12 ans": [
      "images/3-4_ans/enfant_15.jpg",
      "images/3-4_ans/enfant_16.jpg",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face", // 12 ans 3
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // 12 ans 4
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // 12 ans 5
    ]
  };

  const defaultEnfants: Enfant[] = [
    { 
      id: 1, 
      nom: "Emma Dubois", 
      present: true, 
      heureArrivee: "08:30", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][0]
    },
    { 
      id: 2, 
      nom: "Lucas Martin", 
      present: true, 
      heureArrivee: "08:45", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][0]
    },
    { 
      id: 3, 
      nom: "Fatima Zahra", 
      present: true, 
      heureArrivee: "09:00", 
      classe: "12 ans",
      photo: photosParClasse["12 ans"][0]
    },
    { 
      id: 4, 
      nom: "Voussez Alain", 
      present: false, 
      raison: "Maladie", 
      classe: "(8-9) ans",
      photo: photosParClasse["(8-9) ans"][0]
    },
    { 
      id: 5, 
      nom: "Chloé Petit", 
      present: true, 
      heureArrivee: "08:15", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][1]
    },
    { 
      id: 6, 
      nom: "Mohamed Ali", 
      present: false, 
      raison: "Rendez-vous médical", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][1]
    },
    { 
      id: 7, 
      nom: "Léa Bernard", 
      present: true, 
      heureArrivee: "08:50", 
      classe: "12 ans",
      photo: photosParClasse["12 ans"][1]
    },
    { 
      id: 8, 
      nom: "Thomas Leroy", 
      present: true, 
      heureArrivee: "09:05", 
      classe: "(8-9) ans",
      photo: photosParClasse["(8-9) ans"][1]
    },
    { 
      id: 9, 
      nom: "Sophie Moreau", 
      present: true, 
      heureArrivee: "08:20", 
      classe: "(3-4) ans",
      photo: photosParClasse["(3-4) ans"][2]
    },
    { 
      id: 10, 
      nom: "Hugo Blanc", 
      present: false, 
      raison: "Vacances", 
      classe: "(6-7) ans",
      photo: photosParClasse["(6-7) ans"][2]
    },
    { 
      id: 11, 
      nom: "Anna Lambert", 
      present: true, 
      heureArrivee: "08:40", 
      classe: "(10-11) ans",
      photo: photosParClasse["(10-11) ans"][0]
    },
    { 
      id: 12, 
      nom: "Paul Dupont", 
      present: false, 
      raison: "Grippe", 
      classe: "(10-11) ans",
      photo: photosParClasse["(10-11) ans"][1]
    },
    { 
      id: 13, 
      nom: "Zoé Leroy", 
      present: true, 
      heureArrivee: "08:55", 
      classe: "(4-5) ans",
      photo: photosParClasse["(4-5) ans"][0]
    },
    { 
      id: 14, 
      nom: "Noah Martin", 
      present: true, 
      heureArrivee: "09:10", 
      classe: "(4-5) ans",
      photo: photosParClasse["(4-5) ans"][1]
    },
  ];
  
  // const enfants = enfantsExternes || defaultEnfants;
   const enfants =  defaultEnfants;
  const enfantsFiltres = enfants.filter(enfant => {
    if (filter === 'present') return enfant.present;
    if (filter === 'absent') return !enfant.present;
    return true;
  });

  const countPresent = enfants.filter(e => e.present).length;
  const countAbsent = enfants.filter(e => !e.present).length;

   return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-300 dark:bg-white shadow-sm">
      {/* ... en-tête inchangé ... */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900">
            Présence des enfants
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        
      <div className="flex space-x-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-800 font-medium' : 'bg-gray-100 text-gray-600 dark:bg-gray-200 dark:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-300'}`}
        >
          Tous ({enfants.length})
        </button>
        <button 
          onClick={() => setFilter('present')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'present' ? 'bg-green-100 text-green-600 dark:bg-green-200 dark:text-green-800 font-medium' : 'bg-gray-100 text-gray-600 dark:bg-gray-200 dark:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-300'}`}
        >
          Présents ({countPresent})
        </button>
        <button 
          onClick={() => setFilter('absent')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'absent' ? 'bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-800 font-medium' : 'bg-gray-100 text-gray-600 dark:bg-gray-200 dark:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-300'}`}
        >
          Absents ({countAbsent})
        </button>
      </div>
      </div>
      {/* Grille des enfants */}
      {enfantsFiltres.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-700 border border-dashed border-gray-300 dark:border-gray-400 rounded-lg">
          <UserIcon className="size-10 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
          <p>Aucun enfant correspondant au filtre</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {enfantsFiltres.map(enfant => (
            <div 
              key={enfant.id} 
              className="flex flex-col items-center p-3 border border-gray-200 dark:border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors group"
            >
              {/* Photo et statut */}
              <div className="relative mb-3">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${enfant.present ? 'border-green-200 dark:border-green-300' : 'border-red-200 dark:border-red-300'}`}>
                  {enfant.photo ? (
                    <img 
                      src={enfant.photo} 
                      alt={enfant.nom}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center ${enfant.present ? 'bg-green-100 dark:bg-green-200' : 'bg-red-100 dark:bg-red-200'}">
                              <span class="font-medium ${enfant.present ? 'text-green-600 dark:text-green-800' : 'text-red-600 dark:text-red-800'}">
                                ${enfant.nom.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${enfant.present ? 'bg-green-100 dark:bg-green-200' : 'bg-red-100 dark:bg-red-200'}`}>
                      <span className={`font-medium ${enfant.present ? 'text-green-600 dark:text-green-800' : 'text-red-600 dark:text-red-800'}`}>
                        {enfant.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Badge d'état */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-200 flex items-center justify-center ${enfant.present ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'}`}>
                  {enfant.present ? (
                    <CheckCircleIcon className="size-3 text-white" />
                  ) : (
                    <CloseIcon className="size-3 text-white" />
                  )}
                </div>
              </div>
              
              {/* Nom de l'enfant */}
              <div className="text-center mb-2">
                <div className="font-medium text-gray-900 dark:text-gray-900 text-sm truncate w-full">
                  {enfant.nom.split(' ')[0]}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-700">
                  {enfant.nom.split(' ')[1]}
                </div>
              </div>
              
              {/* Informations de présence */}
              <div className="text-center">
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${enfant.present ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800' : 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800'}`}>
                  {enfant.present ? 'Présent' : 'Absent'}
                </div>
                
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-700">
                  {enfant.present ? (
                    <div className="flex items-center justify-center">
                      <CheckCircleIcon className="size-2 mr-1 text-green-500 dark:text-green-600" />
                      <span>{enfant.heureArrivee}</span>
                    </div>
                  ) : (
                    <div className="text-red-500 dark:text-red-600">
                      {enfant.raison?.substring(0, 15)}...
                    </div>
                  )}
                </div>
                
                {enfant.classe && (
                  <div className={`mt-1 text-xs font-medium px-2 py-0.5 rounded ${
                    enfant.classe.includes("3-4") ? "bg-blue-50 text-blue-600 dark:bg-blue-100 dark:text-blue-700" :
                    enfant.classe.includes("4-5") ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-100 dark:text-indigo-700" :
                    enfant.classe.includes("6-7") ? "bg-green-50 text-green-600 dark:bg-green-100 dark:text-green-700" :
                    enfant.classe.includes("8-9") ? "bg-amber-50 text-amber-600 dark:bg-amber-100 dark:text-amber-700" :
                    enfant.classe.includes("10-11") ? "bg-purple-50 text-purple-600 dark:bg-purple-100 dark:text-purple-700" :
                    "bg-pink-50 text-pink-600 dark:bg-pink-100 dark:text-pink-700"
                  }`}>
                    {enfant.classe}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Statistiques en bas */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-100 rounded-lg flex items-center">
            <div className="mr-3">
              <CheckCircleIcon className="size-5 text-green-600 dark:text-green-700" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-600 dark:text-green-700">
                {countPresent}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-700">
                Présents
              </div>
            </div>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-100 rounded-lg flex items-center">
            <div className="mr-3">
              <CloseIcon className="size-5 text-red-600 dark:text-red-700" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-600 dark:text-red-700">
                {countAbsent}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-700">
                Absents
              </div>
            </div>
          </div>
        </div>
        
        {/* Bouton d'action */}
        <div className="mt-4">
          <button className="w-full py-2.5 bg-blue-50 dark:bg-blue-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors text-sm font-medium">
            Modifier les présences
          </button>
        </div>
      </div>
    </div>
    
  );
}