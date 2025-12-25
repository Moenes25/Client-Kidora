// components/ecommerce/ChildrenTotalMetrics.tsx
export default function ChildrenTotalMetrics() {
  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
          {/* Icône Enfants */}
          <svg 
            className="w-6 h-6 text-cyan-600 dark:text-cyan-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          {/* +5% */}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">48</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Enfants inscrits</p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-500">Par classe:</span>
            <div className="flex gap-2 mt-1">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                18 Petits
              </span>
              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                16 Moyens
              </span>
              <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
                14 Grands
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}