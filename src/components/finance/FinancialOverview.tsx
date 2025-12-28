export default function FinancialOverview() {
  const financialData = [
    {
      id: 1,
      title: "Revenus Mensuels",
      amount: "12,450 DT",
      change: "+8.5%",
      trend: "up",
      icon: "💰",
      color: "text-green-600 bg-green-100 dark:bg-green-900/30"
    },
    {
      id: 2,
      title: "Paiements en Attente",
      amount: "2,850 DT",
      change: "-3.2%",
      trend: "down",
      icon: "⏳",
      color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      id: 3,
      title: "Dépenses Mensuelles",
      amount: "8,200 DT",
      change: "+4.1%",
      trend: "up",
      icon: "💸",
      color: "text-red-600 bg-red-100 dark:bg-red-900/30"
    },
    {
      id: 4,
      title: "Bénéfice Net",
      amount: "4,250 DT",
      change: "+15.2%",
      trend: "up",
      icon: "📈",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Aperçu Financier
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vue d'ensemble des finances
          </p>
        </div>
        <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
          <option>Ce mois</option>
          <option>Le mois dernier</option>
          <option>Ce trimestre</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialData.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">{item.icon}</div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.trend === "up" 
                  ? "text-green-600 bg-green-100 dark:bg-green-900/30" 
                  : "text-red-600 bg-red-100 dark:bg-red-900/30"
              }`}>
                {item.change}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {item.amount}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Objectif de revenus mensuels</span>
          <span className="font-semibold text-gray-800 dark:text-white">15,000 DT</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
            style={{ width: '83%' }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>83% atteint</span>
          <span>2,550 DT restants</span>
        </div>
      </div>
    </div>
  );
}