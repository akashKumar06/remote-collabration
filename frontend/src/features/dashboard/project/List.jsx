import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

function List() {
  const [isAdddingTask, setIsAddingTask] = useState(false);
  const [assigness, setAssignees] = useState([]);
  const { currentProject } = useSelector((state) => state.project);
  const members = currentProject.members;

  const options = [];
  members.forEach((member) => {
    if (member.role !== "owner") {
      const name = member.user.firstname + " " + member.user.lastname;
      options.push({ label: name, value: member.user._id });
    }
  });
  return (
    <div className="px-4 py-2 text-sm text-white/90">
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
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => setIsAddingTask(true)}
        >
          {isAdddingTask ? "Done" : "+ Add task"}
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
          {isAdddingTask && (
            <tr className="hover:bg-[#2B2C2E] transition">
              <td className="border-b border-r h-12 border-white/20 relative">
                <input
                  type="text"
                  className="w-full h-full border-none outline-none p-2 text-base"
                />
              </td>
              <td className="border-b h-12 border-r border-white/20 relative">
                <Select
                  isMulti
                  options={options}
                  onChange={(selectedOptions) =>
                    setAssignees(selectedOptions.map((opt) => opt.value))
                  }
                  placeholder="Select Assignees"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                      color: "white",
                      minHeight: "2.5rem",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#2B2C2E",
                      color: "white",
                      border: "none",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#3a3b3d"
                        : "transparent",
                      color: "white",
                      cursor: "pointer",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#3a3b3d",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#aaa",
                      ":hover": {
                        backgroundColor: "#555",
                        color: "white",
                      },
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#ccc",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "white",
                    }),
                  }}
                />
              </td>
              <td className="border-b border-r h-12 border-white/20 relative">
                <input
                  type="date"
                  className="w-full h-full border-none outline-none p-2 text-base"
                />
              </td>
              <td className="border-b border-r h-12 border-white/20 relative">
                <select className="w-full h-full bg-transparent text-white px-3 py-2 outline-none appearance-none">
                  <option className="bg-[#2B2C2E] text-white" value="">
                    Select Priority
                  </option>
                  <option className="bg-[#2B2C2E] text-white" value="Low">
                    Low
                  </option>
                  <option className="bg-[#2B2C2E] text-white" value="Medium">
                    Medium
                  </option>
                  <option className="bg-[#2B2C2E] text-white" value="High">
                    High
                  </option>
                </select>
              </td>
              <td className="border-b h-12 border-white/20 relative">
                <select className="w-full h-full bg-transparent text-white px-3 py-2 outline-none appearance-none">
                  <option className="bg-[#2B2C2E] text-white" value="">
                    Select Status
                  </option>
                  <option
                    className="bg-[#2B2C2E] text-white"
                    value="Not Started"
                  >
                    Not Started
                  </option>
                  <option
                    className="bg-[#2B2C2E] text-white"
                    value="In Progress"
                  >
                    In Progress
                  </option>
                  <option className="bg-[#2B2C2E] text-white" value="Completed">
                    Completed
                  </option>
                </select>
              </td>
            </tr>
          )}
          {/* <tr className="bg-[#1E1E1E] text-white">
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
          </tr> */}

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
