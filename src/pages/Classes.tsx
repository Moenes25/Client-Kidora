// src/pages/ClassesPage.tsx
import { useMemo, useState } from "react";
import PageMeta from "../components/common/PageMeta";
import ClassList from "../components/classes/ClassList";
import ClassStatistics from "../components/classes/ClassStatistics";
import ChildrenByClass from "../components/classes/ChildrenByClass";
import AddClassModal from "../components/classes/AddClassModal";
import { Plus, Filter, X } from "lucide-react";

export type ClassInfo = {
  id: string;
  name: string;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  childrenCount: number;
  educator: string;
  capacity?: number;
  occupancyRate?: number;
  lastActivity?: string;
};

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "children" | "rate">("name");

  const classes: ClassInfo[] = [
    { id: "petits", name: "Petits (2-3 ans)", color: "blue",   childrenCount: 18, educator: "Marie Dubois", capacity: 20, lastActivity: "10:30" },
    { id: "moyens", name: "Moyens (3-4 ans)", color: "green",  childrenCount: 16, educator: "Jean Martin", capacity: 20, lastActivity: "Hier" },
    { id: "grands", name: "Grands (4-5 ans)", color: "purple", childrenCount: 14, educator: "Sophie Petit", capacity: 20, lastActivity: "09:15" },
  ];

  const filtered = useMemo(() => {
    let list = classes.filter(c =>
      c.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === "name") list = [...list].sort((a,b)=>a.name.localeCompare(b.name));
    if (sort === "children") list = [...list].sort((a,b)=> (b.childrenCount)-(a.childrenCount));
    if (sort === "rate") {
      list = [...list].sort((a,b)=>{
        const ar = (a.childrenCount/(a.capacity||20));
        const br = (b.childrenCount/(b.capacity||20));
        return br - ar;
      });
    }
    return list;
  }, [classes, query, sort]);

  return (
    <div className="container mx-auto px-4 pt-2 pb-6">
      <PageMeta
        title="Gestion des Classes - KI DORA"
        description="Gestion des classes par âge, capacité et éducateurs"
      />

      {/* Header créatif */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-5 py-6 text-white shadow-lg dark:border-white/10">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-[1] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight">Classes</h1>
            <p className="text-sm/relaxed text-white/85">
              Organisez vos groupes, suivez l’occupation et les éducateurs
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur">
              <Filter className="h-4 w-4" />
              <select
                value={sort}
                onChange={e=>setSort(e.target.value as any)}
                className="bg-transparent text-xs font-semibold outline-none"
              >
                <option value="name" className="text-black">Trier: Nom</option>
                <option value="children" className="text-black">Trier: Enfants</option>
                <option value="rate" className="text-black">Trier: Taux</option>
              </select>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur">
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Rechercher une classe…"
                className="w-48 bg-transparent text-xs placeholder-white/70 outline-none"
              />
              {query && (
                <button onClick={()=>setQuery("")} className="opacity-90 hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold ring-1 ring-white/25 hover:bg-white/25"
            >
              <Plus className="h-4 w-4" /> Nouvelle classe
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mb-5">
        <ClassStatistics />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClassList
            classes={filtered}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />
        </div>

        <div className="lg:col-span-1">
          <ChildrenByClass selectedClass={selectedClass} classes={classes} />
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddClassModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(newClassData) => {
            console.log("Nouvelle classe:", newClassData);
            alert(`Classe "${newClassData.className}" créée avec succès !`);
          }}
        />
      )}
    </div>
  );
}
