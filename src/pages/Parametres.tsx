import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import EtablissementSettings from "../components/parametres/EtablissementSettings";
import SecuritySettings from "../components/parametres/SecuritySettings";
import NotificationSettings from "../components/parametres/NotificationSettings";
import PaymentSettings from "../components/parametres/PaymentSettings";
import { SettingsIcon } from "lucide-react";

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("etablissement");

  const tabs = [
    { id: "etablissement", name: "Général", icon: <SettingsIcon/> },
    { id: "securite", name: "Sécurité", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "paiements", name: "Paiements", icon: "💳" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <PageMeta 
        title="Paramètres - KI DORA"
        description="Gestion des paramètres de l'établissement"
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Paramètres
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez les paramètres de votre établissement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar avec onglets */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Besoin d'aide ? Contactez notre support.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                Contacter le support
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {activeTab === "etablissement" && <EtablissementSettings />}
          {activeTab === "securite" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "paiements" && <PaymentSettings />}
        </div>
      </div>
    </div>
  );
}