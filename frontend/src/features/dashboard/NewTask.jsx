import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";

function NewTask({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-end justify-end overflow-hidden p-6 pointer-events-none">
      <motion.div
        className="card-surface p-5 w-96 pointer-events-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base font-semibold text-slate-900">New Task</h1>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task name"
            className="w-full p-2 font-semibold rounded-lg text-xl text-slate-900 outline-none placeholder:text-slate-300"
          />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>For</span>
            <select className="flex-1 p-2 rounded-lg border border-slate-200 text-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-100">
              <option>Assignee</option>
            </select>
            <span>in</span>
            <select className="flex-1 p-2 rounded-lg border border-slate-200 text-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-100">
              <option>Project</option>
            </select>
          </div>
          <textarea
            placeholder="Task description"
            className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm outline-none resize-none focus:ring-2 focus:ring-primary-100"
            rows="3"
          />
        </div>
        <div className="mt-4">
          <Button className="w-full">Create task</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default NewTask;
