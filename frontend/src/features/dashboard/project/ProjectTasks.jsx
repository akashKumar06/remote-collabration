import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Select from "react-select";
import { createTask } from "../../../app/slices/task/taskThunk";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { ListTodo, Plus } from "lucide-react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { lightSelectStyles } from "../../../utils/selectStyles";

const statusColors = {
  "Not Started": "bg-slate-100 text-slate-600",
  "In Progress": "bg-info-50 text-info-600",
  Completed: "bg-success-50 text-success-600",
};

const priorityColors = {
  Low: "bg-success-50 text-success-600",
  Medium: "bg-warning-50 text-warning-600",
  High: "bg-danger-50 text-danger-600",
};

const selectClass =
  "w-full h-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 appearance-none";

function ProjectTasks() {
  const [isAdddingTask, setIsAddingTask] = useState(false);
  const [assigness, setAssignees] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { currentProject } = useSelector((state) => state.project);
  const { projectTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = currentProject.members;
  const options = [];

  members.forEach((member) => {
    if (member.role !== "owner") {
      const name = member.user.firstname + " " + member.user.lastname;
      options.push({ label: name, value: member.user._id });
    }
  });

  const handleAddTask = async () => {
    const task = {
      title,
      deadline,
      priority,
      status,
      assignee: assigness[0],
      project: currentProject._id,
    };

    await dispatch(createTask(task))
      .unwrap()
      .then(() => {
        toast.success("task created");
      })
      .catch((err) => {
        toast.error(err);
      });

    setAssignees([]);
    setTitle("");
    setDeadline("");
    setPriority("");
    setStatus("");
    setIsAddingTask(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Tasks</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Everything tracked for {currentProject.name}.
          </p>
        </div>
        {user.id === currentProject.owner._id && !isAdddingTask && (
          <Button size="sm" onClick={() => setIsAddingTask(true)}>
            <Plus size={15} /> New task
          </Button>
        )}
        {isAdddingTask && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddingTask(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAddTask}>
              Add
            </Button>
          </div>
        )}
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left text-xs uppercase tracking-wide">
                <th className="py-3 px-5 font-medium border-b border-slate-200">Task</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Assignee</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Due Date</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Priority</th>
                <th className="py-3 px-5 font-medium border-b border-slate-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {isAdddingTask && (
                <tr className="bg-primary-50/40">
                  <td className="border-b border-slate-100 p-2.5">
                    <Input
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                  <td className="border-b border-slate-100 p-2.5">
                    <Select
                      isMulti
                      options={options}
                      onChange={(selectedOptions) =>
                        setAssignees(selectedOptions.map((opt) => opt.value))
                      }
                      placeholder="Select assignees"
                      styles={lightSelectStyles}
                    />
                  </td>
                  <td className="border-b border-slate-100 p-2.5">
                    <input
                      type="date"
                      className={selectClass}
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </td>
                  <td className="border-b border-slate-100 p-2.5">
                    <select
                      className={selectClass}
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </td>
                  <td className="border-b border-slate-100 p-2.5">
                    <select
                      className={selectClass}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              )}
              {projectTasks.map((task) => (
                <tr
                  key={task._id}
                  onClick={() => navigate(`/dashboard/my-tasks/${task._id}`)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="py-3.5 px-5 border-b border-slate-100 font-medium text-slate-800">
                    {task.title}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100 text-slate-600">
                    {task.assignee.firstname}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100 text-slate-600">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100">
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        priorityColors[task.priority] || "bg-slate-100 text-slate-600"
                      )}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 border-b border-slate-100">
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        statusColors[task.status] || "bg-slate-100 text-slate-600"
                      )}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {projectTasks.length === 0 && !isAdddingTask && (
                <tr>
                  <td colSpan={5} className="py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <ListTodo className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-slate-400 text-sm">No tasks yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectTasks;
