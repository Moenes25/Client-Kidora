// components/ecommerce/ParentMetrics.tsx
export default function ParentMetrics() {
  const total = 38;
  const newThisMonth = 5;
  const growth = 13.2; // %

  // mini spark-bars (juste des <span> flex)
  const bars = [6, 8, 9, 10, 11, 12, 14, 13, 15, 16];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-500 via-rose-500 to-red-500 p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* halos & textures décoratives */}
      <span className="pointer-events-none absolute -top-10 right-8 h-24 w-24 rounded-full bg-white/30 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_55%)]" />

      {/* header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/30">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
          maj • il y a 3 min
        </span>
      </div>

      {/* métrique principale */}
      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">
            {total}
          </h3>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {newThisMonth} nouveaux
          </span>
        </div>
        <p className="mt-0.5 text-xs font-medium text-white/85">
          Parents actifs
        </p>
      </div>

      {/* séparateur doux */}
      <div className="mt-4 h-px w-full bg-white/25" />

      {/* “kpis” rapides */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur">
          <div className="font-semibold">Croissance</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-200">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 17l6-6 4 4 8-8" />
            </svg>
            +{growth}%
          </div>
        </div>

        <div className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur">
          <div className="font-semibold">Conversion</div>
          <div className="mt-1 text-lg font-extrabold">74%</div>
        </div>
      </div>


   
    </div>
  );
}
