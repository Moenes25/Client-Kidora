export default function ClassStatistics() {
  const stats = [
    {
      title: "Nombre total de classes",
      value: "3",
      icon: "🏫",
      color: "blue",
      description: "Classes actives"
    },
    {
      title: "Enfants inscrits",
      value: "48",
      icon: "👶",
      color: "green",
      description: "Répartis par âge"
    },
    {
      title: "Taux d'occupation",
      value: "80%",
      icon: "📊",
      color: "purple",
      description: "Moyenne générale"
    },
    {
      title: "Éducateurs assignés",
      value: "6",
      icon: "👩🏫",
      color: "orange",
      description: "Par classe"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">{stat.icon}</div>
            <div className={`w-2 h-2 rounded-full bg-${stat.color}-500`} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {stat.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}