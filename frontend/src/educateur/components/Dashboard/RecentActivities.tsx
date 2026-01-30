import { Bell, FileText, MessageSquare, Sparkles } from "lucide-react";

export default function RecentActivities({ onAjouterObservation }:{ onAjouterObservation?: () => void }) {
  const items = [
    { id: 1, icon: Sparkles, title: "Atelier peinture", note: "Groupe (3-4) ans – très bonne participation", tone: "indigo" },
    { id: 2, icon: FileText, title: "Rapport nutrition", note: "Menus validés pour la semaine", tone: "emerald" },
    { id: 3, icon: MessageSquare, title: "Messages parents", note: "2 nouvelles questions", tone: "amber" },
  ];
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-5 pt-5 pb-4">
        <h3 className="text-lg font-semibold">Dernières activités</h3>
        <p className="text-white/80 text-sm">Ce qui s’est passé récemment</p>
      </div>

      <ul className="p-4 space-y-3">
        {items.map(item => (
          <li key={item.id} className="flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <div className={`h-8 w-8 rounded-full grid place-items-center ${
              item.tone==="indigo" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200" :
              item.tone==="emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200" :
              "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
            }`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold dark:text-white">{item.title}</div>
              <div className="text-xs text-gray-500">{item.note}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 pb-4">
        <button
          onClick={onAjouterObservation}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 inline-flex items-center justify-center gap-2"
          title="Ajouter une observation rapide"
        >
          <Bell className="h-4 w-4" />
          Ajouter une observation
        </button>
      </div>
    </section>
  );
}
