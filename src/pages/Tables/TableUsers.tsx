
import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTablesUsers from "../../components/tables/BasicTableUsers";
import GestionUsers from "../../components/tables/Users/GestionUsers";
import { UserGroup02Icon } from "../../icons";
;

export default function TableUsers() {
  const [usersCount, setUsersCount] = useState(0);
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Listes des Parents" /> */}
      <div className="space-y-6">
        <ComponentCard 
        title="Utilisateurs" 
        counterLabel="utilisateurs" 
        counterValue={usersCount}
        icon={<UserGroup02Icon />}>
          {/* <BasicTableOne /> */}
          {/* <BasicTablesUsers /> */}
          <GestionUsers onCountChange={setUsersCount}/>
        </ComponentCard>
      </div>
    </>
  );
}
