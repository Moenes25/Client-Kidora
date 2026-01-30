import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import EtablissementSettings from "../components/parametres/EtablissementSettings";
import SecuritySettings from "../components/parametres/SecuritySettings";
import NotificationSettings from "../components/parametres/NotificationSettings";
import PaymentSettings from "../components/parametres/PaymentSettings";
import {
  Settings as SettingsIcon,
  ShieldCheck,
  BellRing,
  CreditCard,
  LifeBuoy,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type TabId = "etablissement" | "securite" | "notifications" | "paiements";

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState<TabId>("etablissement");

  const tabs: { id: TabId; name: string; icon: JSX.Element; hint?: string }[] = [
    { id: "etablissement", name: "Général",      icon: <SettingsIcon className="h-4 w-4" />, hint: "Nom, horaires, coordonnées" },
    { id: "securite",      name: "Sécurité",     icon: <ShieldCheck className="h-4 w-4" />,  hint: "Mot de passe, 2FA" },
    { id: "notifications", name: "Notifications",icon: <BellRing className="h-4 w-4" />,     hint: "Email, push" },
    { id: "paiements",     name: "Paiements",    icon: <CreditCard className="h-4 w-4" />,   hint: "Méthodes, facturation" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <PageMeta
        title="Paramètres - KI DORA"
        description="Gestion des paramètres de l'établissement"
      />

      {/* Header gradient */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-gray-200/70 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 p-5 shadow-sm dark:border-white/10">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Paramètres</h1>
              <p className="text-xs text-white/90">
                Gérez les informations clés de votre établissement
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20"
              onClick={() => setActiveTab("etablissement")}
            >
              <Sparkles className="h-4 w-4" />
              Actions rapides
            </button>
          </div>
        </div>

        {/* halos décor */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-44 w-44 rounded-full bg-violet-200/10 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "group w-full rounded-xl border px-4 py-3 text-left transition-all",
                      active
                        ? "border-indigo-300 bg-indigo-50/70 ring-2 ring-indigo-500/20 dark:border-indigo-800/40 dark:bg-indigo-900/20"
                        : "border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-gray-800",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "grid h-8 w-8 place-items-center rounded-lg",
                            active
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
                          ].join(" ")}
                        >
                          {tab.icon}
                        </span>
                        <div>
                          <div
                            className={[
                              "text-sm font-semibold",
                              active ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-100",
                            ].join(" ")}
                          >
                            {tab.name}
                          </div>
                          {tab.hint && (
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{tab.hint}</div>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className={[
                          "h-4 w-4 transition-transform",
                          active ? "text-indigo-600 rotate-90" : "text-gray-400 group-hover:translate-x-0.5",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Carte support */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800/60">
              <div className="mb-2 flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-blue-600 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-white/10">
                  <LifeBuoy className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">Support</div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Besoin d’aide&nbsp;? Notre équipe est disponible 7j/7.
              </p>
              <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700">
                Contacter le support
              </button>
            </div>
          </div>
        </aside>

        {/* Contenu */}
        <main className="lg:col-span-3">
          {activeTab === "etablissement" && <EtablissementSettings />}
          {activeTab === "securite" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "paiements" && <PaymentSettings />}
        </main>
      </div>
    </div>
  );
}
