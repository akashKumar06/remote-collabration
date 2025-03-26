import { Ellipsis, Plus } from "lucide-react";

function Overview() {
  return (
    <div className="p-2 text-sm text-white/80">
      <div className="p-2 flex justify-between">
        <button className="border rounded px-2 py-1"> + Add task</button>
        <nav className="flex gap-4 text-sm py-2">
          <button>Filter</button>
          <button>Sort</button>
          <button>Group</button>
          <button>Options</button>
        </nav>
      </div>
      <table className="table-auto w-full">
        <thead>
          <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
            Name
          </td>
          <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
            Assigne
          </td>
          <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
            Due Date
          </td>
          <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
            Priority
          </td>
          <td className="py-2 px-4 border-t border-b">Status</td>
        </thead>
        <tbody>
          <section className="flex gap-4 px-2 py-4 justify-start items-center">
            <span className="">To Do</span>
            <div className="cursor-pointer px-1 py-1 rounded hover:bg-[#2B2C2E] transition">
              <Plus size={20} fontWeight={900} />
            </div>

            <div className=" cursor-pointer px-1 py-1 rounded hover:bg-[#2B2C2E] transition">
              <Ellipsis size={20} fontWeight={900} />
            </div>
          </section>
          <tr>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              Malcolm Lockyer
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              1961
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              Malcolm Lockyer
            </td>
            <td className="py-2 px-4 border-t border-b">1961</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              Witchy Woman
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              The Eagles
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              1972
            </td>
            <td className="py-2 px-4 border-t border-b border-r border-white/60 hover:text-white/90 transition">
              Malcolm Lockyer
            </td>
            <td className="py-2 px-4 border-t border-b">1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
