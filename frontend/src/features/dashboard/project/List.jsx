import { Ellipsis, Plus } from "lucide-react";

function List() {
  return (
    <div className="px-8 py-6 text-sm text-white/90">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Task List</h2>
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
          + Add task
        </button>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-[#2B2C2E] text-white/80">
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Name
            </th>
            <th className="py-3 px-4 border-b border-white/30 text-left">
              Assignee
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
                  To Do
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
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="py-3 px-4 border-b border-white/20">
              Malcolm Lockyer
            </td>
            <td className="py-3 px-4 border-b border-white/20">1961</td>
            <td className="py-3 px-4 border-b border-white/20">
              Malcolm Lockyer
            </td>
            <td className="py-3 px-4 border-b border-white/20">1961</td>
          </tr>

          <tr className="hover:bg-[#2B2C2E] transition">
            <td className="py-3 px-4 border-b border-white/20">Witchy Woman</td>
            <td className="py-3 px-4 border-b border-white/20">The Eagles</td>
            <td className="py-3 px-4 border-b border-white/20">1972</td>
            <td className="py-3 px-4 border-b border-white/20">
              Malcolm Lockyer
            </td>
            <td className="py-3 px-4 border-b border-white/20">1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default List;
