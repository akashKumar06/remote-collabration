import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TasksPerMemberChart = ({ tasks }) => {
  const taskCountByAssignee = {};

  tasks.forEach((task) => {
    const name = task.assignee?.firstname || "Unknown";
    taskCountByAssignee[name] = (taskCountByAssignee[name] || 0) + 1;
  });

  const chartData = Object.entries(taskCountByAssignee).map(([name, count]) => ({
    name,
    taskCount: count,
  }));

  return (
    <div className="w-full h-80 card-surface p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        Tasks per Member
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f6" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(16,24,40,0.1)",
            }}
          />
          <Bar dataKey="taskCount" fill="#6640e0" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksPerMemberChart;
