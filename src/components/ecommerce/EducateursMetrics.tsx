// components/ecommerce/EducateursMetrics.tsx
export default function EducateursMetrics() {
  const educators = [
    { id: 1, name: "Marie", avatar: "/images/3-4_ans/educatrice_1.jpg" },
    { id: 2, name: "Jean", avatar: "/images/user/user-35.jpg" },
    { id: 3, name: "Sophie", avatar: "/images/user/user-03.jpg" },
    { id: 4, name: "Luc", avatar: "/images/user/user-05.jpg" }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 border border-indigo-400 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-indigo-400 rounded-lg">
          <svg 
            className="w-5 h-5 text-white" 
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
      </div>
      
      <h3 className="text-xl font-bold text-white">8</h3>
      <p className="text-indigo-100 text-xs font-medium mt-0.5">Éducateurs actifs</p>
      
      <div className="mt-3 pt-3 border-t border-indigo-300/60">
        <div className="space-y-1.5 mb-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-indigo-200 font-medium">Présents:</span>
            <span className="font-bold text-green-300">6</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-indigo-200 font-medium">Absents:</span>
            <span className="font-bold text-red-300">2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {educators.map((educator) => (
              <div 
                key={educator.id} 
                className="relative w-6 h-6 rounded-full border border-indigo-300 overflow-hidden"
              >
                <img
                  src={educator.avatar}
                  alt={educator.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${educator.name}&background=indigo&color=fff&size=24`;
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-indigo-200 font-medium">+4 autres</span>
        </div>
      </div>
    </div>
  );
}