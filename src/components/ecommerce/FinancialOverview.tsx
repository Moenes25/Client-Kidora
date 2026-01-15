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
      icon: (
        <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <text x="2" y="17" fontSize="14" fontWeight="bold">DT</text>
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-0 border border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col">
      {/* Header avec bg-indigo-500 */}
      <div className="bg-indigo-500">
        <div className="flex justify-between items-center text-white p-4">
          <div>
            <h3 className="text-base font-semibold">
              Aperçu Financier
            </h3>
            {/* <p className="text-indigo-100 text-xs opacity-90">
              Vue d'ensemble des finances ce mois-ci
            </p> */}
          </div>
          <button className="text-sm text-indigo-100 font-medium hover:text-white">
            Détails →
          </button>
        </div>

        {/* Note informative */}
        {/* <div className="mb-3 p-2.5 bg-indigo-600/40 rounded-lg mx-4">
          <div className="flex items-center gap-1.5 text-indigo-100 text-xs">
            <span>
              💰 Objectif mensuel atteint à 83%
            </span>
          </div>
        </div> */}
      </div>

      {/* Contenu principal */}
      <div className="p-4 flex-grow">
        <div className="space-y-4">
          {financialData.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-teal-500/100 rounded-xl border border-teal-300">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  item.trend === "up" 
                    ? "bg-green-200 text-green-800" 
                    : "bg-yellow-200 text-yellow-800"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-50">{item.title}</p>
                  <p className="text-lg font-bold text-white">{item.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {item.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-300" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-300" />
                )}
                <span className={`text-sm font-bold ${
                  item.trend === "up" ? "text-green-300" : "text-red-300"
                }`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Barre de progression */}
        <div className="mt-6 pt-6 border-t border-teal-300">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-white bg-teal-600/70 px-2 py-1 rounded">Objectif mensuel</span>
          <span className="font-bold text-white bg-teal-600/70 px-2 py-0.5 rounded">15,000 DT</span>
        </div>
        <div className="mt-2 w-full bg-teal-600/50 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-green-300 to-green-400 h-2.5 rounded-full" 
            style={{ width: '83%' }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs font-bold text-white bg-teal-600/60 px-2 py-1 rounded">
            83% atteint
          </p>
          <p className="text-xs font-bold text-white bg-teal-700/70 px-2 py-1 rounded">
            +2,450 DT restants
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}