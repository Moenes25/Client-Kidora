export default function EducateursMetrics() {
  const educators = [
    { id: 1, name: "Marie", avatar: "/images/3-4_ans/educatrice_1.jpg" },
    { id: 2, name: "Jean", avatar: "/images/user/user-35.jpg" },
    { id: 3, name: "Sophie", avatar: "/images/user/user-03.jpg" },
    { id: 4, name: "Luc", avatar: "/images/user/user-05.jpg" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* accent néon */}
      <span className="pointer-events-none absolute -right-10 top-1/4 h-24 w-24 rounded-full bg-fuchsia-300/40 blur-3xl" />

      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/30">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white">aujourd’hui</span>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">8</h3>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold text-white">6 présents</span>
        </div>
        <p className="mt-0.5 text-xs font-medium text-white/80">Éducateurs actifs</p>
      </div>

      <div className="mt-4 h-px w-full bg-white/25" />

      {/* avatars + tag */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {educators.map((e) => (
            <img
              key={e.id}
              src={e.avatar}
              alt={e.name}
              className="h-7 w-7 rounded-full border border-white/50 object-cover"
              onError={(ev) => {
                (ev.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name)}&background=4f46e5&color=fff&size=28`;
              }}
            />
          ))}
        </div>
        <span className="rounded-lg bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white">+4 autres</span>
      </div>
    </div>
  );
}
