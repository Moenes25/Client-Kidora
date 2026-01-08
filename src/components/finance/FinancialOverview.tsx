export default function FinancialOverview() {
  const financialData = [
    {
      id: 1,
      title: "Revenus Mensuels",
      amount: "12,450 DT",
      change: "+8.5%",
      trend: "up",
      icon: "💰",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 border border-green-400 shadow-sm",
      iconBg: "bg-green-100/80 dark:bg-green-900/40"
    },
    {
      id: 2,
      title: "Paiements en Attente",
      amount: "2,850 DT",
      change: "-3.2%",
      trend: "down",
      icon: "⏳",
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl border-amber-400 shadow-sm",
      iconBg: "bg-amber-100/80 dark:bg-amber-900/40"
    },
    // bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 border border-orange-400 shadow-sm
    {
      id: 3,
      title: "Dépenses Mensuelles",
      amount: "8,200 DT",
      change: "+4.1%",
      trend: "up",
      icon: "💸",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 border border-emerald-400 shadow-sm",
      iconBg: "bg-red-100/80 dark:bg-red-900/40"
    },
    {
      id: 4,
      title: "Bénéfice Net",
      amount: "4,250 DT",
      change: "+15.2%",
      trend: "up",
      icon: "📈",
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600  rounded-xl p-5 border border-indigo-400 shadow-sm ",
      iconBg: "bg-blue-100/80 dark:bg-blue-900/40"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Aperçu Financier
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Vue d'ensemble des finances du mois
          </p>
        </div>
        <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm border border-gray-300 dark:border-gray-600">
          <option>Ce mois</option>
          <option>Le mois dernier</option>
          <option>Ce trimestre</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialData.map((item) => (
          <div key={item.id} className={`${item.bgColor} rounded-xl p-5 border shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 ${item.iconBg} rounded-lg backdrop-blur-sm`}>
                <div className="text-2xl">{item.icon}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.trend === "up" 
                  ? 'bg-white/30 text-white' 
                  : 'bg-white/20 text-white'
              }`}>
                {item.change}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-white mb-1">
              {item.amount}
            </h4>
            <p className="text-sm font-medium text-white/90">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-medium text-gray-800 dark:text-white">Objectif de revenus mensuels</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Progression vers l'objectif de 15,000 DT</p>
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">15,000 DT</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: '83%' }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-medium text-gray-800 dark:text-white">83% atteint</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">2,550 DT restants</span>
        </div>
      </div>
    </div>
  );
}