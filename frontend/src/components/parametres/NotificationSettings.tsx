// src/components/parametres/NotificationSettings.tsx
import { BellRing } from "lucide-react";

export default function NotificationSettings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-white/10">
          <BellRing className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Paramètres de notifications</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Email, push, résumé hebdomadaire</p>
        </div>
      </div>

      {/* Ajoute ici tes toggles/switchs */}
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
        À configurer…
      </div>
    </div>
  );
}
