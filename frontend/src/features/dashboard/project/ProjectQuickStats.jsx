import { CalendarCheck, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function ProjectQuickStats() {
  const { projectTasks } = useSelector((state) => state.task);
  const completedProjects = projectTasks.reduce((acc, curr) => {
    if (curr.status === "Completed") acc += 1;
    return acc;
  }, 0);
  const width = projectTasks.length
    ? (completedProjects / projectTasks.length) * 100
    : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="card-surface p-6"
    >
      <h2 className="text-base font-semibold text-slate-900 mb-3">Project Stats</h2>
      <div className="flex items-center gap-2.5 text-sm text-slate-600">
        <ClipboardList size={16} className="text-primary-600" />
        <span>
          {completedProjects} / {projectTasks.length} tasks completed
        </span>
      </div>
      <div className="w-full mt-3 bg-slate-100 rounded-full h-2">
        <div
          className="bg-success-500 h-2 rounded-full transition-all"
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <div className="flex items-center gap-2.5 mt-4 text-sm text-slate-600">
        <CalendarCheck size={16} className="text-warning-500" />
        <span>Deadline: April 20</span>
      </div>
    </motion.div>
  );
}

export default ProjectQuickStats;
