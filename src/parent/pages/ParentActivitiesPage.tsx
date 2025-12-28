// src/parent/pages/Activities.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { CalenderIcon, AngleLeftIcon, EyeIcon } from "../../icons";

interface ActiviteEnfant {
  id: number;
  titre: string;
  description: string;
  type: 'creatif' | 'sportif' | 'educatif' | 'musical' | 'nature' | 'social';
  date: string;
  heure: string;
  duree: number;
  classe: string;
  educateur: string;
  materiel: string[];
  objectifs: string[];
  observation?: string;
  evaluation?: EvaluationActivite
}

interface EvaluationActivite {
  participation: 'excellente' | 'bonne' | 'moyenne' | 'faible';
  observations: string;
  competencesAcquises: string[];
  note: number;
}

export default function ParentActivitiesPage() {
  const { childId } = useParams<{ childId?: string }>();
  
  const [enfant, setEnfant] = useState<{id: number, name: string, age: string, class: string, avatar: string} | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedActivite, setSelectedActivite] = useState<ActiviteEnfant | null>(null);

  // Données des enfants
  const enfants = [
    { id: 1, name: "Ahmed Ben Salah", age: "8 ans", class: "CE2", avatar: "/images/3-4_ans/enfant_1.jpg" },
    { id: 2, name: "Sara Ben Salah", age: "6 ans", class: "CP", avatar: "/images/3-4_ans/enfant_3.jpg" },
    { id: 3, name: "Mohamed Ben Salah", age: "10 ans", class: "CM2", avatar: "/images/3-4_ans/enfant_6.jpg" },
    { id: 4, name: "Nour Ben Salah", age: "7 ans", class: "CE1", avatar: "/images/3-4_ans/enfant_4.jpg" },
  ];

  // Données des activités avec évaluations spécifiques par enfant
  const activites: ActiviteEnfant[] = [
    {
      id: 1,
      titre: "Atelier Peinture Libre",
      description: "Expression artistique libre avec différentes techniques de peinture",
      type: 'creatif',
      date: "2024-01-15",
      heure: "09:30",
      duree: 90,
      classe: "(3-4) ans",
      educateur: "Mme Fatma",
      materiel: ["Peinture", "Pinceaux", "Toiles", "Tabliers"],
      objectifs: ["Développer la créativité", "Coordination main-œil", "Expression des émotions"],
      observation: "Les enfants étaient très enthousiastes",
      evaluation: {
        participation: 'excellente',
        observations: "Ahmed a créé une œuvre remarquable avec des couleurs vives et harmonieuses. A montré une grande concentration.",
        competencesAcquises: ["Technique de mélange des couleurs", "Précision du geste", "Expression créative"],
        note: 5
      }
    },
    {
      id: 2,
      titre: "Jeux Collectifs au Parc",
      description: "Activités sportives et jeux d'équipe pour développer la coopération",
      type: 'sportif',
      date: "2024-01-16",
      heure: "10:00",
      duree: 120,
      classe: "(6-7) ans",
      educateur: "M. Karim",
      materiel: ["Ballons", "Cônes"],
      objectifs: ["Travail d'équipe", "Motricité globale", "Respect des règles"],
      evaluation: {
        participation: 'bonne',
        observations: "Ahmed a été un bon leader d'équipe. A encouragé ses camarades et respecté les règles du jeu.",
        competencesAcquises: ["Leadership", "Esprit d'équipe", "Coordination"],
        note: 4
      }
    },
    {
      id: 3,
      titre: "Découverte des Instruments",
      description: "Initiation aux différents instruments de musique",
      type: 'musical',
      date: "2024-01-15",
      heure: "14:00",
      duree: 60,
      classe: "(4-5) ans",
      educateur: "Mme Amina",
      materiel: ["Tambourins", "Maracas", "Xylophone"],
      objectifs: ["Sensibilisation musicale", "Rythme", "Écoute active"],
      evaluation: {
        participation: 'moyenne',
        observations: "Intéressé mais timide. A préféré observer avant de participer.",
        competencesAcquises: ["Reconnaissance des sons", "Respect du rythme"],
        note: 3
      }
    },
    {
      id: 4,
      titre: "Jardinage Éducatif",
      description: "Planter et observer la croissance des plantes",
      type: 'nature',
      date: "2024-01-17",
      heure: "11:00",
      duree: 75,
      classe: "Toutes classes",
      educateur: "Mme Fatma",
      materiel: ["Graines", "Pots", "Terre", "Arrosoirs"],
      objectifs: ["Patience", "Responsabilité", "Cycle de vie des plantes"],
      evaluation: {
        participation: 'excellente',
        observations: "Très curieux et attentif. A posé des questions pertinentes sur la croissance des plantes.",
        competencesAcquises: ["Soin des plantes", "Observation scientifique", "Patience"],
        note: 5
      }
    },
    {
      id: 5,
      titre: "Expériences Scientifiques Simples",
      description: "Découverte des sciences par l'expérimentation",
      type: 'educatif',
      date: "2024-01-14",
      heure: "13:30",
      duree: 80,
      classe: "(8-9) ans",
      educateur: "M. Karim",
      materiel: ["Loupes", "Éprouvettes", "Colorants"],
      objectifs: ["Curiosité scientifique", "Observation", "Hypothèses"],
      evaluation: {
        participation: 'bonne',
        observations: "Ahmed a montré un grand intérêt pour les expériences. A formulé des hypothèses intéressantes.",
        competencesAcquises: ["Méthode scientifique", "Observation", "Curiosité"],
        note: 4
      }
    },
    {
      id: 6,
      titre: "Atelier Conte et Imagination",
      description: "Création d'histoires et développement du langage",
      type: 'social',
      date: "2024-01-18",
      heure: "10:30",
      duree: 45,
      classe: "(3-4) ans",
      educateur: "Mme Amina",
      materiel: ["Livres", "Marionnettes", "Accessoires"],
      objectifs: ["Développement du langage", "Imagination", "Écoute"],
      evaluation: {
        participation: 'faible',
        observations: "Un peu timide pour s'exprimer devant le groupe. Écoute attentive.",
        competencesAcquises: ["Écoute active", "Compréhension des histoires"],
        note: 2
      }
    },
  ];

  useEffect(() => {
    if (childId) {
      const enfantData = enfants.find(e => e.id.toString() === childId);
      if (enfantData) {
        setEnfant(enfantData);
      }
    }
  }, [childId]);

  const filteredActivites = activites.filter(activite => {
    if (filterType !== "all" && activite.type !== filterType) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'creatif': return "🎨";
      case 'sportif': return "⚽";
      case 'educatif': return "📚";
      case 'musical': return "🎵";
      case 'nature': return "🌱";
      case 'social': return "👥";
      default: return "⭐";
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'creatif': return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case 'sportif': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'educatif': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'musical': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'nature': return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case 'social': return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getParticipationColor = (participation: string) => {
    switch(participation) {
      case 'excellente': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'bonne': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'moyenne': return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'faible': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getParticipationLabel = (participation: string) => {
    switch(participation) {
      case 'excellente': return "⭐ Excellente";
      case 'bonne': return "👍 Bonne";
      case 'moyenne': return "⚪ Moyenne";
      case 'faible': return "⚠️ Faible";
      default: return participation;
    }
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
        title={`Activités de ${enfant.name}`}
        description={`Suivez les activités de ${enfant.name} à l'école`}
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
                  Activités de {enfant.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {enfant.age} • {enfant.class} • {filteredActivites.length} activités
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredActivites.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">Total activités</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredActivites.filter(a => a.evaluation?.participation === 'excellente').length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">⭐ Excellentes</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredActivites.filter(a => a.evaluation?.note >= 4).length}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400 mt-1">Notes ≥ 4/5</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Set(filteredActivites.map(a => a.type)).size}
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">Types d'activités</div>
          </div>
        </div>
      </div> */}

       <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredActivites.filter(a => a.evaluation && a.evaluation.note >= 4).length}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400 mt-1">Notes ≥ 4/5</div>
        </div>
        </div>
      {/* Filtres */}
      <div className="mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tous les types d'activités</option>
          <option value="creatif">Créatif</option>
          <option value="sportif">Sportif</option>
          <option value="educatif">Éducatif</option>
          <option value="musical">Musical</option>
          <option value="nature">Nature</option>
          <option value="social">Social</option>
        </select>
      </div>

      {/* Liste des activités */}
      <div className="space-y-4">
        {filteredActivites.map((activite) => (
          <div key={activite.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getTypeColor(activite.type)} text-xl`}>
                    {getTypeIcon(activite.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {activite.titre}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(activite.date).toLocaleDateString('fr-FR')} • {activite.heure}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activite.type)}`}>
                        {activite.type.charAt(0).toUpperCase() + activite.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {activite.evaluation && (
                  <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getParticipationColor(activite.evaluation.participation)}`}>
                                {getParticipationLabel(activite.evaluation.participation)}
                                </span>
                                <span className="text-lg text-yellow-500">
                                {'★'.repeat(activite.evaluation.note)}
                                <span className="text-gray-300 dark:text-gray-600">
                                    {'★'.repeat(5 - activite.evaluation.note)}
                                </span>
                                </span>
                            </div>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {activite.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Informations :
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <CalenderIcon className="size-4" />
                      Durée : {activite.duree} minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👩‍🏫</span>
                      Éducateur : {activite.educateur}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👥</span>
                      Classe : {activite.classe}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Objectifs :
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activite.objectifs.map((objectif, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                        {objectif}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {activite.evaluation ? (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Évaluation de l'éducateur :
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {activite.evaluation.observations}
                    </p>
                    
                    <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Compétences acquises :
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {activite.evaluation.competencesAcquises.map((competence, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">
                            {competence}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                ) : null}
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedActivite(activite)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                >
                  <EyeIcon className="size-4" />
                  Voir détails complets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivites.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-4xl mb-3">🎨</div>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune activité trouvée pour {enfant.name}
          </p>
        </div>
      )}

      {/* Modal de détails d'activité */}
      {selectedActivite && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={() => setSelectedActivite(null)} />
          <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getTypeColor(selectedActivite.type)} text-2xl`}>
                    {getTypeIcon(selectedActivite.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedActivite.titre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(selectedActivite.date).toLocaleDateString('fr-FR')} • {selectedActivite.heure}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedActivite(null)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* En-tête */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Détails de l'activité
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Retour sur la participation de {enfant.name}
                  </p>
                </div>

                {/* Description */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Description</h5>
                  <p className="text-gray-700 dark:text-gray-300">{selectedActivite.description}</p>
                </div>

                {/* Informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">📅 Informations pratiques</h5>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalenderIcon className="size-4" />
                        Date : {new Date(selectedActivite.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🕐</span>
                        Heure : {selectedActivite.heure} (Durée : {selectedActivite.duree} min)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👩‍🏫</span>
                        Éducateur : {selectedActivite.educateur}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        Classe : {selectedActivite.classe}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">🎯 Objectifs pédagogiques</h5>
                    <ul className="space-y-1">
                      {selectedActivite.objectifs.map((objectif, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{objectif}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Matériel */}
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">🔧 Matériel utilisé</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivite.materiel.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Évaluation */}
                {selectedActivite.evaluation ? (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-xl">📊</span>
                      Évaluation de {enfant.name.split(" ")[0]}
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Niveau de participation
                        </div>
                        <div className={`px-3 py-2 rounded-lg ${getParticipationColor(selectedActivite.evaluation.participation)} font-medium`}>
                          {getParticipationLabel(selectedActivite.evaluation.participation)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Note globale
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-yellow-500">
                            {'★'.repeat(selectedActivite.evaluation.note)}
                            <span className="text-gray-300 dark:text-gray-600">
                              {'★'.repeat(5 - selectedActivite.evaluation.note)}
                            </span>
                          </span>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {selectedActivite.evaluation.note}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Observations de l'éducateur
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        {selectedActivite.evaluation.observations}
                      </p>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Compétences acquises lors de cette activité
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedActivite.evaluation.competencesAcquises.map((competence, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <span className="text-green-500">✓</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{competence}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-gray-600 dark:text-gray-400">
                    Aucune évaluation disponible pour cette activité
                    </p>
                </div>
                )}

                {/* Observation générale */}
                {selectedActivite.observation && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">📝 Observation générale</h5>
                    <p className="text-gray-700 dark:text-gray-300">{selectedActivite.observation}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <button
                  onClick={() => setSelectedActivite(null)}
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