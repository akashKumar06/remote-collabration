import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";

// Dummy data for demonstration
const projectTasks = [
  {
    _id: "1",
    title: "Design UI",
    assignee: { firstname: "John" },
    deadline: "2025-06-15",
    priority: "High",
    status: "In Progress",
  },
  {
    _id: "2",
    title: "Write Backend API",
    assignee: { firstname: "Jane" },
    deadline: "2025-06-18",
    priority: "Medium",
    status: "Not Started",
  },
];

const statusColors = {
  "Not Started": "bg-zinc-700 text-zinc-300",
  "In Progress": "bg-blue-600 text-white",
  Completed: "bg-green-600 text-white",
};

const priorityColors = {
  Low: "bg-green-600 text-white",
  Medium: "bg-yellow-500 text-black",
  High: "bg-red-500 text-white",
};

export default function ResponsiveTaskList() {
  const navigate = useNavigate();
  const [tasks] = useState(projectTasks);

  return (
    <div className="px-4 py-6 text-white bg-[#1a1a1a] min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Task List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="bg-[#2B2C2E] text-white/80 text-left">
              <th className="py-3 px-4 border-b border-white/30">Task</th>
              <th className="py-3 px-4 border-b border-white/30">Assignee</th>
              <th className="py-3 px-4 border-b border-white/30">Due Date</th>
              <th className="py-3 px-4 border-b border-white/30">Priority</th>
              <th className="py-3 px-4 border-b border-white/30">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                onClick={() => navigate(`/dashboard/my-tasks/${task._id}`)}
                className="block md:table-row border-b border-white/20 hover:bg-[#2B2C2E] transition cursor-pointer"
              >
                <td className="py-3 px-4 block md:table-cell">
                  <span className="md:hidden font-medium">Task: </span>
                  {task.title}
                </td>
                <td className="py-3 px-4 block md:table-cell">
                  <span className="md:hidden font-medium">Assignee: </span>
                  {task.assignee.firstname}
                </td>
                <td className="py-3 px-4 block md:table-cell">
                  <span className="md:hidden font-medium">Due Date: </span>
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 block md:table-cell">
                  <span className="md:hidden font-medium">Priority: </span>
                  <span
                    className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium inline-block mt-1 md:mt-0",
                      priorityColors[task.priority]
                    )}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4 block md:table-cell">
                  <span className="md:hidden font-medium">Status: </span>
                  <span
                    className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium inline-block mt-1 md:mt-0",
                      statusColors[task.status]
                    )}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
