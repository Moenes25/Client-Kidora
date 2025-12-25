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
  type: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'individuel' | 'activite' | 'medical' | 'comportement';
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
  
  const [rapports, setRapports] = useState<Rapport[]>([
    { 
      id: 1, 
      titre: "Rapport Hebdomadaire - Classe (3-4) ans", 
      type: 'hebdomadaire',
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
      titre: "Bilan Individuel - Fatima Zahra", 
      type: 'individuel',
      periode: "Décembre 2023",
      dateCreation: "2024-01-05",
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
      titre: "Évaluation Activité Jardinage Éducatif", 
      type: 'activite',
      periode: "10 Janvier 2024",
      dateCreation: "2024-01-11",
      auteur: "M. Martin",
      enfantsConcernes: 15,
      statut: 'brouillon',
      resume: "Activité très appréciée, excellente participation. Observations positives sur la patience et la curiosité.",
      actionsRecommandees: ["Réitérer l'activité mensuellement", "Impliquer les enfants dans l'entretien", "Créer un journal de croissance"],
      motsCles: ["nature", "patience", "curiosité"],
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
      titre: "Suivi Médical - Vaccinations et Santé", 
      type: 'medical',
      periode: "Janvier 2024",
      dateCreation: "2024-01-10",
      auteur: "Infirmerie",
      enfantsConcernes: 42,
      statut: 'archive',
      resume: "Mise à jour complète des carnets de vaccination. Aucun cas de maladie contagieuse.",
      actionsRecommandees: ["Rappel vaccinal pour 3 enfants", "Contrôle mensuel des allergies", "Sensibilisation hygiène"],
      motsCles: ["vaccination", "santé", "prévention"],
      importance: 'haute'
    },
    { 
      id: 6, 
      titre: "Observation Comportementale - Thomas Leroy", 
      type: 'comportement',
      periode: "Janvier 2024",
      dateCreation: "2024-01-14",
      auteur: "M. Martin",
      enfantsConcernes: 1,
      statut: 'envoye',
      resume: "Amélioration notable de la concentration. Réduction des retards matinaux.",
      actionsRecommandees: ["Continuer le système de récompenses", "Communication régulière avec les parents", "Activités de concentration"],
      motsCles: ["concentration", "ponctualité", "progrès"],
      importance: 'moyenne'
    },
    { 
      id: 7, 
      titre: "Rapport Mensuel - Activités Créatives", 
      type: 'mensuel',
      periode: "Décembre 2023",
      dateCreation: "2024-01-02",
      auteur: "Mme. Dupont",
      enfantsConcernes: 18,
      statut: 'archive',
      resume: "Excellente participation aux activités artistiques. Découverte de talents cachés.",
      actionsRecommandees: ["Exposition des œuvres", "Ateliers avec artiste local", "Portfolio artistique par enfant"],
      motsCles: ["créativité", "art", "expression"],
      importance: 'faible'
    },
  ]);

  const modelesRapports: ModeleRapport[] = [
    {
      id: 1,
      nom: "Rapport Hebdomadaire Standard",
      description: "Format standard pour le suivi hebdomadaire d'une classe",
      type: 'hebdomadaire',
      tempsEstime: 20,
      sections: ["Présences/Absences", "Activités réalisées", "Observations", "Progrès notables", "Points d'attention"]
    },
    {
      id: 2,
      nom: "Bilan Individuel Détaillé",
      description: "Rapport complet sur le développement d'un enfant",
      type: 'individuel',
      tempsEstime: 45,
      sections: ["Développement cognitif", "Développement social", "Développement émotionnel", "Compétences acquises", "Objectifs futurs"]
    },
    {
      id: 3,
      nom: "Évaluation d'Activité",
      description: "Analyse détaillée d'une activité spécifique",
      type: 'activite',
      tempsEstime: 30,
      sections: ["Objectifs pédagogiques", "Déroulement", "Participation", "Résultats", "Améliorations possibles"]
    },
    {
      id: 4,
      nom: "Rapport Comportemental",
      description: "Suivi spécifique des comportements",
      type: 'comportement',
      tempsEstime: 25,
      sections: ["Contexte", "Observations", "Analyse", "Stratégies utilisées", "Recommandations"]
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
      hebdomadaire: rapports.filter(r => r.type === 'hebdomadaire').length,
      individuel: rapports.filter(r => r.type === 'individuel').length,
      activite: rapports.filter(r => r.type === 'activite').length,
      mensuel: rapports.filter(r => r.type === 'mensuel').length,
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'hebdomadaire': return "📅";
      case 'mensuel': return "📆";
      case 'trimestriel': return "📊";
      case 'individuel': return "👤";
      case 'activite': return "🎯";
      case 'medical': return "🏥";
      case 'comportement': return "🧠";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'hebdomadaire': return "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-blue-700";
      case 'mensuel': return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-700";
      case 'trimestriel': return "bg-purple-100 text-purple-800 dark:bg-purple-100 dark:text-purple-700";
      case 'individuel': return "bg-amber-100 text-amber-800 dark:bg-amber-100 dark:text-amber-700";
      case 'activite': return "bg-pink-100 text-pink-800 dark:bg-pink-100 dark:text-pink-700";
      case 'medical': return "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-700";
      case 'comportement': return "bg-indigo-100 text-indigo-800 dark:bg-indigo-100 dark:text-indigo-700";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
    }
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'brouillon': return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
      case 'finalise': return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-700";
      case 'envoye': return "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-blue-700";
      case 'archive': return "bg-purple-100 text-purple-800 dark:bg-purple-100 dark:text-purple-700";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'haute': return "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-700";
      case 'moyenne': return "bg-amber-100 text-amber-800 dark:bg-amber-100 dark:text-amber-700";
      case 'faible': return "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-700";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-700";
    }
  };

  const handleCreerRapport = (modele: ModeleRapport) => {
    setShowModeleModal(false);
    console.log("Création d'un rapport avec le modèle:", modele.nom);
  };

  const handleExporterRapport = (rapport: Rapport) => {
    console.log("Export du rapport:", rapport.titre);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
              Rapports et Bilans Pédagogiques
            </h1>
            <p className="text-gray-600 dark:text-gray-700 mt-1">
              Documentez, analysez et partagez le développement des enfants
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowModeleModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="size-5" />
              Nouveau rapport
            </button>
            
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-200 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-300'}`}
              >
                Liste
              </button>
              <button 
                onClick={() => setViewMode('stats')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'stats' ? 'bg-white dark:bg-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-300'}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-100 dark:to-blue-50 p-5 rounded-2xl border border-blue-200 dark:border-blue-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-700 font-medium">Total Rapports</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mt-1">{stats.totalRapports}</h3>
                </div>
                <FileIcon className="size-8 text-blue-600 dark:text-blue-700" />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-700">
                <span className="flex items-center gap-1">
                  <ArrowUpIcon className="size-4 text-green-500 dark:text-green-600" />
                  +12% ce mois
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-100 dark:to-green-50 p-5 rounded-2xl border border-green-200 dark:border-green-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-700 font-medium">Envoyés aux parents</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mt-1">{stats.envoyes}</h3>
                </div>
                <CheckCircleIcon className="size-8 text-green-600 dark:text-green-700" />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-700">
                89% des rapports mensuels envoyés
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-100 dark:to-amber-50 p-5 rounded-2xl border border-amber-200 dark:border-amber-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-700 font-medium">En préparation</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mt-1">{stats.brouillons}</h3>
                </div>
                <span className="text-2xl">✏️</span>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-700">
                À finaliser cette semaine
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-100 dark:to-purple-50 p-5 rounded-2xl border border-purple-200 dark:border-purple-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-700 font-medium">Enfants couverts</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mt-1">{stats.enfantsTotal}</h3>
                </div>
                <UserIcon className="size-8 text-purple-600 dark:text-purple-700" />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-700">
                Moyenne de 6 rapports/enfant
              </div>
            </div>
          </div>

          {/* Graphique de répartition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300 p-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
                Répartition par type de rapport
              </h3>
              <div className="space-y-4">
                {Object.entries(stats.parType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(type)}</span>
                      <span className="text-gray-700 dark:text-gray-800 capitalize">{type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 dark:bg-blue-600"
                          style={{ width: `${(count / stats.totalRapports) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-900">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300 p-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
                Calendrier des échéances
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-900">Rapports hebdomadaires</div>
                    <div className="text-sm text-gray-600 dark:text-gray-700">Tous les vendredis</div>
                  </div>
                  <CalenderIcon className="size-5 text-blue-600 dark:text-blue-700" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-900">Bilans individuels</div>
                    <div className="text-sm text-gray-600 dark:text-gray-700">Dernier jour du mois</div>
                  </div>
                  <CalenderIcon className="size-5 text-green-600 dark:text-green-700" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-900">Rapport trimestriel</div>
                    <div className="text-sm text-gray-600 dark:text-gray-700">15 Mars 2024</div>
                  </div>
                  <CalenderIcon className="size-5 text-purple-600 dark:text-purple-700" />
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
                >
                  <option value="all">Tous les types</option>
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="trimestriel">Trimestriel</option>
                  <option value="individuel">Individuel</option>
                  <option value="activite">Activité</option>
                  <option value="medical">Médical</option>
                  <option value="comportement">Comportement</option>
                </select>
                
                <select
                  value={filterStatut}
                  onChange={(e) => setFilterStatut(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
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
              <div key={rapport.id} className="bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300 p-5 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${getTypeColor(rapport.type).split(' ')[0]} text-2xl`}>
                        {getTypeIcon(rapport.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
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
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                            <CalenderIcon className="size-4" />
                            {rapport.periode}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                            <UserIcon className="size-4" />
                            {rapport.auteur}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-700">
                            <span className="text-lg">👶</span>
                            {rapport.enfantsConcernes} enfant{rapport.enfantsConcernes > 1 ? 's' : ''}
                          </div>
                        </div>
                        
                        {rapport.resume && (
                          <p className="text-gray-600 dark:text-gray-700 mb-3">
                            {rapport.resume}
                          </p>
                        )}
                        
                        {rapport.motsCles && rapport.motsCles.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {rapport.motsCles.map((mot, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 px-2 py-0.5 rounded">
                                #{mot}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {rapport.actionsRecommandees && rapport.actionsRecommandees.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-800 mb-1">
                              Actions recommandées :
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {rapport.actionsRecommandees.slice(0, 3).map((action, idx) => (
                                <span key={idx} className="text-xs bg-blue-50 dark:bg-blue-100 text-blue-700 dark:text-blue-800 px-2 py-0.5 rounded">
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
                      onClick={() => setSelectedRapport(rapport)}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <EyeIcon className="size-4" />
                      Consulter
                    </button>
                    <button 
                      onClick={() => handleExporterRapport(rapport)}
                      className="px-4 py-2 bg-gray-50 dark:bg-gray-100 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <DownloadIcon className="size-4" />
                      Télécharger
                    </button>
                    {rapport.statut === 'brouillon' && (
                      <button className="px-4 py-2 bg-green-50 dark:bg-green-100 text-green-600 dark:text-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-200 transition-colors text-sm font-medium">
                        Finaliser le rapport
                      </button>
                    )}
                    {rapport.statut === 'finalise' && (
                      <button className="px-4 py-2 bg-blue-50 dark:bg-blue-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors text-sm font-medium">
                        Envoyer aux parents
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRapports.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-white rounded-2xl border border-gray-200 dark:border-gray-300">
              <FileIcon className="size-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-600">Aucun rapport trouvé avec ces critères</p>
              <button 
                onClick={() => {setSearchTerm(""); setFilterType("all"); setFilterStatut("all");}}
                className="mt-2 text-blue-600 dark:text-blue-700 hover:underline"
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
          <div className="bg-white dark:bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900">
                  Choisir un modèle de rapport
                </h3>
                <button 
                  onClick={() => setShowModeleModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-800"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {modelesRapports.map(modele => (
                  <div key={modele.id} className="border border-gray-200 dark:border-gray-300 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-900 mb-1">
                          {modele.nom}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-700 mb-2">
                          {modele.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500 dark:text-gray-700">
                            ⏱️ {modele.tempsEstime} min
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(modele.type)}`}>
                            {modele.type}
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
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-200">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-800 mb-1">
                        Sections incluses :
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {modele.sections.map((section, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 px-2 py-0.5 rounded">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-200">
                <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-400 rounded-xl hover:border-blue-500 dark:hover:border-blue-600 transition-colors text-gray-600 dark:text-gray-700">
                  + Créer un modèle personnalisé
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Export et partage */}
      <div className="mt-8 space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-100 dark:to-pink-100 rounded-2xl border border-purple-200 dark:border-purple-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
            📤 Export et partage
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-gray-300 hover:border-blue-500 dark:hover:border-blue-600 transition-colors text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium text-gray-900 dark:text-gray-900">Exporter en PDF</div>
              <div className="text-sm text-gray-500 dark:text-gray-700 mt-1">Format professionnel</div>
            </button>
            
            <button className="p-4 bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-gray-300 hover:border-green-500 dark:hover:border-green-600 transition-colors text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-medium text-gray-900 dark:text-gray-900">Envoyer par email</div>
              <div className="text-sm text-gray-500 dark:text-gray-700 mt-1">Directement aux parents</div>
            </button>
            
            <button className="p-4 bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-gray-300 hover:border-purple-500 dark:hover:border-purple-600 transition-colors text-center">
              <div className="text-2xl mb-2">🖨️</div>
              <div className="font-medium text-gray-900 dark:text-gray-900">Imprimer</div>
              <div className="text-sm text-gray-500 dark:text-gray-700 mt-1">Version physique</div>
            </button>
          </div>
          
          {/* <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-200">
            <h4 className="font-medium text-gray-900 dark:text-gray-900 mb-3">
              Options de partage avancées
            </h4>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors">
                Partage équipe
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors">
                Version anonymisée
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors">
                Archive automatique
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Pied de page avec résumé */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-700">
              <span className="font-medium text-gray-900 dark:text-gray-900">{rapports.length} rapports</span> 
              {' '}gérés dans le système
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-1">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors text-sm">
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