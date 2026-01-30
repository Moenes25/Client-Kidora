// src/components/finance/PaymentStatus.tsx
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function PaymentStatus() {
  const total = 48; // total dossiers
  const groups = [
    {
      key: "paid",
      label: "Payés",
      count: 42,
      amount: "10 450 DT",
      grad: "from-emerald-500 to-emerald-600",
      chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      icon: <CheckCircle2 className="h-5 w-5" />,
      solid: "#10b981",
    },
    {
      key: "pending",
      label: "En attente",
      count: 5,
      amount: "2 850 DT",
      grad: "from-amber-500 to-yellow-600",
      chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      icon: <Clock className="h-5 w-5" />,
      solid: "#f59e0b",
    },
    {
      key: "overdue",
      label: "En retard",
      count: 1,
      amount: "350 DT",
      grad: "from-rose-500 to-red-600",
      chip: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
      icon: <AlertTriangle className="h-5 w-5" />,
      solid: "#ef4444",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Statut des paiements</h3>

      <div className="space-y-4">
        {groups.map((g) => {
          const pct = Math.round((g.count / total) * 100);
          return (
            <div key={g.key} className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${g.grad} text-white ring-1 ring-white/30`}>
                    {g.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{g.label}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{g.count} paiements</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{g.amount}</p>
                  <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${g.chip}`}>{pct}%</span>
                </div>
              </div>

              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Progression</span>
                  <span className="font-medium text-gray-900 dark:text-white">{pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: g.solid }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
