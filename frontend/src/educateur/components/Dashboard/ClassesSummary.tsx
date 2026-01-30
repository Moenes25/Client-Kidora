import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, UserIcon } from "../../../icons";

const classesData = [
  { id: 1, name: "Class Faracha", level: "(3-4) ans", totalChildren: 12, present: 10, activities: 2, teacher: "Mme. Dupont" },
  { id: 2, name: "Suite E5",     level: "(6-7) ans", totalChildren: 21, present: 18, activities: 3, teacher: "M. Martin" },
  { id: 3, name: "Class Papillon",level: "12 ans",    totalChildren: 15, present: 14, activities: 2, teacher: "Mme. Leroy" },
  { id: 4, name: "Class Soleil",  level: "(8-9) ans", totalChildren: 25, present: 23, activities: 4, teacher: "M. Bernard" },
];

export default function ClassesSummary() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const pct = Math.round((selectedClass.present / selectedClass.totalChildren) * 100);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 pt-5 pb-4">
        <h3 className="text-lg font-semibold">Classes actives</h3>
        <p className="text-white/80 text-sm">Vue d’ensemble des groupes et présence</p>
      </div>

      <div className="p-5">
        {/* Sélecteur */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Classe actuelle</label>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">{classesData.length} disponibles</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
              title="Changer de classe"
            >
              <div className="text-left">
                <div className="font-semibold">{selectedClass.name}</div>
                <div className="text-amber-100/90 text-xs mt-0.5">
                  {selectedClass.level} • {selectedClass.teacher}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                  {selectedClass.present}/{selectedClass.totalChildren}
                </div>
                {isExpanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
              </div>
            </button>

            {isExpanded && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                {classesData.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedClass(c); setIsExpanded(false); }}
                    className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${
                      selectedClass.id === c.id ? "bg-amber-50 dark:bg-amber-900/20" : ""
                    }`}
                    title={`Choisir ${c.name}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium dark:text-gray-400">{c.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{c.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                          {c.present}/{c.totalChildren}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">présents</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <KpiBox title="Enfants" value={selectedClass.totalChildren.toString()} tone="blue" />
          <KpiBox
            title="Présents"
            value={`${selectedClass.present} (${pct}%)`}
            tone="green"
          />
          <KpiBox title="Activités" value={selectedClass.activities.toString()} tone="purple" />
        </div>

        {/* Enseignant */}
        <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/30 bg-amber-50/60 dark:bg-amber-900/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full grid place-items-center bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide">Enseignant</p>
              <p className="text-sm font-semibold dark:text-white">{selectedClass.teacher}</p>
              <p className="text-xs text-amber-700/80">Classe: {selectedClass.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiBox({ title, value, tone }:{title:string; value:string; tone:"blue"|"green"|"purple"}) {
  const map:Record<string,string> = {
    blue:"from-blue-50 to-white border-blue-100 dark:from-blue-900/20 dark:to-gray-900 dark:border-blue-800/30",
    green:"from-green-50 to-white border-green-100 dark:from-green-900/20 dark:to-gray-900 dark:border-green-800/30",
    purple:"from-purple-50 to-white border-purple-100 dark:from-purple-900/20 dark:to-gray-900 dark:border-purple-800/30",
  };
  const text:Record<string,string> = {
    blue:"text-blue-700 dark:text-blue-300",
    green:"text-green-700 dark:text-green-300",
    purple:"text-purple-700 dark:text-purple-300",
  };
  const sub:Record<string,string> = {
    blue:"text-blue-600 dark:text-blue-400",
    green:"text-green-600 dark:text-green-400",
    purple:"text-purple-600 dark:text-purple-400",
  };
  return (
    <div className={`p-3 rounded-lg border bg-gradient-to-br ${map[tone]}`}>
      <div className="text-center">
        <div className={`text-xl font-bold ${text[tone]}`}>{value}</div>
        <div className={`text-xs font-medium mt-1 ${sub[tone]}`}>{title}</div>
      </div>
    </div>
  );
}
