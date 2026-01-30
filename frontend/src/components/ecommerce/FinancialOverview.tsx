// components/nursery/FinancialOverview.tsx
import { TrendingUp, TrendingDown, CreditCard, FileText, Coins } from "lucide-react";
import React from "react";

/* --------- Mini Sparkline réutilisable (SVG 100% Tailwind friendly) --------- */
function MiniSparkline({
  data,
  positive,
  className = "",
}: {
  data: number[];
  positive?: boolean;
  className?: string;
}) {
  const width = 120;
  const height = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = (v: number) =>
    height - ((v - min) / Math.max(1, max - min)) * (height - 6) - 3;

  const step = width / Math.max(1, data.length - 1);
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${norm(v)}`)
    .join(" ");

  const gradientId = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={positive ? "#10B981" : "#F43F5E"} stopOpacity="0.35" />
          <stop offset="100%" stopColor={positive ? "#10B981" : "#F43F5E"} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* fond léger */}
      <rect x="0" y="0" width={width} height={height} rx="6" className="fill-transparent" />

      {/* Area */}
      <path
        d={`${d} L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#${gradientId})`}
      />
      {/* Line */}
      <path
        d={d}
        fill="none"
        stroke={positive ? "#10B981" : "#F43F5E"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function FinancialOverview() {
  const cards = [
    {
      id: 1,
      title: "Revenus Mensuels",
      amount: "12 450 DT",
      change: "+8.5%",
      trend: "up" as const,
      iconBg: "from-emerald-400 to-teal-500",
      icon: <Coins className="h-5 w-5" />,
      spark: [8, 10, 11, 10, 12, 14, 15, 14, 15, 16],
    },
    {
      id: 2,
      title: "Paiements en attente",
      amount: "2 850 DT",
      change: "-3.2%",
      trend: "down" as const,
      iconBg: "from-amber-400 to-orange-500",
      icon: <CreditCard className="h-5 w-5" />,
      spark: [14, 13, 12, 12, 11, 10, 9, 9, 8, 8],
    },
    {
      id: 3,
      title: "Factures ce mois",
      amount: "48",
      change: "+12%",
      trend: "up" as const,
      iconBg: "from-indigo-400 to-fuchsia-500",
      icon: <FileText className="h-5 w-5" />,
      spark: [7, 8, 9, 8, 10, 10, 11, 12, 12, 13],
    },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header dégradé “hero” */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />
        <div className="relative z-10 flex items-start justify-between gap-3 px-5 py-4 text-white">
          <div>
            <h3 className="text-base font-semibold">Aperçu financier</h3>
            <p className="text-xs text-white/85">Vue synthétique du mois en cours</p>
          </div>
          <button className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
            Détails →
          </button>
        </div>
        {/* accents lumineux */}
        <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 top-2 h-20 w-20 rounded-full bg-fuchsia-400/40 blur-3xl" />
      </div>

      {/* Cartes “glass” + sparklines */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-1">
        {cards.map((c) => {
          const positive = c.trend === "up";
          return (
            <div
              key={c.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70"
            >
              {/* contour gradient subtil */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/0 group-hover:ring-black/5 dark:group-hover:ring-white/10" />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${c.iconBg} text-white shadow`}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {c.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {c.amount}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                          positive
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                        }`}
                      >
                        {positive ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {c.change}
                      </span>
                    </div>
                  </div>
                </div>

             
              </div>

              {/* petite légende */}
              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  Mois courant
                </span>
                <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  Variation vs N-1
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Objectif mensuel (barre stylée) */}
      <div className="mt-2 border-t border-gray-200 p-5 dark:border-gray-800">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              Objectif mensuel
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Actualisé en temps réel
            </span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            15 000 DT
          </div>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            style={{ width: "83%" }}
          />
          {/* repères */}
          <div className="absolute inset-0 flex justify-between px-[2px]">
            {[0, 25, 50, 75, 100].map((t) => (
              <span key={t} className="h-full w-px bg-white/50 dark:bg-white/10" />
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="rounded-md bg-emerald-500/10 px-2 py-1 font-semibold text-emerald-600 dark:text-emerald-400">
            83% atteint
          </span>
          <span className="rounded-md bg-sky-500/10 px-2 py-1 font-semibold text-sky-600 dark:text-sky-400">
            Reste +2 450 DT
          </span>
        </div>
      </div>

      {/* Footer court */}
      <div className="border-t border-gray-200 px-5 py-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        Dernière maj : aujourd’hui • Données consolidées (banque & facturation)
      </div>
    </div>
  );
}
