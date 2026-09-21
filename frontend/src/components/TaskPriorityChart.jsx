// TaskPriorityChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PRIORITY_COLORS = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#ef4444",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];
    return (
      <div className="bg-white border border-slate-200 shadow-[var(--shadow-pop)] p-3 rounded-xl text-sm">
        <p className="font-semibold text-slate-800">{name} Priority</p>
        <p className="text-slate-500">Count: {value}</p>
        <p className="text-slate-500">Percentage: {(percent * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const TaskPriorityChart = ({ tasks }) => {
  const priorityMap = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  tasks.forEach((task) => {
    if (priorityMap[task.priority] !== undefined) {
      priorityMap[task.priority]++;
    }
  });

  const chartData = Object.entries(priorityMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full h-96 card-surface p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-1">Task Priority</h3>
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
              <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name]} />
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

export default TaskPriorityChart;
