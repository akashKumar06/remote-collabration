import { useState } from "react";
import { Button } from "../../components/Button";
import { Lock } from "lucide-react";
const MyTasksPage = () => {
  const [tasks, setTasks] = useState([
    { name: "Task 1", dueDate: "Jan 28", visibility: "Only me" },
    { name: "Task 2", dueDate: "Jan 29", visibility: "Only me" },
    { name: "Task 3", dueDate: "Jan 30", visibility: "Only me" },
  ]);

  return (
    <div className="bg-black-900 text-white p-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Button className="bg-blue-600">+ Add Task</Button>
      </div>
      <div className="mt-4">
        <Section title="Recently Assigned">
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </Section>
        <Section title="Do today" />
        <Section title="Do next week" />
        <Section title="Do later" />
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mt-4">
    <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">
      {title}
    </h2>
    <div className="mt-2 space-y-2">
      {children || <p className="text-gray-400">Add task...</p>}
    </div>
  </div>
);

const TaskItem = ({ task }) => (
  <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
    <span>{task.name}</span>
    <div className="flex items-center space-x-4">
      <span className="text-red-400">{task.dueDate}</span>
      <span className="flex items-center space-x-1">
        <Lock /> <span>{task.visibility}</span>
      </span>
    </div>
  </div>
);

export default MyTasksPage;
