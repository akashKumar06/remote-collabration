import UserLogo from "../../../components/UserLogo";

function Messages() {
  return (
    <div className=" mt-0.2 flex flex-col items-center justify-center p-10 gap-6 min-h-screen bg-gray-1000 text-white">
      
      {/* User Logo and Message Button */}
      <div className="flex flex-col items-center text-center w-full max-w-xl p-6 bg-gray-1000 rounded-lg shadow-md">
        <UserLogo />
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Send message to members
        </button>
      </div>

      {/* Message Text */}
      <div className="text-center w-full max-w-lg">
        <p className="text-gray-400 text-sm">
          Try clearing your filters or switching types to see more results.
        </p>
      </div>

      {/* Adjust Filters Button */}
      <div className="text-center w-full">
        <button className="mt-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Adjust filters
        </button>
      </div>
      
    </div>
  );
}

export default Messages;
