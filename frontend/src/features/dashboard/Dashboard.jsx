import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserProjects } from "../../app/slices/project/projectThunk";
import SplashScreen from "../../components/SplashScreen";
import { getUserTasks } from "../../app/slices/task/taskThunk";

const Dashboard = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  function handleToggleSidebar() {
    setIsSidebarToggled((prev) => !prev);
  }

  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserProjects());
    dispatch(getUserTasks({ userId: user.id }));
  }, [dispatch, user]);

  if (loading) return <SplashScreen />;
  if (error) return <h1>error</h1>;

  return (
    <div className="h-screen font-roboto flex flex-col">
      {/* Fixed Navbar */}
      <div className="flex-shrink-0">
        <Navbar onToggleSidbar={handleToggleSidebar} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar isToggled={isSidebarToggled} projects={projects} />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#1E1F21] text-white">
          <Modal />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
