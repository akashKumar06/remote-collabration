import { LogOut, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/slices/auth/authThunks";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-[#2e2e30] p-3 border border-[#424244] flex justify-between items-center px-6">
      {/* App Logo / Title (optional) */}
      <h1 className="text-white text-lg font-semibold">RemoteSync</h1>

      {/* User Info & Options */}
      <div className="flex items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <p className=" flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm text-center">
            {user.avatar}
          </p>
          <span className="text-white font-medium text-sm">
            {`${user.firstname} ${user.lastname}`}
          </span>
        </div>

        {/* Options */}
        <div className="flex items-center gap-6 text-white text-sm font-medium">
          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition">
            <User size={16} />
            <span>Profile</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition">
            <Settings size={16} />
            <span>Settings</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition"
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
