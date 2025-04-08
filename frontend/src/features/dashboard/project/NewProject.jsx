import { useDispatch } from "react-redux";
import { close } from "../../../app/slices/modal";

export default function NewProject() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-8">
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
        />
      </div>

      <div className="flex gap-6 mb-6">
        <div>
          <label className="block text-gray-300 mb-2">Select a team</label>
          <select className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 text-white">
            <option>Akash&apos;s first team</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Privacy</label>
          <select className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 text-white">
            <option>Shared with team</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
          onClick={() => dispatch(close())}
        >
          Cancel
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
          Continue
        </button>
      </div>
    </div>
  );
}
