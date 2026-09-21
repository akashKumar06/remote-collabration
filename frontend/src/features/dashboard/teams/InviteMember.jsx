import { UserPlus } from "lucide-react";
import { useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

function InviteMember({ teamId }) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Contributor");
  const [isInviting, setIsInviting] = useState(false);
  const handleInvite = async () => {
    setIsInviting(true);
    try {
      await api.post(`/teams/${teamId}/invite`, {
        email: inviteEmail,
        role: inviteRole,
      });
      toast.success("Invitation sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send invite");
    }
    setIsInviting(false);
    setInviteEmail("");
  };

  return (
    <div className="card-surface p-6 space-y-4">
      <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
        <UserPlus size={18} className="text-primary-600" /> Invite Member
      </h2>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="flex-1"
        />
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
        >
          <option>Contributor</option>
          <option>Designer</option>
          <option>Developer</option>
          <option>Project Manager</option>
        </select>
        <Button onClick={handleInvite} loading={isInviting} disabled={!inviteEmail.trim()}>
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteMember;
