// pages/Profil.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router";


const ParentProfil = () => {
  const [parentInfo, setParentInfo] = useState({
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de l'Éducation, 75000 Paris",
    children: ["Lucas", "Emma"],
    notificationPreferences: {
      activities: true,
      reports: true,
      payments: false,
      urgent: true
    },
    subscription: "Premium",
    joinDate: "15/01/2023"
  });

  const [settings, setSettings] = useState({
    language: "fr",
    theme: "auto",
    notifications: true,
    emailUpdates: true
  });

  const [security] = useState({
    lastLogin: "Aujourd'hui, 09:30",
    devices: 2,
    twoFactor: false
  });
   // 👉 applique le thème au chargement et à chaque changement
  useEffect(() => {
    const root = document.documentElement;

    const apply = (mode: "auto"|"light"|"dark") => {
      if (mode === "dark") {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (mode === "light") {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        // auto: suit le système
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
        localStorage.setItem("theme", "auto");
      }
    };

    apply(settings.theme);

    // si "auto", on suit les changements système en live
    let mql: MediaQueryList | null = null;
    if (settings.theme === "auto") {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      mql.addEventListener("change", onChange);
      return () => mql?.removeEventListener("change", onChange);
    }
  }, [settings.theme]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mon Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gérez vos informations personnelles et préférences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Exporter données
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Colonne gauche : Informations personnelles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carte informations personnelles */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informations Personnelles</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={parentInfo.name}
                  onChange={(e) => setParentInfo({...parentInfo, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={parentInfo.email}
                  onChange={(e) => setParentInfo({...parentInfo, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={parentInfo.phone}
                  onChange={(e) => setParentInfo({...parentInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={parentInfo.address}
                  onChange={(e) => setParentInfo({...parentInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enfants associés
              </label>
              <div className="flex flex-wrap gap-2">
                {parentInfo.children.map((child, index) => (
                  <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    {child}
                  </span>
                ))}
                <button className="px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700">
                  + Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* Préférences de notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Préférences de Notifications</h2>
            
            <div className="space-y-4">
              {Object.entries(parentInfo.notificationPreferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white capitalize">
                      {key === 'activities' && 'Activités quotidiennes'}
                      {key === 'reports' && 'Rapports hebdomadaires'}
                      {key === 'payments' && 'Paiements'}
                      {key === 'urgent' && 'Messages urgents'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {key === 'activities' && 'Photos et mises à jour des activités'}
                      {key === 'reports' && 'Rapports de progression'}
                      {key === 'payments' && 'Rappels de paiement'}
                      {key === 'urgent' && 'Alertes importantes'}
                    </div>
                  </div>
                  <button
                    onClick={() => setParentInfo({
                      ...parentInfo,
                      notificationPreferences: {
                        ...parentInfo.notificationPreferences,
                        [key]: !value
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      value ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                    } transition-colors`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite : Paramètres et sécurité */}
        <div className="space-y-6">
          {/* Photo et statut */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                SM
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{parentInfo.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{parentInfo.email}</p>
              
              <div className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                Compte {parentInfo.subscription}
              </div>
              
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Membre depuis {parentInfo.joinDate}
              </div>
              
              <button className="mt-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Changer la photo
              </button>
            </div>
          </div>

          {/* Paramètres */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Paramètres</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Langue
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg dark:text-white"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thème
                </label>
              <select
  value={settings.theme}
  onChange={(e) => setSettings({ ...settings, theme: e.target.value as "auto"|"light"|"dark" })}
  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg dark:text-white"
>
  <option value="auto">Auto</option>
  <option value="light">Clair</option>
  <option value="dark">Sombre</option>
</select>

              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Notifications push</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Sur mobile et desktop</div>
                </div>
                <button
                  onClick={() => setSettings({...settings, notifications: !settings.notifications})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.notifications ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                  } transition-colors`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sécurité</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Dernière connexion</div>
                <div className="font-medium text-gray-900 dark:text-white">{security.lastLogin}</div>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Appareils connectés</div>
                <div className="font-medium text-gray-900 dark:text-white">{security.devices} appareil(s)</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Authentification à 2 facteurs</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Pour plus de sécurité</div>
                </div>
                <button
                  onClick={() => {/* Toggle 2FA */}}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    security.twoFactor ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  } transition-colors`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <button className="w-full px-4 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Changer le mot de passe
              </button>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Support & Aide</h3>
            
            <div className="space-y-3">
              <Link to="/parent/help" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <span className="text-white">❓</span>
                <span className="text-white font-medium">Centre d'aide</span>
              </Link>
              
              <Link to="/parent/contact" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <span className="text-white">💬</span>
                <span className="text-white font-medium">Contact support</span>
              </Link>
              
              <Link to="/parent/privacy" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <span className="text-white">🔒</span>
                <span className="text-white font-medium">Confidentialité</span>
              </Link>
                <Link
              to="/signin"
              className="flex w-full items-center justify-center p-3 rounded-lg bg-white text-orange-600 font-medium hover:bg-gray-100 transition-colors"
             >
             Déconnexion
             </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfil;