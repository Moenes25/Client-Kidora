import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { GroupIcon, UserGroup02Icon } from "../../icons";
import GestionParents from "../../components/tables/Parents/GestionParents";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Listes des Parents" /> */}
      <div className="space-y-6">
        <ComponentCard title="Parents" counterLabel="parents" counterValue="8"  icon={<GroupIcon />}>
          {/* <BasicTableOne /> */}
          <GestionParents />
        </ComponentCard>
      </div>
    </>
  );
}
