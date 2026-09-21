import { motion } from "framer-motion";
import { Crown, FolderKanban, Users, Users2 } from "lucide-react";

const stats = (projects, teams) => [
  {
    icon: FolderKanban,
    label: "Total Projects",
    value: projects.total,
    tint: "bg-primary-50 text-primary-600",
  },
  {
    icon: Crown,
    label: "Owned Projects",
    value: projects.owned,
    tint: "bg-warning-50 text-warning-600",
  },
  {
    icon: Users,
    label: "Collaborating On",
    value: projects.total - projects.owned,
    tint: "bg-info-50 text-info-600",
  },
  {
    icon: Users2,
    label: "Total Teams",
    value: teams.total,
    tint: "bg-success-50 text-success-600",
  },
  {
    icon: Crown,
    label: "Owned Teams",
    value: teams.owned,
    tint: "bg-pink-50 text-pink-600",
  },
];

function ProjectOverviewCards({ teams, projects }) {
  return (
    <>
      {stats(projects, teams).map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * idx }}
          className="card-surface p-5 flex flex-col gap-3 hover:shadow-[var(--shadow-pop)] transition-shadow"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.tint}`}>
            <stat.icon size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900">{stat.value}</h2>
            <span className="text-sm text-slate-500">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default ProjectOverviewCards;
