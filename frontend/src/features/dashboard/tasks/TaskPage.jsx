import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTask } from "../../../app/slices/task/taskSlice";
import SplashScreen from "../../../components/SplashScreen";
import { changeTaskStatus } from "../../../app/slices/task/taskThunk";
import toast from "react-hot-toast";
import { Button } from "../../../components/Button";
import { CalendarClock, Flag } from "lucide-react";

const statusOptions = ["Not Started", "In Progress", "Completed"];
const statusColors = {
  "Not Started": "bg-slate-100 text-slate-600",
  "In Progress": "bg-warning-50 text-warning-600",
  Completed: "bg-success-50 text-success-600",
};
const priorityColors = {
  Low: "text-success-600",
  Medium: "text-warning-600",
  High: "text-danger-600",
};

export default function TaskPage() {
  const { currentTask: task, isUpdatingStatus } = useSelector(
    (state) => state.task
  );
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  async function handleStatusChange() {
    dispatch(changeTaskStatus({ taskId, status }))
      .unwrap()
      .then(() => toast.success("Task status updated successfully."))
      .catch((err) => toast.error(err.message));
  }

  useEffect(() => {
    dispatch(getCurrentTask(taskId));
  }, [dispatch, task, taskId]);

  if (!task) return <SplashScreen />;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <motion.div
        className="card-surface p-6 sm:p-8 space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2">
            {task.title}
          </h1>
          <p className="text-slate-500">{task.description}</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
              <CalendarClock size={13} /> Deadline
            </label>
            <p className="text-slate-700 font-medium">
              {new Date(task.deadline).toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
            <span
              className={`${statusColors[task.status]} px-3 py-1 rounded-full inline-block text-sm font-medium`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
              <Flag size={13} /> Priority
            </label>
            <p className={`font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            Change Status
          </label>
          <div className="flex flex-wrap gap-2.5">
            {statusOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition border ${
                  status === option
                    ? "border-primary-300 bg-primary-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={option}
                  onChange={() => setStatus(option)}
                  className="accent-primary-600"
                />
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${statusColors[option]}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={handleStatusChange} loading={isUpdatingStatus} disabled={!status}>
            Save changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
