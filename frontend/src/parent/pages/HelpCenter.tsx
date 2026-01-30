import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Search, BookOpen, LifeBuoy, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";

type Faq = { q: string; a: string; tag?: string };

const CATEGORIES = [
  { key: "compte",   label: "Compte & sécurité",   icon: <LifeBuoy className="h-4 w-4" /> },
  { key: "parents",  label: "Espace parent",       icon: <BookOpen className="h-4 w-4" /> },
  { key: "activites",label: "Activités & suivi",    icon: <BookOpen className="h-4 w-4" /> },
] as const;

const FAQS: Record<typeof CATEGORIES[number]["key"], Faq[]> = {
  compte: [
    { q:"Comment changer mon mot de passe ?", a:"Profil → Sécurité → Changer le mot de passe. Un email de confirmation peut être requis." , tag:"sécurité"},
    { q:"Activer l’authentification à 2 facteurs ?", a:"Profil → Sécurité → Authentification à 2 facteurs. Suivez les instructions à l’écran.", tag:"2FA"},
  ],
  parents: [
    { q:"Ajouter un enfant ?", a:"Profil → Informations personnelles → Enfants associés → + Ajouter.", tag:"enfants"},
    { q:"Modifier mes notifications ?", a:"Profil → Préférences de notifications, activez/désactivez selon vos besoins.", tag:"notifications"},
  ],
  activites: [
    { q:"Où voir les évaluations ?", a:"Depuis la page d’un enfant, bouton « Évaluations » ou section « Évaluations rapides ».", tag:"évaluations"},
    { q:"Que signifie la jauge de performance ?", a:"Un indicateur global (0–100) basé sur les domaines Langage, Motricité, Cognition et Social.", tag:"performance"},
  ],
};

export default function HelpCenter() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["key"]>("compte");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const all = Object.entries(FAQS).flatMap(([k, arr]) => arr.map(f => ({...f, _k: k})));
    if (!query.trim()) return FAQS[category];
    const q = query.toLowerCase();
    return all.filter(f =>
      `${f.q} ${f.a} ${f.tag || ""}`.toLowerCase().includes(q)
    );
  }, [category, query]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link to="/parent/profil" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Retour au profil
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Centre d’aide</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Trouvez rapidement des réponses ou contactez le support.
            </p>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Rechercher une question…"
              className="w-[320px] rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Catégories</div>
          <div className="space-y-2">
            {CATEGORIES.map(c => {
              const active = category === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => { setCategory(c.key); setQuery(""); setOpenIdx(0); }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition
                  ${active ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow" :
                    "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-white/10 dark:text-white/80"}`}
                >
                  <span className="inline-flex items-center gap-2">{c.icon}{c.label}</span>
                  {active ? <ChevronRight className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 text-sm dark:from-indigo-900/20 dark:to-cyan-900/20">
            <div className="mb-1 font-semibold text-slate-700 dark:text-slate-200">Besoin d’aide personnalisée ?</div>
            <p className="text-slate-600 dark:text-slate-300">Écris-nous et on te répond vite.</p>
            <Link
              to="/parent/contact"
              className="mt-3 inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
            >
              Contacter le support
            </Link>
          </div>
        </aside>

        {/* FAQ */}
        <section className="lg:col-span-2 space-y-3">
          {list.map((item, i) => {
            const idx = i;
            const open = openIdx === idx;
            return (
              <article
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-white/10 dark:text-white/80">
                      {item.tag || "FAQ"}
                    </span>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.q}</h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
          {list.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-white/10 dark:bg-slate-900">
              <div className="text-4xl">🔎</div>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Aucun résultat pour ta recherche.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
