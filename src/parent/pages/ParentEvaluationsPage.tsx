// src/parent/pages/Evaluations.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { CalenderIcon, AngleLeftIcon, DownloadIcon, ArrowUpIcon, ArrowDownIcon  } from "../../icons";

interface Evaluation {
  id: number;
  enfantId: number;
  type: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'specifique';
  domaine: string;
  date: string;
  educateur: string;
  note: number;
  resultat: 'excellent' | 'tres_bon' | 'bon' | 'moyen' | 'a_ameliorer';
  commentaire: string;
  competences: {
    nom: string;
    score: number;
    evolution: 'up' | 'down' | 'stable';
    commentaire: string;
  }[];
  recommandations: string[];
  pointsForts: string[];
  pointsAameliorer: string[];
  activiteAssociee?: string;
}

export default function ParentEvaluationsPage() {
  const { childId } = useParams<{ childId?: string }>();
  
  const [enfant, setEnfant] = useState<{id: number, name: string, age: string, class: string, avatar: string} | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);

  // Données des enfants
  const enfants = [
    { id: 1, name: "Ahmed Ben Salah", age: "8 ans", class: "CE2", avatar: "/images/3-4_ans/enfant_1.jpg" },
    { id: 2, name: "Sara Ben Salah", age: "6 ans", class: "CP", avatar: "/images/3-4_ans/enfant_3.jpg" },
    { id: 3, name: "Mohamed Ben Salah", age: "10 ans", class: "CM2", avatar: "/images/3-4_ans/enfant_6.jpg" },
    { id: 4, name: "Nour Ben Salah", age: "7 ans", class: "CE1", avatar: "/images/3-4_ans/enfant_4.jpg" },
  ];

  // Données des évaluations spécifiques par enfant
  const evaluations: Evaluation[] = [
    {
      id: 1,
      enfantId: 1,
      type: 'hebdomadaire',
      domaine: "Mathématiques",
      date: "12/01/2024",
      educateur: "Mme Fatma",
      note: 92,
      resultat: 'excellent',
      commentaire: "Ahmed a fait des progrès remarquables en calcul mental. Il participe activement aux exercices de logique et montre une grande curiosité mathématique.",
      competences: [
        { nom: "Calcul mental", score: 95, evolution: 'up', commentaire: "Très rapide en calcul mental, dépasse les attentes pour son âge" },
        { nom: "Résolution de problèmes", score: 90, evolution: 'up', commentaire: "Approche méthodique, propose plusieurs solutions" },
        { nom: "Géométrie", score: 88, evolution: 'stable', commentaire: "Bonne compréhension des formes et des concepts spatiaux" },
        { nom: "Logique", score: 93, evolution: 'up', commentaire: "Excellent raisonnement déductif" }
      ],
      recommandations: [
        "Continuer les exercices quotidiens de calcul mental",
        "Introduire des défis mathématiques plus complexes",
        "Encourager la participation aux clubs de mathématiques"
      ],
      pointsForts: [
        "Rapidité d'exécution",
        "Curiosité intellectuelle",
        "Persévérance face aux difficultés"
      ],
      pointsAameliorer: [
        "Présentation des travaux",
        "Vérification des calculs écrits"
      ],
      activiteAssociee: "Atelier Mathématiques Avancées"
    },
    {
      id: 2,
      enfantId: 1,
      type: 'trimestriel',
      domaine: "Langage et Communication",
      date: "05/01/2024",
      educateur: "Mme Amina",
      note: 85,
      resultat: 'bon',
      commentaire: "Bon développement du vocabulaire et de l'expression orale. Ahmed s'exprime avec plus d'aisance mais doit encore travailler la structure des phrases complexes.",
      competences: [
        { nom: "Expression orale", score: 88, evolution: 'up', commentaire: "Prises de parole plus fréquentes et structurées" },
        { nom: "Vocabulaire", score: 90, evolution: 'up', commentaire: "Vocabulaire riche et varié pour son âge" },
        { nom: "Compréhension écrite", score: 82, evolution: 'stable', commentaire: "Bonne compréhension des textes simples" },
        { nom: "Grammaire", score: 80, evolution: 'up', commentaire: "Progrès en conjugaison et accords" }
      ],
      recommandations: [
        "Lire quotidiennement des histoires variées",
        "Pratiquer l'expression orale en situations réelles",
        "Exercices de grammaire ludiques"
      ],
      pointsForts: [
        "Vocabulaire étendu",
        "Fluidité verbale",
        "Curiosité linguistique"
      ],
      pointsAameliorer: [
        "Syntaxe des phrases complexes",
        "Précision grammaticale"
      ]
    },
    {
      id: 3,
      enfantId: 1,
      type: 'mensuel',
      domaine: "Développement Social",
      date: "10/01/2024",
      educateur: "M. Karim",
      note: 88,
      resultat: 'bon',
      commentaire: "Ahmed interagit bien avec ses camarades. Il commence à prendre des initiatives dans les jeux collectifs et montre de l'empathie.",
      competences: [
        { nom: "Coopération", score: 87, evolution: 'up', commentaire: "Joue bien en équipe, partage les responsabilités" },
        { nom: "Empathie", score: 85, evolution: 'up', commentaire: "Sensible aux émotions des autres" },
        { nom: "Résolution de conflits", score: 82, evolution: 'stable', commentaire: "Apprend à gérer les désaccords verbalement" },
        { nom: "Leadership", score: 90, evolution: 'up', commentaire: "Prend naturellement des initiatives" }
      ],
      recommandations: [
        "Encourager le tutorat des plus jeunes",
        "Activités de groupe variées",
        "Développement des compétences sociales"
      ],
      pointsForts: [
        "Esprit d'équipe",
        "Leadership naturel",
        "Sensibilité aux autres"
      ],
      pointsAameliorer: [
        "Gestion de la frustration",
        "Expression des désaccords"
      ],
      activiteAssociee: "Jeux Collectifs au Parc"
    },
    {
      id: 4,
      enfantId: 1,
      type: 'specifique',
      domaine: "Motricité Fine",
      date: "03/01/2024",
      educateur: "Mme Fatma",
      note: 78,
      resultat: 'moyen',
      commentaire: "Amélioration notable en motricité fine. Ahmed montre plus de précision dans ses gestes mais nécessite encore de l'entraînement pour certaines tâches.",
      competences: [
        { nom: "Précision", score: 80, evolution: 'up', commentaire: "Meilleure coordination main-œil" },
        { nom: "Endurance", score: 76, evolution: 'up', commentaire: "Tient plus longtemps les instruments" },
        { nom: "Contrôle", score: 78, evolution: 'stable', commentaire: "Gestes plus fluides et contrôlés" }
      ],
      recommandations: [
        "Exercices de découpage quotidiens",
        "Jeux de construction fins",
        "Activités de modelage"
      ],
      pointsForts: [
        "Persévérance",
        "Amélioration constante",
        "Volonté d'apprendre"
      ],
      pointsAameliorer: [
        "Vitesse d'exécution",
        "Précision sous contrainte de temps"
      ],
      activiteAssociee: "Atelier Peinture Libre"
    }
  ];

  useEffect(() => {
    if (childId) {
      const enfantData = enfants.find(e => e.id.toString() === childId);
      if (enfantData) {
        setEnfant(enfantData);
      }
    }
  }, [childId]);

  const filteredEvaluations = evaluations.filter(evaluation => {
    if (childId && evaluation.enfantId.toString() !== childId) return false;
    if (filterType !== "all" && evaluation.type !== filterType) return false;
    return true;
  });

  const getResultColor = (resultat: string) => {
    switch(resultat) {
      case 'excellent': return "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800";
      case 'tres_bon': return "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case 'bon': return "bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case 'moyen': return "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case 'a_ameliorer': return "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getResultLabel = (resultat: string) => {
    switch(resultat) {
      case 'excellent': return "⭐ Excellent";
      case 'tres_bon': return "👍 Très bon";
      case 'bon': return "✅ Bon";
      case 'moyen': return "⚪ Moyen";
      case 'a_ameliorer': return "⚠️ À améliorer";
      default: return resultat;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'hebdomadaire': return "📅";
      case 'mensuel': return "📊";
      case 'trimestriel': return "📈";
      case 'specifique': return "🎯";
      default: return "📄";
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'hebdomadaire': return "Hebdomadaire";
      case 'mensuel': return "Mensuel";
      case 'trimestriel': return "Trimestriel";
      case 'specifique': return "Spécifique";
      default: return type;
    }
  };

  const getNoteColor = (note: number) => {
    if (note >= 90) return "text-green-600 dark:text-green-400";
    if (note >= 80) return "text-blue-600 dark:text-blue-400";
    if (note >= 70) return "text-amber-600 dark:text-amber-400";
    if (note >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const stats = {
    moyenneGenerale: evaluations.reduce((sum, e) => sum + e.note, 0) / evaluations.length,
    meilleurDomaine: evaluations.reduce((best, current) => 
      current.note > best.note ? current : best
    ).domaine,
    pireDomaine: evaluations.reduce((worst, current) => 
      current.note < worst.note ? current : worst
    ).domaine,
    progression: "+8.5%",
    evaluationsTotal: evaluations.length
  };

  const handleDownload = (evaluation: Evaluation) => {
    const content = `
ÉVALUATION PÉDAGOGIQUE
======================
Enfant: ${enfant?.name}
Type: ${getTypeLabel(evaluation.type)}
Domaine: ${evaluation.domaine}
Date: ${evaluation.date}
Éducateur: ${evaluation.educateur}
Note globale: ${evaluation.note}/100
Résultat: ${getResultLabel(evaluation.resultat).replace(/[⭐👍✅⚪⚠️]/g, '').trim()}

COMMENTAIRE DE L'ÉDUCATEUR
--------------------------
${evaluation.commentaire}

COMPÉTENCES ÉVALUÉES
--------------------
${evaluation.competences.map(c => 
  `${c.nom}: ${c.score}/100 ${c.evolution === 'up' ? '↗' : c.evolution === 'down' ? '↘' : '→'} - ${c.commentaire}`
).join('\n')}

POINTS FORTS
------------
${evaluation.pointsForts.map(p => `• ${p}`).join('\n')}

POINTS À AMÉLIORER
------------------
${evaluation.pointsAameliorer.map(p => `• ${p}`).join('\n')}

RECOMMANDATIONS
---------------
${evaluation.recommandations.map(r => `• ${r}`).join('\n')}

${evaluation.activiteAssociee ? `Activité associée: ${evaluation.activiteAssociee}` : ''}

© École Maternelle - ${new Date().getFullYear()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Evaluation_${enfant?.name.replace(/\s+/g, '_')}_${evaluation.domaine}_${evaluation.date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!enfant) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`Évaluations de ${enfant.name}`}
        description={`Suivez les évaluations de ${enfant.name}`}
      />

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Link 
                to="/parent/enfants" 
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <AngleLeftIcon className="size-4" />
                Retour aux enfants
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src={enfant.avatar} 
                alt={enfant.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Évaluations de {enfant.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {enfant.age} • {enfant.class} • {evaluations.length} évaluations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Moyenne générale</p>
              <h3 className={`text-2xl font-bold mt-1 ${getNoteColor(stats.moyenneGenerale)}`}>
                {Math.round(stats.moyenneGenerale)}/100
              </h3>
            </div>
            <div className="text-2xl">📊</div>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
            <ArrowUpIcon className="size-4 inline mr-1" />
            {stats.progression} ce trimestre
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Meilleur domaine</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {stats.meilleurDomaine}
              </h3>
            </div>
            <div className="text-2xl text-green-500">🏆</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            95/100 moyenne
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">À renforcer</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {stats.pireDomaine}
              </h3>
            </div>
            <div className="text-2xl text-amber-500">📈</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Objectif : +15% ce mois
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total évaluations</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.evaluationsTotal}
              </h3>
            </div>
            <div className="text-2xl text-purple-500">📝</div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tous les types d'évaluation</option>
          <option value="hebdomadaire">Hebdomadaires</option>
          <option value="mensuel">Mensuelles</option>
          <option value="trimestriel">Trimestrielles</option>
          <option value="specifique">Spécifiques</option>
        </select>
      </div>

      {/* Liste des évaluations */}
      <div className="space-y-4">
        {filteredEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{getTypeIcon(evaluation.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {evaluation.domaine}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {evaluation.date} • {evaluation.educateur}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(evaluation.resultat)}`}>
                          {getResultLabel(evaluation.resultat)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`text-2xl font-bold ${getNoteColor(evaluation.note)}`}>
                  {evaluation.note}/100
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {evaluation.commentaire}
              </p>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Compétences évaluées :
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evaluation.competences.map((competence, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {competence.nom}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {competence.score}/100
                          </span>
                          {competence.evolution === 'up' ? (
                            <ArrowUpIcon className="size-4 text-green-500" />
                          ) : competence.evolution === 'down' ? (
                            <ArrowDownIcon  className="size-4 text-red-500" />
                          ) : (
                            <span className="text-gray-400">→</span>
                          )}
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            competence.score >= 80 ? 'bg-green-500' :
                            competence.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          } rounded-full`}
                          style={{ width: `${competence.score}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {competence.commentaire}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Points forts :
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.pointsForts.map((point, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recommandations :
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.recommandations.map((reco, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                        {reco}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Type : {getTypeLabel(evaluation.type)}
                  {evaluation.activiteAssociee && ` • Activité : ${evaluation.activiteAssociee}`}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvaluation(evaluation)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Détails complets
                  </button>
                  <button
                    onClick={() => handleDownload(evaluation)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium flex items-center gap-2"
                  >
                    <DownloadIcon className="size-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune évaluation trouvée pour {enfant.name}
          </p>
        </div>
      )}

      {/* Modal de détails d'évaluation */}
      {selectedEvaluation && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setSelectedEvaluation(null)} />
          <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedEvaluation.domaine}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedEvaluation.date} • {selectedEvaluation.educateur}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(selectedEvaluation)}
                    className="px-3 py-1.5 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center gap-1"
                  >
                    <DownloadIcon className="size-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => setSelectedEvaluation(null)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* En-tête */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Évaluation détaillée
                  </h4>
                  <div className="flex items-center justify-center gap-4">
                    <span className={`px-4 py-2 rounded-full font-medium ${getResultColor(selectedEvaluation.resultat)}`}>
                      {getResultLabel(selectedEvaluation.resultat)}
                    </span>
                    <span className={`text-3xl font-bold ${getNoteColor(selectedEvaluation.note)}`}>
                      {selectedEvaluation.note}/100
                    </span>
                  </div>
                </div>

                {/* Commentaire */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">📝 Commentaire de l'éducateur</h5>
                  <p className="text-gray-700 dark:text-gray-300">{selectedEvaluation.commentaire}</p>
                </div>

                {/* Compétences */}
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-4">📊 Compétences évaluées</h5>
                  <div className="space-y-3">
                    {selectedEvaluation.competences.map((competence, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{competence.nom}</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getNoteColor(competence.score)}`}>
                              {competence.score}/100
                            </span>
                            {competence.evolution === 'up' ? (
                              <span className="text-green-500">↗ +{Math.floor(Math.random() * 10) + 5}%</span>
                            ) : competence.evolution === 'down' ? (
                              <span className="text-red-500">↘ -{Math.floor(Math.random() * 5) + 1}%</span>
                            ) : (
                              <span className="text-gray-500">→ stable</span>
                            )}
                          </div>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                          <div 
                            className={`h-full ${
                              competence.score >= 80 ? 'bg-green-500' :
                              competence.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            } rounded-full`}
                            style={{ width: `${competence.score}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{competence.commentaire}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points forts et à améliorer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-xl">⭐</span>
                      Points forts
                    </h5>
                    <ul className="space-y-2">
                      {selectedEvaluation.pointsForts.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-xl">📈</span>
                      Points à améliorer
                    </h5>
                    <ul className="space-y-2">
                      {selectedEvaluation.pointsAameliorer.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">→</span>
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommandations */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    Recommandations pour la maison
                  </h5>
                  <div className="space-y-2">
                    {selectedEvaluation.recommandations.map((reco, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{reco}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">ℹ️ Informations</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Type d'évaluation</div>
                      <div className="font-medium text-gray-900 dark:text-white">{getTypeLabel(selectedEvaluation.type)}</div>
                    </div>
                    {selectedEvaluation.activiteAssociee && (
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">Activité associée</div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedEvaluation.activiteAssociee}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Éducateur référent</div>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedEvaluation.educateur}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Date de l'évaluation</div>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedEvaluation.date}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}