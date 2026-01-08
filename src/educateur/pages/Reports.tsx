// src/educateur/pages/Reports.tsx
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { 
  UserIcon,
  CalenderIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  FileIcon,
  CheckCircleIcon,
  CloseIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "../../icons";

interface Rapport {
  id: number;
  titre: string;
  type: 'individuel_hebdomadaire' | 'individuel_quotidien' | 'classe_hebdomadaire' | 'trimestriel';
  periode: string;
  dateCreation: string;
  auteur: string;
  enfantsConcernes: number;
  statut: 'brouillon' | 'finalise' | 'envoye' | 'archive';
  resume?: string;
  actionsRecommandees?: string[];
  motsCles?: string[];
  importance: 'faible' | 'moyenne' | 'haute';
}

interface ModeleRapport {
  id: number;
  nom: string;
  description: string;
  type: string;
  tempsEstime: number; // en minutes
  sections: string[];
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [selectedRapport, setSelectedRapport] = useState<Rapport | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'stats'>('list');
  const [showModeleModal, setShowModeleModal] = useState(false);
  const [showViewRapport, setShowViewRapport] = useState(false);
  
  const [rapports, setRapports] = useState<Rapport[]>([
    { 
      id: 1, 
      titre: "Rapport Hebdomadaire - Classe (3-4) ans", 
      type: 'classe_hebdomadaire',
      periode: "08-12 Janvier 2024",
      dateCreation: "2024-01-12",
      auteur: "Mme. Dupont",
      enfantsConcernes: 8,
      statut: 'envoye',
      resume: "Semaine productive avec focus sur la motricité fine. Excellent progrès pour Emma et Lucas.",
      actionsRecommandees: ["Continuer les activités de manipulation fine", "Renforcer l'autonomie vestimentaire", "Intégrer plus d'activités sensorielles"],
      motsCles: ["motricité", "progrès", "socialisation"],
      importance: 'moyenne'
    },
    { 
      id: 2, 
      titre: "Rapport Individuel Hebdomadaire - Fatima Zahra", 
      type: 'individuel_hebdomadaire',
      periode: "08-12 Janvier 2024",
      dateCreation: "2024-01-12",
      auteur: "Mme. Dupont",
      enfantsConcernes: 1,
      statut: 'finalise',
      resume: "Progrès remarquables en mathématiques et leadership. Montre une grande maturité sociale.",
      actionsRecommandees: ["Encourager le tutorat des plus jeunes", "Défis mathématiques supplémentaires", "Responsabilités de classe"],
      motsCles: ["leadership", "mathématiques", "maturité"],
      importance: 'haute'
    },
    { 
      id: 3, 
      titre: "Rapport Individuel Quotidien - Lucas Martin", 
      type: 'individuel_quotidien',
      periode: "15 Janvier 2024",
      dateCreation: "2024-01-15",
      auteur: "M. Martin",
      enfantsConcernes: 1,
      statut: 'brouillon',
      resume: "Journée difficile avec quelques crises émotionnelles. N'a pas bien dormi la nuit dernière.",
      actionsRecommandees: ["Adapter le rythme de la journée", "Instaurer un rituel de calme", "Communication avec les parents"],
      motsCles: ["émotions", "sommeil", "adaptation"],
      importance: 'moyenne'
    },
    { 
      id: 4, 
      titre: "Rapport Trimestriel - Développement Social", 
      type: 'trimestriel',
      periode: "Octobre-Décembre 2023",
      dateCreation: "2024-01-03",
      auteur: "Mme. Leroy",
      enfantsConcernes: 25,
      statut: 'envoye',
      resume: "Amélioration significative des interactions sociales. Réduction des conflits de 40%.",
      actionsRecommandees: ["Maintenir les activités de groupe", "Travailler la résolution de conflits", "Renforcer l'empathie"],
      motsCles: ["socialisation", "conflits", "empathie"],
      importance: 'haute'
    },
    { 
      id: 5, 
      titre: "Rapport Individuel Quotidien - Emma Dubois", 
      type: 'individuel_quotidien',
      periode: "14 Janvier 2024",
      dateCreation: "2024-01-14",
      auteur: "Mme. Dupont",
      enfantsConcernes: 1,
      statut: 'envoye',
      resume: "Journée excellente ! Participation active à toutes les activités. A aidé un camarade en difficulté.",
      actionsRecommandees: ["Encourager ce comportement d'entraide", "Responsabilités supplémentaires", "Félicitations aux parents"],
      motsCles: ["entraide", "participation", "responsabilité"],
      importance: 'faible'
    },
    { 
      id: 6, 
      titre: "Rapport Hebdomadaire - Classe (4-5) ans", 
      type: 'classe_hebdomadaire',
      periode: "01-05 Janvier 2024",
      dateCreation: "2024-01-05",
      auteur: "M. Martin",
      enfantsConcernes: 12,
      statut: 'archive',
      resume: "Bonne reprise après les vacances. Progrès visibles en autonomie et en langage.",
      actionsRecommandees: ["Continuer le travail sur l'autonomie", "Enrichir le vocabulaire", "Activités de motricité globale"],
      motsCles: ["autonomie", "langage", "progrès"],
      importance: 'moyenne'
    },
    { 
      id: 7, 
      titre: "Rapport Trimestriel - Compétences Académiques", 
      type: 'trimestriel',
      periode: "Octobre-Décembre 2023",
      dateCreation: "2024-01-02",
      auteur: "Mme. Dupont",
      enfantsConcernes: 18,
      statut: 'archive',
      resume: "Avancées significatives en lecture et écriture. Bon niveau général en mathématiques.",
      actionsRecommandees: ["Ateliers de lecture supplémentaires", "Défis mathématiques", "Suivi individualisé"],
      motsCles: ["lecture", "mathématiques", "progrès"],
      importance: 'haute'
    },
  ]);

  const modelesRapports: ModeleRapport[] = [
    {
      id: 1,
      nom: "Rapport Individuel Hebdomadaire",
      description: "Suivi hebdomadaire détaillé d'un enfant spécifique",
      type: 'individuel_hebdomadaire',
      tempsEstime: 30,
      sections: ["Progrès de la semaine", "Développement social", "Développement cognitif", "Observations", "Objectifs semaine suivante"]
    },
    {
      id: 2,
      nom: "Rapport Individuel Quotidien",
      description: "Suivi journalier rapide d'un enfant",
      type: 'individuel_quotidien',
      tempsEstime: 10,
      sections: ["Humeur du jour", "Participation", "Relations sociales", "Événements marquants", "À signaler aux parents"]
    },
    {
      id: 3,
      nom: "Rapport Classe Hebdomadaire",
      description: "Bilan hebdomadaire de l'ensemble de la classe",
      type: 'classe_hebdomadaire',
      tempsEstime: 25,
      sections: ["Ambiance générale", "Projets réalisés", "Progrès collectifs", "Points d'attention", "Planning semaine suivante"]
    },
    {
      id: 4,
      nom: "Rapport Trimestriel",
      description: "Évaluation complète sur 3 mois",
      type: 'trimestriel',
      tempsEstime: 60,
      sections: ["Bilan académique", "Développement social", "Compétences acquises", "Objectifs atteints", "Projets futurs"]
    }
  ];

  const filteredRapports = rapports.filter(rapport => {
    const matchesSearch = 
      rapport.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rapport.resume?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rapport.motsCles?.some(mot => mot.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || rapport.type === filterType;
    const matchesStatut = filterStatut === "all" || rapport.statut === filterStatut;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  const stats = {
    totalRapports: rapports.length,
    envoyes: rapports.filter(r => r.statut === 'envoye').length,
    brouillons: rapports.filter(r => r.statut === 'brouillon').length,
    enfantsTotal: rapports.reduce((sum, r) => sum + r.enfantsConcernes, 0),
    parType: {
      individuel_hebdomadaire: rapports.filter(r => r.type === 'individuel_hebdomadaire').length,
      individuel_quotidien: rapports.filter(r => r.type === 'individuel_quotidien').length,
      classe_hebdomadaire: rapports.filter(r => r.type === 'classe_hebdomadaire').length,
      trimestriel: rapports.filter(r => r.type === 'trimestriel').length,
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'individuel_hebdomadaire': return "📅👤";
      case 'individuel_quotidien': return "📝👤";
      case 'classe_hebdomadaire': return "📅👥";
      case 'trimestriel': return "📊📈";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'individuel_hebdomadaire': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'individuel_quotidien': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'classe_hebdomadaire': return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case 'trimestriel': return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'individuel_hebdomadaire': return "Individuel Hebdomadaire";
      case 'individuel_quotidien': return "Individuel Quotidien";
      case 'classe_hebdomadaire': return "Classe Hebdomadaire";
      case 'trimestriel': return "Trimestriel";
      default: return type;
    }
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'brouillon': return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'finalise': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'envoye': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'archive': return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'haute': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'moyenne': return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'faible': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleCreerRapport = (modele: ModeleRapport) => {
    setShowModeleModal(false);
    console.log("Création d'un rapport avec le modèle:", modele.nom);
  };

  const handleExporterRapport = (rapport: Rapport) => {
    console.log("Export du rapport:", rapport.titre);
     const contenuPDF = `
    Rapport: ${rapport.titre}
    Type: ${getTypeLabel(rapport.type)}
    Période: ${rapport.periode}
    Éducateur: ${rapport.auteur}
    Enfants concernés: ${rapport.enfantsConcernes}
    
    Résumé:
    ${rapport.resume || ''}
    
    Actions recommandées:
    ${rapport.actionsRecommandees?.join('\n• ') || ''}
    
    Mots-clés:
    ${rapport.motsCles?.join(', ') || ''}
    
    Date: ${new Date().toLocaleDateString('fr-FR')}
  `;
  
  // Simuler le téléchargement
  const blob = new Blob([contenuPDF], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rapport_${rapport.id}_${rapport.titre.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert(`Rapport "${rapport.titre}" téléchargé !`);
  };

  return (
    <>
      <PageMeta
        title="Rapports et Bilans | Système de Gestion"
        description="Générez et consultez les rapports pédagogiques et bilans de développement"
      />
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rapports et Bilans Pédagogiques
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Documentez, analysez et partagez le développement des enfants
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
                onClick={() => setViewMode('stats')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'stats' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Statistiques
              </button>
            </div>
          </div>
        </div>
      </div>

            {/* Vue Statistiques */}
      {viewMode === 'stats' ? (
        <div className="space-y-6">
          {/* Cartes de statistiques principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Carte 1 : Total Rapports */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-blue-600 dark:to-blue-700">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-100 dark:text-blue-200">
                      Total Rapports
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {stats.totalRapports}
                    </h3>
                    <p className="mt-1 text-xs text-blue-100/90 dark:text-blue-200/90">
                      Rapports créés
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
                    <FileIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full bg-white/20 p-0.5">
                      <ArrowUpIcon className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white">
                      +12% ce mois
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte 2 : Envoyés aux parents */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-emerald-600 dark:to-emerald-700">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100 dark:text-emerald-200">
                      Envoyés
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {stats.envoyes}
                    </h3>
                    <p className="mt-1 text-xs text-emerald-100/90 dark:text-emerald-200/90">
                      Aux parents
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full bg-white/20 p-0.5">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-xs font-medium text-white">
                      89% des rapports mensuels
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte 3 : En préparation */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-amber-500 dark:to-amber-600">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-950">
                      En préparation
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-900">
                      {stats.brouillons}
                    </h3>
                    <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-950/80">
                      À finaliser cette semaine
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-lg bg-white/30 p-2.5 backdrop-blur-sm">
                    <span className="text-lg text-gray-900">✏️</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-900/20 dark:border-amber-950/20">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/30 px-2 py-1 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-gray-900 animate-pulse"></div>
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-900">
                      En cours de rédaction
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte 4 : Enfants couverts */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-5 shadow-md transition-all duration-200 hover:shadow-lg dark:from-cyan-600 dark:to-cyan-700">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100 dark:text-cyan-200">
                      Enfants couverts
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {stats.enfantsTotal}
                    </h3>
                    <p className="mt-1 text-xs text-cyan-100/90 dark:text-cyan-200/90">
                      Moyenne de 6 rapports/enfant
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">
                        Rapports moyens/enfant
                      </span>
                      <span className="text-xs font-bold text-white">6</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div 
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphique de répartition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Répartition par type de rapport
              </h3>
              <div className="space-y-4">
                {Object.entries(stats.parType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(type)}</span>
                      <span className="text-gray-700 dark:text-gray-300">{getTypeLabel(type)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 dark:bg-blue-500"
                          style={{ width: `${(count / stats.totalRapports) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Calendrier des échéances
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Rapports individuels quotidiens</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tous les jours à 16h</div>
                  </div>
                  <CalenderIcon className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Rapports classe hebdomadaires</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tous les vendredis</div>
                  </div>
                  <CalenderIcon className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Rapports trimestriels</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">15 Mars 2024</div>
                  </div>
                  <CalenderIcon className="size-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vue Liste
        <>
          {/* Barre de recherche et filtres */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher par titre, résumé ou mots-clés..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="all">Tous les types</option>
                  <option value="individuel_hebdomadaire">Individuel Hebdomadaire</option>
                  <option value="individuel_quotidien">Individuel Quotidien</option>
                  <option value="classe_hebdomadaire">Classe Hebdomadaire</option>
                  <option value="trimestriel">Trimestriel</option>
                </select>
                
                <select
                  value={filterStatut}
                  onChange={(e) => setFilterStatut(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="brouillon">Brouillon</option>
                  <option value="finalise">Finalisé</option>
                  <option value="envoye">Envoyé</option>
                  <option value="archive">Archivé</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste des rapports */}
          <div className="space-y-4">
            {filteredRapports.map(rapport => (
              <div key={rapport.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${getTypeColor(rapport.type).split(' ')[0]} text-2xl`}>
                        {getTypeIcon(rapport.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {rapport.titre}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(rapport.statut)}`}>
                              {rapport.statut === 'brouillon' ? 'Brouillon' :
                               rapport.statut === 'finalise' ? 'Finalisé' :
                               rapport.statut === 'envoye' ? 'Envoyé' : 'Archivé'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(rapport.importance)}`}>
                              {rapport.importance === 'haute' ? 'Haute priorité' :
                               rapport.importance === 'moyenne' ? 'Priorité moyenne' : 'Basse priorité'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                            <CalenderIcon className="size-4" />
                            {rapport.periode}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                            <UserIcon className="size-4" />
                            {rapport.auteur}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                            <span className="text-lg">👶</span>
                            {rapport.enfantsConcernes} enfant{rapport.enfantsConcernes > 1 ? 's' : ''}
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(rapport.type)}`}>
                            {getTypeLabel(rapport.type)}
                          </span>
                        </div>
                        
                        {rapport.resume && (
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {rapport.resume}
                          </p>
                        )}
                        
                        {rapport.motsCles && rapport.motsCles.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {rapport.motsCles.map((mot, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                                #{mot}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {rapport.actionsRecommandees && rapport.actionsRecommandees.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Actions recommandées :
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {rapport.actionsRecommandees.slice(0, 3).map((action, idx) => (
                                <span key={idx} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <button 
                      onClick={() =>{
                         setSelectedRapport(rapport)
                         setShowViewRapport(true);
                      }
                        }
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <EyeIcon className="size-4" />
                      Consulter
                    </button>
                    <button 
                      onClick={() => handleExporterRapport(rapport)}
                      className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <DownloadIcon className="size-4" />
                      Télécharger
                    </button>
                    {rapport.statut === 'brouillon' && (
                      <button className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm font-medium">
                        Finaliser le rapport
                      </button>
                    )}
                    {rapport.statut === 'finalise' && (
                      <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium">
                        Envoyer aux parents
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRapports.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <FileIcon className="size-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Aucun rapport trouvé avec ces critères</p>
              <button 
                onClick={() => {setSearchTerm(""); setFilterType("all"); setFilterStatut("all");}}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal de sélection de modèle */}
      {showModeleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choisir un modèle de rapport
                </h3>
                <button 
                  onClick={() => setShowModeleModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {modelesRapports.map(modele => (
                  <div key={modele.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {modele.nom}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {modele.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500 dark:text-gray-500">
                            ⏱️ {modele.tempsEstime} min
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(modele.type)}`}>
                            {getTypeLabel(modele.type)}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCreerRapport(modele)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Utiliser
                      </button>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sections incluses :
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modele.sections.map((section, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-gray-600 dark:text-gray-400">
                  + Créer un modèle personnalisé
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de consultation du rapport */}

{showViewRapport && selectedRapport && (
  <div className="fixed inset-0 z-[100000] overflow-y-auto">
    <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setShowViewRapport(false)} />
    <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-5xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-2xl transition-all">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getTypeColor(selectedRapport.type).split(' ')[0]}`}>
              <span className="text-xl">{getTypeIcon(selectedRapport.type)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Rapport {getTypeLabel(selectedRapport.type)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pour les parents • {selectedRapport.periode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExporterRapport(selectedRapport)}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
            >
              <DownloadIcon className="size-4" />
              PDF
            </button>
            <button
              onClick={() => setShowViewRapport(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* En-tête élégant */}
          <div className="text-center border-b pb-6 mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Rapport Pédagogique
            </div>
            <div className="text-xl text-blue-600 dark:text-blue-400 mb-4">
              {selectedRapport.titre}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <CalenderIcon className="size-4" />
                {selectedRapport.periode}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <UserIcon className="size-4" />
                Éducateur: {selectedRapport.auteur}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(selectedRapport.statut)}`}>
                {selectedRapport.statut === 'envoye' ? '✅ Envoyé aux parents' : '📝 En préparation'}
              </div>
            </div>
          </div>

          {/* Section spéciale pour les rapports individuels (pour les parents) */}
          {(selectedRapport.type === 'individuel_hebdomadaire' || selectedRapport.type === 'individuel_quotidien') && (
            <div className="space-y-6">
              {/* Message personnalisé aux parents */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <span className="text-xl">👨‍👩‍👧</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Message aux parents
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Observations détaillées sur votre enfant
                    </p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-medium">Cher(s) parent(s),</span><br/>
                    Voici un rapport détaillé sur le développement et les progrès de votre enfant pendant cette période. 
                    Nous souhaitons partager avec vous les observations positives, les compétences acquises et les domaines 
                    où nous continuons à travailler ensemble pour soutenir sa croissance.
                  </p>
                </div>
              </div>

              {/* Tableau de développement */}
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  📊 Tableau de Développement
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Développement Social</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-500">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Interagit bien avec les autres, partage volontiers, montre de l'empathie
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compétences Cognitives</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-500">Très bon</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Bonne mémoire, résolution de problèmes, curiosité intellectuelle
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expression Émotionnelle</span>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-500">En progression</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Apprend à identifier et exprimer ses émotions de manière appropriée
                    </p>
                  </div>
                </div>
              </div>

              {/* Moments forts de la semaine */}
              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  Moments Forts de la Période
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-800 dark:text-gray-300">Succès académique</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A réussi à compter jusqu'à 20 sans erreur lors de l'activité mathématique
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-800 dark:text-gray-300">Progrès social</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A aidé un camarade qui avait du mal à mettre son manteau
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-gray-800 dark:text-gray-300">Créativité</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A créé un dessin très original lors de l'atelier peinture
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="font-medium text-gray-800 dark:text-gray-300">Autonomie</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Range maintenant systématiquement ses affaires sans rappel
                    </p>
                  </div>
                </div>
              </div>

              {/* Observations détaillées par domaine */}
              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  Observations Détaillées
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-300 mb-2">📚 Compétences Académiques</h5>
                    <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Reconnaît et nomme les lettres de l'alphabet</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Compte jusqu'à 20 avec précision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">↗</span>
                          <span>Travaille la reconnaissance des formes géométriques</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-300 mb-2">🤝 Compétences Sociales</h5>
                    <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Partage spontanément avec les autres enfants</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Utilise les formules de politesse systématiquement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">↗</span>
                          <span>Apprend à résoudre les petits conflits verbalement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommandations pour les parents */}
              <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Suggestions pour la Maison
                </h4>
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                        <span className="text-purple-600 dark:text-purple-300">📚</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Lecture quotidienne</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Lire ensemble 15 minutes par jour pour renforcer le vocabulaire
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                        <span className="text-blue-600 dark:text-blue-300">🎮</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Jeux éducatifs</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Proposer des puzzles et jeux de construction pour la motricité fine
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <span className="text-green-600 dark:text-green-300">🗣️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Dialoguer sur les émotions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Nommer les émotions ressenties pendant la journée pour développer l'intelligence émotionnelle
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activités préférées */}
              <div className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">❤️</span>
                  Activités Préférées
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Atelier peinture
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Jeux de construction
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Histoires en groupe
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Jeux dans la cour
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Activités musicales
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Section pour les rapports de classe et trimestriels (garder l'ancien design) */}
          {(selectedRapport.type === 'classe_hebdomadaire' || selectedRapport.type === 'trimestriel') && (
            <div className="space-y-6">
              {/* ... Garder le contenu existant pour les rapports de classe ... */}
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  📋 Résumé Exécutif
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedRapport.resume}
                </p>
              </div>
              
              {/* ... Autres sections existantes ... */}
            </div>
          )}

          {/* Signature et contacts */}
          <div className="p-5 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">📞 Contact</h5>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Éducateur/Éducatrice: <span className="font-medium text-gray-900 dark:text-white">{selectedRapport.auteur}</span></p>
                  <p>Disponible pour échanger: Lundi et jeudi de 16h30 à 17h30</p>
                  <p>Email: educateur@ecole-exemple.fr</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block border-t border-gray-300 dark:border-gray-700 pt-4">
                  <p className="font-medium text-gray-900 dark:text-white">{selectedRapport.auteur}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Éducateur/Éducatrice</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Établi le {new Date().toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Rapport #{selectedRapport.id} • Créé le {new Date(selectedRapport.dateCreation).toLocaleDateString('fr-FR')}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowViewRapport(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Fermer
            </button>
            <button
              onClick={() => handleExporterRapport(selectedRapport)}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
            >
              <DownloadIcon className="size-4" />
              Télécharger pour les parents
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      {/* Section Export et partage */}
      <div className="mt-8 space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10 rounded-2xl border border-purple-200 dark:border-purple-800 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📤 Export et partage
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium text-gray-900 dark:text-white">Exporter en PDF</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Format professionnel</div>
            </button>
            
            <button className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-colors text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-medium text-gray-900 dark:text-white">Envoyer par email</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Directement aux parents</div>
            </button>
            
            <button className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-center">
              <div className="text-2xl mb-2">🖨️</div>
              <div className="font-medium text-gray-900 dark:text-white">Imprimer</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Version physique</div>
            </button>
          </div>
        </div>
      </div>

      {/* Pied de page avec résumé */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{rapports.length} rapports</span> 
              {' '}gérés dans le système
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
              <DownloadIcon className="size-4 inline mr-2" />
              Exporter tout
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Générer rapport mensuel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}