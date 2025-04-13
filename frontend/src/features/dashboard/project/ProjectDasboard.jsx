import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Recently", tasks: 2 },
  { name: "Do today", tasks: 0 },
  { name: "Do next", tasks: 0 },
  { name: "Do later", tasks: 0 },
];

const completionData = [
  { name: "Completed", value: 0 },
  { name: "Incomplete", value: 2 },
];

const projectData = [
  { name: "Project A", tasks: 2 },
  { name: "Project B", tasks: 0 },
];

const timeData = [
  { date: "03/26", total: 2, completed: 0 },
  { date: "03/27", total: 2, completed: 0 },
  { date: "03/28", total: 2, completed: 0 },
  { date: "03/29", total: 2, completed: 0 },
  { date: "03/30", total: 2, completed: 0 },
];

const COLORS = ["#4f46e5", "#d3d3d3"];

function ProjectDashboard() {
  const taskCategories = [
    "Completed tasks",
    "Incomplete tasks",
    "Overdue tasks",
    "Total tasks",
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Task Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {taskCategories.map((category, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-gray-1000 text-center shadow-sm border border-gray-800 text-sm font-medium"
          >
            {category}
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-3 bg-gray-1000 rounded-xl shadow-sm border border-gray-800">
          <h2 className="text-base font-semibold mb-3">
            Total tasks by section
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
              />
              <Bar
                dataKey="tasks"
                fill="#4f46e5"
                barSize={24}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-gray-1000 rounded-xl shadow-sm border border-gray-800">
          <h2 className="text-base font-semibold mb-3">
            Tasks by completion status
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {completionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-3 bg-gray-1000 rounded-xl shadow-sm border border-gray-800">
          <h2 className="text-base font-semibold mb-3">
            Total tasks by project
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
              />
              <Bar
                dataKey="tasks"
                fill="#4f46e5"
                barSize={24}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-gray-1000 rounded-xl shadow-sm border border-gray-800">
          <h2 className="text-base font-semibold mb-3">
            Task completion over time
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
              />
              <Bar
                dataKey="total"
                fill="#d3d3d3"
                barSize={24}
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="completed"
                fill="#4f46e5"
                barSize={24}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
