import { useState } from "react";
import { motion } from "framer-motion";

const statusOptions = ["To Do", "In Progress", "Blocked", "Completed"];
const priorityColors = {
  Low: "text-green-400",
  Medium: "text-yellow-400",
  High: "text-red-500",
};

export default function Task({ task }) {
  const [status, setStatus] = useState("hello");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // TODO: Make API call to update status
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-zinc-900 rounded-2xl shadow-lg text-white space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">{task.title}</h1>
        <p className="text-zinc-400">{task.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-500">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full mt-1 bg-zinc-800 text-white p-2 rounded-md border border-zinc-700 focus:outline-none"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s} className="bg-zinc-800">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-500">Priority</label>
          <p className={`mt-2 font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </p>
        </div>

        <div>
          <label className="block text-sm text-zinc-500">Deadline</label>
          <p className="mt-2 text-zinc-300">
            {new Date(task.deadline).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Example props to test the component
// <SingleTaskPage
//   task={{
//     title: "Fix login bug",
//     description: "Users can't login when using special characters in password.",
//     status: "In Progress",
//     priority: "High",
//     deadline: "2025-05-30T17:00:00Z"
//   }}
// />
