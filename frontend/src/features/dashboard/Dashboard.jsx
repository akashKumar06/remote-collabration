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
    <div className="h-screen overflow-x-hidden font-roboto">
      <Navbar onToggleSidbar={handleToggleSidebar} />
      <div className="flex w-full h-screen overflow-hidden">
        <Modal />
        <Sidebar isToggled={isSidebarToggled} />
        <main className="w-full bg-[#1E1F21] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
