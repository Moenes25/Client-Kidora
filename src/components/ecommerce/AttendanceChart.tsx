// components/nursery/AttendanceChart.tsx
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Calendar, Users, CheckCircle } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function AttendanceChart() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  // Données pour la vue hebdomadaire
  const weeklyData = {
    categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    series: [
      {
        name: "Présents",
        data: [32, 35, 38, 36, 40, 15, 8]
      },
      {
        name: "Inscrits",
        data: [40, 42, 45, 44, 48, 20, 12]
      }
    ],
    stats: [
      {
        label: "Taux de Présence",
        value: "92%",
        change: "+2.3%",
        icon: <CheckCircle className="w-5 h-5" />,
        color: "text-green-600 bg-green-100 dark:bg-green-900/30"
      },
      {
        label: "Absences",
        value: "3",
        change: "-1",
        icon: <Users className="w-5 h-5" />,
        color: "text-red-600 bg-red-100 dark:bg-red-900/30"
      },
      {
        label: "Prochaine Activité",
        value: "10:00",
        subtext: "Éveil musical",
        icon: <Calendar className="w-5 h-5" />,
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      }
    ]
  };

  // Données pour la vue mensuelle
  const monthlyData = {
    categories: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    series: [
      {
        name: "Présents",
        data: [145, 152, 148, 158]
      },
      {
        name: "Inscrits",
        data: [165, 170, 168, 175]
      }
    ],
    stats: [
      {
        label: "Taux de Présence",
        value: "89%",
        change: "+1.8%",
        icon: <CheckCircle className="w-5 h-5" />,
        color: "text-green-600 bg-green-100 dark:bg-green-900/30"
      },
      {
        label: "Absences moyennes",
        value: "4.2",
        change: "-0.5",
        icon: <Users className="w-5 h-5" />,
        color: "text-red-600 bg-red-100 dark:bg-red-900/30"
      },
      {
        label: "Meilleur jour",
        value: "Lundi",
        subtext: "95% de présence",
        icon: <Calendar className="w-5 h-5" />,
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      }
    ]
  };

  // Utiliser les données en fonction de la sélection
  const currentData = timeRange === 'week' ? weeklyData : monthlyData;

  const options: ApexOptions = {
    colors: ["#3B82F6", "#8B5CF6"],
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "line",
      height: 320,
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1
      }
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      hover: { size: 7 }
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5
    },
    xaxis: {
      categories: currentData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      min: 0,
      max: timeRange === 'week' ? 50 : 200,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        },
        formatter: (val: number) => `${val}`
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "14px",
      fontFamily: "Inter",
      labels: {
        colors: "#374151"
      }
    },
    tooltip: {
      theme: "light",
      x: { show: true }
    }
  };

  // components/nursery/AttendanceChart.tsx (seulement la partie du retour JSX)
return (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-full">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          {timeRange === 'week' ? 'Présence Hebdomadaire' : 'Présence Mensuelle'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs">
          {timeRange === 'week' 
            ? 'Suivi des présences des enfants cette semaine' 
            : 'Analyse des présences sur le mois en cours'}
        </p>
      </div>
      
      <div className="flex gap-1.5 mt-2 sm:mt-0">
        <button 
          onClick={() => setTimeRange('week')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            timeRange === 'week'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Cette semaine
        </button>
        <button 
          onClick={() => setTimeRange('month')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            timeRange === 'month'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Ce mois
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      {currentData.stats.map((stat, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className={`p-1.5 rounded ${stat.color}`}>
              {React.cloneElement(stat.icon, { className: "w-4 h-4" })}
            </div>
            {stat.change && (
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            )}
          </div>
          <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">
            {stat.value}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            {stat.label}
          </p>
          {stat.subtext && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {stat.subtext}
            </p>
          )}
        </div>
      ))}
    </div>

    <div className="mb-3 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 text-xs">
        <span>
          {timeRange === 'week' 
            ? '📊 Cette semaine : Tendance positive de présence (+5% vs semaine dernière)'
            : '📈 Ce mois-ci : Meilleure performance le lundi avec 95% de présence'}
        </span>
      </div>
    </div>

    <div className="min-w-0" style={{ height: '250px' }}>
      <Chart 
        options={{
          ...options,
          chart: {
            ...options.chart,
            height: 250
          }
        }} 
        series={currentData.series} 
        type="area" 
        height={250}
      />
    </div>

    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Présents</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Total inscrits</span>
          </div>
        </div>
        <div className="mt-1 sm:mt-0">
          <span className="text-gray-500 dark:text-gray-400">
            {timeRange === 'week' 
              ? 'Données mises à jour aujourd\'hui à 18:00'
              : 'Données du mois en cours'}
          </span>
        </div>
      </div>
    </div>
  </div>
);
}