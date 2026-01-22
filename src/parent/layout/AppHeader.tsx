import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";
import NotificationDropdown from "../../components/header/NotificationDropdown";
import UserDropdown from "../../components/header/UserDropdown";
import { UserCircleIcon } from "lucide-react";
import logoUrl from "../../assets/img/logo/logo.png"; 

type NavItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  bgColor?: string;
  activeBgColor?: string;
  activeColor?: string;
};

const NAV_LINKS: NavItem[] = [
  {
    name: "Accueil",
    path: "/parent",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    bgColor: "bg-blue-400/30",
    activeBgColor: "bg-blue-400/40",
    activeColor: "text-white",
  },
  {
    name: "Enfants",
    path: "/parent/enfants",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3"/>
        <path d="M12 22V8"/>
        <path d="m5 12-2.5 4L5 20l2-2 1-3"/>
        <path d="m19 12 2.5 4L19 20l-2-2-1-3"/>
      </svg>
    ),
    bgColor: "bg-purple-400/30",
    activeBgColor: "bg-purple-400/40",
    activeColor: "text-white",
  },
  {
    name: "Activités éducatives",
    path: "/parent/activites_enfants",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20"/>
        <path d="m4.93 4.93 14.14 14.14"/>
        <path d="m19.07 4.93-14.14 14.14"/>
      </svg>
    ),
    bgColor: "bg-green-400/30",
    activeBgColor: "bg-green-400/40",
    activeColor: "text-white",
  },
  {
    name: "Profil",
    path: "/parent/profil",
    icon: <UserCircleIcon className="w-5 h-5" />,
    bgColor: "bg-orange-400/30",
    activeBgColor: "bg-orange-400/40",
    activeColor: "text-white",
  },
];

export default function AppHeader() {
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // Recherche (Ctrl/⌘ + K)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Nav active logic (pour /parent exact)
  const isActive = (path: string) =>
    path === "/parent" ? location.pathname === path : location.pathname === path || location.pathname.startsWith(path + "/");

  const nav = useMemo(() => NAV_LINKS, []);

  return (
    <header
     className={[
  "sticky top-0 z-[9999]",
  "bg-gradient-to-r from-indigo-600 to-purple-600",
  "text-white",
  "border-b border-white/10",
  scrolled ? "shadow-sm" : "shadow-none",
].join(" ")}

    >
      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 rounded px-3 py-2 bg-black text-white text-sm">
        Aller au contenu
      </a>

      <div className="mx-auto max-w-screen-2xl px-3 lg:px-6">
        <div className="flex h-16 lg:h-18 items-center gap-3">
      

        
{/* Branding */}
<Link to="/parent" aria-label="Accueil Kidora" className="mr-0 select-none">
  <div className="flex flex-col items-start leading-none">
    <img src={logoUrl} alt="" className="h-12 lg:h-14 w-auto" />

    {/* 'Portail Parent' multicolore, assorti au logo */}
    <span
      className="
        mt-0.3 font-extrabold uppercase tracking-wide
        text-[11px] sm:text-sm lg:text-[15px]
        leading-[1.05]
        drop-shadow
      "
      aria-hidden="true"
    >
     {Array.from("PORTAIL PARENT").map((ch, i) => {
  const COLORS = ["#FF7A00", "#FF3D57", "#FFC400", "#28C76F", "#3F8CFF", "#8D5CF6"];
  if (ch === " ") {
    // ← espace horizontal custom (ajuste la largeur comme tu veux)
    return <span key={`space-${i}`} className="inline-block" style={{ width: "0.8rem" }} aria-hidden="true" />;
  }
  const color = COLORS[i % COLORS.length];
  return (
    <span key={`${ch}-${i}`} className="inline-block" style={{ color }}>
      {ch}
    </span>
  );
})}

    </span>
  </div>
</Link>







          {/* Search */}
      {/*     <div className="hidden md:flex md:min-w-[260px]">
       <label className="relative w-full" aria-label="Recherche">
  <input
    ref={inputRef}
    placeholder="Rechercher… (Ctrl/⌘+K)"
    className="w-full rounded-lg border border-white/15 bg-white/15 px-3 py-2 text-sm outline-none 
               placeholder:text-white/70 text-white
               focus:ring-2 focus:ring-white/40 focus:border-white/30"
  />
  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-white/20 
                  px-1.5 py-0.5 text-[10px] text-white/80 bg-white/10">⌘K</kbd>
</label>

          </div>*/}

          {/* NAV centrée */}
<nav aria-label="Navigation principale" className="hidden lg:flex flex-1 justify-center">
  <ul className="flex items-center gap-2">
    {nav.map((link) => (
      <li key={link.path} className="relative">
        <NavLink
          to={link.path}
          end={link.path === "/parent"}             // ← match exact pour Accueil
          className={({ isActive }) =>
            [
              "group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              isActive
                ? "text-white bg-white/15 border border-white/25 shadow-sm backdrop-blur-md"
                : "text-white/90 hover:bg-white/10 hover:text-white active:scale-[.98]",
            ].join(" ")
          }
        >
          <span className="text-current">{link.icon}</span>
          <span>{link.name}</span>

          {/* halo au hover */}
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
            style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.06) inset, 0 10px 30px rgba(0,0,0,.12)" }}
          />
        </NavLink>

        {/* soulignement animé: ne dépend plus de location, uniquement de l’état du lien */}
        <NavLink to={link.path} end={link.path === "/parent"}>
          {({ isActive }) => (
            <span
              className="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-white transition-all duration-300 ease-out"
              style={{ width: isActive ? "75%" : "0%" }}
              aria-hidden="true"
            />
          )}
        </NavLink>
      </li>
    ))}
  </ul>
</nav>



{/* ✅ Actions droites : visibles tout le temps (plus de hidden lg:flex) */}
<div className="ml-auto flex items-center gap-2 sm:gap-3">
  <ThemeToggleButton />
  <NotificationDropdown />
  <UserDropdown />
</div>



          {/* Bouton ouverture nav mobile */}
          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="lg:hidden ml-auto inline-flex items-center justify-center rounded-lg h-10 w-10 text-gray-700 hover:bg-black/5 dark:text-white/90 dark:hover:bg-white/10"
            aria-expanded={openMobile}
            aria-controls="mobile-nav"
            aria-label="Ouvrir la navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="4" cy="10" r="2" fill="currentColor" />
              <circle cx="16" cy="10" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Mobile */}
     {/* Mobile sheet sous le header */}
<div
  id="mobile-nav"
  className={[
    "lg:hidden overflow-hidden transition-[grid-template-rows,_opacity] duration-300",
    openMobile ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0",
  ].join(" ")}
>
  <div className="min-h-0">
{/* ✅ Bottom Tab Bar (mobile uniquement) */}
<nav
  aria-label="Navigation mobile fixe"
  className="lg:hidden fixed bottom-3 left-1/2 z-[9999] -translate-x-1/2
             max-w-md w-[92vw] rounded-2xl bg-black/25 backdrop-blur-md p-1
             shadow-lg ring-1 ring-white/10
             pb-[env(safe-area-inset-bottom)]"
>
  <ul className="flex justify-between gap-1">
    {nav.map((link) => (
      <li key={link.path} className="flex-1">
        <NavLink
          to={link.path}
          end={link.path === "/parent"}   // ← évite "Accueil" toujours actif
          className={({ isActive }) =>
            [
              "flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px]",
              "transition active:scale-[.98]",
              isActive
                ? "bg-white text-black font-semibold"
                : "text-white/90 hover:bg-white/10",
            ].join(" ")
          }
        >
          <span className="w-5 h-5">{link.icon}</span>
          <span className="leading-none">{link.name}</span>
        </NavLink>
      </li>
    ))}
  </ul>
</nav>


  </div>
</div>

      </div>
    </header>
  );
}
