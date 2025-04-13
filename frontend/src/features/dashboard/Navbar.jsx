import { LogOut, Settings, User } from "lucide-react";

function Navbar() {
  const user = {
    name: "John Doe",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff",
  };

  return (
    <div className="bg-[#2e2e30] p-3 border border-[#424244] flex justify-between items-center px-6">
      {/* App Logo / Title (optional) */}
      <h1 className="text-white text-lg font-semibold">REMOTE COLLAB</h1>

      {/* User Info & Options */}
      <div className="flex items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-white font-medium text-sm">{user.name}</span>
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
          <div className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition">
            <LogOut size={16} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
