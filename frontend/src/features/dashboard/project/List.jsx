import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  createTask,
  getProjectTasks,
} from "../../../app/slices/task/taskThunk";
import SplashScreen from "../../../components/SplashScreen";

function List() {
  const [isAdddingTask, setIsAddingTask] = useState(false);
  const [assigness, setAssignees] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { currentProject } = useSelector((state) => state.project);
  const { projectTasks, loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const members = currentProject.members;

  const options = [];
  members.forEach((member) => {
    if (member.role !== "owner") {
      const name = member.user.firstname + " " + member.user.lastname;
      options.push({ label: name, value: member.user._id });
    }
  });

  const handleAddTask = () => {
    const task = {
      title,
      deadline,
      priority,
      status,
      assignee: assigness[0],
      project: currentProject._id,
    };
    dispatch(createTask(task))
      .unwrap()
      .then(() => {
        toast.success("task created");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    // fetch the tasks belonging to the current project
    dispatch(getProjectTasks({ projectId: currentProject._id }));
  }, [dispatch, currentProject]);

  if (loading) return <SplashScreen />;
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
      {user._id === currentProject.owner._id && (
        <div className="mb-4">
          {!isAdddingTask ? (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              onClick={() => setIsAddingTask(true)}
            >
              Create new task
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              onClick={handleAddTask}
            >
              Add
            </button>
          )}
        </div>
      )}
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
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </td>
              <td className="border-b border-r h-12 border-white/20 relative">
                <select
                  className="w-full h-full bg-transparent text-white px-3 py-2 outline-none appearance-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
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
                <select
                  className="w-full h-full bg-transparent text-white px-3 py-2 outline-none appearance-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
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

          {projectTasks.map((task) => (
            <tr className="hover:bg-[#2B2C2E] transition" key={task._id}>
              <td className="py-3 px-4 border-b border-white/20">
                {task.title}
              </td>
              <td className="py-3 px-4 border-b border-white/20">
                {task.assignee.firstname}
              </td>
              <td className="py-3 px-4 border-b border-white/20">
                {task.deadline}
              </td>
              <td className="py-3 px-4 border-b border-white/20">
                {task.priority}
              </td>
              <td className="py-3 px-4 border-b border-white/20">
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
