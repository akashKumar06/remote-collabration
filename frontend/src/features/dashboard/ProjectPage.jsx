import { NavLink, Outlet, useParams } from "react-router";
import {
  ClipboardList,
  FilesIcon,
  LayoutDashboard,
  List,
  MessagesSquare,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen";
import { getCurrentProject } from "../../app/slices/project/projectSlice";
import { useEffect } from "react";
import { getProjectTasks } from "../../app/slices/task/taskThunk";

function ProjectPageLayout() {
  const { projectId } = useParams();
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProject(projectId));
    dispatch(getProjectTasks({ projectId }));
  }, [dispatch, projectId]);

  if (!currentProject) return <SplashScreen />;

  return (
    <div className="relative h-screen font-roboto  text-gray-300">
      {/* Header */}
      <header className="z-10 bg-[#1A1A1A] sticky top-0 left-0 border-b border-white/10 px-6 py-2 shadow-md">
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
              <List size={16} /> Tasks
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
              <LayoutDashboard size={16} /> Analytics
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
      <main className="px-10 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectPageLayout;
