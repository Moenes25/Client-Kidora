import PageMeta from "../../components/common/PageMeta";
import ParentMetrics from "../../components/ecommerce/ParentMetrics";
import ChildrenTotalMetrics from "../../components/ecommerce/ChildrenTotalMetrics";
import AttendanceChart from "../../components/ecommerce/AttendanceChart";
import FinancialOverview from "../../components/ecommerce/FinancialOverview";
import RecentActivities from "../../components/ecommerce/RecentActivities";
import EducatorList from "../../components/ecommerce/EducatorList";
import ParentCommunications from "../../components/ecommerce/ParentCommunications";
import EducateursMetrics from "../../components/ecommerce/EducateursMetrics";
import RapportsMetrics from "../../components/ecommerce/RapportsMetrics";

export default function NurseryDashboard() {
  return (
    <>
    <PageMeta
        title="Tableau de Bord KI DORA - Gestion Crèche/École"
        description="Système de gestion pour crèche et école maternelle KI DORA"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Première ligne : 4 cartes sur toute la largeur */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ChildrenTotalMetrics />
            <EducateursMetrics />
            <RapportsMetrics />
            <ParentMetrics />
          </div>
        </div>

        {/* Deuxième ligne : AttendanceChart et RecentActivities avec hauteur égale */}
        <div className="col-span-12 lg:col-span-8">
          <div className="h-full">
            <AttendanceChart />
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4">
          <div className="h-full">
            <RecentActivities />
          </div>
        </div>

        {/* Troisième ligne : 3 cartes avec hauteur égale */}
        <div className="col-span-12 lg:col-span-4">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <FinancialOverview />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <EducatorList />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <ParentCommunications />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
