// src/educateur/pages/Children.tsx
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { 
  PlusIcon, 
  EyeIcon,
  DownloadIcon,
  MailIcon,
  CalenderIcon,
  UserIcon,
  FileIcon,
} from "../../icons";

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  dateNaissance: string;
  parentNom: string;
  parentTelephone: string;
  parentEmail: string;
  presence: 'present' | 'absent' | 'retard';
  allergies?: string[];
  notes?: string;
  photo?: string;
  derniereObservation?: string;
  derniereObservationDate?: string;
  activitesPreferees?: string[];
  difficultes?: string[];
  pointsFort?: string[];
}

export default function ChildrenPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterPresence, setFilterPresence] = useState("all");
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const [enfants, setEnfants] = useState<Enfant[]>([
    { 
      id: 1, 
      nom: "Dubois", 
      prenom: "Emma", 
      age: 4, 
      classe: "(3-4) ans", 
      dateNaissance: "2020-03-15",
      parentNom: "Sophie Dubois",
      parentTelephone: "06 12 34 56 78",
      parentEmail: "sophie.dubois@email.com",
      presence: 'present',
      allergies: ["Aucune"],
      notes: "Enfant très sociable, aime les activités créatives",
      photo: "/images/3-4_ans/enfant_2.jpg",
      derniereObservation: "A bien participé à l'activité peinture ce matin",
      derniereObservationDate: "2024-01-15",
      activitesPreferees: ["Peinture", "Musique", "Lego"],
      difficultes: ["Concentration après 10h"],
      pointsFort: ["Créativité", "Sociabilité"]
    },
    { 
      id: 2, 
      nom: "Martin", 
      prenom: "Lucas", 
      age: 6, 
      classe: "(6-7) ans", 
      dateNaissance: "2018-07-22",
      parentNom: "Thomas Martin",
      parentTelephone: "06 23 45 67 89",
      parentEmail: "thomas.martin@email.com",
      presence: 'present',
      allergies: ["Lactose"],
      notes: "Excellente mémoire, curieux",
      photo: "/images/3-4_ans/enfant_7.jpg",
      derniereObservation: "A appris un nouveau mot aujourd'hui",
      derniereObservationDate: "2024-01-15",
      activitesPreferees: ["Construction", "Lecture", "Jeux collectifs"],
      difficultes: ["Tendance à monopoliser la parole"],
      pointsFort: ["Curiosité", "Mémoire"]
    },
    { 
      id: 3, 
      nom: "Zahra", 
      prenom: "Fatima", 
      age: 12, 
      classe: "12 ans", 
      dateNaissance: "2012-11-05",
      parentNom: "Ali Zahra",
      parentTelephone: "06 34 56 78 90",
      parentEmail: "ali.zahra@email.com",
      presence: 'present',
      allergies: ["Arachides"],
      notes: "Responsable, aide les plus jeunes",
      photo: "/images/3-4_ans/enfant_15.jpg",
      derniereObservation: "A aidé un plus jeune à résoudre un problème",
      derniereObservationDate: "2024-01-14",
      activitesPreferees: ["Mathématiques", "Dessin", "Responsabilités"],
      difficultes: ["Perfectionniste"],
      pointsFort: ["Responsabilité", "Empathie"]
    },
    { 
      id: 4, 
      nom: "Alain", 
      prenom: "Voussez", 
      age: 9, 
      classe: "(8-9) ans", 
      dateNaissance: "2015-02-28",
      parentNom: "Pierre Alain",
      parentTelephone: "06 45 67 89 01",
      parentEmail: "pierre.alain@email.com",
      presence: 'absent',
      allergies: ["Aucune"],
      notes: "Malade cette semaine",
      photo: "/images/3-4_ans/enfant_10.jpg"
    },
    { 
      id: 5, 
      nom: "Petit", 
      prenom: "Chloé", 
      age: 4, 
      classe: "(3-4) ans", 
      dateNaissance: "2020-09-10",
      parentNom: "Marie Petit",
      parentTelephone: "06 56 78 90 12",
      parentEmail: "marie.petit@email.com",
      presence: 'present',
      allergies: ["Gluten"],
      notes: "Timide mais très douée en musique",
      photo: "/images/3-4_ans/enfant_5.jpg"
    },
    { 
      id: 6, 
      nom: "Ali", 
      prenom: "Mohamed", 
      age: 7, 
      classe: "(6-7) ans", 
      dateNaissance: "2017-04-18",
      parentNom: "Karim Ali",
      parentTelephone: "06 67 89 01 23",
      parentEmail: "karim.ali@email.com",
      presence: 'absent',
      allergies: ["Aucune"],
      notes: "Rendez-vous médical",
      photo: "/images/3-4_ans/enfant_8.jpg"
    },
    { 
      id: 7, 
      nom: "Bernard", 
      prenom: "Léa", 
      age: 12, 
      classe: "12 ans", 
      dateNaissance: "2012-12-12",
      parentNom: "Jacques Bernard",
      parentTelephone: "06 78 90 12 34",
      parentEmail: "jacques.bernard@email.com",
      presence: 'present',
      allergies: ["Œufs"],
      notes: "Excellente en mathématiques",
      photo: "/images/3-4_ans/enfant_16.jpg"
    },
    { 
      id: 8, 
      nom: "Leroy", 
      prenom: "Thomas", 
      age: 9, 
      classe: "(8-9) ans", 
      dateNaissance: "2015-06-30",
      parentNom: "Anne Leroy",
      parentTelephone: "06 89 01 23 45",
      parentEmail: "anne.leroy@email.com",
      presence: 'retard',
      allergies: ["Aucune"],
      notes: "Arrivé à 9h05 ce matin",
      photo: "/images/3-4_ans/enfant_11.jpg"
    },
    { 
      id: 9, 
      nom: "Moreau", 
      prenom: "Sophie", 
      age: 5, 
      classe: "(4-5) ans", 
      dateNaissance: "2019-01-25",
      parentNom: "Paul Moreau",
      parentTelephone: "06 90 12 34 56",
      parentEmail: "paul.moreau@email.com",
      presence: 'present',
      allergies: ["Fruits à coque"],
      notes: "Aime beaucoup la lecture",
      photo: "/images/3-4_ans/enfant_6.jpg"
    },
    { 
      id: 10, 
      nom: "Blanc", 
      prenom: "Hugo", 
      age: 7, 
      classe: "(6-7) ans", 
      dateNaissance: "2017-08-14",
      parentNom: "Claire Blanc",
      parentTelephone: "07 01 23 45 67",
      parentEmail: "claire.blanc@email.com",
      presence: 'absent',
      allergies: ["Aucune"],
      notes: "Vacances en famille",
      photo: "/images/3-4_ans/enfant_9.jpg"
    },
  ]);

  // Filtrer les enfants
  const filteredEnfants = enfants.filter(enfant => {
    const matchesSearch = 
      enfant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enfant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enfant.classe.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filterClass === "all" || enfant.classe === filterClass;
    const matchesPresence = filterPresence === "all" || enfant.presence === filterPresence;
    
    return matchesSearch && matchesClass && matchesPresence;
  });

  // Classes disponibles
  const classes = ["all", ...new Set(enfants.map(e => e.classe))];
  
  return (
    <>
      <PageMeta
        title="Liste des Enfants | Système de Gestion"
        description="Consultez les informations détaillées des enfants, leurs progrès et observations"
      />
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Liste des Enfants
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Consultez les informations détaillées et les observations sur chaque enfant
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Liste
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Grille
              </button>
            </div>
            
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <DownloadIcon className="size-5" />
              Exporter la liste
            </button>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres améliorée */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 text-gray-900 dark:text-gray-400">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un enfant par nom, prénom ou classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 ">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5 text-gray-500 dark:text-gray-400" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
   <select
  value={filterClass}
  onChange={(e) => setFilterClass(e.target.value)}
  className="
    pl-10 pr-4 py-3
    bg-gray-50 dark:bg-gray-800
    border border-gray-300 dark:border-gray-700
    rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500
    text-gray-400 dark:text-gray
  "
>
  <option value="all" className="text-gray-500 dark:text-gray">
    Toutes les classes
  </option>

  {classes.filter(c => c !== "all").map(classe => (
    <option
      key={classe}
      value={classe}
      className="text-gray-700 dark:text-gray-500"
    >
      Classe {classe}
    </option>
  ))}
</select>

            </div>
            
            <div className="relative">
              <select
                value={filterPresence}
                onChange={(e) => setFilterPresence(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 text-gray-400 dark:text-gray"
              >
                <option value="all">Tous les statuts</option>
                <option value="present">Présents</option>
                <option value="absent">Absents</option>
                <option value="retard">En retard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage selon le mode sélectionné */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-white">Enfant</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-white">Âge/Classe</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-white">Contact parents</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-white">Dernière observation</th>
                  <th className="py-3 px-25 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredEnfants.map(enfant => (
                  <tr key={enfant.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {enfant.photo ? (
                              <img 
                                src={enfant.photo} 
                                alt={`${enfant.prenom} ${enfant.nom}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                        <span class="font-medium text-gray-600 dark:text-gray-300">
                                          ${enfant.prenom[0]}${enfant.nom[0]}
                                        </span>
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <span className="font-medium text-gray-600 dark:text-gray-300">
                                  {enfant.prenom[0]}{enfant.nom[0]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {enfant.prenom} {enfant.nom}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {enfant.allergies?.join(", ") || "Aucune allergie"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">{enfant.age} ans</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        enfant.classe.includes("3-4") ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                        enfant.classe.includes("4-5") ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" :
                        enfant.classe.includes("6-7") ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        enfant.classe.includes("8-9") ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}>
                        {enfant.classe}
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {enfant.parentNom}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                          {enfant.parentTelephone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MailIcon className="size-3" />
                          {enfant.parentEmail}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="max-w-xs">
                        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {enfant.derniereObservation || "Aucune observation récente"}
                        </div>
                        {enfant.derniereObservationDate && (
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            <CalenderIcon className="inline size-3 mr-1" />
                            {new Date(enfant.derniereObservationDate).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedEnfant(enfant)}
                          className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium flex items-center gap-2"
                          title="Voir le profil complet"
                        >
                          <EyeIcon className="size-4" />
                          Voir profil
                        </button>
                        <button 
                          className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                          title="Contacter les parents"
                        >
                          <MailIcon className="size-4" />
                          Contacter
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredEnfants.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="size-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Aucun enfant trouvé avec ces critères</p>
              <button 
                onClick={() => {setSearchTerm(""); setFilterClass("all"); setFilterPresence("all");}}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      ) : (
        // Mode grille
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEnfants.map(enfant => (
            <div key={enfant.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800">
                    {enfant.photo ? (
                      <img 
                        src={enfant.photo} 
                        alt={`${enfant.prenom} ${enfant.nom}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="font-medium text-gray-600 dark:text-gray-300 text-lg">
                          {enfant.prenom[0]}{enfant.nom[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center ${
                    enfant.presence === 'present' ? 'bg-green-500 dark:bg-green-600' :
                    enfant.presence === 'absent' ? 'bg-red-500 dark:bg-red-600' :
                    'bg-amber-500 dark:bg-amber-600'
                  }`}>
                    {enfant.presence === 'present' ? '✓' : '✗'}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {enfant.prenom} {enfant.nom}
                </h3>
                
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{enfant.age} ans</span>
                  <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    enfant.classe.includes("3-4") ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}>
                    {enfant.classe}
                  </span>
                </div>
                
                <div className="mt-4 w-full">
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-left mb-2">
                    <strong>Points forts :</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {enfant.pointsFort?.slice(0, 2).map((point, idx) => (
                        <span key={idx} className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-left mb-4">
                    <strong>Activités préférées :</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {enfant.activitesPreferees?.slice(0, 2).map((activite, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">
                          {activite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 w-full">
                  <div className="flex justify-between gap-2">
                    <button 
                      onClick={() => setSelectedEnfant(enfant)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Voir profil
                    </button>
                    <button 
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Contacter parents"
                    >
                      <MailIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}