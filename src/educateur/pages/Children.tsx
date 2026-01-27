// src/educateur/pages/Children.tsx
import React, { useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import {
  PlusIcon,
  EyeIcon,
  DownloadIcon,
  MailIcon,
  CalenderIcon,
  UserIcon,
  FileIcon,
} from "../../icons";

/* -------------------- Types -------------------- */
interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  dateNaissance: string;
  parentNom: string;
  parentTelephone: string;
  parentEmail: string;
  presence: "present" | "absent" | "retard";
  allergies?: string[];
  notes?: string;
  photo?: string;
  derniereObservation?: string;
  derniereObservationDate?: string;
  activitesPreferees?: string[];
  difficultes?: string[];
  pointsFort?: string[];
}

/* -------------------- Page -------------------- */
export default function ChildrenPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterPresence, setFilterPresence] = useState("all");
  const [sortBy, setSortBy] = useState<"prenom" | "age" | "classe">("prenom");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);

  // Demo data
  const [enfants] = useState<Enfant[]>([
    {
      id: 1,
      nom: "Dubois",
      prenom: "Emma",
      age: 4,
      classe: "(3-4) ans",
      dateNaissance: "2020-03-15",
      parentNom: "Sophie Dubois",
      parentTelephone: "06 12 34 56 78",
      parentEmail: "sophie.dubois@email.com",
      presence: "present",
      allergies: ["Aucune"],
      notes: "Enfant très sociable, aime les activités créatives",
      photo: "/images/3-4_ans/enfant_2.jpg",
      derniereObservation: "A bien participé à l'activité peinture ce matin",
      derniereObservationDate: "2024-01-15",
      activitesPreferees: ["Peinture", "Musique", "Lego"],
      difficultes: ["Concentration après 10h"],
      pointsFort: ["Créativité", "Sociabilité"],
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Lucas",
      age: 6,
      classe: "(6-7) ans",
      dateNaissance: "2018-07-22",
      parentNom: "Thomas Martin",
      parentTelephone: "06 23 45 67 89",
      parentEmail: "thomas.martin@email.com",
      presence: "present",
      allergies: ["Lactose"],
      notes: "Excellente mémoire, curieux",
      photo: "/images/3-4_ans/enfant_7.jpg",
      derniereObservation: "A appris un nouveau mot aujourd'hui",
      derniereObservationDate: "2024-01-15",
      activitesPreferees: ["Construction", "Lecture", "Jeux collectifs"],
      difficultes: ["Tendance à monopoliser la parole"],
      pointsFort: ["Curiosité", "Mémoire"],
    },
    {
      id: 3,
      nom: "Zahra",
      prenom: "Fatima",
      age: 12,
      classe: "12 ans",
      dateNaissance: "2012-11-05",
      parentNom: "Ali Zahra",
      parentTelephone: "06 34 56 78 90",
      parentEmail: "ali.zahra@email.com",
      presence: "present",
      allergies: ["Arachides"],
      notes: "Responsable, aide les plus jeunes",
      photo: "/images/3-4_ans/enfant_15.jpg",
      derniereObservation: "A aidé un plus jeune à résoudre un problème",
      derniereObservationDate: "2024-01-14",
      activitesPreferees: ["Mathématiques", "Dessin", "Responsabilités"],
      difficultes: ["Perfectionniste"],
      pointsFort: ["Responsabilité", "Empathie"],
    },
    {
      id: 4,
      nom: "Alain",
      prenom: "Voussez",
      age: 9,
      classe: "(8-9) ans",
      dateNaissance: "2015-02-28",
      parentNom: "Pierre Alain",
      parentTelephone: "06 45 67 89 01",
      parentEmail: "pierre.alain@email.com",
      presence: "absent",
      allergies: ["Aucune"],
      notes: "Malade cette semaine",
      photo: "/images/3-4_ans/enfant_10.jpg",
    },
    {
      id: 5,
      nom: "Petit",
      prenom: "Chloé",
      age: 4,
      classe: "(3-4) ans",
      dateNaissance: "2020-09-10",
      parentNom: "Marie Petit",
      parentTelephone: "06 56 78 90 12",
      parentEmail: "marie.petit@email.com",
      presence: "present",
      allergies: ["Gluten"],
      notes: "Timide mais très douée en musique",
      photo: "/images/3-4_ans/enfant_5.jpg",
    },
    {
      id: 6,
      nom: "Ali",
      prenom: "Mohamed",
      age: 7,
      classe: "(6-7) ans",
      dateNaissance: "2017-04-18",
      parentNom: "Karim Ali",
      parentTelephone: "06 67 89 01 23",
      parentEmail: "karim.ali@email.com",
      presence: "absent",
      allergies: ["Aucune"],
      notes: "Rendez-vous médical",
      photo: "/images/3-4_ans/enfant_8.jpg",
    },
    {
      id: 7,
      nom: "Bernard",
      prenom: "Léa",
      age: 12,
      classe: "12 ans",
      dateNaissance: "2012-12-12",
      parentNom: "Jacques Bernard",
      parentTelephone: "06 78 90 12 34",
      parentEmail: "jacques.bernard@email.com",
      presence: "present",
      allergies: ["Œufs"],
      notes: "Excellente en mathématiques",
      photo: "/images/3-4_ans/enfant_16.jpg",
    },
    {
      id: 8,
      nom: "Leroy",
      prenom: "Thomas",
      age: 9,
      classe: "(8-9) ans",
      dateNaissance: "2015-06-30",
      parentNom: "Anne Leroy",
      parentTelephone: "06 89 01 23 45",
      parentEmail: "anne.leroy@email.com",
      presence: "retard",
      allergies: ["Aucune"],
      notes: "Arrivé à 9h05 ce matin",
      photo: "/images/3-4_ans/enfant_11.jpg",
    },
    {
      id: 9,
      nom: "Moreau",
      prenom: "Sophie",
      age: 5,
      classe: "(4-5) ans",
      dateNaissance: "2019-01-25",
      parentNom: "Paul Moreau",
      parentTelephone: "06 90 12 34 56",
      parentEmail: "paul.moreau@email.com",
      presence: "present",
      allergies: ["Fruits à coque"],
      notes: "Aime beaucoup la lecture",
      photo: "/images/3-4_ans/enfant_6.jpg",
    },
    {
      id: 10,
      nom: "Blanc",
      prenom: "Hugo",
      age: 7,
      classe: "(6-7) ans",
      dateNaissance: "2017-08-14",
      parentNom: "Claire Blanc",
      parentTelephone: "07 01 23 45 67",
      parentEmail: "claire.blanc@email.com",
      presence: "absent",
      allergies: ["Aucune"],
      notes: "Vacances en famille",
      photo: "/images/3-4_ans/enfant_9.jpg",
    },
  ]);

  /* -------------------- Dérivés -------------------- */
  const classes = useMemo(
    () => ["all", ...Array.from(new Set(enfants.map((e) => e.classe)))],
    [enfants]
  );

  const filteredEnfants = useMemo(() => {
    const list = enfants.filter((enfant) => {
      const q =
        enfant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enfant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enfant.classe.toLowerCase().includes(searchTerm.toLowerCase());
      const c = filterClass === "all" || enfant.classe === filterClass;
      const p = filterPresence === "all" || enfant.presence === filterPresence;
      return q && c && p;
    });
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "prenom") return a.prenom.localeCompare(b.prenom);
      if (sortBy === "age") return a.age - b.age;
      return a.classe.localeCompare(b.classe);
    });
    return sorted;
  }, [enfants, searchTerm, filterClass, filterPresence, sortBy]);

  const presentCount = enfants.filter((e) => e.presence === "present").length;
  const absentCount = enfants.filter((e) => e.presence === "absent").length;
  const retardCount = enfants.filter((e) => e.presence === "retard").length;

  /* -------------------- Utils -------------------- */
  const exportCSV = () => {
    const headers = [
      "id",
      "prenom",
      "nom",
      "age",
      "classe",
      "dateNaissance",
      "presence",
      "parentNom",
      "parentTelephone",
      "parentEmail",
    ];
    const rows = filteredEnfants.map((e) =>
      [
        e.id,
        e.prenom,
        e.nom,
        e.age,
        e.classe,
        e.dateNaissance,
        e.presence,
        e.parentNom,
        `"${e.parentTelephone}"`,
        e.parentEmail,
      ].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enfants.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* -------------------- Render -------------------- */
  return (
    <>
      <PageMeta
        title="Liste des Enfants | Système de Gestion"
        description="Consultez les informations détaillées des enfants, leurs progrès et observations"
      />

      {/* HERO créatif */}
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl"
        />
        <div className="relative z-10 p-6">
          <h1 className="text-2xl font-bold tracking-tight">Enfants 👧🧒</h1>
          <p className="mt-1 text-white/90">
            Recherchez, filtrez et consultez les profils en un clin d’œil.
          </p>
       <div className="mt-4 grid max-w-fullgrid-cols-1 gap-3 sm:grid-cols-3">
  <StatGlass icon={<span>✅</span>} label="Présents" value={presentCount} tone="green" />
  <StatGlass icon={<span>❌</span>} label="Absents" value={absentCount} tone="rose" />
  <StatGlass icon={<span>⏳</span>} label="En retard" value={retardCount} tone="amber" />
</div>

        </div>
      </section>

      {/* Filtres sticky */}
      <div className="sticky top-2 z-[5] mb-6 rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou classe…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>
            </div>

            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">Toutes les classes</option>
              {classes
                .filter((c) => c !== "all")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>

            <select
              value={filterPresence}
              onChange={(e) => setFilterPresence(e.target.value)}
              className="dark:text-white rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="all">Tous statuts</option>
              <option value="present">Présents</option>
              <option value="absent">Absents</option>
              <option value="retard">En retard</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="dark:text-white rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="prenom">Trier par prénom</option>
              <option value="age">Trier par âge</option>
              <option value="classe">Trier par classe</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Liste
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Grille
              </button>
            </div>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <DownloadIcon className="size-5" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      {viewMode === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-500 to-violet-600">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Enfant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Âge/Classe</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Contact parents</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Dernière observation</th>
                  <th className="py-3 px-25 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredEnfants.map((enfant) => (
                  <tr
                    key={enfant.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {/* Enfant */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar enfant={enfant} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="truncate font-medium text-gray-900 dark:text-white">
                              {enfant.prenom} {enfant.nom}
                            </div>
                            <PresenceChip presence={enfant.presence} />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {enfant.allergies?.join(", ") || "Aucune allergie"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Age/Classe */}
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {enfant.age} ans
                      </div>
                      <ClasseBadge classe={enfant.classe} />
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {enfant.parentNom}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          {enfant.parentTelephone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MailIcon className="size-3" />
                          {enfant.parentEmail}
                        </div>
                      </div>
                    </td>

                    {/* Observation */}
                    <td className="px-4 py-4">
                      <div className="max-w-xs">
                        <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                          {enfant.derniereObservation || "Aucune observation récente"}
                        </div>
                        {enfant.derniereObservationDate && (
                          <div className="mt-1 text-xs text-gray-500">
                            <CalenderIcon className="mr-1 inline size-3" />
                            {new Date(
                              enfant.derniereObservationDate
                            ).toLocaleDateString("fr-FR")}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEnfant(enfant)}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                        >
                          <EyeIcon className="size-4" />
                          Voir profil
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          title="Contacter les parents"
                        >
                          <MailIcon className="size-4" />
                          Contacter
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEnfants.length === 0 && (
              <div className="px-6 py-12 text-center">
                <UserIcon className="mx-auto mb-3 size-12 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun enfant trouvé avec ces critères
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterClass("all");
                    setFilterPresence("all");
                  }}
                  className="mt-2 text-blue-600 hover:underline dark:text-blue-400"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Grille
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEnfants.map((enfant) => (
            <div
              key={enfant.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar enfant={enfant} size="lg" ring />
                  <div
                    className={`absolute -bottom-2 -right-2 grid h-6 w-6 place-items-center rounded-full border-2 border-white text-[10px] font-bold dark:border-gray-800 ${
                      enfant.presence === "present"
                        ? "bg-green-500 text-white"
                        : enfant.presence === "absent"
                        ? "bg-rose-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                    title={enfant.presence === "present" ? "Présent" : enfant.presence === "absent" ? "Absent" : "En retard"}
                  >
                    {enfant.presence === "present" ? "✓" : enfant.presence === "absent" ? "✗" : "•"}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {enfant.prenom} {enfant.nom}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {enfant.age} ans
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
                  <ClasseBadge classe={enfant.classe} />
                </div>

                <div className="mt-4 w-full text-left">
                  {!!enfant.pointsFort?.length && (
                    <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <strong>Points forts :</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {enfant.pointsFort.slice(0, 3).map((p, i) => (
                          <span
                            key={i}
                            className="rounded px-2 py-0.5 text-xs text-green-700 ring-1 ring-green-200 dark:text-green-300 dark:ring-green-900/40"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {!!enfant.activitesPreferees?.length && (
                    <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <strong>Activités préférées :</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {enfant.activitesPreferees.slice(0, 3).map((a, i) => (
                          <span
                            key={i}
                            className="rounded px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200 dark:text-blue-300 dark:ring-blue-900/40"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 w-full border-t border-gray-200 pt-4 dark:border-gray-800">
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => setSelectedEnfant(enfant)}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Voir profil
                    </button>
                    <button
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      title="Contacter parents"
                    >
                      <MailIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredEnfants.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Aucun enfant à afficher.
            </div>
          )}
        </div>
      )}

      {/* Modal profil enfant */}
      {selectedEnfant && (
        <ProfileModal enfant={selectedEnfant} onClose={() => setSelectedEnfant(null)} />
      )}
    </>
  );
}

/* -------------------- Petits composants -------------------- */

function StatGlass({
  icon,
  label,
  value,
  tone = "indigo",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone?: "green" | "rose" | "amber" | "indigo";
}) {
  const rings: Record<string, string> = {
    green: "ring-green-300/50 dark:ring-green-400/20",
    rose: "ring-rose-300/50 dark:ring-rose-400/20",
    amber: "ring-amber-300/50 dark:ring-amber-400/20",
    indigo: "ring-indigo-300/50 dark:ring-indigo-400/20",
  };
  return (
    <div className={`rounded-2xl bg-white/10 px-4 py-3 backdrop-blur ring-1 ${rings[tone]} shadow-[inset_0_1px_0_rgba(255,255,255,.2)]`}>
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs/5 text-white/80">{label}</div>
          <div className="text-lg font-extrabold tracking-tight text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}


function PresenceChip({ presence }: { presence: Enfant["presence"] }) {
  const map = {
    present: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    absent: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    retard: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  } as const;
  const label = presence === "present" ? "Présent" : presence === "absent" ? "Absent" : "En retard";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${map[presence]}`}>
      {label}
    </span>
  );
}

function ClasseBadge({ classe }: { classe: string }) {
  const cls =
    classe.includes("3-4")
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      : classe.includes("4-5")
      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
      : classe.includes("6-7")
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : classe.includes("8-9")
      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
  return (
    <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {classe}
    </span>
  );
}

function Avatar({
  enfant,
  size = "md",
  ring = false,
}: {
  enfant: Enfant;
  size?: "md" | "lg";
  ring?: boolean;
}) {
  const dim = size === "lg" ? "h-20 w-20" : "h-12 w-12";
  return (
    <div
      className={`${dim} overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${
        ring ? "ring-4 ring-white dark:ring-gray-800" : ""
      }`}
    >
      {enfant.photo ? (
        <img
          src={enfant.photo}
          alt={`${enfant.prenom} ${enfant.nom}`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {enfant.prenom[0]}
            {enfant.nom[0]}
          </span>
        </div>
      )}
    </div>
  );
}

/* -------------------- Modal Profil -------------------- */
function ProfileModal({
  enfant,
  onClose,
}: {
  enfant: Enfant;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-4 w-full max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-4 text-white dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar enfant={enfant} />
              <div>
                <div className="text-lg font-semibold">
                  {enfant.prenom} {enfant.nom}
                </div>
                <div className="text-xs opacity-90">
                  Né(e) le {new Date(enfant.dateNaissance).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-3">
              <Field label="Âge">
                <span className="font-medium dark:text-white">{enfant.age} ans</span>
              </Field>
              <Field label="Classe">
                <ClasseBadge classe={enfant.classe} />
              </Field>
              <Field label="Statut">
                <PresenceChip presence={enfant.presence} />
              </Field>

              <Field label="Allergies">
                <div className="flex flex-wrap gap-1">
                  {(enfant.allergies?.length ? enfant.allergies : ["Aucune"]).map((a, i) => (
                    <span
                      key={i}
                      className="rounded px-2 py-0.5 text-xs text-amber-700 ring-1 ring-amber-200 dark:text-amber-300 dark:ring-amber-900/40"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Field>

              <Field label="Notes">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {enfant.notes || "—"}
                </div>
              </Field>
            </div>

            <div className="space-y-3">
              <Field label="Parent">
                <div className="text-sm font-medium dark:text-white">{enfant.parentNom}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  📞 {enfant.parentTelephone}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  ✉️ {enfant.parentEmail}
                </div>
              </Field>

              <Field label="Dernière observation">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {enfant.derniereObservation || "Aucune"}
                </div>
                {enfant.derniereObservationDate && (
                  <div className="text-xs text-gray-500">
                    <CalenderIcon className="mr-1 inline size-3" />
                    {new Date(enfant.derniereObservationDate).toLocaleDateString("fr-FR")}
                  </div>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <ActionBtn label="Envoyer un mail" icon={<MailIcon className="size-4" />} />
                <ActionBtn label="Exporter fiche" icon={<FileIcon className="size-4" />} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Fermer
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
              Nouvelle observation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-800">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </div>
      {children}
    </div>
  );
}

function ActionBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
      {icon}
      {label}
    </button>
  );
}
