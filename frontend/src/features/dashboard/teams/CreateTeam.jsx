import { useDispatch } from "react-redux";
import { close } from "../../../app/slices/modal";

export default function CreateTeam() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#121212] px-4 py-10">
      <div className="w-full max-w-2xl bg-[#1E1E1E]/80 backdrop-blur-md shadow-2xl border border-gray-700 text-white p-6 sm:p-8 rounded-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Create a New Team
        </h1>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="teamName">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            className="w-full bg-[#2A2A2A] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder='For example: "My first Team" or "Backend Team'
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="teamName">
            Team Description
          </label>
          <textarea
            type="text"
            id="teamName"
            className="w-full bg-[#2A2A2A] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="members">
            Members
          </label>
          <input
            type="text"
            id="members"
            className="w-full bg-[#2A2A2A] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Add team members by name or email..."
          />
        </div> */}

        {/* <div className="mb-6">
          <label className="block text-gray-400 mb-3">Team Privacy</label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
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
        </div> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
          <button
            className="cursor-pointer w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white py-2.5 px-5 rounded-lg transition-all"
            onClick={() => dispatch(close())}
          >
            Cancel
          </button>
          <button className=" cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg transition-all">
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
