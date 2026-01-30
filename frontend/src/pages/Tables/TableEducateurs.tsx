import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import GestionEducateurs from "../../components/tables/Educateurs/GestionEducateurs";
import { Users } from "lucide-react";

export default function TableEducateurs() {
  return (
    <>
      <PageMeta
        title="Éducateurs • KI DORA"
        description="Gestion créative des éducateurs avec recherche, filtres et actions rapides"
      />

      {/* Bandeau créatif */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-200/40 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow">
        <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 top-2 h-28 w-28 rounded-full bg-fuchsia-400/40 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-xl font-extrabold tracking-tight">Gestion des éducateurs</h1>
          <p className="mt-1 text-sm text-white/90">Recherchez, filtrez, sélectionnez et agissez en un clic.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/15 px-2 py-1 backdrop-blur">Sélection multiple</span>
            <span className="rounded-full bg-white/15 px-2 py-1 backdrop-blur">Actions groupées</span>
            <span className="rounded-full bg-white/15 px-2 py-1 backdrop-blur">Modales détaillées</span>
          </div>
        </div>
      </div>

      <ComponentCard
        title="Éducateurs"
        counterLabel="éducateurs"
        counterValue="8"
        icon={<Users className="h-5 w-5" />}
        className="backdrop-blur bg-white/70 dark:bg-white/[0.03]"
      >
        <GestionEducateurs />
      </ComponentCard>
    </>
  );
}
