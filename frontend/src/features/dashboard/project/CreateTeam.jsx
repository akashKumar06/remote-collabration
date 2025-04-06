import { useDispatch } from "react-redux";
import { close } from "../../../app/slices/modal";

export default function CreateTeam() {
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen w-xl shadow-lg  bg-[#1E1E1E] text-white p-8">
      <h1 className="text-3xl font-semibold mb-8">Create a new team</h1>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="teamName">
          Team name
        </label>
        <input
          type="text"
          id="teamName"
          className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder='For example: "Marketing" or "Design"'
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="members">
          Members
        </label>
        <input
          type="text"
          id="members"
          className="w-full bg-[#1E1E1E] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Add team members by name or email..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Team privacy</label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="privacy"
              id="membership"
              className="accent-blue-500"
              defaultChecked
            />
            <label htmlFor="membership" className="text-gray-300">
              Membership by request
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="privacy"
              id="private"
              className="accent-blue-500"
            />
            <label htmlFor="private" className="text-gray-300">
              Private
            </label>
          </div>
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
          Create Team
        </button>
      </div>
    </div>
  );
}
