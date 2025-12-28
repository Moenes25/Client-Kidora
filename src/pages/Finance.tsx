import PageMeta from "../components/common/PageMeta";
 import FinancialOverview from "../components/finance/FinancialOverview";
import RevenueChart from "../components/finance/RevenueChart";
import RecentInvoices from "../components/finance/RecentInvoices";
import PaymentStatus from "../components/finance/PaymentStatus";

export default function FinancePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageMeta 
        title="Gestion Financière - KI DORA"
        description="Tableau de bord financier et gestion des paiements"
      />
      
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Finance</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestion financière et suivi des paiements
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Exporter
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Nouvelle facture
          </button>
        </div>
      </div>

      {/* Aperçu financier */}
      <div className="mb-6">
        <FinancialOverview  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique des revenus */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Statut des paiements */}
        <div className="lg:col-span-1">
          <PaymentStatus />
        </div>
      </div>

      {/* Factures récentes */}
      <div className="mt-6">
        <RecentInvoices />
      </div>
    </div>
  );
}