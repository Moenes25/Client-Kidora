// src/components/finance/RecentInvoices.tsx
import { Download, Eye, Mail, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function RecentInvoices() {
  const invoices = [
    { id: "INV-001", parent: "Martin Dubois", child: "Emma", amount: "450 DT", date: "15 Juin 2024", status: "paid" as const },
    { id: "INV-002", parent: "Sophie Bernard", child: "Lucas", amount: "450 DT", date: "10 Juin 2024", status: "paid" as const },
    { id: "INV-003", parent: "Jean Laurent", child: "Chloé", amount: "450 DT", date: "05 Juin 2024", status: "pending" as const },
    { id: "INV-004", parent: "Marie Petit", child: "Hugo", amount: "450 DT", date: "01 Juin 2024", status: "overdue" as const },
  ];

  const pill = {
    paid:   { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", label: "Payée", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    pending:{ bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", label: "En attente", icon: <Clock className="h-3.5 w-3.5" /> },
    overdue:{ bg: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300", label: "En retard", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  } as const;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Factures récentes</h3>
        <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">Voir toutes →</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-gray-700">
              <th className="pb-3">Facture</th>
              <th className="pb-3">Parent / Enfant</th>
              <th className="pb-3">Montant</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/30">
                <td className="py-3">
                  <span className="font-medium text-gray-900 dark:text-white">{inv.id}</span>
                </td>
                <td className="py-3">
                  <div>
                    <p className="text-gray-900 dark:text-white">{inv.parent}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{inv.child}</p>
                  </div>
                </td>
                <td className="py-3 font-medium text-gray-900 dark:text-white">{inv.amount}</td>
                <td className="py-3 text-gray-600 dark:text-gray-400">{inv.date}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${pill[inv.status].bg}`}>
                    {pill[inv.status].icon}
                    {pill[inv.status].label}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-1.5">
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700" title="Voir">
                      <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700" title="Télécharger">
                      <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700" title="Envoyer par e-mail">
                      <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
