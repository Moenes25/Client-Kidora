// src/educateur/pages/Home.tsx
import PageMeta from "../../components/common/PageMeta";
import Metrics from "../components/Dashboard/Metrics";
import ClassesSummary from "../components/Dashboard/ClassesSummary";
import RecentActivities from "../components/Dashboard/RecentActivities";
import WeeklySchedule from "../components/Dashboard/WeeklySchedule";
import ChildrenToday from "../components/Dashboard/ChildrenToday";

export default function HomeEducateur() {
  return (
    <>
      <PageMeta
        title="Dashboard Éducateur | Système de Gestion"
        description="Tableau de bord pour les éducateurs - Suivi des enfants, présence et activités"
      />
      
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bonjour, Éducateur 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Voici un aperçu de votre journée
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-6">
        <Metrics />
      </div>

      {/* UNE SEULE grille principale */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* ===== COLONNE GAUCHE (8/12) ===== */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* 1. Classes Actives */}
          <ClassesSummary />
          
          {/* 2. Planning de la semaine */}
          <WeeklySchedule />
          
        </div>
        
        {/* ===== COLONNE DROITE (4/12) ===== */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* 1. Alertes IA */}
          <RecentActivities />
          
          {/* 2. Actions rapides */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <span className="font-medium">Gérer présence</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">+</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <span className="font-medium">Ajouter activité</span>
                <span className="text-xs bg-green-100 dark:bg-green-800 px-2 py-1 rounded">+</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <span className="font-medium">Créer rapport</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">📊</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                <span className="font-medium">Partager avec parents</span>
                <span className="text-xs bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded">📧</span>
              </button>
            </div>
          </div>
          
        </div>
        
        {/* ===== DEUXIÈME LIGNE : ChildrenToday + Aujourd'hui ===== */}
        {/* ChildrenToday (6/12) */}
        <div className="col-span-12 lg:col-span-8">
          
          <ChildrenToday />
        </div>
        
        {/* Statistiques "Aujourd'hui" (4/12) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Aujourd'hui
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Heures d'activités</span>
                <span className="font-semibold text-gray-900 dark:text-white">4h 30m</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Enfants présents</span>
                <span className="font-semibold text-green-600 dark:text-green-400">89%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Tâches terminées</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">12/15</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Observations</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Retards</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">2</span>
              </div>
            </div>
          </div>
        </div>
        
      </div> {/* Fin de la grille principale */}
    </>
  );
}