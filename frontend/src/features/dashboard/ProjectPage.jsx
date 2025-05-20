import { NavLink, Outlet } from "react-router";
import {
  ClipboardList,
  FilesIcon,
  LayoutDashboard,
  List,
  MessagesSquare,
} from "lucide-react";
import { useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen";

function ProjectPageLayout() {
  const { currentProject } = useSelector((state) => state.project);
  if (!currentProject) return <SplashScreen />;

  return (
    <div className="h-screen overflow-hidden font-roboto bg-[#1A1A1A] text-gray-300">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-white/10 px-6 py-2 shadow-md">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {currentProject.name}
        </h2>

        {/* Nav Links */}
        <nav className="flex gap-6 mt-4 text-sm font-medium">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "text-gray-400 hover:text-white pb-1 transition-all"
            }
          >
            <div className="flex items-center gap-2">
              <ClipboardList size={16} /> Overview
            </div>
          </NavLink>
          <NavLink
            to="list"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "text-gray-400 hover:text-white pb-1 transition-all"
            }
          >
            <div className="flex items-center gap-2">
              <List size={16} /> List
            </div>
          </NavLink>
          <NavLink
            to="project-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "text-gray-400 hover:text-white pb-1 transition-all"
            }
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard size={16} /> Dashboard
            </div>
          </NavLink>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "text-gray-400 hover:text-white pb-1 transition-all"
            }
          >
            <div className="flex items-center gap-2">
              <MessagesSquare size={16} /> Messages
            </div>
          </NavLink>
          <NavLink
            to="files"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "text-gray-400 hover:text-white pb-1 transition-all"
            }
          >
            <div className="flex items-center gap-2">
              <FilesIcon size={16} /> Files
            </div>
          </NavLink>
        </nav>
      </header>

      {/* Scrollable Main Content */}
      <main className="overflow-y-auto h-[calc(100vh-112px)] px-10 py-6 bg-[#1F1F1F]">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectPageLayout;
