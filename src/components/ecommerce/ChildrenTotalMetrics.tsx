// components/ecommerce/ChildrenTotalMetrics.tsx
export default function ChildrenTotalMetrics() {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 border border-green-400 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-green-400 rounded-lg">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </div>
        <span className="text-xs font-medium text-green-100 bg-green-600/80 px-1.5 py-0.5 rounded-full">
          {/* +5% */}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white">48</h3>
      <p className="text-green-100 text-xs font-medium mt-0.5">Enfants inscrits</p>
      
      <div className="mt-3 pt-3 border-t border-green-300/60">
        <div>
          <span className="text-xs font-medium text-green-200">Par classe:</span>
          <div className="flex gap-1.5 mt-1.5">
            <span className="text-xs px-1.5 py-0.5 bg-green-700/70 text-green-100 rounded-lg">
              18 Petits
            </span>
            <span className="text-xs px-1.5 py-0.5 bg-green-700/70 text-green-100 rounded-lg">
              16 Moyens
            </span>
            <span className="text-xs px-1.5 py-0.5 bg-green-700/70 text-green-100 rounded-lg">
              14 Grands
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}