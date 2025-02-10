import { X } from "lucide-react";
import { motion } from "framer-motion";
function NewTask({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-end justify-end overflow-hidden right-10">
      <motion.div
        className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-96"
        initial={{ y: 100, opacity: 0 }} // Start off-screen (below)
        animate={{ y: 0, opacity: 1 }} // Slide up into view
        exit={{ y: 100, opacity: 0 }} // Slide down when closing
        transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">New Task</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <select className="w-1/2 p-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option>Assignee</option>
            </select>
            <select className="w-1/2 p-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option>Project</option>
            </select>
          </div>
          <textarea
            placeholder="Task description"
            className="w-full p-2 bg-gray-700 rounded text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
            Create Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default NewTask;
