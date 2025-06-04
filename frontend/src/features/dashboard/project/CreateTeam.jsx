import { useDispatch } from "react-redux";
import { close } from "../../../app/slices/modal";

export default function CreateTeam() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] px-4 py-10">
      <div className="w-full max-w-xl bg-[#1E1E1E] shadow-lg text-white p-6 sm:p-8 border border-gray-700 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Create a new team</h1>

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

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
            onClick={() => dispatch(close())}
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
