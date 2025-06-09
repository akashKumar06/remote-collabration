import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { useState } from "react";
import { createProject } from "../../../app/slices/project/projectThunk";
import Select from "react-select";
export default function NewProject() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const { loading } = useSelector((state) => state.project);
  const [teamSelected, setTeamSelected] = useState([]);

  const { teams } = useSelector((state) => state.team);

  const options = [];

  teams.forEach((team) => {
    options.push({ label: team.name, value: team._id });
  });

  const handleNewProject = () => {
    const projectData = {
      name: projectName,
      teamId: teamSelected,
    };

    dispatch(createProject(projectData));
    dispatch(close());
  };

  return (
    <div className="min-h-screen w-xl bg-[#1E1E1E] text-white p-8">
      <h1 className="text-3xl font-semibold mb-8">New project</h1>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="projectName">
          Project name
        </label>
        <input
          type="text"
          id="projectName"
          className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      {/* <div className="flex gap-6 mb-6"> */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Select a team</label>
        <Select
          options={options}
          onChange={(selectedOptions) =>
            setTeamSelected(selectedOptions.map((opt) => opt.value))
          }
          placeholder="Select Team"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              boxShadow: "none",
              borderColor: "#4a5565",
              color: "white",
              minHeight: "2.5rem",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#2B2C2E",
              color: "white",
              border: "#4a5565",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#3a3b3d" : "transparent",
              color: "white",
              cursor: "pointer",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#3a3b3d",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: "#aaa",
              ":hover": {
                backgroundColor: "#555",
                color: "white",
              },
            }),
            placeholder: (base) => ({
              ...base,
              color: "#ccc",
            }),
            input: (base) => ({
              ...base,
              color: "white",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
          }}
        />
      </div>

      {/* <div>
          <label className="block text-gray-300 mb-2">Privacy</label>
          <select className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 text-white">
            <option>Shared with team</option>
          </select>
        </div> */}
      {/* </div> */}

      <div className="flex gap-4 justify-end">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
          onClick={() => dispatch(close())}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          onClick={handleNewProject}
          disabled={loading}
        >
          {loading ? "Creating.." : "Continue"}
        </button>
      </div>
    </div>
  );
}
