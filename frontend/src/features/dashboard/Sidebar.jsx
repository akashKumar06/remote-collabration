import { CircleCheck, HomeIcon, Inbox, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { toggle } from "../../app/slices/modal";

const initalProjects = [
  {
    name: "Demo Project",
    id: 1,
  },
  {
    id: 2,
    name: "MNC Project",
  },
];

const initalTeams = [
  {
    id: 12,
    name: "Junior team",
  },
  {
    id: 23,
    name: "remtoe collab team",
  },
];

function Sidebar() {
  const [teams, setTeams] = useState(initalProjects);
  const [projects, setProjects] = useState(initalTeams);
  const dispatch = useDispatch();
  return (
    <aside className="shadow border-r-1 border-white/30 flex flex-col bg-background text-white/90 text-sm w-72 font-medium">
      <ul className="p-4 border-b-1 border-white/30 flex flex-col gap-1.5">
        <li className="hover:bg-[#555555] transition px-3 py-1 rounded">
          <Link to="home" className="flex gap-2">
            <span>
              <HomeIcon size={20} />
            </span>
            <span>Home</span>
          </Link>
        </li>
        <li className="hover:bg-[#555555] transition px-3 py-1 rounded">
          <Link to="home" className="flex gap-2">
            <span>
              <CircleCheck size={20} />
            </span>
            <span>My Tasks</span>
          </Link>
        </li>
        <li className="hover:bg-[#555555] transition px-3 py-1 rounded">
          <Link to="home" className="flex gap-2">
            <span>
              <Inbox size={20} />
            </span>
            <span>Inbox</span>
          </Link>
        </li>
      </ul>

      <div className="flex gap-2  flex-col p-4 overflow-auto flex-1 scrollbar-hide">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-base">Projects</h1>
            <div
              className="cursor-pointer px-1 py-1 rounded hover:bg-[#2B2C2E] transition"
              onClick={() => dispatch(toggle())}
            >
              <Plus size={18} fontWeight={900} />
            </div>
          </div>
          <ul className=" flex flex-col gap-1">
            {projects.map((project) => (
              <li
                key={project.id}
                className="hover:bg-[#555555] transition px-2 py-1 rounded"
              >
                <Link to="projects">{project.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center justify-between py-">
            <h1 className="text-base">Teams</h1>
            <div className="cursor-pointer px-1 py-1 rounded hover:bg-[#2B2C2E] transition">
              <Plus size={18} fontWeight={900} />
            </div>
          </div>
          <ul className=" flex flex-col gap-1">
            {teams.map((team) => (
              <li
                key={team.id}
                className="hover:bg-[#555555] transition px-2 py-1 rounded"
              >
                <Link to="projects">{team.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
