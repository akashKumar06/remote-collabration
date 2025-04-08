export default function DashboardHome() {
  const recentProjects = [
    { title: "Client Portal Redesign", progress: 70, tasks: 8 },
    { title: "Mobile App Launch", progress: 40, tasks: 12 },
    { title: "Marketing Strategy", progress: 90, tasks: 5 },
  ];

  const taskSummary = [
    { label: "Completed", count: 12, color: "bg-green-500" },
    { label: "In Progress", count: 5, color: "bg-yellow-500" },
    { label: "Pending", count: 3, color: "bg-red-500" },
  ];

  const teams = [
    { name: "Frontend Squad", members: 5, project: "Client Portal" },
    { name: "Backend Core", members: 3, project: "App API" },
  ];

  return (
    <div className="min-h-screen bg-[#1e1f22] text-white p-6">
      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-6">
        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium">
            + Create Project
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
            + Create Team
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
            View My Tasks
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
            All Projects
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-[#2a2b2f] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {recentProjects.map((proj, i) => (
              <div
                key={i}
                className="bg-[#383a3f] rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between mb-1">
                  <h3 className="font-semibold">{proj.title}</h3>
                  <span className="text-sm text-gray-400">
                    {proj.tasks} Tasks
                  </span>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${proj.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Summary */}
        <div className="bg-[#2a2b2f] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Task Summary</h2>
          <div className="space-y-3">
            {taskSummary.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#383a3f] px-4 py-3 rounded-lg"
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${item.color} bg-opacity-20`}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="mt-8 bg-[#2a2b2f] rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Your Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map((team, i) => (
            <div
              key={i}
              className="bg-[#383a3f] rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">👥 {team.name}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {team.members} members • Assigned to{" "}
                <span className="text-white font-medium">{team.project}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
