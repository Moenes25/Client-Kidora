import { useState } from "react";
import { TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState<"monthly" | "yearly">("monthly");

  // Données pour les différentes périodes
  const revenueData = {
    monthly: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"],
      values: [12000, 12500, 11800, 12450, 13000, 12800, 13500],
      total: "88,000 DT",
      change: "+12.5%",
      trend: "up" as const
    },
    yearly: {
      labels: ["2020", "2021", "2022", "2023", "2024"],
      values: [98000, 112000, 125000, 138000, 155000],
      total: "155,000 DT",
      change: "+12.3%",
      trend: "up" as const
    }
  };

  const currentData = revenueData[timeRange];
  const maxValue = Math.max(...currentData.values);
  const minValue = Math.min(...currentData.values);
  const average = currentData.values.reduce((a, b) => a + b, 0) / currentData.values.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Évolution des revenus
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyse des revenus par période
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700/50 rounded-lg p-1 backdrop-blur-sm">
            {(["monthly", "yearly"] as const).map((range) => (
              <button
                key={range}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600/50"
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range === "monthly" ? "Mensuel" : "Annuel"}
              </button>
            ))}
          </div>

          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Exporter les données"
          >
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Statistiques en haut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{currentData.total}</p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              currentData.trend === "up" 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {currentData.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {currentData.change}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moyenne</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {average.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} DT
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Période</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {timeRange === "monthly" ? "7 mois" : "5 ans"}
          </p>
        </div>
      </div>

      {/* Graphique amélioré */}
      <div className="relative h-64 mb-6">
        {/* Lignes de grille */}
        <div className="absolute inset-0 flex flex-col justify-between pb-8">
          {[0, 25, 50, 75, 100].map((percent) => (
            <div 
              key={percent} 
              className="border-t border-gray-200 dark:border-gray-700"
            >
              
            </div>
          ))}
        </div>

        {/* Barres du graphique */}
        <div className="absolute inset-0 flex items-end gap-3 px-4 pb-8">
          {currentData.values.map((value, index) => {
            const percentage = (value / maxValue) * 100;
            const isHighest = value === maxValue;
            const isLowest = value === minValue;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                {/* Barre principale */}
                <div className="relative w-full">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isHighest 
                        ? 'bg-gradient-to-t from-blue-600 to-blue-500' 
                        : 'bg-gradient-to-t from-blue-500 to-blue-400'
                    } group-hover:opacity-90`}
                    style={{ height: `${percentage}%` }}
                  >
                    {/* Tooltip au hover */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-200 text-xs px-2 py-1 rounded whitespace-nowrap">
                        <div className="font-bold">{value.toLocaleString('fr-FR')} DT</div>
                        <div className="text-gray-300">{currentData.labels[index]}</div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  
                  {/* Point marqueur */}
                  {isHighest && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Max
                      </div>
                    </div>
                  )}
                  
                  {isLowest && timeRange === "monthly" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Min
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Label en bas */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                  {currentData.labels[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende et métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Résumé des performances
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Plus haut:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {maxValue.toLocaleString('fr-FR')} DT
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Plus bas:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {minValue.toLocaleString('fr-FR')} DT
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Croissance:</span>
              <div className="flex items-center gap-1">
                {currentData.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`font-medium ${
                  currentData.trend === "up" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {currentData.change}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Comparaison
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {timeRange === "monthly" ? "Ce mois" : "Cette année"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {timeRange === "monthly" ? "Mois dernier" : "Année dernière"}
              </span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {timeRange === "monthly" 
              ? "Tendance mensuelle des revenus" 
              : "Évolution annuelle sur 5 ans"}
          </div>
        </div>
      </div>
    </div>
  );
}