import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomeEducateur from "./educateur/pages/Home";
import AppLayoutEducateur from "./educateur/layout/AppLayout";
import ChildrenPage from "./educateur/pages/Children";
import ActivitiesPage from "./educateur/pages/Activities";
import ReportsPage from "./educateur/pages/Reports";
import TableUsers from "./pages/Tables/TableUsers";
import TableEnfants from "./pages/Tables/TableEnfants";
import GestionEducateurs from "./components/tables/BasictTableEducateur";
import TableEducateurs from "./pages/Tables/TableEducateurs";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* Educateur Dashboard Layout */}
          <Route path="/educateur" element={<AppLayoutEducateur />}>
            <Route index  element={<HomeEducateur />} />
          <Route path="children" element={<ChildrenPage />} />
          
          {/* Route pour les activités */}
          <Route path="activities" element={<ActivitiesPage />} />
          
          {/* Route pour les rapports */}
          <Route path="reports" element={<ReportsPage />} />

          </Route>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/enfants" element={<TableEnfants />} />
            <Route path="/educateurs" element={<TableEducateurs />} />
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
