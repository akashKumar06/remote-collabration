import { LogOut, Settings, Menu, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router";
import { logoutUser } from "../../app/slices/auth/authThunks";

function Navbar({ onToggleSidbar }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 flex justify-between items-center px-4 md:px-6 py-3 relative z-20">
      {/* Left Section: Hamburger */}
      <div className="flex items-center gap-4">
        <button
          className="text-slate-500 hover:text-slate-900 md:hidden"
          onClick={onToggleSidbar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right Section: User Info & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full hover:bg-slate-100 transition"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-600 text-white font-semibold text-xs">
              {user.avatar}
            </span>
            <span className="hidden sm:block text-slate-700 font-medium text-sm">
              {`${user.firstname} ${user.lastname}`}
            </span>
            <ChevronDown size={14} className="hidden sm:block text-slate-400" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-[var(--shadow-pop)] border border-slate-200 py-1.5 z-20 animate-fade-in">
                <Link
                  to="/dashboard/teams/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings size={15} />
                  Settings
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-danger-600 hover:bg-danger-50"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
