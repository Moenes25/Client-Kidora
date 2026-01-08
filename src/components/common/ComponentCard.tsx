interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  counterLabel?: string; // Label pour le compteur (ex: "parents", "enfants", "utilisateurs")
  counterValue?: number | string; // Valeur du compteur
  icon: React.ReactNode | string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  counterLabel = "éléments",
  counterValue = "8",
  icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m8-8H4"/></svg>
                
              
}) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm ${className}`}
    >
      {/* Card Header - AMÉLIORÉ */}
      <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/30 dark:to-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
              {/* <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg> */}
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {title}
              </h3>
              {desc && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {desc}
                  </span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion complète
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Badge de compteur */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-blue-600 dark:text-blue-400">{counterValue}</span> {counterLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-0">{children}</div>
    </div>
  );
};

export default ComponentCard;