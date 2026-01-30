// components/nursery/AttendanceChart.tsx
import React, { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Calendar, Users, CheckCircle, Sparkles } from "lucide-react";

type Range = "week" | "month";

export default function AttendanceChart() {
  const [timeRange, setTimeRange] = useState<Range>("week");

  /** ---- Données ---- */
  const weeklyData = {
    categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    series: [
      { name: "Présents", data: [32, 35, 38, 36, 40, 15, 8] },
      { name: "Inscrits", data: [40, 42, 45, 44, 48, 20, 12] },
    ],
    stats: [
      {
        label: "Taux de présence",
        value: "92%",
        change: "+2.3%",
        icon: <CheckCircle />,
        color: "from-emerald-500 to-teal-500",
        chip: "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30",
      },
      {
        label: "Absences",
        value: "3",
        change: "-1",
        icon: <Users />,
        color: "from-rose-500 to-red-500",
        chip: "text-rose-700 bg-rose-100 dark:bg-rose-900/30",
      },
      {
        label: "Prochaine activité",
        value: "10:00",
        subtext: "Éveil musical",
        icon: <Calendar />,
        color: "from-indigo-500 to-violet-500",
        chip: "text-indigo-700 bg-indigo-100 dark:bg-indigo-900/30",
      },
    ],
    note:
      "📊 Cette semaine : tendance positive de présence (+5% vs semaine dernière)",
  };

  const monthlyData = {
    categories: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    series: [
      { name: "Présents", data: [145, 152, 148, 158] },
      { name: "Inscrits", data: [165, 170, 168, 175] },
    ],
    stats: [
      {
        label: "Taux de présence",
        value: "89%",
        change: "+1.8%",
        icon: <CheckCircle />,
        color: "from-emerald-500 to-teal-500",
        chip: "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30",
      },
      {
        label: "Absences moyennes",
        value: "4.2",
        change: "-0.5",
        icon: <Users />,
        color: "from-rose-500 to-red-500",
        chip: "text-rose-700 bg-rose-100 dark:bg-rose-900/30",
      },
      {
        label: "Meilleur jour",
        value: "Lundi",
        subtext: "95% de présence",
        icon: <Calendar />,
        color: "from-indigo-500 to-violet-500",
        chip: "text-indigo-700 bg-indigo-100 dark:bg-indigo-900/30",
      },
    ],
    note:
      "📈 Ce mois-ci : meilleure performance le lundi avec 95% de présence",
  };

  const current = timeRange === "week" ? weeklyData : monthlyData;

  /** ---- Chart options (dépend des données) ---- */
  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        fontFamily: "Inter, ui-sans-serif, system-ui",
        type: "area",
        height: 260,
        toolbar: { show: false },
        foreColor: "#6B7280",
      },
      colors: ["#22C55E", "#8B5CF6"], // verts pour “présents”, violet pour “inscrits”
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 60, 100],
        },
      },
      markers: {
        size: 4,
        strokeWidth: 2,
        strokeColors: "#fff",
        hover: { size: 7 },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 5,
        padding: { left: 12, right: 12, top: 0, bottom: 8 },
      },
      xaxis: {
        categories: current.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "12px" } },
      },
      yaxis: {
        min: 0,
        max: timeRange === "week" ? 50 : 200,
        tickAmount: 4,
        labels: {
          style: { fontSize: "12px" },
          formatter: (val: number) => `${val}`,
        },
      },
      legend: {
        show: false, // on met une légende custom sous le graph
      },
      tooltip: {
        shared: true,
        theme: "light",
        y: {
          formatter: (val: number, { seriesIndex }) =>
            `${val}${seriesIndex === 0 ? " présents" : " inscrits"}`,
        },
      },
    };
  }, [current.categories, timeRange]);

  /** ---- UI ---- */
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* pattern décoratif */}
      <svg
        className="pointer-events-none absolute -top-6 -right-8 h-40 w-40 opacity-20 dark:opacity-10"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#6366F1" offset="0" />
            <stop stopColor="#A78BFA" offset="1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#g1)" />
      </svg>

      {/* Header dégradé + toggle */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-4 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <div>
              <h3 className="text-base font-semibold">
                {timeRange === "week" ? "Présence hebdomadaire" : "Présence mensuelle"}
              </h3>
              <p className="text-xs text-white/80">
                {timeRange === "week"
                  ? "Suivi des présences des enfants cette semaine"
                  : "Analyse des présences sur le mois en cours"}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white/15 p-1 backdrop-blur">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setTimeRange("week")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  timeRange === "week"
                    ? "bg-white text-gray-900"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  timeRange === "month"
                    ? "bg-white text-gray-900"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                Mois
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards “glass” */}
      <div className="grid grid-cols-1 gap-3 px-5 pt-4 sm:grid-cols-3">
        {current.stats.map((s, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-gray-200/70 bg-white/70 p-3 backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/60"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-xl`}
            />
            <div className="flex items-start justify-between">
              <div
                className={`flex items-center justify-center rounded-lg ${s.chip} p-1.5`}
                title={s.label}
              >
                {React.cloneElement(s.icon as any, { className: "h-4 w-4" })}
              </div>
              {s.change && (
                <span
                  className={`text-[11px] font-semibold ${
                    s.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {s.change}
                </span>
              )}
            </div>
            <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
              {s.value}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{s.label}</div>
            {s.subtext && (
              <div className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-500">
                {s.subtext}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="px-5">
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
          {current.note}
        </div>
      </div>

      {/* Graph */}
      <div className="px-5 py-4">
        <div className="min-w-0" style={{ height: 260 }}>
          <Chart options={options} series={current.series} type="area" height={260} />
        </div>

        {/* Légende custom & info fraîcheur */}
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-emerald-500" />
              Présents
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-violet-500" />
              Inscrits
            </span>
          </div>
          <div className="text-[11px] opacity-80">
            {timeRange === "week"
              ? "Données mises à jour aujourd’hui à 18:00"
              : "Données du mois en cours"}
          </div>
        </div>
      </div>
    </div>
  );
}
