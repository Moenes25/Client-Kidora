export default function ChildrenTotalMetrics() {
  const chips = [
    { label: "18 Petits" },
    { label: "16 Moyens" },
    { label: "14 Grands" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-500 to-teal-600 p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* blobs déco */}
      <span className="pointer-events-none absolute -top-10 -right-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-8 -left-10 h-28 w-28 rounded-full bg-emerald-300/30 blur-2xl" />

      {/* icône dans un médaillon */}
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/30">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>

        <span className="rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          mise à jour • 2min
        </span>
      </div>

      {/* chiffres */}
      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">48</h3>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-50">
            +5 ce mois
          </span>
        </div>
        <p className="mt-0.5 text-xs font-medium text-emerald-50/90">Enfants inscrits</p>
      </div>

      {/* séparation douce */}
      <div className="mt-4 h-px w-full bg-white/25" />

      {/* chips par classe */}
      <div className="mt-3">
        <span className="text-[11px] font-medium text-emerald-50/90">Par classe</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c.label}
              className="rounded-lg bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm"
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
