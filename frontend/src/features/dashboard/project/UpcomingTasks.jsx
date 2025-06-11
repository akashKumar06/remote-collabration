import { motion } from "framer-motion";

const getTasks = (tasks) => {
  return tasks.filter((tasks) => tasks.deadline > Date.now());
};
function UpcomingTasks({ userTasks }) {
  const upcomingTasks = getTasks(userTasks);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700 max-h-90 overflow-y-scroll no-scrollbar"
    >
      <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
      <div className="border-l border-gray-600 pl-4 space-y-6 text-sm text-gray-300">
        {upcomingTasks.length === 0 ? (
          <h1>No upcoming tasks 😊</h1>
        ) : (
          upcomingTasks.map((task) => (
            <div key={task._id} className="flex flex-col gap-1">
              <span className="font-medium">{task.title}</span>
              <span className="text-sm text-gray-400">
                {task.project.name} • Due {task.deadline}
              </span>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default UpcomingTasks;
