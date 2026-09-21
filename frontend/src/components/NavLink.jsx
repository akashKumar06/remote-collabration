import { Link } from "react-router";

function NavLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 hover:bg-slate-100 rounded-lg py-1.5 px-2 transition text-slate-500 hover:text-slate-900 text-sm font-medium"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default NavLink;
