import { format } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Activity } from "lucide-react";

function Timeline({ activities }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 }}
      className="card-surface p-6 max-h-96 overflow-y-auto thin-scrollbar"
    >
      <h2 className="text-base font-semibold text-slate-900 mb-4">Activity Timeline</h2>
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <Activity className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-sm text-slate-400">No recent activity</p>
        </div>
      ) : (
        <div className="border-l-2 border-primary-100 pl-4 space-y-5">
          {activities
            .slice()
            .reverse()
            .map((activity) => (
              <div key={activity._id} className="relative">
                <span className="w-2 h-2 bg-primary-500 rounded-full absolute -left-[21px] top-1.5" />
                {activity.name && (
                  <Link
                    to={`/dashboard/teams/${activity.id}`}
                    className="font-medium text-sm text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {activity.name}
                  </Link>
                )}
                <p className="text-sm text-slate-700">{activity.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {format(new Date(activity.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            ))}
        </div>
      )}
    </motion.div>
  );
}

export default Timeline;
