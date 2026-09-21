import { useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { ListTodo } from "lucide-react";

const statusColors = {
  "To Do": "bg-slate-100 text-slate-600",
  "In Progress": "bg-info-50 text-info-600",
  Blocked: "bg-danger-50 text-danger-600",
  Completed: "bg-success-50 text-success-600",
};

const priorityColors = {
  Low: "bg-success-50 text-success-600",
  Medium: "bg-warning-50 text-warning-600",
  High: "bg-danger-50 text-danger-600",
};

export default function MyTasks() {
  const { userTasks, loading } = useSelector((state) => state.task);
  const navigate = useNavigate();

  if (loading) return <SplashScreen />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">My Tasks</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Every task assigned to you, across every project.
          </p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left text-xs uppercase tracking-wide">
                <th className="py-3 px-5 font-medium border-b border-slate-200">Task</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Assignee</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Due Date</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Priority</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {userTasks.map((task) => (
                <tr
                  key={task._id}
                  onClick={() => navigate(`${task._id}`)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="py-3.5 px-5 border-b border-slate-100 font-medium text-slate-800">
                    {task.title}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100 text-slate-600">
                    {task.assignee.firstname}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100 text-slate-600">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100">
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        priorityColors[task.priority] || "bg-slate-100 text-slate-600"
                      )}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100">
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        statusColors[task.status] || "bg-slate-100 text-slate-600"
                      )}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {userTasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <ListTodo className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-slate-400 text-sm">No tasks found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
