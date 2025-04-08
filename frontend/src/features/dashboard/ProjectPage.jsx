import { NavLink, Outlet } from "react-router";
import {
  ClipboardList,
  FilesIcon,
  LayoutDashboard,
  List,
  MessagesSquare,
} from "lucide-react";

function ProjectPageLayout() {
  return (
    <div className="h-screen overflow-hidden font-roboto bg-[#1E1F21] text-gray-300">
      {/* Header */}
      <header className="bg-[#1E1F21] border-b border-white/10 px-8 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Cross-functional project plan
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
            Set status
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex gap-4 mt-4 text-sm font-medium">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 border-b-2 border-white"
                : "hover:text-gray-400"
            }
          >
            <div className="flex items-center gap-1">
              <ClipboardList size={15} /> Overview
            </div>
          </NavLink>
          <NavLink
            to="list"
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 border-b-2 border-white"
                : "hover:text-gray-400"
            }
          >
            <div className="flex items-center gap-1">
              <List size={15} /> List
            </div>
          </NavLink>
          <NavLink
            to="project-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 border-b-2 border-white"
                : "hover:text-gray-400"
            }
          >
            <div className="flex items-center gap-1">
              <LayoutDashboard size={15} /> Dashboard
            </div>
          </NavLink>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 border-b-2 border-white"
                : "hover:text-gray-400"
            }
          >
            <div className="flex items-center gap-1">
              <MessagesSquare size={15} /> Messages
            </div>
          </NavLink>
          <NavLink
            to="files"
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 border-b-2 border-white"
                : "hover:text-gray-400"
            }
          >
            <div className="flex items-center gap-1">
              <FilesIcon size={15} /> Files
            </div>
          </NavLink>
        </nav>
      </header>

      {/* Scrollable Main Content */}
      <main className="overflow-y-auto h-[calc(100vh-104px)] px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectPageLayout;
