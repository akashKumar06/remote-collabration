import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
    <div className="h-screen overflow-auto p-5 bg-space-900 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {taskCategories.map((category, index) => (
          <div key={index} className="p-4 border rounded shadow-md bg-gray-1000">
            {category}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center ml-12">
        <div className="p-4 bg-gray-1000 border rounded text-white shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Total tasks by section</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }} />
              <Bar dataKey="tasks" fill="#4f46e5" barSize={40} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-gray-1000 border rounded text-white shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Tasks by completion status this upcoming month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={completionData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} fill="#8884d8" dataKey="value">
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center ml-12">
        <div className="p-4 bg-gray-1000 border rounded text-white shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Total tasks by project</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }} />
              <Bar dataKey="tasks" fill="#4f46e5" barSize={40} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-gray-1000 border rounded text-white shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Task completion over time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip wrapperStyle={{ backgroundColor: "#333", borderRadius: "5px" }} />
              <Bar dataKey="total" fill="#d3d3d3" barSize={40} radius={[5, 5, 0, 0]} />
              <Bar dataKey="completed" fill="#4f46e5" barSize={40} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
