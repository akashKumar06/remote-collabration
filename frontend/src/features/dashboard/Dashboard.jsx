import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  function handleToggleSidebar() {
    setIsSidebarToggled((prev) => !prev);
  }

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
          <Sidebar isToggled={isSidebarToggled} />
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
