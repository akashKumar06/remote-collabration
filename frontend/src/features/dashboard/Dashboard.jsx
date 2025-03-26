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
    <div className="h-screen overflow-hidden font-roboto">
      <Navbar onToggleSidbar={handleToggleSidebar} />
      <div className="flex h-screen">
        <Sidebar isToggled={isSidebarToggled} />
        <main className="w-full bg-[#1E1F21] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
