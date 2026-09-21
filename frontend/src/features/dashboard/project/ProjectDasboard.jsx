import TaskStatusChart from "../../../components/TaskStatusChart";
import TaskPriorityChart from "../../../components/TaskPriorityChart";
import TasksPerMemberChart from "../../../components/TaskPerMemberChart";
import { useSelector } from "react-redux";

function ProjectDashboard() {
  const { projectTasks } = useSelector((state) => state.task);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          A quick visual read on how this project is trending.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TaskStatusChart tasks={projectTasks} />
        <TaskPriorityChart tasks={projectTasks} />
      </div>
      <div className="mt-5">
        <TasksPerMemberChart tasks={projectTasks} />
      </div>
    </div>
  );
}

export default ProjectDashboard;
