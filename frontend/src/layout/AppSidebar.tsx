import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";

/* ===== Icônes ===== */
import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  GroupIcon,
  PieChartIcon,
  UserGroup02Icon,
  ChevronDownIcon,
} from "../icons";

/* ===== Icône Enfants (stroke comme les autres) ===== */
const ChildrenIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="6.5" r="3.25" />
    <path d="M5 19.5c.6-3.2 3.5-5.5 7-5.5s6.4 2.3 7 5.5" />
    <path d="M4 14c1.2 0 2 .4 3 1.4M20 14c-1.2 0-2 .4-3 1.4" />
  </svg>
);

/* ===== Thème unique (change ici si tu veux une autre teinte) ===== */
const THEME = {
  railBar: "bg-indigo-500",
  iconBg: "bg-indigo-500/15",
  iconRing: "ring-indigo-500/30",
  activeBg:
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500",
  hoverBg: "hover:bg-indigo-500/10",
};

/* ===== Types ===== */
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

/* ===== Menu ===== */
const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/admin" },
  { name: "Utilisateurs", icon: <UserGroup02Icon />, path: "/admin/users" },
  { name: "Parents", icon: <GroupIcon />, path: "/admin/basic-tables" },
  { name: "Educateurs", icon: <GroupIcon />, path: "/admin/educateurs" },
  { name: "Enfants", icon: <ChildrenIcon />, path: "/admin/enfants" },
  { name: "Classes", icon: <BoxCubeIcon />, path: "/admin/classes" },
  { name: "Finance", icon: <PieChartIcon />, path: "/admin/finance" },
  { icon: <CalenderIcon />, name: "Calendar", path: "/admin/calendar" },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 9h1" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    ),
    name: "Rapports",
    path: "/admin/reports",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: "Paramètres",
    path: "/admin/parametres",
  },
];

/* ===== Constantes d’UI ===== */
const EXPANDED_W = 250;
const COLLAPSED_W = 75;

/* ===== Utils ===== */
const useIsActive = () => {
  const { pathname } = useLocation();
  return (path?: string) => (path ? pathname === path : false);
};

const RailTooltip = ({ label }: { label: string }) => (
  <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    {label}
  </span>
);

/* =========================================================================
   Composant principal
   ========================================================================= */
export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const isRail = !(isExpanded || isHovered || isMobileOpen);
  const isActive = useIsActive();

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const subRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [subHeights, setSubHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    if (openIdx !== null && subRefs.current[openIdx]) {
      setSubHeights((p) => ({
        ...p,
        [openIdx]: subRefs.current[openIdx]?.scrollHeight || 0,
      }));
    }
  }, [openIdx]);

  const widthClass = useMemo(() => {
    if (isExpanded || isHovered || isMobileOpen) return `w-[${EXPANDED_W}px]`;
    return `w-[${COLLAPSED_W}px]`;
  }, [isExpanded, isHovered, isMobileOpen]);

  return (
    <aside
      className={[
        "fixed top-0 left-0 z-50 h-screen border-r bg-white text-slate-900 transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
        "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 border-slate-200",
        widthClass,
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "mt-16 lg:mt-0 px-3",
      ].join(" ")}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Barre latérale de navigation"
    >
      {/* ===== Logo ===== */}
      <div className="shrink-0 pt-2">
        <Link
          to="/"
          className={[
            "group relative mx-auto flex items-center justify-center rounded-2xl ring-1 ring-slate-200/80 dark:ring-white/10",
            isRail ? "h-[52px] w-[52px] bg-white dark:bg-slate-900" : "h-[80px] w-full bg-white dark:bg-slate-900 px-3",
          ].join(" ")}
          aria-label="Accueil Kidora"
        >
          {/* logo glyph (mode rail) */}
          <img
            src="/images/logo/logo_kidora_glyph.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/images/logo/logo_kidora.png";
            }}
            alt=""
            className={["object-contain", isRail ? "h-20 w-auto" : "hidden"].join(" ")}
            aria-hidden
          />
          {/* logo complet (mode large) */}
          <img
            src="/images/logo/logo_kidora.png"
            alt="Kidora"
            className={["object-contain", isRail ? "hidden" : "h-20 w-auto"].join(
              " "
            )}
          />
        </Link>
      </div>

      {/* séparateur */}
      <div className="my-1 h-px w-full bg-white  dark:bg-black" />

      {/* ===== Navigation ===== */}
      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pr-1">
        <ul className="flex flex-col gap-1">
          {navItems.map((item, idx) => {
            const active = isActive(item.path);
            const hasSub = !!item.subItems?.length;

            const baseBtn =
              "group relative flex items-center rounded-xl px-3 py-2 outline-none transition";
            const layoutBtn = isRail ? "justify-center" : "justify-start";
            const stateBtn = active
              ? `${THEME.activeBg} shadow-sm`
              : `${THEME.hoverBg}`;

            const iconWrap =
              "grid place-items-center rounded-lg h-9 w-9 shrink-0 ring-1 ring-inset transition";
            const iconState = active
              ? `${THEME.iconBg} ${THEME.iconRing} text-white`
              : "bg-slate-50 text-slate-600 ring-slate-200/70 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10";

            const textClass = active
              ? "text-white"
              : "text-slate-800 dark:text-slate-200";

            return (
              <li key={item.name}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={[baseBtn, layoutBtn, stateBtn, textClass].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {/* liseré gauche (une seule couleur) */}
                    {active && (
                      <span
                        aria-hidden
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r ${THEME.railBar}`}
                      />
                    )}

                    <span className={[iconWrap, iconState].join(" ")}>
                      <span className="h-5 w-5">{item.icon}</span>
                    </span>

                    {!isRail && (
                      <span className="ml-3 truncate text-sm font-medium">
                        {item.name}
                      </span>
                    )}

                    {active && !isRail && (
                      <span
                        aria-hidden
                        className={`ml-auto h-2.5 w-2.5 rounded-full ${THEME.railBar} shadow-inner`}
                      />
                    )}

                    {isRail && <RailTooltip label={item.name} />}
                  </Link>
                ) : (
                  <button
                    onClick={() => setOpenIdx((p) => (p === idx ? null : idx))}
                    className={[baseBtn, layoutBtn, stateBtn, textClass, "w-full"].join(
                      " "
                    )}
                    aria-expanded={openIdx === idx}
                  >
                    <span className={[iconWrap, iconState].join(" ")}>
                      <span className="h-5 w-5">{item.icon}</span>
                    </span>

                    {!isRail && (
                      <>
                        <span className="ml-3 truncate text-sm font-medium">
                          {item.name}
                        </span>
                        <ChevronDownIcon
                          className={[
                            "ml-auto h-5 w-5 transition-transform",
                            openIdx === idx ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </>
                    )}

                    {isRail && <RailTooltip label={item.name} />}
                  </button>
                )}

                {hasSub && !isRail && (
                  <div
                    ref={(el) => (subRefs.current[idx] = el)}
                    className="overflow-hidden transition-all"
                    style={{
                      height: openIdx === idx ? subHeights[idx] ?? "auto" : 0,
                    }}
                  >
                    <ul className="mt-1 space-y-1 pl-12">
                      {item.subItems!.map((s) => {
                        const activeSub = isActive(s.path);
                        return (
                          <li key={s.name}>
                            <Link
                              to={s.path}
                              className={[
                                "flex items-center rounded-lg px-2 py-1.5 text-sm",
                                activeSub
                                  ? "bg-slate-100 font-medium text-slate-900 dark:bg-white/10 dark:text-white"
                                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
                              ].join(" ")}
                            >
                              {s.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pb-4" />
      </nav>
    </aside>
  );
}
