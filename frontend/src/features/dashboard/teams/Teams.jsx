import { marked } from "marked";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { User, Users2 } from "lucide-react";

const getAvatar = (firstname, lastname) => {
  return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
};

const avatarTints = [
  "bg-primary-100 text-primary-700",
  "bg-info-50 text-info-600",
  "bg-success-50 text-success-600",
  "bg-warning-50 text-warning-600",
  "bg-pink-50 text-pink-600",
];

const tintFor = (id) => {
  if (!id) return avatarTints[0];
  const sum = String(id)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarTints[sum % avatarTints.length];
};

const TeamCard = ({ team }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/teams/${team._id}`)}
      className="card-surface p-6 hover:shadow-[var(--shadow-pop)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
              <Users2 className="w-4.5 h-4.5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 truncate">{team.name}</h3>
          </div>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${tintFor(
              team.owner._id
            )}`}
          >
            {getAvatar(team.owner.firstname, team.owner.lastname)}
          </div>
        </div>
        <p
          className="text-slate-500 mb-5 text-sm leading-relaxed min-h-[40px] line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: marked((team.description || "").slice(0, 100) + "..."),
          }}
        ></p>
      </div>
      <div className="flex items-center text-slate-500 text-sm">
        <User size={14} />
        <span className="ml-2">
          {team.owner.firstname} {team.owner.lastname}
        </span>
      </div>
    </div>
  );
};

function Teams() {
  const { teams } = useSelector((state) => state.team);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
          Teams
        </h1>
        <p className="text-slate-500 mt-1">
          Every team you own or belong to.
        </p>
      </header>
      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
            <Users2 className="w-7 h-7 text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">No teams yet</h2>
          <p className="text-slate-500 text-sm mt-1">
            Create your first team from the sidebar to get started.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
