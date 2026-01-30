// components/ecommerce/ClassMetrics.tsx
import { Users, TrendingUp } from "lucide-react";

export default function ClassMetrics() {
  const classes = [
    { name: "Petits", age: "3-4 ans", total: 18, present: 16, rate: 89, color: "blue" },
    { name: "Moyens", age: "4-5 ans", total: 16, present: 15, rate: 94, color: "green" },
    { name: "Grands", age: "5-6 ans", total: 14, present: 13, rate: 93, color: "purple" }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800'
      };
      case 'green': return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800'
      };
      case 'purple': return {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800'
      };
      default: return {
        bg: 'bg-gray-100 dark:bg-gray-900/30',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-800'
      };
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Métriques par Classe
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Répartition des enfants par niveau
          </p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <div className="space-y-4">
        {classes.map((cls, index) => {
          const colors = getColorClasses(cls.color);
          return (
            <div 
              key={index}
              className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {cls.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {cls.age} • {cls.total} enfants
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {cls.rate}%
                  </span>
                  <div className={`p-2 rounded-lg ${colors.text} bg-white dark:bg-gray-800`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    Présents: <span className="font-medium text-gray-800 dark:text-white">{cls.present}</span>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Absents: <span className="font-medium text-gray-800 dark:text-white">{cls.total - cls.present}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors.bg} rounded-full`}
                      style={{ width: `${cls.rate}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${colors.text}`}>
                    {cls.rate}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-white">48</span> enfants au total
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Taux moyen: <span className="font-medium text-green-600 dark:text-green-400">92%</span>
          </div>
        </div>
      </div>
    </div>
  );
}