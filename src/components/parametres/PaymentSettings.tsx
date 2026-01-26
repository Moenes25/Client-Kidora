// src/components/parametres/PaymentSettings.tsx
import { CreditCard } from "lucide-react";

export default function PaymentSettings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-white/10">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Paramètres de paiement</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Méthodes, délais, factures</p>
        </div>
      </div>

      {/* Contenu à compléter */}
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
        À configurer…
      </div>
    </div>
  );
}
