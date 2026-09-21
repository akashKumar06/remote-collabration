import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { useState } from "react";
import { createProject } from "../../../app/slices/project/projectThunk";
import Select from "react-select";
import { X, FolderPlus } from "lucide-react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { lightSelectStyles } from "../../../utils/selectStyles";

const projectTags = [
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "Python", value: "Python" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "AWS", value: "AWS" },
  { label: "Docker", value: "Docker" },
  { label: "Firebase", value: "Firebase" },
  { label: "API", value: "API" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "CSS3", value: "CSS3" },
  { label: "HTML5", value: "HTML5" },
  { label: "GraphQL", value: "GraphQL" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "Vue.js", value: "Vue.js" },
  { label: "Angular", value: "Angular" },
  { label: "CI/CD", value: "CI/CD" },
  { label: "Blockchain", value: "Blockchain" },
  { label: "Mobile App", value: "Mobile App" },
  { label: "UX Design", value: "UX Design" },
  { label: "UI Design", value: "UI Design" },
  { label: "Agile", value: "Agile" },
  { label: "Scrum", value: "Scrum" },
  { label: "Project Management", value: "Project Management" },
  { label: "User Research", value: "User Research" },
  { label: "Marketing", value: "Marketing" },
  { label: "Analytics", value: "Analytics" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "SaaS", value: "SaaS" },
  { label: "Prototyping", value: "Prototyping" },
  { label: "Leadership", value: "Leadership" },
  { label: "Collaboration", value: "Collaboration" },
  { label: "Innovation", value: "Innovation" },
  { label: "Content Strategy", value: "Content Strategy" },
  { label: "Fintech", value: "Fintech" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "EdTech", value: "EdTech" },
  { label: "SEO", value: "SEO" },
  { label: "Customer Support", value: "Customer Support" },
];

export default function NewProject() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [teamsSelected, setTeamsSelected] = useState([]);

  const { loading } = useSelector((state) => state.project);
  const { teams } = useSelector((state) => state.team);

  const options = teams.map((team) => ({ label: team.name, value: team._id }));

  const handleNewProject = () => {
    const projectData = {
      name: projectName,
      teamIds: teamsSelected,
      tags,
    };

    dispatch(createProject(projectData));
    dispatch(close());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <FolderPlus className="w-4.5 h-4.5 text-primary-600" />
          </div>
          <h1 className="text-lg font-display font-semibold text-slate-900">
            New project
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="projectName">
            Project name
          </label>
          <Input
            type="text"
            id="projectName"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="projectTags">
            Project tags
          </label>
          <Select
            inputId="projectTags"
            isMulti={true}
            options={projectTags}
            onChange={(selectedOptions) =>
              setTags(selectedOptions.map((opt) => opt.value))
            }
            placeholder="Select project tags"
            styles={lightSelectStyles}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Select a team
          </label>
          <Select
            isMulti={true}
            options={options}
            onChange={(selectedOptions) => {
              setTeamsSelected(selectedOptions.map((opt) => opt.value));
            }}
            placeholder="Select team"
            styles={lightSelectStyles}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-200 shrink-0">
        <Button variant="outline" onClick={() => dispatch(close())}>
          Cancel
        </Button>
        <Button onClick={handleNewProject} loading={loading} disabled={!projectName.trim()}>
          Create project
        </Button>
      </div>
    </div>
  );
}
