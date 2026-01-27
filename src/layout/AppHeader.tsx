import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };
  const toggleApplicationMenu = () => setApplicationMenuOpen(v => !v);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={[
        // collé en haut, sous la sidebar (z-40 < z-50 de la sidebar)
        "sticky top-0 z-40",
        // gradient + léger blur pour lisibilité
        "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 backdrop-blur-sm",
        // séparation visuelle
        "border-b border-white/10",
      ].join(" ")}
    >
      {/* conteneur borné pour éviter que la barre de recherche file sur toute la largeur */}
      <div className="mx-auto w-full max-w-screen-2xl px-3 lg:px-6">
        <div className="flex h-16 items-center gap-3 lg:h-[72px]">
          {/* burger / toggle sidebar */}
          <button
            onClick={handleToggle}
            aria-label="Basculer la barre latérale"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 lg:h-11 lg:w-11"
          >
            {isMobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" className="fill-current">
                <path d="M6.22 7.28a1 1 0 0 1 1.41-1.06L12 10.59l4.37-4.37a1 1 0 1 1 1.41 1.42L13.41 12l4.37 4.37a1 1 0 0 1-1.41 1.41L12 13.41l-4.37 4.37a1 1 0 0 1-1.41-1.41L10.59 12 6.22 7.28Z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 16 12" className="fill-current">
                <path d="M1.33.25h13.33a.75.75 0 1 1 0 1.5H1.33a.75.75 0 1 1 0-1.5Zm0 10h13.33a.75.75 0 1 1 0 1.5H1.33a.75.75 0 1 1 0-1.5ZM1.33 5.25h6.67a.75.75 0 0 1 0 1.5H1.33a.75.75 0 1 1 0-1.5Z" />
              </svg>
            )}
          </button>

          {/* barre de recherche – centrée, bornée, lisible */}
          <div className="hidden flex-1 lg:block">
            <form role="search" className="flex justify-center">
              <label
                className="group relative block w-full max-w-[720px]"
                aria-label="Recherche"
              >
                {/* icône loupe */}
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <svg width="18" height="18" viewBox="0 0 20 20" className="fill-white/80">
                    <path d="M9.375 1.542A7.833 7.833 0 1 1 14.357 15.418l2.82 2.821a1 1 0 0 0 1.415-1.415l-2.82-2.821A7.833 7.833 0 0 1 9.375 1.542Zm0 1.5a6.333 6.333 0 1 0 0 12.666 6.333 6.333 0 0 0 0-12.666Z" />
                  </svg>
                </span>

                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Rechercher ou taper une commande…"
                  className={[
                    // dimensions
                    "h-11 w-full rounded-xl pl-11 pr-16 text-sm",
                    // fond ‘verre’ + bord + ombre
                    "bg-white/10 border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06),0_8px_24px_-8px_rgba(0,0,0,.35)]",
                    // couleurs
                    "text-white/90 placeholder:text-white/70",
                    // focus
                    "outline-none focus:border-white/40 focus:ring-2 focus:ring-white/30",
                    // transition
                    "transition-colors",
                  ].join(" ")}
                />

                {/* Badge ⌘K */}
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/25 bg-white/10 px-2 py-[5px] text-[11px] text-white/90">
                    <span className="tracking-tight">⌘</span>
                    <span>K</span>
                  </span>
                </span>
              </label>
            </form>
          </div>

          {/* espace flexible pour centrer la search bar */}
          <div className="flex-1 lg:flex-none" />

          {/* actions droites */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggleButton />
            <NotificationDropdown />
            <UserDropdown />

          </div>
        </div>

   
      </div>
    </header>
  );
};

export default AppHeader;
