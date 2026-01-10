import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import GestionEducateurs from "../../components/tables/BasictTableEducateur";
import { GroupIcon } from "../../icons";
import EducateursTable from "../../components/tables/Educateurs/EducateursTable";
// import { GroupIcon } from "lucide-react";

export default function TableEducateurs() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Listes des Parents" /> */}
      <div className="space-y-6">
        <ComponentCard title="Educateurs" counterLabel="éducateurs" counterValue="8" icon={<GroupIcon />}>
         <EducateursTable />
        </ComponentCard>
      </div>
    </>
  );
}
