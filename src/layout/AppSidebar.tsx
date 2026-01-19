import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  GroupIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  UserGroup02Icon,
} from "../icons";
// import { UserGroup02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  {
    name: "Utilisateurs",
    icon: <UserGroup02Icon />,
    path: "/admin/users",
  },
  {
    name: "Parents",
    icon: <GroupIcon />,
    path: "/admin/basic-tables",
  },
  {
    name: "Educateurs",
    icon: <GroupIcon />,
    path: "/admin/educateurs",
  },
  {
   name: "Enfants",
   icon: <svg xmlns="http://www.w3.org/2000/svg" 
   viewBox="0 0 640 640"
   fill="currentColor" >
    <path d="M256 128C256 92.7 284.7 64 320 64C355.3 64 384 92.7 384 128C384 163.3 355.3 192 320 192C284.7 192 256 163.3 256 128zM304 448L304 544C304 561.7 289.7 576 272 576C254.3 576 240 561.7 240 544L240 351.8L219.1 385C209.7 400 189.9 404.4 175 395C160.1 385.6 155.5 365.9 164.9 351L204.8 287.7C229.7 248 273.2 224 320 224C366.8 224 410.3 248 435.2 287.6L475.1 351C484.5 366 480 385.7 465.1 395.1C450.2 404.5 430.4 400 421 385.1L400 351.8L400 544C400 561.7 385.7 576 368 576C350.3 576 336 561.7 336 544L336 448L304 448z"/></svg>,
   path: "/admin/enfants",
  },
  {
    name: "Classes",
    icon: <BoxCubeIcon />,
    path: "/admin/classes",
  },
  {
    name: "Finance", 
    icon: <PieChartIcon />,
    path: "/admin/finance",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/admin/calendar",
  },
  {
    icon: ( 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
        <path d="M9 9h1"/>
        <path d="M9 13h6"/>
        <path d="M9 17h6"/>
      </svg>
    ),
    name: "Rapports",
    path: "/admin/reports",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramètres",
    path: "/admin/parametres",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-gray-100 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[250px]"
            : isHovered
            ? "w-[250px]"
            : "w-[70px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec logo */}
      <div className={["shrink-0", !isExpanded && !isHovered ? "px-2 pt-5" : "px-6 pt-6"].join(" ")}>
        <div className={[
          "relative rounded-3xl flex items-center justify-center",
          !isExpanded && !isHovered && !isMobileOpen ? "p-1.5" : "p-5", // ← Réduit le padding en mode fermé
          "bg-white dark:bg-gray-900",
        ].join(" ")}>
          
          <Link to="/" className="flex items-center justify-center w-full h-full">
            <img
              src="/images/logo/logo_kidora.png" // ← Même logo
              alt="Kidora Logo"
              className={[
                "object-contain transition-all duration-300",
                !isExpanded && !isHovered && !isMobileOpen 
                  ? "h-10 w-10" // ← Taille maximale pour le mode fermé
                  : "max-h-16 w-auto max-w-[200px]" // ← Taille pour le mode ouvert
              ].join(" ")}
            />
          </Link>
        </div>
      </div>

      {/* Séparateur */}
      {/* <div className="mt-3 mb-4 h-px bg-indigo-100/80 dark:bg-white/20 shrink-0" /> */}
      <div className="mt-3 mb-4 h-px shrink-0" />

      {/* Zone de navigation scrollable */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar px-1.5 pr-2 min-h-0 min-w-0 [scrollbar-gutter:stable] group flex-1">
        <nav className="mb-4">
          <div className="flex flex-col gap-3">
            <div>
              <h2
                className={`mb-3 text-xs uppercase flex leading-[18px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-5" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;