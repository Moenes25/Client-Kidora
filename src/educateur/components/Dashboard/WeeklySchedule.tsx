export default function WeeklySchedule() {
  const days = [
    { name: 'Lun', date: '17', activities: 3, isToday: true },
    { name: 'Mar', date: '18', activities: 2, isToday: false },
    { name: 'Mer', date: '19', activities: 4, isToday: false },
    { name: 'Jeu', date: '20', activities: 3, isToday: false },
    { name: 'Ven', date: '21', activities: 5, isToday: false },
    { name: 'Sam', date: '22', activities: 1, isToday: false },
  ];
  
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-300 dark:bg-white shadow-sm h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-4">
        Planning de la semaine
      </h3>
      
      {/* Version HORIZONTALE */}
      <div className="flex flex-col">
        {/* Ligne des jours en horizontal */}
        <div className="flex space-x-4 mb-4">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`flex-1 p-3 rounded-xl border ${day.isToday ? 'border-blue-500 bg-blue-50 dark:bg-blue-100' : 'border-gray-200 dark:border-gray-300 bg-gray-50 dark:bg-gray-100'}`}
            >
              <div className="text-center">
                <div className={`text-sm font-medium ${day.isToday ? 'text-blue-600 dark:text-blue-700' : 'text-gray-500 dark:text-gray-700'}`}>
                  {day.name}
                </div>
                <div className={`text-xl font-bold mt-1 ${day.isToday ? 'text-blue-700 dark:text-blue-800' : 'text-gray-800 dark:text-gray-900'}`}>
                  {day.date}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-700 mt-2">
                  {day.activities} act.
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Ligne des heures/activités en dessous */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-800">
              Aujourd'hui (17 Mars)
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-700 hover:underline">
              Voir détails →
            </button>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-100 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-600 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-900">Activité matinale</div>
                <div className="text-xs text-gray-500 dark:text-gray-700">9:00 - 10:30</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 bg-green-50 dark:bg-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-900">Atelier créatif</div>
                <div className="text-xs text-gray-500 dark:text-gray-700">11:00 - 12:30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}