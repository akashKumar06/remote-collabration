import {
  Home,
  ListTodo,
  Inbox,
  FolderKanban,
  Users2,
  Plus,
  X,
  Boxes,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { close, open, setActiveComponent } from "../../app/slices/modal";
import { delay } from "../../utils/delay";

export default function Sidebar({ projects, teams, onClose }) {
  const dispatch = useDispatch();
  const { state } = useSelector((state) => state.modal);
  const location = useLocation();

  async function handleNew(activeComponent) {
    if (state) {
      dispatch(close());
      await delay(700);
    }
    dispatch(open());
    dispatch(setActiveComponent(activeComponent));
    if (onClose) onClose(); // Close sidebar on mobile after opening modal
  }

  const isActive = (to) => {
    if (to === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(`/dashboard/${to}`);
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 text-slate-700 flex flex-col z-30">
      {/* Brand + mobile close */}
      <div className="flex items-center justify-between px-4 h-[57px] border-b border-slate-200 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
            <Boxes className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-slate-900">RemoteSync</span>
        </Link>
        <X
          size={20}
          className="cursor-pointer text-slate-400 hover:text-slate-700 md:hidden"
          onClick={onClose}
        />
      </div>

      {/* Fixed Section */}
      <div className="p-3 border-b border-slate-100">
        <nav className="flex flex-col gap-1">
          <SidebarItem
            icon={<Home size={17} />}
            label="Home"
            to="/dashboard"
            active={isActive("/dashboard")}
            onClose={onClose}
          />
          <SidebarItem
            icon={<ListTodo size={17} />}
            label="My Tasks"
            to="my-tasks"
            active={isActive("my-tasks")}
            onClose={onClose}
          />
          <SidebarItem
            icon={<Inbox size={17} />}
            label="Inbox"
            to="inbox"
            active={isActive("inbox")}
            onClose={onClose}
          />
        </nav>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto thin-scrollbar px-3 py-3 space-y-6">
        {/* Projects */}
        <div>
          <SectionHeader
            label="Projects"
            onClick={() => handleNew("new_project_form")}
          />
          <div className="flex flex-col gap-1 mt-1.5">
            {projects.length === 0 ? (
              <p className="text-xs text-slate-400 px-2 py-1.5">No projects yet</p>
            ) : (
              projects.map((project) => (
                <SidebarItem
                  key={project._id}
                  icon={<FolderKanban size={17} />}
                  label={project.name}
                  to={`projects/${project._id}`}
                  active={location.pathname.includes(`/projects/${project._id}`)}
                  onClose={onClose}
                />
              ))
            )}
          </div>
        </div>

        {/* Teams */}
        <div>
          <SectionHeader
            label="Teams"
            onClick={() => handleNew("new_team_form")}
          />

          <div className="flex flex-col gap-1 mt-1.5">
            {teams.length === 0 ? (
              <p className="text-xs text-slate-400 px-2 py-1.5">
                No teams yet
              </p>
            ) : (
              teams.map((team) => (
                <SidebarItem
                  key={team._id}
                  icon={<Users2 size={17} />}
                  label={team.name}
                  to={`teams/${team._id}`}
                  active={location.pathname.includes(`/teams/${team._id}`)}
                  onClose={onClose}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

// Reusable Item
const SidebarItem = ({ icon, label, to, onClick, onClose, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2.5 text-sm px-2.5 py-2 rounded-lg cursor-pointer transition truncate ${
      active
        ? "bg-primary-50 text-primary-700 font-medium"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`}
    onClick={() => {
      if (onClick) onClick();
      if (onClose) onClose(); // close sidebar on mobile
    }}
  >
    <span className={active ? "text-primary-600" : "text-slate-400"}>{icon}</span>
    <span className="truncate">{label}</span>
  </Link>
);

// Section Header with "+" icon
const SectionHeader = ({ label, onClick }) => (
  <div className="flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
    <span>{label}</span>
    <button
      className="cursor-pointer hover:text-primary-600 hover:bg-primary-50 rounded p-0.5 transition"
      onClick={onClick}
      aria-label={`Add ${label}`}
    >
      <Plus size={14} />
    </button>
  </div>
);
