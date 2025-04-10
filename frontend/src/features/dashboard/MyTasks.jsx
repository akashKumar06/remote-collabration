import { Ellipsis, Plus } from "lucide-react";

export default function MyTasks() {
  return (
    <div className="px-8 py-6 text-sm text-white/90">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">My Tasks</h2>
        <nav className="flex gap-3 text-sm">
          <button className="px-3 py-1 hover:bg-[#2B2C2E] rounded transition">
            Filter
          </button>
          <button className="px-3 py-1 hover:bg-[#2B2C2E] rounded transition">
            Sort
          </button>
          <button className="px-3 py-1 hover:bg-[#2B2C2E] rounded transition">
            Group
          </button>
          <button className="px-3 py-1 hover:bg-[#2B2C2E] rounded transition">
            Options
          </button>
        </nav>
      </div>

      <div className="mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
          + Add Task
        </button>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-[#2B2C2E] text-white/80">
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Task
            </th>
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Project
            </th>
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Due Date
            </th>
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Priority
            </th>
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#1E1E1E] text-white">
            <td colSpan={5} className="py-4 px-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-lg font-semibold text-white">
                  Today
                </div>
                <div className="flex gap-2">
                  <div className="cursor-pointer p-2 rounded hover:bg-[#2B2C2E] transition">
                    <Plus size={18} />
                  </div>
                  <div className="cursor-pointer p-2 rounded hover:bg-[#2B2C2E] transition">
                    <Ellipsis size={18} />
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-[#2B2C2E] transition">
            <td className="py-3 px-4 border-b border-white/20">
              Design login page
            </td>
            <td className="py-3 px-4 border-b border-white/20">Auth System</td>
            <td className="py-3 px-4 border-b border-white/20">Apr 9, 2025</td>
            <td className="py-3 px-4 border-b border-white/20">High</td>
            <td className="py-3 px-4 border-b border-white/20">In Progress</td>
          </tr>

          <tr className="hover:bg-[#2B2C2E] transition">
            <td className="py-3 px-4 border-b border-white/20">
              Fix bug on dashboard
            </td>
            <td className="py-3 px-4 border-b border-white/20">
              Project Tracker
            </td>
            <td className="py-3 px-4 border-b border-white/20">Apr 10, 2025</td>
            <td className="py-3 px-4 border-b border-white/20">Medium</td>
            <td className="py-3 px-4 border-b border-white/20">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
