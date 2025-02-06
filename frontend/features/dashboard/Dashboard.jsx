import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  function handleToggleSidebar() {
    setIsSidebarToggled((prev) => !prev);
  }

  return (
    <div className="h-screen overflow-hidden">
      <Navbar onToggleSidbar={handleToggleSidebar} />
      <div className="flex h-screen">
        <Sidebar isToggled={isSidebarToggled} />
        <main className="overflow-scroll flex-1 p-4 bg-[#1e1f21]">
          <h1 className="text-xs text-gray-900 dark:text-white">
             hello world
          </h1>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
