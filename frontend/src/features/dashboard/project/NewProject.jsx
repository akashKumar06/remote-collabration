import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { useState } from "react";
import { createProject } from "../../../app/slices/project/projectThunk";

export default function NewProject() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const { loading } = useSelector((state) => state.project);

  const handleNewProject = () => {
    const projectData = {
      name: projectName,
    };
    dispatch(createProject(projectData));
    dispatch(close());
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-4 sm:px-6 md:px-12 py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">New Project</h1>

      {/* Project Name */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="projectName">
          Project Name
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

      {/* Team & Privacy - Responsive Flex */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="block text-gray-300 mb-2">Select a Team</label>
          <select className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 text-white">
            <option>Akash&apos;s first team</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-gray-300 mb-2">Privacy</label>
          <select className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 text-white">
            <option>Shared with team</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          onClick={() => dispatch(close())}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          onClick={handleNewProject}
          disabled={loading}
        >
          {loading ? "Creating..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
