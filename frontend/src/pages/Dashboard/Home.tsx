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
       {/* --- fond créatif (blobs) --- */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />
      </div>

      {/* --- HERO --- */}
      <section className="relative z-[1] mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="relative z-10 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Bienvenue sur KI DORA ✨</h1>
              <p className="mt-1 text-white/90">
                Suivez les présences, activités, rapports et échanges avec les parents.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-xl bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/25">
                Export mensuel
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
                Planning
              </button>
            </div>
          </div>
        </div>
      </section>


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
        <div className="col-span-12 lg:col-span-7">
          <div className="h-full">
            <AttendanceChart />
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-5">
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
