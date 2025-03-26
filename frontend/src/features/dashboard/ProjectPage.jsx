import {
  ClipboardList,
  FilesIcon,
  LayoutDashboard,
  List,
  MessagesSquare,
} from "lucide-react";
import { Outlet } from "react-router";
import NavLink from "../../components/NavLink";

function ProjectPage() {
  return (
    <>
      <header className="border-b border-white/60">
        <section className="p-2 flex justify-between">
          <h1 className="text-2xl px-2 font-medium">Demo Project</h1>
          <div>Collaborators</div>
        </section>
        <nav className="flex gap-4 px-2 text-sm font-medium">
          <NavLink
            to="overview"
            icon={<ClipboardList size={15} className="shrink-0" />}
            label="Overview"
          />
          <NavLink to="list" icon={<List size={15} />} label="List" />
          <NavLink
            to="project-dashboard"
            icon={<LayoutDashboard size={15} />}
            label="Dashboard"
          />
          <NavLink
            to="messages"
            icon={<MessagesSquare size={15} />}
            label="Messages"
          />
          <NavLink to="files" icon={<FilesIcon size={15} />} label="Files" />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ProjectPage;
