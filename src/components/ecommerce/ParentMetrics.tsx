// components/ecommerce/ParentMetrics.tsx
export default function ParentMetrics() {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 border border-orange-400 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-orange-400 rounded-lg">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white">38</h3>
      <p className="text-orange-100 text-xs font-medium mt-0.5">Parents actives</p>
      
      <div className="mt-3 pt-3 border-t border-orange-300/60">
        <div className="flex justify-between items-center text-xs">
          <span className="text-orange-200 font-medium">Nouveaux ce mois: 5</span>
          <span className="font-bold text-green-300 bg-green-900/30 px-1.5 py-0.5 rounded">+13.2%</span>
        </div>
      </div>
    </div>
  );
}