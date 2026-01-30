// Home.tsx - Version complète avec QuickAccess
import PageMeta from "../../components/common/PageMeta";
import QuickAccess from "../../components/ecommerce/QuickAccess";
import ChildMetrics from "../../components/ecommerce/ChildMetrics";
import ParentMetrics from "../../components/ecommerce/ParentMetrics";
import ChildrenTotalMetrics from "../../components/ecommerce/ChildrenTotalMetrics";
import AttendanceChart from "../../components/ecommerce/AttendanceChart";
import FinancialOverview from "../../components/ecommerce/FinancialOverview";
import RecentActivities from "../../components/ecommerce/RecentActivities";
import EducatorList from "../../components/ecommerce/EducatorList";
import ParentCommunications from "../../components/ecommerce/ParentCommunications";

export default function NurseryDashboard() {
  return (
    <>
      <PageMeta
        title="Tableau de Bord KI DORA - Gestion Crèche/École"
        description="Système de gestion pour crèche et école maternelle KI DORA"
      />
      
      {/* Section Accès Rapide */}
      <QuickAccess />

      {/* Métriques principales - 3 cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ChildMetrics />
        <ParentMetrics />
        <ChildrenTotalMetrics />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Graphique de présence */}
        <div className="col-span-12 lg:col-span-8">
          <AttendanceChart />
        </div>

        {/* Sidebar avec informations */}
        <div className="col-span-12 lg:col-span-4">
          <FinancialOverview />
          <EducatorList />
        </div>

        {/* Liste récente et communications */}
        <div className="col-span-12 lg:col-span-7">
          <RecentActivities />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <ParentCommunications />
        </div>
      </div>
    </>
  );
}
