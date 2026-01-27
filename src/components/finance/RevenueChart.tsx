// src/components/finance/RevenueChart.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LineChart,
} from "lucide-react";

type Range = "monthly" | "yearly";

type Serie = {
  labels: string[];
  values: number[];
  total: string;
  change: string;
  trend: "up" | "down";
};

const CHART_COLORS = {
  line: "#3b82f6", // blue-500
  areaFrom: "rgba(59,130,246,0.18)",
  areaTo: "rgba(99,102,241,0.05)", // indigo-500 low alpha
  avg: "#10b981", // emerald-500
  grid: "rgba(148,163,184,0.35)", // slate-400-ish
  point: "#1d4ed8", // blue-700
  forecast: "#64748b", // slate-500
};

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState<Range>("monthly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const revenueData: Record<Range, Serie> = useMemo(
    () => ({
      monthly: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"],
        values: [12000, 12500, 11800, 12450, 13000, 12800, 13500],
        total: "88 000 DT",
        change: "+12,5%",
        trend: "up",
      },
      yearly: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        values: [98000, 112000, 125000, 138000, 155000],
        total: "155 000 DT",
        change: "+12,3%",
        trend: "up",
      },
    }),
    []
  );

  const current = revenueData[timeRange];
  const maxVal = useMemo(() => Math.max(...current.values), [current]);
  const minVal = useMemo(() => Math.min(...current.values), [current]);
  const avg = useMemo(
    () => current.values.reduce((a, b) => a + b, 0) / current.values.length,
    [current]
  );

  // ——— Prévision simple (extrapolation linéaire rapide) ———
  const forecast = useMemo(() => {
    const v = current.values;
    if (v.length < 2) return null;
    const last = v[v.length - 1];
    const prev = v[v.length - 2];
    // delta adouci
    const delta = (last - prev) * 0.8;
    return Math.max(0, Math.round(last + delta));
  }, [current]);

  // ——— Dimensions du graphe ———
  const W = 820; // width SVG
  const H = 280; // height SVG
  const P = { t: 12, r: 16, b: 32, l: 36 }; // padding
  const CH = H - P.t - P.b; // chart height
  const CW = W - P.l - P.r; // chart width

  const domainMax = Math.max(maxVal, forecast ?? 0);
  const yScale = (v: number) =>
    P.t + CH - (CH * (v - 0)) / (domainMax === 0 ? 1 : domainMax);

  const xCount = current.values.length;
  const xStep = CW / Math.max(1, xCount - 1);
  const xScale = (i: number) => P.l + i * xStep;

  // ——— Path lissé (Bezier) ———
  const linePath = useMemo(() => {
    const pts = current.values.map((v, i) => [xScale(i), yScale(v)] as const);
    if (pts.length === 0) return "";
    const d: string[] = [];
    d.push(`M ${pts[0][0]},${pts[0][1]}`);
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      // courbe douce (cubic Bezier) via points de contrôle centraux
      d.push(`C ${cx},${y0} ${cx},${y1} ${x1},${y1}`);
    }
    return d.join(" ");
  }, [current.values]);

  const areaPath = useMemo(() => {
    if (!linePath) return "";
    const lastX = xScale(current.values.length - 1);
    const baseY = yScale(0);
    return `${linePath} L ${lastX},${baseY} L ${xScale(0)},${baseY} Z`;
  }, [linePath, current.values.length]);

  // ——— Export CSV ———
  const onExport = () => {
    const rows = [["Période", "Valeur (DT)"], ...current.labels.map((l, i) => [l, String(current.values[i])])];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      timeRange === "monthly" ? "revenus_mensuels.csv" : "revenus_annuels.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ——— Interaction souris ———
  const svgRef = useRef<SVGSVGElement | null>(null);
  const handleMove = (evt: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = evt.clientX - rect.left - P.l;
    const idx = Math.round(x / xStep);
    if (idx >= 0 && idx < current.values.length) setHoverIndex(idx);
    else setHoverIndex(null);
  };

  const handleLeave = () => setHoverIndex(null);

  // ——— Stats header ———
  const trendUp = current.trend === "up";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      {/* header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-100 text-blue-600 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-white/10">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution des revenus
            </h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Analyse des revenus par période
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="tablist"
            aria-label="Plage de temps"
            className="flex rounded-lg bg-gray-100 p-1 backdrop-blur-sm dark:bg-gray-700/50"
          >
            {(["monthly", "yearly"] as const).map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={timeRange === r}
                className={[
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500",
                  timeRange === r
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600/50",
                ].join(" ")}
                onClick={() => setTimeRange(r)}
              >
                {r === "monthly" ? "Mensuel" : "Annuel"}
              </button>
            ))}
          </div>

          <button
            onClick={onExport}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Exporter en CSV"
          >
            <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* stats top */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                Total
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {current.total}
              </p>
            </div>
            <div
              className={[
                "flex items-center gap-1 rounded-full px-2 py-1 text-sm",
                trendUp
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
              ].join(" ")}
            >
              {trendUp ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {current.change}
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400">
            Moyenne
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {avg.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} DT
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400">
            Période
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {timeRange === "monthly" ? "7 mois" : "5 ans"}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="relative mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white/60 p-3 dark:border-white/10 dark:bg-gray-900/40">
        {/* petite barre titre/legend */}
        <div className="mb-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>
              Revenus {timeRange === "monthly" ? "mensuels" : "annuels"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
            <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS.line }} />
            <span>valeurs</span>
            <div className="ml-3 h-2 w-2 rounded-full" style={{ background: CHART_COLORS.avg }} />
            <span>moyenne</span>
          </div>
        </div>

        <svg
          ref={svgRef}
          role="img"
          aria-label="Graphique des revenus"
          width="100%"
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="block w-full"
        >
          {/* gradient area */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.areaFrom} />
              <stop offset="100%" stopColor={CHART_COLORS.areaTo} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid horizontale */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
            const y = P.t + CH * (1 - p);
            return (
              <line
                key={i}
                x1={P.l}
                y1={y}
                x2={W - P.r}
                y2={y}
                stroke={CHART_COLORS.grid}
                strokeDasharray={i === 0 ? "0" : "2,4"}
                strokeWidth={i === 0 ? 1.2 : 1}
              />
            );
          })}

          {/* aire + ligne */}
          {areaPath && (
            <path d={areaPath} fill="url(#areaGrad)" opacity={1} />
          )}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={CHART_COLORS.line}
              strokeWidth={2.5}
              filter="url(#glow)"
            />
          )}

          {/* moyenne */}
          <line
            x1={P.l}
            y1={yScale(avg)}
            x2={W - P.r}
            y2={yScale(avg)}
            stroke={CHART_COLORS.avg}
            strokeDasharray="5,5"
            strokeWidth={1.5}
            opacity={0.9}
          />

          {/* points */}
          {current.values.map((v, i) => {
            const x = xScale(i);
            const y = yScale(v);
            const isMax = v === maxVal;
            const isMin = v === minVal;
            const active = hoverIndex === i;
            return (
              <g key={i}>
                {/* zone hover verticale */}
                <rect
                  x={x - xStep / 2}
                  y={P.t}
                  width={xStep}
                  height={CH}
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(i)}
                />
                {/* tige */}
                {active && (
                  <line
                    x1={x}
                    y1={P.t}
                    x2={x}
                    y2={P.t + CH}
                    stroke="rgba(99,102,241,0.35)"
                    strokeDasharray="3,4"
                  />
                )}
                {/* point */}
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 4.5 : 3.5}
                  fill={CHART_COLORS.point}
                  stroke="white"
                  strokeWidth={1.5}
                />
                {/* badge max/min (petit) */}
                {(isMax || isMin) && (
                  <g transform={`translate(${x - 16}, ${y - 26})`}>
                    <rect
                      rx="8"
                      ry="8"
                      width="32"
                      height="16"
                      fill={isMax ? "#22c55e" : "#ef4444"}
                      opacity="0.9"
                    />
                    <text
                      x="16"
                      y="11"
                      fontSize="10"
                      textAnchor="middle"
                      fill="white"
                    >
                      {isMax ? "MAX" : "MIN"}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* forecast (point fantôme + ligne pointillée) */}
          {forecast && (
            <>
              <line
                x1={xScale(current.values.length - 1)}
                y1={yScale(current.values[current.values.length - 1])}
                x2={xScale(current.values.length - 1) + xStep}
                y2={yScale(forecast)}
                stroke={CHART_COLORS.forecast}
                strokeDasharray="4,4"
                strokeWidth={1.5}
              />
              <circle
                cx={xScale(current.values.length - 1) + xStep}
                cy={yScale(forecast)}
                r={4}
                fill="#fff"
                stroke={CHART_COLORS.forecast}
                strokeWidth={2}
              />
            </>
          )}
        </svg>

        {/* tooltip flottant */}
        {hoverIndex !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md dark:border-white/10 dark:bg-gray-800"
            style={{
              left: `${((hoverIndex) / (xCount - 1)) * 100}%`,
              top: 36,
            }}
          >
            <div className="font-semibold text-gray-900 dark:text-white">
              {current.values[hoverIndex].toLocaleString("fr-FR")} DT
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {current.labels[hoverIndex]}
            </div>
          </div>
        )}
      </div>

      {/* footer résumé */}
      <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-4 dark:border-gray-700 md:grid-cols-2">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Résumé des performances
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Plus haut :</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {maxVal.toLocaleString("fr-FR")} DT
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Plus bas :</span>
              <span className="font-medium text-rose-600 dark:text-rose-400">
                {minVal.toLocaleString("fr-FR")} DT
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Croissance :</span>
              <span
                className={[
                  "flex items-center gap-1 font-medium",
                  trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                ].join(" ")}
              >
                {trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {current.change}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Navigation rapide
          </h4>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setTimeRange((p) => (p === "monthly" ? "yearly" : "monthly"))}
            >
              <ChevronLeft className="h-4 w-4" />
              Basculer
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {timeRange === "monthly"
                ? "Tendance mensuelle des revenus"
                : "Évolution annuelle sur 5 ans"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
