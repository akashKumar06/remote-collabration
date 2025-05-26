import TaskStatusChart from "../../../components/TaskStatusChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjectTasks } from "../../../app/slices/task/taskThunk";
import SplashScreen from "../../../components/SplashScreen";
import TaskPriorityChart from "../../../components/TaskPriorityChart";
import TasksPerMemberChart from "../../../components/TaskPerMemberChart";

function ProjectDashboard() {
  const { projectTasks, loading } = useSelector((state) => state.task);
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectTasks({ projectId: currentProject._id }));
  }, [dispatch, currentProject]);

  if (loading) return <SplashScreen />;
  return (
    <div className="min-h-screen p-2  text-white">
      <h1 className="text-3xl font-bold mb-6">Project Analytics</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskStatusChart tasks={projectTasks} />
        <TaskPriorityChart tasks={projectTasks} />
      </div>
      <div>
        <TasksPerMemberChart tasks={projectTasks} />
      </div>
    </div>
  );
}

export default ProjectDashboard;
