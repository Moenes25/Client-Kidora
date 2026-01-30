import { FileText } from "lucide-react";

export default function RapportsMetrics() {
  const totalRapports = 156;
  const rapportsThisMonth = 28;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-600 to-teal-600 p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* motif diagonale doux */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_40%,transparent_40%),linear-gradient(transparent,transparent)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/30">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white">PDF prêts</span>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold tracking-tight text-white">{totalRapports}</h3>
            <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold text-white">+12%</span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-emerald-50/90">Rapports générés</p>
        </div>
   <div className="mt-4 h-px w-full bg-white/25" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur">
            <div className="font-semibold">Ce mois</div>
            <div className="text-lg font-extrabold">{rapportsThisMonth}</div>
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur">
            <div className="font-semibold">Cette semaine</div>
            <div className="text-lg font-extrabold">22</div>
          </div>
        </div>
      </div>
    </div>
  );
}
