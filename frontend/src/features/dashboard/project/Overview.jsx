import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Plus,
  Link,
  ClipboardList,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Overview() {
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState(["Akash Kumar"]);
  const [newMember, setNewMember] = useState("");

  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(true);

  const [resources] = useState([
    { label: "GitHub Repo", url: "https://github.com/example/repo" },
    { label: "Figma Design", url: "https://figma.com/file/xyz" },
  ]);

  const handleAddMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember.trim()]);
      setNewMember("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold">Demo Project</h1>
        <p className="text-gray-400">Overview • In Progress</p>
      </motion.div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel */}
        <div className="flex-1 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=" p-6 rounded-2xl "
          >
            <h2 className="text-lg font-semibold mb-2">Project Description</h2>
            <textarea
              rows="6"
              placeholder="Write something about the project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border  bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </motion.div>

          {/* Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className=" p-6 rounded-2xl"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMembersOpen(!isMembersOpen)}
            >
              <h2 className="text-lg font-semibold">Project Members</h2>
              {isMembersOpen ? <ChevronDown /> : <ChevronRight />}
            </div>

            {isMembersOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 mt-4">
                  {members.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <User size={18} className="text-pink-400" />
                      <span>{member}</span>
                      {idx === 0 && (
                        <span className="ml-auto text-sm text-gray-400 italic">
                          Project Owner
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-6">
                  <input
                    type="text"
                    placeholder="Add member name..."
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    className="flex-1 p-2.5 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddMember}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              <h2 className="text-lg font-semibold">Resources</h2>
              {isResourcesOpen ? <ChevronDown /> : <ChevronRight />}
            </div>
            {isResourcesOpen && (
              <ul className="space-y-3 mt-4 text-blue-400">
                {resources.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Link size={16} />
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      {res.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[300px] space-y-6">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
            <div className="border-l border-gray-600 pl-4 space-y-6 text-sm text-gray-300">
              {[
                { text: "Akash joined the team", time: "15 min ago" },
                { text: "You joined", time: "15 min ago" },
                { text: "Project created", time: "20 min ago" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="w-2 h-2 bg-pink-400 rounded-full absolute -left-5 top-1" />
                  <p>{item.text}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMilestonesOpen(!isMilestonesOpen)}
            >
              <h2 className="text-lg font-semibold">Milestones</h2>
              {isMilestonesOpen ? <ChevronDown /> : <ChevronRight />}
            </div>

            {isMilestonesOpen && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={16} className="text-green-400" />
                  <span>UI Design - Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck size={16} className="text-yellow-400" />
                  <span>Backend API - In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck size={16} className="text-gray-400" />
                  <span>Testing - Pending</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-2">Project Stats</h2>
            <div className="flex items-center gap-3">
              <ClipboardList size={18} className="text-blue-400" />
              <span>12 / 20 tasks completed</span>
            </div>
            <div className="w-full mt-3 bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <CalendarCheck size={18} className="text-orange-400" />
              <span>Deadline: April 20</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
