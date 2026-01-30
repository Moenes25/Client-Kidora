import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";
import apiClient from '../../services/api/axiosConfig';
import { authApi } from '../../services/api/authApi';
import { User } from '../../types/auth.types';




const ROLE_LABEL: Record<string, string> = {
  PARENT: "Parent",
  EDUCATEUR: "Éducateur",
  ADMIN: "Admin",
};

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
const { user, setUser } = useAuth(); // ← assure-toi que `setUser` existe dans le contexte
   console.log("Image URL du user :", user?.imageUrl);

  function toggleDropdown() {
    setIsOpen((v) => !v);
  }
  function closeDropdown() {
    setIsOpen(false);
    btnRef.current?.focus();
  }


useEffect(() => {
  async function fetchFullUser() {
    if (!user?.id) return;
    try {
      const response = await apiClient.get<User>(`/client/${user.id}`);
      setUser(response.data); // met à jour avec l'image
    } catch (err) {
      console.error("Erreur chargement utilisateur complet :", err);
    }
  }

  if (!user?.imageUrl) {
    fetchFullUser(); // appel uniquement si image manquante
  }
}, [user]);


  // Esc pour fermer
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Bouton avatar + nom */}
      <button
        ref={btnRef}
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={[
          "inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1.5",
          "bg-white/10 hover:bg-white/20 text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          "transition-colors"
        ].join(" ")}
      >
        <span className="relative inline-block size-10 overflow-hidden rounded-full ring-1 ring-white/30">
         <img
 src={user?.imageUrl ? authApi.getImageUrl(user.imageUrl) : '/default-avatar.png'} 
  alt="Photo de profil"
 
  className="h-full w-full object-cover object-center"
/>

        </span>

        <span className="hidden sm:block font-medium">
  {ROLE_LABEL[user?.role ?? ""] ?? "Utilisateur"}
</span>


        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Panneau */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        // Styles light + dark, “glass”, bordures et ombre cohérentes
        className={[
          "absolute right-0 mt-3 w-72 rounded-2xl p-3",
          "bg-white/95 text-slate-900 border border-black/10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl",
          "dark:bg-slate-900/95 dark:text-slate-100 dark:border-white/10 dark:ring-white/10"
        ].join(" ")}
      >
        {/* caret/flèche */}
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute -top-2 right-8 block size-4 rotate-45",
            "bg-white/95 border-t border-l border-black/10",
            "dark:bg-slate-900/95 dark:border-white/10"
          ].join(" ")}
        />

        {/* En-tête */}
        <div className="flex items-center gap-3 px-2 pb-3 border-b border-slate-200 dark:border-white/10">
          <span className="inline-block h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
            <img 
            src={user?.imageUrl ? authApi.getImageUrl(user.imageUrl) : '/default-avatar.png'} 
         alt="Photo de profil" className="h-full w-full object-cover" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold"> {user?.prenom || user?.email?.split("@")[0]}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1
                           bg-indigo-50 text-indigo-700 ring-indigo-500/20
                           dark:bg-indigo-500/15 dark:text-indigo-300">
            Rôle : {ROLE_LABEL[user?.role ?? ""] ?? "—"}
          </span>
        </div>

        {/* Liens */}
        <ul className="flex flex-col gap-1 py-3" role="menu" aria-label="Menu utilisateur">
          <li role="none">
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/parent/profil"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                         text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40
                         dark:text-slate-200 dark:hover:bg-white/5"
              role="menuitem"
            >
              <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8a6 6 0 0 0-12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Modifier le profil
            </DropdownItem>
          </li>

          <li role="none">
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/parent/privacy"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                         text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40
                         dark:text-slate-200 dark:hover:bg-white/5"
              role="menuitem"
            >
              <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.07a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.07a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.02 3.4l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.07a1.65 1.65 0 0 0 1 1.51h.1a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .67.39 1.26 1 1.51H21a2 2 0 1 1 0 4h-.07a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Paramètres du compte
            </DropdownItem>
          </li>

          <li role="none">
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/parent/help"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                         text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40
                         dark:text-slate-200 dark:hover:bg-white/5"
              role="menuitem"
            >
              <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Centre d’aide
            </DropdownItem>
          </li>
        </ul>

        {/* Déconnexion */}
        <Link
          to="/signin"
          onClick={closeDropdown}
          role="menuitem"
          className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold
                     text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40
                     dark:text-rose-400 dark:hover:bg-rose-400/10"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Se déconnecter
        </Link>
      </Dropdown>
    </div>
  );
}
