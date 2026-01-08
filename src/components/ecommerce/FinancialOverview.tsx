// components/nursery/FinancialOverview.tsx
import { TrendingUp, TrendingDown, DollarSign, CreditCard, FileText } from "lucide-react";

export default function FinancialOverview() {
  const financialData = [
    {
      id: 1,
      title: "Revenus Mensuels",
      amount: "12,450 DT",
      change: "+8.5%",
      trend: "up",
      icon :( <svg
      className="w-5 h-5 text-green-600"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <text x="2" y="17" fontSize="14" fontWeight="bold">
        DT
        </text>
      </svg>
    ),
        
      color: "text-green-600 bg-green-100 dark:bg-green-900/30"
    },
    {
      id: 2,
      title: "Paiements en Attente",
      amount: "2,850 DT",
      change: "-3.2%",
      trend: "down",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      id: 3,
      title: "Factures ce Mois",
      amount: "48",
      change: "+12%",
      trend: "up",
      icon: <FileText className="w-5 h-5" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
    }
  ];

  return (
    // <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
     <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Aperçu Financier
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          Détails →
        </button>
      </div>

      <div className="space-y-4">
        {financialData.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.color}`}>
                {item.icon}
                
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{item.amount}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {item.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                item.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Objectif mensuel</span>
          <span className="font-semibold text-gray-800 dark:text-white">€15,000</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" 
            style={{ width: '83%' }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">83% atteint</p>
      </div>
    </div>
  );
}