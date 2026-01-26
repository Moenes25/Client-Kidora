// src/components/parametres/SecuritySettings.tsx
import { ShieldCheck } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-white/10">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Paramètres de sécurité</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Mots de passe, 2FA, sessions</p>
        </div>
      </div>

      {/* Contenu à compléter */}
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
        À configurer…
      </div>
    </div>
  );
}
