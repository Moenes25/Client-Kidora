import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
// import GestionEducateurs from "../../components/tables/BasictTableEducateur";
import { GroupIcon } from "../../icons";
import EducateursTable from "../../components/tables/Educateurs/EducateursTable";
import GestionEducateurs from "../../components/tables/Educateurs/GestionEducateurs";
import { useState } from "react";
// import { GroupIcon } from "lucide-react";

export default function TableEducateurs() {
  const [educateursCount, setEducateursCount] = useState(0);
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Listes des Parents" /> */}
      <div className="space-y-6">
        <ComponentCard 
        title="Educateurs" 
        counterLabel="éducateurs" 
        counterValue={educateursCount} 
        icon={<GroupIcon />}>
         <GestionEducateurs onCountChange={setEducateursCount} />
        </ComponentCard>
      </div>
    </>
  );
}
