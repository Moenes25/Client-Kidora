// components/ecommerce/EducateursMetrics.tsx
export default function EducateursMetrics() {
  const educators = [
    { id: 1, name: "Marie", avatar: "/images/3-4_ans/educatrice_1.jpg" },
    { id: 2, name: "Jean", avatar: "/images/user/user-35.jpg" },
    { id: 3, name: "Sophie", avatar: "/images/user/user-03.jpg" },
    { id: 4, name: "Luc", avatar: "/images/user/user-05.jpg" }
  ];

  return (
    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
          {/* Icône Éducateurs */}
          <svg 
            className="w-6 h-6 text-teal-600 dark:text-teal-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
        </div>
        {/* <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          +1
        </span> */}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">8</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Éducateurs actifs</p>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Présents aujourd'hui:</span>
            <span className="font-medium text-green-600">6</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Absents aujourd'hui:</span>
            <span className="font-medium text-red-600">2</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <div className="flex -space-x-2">
            {/* Images des éducateurs */}
            {educators.map((educator) => (
              <div 
                key={educator.id} 
                className="relative w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
              >
                <img
                  src={educator.avatar}
                  alt={educator.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si l'image n'existe pas
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${educator.name}&background=teal&color=fff&size=32`;
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">+4 autres</span>
        </div>
      </div>
    </div>
  );
}