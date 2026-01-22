// src/educateur/layout/AppHeader.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";
import NotificationDropdown from "../../components/header/NotificationDropdown";
import UserDropdown from "../../components/header/UserDropdown";
import logoUrl from "../../assets/img/logo/logo.png";

type NavItem = {
  name: string;
  path: string;
  icon: JSX.Element;
};

const NAV_LINKS: NavItem[] = [
  {
    name: "Accueil",
    path: "/educateur",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    name: "Enfants",
    path: "/educateur/children",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3"/>
        <path d="M12 22V8"/>
        <path d="m5 12-2.5 4L5 20l2-2 1-3"/>
        <path d="m19 12 2.5 4L19 20l-2-2-1-3"/>
      </svg>
    ),
  },
  {
    name: "Activités",
    path: "/educateur/activities",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20"/>
        <path d="m4.93 4.93 14.14 14.14"/>
        <path d="m19.07 4.93-14.14 14.14"/>
      </svg>
    ),
  },
  {
    name: "Rapports",
    path: "/educateur/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
        <path d="M9 9h1"/>
        <path d="M9 13h6"/>
        <path d="M9 17h6"/>
      </svg>
    ),
  },
];

export default function AppHeader() {
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // (optionnel) raccourci clavier pour focus une zone de recherche si tu l’ajoutes plus tard
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
          <Link to="/educateur" aria-label="Accueil Kidora" className="mr-0 select-none">
            <div className="flex flex-col items-start leading-none">
              <img src={logoUrl} alt="" className="h-12 lg:h-14 w-auto" />
              <span
                className="mt-0.5 font-extrabold uppercase tracking-wide text-[11px] sm:text-sm lg:text-[15px] leading-[1.05] drop-shadow"
                aria-hidden="true"
              >
                {Array.from("PORTAIL EDUCATEUR").map((ch, i) => {
                  const COLORS = ["#FF7A00", "#FF3D57", "#FFC400", "#28C76F", "#3F8CFF", "#8D5CF6"];
                  if (ch === " ") {
                    return (
                      <span key={`space-${i}`} className="inline-block" style={{ width: "0.8rem" }} aria-hidden="true" />
                    );
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

          {/* Nav centrée (desktop) */}
          <nav aria-label="Navigation principale" className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-2">
              {nav.map((link) => (
                <li key={link.path} className="relative">
                  <NavLink
                    to={link.path}
                    end={link.path === "/educateur"} // match exact pour Accueil
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

                    {/* halo hover */}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                      style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.06) inset, 0 10px 30px rgba(0,0,0,.12)" }}
                    />
                  </NavLink>

                  {/* soulignement animé */}
                  <NavLink to={link.path} end={link.path === "/educateur"}>
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

          {/* Actions droites */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggleButton />
            <NotificationDropdown />
            <UserDropdown />
          </div>

          {/* Bouton ouverture nav mobile */}
          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="lg:hidden ml-2 inline-flex items-center justify-center rounded-lg h-10 w-10 text-white/90 hover:bg-white/10"
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

        {/* Sheet mobile (animation ouverture/fermeture) */}
        <div
          id="mobile-nav"
          className={[
            "lg:hidden overflow-hidden transition-[grid-template-rows,_opacity] duration-300",
            openMobile ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="min-h-0">
            {/* Bottom Tab Bar (mobile) */}
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
                      end={link.path === "/educateur"}
                      className={({ isActive }) =>
                        [
                          "flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px]",
                          "transition active:scale-[.98]",
                          isActive ? "bg-white text-black font-semibold" : "text-white/90 hover:bg-white/10",
                        ].join(" ")
                      }
                      onClick={() => setOpenMobile(false)}
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
