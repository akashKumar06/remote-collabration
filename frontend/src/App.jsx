import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import DashboardHome from "./features/dashboard/DashboardHome";
import Dashboard from "./features/dashboard/Dashboard";
import MyTasksPage from "./features/dashboard/MyTasksPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AccountSetupProvider } from "./features/account_setup/AccountSetupContext";
import AccountSetup from "./features/account_setup/AccountSetup";
import ProjectPage from "./features/dashboard/ProjectPage";
import Overview from "./features/dashboard/project/Overview";
import Files from "./features/dashboard/project/Files";
import Messages from "./features/dashboard/project/Messages";
import List from "./features/dashboard/project/List";
import Inbox from "./features/dashboard/Inbox";
import ProjectDasboard from "./features/dashboard/project/ProjectDasboard";
import TeamsPage from "./features/dashboard/teams/TeamsPage";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="account_setup"
          element={
            <AccountSetupProvider>
              <AccountSetup />
            </AccountSetupProvider>
          }
        />
        {/* dashboard routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="my-tasks" element={<MyTasksPage />} />
          <Route path="inbox" element={<Inbox />} />

          {/* nested projects route */}
          <Route path="projects" element={<ProjectPage />}>
            <Route path="overview" element={<Overview />} />
            <Route path="list" element={<List />} />
            <Route path="files" element={<Files />} />
            <Route path="messages" element={<Messages />} />
            <Route path="project-dashboard" element={<ProjectDasboard />} />
          </Route>

          {/* teams route */}
          <Route path="teams" element={<TeamsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
