// src/components/finance/FinancialOverview.tsx
import { PiggyBank, Hourglass, Wallet, LineChart } from "lucide-react";

export default function FinancialOverview() {
  const cards = [
    {
      title: "Revenus Mensuels",
      amount: "12 450 DT",
      change: "+8,5%",
      trend: "up" as const,
      icon: <PiggyBank className="h-5 w-5" />,
      grad: "from-emerald-500 to-emerald-600",
      chip: "bg-emerald-400/25 text-white",
    },
    {
      title: "Paiements en attente",
      amount: "2 850 DT",
      change: "-3,2%",
      trend: "down" as const,
      icon: <Hourglass className="h-5 w-5" />,
      grad: "from-amber-500 to-orange-600",
      chip: "bg-amber-400/25 text-white",
    },
    {
      title: "Dépenses Mensuelles",
      amount: "8 200 DT",
      change: "+4,1%",
      trend: "up" as const,
      icon: <Wallet className="h-5 w-5" />,
      grad: "from-sky-500 to-blue-600",
      chip: "bg-sky-400/25 text-white",
    },
    {
      title: "Bénéfice Net",
      amount: "4 250 DT",
      change: "+15,2%",
      trend: "up" as const,
      icon: <LineChart className="h-5 w-5" />,
      grad: "from-indigo-500 to-violet-600",
      chip: "bg-indigo-400/25 text-white",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aperçu financier</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Vue d’ensemble des finances du mois</p>
        </div>
        <select className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm dark:border-white/10 dark:bg-gray-800 dark:text-white">
          <option>Ce mois</option>
          <option>Le mois dernier</option>
          <option>Ce trimestre</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={[
              "relative overflow-hidden rounded-2xl border p-5 text-white shadow-sm",
              "bg-gradient-to-br", c.grad, "border-white/20",
            ].join(" ")}
          >
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
            <div className="relative z-[1]">
              <div className="mb-3 flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/20 ring-1 ring-white/30">
                  {c.icon}
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${c.chip}`}>{c.change}</span>
              </div>
              <h4 className="mb-1 text-2xl font-extrabold">{c.amount}</h4>
              <p className="text-sm text-white/90">{c.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* objectif */}
      <div className="mt-8 rounded-xl border border-gray-200 p-5 dark:border-white/10">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900 dark:text-white">Objectif de revenus mensuels</span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Progression vers 15 000 DT</p>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">15 000 DT</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: "83%" }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
            <span className="font-medium text-gray-900 dark:text-white">83% atteint</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">2 550 DT restants</span>
        </div>
      </div>
    </div>
  );
}
