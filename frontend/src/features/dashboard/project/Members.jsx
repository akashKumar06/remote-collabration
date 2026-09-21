import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

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

function Members({ currentProject }) {
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = async () => {
    setIsInviting(true);
    const memberData = {
      email: newMember.trim(),
    };

    try {
      const res = await api.post(
        `/projects/${currentProject._id}/invite`,
        memberData
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setIsInviting(false);
    setNewMember("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="card-surface p-6"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsMembersOpen(!isMembersOpen)}
      >
        <h2 className="text-base font-semibold text-slate-900">Project Members</h2>
        {isMembersOpen ? (
          <ChevronDown className="text-slate-400" size={18} />
        ) : (
          <ChevronRight className="text-slate-400" size={18} />
        )}
      </div>
      {isMembersOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-2.5 mt-4">
            {currentProject.members.map((member) => (
              <div key={member._id} className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${tintFor(
                    member.user._id
                  )}`}
                >
                  {member.user.firstname?.[0]?.toUpperCase()}
                </span>
                <span className="text-sm text-slate-700">{member.user.firstname}</span>
                <span className="ml-auto text-xs text-slate-400 italic capitalize">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-6">
            <Input
              type="email"
              placeholder="Enter email"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddMember} loading={isInviting} disabled={!newMember.trim()}>
              <UserPlus size={15} /> Invite
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Members;
