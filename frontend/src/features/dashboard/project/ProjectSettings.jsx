import { useState } from "react";
import { Trash2, Save, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import {
  deleteProject,
  updateProjectName,
} from "../../../app/slices/project/projectThunk";
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

const ProjectSettings = () => {
  const { currentProject, isUpdatingName } = useSelector(
    (state) => state.project
  );
  const { members, _id: id, name } = currentProject;
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState(() => name);
  const dispatch = useDispatch();
  const [isDeletingProject, setIsDeletingProject] = useState(false);

  const removeMember = () => {
    if (
      window.confirm(
        `Are you sure you want to remove this member?`
      )
    ) {
      // Member removal is not yet wired up to the backend.
      toast("Member removal isn't available yet.");
    }
  };

  const handleDeleteProject = async () => {
    if (
      window.confirm(
        "ARE YOU ABSOLUTELY SURE YOU WANT TO DELETE THIS PROJECT? This action cannot be undone and all data will be lost."
      )
    ) {
      setIsDeletingProject(true);
      await dispatch(deleteProject({ projectId: id }))
        .unwrap()
        .then(() => {
          toast.success("Projected deleted successfully");
          navigate("/dashboard/projects");
        })
        .catch((err) => toast.error(err?.message || err));
      setIsDeletingProject(false);
    }
  };

  const hanldeNameUpdate = async () => {
    const payload = { projectId: id, name: projectName };
    await dispatch(updateProjectName(payload))
      .unwrap()
      .then(() => toast.success("Name changed successfully."))
      .catch((err) => toast.error(err?.message || "Failed to update name"));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Project Settings
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage {name}&rsquo;s details, members and danger zone actions.
        </p>
      </div>

      {/* Project Details */}
      <section className="card-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-slate-900">Project Name</h3>
        <Input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <Button onClick={hanldeNameUpdate} loading={isUpdatingName}>
          <Save size={16} /> Save changes
        </Button>
      </section>

      {/* Team Members */}
      <section className="card-surface p-6 space-y-4">
        <h3 className="text-base font-semibold text-slate-900">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map(
            (member) =>
              member.role !== "owner" && (
                <div
                  key={member._id}
                  className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${tintFor(
                        member.user._id
                      )}`}
                    >
                      {member.user.firstname?.[0]?.toUpperCase()}
                    </span>
                    <p className="font-medium text-sm text-slate-800">
                      {`${member.user.firstname} ${member.user.lastname}`}
                    </p>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <span className="text-xs text-slate-400 capitalize">{member.role}</span>
                    <button
                      onClick={() => removeMember(member.user._id)}
                      className="flex items-center gap-1 text-danger-600 hover:text-danger-700 font-medium text-xs"
                      title="Remove Member"
                    >
                      <X size={13} /> Remove
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* Danger Zone: Delete Project */}
      <section className="rounded-2xl border border-danger-200 bg-danger-50/40 p-6">
        <h3 className="text-base font-semibold text-danger-700 mb-2">Danger Zone</h3>
        <p className="text-slate-500 mb-4 text-sm">
          Permanently delete this project and all its associated data. This
          action cannot be undone.
        </p>
        <Button variant="danger" onClick={handleDeleteProject} loading={isDeletingProject}>
          <Trash2 size={16} /> Delete project
        </Button>
      </section>
    </div>
  );
};

export default ProjectSettings;
