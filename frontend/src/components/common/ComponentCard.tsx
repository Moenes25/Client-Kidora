import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  counterLabel?: string;
  counterValue?: number | string;
  icon: React.ReactNode | string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  counterLabel = "éléments",
  counterValue = "0",
  icon,
}) => {
  return (
    <div className={`rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03] ${className}`}>
      {/* Header créatif */}
      <div className="relative overflow-hidden rounded-t-2xl border-b border-gray-100/70 bg-gradient-to-br from-gray-50 to-white p-6 dark:border-white/10 dark:from-gray-900/30 dark:to-gray-800/30">
        <span className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-2xl" />
        <span className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{title}</h3>
              {desc && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{desc}</p>}
            </div>
          </div>

          {/* chip compteur */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm dark:border-white/10 dark:bg-gray-900/50 dark:text-gray-300">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span><span className="text-indigo-600 dark:text-indigo-400">{counterValue}</span> {counterLabel}</span>
          </div>
        </div>
      </div>

      <div className="p-0">{children}</div>
    </div>
  );
};

export default ComponentCard;
