import { useState } from "react";
export default function ToDoDoneTask() {
  const [sections, setSections] = useState(["To do", "Doing", "Done"]);
  const [newSection, setNewSection] = useState("");
  const { TaskName, setTaskName, setStep } = useAccountSetup();
  const [tasks, setTasks] = useState({
    "To do": ["Draft project brief", "Schedule kickoff meeting", "Share timeline with teammates"],
    "Doing": [],
    "Done": [],
  });

  const handleAddSection = () => {
    if (newSection.trim() && !sections.includes(newSection)) {
      setSections([...sections, newSection]);
      setTasks({ ...tasks, [newSection]: [] });
      setNewSection("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-10 shadow-lg">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Asana_logo.svg/1280px-Asana_logo.svg.png"
          alt="Asana Logo"
          className="h-8 mb-6"
        />

        <div className="relative w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="absolute h-2 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${sections.length * 20}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          How would you group these tasks into sections or stages?
        </h2>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <input
              key={index}
              type="text"
              className="w-full border p-2 rounded-md bg-gray-100"
              value={section}
              disabled
            />
          ))}
          <input
            type="text"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new section..."
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddSection()}
          />
        </div>

        <button
          className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
         onClick={() => setStep((step) => step + 1)}
        >
          Continue
        </button>
      </div>

      {/* Right Section (Task Preview) */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg rounded-lg w-3/4">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-md">📋</div>
            <h3 className="text-xl font-semibold ml-2">Cross-functional project plan</h3>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700">{section}</h4>
              <ul className="space-y-2">
                {tasks[section]?.map((task, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
