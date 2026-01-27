// src/pages/FinancePage.tsx
import PageMeta from "../components/common/PageMeta";
import FinancialOverview from "../components/finance/FinancialOverview";
import RevenueChart from "../components/finance/RevenueChart";
import RecentInvoices from "../components/finance/RecentInvoices";
import PaymentStatus from "../components/finance/PaymentStatus";
import { Download, Plus, Filter, RefreshCw } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="container mx-auto px-4 pt-2 pb-6">
      <PageMeta
        title="Gestion Financière - KI DORA"
        description="Tableau de bord financier et gestion des paiements"
      />

      {/* Header créatif */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-5 py-6 text-white shadow-lg dark:border-white/10">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight">Finance</h1>
            <p className="text-sm/relaxed text-white/85">
              Gestion financière et suivi des paiements
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 ring-1 ring-white/25 backdrop-blur">
              <Filter className="h-4 w-4" />
              <select className="bg-transparent text-xs font-semibold outline-none">
                <option className="text-black">Ce mois</option>
                <option className="text-black">Le mois dernier</option>
                <option className="text-black">Ce trimestre</option>
                <option className="text-black">Cette année</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold ring-1 ring-white/25 hover:bg-white/25">
               <Plus className="h-4 w-4" />
                Nouvelle facture
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 text-xs font-semibold ring-1 ring-white/25 hover:bg-white/25">
                <RefreshCw className="h-4 w-4" />
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu financier */}
      <div className="mb-5">
        <FinancialOverview />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <PaymentStatus />
        </div>
      </div>

      <div className="mt-5">
        <RecentInvoices />
      </div>
    </div>
  );
}
