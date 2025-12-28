// AppHeader.tsx - Version avec boutons centrés
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";
import NotificationDropdown from "../../components/header/NotificationDropdown";
import UserDropdown from "../../components/header/UserDropdown";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const location = useLocation();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fonction pour vérifier si un lien est actif
  const isActive = (path: string) => {
    if (path === "/educateur") {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Définition des liens de navigation avec icônes SVG
  const navLinks = [
    { 
      name: "Accueil", 
      path: "/educateur",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: "text-blue-600 dark:text-blue-100",
      bgColor: "bg-blue-100 dark:bg-blue-400/30",
      borderColor: "border-blue-200 dark:border-blue-400/50",
      activeBgColor: "bg-blue-500/10 dark:bg-blue-400/40",
      activeColor: "text-blue-600 dark:text-white"
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
      color: "text-purple-600 dark:text-purple-100",
      bgColor: "bg-purple-100 dark:bg-purple-400/30",
      borderColor: "border-purple-200 dark:border-purple-400/50",
      activeBgColor: "bg-purple-500/10 dark:bg-purple-400/40",
      activeColor: "text-purple-600 dark:text-white"
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
      color: "text-green-600 dark:text-green-100",
      bgColor: "bg-green-100 dark:bg-green-400/30",
      borderColor: "border-green-200 dark:border-green-400/50",
      activeBgColor: "bg-green-500/10 dark:bg-green-400/40",
      activeColor: "text-green-600 dark:text-white"
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
      color: "text-orange-600 dark:text-orange-100",
      bgColor: "bg-orange-100 dark:bg-orange-400/30",
      borderColor: "border-orange-200 dark:border-orange-400/50",
      activeBgColor: "bg-orange-500/10 dark:bg-orange-400/40",
      activeColor: "text-orange-600 dark:text-white"
    }
  ];

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-indigo-400/30 dark:bg-gradient-to-br dark:from-indigo-500 dark:to-purple-600 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-indigo-400/20 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-white/20 dark:text-white lg:flex lg:h-11 lg:w-11 lg:border dark:hover:bg-white/10"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden"
              src="./images/logo/logo.png"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="./images/logo/logo-dark.png"
              alt="Logo"
            />
          </Link>

          {/* Logo desktop à gauche */}
          <div className="hidden lg:flex items-center mr-6">
            <Link to="/">
              <img
                className="dark:hidden h-8"
                src="./images/logo/logo.png"
                alt="Logo"
              />
              <img
                className="hidden dark:block h-8"
                src="./images/logo/logo-dark.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation links - Desktop CENTRÉE */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? `${link.activeBgColor} ${link.activeColor} font-semibold shadow-sm`
                        : "text-gray-600 dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    <span className={`${isActive(link.path) ? link.activeColor : "text-gray-500 dark:text-white/80"}`}>
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </Link>
                  {isActive(link.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-current rounded-full dark:bg-white"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-white/10 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Boutons à droite (thème, notifications, utilisateur) */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggleButton />
            <NotificationDropdown />
            {/* <UserDropdown /> */}
             <Link
          to="/signin"
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <svg
            className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'scaleX(-1)' }} // Ajoute cette ligne pour retourner horizontalement
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
              fill=""
            />
          </svg>
           déconnexion
        </Link>
          </div>
        </div>
        
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } 
          items-center justify-between w-full gap-4 px-5 py-4 lg:hidden shadow-theme-md dark:bg-gradient-to-br dark:from-indigo-500 dark:to-purple-600`}
        >
          {/* Navigation links - Mobile */}
          <div className="w-full">
            <div className="grid grid-cols-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition-all ${
                    isActive(link.path)
                      ? `${link.activeBgColor} ${link.activeColor} font-semibold`
                      : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/90 dark:hover:bg-white/20"
                  }`}
                  onClick={() => setApplicationMenuOpen(false)}
                >
                  <div className={`p-2 rounded-lg ${isActive(link.path) ? link.bgColor : 'bg-white dark:bg-white/20'}`}>
                    <span className={`${isActive(link.path) ? link.activeColor : "text-gray-500 dark:text-white"}`}>
                      {link.icon}
                    </span>
                  </div>
                  <span className="text-xs font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 2xsm:gap-3 w-full justify-center mt-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <ThemeToggleButton /> */}
            {/* <!-- Dark Mode Toggler --> */}
            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;