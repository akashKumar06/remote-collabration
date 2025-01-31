import { useState } from "react";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { useAccountSetup } from "./AccountSetupContext";
const TaskSetup = () => {
  const { TaskName, setTaskName, setStep} = useAccountSetup();
  const [tasks, setTasks] = useState([""]);
  const [progress, setProgress] = useState(30);
  const [projectName] = useState("Cross-functional project plan");

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);

    const filledCount = updatedTasks.filter(task => task.trim() !== "").length;
    setProgress(30 + filledCount * 10);
  };

  const addTaskField = () => {
    if (tasks.length < 5) setTasks([...tasks, ""]);
  };

  const handleSubmit = () => {
    if (tasks.every(task => task.trim() === "")) {
      alert("Please enter at least one task!");
      return;
    }
    setProgress(100);
    alert("Tasks added successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Collab</h1>


        {/* Input Fields */}
        <h2 className="text-lg font-semibold mb-4">
          What are a few tasks you have to do for{" "}
          <span className="text-blue-600">{projectName}</span>?
        </h2>

        {tasks.map((task, index) => (
          <input
            key={index}
            type="text"
            placeholder={
              index === 0
                ? "e.g. Draft project brief"
                : "e.g. Schedule kickoff meeting"
            }
            value={task}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          onClick={addTaskField}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <FiPlus /> Add another task
        </button>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>

      {/* Right Section (Live Preview) */}
      <div className="hidden lg:block bg-white shadow-lg rounded-lg p-8 max-w-md w-full ml-6">
        <h2 className="text-lg font-semibold mb-4">{projectName}</h2>
        <ul>
          {tasks.map((task, index) =>
            task.trim() ? (
              <li key={index} className="flex items-center gap-2 py-2 text-gray-700">
                <FiCheckCircle className="text-green-500" />
                {task}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskSetup;
