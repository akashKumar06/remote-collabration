import { NavLink, Outlet, useParams } from "react-router";
import {
  ClipboardList,
  FilesIcon,
  LayoutDashboard,
  List,
  MessagesSquare,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen";
import { getCurrentProject } from "../../app/slices/project/projectSlice";
import { useEffect, useState } from "react";
import { getProjectTasks } from "../../app/slices/task/taskThunk";

function ProjectPageLayout() {
  const { projectId } = useParams();
  const { currentProject } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    dispatch(getCurrentProject(projectId));
    dispatch(getProjectTasks({ projectId }));
  }, [dispatch, projectId]);

  if (!currentProject) return <SplashScreen />;

  return (
    <div className="relative min-h-full">
      {/* Header */}
      <header className="z-10 sticky top-0 left-0 border-b border-slate-200 px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900">
            {currentProject.name}
          </h2>
          <button
            className="md:hidden text-slate-600"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav
          className={`${
            isNavOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-1 md:gap-1 mt-4 text-sm font-medium`}
        >
          <NavItem to="overview" icon={<ClipboardList size={15} />} label="Overview" />
          <NavItem to="tasks" icon={<List size={15} />} label="Tasks" />
          <NavItem
            to="project-dashboard"
            icon={<LayoutDashboard size={15} />}
            label="Analytics"
          />
          <NavItem to="messages" icon={<MessagesSquare size={15} />} label="Messages" />
          <NavItem to="files" icon={<FilesIcon size={15} />} label="Files" />
          {user.id === currentProject.owner._id && (
            <NavItem to="settings" icon={<Settings size={15} />} label="Settings" />
          )}
        </nav>
      </header>

      <main className="px-4 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
        isActive
          ? "bg-primary-50 text-primary-700"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`
    }
  >
    {icon} {label}
  </NavLink>
);

export default ProjectPageLayout;
