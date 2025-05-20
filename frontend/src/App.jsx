import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import DashboardHome from "./features/dashboard/DashboardHome";
import Dashboard from "./features/dashboard/Dashboard";
import MyTasks from "./features/dashboard/MyTasks";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./app/slices/auth/authThunks";
import SplashScreen from "./components/SplashScreen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const { status } = useSelector((state) => state.auth);

  if (status === "loading" || status === "idle") return <SplashScreen />;

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        {/* <Route
          path="account_setup"
          element={
            <AccountSetupProvider>
              <AccountSetup />
            </AccountSetupProvider>
          }
        /> */}
        {/* dashboard routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="inbox" element={<Inbox />} />

          {/* nested projects route */}
          <Route path="projects" element={<ProjectPage />}>
            <Route index element={<Navigate to="overview" />} />
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
