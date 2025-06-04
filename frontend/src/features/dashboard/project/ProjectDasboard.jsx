import TaskStatusChart from "../../../components/TaskStatusChart";
import TaskPriorityChart from "../../../components/TaskPriorityChart";
import TasksPerMemberChart from "../../../components/TaskPerMemberChart";
import { useSelector } from "react-redux";

function ProjectDashboard() {
  const { projectTasks } = useSelector((state) => state.task);

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Project Analytics
      </h1>

      {/* Responsive Grid for status and priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <TaskStatusChart tasks={projectTasks} />
        <TaskPriorityChart tasks={projectTasks} />
      </div>

      {/* Full width chart for tasks per member */}
      <div className="max-w-4xl mx-auto">
        <TasksPerMemberChart tasks={projectTasks} />
      </div>
    </div>
  );
}

export default ProjectDashboard;
