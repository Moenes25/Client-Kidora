// components/ecommerce/ParentMetrics.tsx
export default function ParentMetrics() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
          {/* Icône Parents */}
          <svg 
            className="w-6 h-6 text-purple-600 dark:text-purple-400" 
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
        {/* <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          +8%
        </span> */}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">38</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Parents actives</p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Nouveaux ce mois: 5</span>
          <span className="font-medium text-green-600">+13.2%</span>
        </div>
      </div>
    </div>
  );
}