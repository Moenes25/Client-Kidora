import PageMeta from "../components/common/PageMeta";
 import FinancialOverview from "../components/finance/FinancialOverview";
import RevenueChart from "../components/finance/RevenueChart";
import RecentInvoices from "../components/finance/RecentInvoices";
import PaymentStatus from "../components/finance/PaymentStatus";
import { Download } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="container mx-auto px-4 pt-2 pb-4">
      <PageMeta 
        title="Gestion Financière - KI DORA"
        description="Tableau de bord financier et gestion des paiements"
      />
      
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Finance</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestion financière et suivi des paiements
          </p>
        </div>
        
        <div className="flex gap-3">
    <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 font-medium transition-colors">
     <div className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Exporter
      </div>
      </button>
      <button className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle facture
        </div>
      </button>
    </div>
      </div>

      {/* Aperçu financier */}
      <div className="mb-4">
        <FinancialOverview  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
      <div className="mt-4">
        <RecentInvoices />
      </div>
    </div>
  );
}