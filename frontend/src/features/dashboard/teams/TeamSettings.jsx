import { useState } from "react";
import { Trash2, Save, X } from "lucide-react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

const TeamSettings = () => {
  const [projectName, setProjectName] = useState("Remote Collab");
  const [members, setMembers] = useState([
    { id: 1, name: "Vaishnavi", role: "Admin" },
    { id: 2, name: "Akash", role: "Editor" },
    { id: 3, name: "Priya", role: "Viewer" },
  ]);

  const handleRoleChange = (id, newRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  const removeMember = (id) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${members.find((m) => m.id === id)?.name}?`
      )
    ) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const deleteProject = () => {
    if (
      window.confirm(
        "ARE YOU ABSOLUTELY SURE YOU WANT TO DELETE THIS TEAM? This action cannot be undone and all data will be lost."
      )
    ) {
      // Team deletion isn't wired up to the backend yet.
    }
  };

  const updateProject = () => {
    alert("Team settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">Team Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your team&rsquo;s details, members and danger zone actions.
        </p>
      </div>

      {/* Team Details */}
      <section className="card-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-slate-900">Team Name</h3>
        <Input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter team name"
        />
        <Button onClick={updateProject}>
          <Save size={16} /> Save changes
        </Button>
      </section>

      {/* Team Members */}
      <section className="card-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-slate-900">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition"
            >
              <p className="font-semibold text-sm text-slate-800 mb-3">{member.name}</p>
              <div className="flex items-center w-full justify-between gap-2">
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  className="rounded-lg border border-slate-200 text-sm px-2.5 py-1.5 text-slate-700 outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <button
                  onClick={() => removeMember(member.id)}
                  className="flex items-center gap-1 text-danger-600 hover:text-danger-700 font-medium text-xs"
                  title="Remove Member"
                >
                  <X size={13} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Danger Zone: Delete Team */}
      <section className="rounded-2xl border border-danger-200 bg-danger-50/40 p-6">
        <h3 className="text-base font-semibold text-danger-700 mb-2">Danger Zone</h3>
        <p className="text-slate-500 mb-4 text-sm">
          Permanently delete this team and all its associated data. This
          action cannot be undone.
        </p>
        <Button variant="danger" onClick={deleteProject}>
          <Trash2 size={16} /> Delete team
        </Button>
      </section>
    </div>
  );
};

export default TeamSettings;
