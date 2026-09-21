import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { useState } from "react";
import { createTeam } from "../../../app/slices/team/teamThunk";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { X, Users2 } from "lucide-react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

export default function CreateTeam() {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const navigate = useNavigate();
  const { isCreating } = useSelector((state) => state.team);

  const handleTeamCreation = async () => {
    await dispatch(createTeam({ name: teamName, description: teamDesc }))
      .unwrap()
      .then((team) => {
        toast.success("Team created successfully");
        navigate(`/dashboard/teams/${team._id}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    dispatch(close());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <Users2 className="w-4.5 h-4.5 text-primary-600" />
          </div>
          <h1 className="text-lg font-display font-semibold text-slate-900">
            Create a new team
          </h1>
        </div>
        <button
          onClick={() => dispatch(close())}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar px-6 py-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="teamName">
            Team name
          </label>
          <Input
            type="text"
            id="teamName"
            placeholder='For example: "Backend Team"'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="teamDesc">
            Team description
          </label>
          <textarea
            id="teamDesc"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100 resize-none"
            value={teamDesc}
            onChange={(e) => setTeamDesc(e.target.value)}
            rows={4}
            placeholder="Describe your team..."
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-200 shrink-0">
        <Button variant="outline" onClick={() => dispatch(close())}>
          Cancel
        </Button>
        <Button onClick={handleTeamCreation} loading={isCreating} disabled={!teamName.trim()}>
          Create team
        </Button>
      </div>
    </div>
  );
}
