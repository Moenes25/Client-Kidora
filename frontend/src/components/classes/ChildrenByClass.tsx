// src/components/classes/ChildrenByClass.tsx
import { Users, Calendar, UserCheck } from "lucide-react";


interface ChildrenByClassProps {
  selectedClass: string;
  classes: ClassInfo[];
}
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

  const classes: ClassInfo[] = [
    { id: "petits", name: "Petits (2-3 ans)", color: "blue",   childrenCount: 18, educator: "Marie Dubois", capacity: 20, lastActivity: "10:30" },
    { id: "moyens", name: "Moyens (3-4 ans)", color: "green",  childrenCount: 16, educator: "Jean Martin", capacity: 20, lastActivity: "Hier" },
    { id: "grands", name: "Grands (4-5 ans)", color: "purple", childrenCount: 14, educator: "Sophie Petit", capacity: 20, lastActivity: "09:15" },
  ];
export default function ChildrenByClass({ selectedClass, classes }: ChildrenByClassProps) {
  const childrenData = {
    petits: [
      { id: 1, name: "Emma Martin", age: "2 ans", parent: "Sophie Martin", status: "present" },
      { id: 2, name: "Lucas Dubois", age: "2.5 ans", parent: "Marie Dubois", status: "present" },
      { id: 3, name: "Chloé Bernard", age: "3 ans", parent: "Jean Bernard", status: "absent" },
      { id: 4, name: "Hugo Laurent", age: "2 ans", parent: "Camille Laurent", status: "present" },
    ],
    moyens: [
      { id: 5, name: "Léa Petit", age: "3.5 ans", parent: "Thomas Petit", status: "present" },
      { id: 6, name: "Nathan Roux", age: "4 ans", parent: "Julie Roux", status: "present" },
    ],
    grands: [
      { id: 7, name: "Zoé Moreau", age: "4.5 ans", parent: "Pierre Moreau", status: "present" },
      { id: 8, name: "Maxime Leroy", age: "5 ans", parent: "Sarah Leroy", status: "present" },
    ],
  } as const;

  const selectedClassData = classes.find((cls) => cls.id === selectedClass);
  const children =
    selectedClass === "all" ? [] : (childrenData as any)[selectedClass] || [];

  const color =
    selectedClassData?.color && {
      bg:
        selectedClassData.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" :
        selectedClassData.color === "green" ? "bg-emerald-100 dark:bg-emerald-900/30" :
        selectedClassData.color === "purple" ? "bg-violet-100 dark:bg-violet-900/30" :
        selectedClassData.color === "orange" ? "bg-amber-100 dark:bg-amber-900/30" :
        selectedClassData.color === "pink" ? "bg-pink-100 dark:bg-pink-900/30" :
        "bg-indigo-100 dark:bg-indigo-900/30",
      fg:
        selectedClassData.color === "blue" ? "text-blue-700 dark:text-blue-300" :
        selectedClassData.color === "green" ? "text-emerald-700 dark:text-emerald-300" :
        selectedClassData.color === "purple" ? "text-violet-700 dark:text-violet-300" :
        selectedClassData.color === "orange" ? "text-amber-700 dark:text-amber-300" :
        selectedClassData.color === "pink" ? "text-pink-700 dark:text-pink-300" :
        "text-indigo-700 dark:text-indigo-300",
    };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {selectedClass === "all" ? "Tous les enfants" : `Enfants – ${selectedClassData?.name}`}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {selectedClass === "all" ? "48 enfants au total" : `${children.length} enfants`}
          </p>
        </div>
        {selectedClass !== "all" && selectedClassData && (
          <div className={`rounded-full px-3 py-1 text-sm font-medium ${color?.bg} ${color?.fg}`}>
            {selectedClassData.childrenCount}/{selectedClassData.capacity ?? 20}
          </div>
        )}
      </div>

      {selectedClass === "all" ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-gray-300 p-10 text-center dark:border-white/10">
          <Users className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Sélectionnez une classe pour voir les enfants</p>
        </div>
      ) : (
        <>
          {/* mini stats */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
              <div className="mb-1 flex items-center justify-center gap-1">
                <UserCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {children.filter((c) => c.status === "present").length}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Présents</span>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/20">
              <div className="mb-1 flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedClassData?.childrenCount}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Inscrits</span>
            </div>
            <div className="rounded-lg bg-violet-50 p-3 text-center dark:bg-violet-900/20">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedClassData?.educator.split(" ")[0]}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Éducatrice</span>
            </div>
          </div>

          {/* liste */}
          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "grid h-10 w-10 place-items-center rounded-full font-semibold",
                      child.status === "present"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                    ].join(" ")}
                  >
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{child.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{child.age}</span>•<span>{child.parent}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={[
                      "mx-auto h-2 w-2 rounded-full",
                      child.status === "present" ? "bg-emerald-500" : "bg-rose-500",
                    ].join(" ")}
                  />
                  <span className="mt-1 block text-[11px] text-gray-500 dark:text-gray-400">
                    {child.status === "present" ? "Présent" : "Absent"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-200 pt-4 dark:border-white/10">
            <button className="w-full rounded-lg bg-blue-50 py-2 font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
              Voir tous les enfants →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
