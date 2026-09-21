import { motion } from "framer-motion";
import { FolderKanban, Plus, Users2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ProjectOverviewCards from "./project/ProjectOverviewCards";
import Timeline from "../../components/Timeline";
import UpcomingTasks from "./project/UpcomingTasks";
import { Link } from "react-router";
import { Button } from "../../components/Button";
import { close, open, setActiveComponent } from "../../app/slices/modal";
import { delay } from "../../utils/delay";

function getDetails(projects, userId) {
  const total = projects.length;
  let owned = 0;
  projects.map((project) => {
    if (project?.owner && project?.owner?.user === userId) {
      owned++;
    }
  });
  return {
    total,
    owned,
  };
}

function getActivites(teams) {
  const activites = teams.reduce((acc, curr) => {
    const activity = curr.activityLogs.map((activity) => ({
      ...activity,
      id: curr._id,
      name: curr.name,
    }));
    acc.push(...activity);
    return acc;
  }, []);
  return activites;
}

export default function DashboardHome() {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  const { teams } = useSelector((state) => state.team);
  const { userTasks } = useSelector((state) => state.task);
  const { state } = useSelector((state) => state.modal);

  const projectsData = getDetails(projects, user._id);
  const teamsData = getDetails(teams, user._id);
  const activites = getActivites(teams);

  const dispatch = useDispatch();
  const handleNewProject = async (activeComponent) => {
    if (state) {
      dispatch(close());
      await delay(700);
    }
    dispatch(open());
    dispatch(setActiveComponent(activeComponent));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-1">
            Welcome back, {user.firstname} 👋
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Here&rsquo;s what&rsquo;s happening across your projects and teams.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
          <Button onClick={() => handleNewProject("new_project_form")} className="w-full sm:w-auto">
            <Plus size={16} /> New Project
          </Button>
          <Link to="/dashboard/projects" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <FolderKanban size={16} /> Browse Projects
            </Button>
          </Link>
          <Link to="/dashboard/teams" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Users2 size={16} /> Browse Teams
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProjectOverviewCards projects={projectsData} teams={teamsData} />
      </div>

      {/* Tasks and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <UpcomingTasks userTasks={userTasks} />
        <Timeline activities={activites} />
      </div>
    </div>
  );
}
