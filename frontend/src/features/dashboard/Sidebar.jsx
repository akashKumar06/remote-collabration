import {
  Home,
  ListTodo,
  Inbox,
  FolderKanban,
  Users2,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { close, open, setActiveComponent } from "../../app/slices/modal";
import { delay } from "../../utils/delay";
import { getProjectById } from "../../app/slices/project/projectThunk";

export default function Sidebar({ projects }) {
  const dispatch = useDispatch();
  const { state } = useSelector((state) => state.modal);

  async function handleNew(activeComponent) {
    if (state) {
      dispatch(close());
      await delay(700);
    }
    dispatch(open());
    dispatch(setActiveComponent(activeComponent));
  }

  return (
    <aside className="w-64 h-screen bg-[#1A1A1A] text-white flex flex-col">
      {/* Fixed Section */}
      <div className="p-4 border-b border-white/10">
        <nav className="flex flex-col gap-2">
          <SidebarItem icon={<Home size={18} />} label="Home" to="/dashboard" />
          <SidebarItem
            icon={<ListTodo size={18} />}
            label="My Tasks"
            to="my-tasks"
          />
          <SidebarItem icon={<Inbox size={18} />} label="Inbox" to="inbox" />
        </nav>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {/* Projects */}
        <div>
          <SectionHeader
            label="Projects"
            onClick={() => handleNew("new_project_form")}
          />
          <div className="flex flex-col gap-2 mt-2">
            {projects.map((project) => (
              <SidebarItem
                key={project._id}
                icon={<FolderKanban size={18} />}
                label={project.name}
                to="projects"
                onClick={() => dispatch(getProjectById(project._id))}
              />
            ))}
            {/* Add more dynamically if needed */}
          </div>
        </div>

        {/* Teams */}
        <div>
          <SectionHeader
            label="Teams"
            onClick={() => handleNew("new_team_form")}
          />
          <div className="flex flex-col gap-2 mt-2">
            <SidebarItem
              icon={<Users2 size={18} />}
              label="Akash's First Team"
              to="teams"
            />
            <SidebarItem icon={<Users2 size={18} />} label="Dev Team" />
            {/* Add more dynamically if needed */}
          </div>
        </div>
      </div>
    </aside>
  );
}

// Reusable Item
const SidebarItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-sm px-2 py-2 rounded hover:bg-[#2B2C2E] cursor-pointer transition"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

// Section Header with "+" icon
const SectionHeader = ({ label, onClick }) => (
  <div className="flex items-center justify-between text-xs uppercase text-white/60">
    <span>{label}</span>
    <Plus
      size={16}
      className="cursor-pointer hover:text-white transition"
      onClick={onClick}
    />
  </div>
);
