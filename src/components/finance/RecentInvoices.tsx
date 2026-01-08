import { Download, Eye, Mail } from "lucide-react";

export default function RecentInvoices() {
  const invoices = [
    { id: "INV-001", parent: "Martin Dubois", child: "Emma", amount: "450 DT", date: "15 Juin 2024", status: "paid" },
    { id: "INV-002", parent: "Sophie Bernard", child: "Lucas", amount: "450 DT", date: "10 Juin 2024", status: "paid" },
    { id: "INV-003", parent: "Jean Laurent", child: "Chloé", amount: "450 DT", date: "05 Juin 2024", status: "pending" },
    { id: "INV-004", parent: "Marie Petit", child: "Hugo", amount: "450 DT", date: "01 Juin 2024", status: "overdue" },
  ];

 const getStatusColor = (status: string) => {
  switch (status) {
    case "paid": return "bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-white";
    case "pending": return "bg-gradient-to-r from-amber-500 to-yellow-600 border-amber-400 text-white";
    case "overdue": return "bg-gradient-to-r from-red-500 to-rose-600 border-red-400 text-white";
  }
};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Factures récentes
        </h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          Voir toutes →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3">Facture</th>
              <th className="pb-3">Parent / Enfant</th>
              <th className="pb-3">Montant</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="py-3">
                  <span className="font-medium text-gray-800 dark:text-white">
                    {invoice.id}
                  </span>
                </td>
                <td className="py-3">
                  <div>
                    <p className="text-gray-800 dark:text-white">{invoice.parent}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.child}</p>
                  </div>
                </td>
                <td className="py-3 font-medium text-gray-800 dark:text-white">
                  {invoice.amount}
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">
                  {invoice.date}
                </td>
                <td className="py-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)} shadow-sm`}>
                    {invoice.status === "paid" ? "Payée" : 
                    invoice.status === "pending" ? "En attente" : "En retard"}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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