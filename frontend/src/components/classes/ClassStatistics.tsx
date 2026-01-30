// src/components/classes/ClassStatistics.tsx
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Baby, LayoutGrid, BarChart3, Users } from "lucide-react";

type Stat = {
  title: string;
  value: string;
  Icon: LucideIcon;
  from: string;
  to: string;
  desc: string;
};

export default function ClassStatistics() {
  const stats: Stat[] = [
    {
      title: "Enfants inscrits",
      value: "48",
      Icon: Baby, // si votre version n’a pas <Baby />, utilisez <Users /> ou <UserRound />
      from: "from-emerald-500",
      to: "to-emerald-600",
      desc: "Répartis par âge",
    },
    {
      title: "Nombre total de classes",
      value: "3",
      Icon: LayoutGrid,
      from: "from-indigo-500",
      to: "to-violet-600",
      desc: "Classes actives",
    },
    {
      title: "Taux d'occupation",
      value: "80%",
      Icon: BarChart3,
      from: "from-blue-500",
      to: "to-cyan-600",
      desc: "Moyenne générale",
    },
    {
      title: "Éducateurs assignés",
      value: "6",
      Icon: Users,
      from: "from-orange-500",
      to: "to-rose-500",
      desc: "Par classe",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ Icon, ...s }, i) => (
        <div
          key={i}
          className={[
            "relative overflow-hidden rounded-2xl border p-5 text-white shadow-sm",
            "bg-gradient-to-br", s.from, s.to,
            "border-white/20 dark:border-white/10",
          ].join(" ")}
        >
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
          <div className="relative z-[1]">
            <div className="mb-3 flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
                <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
              </div>
              <div className="h-2 w-2 rounded-full bg-white/80" />
            </div>
            <h3 className="mb-0.5 text-2xl font-extrabold">{s.value}</h3>
            <p className="text-sm font-medium">{s.title}</p>
            <p className="mt-1 text-xs text-white/90">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
