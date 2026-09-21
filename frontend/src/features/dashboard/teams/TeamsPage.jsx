import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../../components/SplashScreen";
import { getCurrentTeam } from "../../../app/slices/team/teamSlice";
import Members from "./Members";
import Timeline from "../../../components/Timeline";
import InviteMember from "./InviteMember";
import { Settings, Users2 } from "lucide-react";

export default function TeamsPage() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { currentTeam } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getCurrentTeam(teamId));
  }, [dispatch, teamId]);

  if (!currentTeam) return <SplashScreen />;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Users2 className="w-5 h-5 text-primary-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              {currentTeam.name}
            </h1>
          </div>
          <p className="text-slate-500 text-sm">Manage your team and collaborators</p>
          <p className="text-sm text-slate-400">
            Total members:{" "}
            <span className="font-semibold text-slate-700">
              {currentTeam.members.length}
            </span>
          </p>
        </div>
        <Link
          to="/dashboard/teams/settings"
          className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shrink-0"
        >
          <Settings size={18} />
        </Link>
      </div>

      <InviteMember teamId={currentTeam._id} />

      <Members members={currentTeam.members} />

      <Timeline activities={currentTeam.activityLogs} />
    </div>
  );
}
