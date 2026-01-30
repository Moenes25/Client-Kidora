import { CalendarDays } from "lucide-react";

const days = ["Lun","Mar","Mer","Jeu","Ven"];
const slots = [
  { day: "Lun", time: "09:00", label: "Peinture", color: "bg-rose-100 text-rose-700" },
  { day: "Lun", time: "11:00", label: "Motricité", color: "bg-emerald-100 text-emerald-700" },
  { day: "Mar", time: "10:00", label: "Lecture", color: "bg-indigo-100 text-indigo-700" },
  { day: "Jeu", time: "14:00", label: "Musique", color: "bg-amber-100 text-amber-800" },
  { day: "Ven", time: "09:30", label: "Jeu libre", color: "bg-sky-100 text-sky-700" },
];

export default function WeeklySchedule() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 pt-5 pb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Planning de la semaine</h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-5 gap-3">
          {days.map(d => (
            <div key={d} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
              <div className="text-sm font-semibold mb-2 dark:text-gray-400">{d}</div>
              <div className="space-y-2">
                {slots.filter(s => s.day === d).map((s, i) => (
                  <div key={i} className={`rounded-md px-2 py-1 text-xs ${s.color} border border-black/5`}>
                    <div className="font-semibold">{s.label}</div>
                    <div className="opacity-70">{s.time}</div>
                  </div>
                ))}
                {slots.filter(s => s.day === d).length === 0 && (
                  <div className="text-xs text-gray-400">—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
