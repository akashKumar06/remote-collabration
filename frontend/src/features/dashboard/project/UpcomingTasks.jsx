import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

const getTasks = (tasks) => {
  const now = new Date();

  return tasks.filter((task) => new Date(task.deadline) > now);
};

function UpcomingTasks({ userTasks }) {
  const upcomingTasks = getTasks(userTasks);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="card-surface p-6 max-h-96 overflow-y-auto thin-scrollbar"
    >
      <h2 className="text-base font-semibold text-slate-900 mb-4">Upcoming Tasks</h2>
      {upcomingTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <CalendarClock className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-sm text-slate-400">No upcoming tasks</p>
        </div>
      ) : (
        <div className="border-l-2 border-primary-100 pl-4 space-y-5">
          {upcomingTasks.map((task) => (
            <div key={task._id} className="flex flex-col gap-0.5 relative">
              <span className="w-2 h-2 bg-primary-500 rounded-full absolute -left-[21px] top-1.5" />
              <span className="font-medium text-sm text-slate-800">{task.title}</span>
              <span className="text-xs text-slate-500">
                {task.project.name} &middot; Due{" "}
                {format(new Date(task.deadline), "MMM d, yyyy")}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default UpcomingTasks;
