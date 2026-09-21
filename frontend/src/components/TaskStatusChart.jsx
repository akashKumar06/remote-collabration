// TaskStatusChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS = {
  "Not Started": "#94a3b8",
  "In Progress": "#f59e0b",
  Completed: "#10b981",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];
    return (
      <div className="bg-white border border-slate-200 shadow-[var(--shadow-pop)] p-3 rounded-xl text-sm">
        <p className="font-semibold text-slate-800">{name}</p>
        <p className="text-slate-500">Count: {value}</p>
        <p className="text-slate-500">Percentage: {(percent * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const TaskStatusChart = ({ tasks }) => {
  const statusMap = {
    "Not Started": 0,
    "In Progress": 0,
    Completed: 0,
  };
  tasks.forEach((task) => {
    if (statusMap[task.status] !== undefined) {
      statusMap[task.status]++;
    }
  });

  const chartData = Object.entries(statusMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full h-96 card-surface p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-1">Task Status</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ color: "#475569", fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatusChart;
