import { Ellipsis, Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks } from "../../app/slices/task/taskThunk";
import SplashScreen from "../../components/SplashScreen";
import { open, setActiveComponent } from "../../app/slices/modal";

export default function MyTasks() {
  const { userTasks, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserTasks({ userId: user._id }));
  }, [dispatch, user]);

  if (loading) return <SplashScreen />;
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

          {userTasks.map((task) => (
            <tr
              className="hover:bg-[#2B2C2E] cursor-pointer transition"
              key={task._id}
              onClick={() => {
                dispatch(open());
                dispatch(setActiveComponent("view_task"));
              }}
            >
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
