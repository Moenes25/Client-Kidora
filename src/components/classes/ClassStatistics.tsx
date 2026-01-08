export default function ClassStatistics() {
  const stats = [
    {
      title: "Enfants inscrits",
      value: "48",
      icon: "👶",
      color: "bg-gradient-to-br from-green-500 to-green-600  rounded-xl p-5 border border-green-400 shadow-sm",
      description: "Répartis par âge"
    },
    {
      title: "Nombre total de classes",
      value: "3",
      icon: "🏫",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 border border-indigo-400 shadow-sm",
      description: "Classes actives"
    },
    
    {
      title: "Taux d'occupation",
      value: "80%",
      icon: "📊",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 border border-emerald-400 shadow-sm",
      description: "Moyenne générale"
    },
    {
      title: "Éducateurs assignés",
      value: "6",
      icon: "👩🏫",
      color: "bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 border border-orange-400 shadow-sm",
      description: "Par classe"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`${stat.color} p-6 rounded-xl border shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl text-white">{stat.icon}</div>
            <div className="w-2 h-2 rounded-full bg-white/80" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-sm font-medium text-white/90 mb-1">
            {stat.title}
          </p>
          <p className="text-xs text-white/80">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}