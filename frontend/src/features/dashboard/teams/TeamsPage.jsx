import { useState } from "react";
import { UserPlus, User, Mail, CalendarCheck, ShieldCheck } from "lucide-react";

export default function TeamsPage() {
  const [members, setMembers] = useState([
    {
      name: "Akash Kumar",
      role: "Project Owner",
      joined: "Mar 25, 2025",
      status: "Active",
    },
    {
      name: "Aditi Sharma",
      role: "Frontend Developer",
      joined: "Mar 27, 2025",
      status: "Active",
    },
    {
      name: "Rohan Singh",
      role: "Backend Developer",
      joined: "Mar 28, 2025",
      status: "Active",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Contributor");

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      // In real app: send invite API
      console.log("Invited:", inviteEmail, "as", inviteRole);
      setInviteEmail("");
      setInviteRole("Contributor");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-gray-400">Manage your team and collaborators</p>
        <p className="text-sm text-gray-500">
          Total Members:{" "}
          <span className="font-semibold text-white">{members.length}</span>
        </p>
      </div>

      {/* Invite Member */}
      <div className="bg-[#2A2A2A] border border-gray-700 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <UserPlus size={20} /> Invite Member
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white"
          >
            <option>Contributor</option>
            <option>Designer</option>
            <option>Developer</option>
            <option>Project Manager</option>
          </select>
          <button
            onClick={handleInvite}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white"
          >
            Invite
          </button>
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-[#2A2A2A] border border-gray-700 p-5 rounded-xl space-y-3"
          >
            <div className="flex items-center gap-3">
              <User className="text-pink-400" />
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarCheck size={16} />
              Joined on {member.joined}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck size={16} className="text-green-400" />
              <span className="text-gray-300">{member.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Activity */}
      <div className="bg-[#2A2A2A] border border-gray-700 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
        <div className="border-l border-gray-600 pl-4 space-y-6 text-sm text-gray-300">
          <div className="relative">
            <span className="w-2 h-2 bg-blue-500 rounded-full absolute -left-5 top-1" />
            <p>Rohan Singh joined the project</p>
            <p className="text-xs text-gray-500">2 days ago</p>
          </div>
          <div className="relative">
            <span className="w-2 h-2 bg-pink-400 rounded-full absolute -left-5 top-1" />
            <p>Aditi Sharma was promoted to Frontend Dev</p>
            <p className="text-xs text-gray-500">3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
