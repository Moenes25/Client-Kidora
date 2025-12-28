// src/parent/pages/Reports.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { DownloadIcon, EyeIcon, CalenderIcon, AngleLeftIcon } from "../../icons";

interface Competence {
  nom: string;
  niveau: number;
}

interface Rapport {
  id: number;
  enfant: string;
  type: 'quotidien' | 'hebdomadaire' | 'trimestriel' | 'special';
  titre: string;
  date: string;
  educateur: string;
  statut: 'nouveau' | 'lu' | 'archive';
  resume: string;
  pointsForts: string[];
  recommandations: string[];
  competences: Competence[];
}

export default function ParentReportsPage() {
  const { childId } = useParams<{ childId?: string }>();
  const navigate = useNavigate();
  
  const [selectedChild, setSelectedChild] = useState<string>("Tous les enfants");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRapport, setSelectedRapport] = useState<Rapport | null>(null);

  // Données des enfants
  const enfants = [
    { id: 1, name: "Ahmed Ben Salah", avatar: "/images/3-4_ans/enfant_1.jpg" },
    { id: 2, name: "Sara Ben Salah", avatar: "/images/3-4_ans/enfant_3.jpg" },
    { id: 3, name: "Mohamed Ben Salah", avatar: "/images/3-4_ans/enfant_6.jpg" },
    { id: 4, name: "Nour Ben Salah", avatar: "/images/3-4_ans/enfant_4.jpg" },
  ];

  // Données des rapports - MODIFIÉ avec les bons types
  const rapports: Rapport[] = [
    {
      id: 1,
      enfant: "Ahmed Ben Salah",
      type: 'hebdomadaire',
      titre: "Progrès en Mathématiques et Socialisation",
      date: "12/01/2024",
      educateur: "Mme Fatma",
      statut: 'nouveau',
      resume: "Excellent progrès cette semaine en mathématiques. Ahmed montre une grande curiosité et participe activement aux activités de groupe.",
      pointsForts: ["Calcul mental", "Travail d'équipe", "Curiosité"],
      recommandations: ["Continuer les exercices de logique", "Encourager le tutorat des plus jeunes"],
      competences: [
        { nom: "Mathématiques", niveau: 92 },
        { nom: "Socialisation", niveau: 88 },
        { nom: "Langage", niveau: 85 }
      ]
    },
    {
      id: 2,
      enfant: "Sara Ben Salah",
      type: 'quotidien',
      titre: "Bilan de la Journée - Participation Active",
      date: "10/01/2024",
      educateur: "Mme Amina",
      statut: 'lu',
      resume: "Journée productive pour Sara. Excellente participation aux activités et bonnes interactions sociales.",
      pointsForts: ["Participation", "Créativité", "Empathie"],
      recommandations: ["Encourager l'expression orale", "Activités de groupe"],
      competences: [
        { nom: "Participation", niveau: 95 },
        { nom: "Créativité", niveau: 90 },
        { nom: "Motricité fine", niveau: 87 }
      ]
    },
    {
      id: 3,
      enfant: "Mohamed Ben Salah",
      type: 'trimestriel',
      titre: "Évaluation Trimestrielle Complète",
      date: "05/01/2024",
      educateur: "M. Karim",
      statut: 'lu',
      resume: "Développement harmonieux dans tous les domaines. Excellente progression en sciences et sport.",
      pointsForts: ["Sciences", "Sport", "Leadership"],
      recommandations: ["Activités scientifiques supplémentaires", "Encadrement d'activités sportives"],
      competences: [
        { nom: "Sciences", niveau: 89 },
        { nom: "Sport", niveau: 94 },
        { nom: "Leadership", niveau: 82 }
      ]
    },
    {
      id: 4,
      enfant: "Nour Ben Salah",
      type: 'quotidien',
      titre: "Suivi Motricité Fine",
      date: "03/01/2024",
      educateur: "Mme Amina",
      statut: 'nouveau',
      resume: "Amélioration significative en motricité fine. Nour montre plus de précision dans ses gestes.",
      pointsForts: ["Persévérance", "Concentration", "Précision"],
      recommandations: ["Exercices de découpage", "Jeux de construction fins"],
      competences: [
        { nom: "Motricité fine", niveau: 78 },
        { nom: "Concentration", niveau: 85 },
        { nom: "Patience", niveau: 80 }
      ]
    },
    {
      id: 5,
      enfant: "Ahmed Ben Salah",
      type: 'quotidien',
      titre: "Suivi Langue Française",
      date: "05/01/2024",
      educateur: "Mme Fatma",
      statut: 'archive',
      resume: "Bon progrès en vocabulaire. Doit travailler la conjugaison des verbes.",
      pointsForts: ["Vocabulaire", "Expression orale"],
      recommandations: ["Lire quotidiennement", "Exercices de conjugaison"],
      competences: [
        { nom: "Vocabulaire", niveau: 88 },
        { nom: "Conjugaison", niveau: 75 },
        { nom: "Compréhension", niveau: 82 }
      ]
    },
    {
      id: 6,
      enfant: "Sara Ben Salah",
      type: 'trimestriel',
      titre: "Bilan Trimestriel Développement Global",
      date: "15/12/2023",
      educateur: "Mme Amina",
      statut: 'lu',
      resume: "Progression remarquable dans tous les domaines. Sara montre une grande maturité.",
      pointsForts: ["Lecture", "Raisonnement", "Autonomie"],
      recommandations: ["Livres plus complexes", "Projets personnels"],
      competences: [
        { nom: "Lecture", niveau: 96 },
        { nom: "Raisonnement", niveau: 92 },
        { nom: "Autonomie", niveau: 89 }
      ]
    },
    {
      id: 7,
      enfant: "Mohamed Ben Salah",
      type: 'hebdomadaire',
      titre: "Rapport Hebdomadaire - Activités Physiques",
      date: "08/01/2024",
      educateur: "M. Karim",
      statut: 'lu',
      resume: "Bonne semaine d'activités physiques. Mohamed montre de l'endurance et du leadership.",
      pointsForts: ["Endurance", "Coordination", "Esprit d'équipe"],
      recommandations: ["Sports collectifs", "Entraînements réguliers"],
      competences: [
        { nom: "Endurance", niveau: 91 },
        { nom: "Coordination", niveau: 88 },
        { nom: "Esprit d'équipe", niveau: 85 }
      ]
    }
  ];

  // Lorsque childId change, sélectionner automatiquement l'enfant
  useEffect(() => {
    if (childId) {
      const enfant = enfants.find(e => e.id.toString() === childId);
      if (enfant) {
        setSelectedChild(enfant.name);
      }
    } else {
      setSelectedChild("Tous les enfants");
    }
  }, [childId]);

  // Filtrer les rapports selon l'enfant sélectionné
  const filteredRapports = rapports.filter(rapport => {
    // Si on est sur une page enfant spécifique (avec childId), filtrer uniquement cet enfant
    if (childId && selectedChild !== "Tous les enfants") {
      if (rapport.enfant !== selectedChild) return false;
    } else if (selectedChild !== "Tous les enfants") {
      // Sinon, utiliser le filtre manuel
      if (rapport.enfant !== selectedChild) return false;
    }
    
    if (filterType !== "all" && rapport.type !== filterType) return false;
    return true;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'quotidien': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'hebdomadaire': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'trimestriel': return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case 'special': return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'quotidien': return "Quotidien";
      case 'hebdomadaire': return "Hebdomadaire";
      case 'trimestriel': return "Trimestriel";
      case 'special': return "Spécial";
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'quotidien': return "📅👤";
      case 'hebdomadaire': return "📊👤";
      case 'trimestriel': return "📈👤";
      case 'special': return "⭐👤";
      default: return "📄👤";
    }
  };

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'nouveau': return (
        <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs rounded-full">
          Nouveau
        </span>
      );
      case 'lu': return (
        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
          Lu
        </span>
      );
      case 'archive': return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 text-xs rounded-full">
          Archivé
        </span>
      );
    }
  };

  const handleDownload = (rapport: Rapport) => {
    const content = `
RAPPORT PÉDAGOGIQUE
===================
Enfant: ${rapport.enfant}
Type: ${getTypeLabel(rapport.type)}
Date: ${rapport.date}
Éducateur: ${rapport.educateur}

RÉSUMÉ
------
${rapport.resume}

POINTS FORTS
------------
${rapport.pointsForts.map(p => `• ${p}`).join('\n')}

RECOMMANDATIONS
---------------
${rapport.recommandations.map(r => `• ${r}`).join('\n')}

COMPÉTENCES ÉVALUÉES
--------------------
${rapport.competences.map(c => `${c.nom}: ${c.niveau}%`).join('\n')}

© École Maternelle - ${new Date().getFullYear()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapport_${rapport.enfant.replace(/\s+/g, '_')}_${rapport.date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Trouver l'enfant actuel pour afficher ses informations
  const currentChild = enfants.find(e => childId && e.id.toString() === childId);

  // Statistiques pour l'enfant courant ou tous
  const stats = {
    total: filteredRapports.length,
    nonLus: filteredRapports.filter(r => r.statut === 'nouveau').length,
    parType: {
      quotidien: filteredRapports.filter(r => r.type === 'quotidien').length,
      hebdomadaire: filteredRapports.filter(r => r.type === 'hebdomadaire').length,
      trimestriel: filteredRapports.filter(r => r.type === 'trimestriel').length,
      special: filteredRapports.filter(r => r.type === 'special').length,
    }
  };

  return (
    <>
      <PageMeta
        title={currentChild ? `Rapports - ${currentChild.name}` : "Rapports Pédagogiques | Espace Parent"}
        description="Consultez les rapports détaillés sur le développement de vos enfants"
      />

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {childId && (
              <div className="flex items-center gap-3 mb-3">
                <Link 
                  to="/parent/enfants" 
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <AngleLeftIcon className="size-4" />
                  Retour aux enfants
                </Link>
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentChild 
                ? `Rapports de ${currentChild.name}`
                : "Rapports Pédagogiques"
              }
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {currentChild 
                ? `Suivez le développement de ${currentChild.name.split(" ")[0]} grâce aux rapports détaillés`
                : "Suivez le développement de vos enfants grâce aux rapports détaillés des éducateurs"
              }
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                Grille
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                Liste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Rapports</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</h3>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Non lus</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.nonLus}</h3>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-lg">
              <span className="text-red-600 dark:text-red-400 text-xl">🆕</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Quotidiens</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.parType.quotidien}
              </h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
              <span className="text-green-600 dark:text-green-400 text-xl">📅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Trimestriels</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.parType.trimestriel}
              </h3>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
              <span className="text-purple-600 dark:text-purple-400 text-xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres - seulement si on n'est pas sur une page enfant spécifique */}
      {!childId && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher dans les rapports..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Tous les enfants">Tous les enfants</option>
                {enfants.map((enfant) => (
                  <option key={enfant.id} value={enfant.name}>{enfant.name}</option>
                ))}
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les types</option>
                <option value="quotidien">Quotidien</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="trimestriel">Trimestriel</option>
                <option value="special">Spécial</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Liste des rapports */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRapports.map((rapport) => (
            <div key={rapport.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(rapport.type)}`}>
                      {getTypeLabel(rapport.type)}
                    </span>
                    {getStatutBadge(rapport.statut)}
                  </div>
                  <button
                    onClick={() => handleDownload(rapport)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <DownloadIcon className="size-5" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {rapport.titre}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <CalenderIcon className="size-4" />
                    {rapport.date}
                  </div>
                  {!childId && (
                    <div className="flex items-center gap-1">
                      <span className="text-lg">👶</span>
                      {rapport.enfant.split(" ")[0]}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {rapport.resume}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Points forts :
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rapport.pointsForts.slice(0, 3).map((point, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Compétences :
                    </div>
                    <div className="space-y-1">
                      {rapport.competences.slice(0, 2).map((competence, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between mb-1">
                            <span>{competence.nom}</span>
                            <span>{competence.niveau}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${competence.niveau}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Éducateur : {rapport.educateur}
                    </div>
                    <button
                      onClick={() => setSelectedRapport(rapport)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                    >
                      <EyeIcon className="size-4" />
                      Consulter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRapports.map((rapport) => (
            <div key={rapport.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(rapport.type)}`}>
                      {getTypeLabel(rapport.type)}
                    </span>
                    {getStatutBadge(rapport.statut)}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {rapport.titre}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <CalenderIcon className="size-4" />
                      {rapport.date}
                    </div>
                    {!childId && (
                      <div className="flex items-center gap-1">
                        <span className="text-lg">👶</span>
                        {rapport.enfant}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-lg">👩‍🏫</span>
                      {rapport.educateur}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {rapport.resume}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rapport.pointsForts.map((point, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {rapport.competences.map((competence, idx) => (
                      <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {competence.nom}
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {competence.niveau}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <button
                    onClick={() => setSelectedRapport(rapport)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="size-4" />
                    Consulter le rapport
                  </button>
                  <button
                    onClick={() => handleDownload(rapport)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="size-4" />
                    Télécharger
                  </button>
                  <button 
                    onClick={() => {
                      // Marquer comme lu
                      console.log(`Marquer le rapport ${rapport.id} comme lu`);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Confirmer lecture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredRapports.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-gray-500 dark:text-gray-400">
            {currentChild 
              ? `Aucun rapport trouvé pour ${currentChild.name}`
              : "Aucun rapport trouvé avec ces critères"
            }
          </p>
          {childId && (
            <button 
              onClick={() => navigate('/parent/enfants')}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Retour à la liste des enfants
            </button>
          )}
        </div>
      )}

      {/* Modal de consultation */}
      {selectedRapport && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setSelectedRapport(null)} />
          <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-5xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getTypeColor(selectedRapport.type)}`}>
                    <span className="text-2xl">
                      {getTypeIcon(selectedRapport.type)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Rapport {getTypeLabel(selectedRapport.type)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pour les parents • {selectedRapport.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(selectedRapport)}
                    className="px-3 py-1.5 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center gap-1"
                  >
                    <DownloadIcon className="size-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => setSelectedRapport(null)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <CalenderIcon className="size-4" />
                      {selectedRapport.date}
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <span className="text-lg">👩‍🏫</span>
                      Éducateur: {selectedRapport.educateur}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedRapport.type)}`}>
                      {getTypeLabel(selectedRapport.type)}
                    </div>
                  </div>
                </div>

                {/* Message personnalisé aux parents */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
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
                      Voici un rapport détaillé sur le développement et les progrès de {selectedRapport.enfant.split(" ")[0]} pendant cette période. 
                      Nous souhaitons partager avec vous les observations positives, les compétences acquises et les domaines 
                      où nous continuons à travailler ensemble pour soutenir sa croissance.
                    </p>
                  </div>
                </div>

                {/* Résumé exécutif */}
                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    Résumé Exécutif
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedRapport.resume}
                  </p>
                </div>

                {/* Tableau de développement */}
                <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Tableau de Développement
                  </h4>
                  <div className="space-y-4">
                    {selectedRapport.competences.map((competence, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{competence.nom}</span>
                          <span className={`font-medium ${
                            competence.niveau >= 90 ? 'text-green-600 dark:text-green-400' :
                            competence.niveau >= 80 ? 'text-blue-600 dark:text-blue-400' :
                            competence.niveau >= 70 ? 'text-amber-600 dark:text-amber-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {competence.niveau >= 90 ? 'Excellent' :
                             competence.niveau >= 80 ? 'Très bon' :
                             competence.niveau >= 70 ? 'Bon' : 'À améliorer'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-full rounded-full ${
                              competence.niveau >= 90 ? 'bg-green-500' :
                              competence.niveau >= 80 ? 'bg-blue-500' :
                              competence.niveau >= 70 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${competence.niveau}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Progression: {competence.niveau >= 80 ? 'Rythme excellent' :
                          competence.niveau >= 70 ? 'Progression régulière' :
                          'Nécessite un accompagnement renforcé'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points forts identifiés */}
                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    Points Forts Identifiés
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedRapport.pointsForts.map((point, idx) => (
                      <div key={idx} className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            idx === 0 ? 'bg-green-500' :
                            idx === 1 ? 'bg-blue-500' :
                            idx === 2 ? 'bg-purple-500' : 'bg-amber-500'
                          }`}></div>
                          <span className="font-medium text-gray-800 dark:text-gray-300">Point fort {idx + 1}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moments forts */}
                <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    Moments Forts de la Période
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800 dark:text-gray-300">Succès académique</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Excellente participation aux activités de groupe et progrès significatifs dans les apprentissages
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-800 dark:text-gray-300">Progrès social</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Interactions positives avec les camarades et développement de l'empathie
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-gray-800 dark:text-gray-300">Créativité</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expression artistique développée et imagination fertile
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="font-medium text-gray-800 dark:text-gray-300">Autonomie</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prise d'initiatives et développement de l'indépendance dans les tâches quotidiennes
                      </p>
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
                      {selectedRapport.recommandations.map((reco, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            idx === 0 ? 'bg-purple-100 dark:bg-purple-800' :
                            idx === 1 ? 'bg-blue-100 dark:bg-blue-800' :
                            'bg-green-100 dark:bg-green-800'
                          }`}>
                            <span className={`text-xl ${
                              idx === 0 ? 'text-purple-600 dark:text-purple-300' :
                              idx === 1 ? 'text-blue-600 dark:text-blue-300' :
                              'text-green-600 dark:text-green-300'
                            }`}>
                              {idx === 0 ? '📚' : idx === 1 ? '🎮' : '🗣️'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-300">
                              {idx === 0 ? 'Lecture quotidienne' : 
                               idx === 1 ? 'Jeux éducatifs' : 
                               'Dialoguer sur les émotions'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {reco}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activités préférées */}
                <div className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">❤️</span>
                    Domaines d'Intérêt
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      Activités créatives
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      Jeux de construction
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      Histoires et contes
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      Activités en extérieur
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      Musique et danse
                    </span>
                  </div>
                </div>

                {/* Signature et contacts */}
                <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-lg">📞</span>
                        Contact
                      </h5>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>Éducateur/Éducatrice: 
                          <span className="font-medium text-gray-900 dark:text-white ml-2">
                            {selectedRapport.educateur}
                          </span>
                        </p>
                        <p>Disponible pour échanger: Lundi et jeudi de 16h30 à 17h30</p>
                        <p>Email: educateur@ecole-exemple.fr</p>
                        <p>Téléphone: 01 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-block border-t border-gray-300 dark:border-gray-600 pt-4">
                        <p className="font-medium text-gray-900 dark:text-white">{selectedRapport.educateur}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Éducateur/Éducatrice référent(e)</p>
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

              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Rapport #{selectedRapport.id} • Enfant: {selectedRapport.enfant}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRapport(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      // Marquer comme lu
                      setSelectedRapport(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700"
                  >
                    Confirmer la lecture
                  </button>
                  <button
                    onClick={() => handleDownload(selectedRapport)}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
                  >
                    <DownloadIcon className="size-4" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}