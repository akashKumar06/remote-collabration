import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function getSortedFilteredTask(tasks, filter) {
  if (filter === "Completed") {
    const newTasks = tasks.filter((task) => task.status === "Completed");
    newTasks.sort((a, b) => a.updatedAt - b.updatedAt);
    return newTasks;
  } else if (filter === "In Progress") {
    const newTasks = tasks.filter((task) => task.status === "In Progress");
    newTasks.sort((a, b) => a.createdAt - b.createdAt);
    return newTasks;
  } else {
    const newTasks = tasks.filter((task) => task.status === "Not Started");
    newTasks.sort((a, b) => a.createdAt - b.createdAt);
    return newTasks;
  }
}

function MileStones() {
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(true);
  const { projectTasks } = useSelector((state) => state.task);

  const tasks = projectTasks.map((task) => ({
    ...task,
    createdAt: Date.parse(task.createdAt),
    updatedAt: Date.parse(task.updatedAt),
  }));

  const completed = getSortedFilteredTask(tasks, "Completed");
  const notStarted = getSortedFilteredTask(tasks, "Not Started");
  const inProgress = getSortedFilteredTask(tasks, "In Progress");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[#2A2A2A] p-4 md:p-6 rounded-2xl border border-gray-700 w-full min-h-[100px]"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsMilestonesOpen(!isMilestonesOpen)}
      >
        <h2 className="text-base md:text-lg font-semibold">Milestones</h2>
        {isMilestonesOpen ? <ChevronDown /> : <ChevronRight />}
      </div>

      {isMilestonesOpen && (
        <div className="space-y-3 mt-4 text-sm md:text-base">
          {completed.length !== 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              <CalendarCheck size={16} className="text-green-400 mt-0.5" />
              <span className="break-words">{completed.at(-1).title} - <span className="text-green-300">Completed</span></span>
            </div>
          )}
          {inProgress.length !== 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              <CalendarCheck size={16} className="text-yellow-400 mt-0.5" />
              <span className="break-words">{inProgress[0].title} - <span className="text-yellow-300">In Progress</span></span>
            </div>
          )}
          {notStarted.length !== 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              <CalendarCheck size={16} className="text-gray-400 mt-0.5" />
              <span className="break-words">{notStarted[0].title} - <span className="text-gray-300">Pending</span></span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default MileStones;
