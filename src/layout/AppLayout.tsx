import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useState } from "react";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Exemple : Si vous êtes sur une page de liste, filtrez les données
    console.log("Recherche:", term);
    
    // Optionnel : Mettre à jour l'URL avec le paramètre de recherche
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[250px]" : "lg:ml-[70px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader
         onSearch={handleSearch}
         initialSearchTerm={searchTerm}
          />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet context={{ searchTerm }}/>
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
