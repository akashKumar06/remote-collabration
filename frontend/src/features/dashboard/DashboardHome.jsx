// import React from 'react';
// import { PlusCircle, Settings, Search } from 'lucide-react';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       {/* Top Bar */}
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="text-3xl font-bold text-purple-400">Welcome back, Vaishnavi 👋</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="px-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <button className="bg-gray-900 border border-gray-700 rounded-full p-2 shadow hover:bg-gray-800">
//             <Settings className="w-5 h-5 text-purple-400" />
//           </button>
//         </div>
//       </header>

//       {/* Summary Cards */}
//       <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//         <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
//           <h2 className="text-lg font-semibold text-purple-300 mb-2">My Tasks</h2>
//           <ul className="space-y-2">
//             <li className="flex justify-between text-sm">
//               <span>Draft project brief</span>
//               <span className="text-pink-400">Mar 25</span>
//             </li>
//             <li className="flex justify-between text-sm">
//               <span>Schedule kickoff meeting</span>
//               <span className="text-pink-400">Mar 26</span>
//             </li>
//           </ul>
//         </div>
//         <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
//           <h2 className="text-lg font-semibold text-purple-300 mb-2">Projects</h2>
//           <div className="flex items-center justify-between">
//             <button className="text-pink-400 flex items-center gap-2 text-sm">
//               <PlusCircle className="w-4 h-4" /> Create Project
//             </button>
//             <span className="text-sm text-gray-400">3 due soon</span>
//           </div>
//           <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-700 to-pink-600 text-white font-medium text-sm">
//             📋 Cross-functional project plan
//           </div>
//         </div>
//         <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
//           <h2 className="text-lg font-semibold text-purple-300 mb-2">This Week</h2>
//           <p className="text-sm text-gray-400">You have 0 tasks completed and 0 collaborators yet.</p>
//         </div>
//       </section>

//       {/* Footer or Customize Button */}
//       <div className="text-center">
//         <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full shadow hover:from-purple-700 hover:to-pink-600 transition-all">
//           ✨ Customize your homepage
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { motion } from "framer-motion";
import {
  FolderKanban,
  Crown,
  Users,
  Clock,
  Star,
  CalendarDays,
  Plus,
  BarChart2,
  Settings2,
} from "lucide-react";

const projectCards = [
  {
    title: "Total Projects",
    icon: <FolderKanban size={20} className="text-blue-400" />,
    value: 8,
  },
  {
    title: "Owned Projects",
    icon: <Crown size={20} className="text-yellow-400" />,
    value: 3,
  },
  {
    title: "Collaborating On",
    icon: <Users size={20} className="text-pink-400" />,
    value: 5,
  },
  {
    title: "Recently Active",
    icon: <Clock size={20} className="text-green-400" />,
    value: 4,
  },
  {
    title: "Pinned Projects",
    icon: <Star size={20} className="text-purple-400" />,
    value: 2,
  },
];

const tasks = [
  {
    title: "Finalize login API",
    project: "RemoteHub",
    due: "Today",
    status: "On Track",
  },
  {
    title: "UI wireframes review",
    project: "ClassMate",
    due: "In 2 days",
    status: "Upcoming",
  },
];

const activities = [
  "You commented on API Integration",
  "Ravi completed UI Design",
  "Sanya created a new task in Hostel App",
];

export default function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white space-y-10">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Akash 👋</h1>
        <p className="text-gray-400">
          Here’s what’s happening with your projects.
        </p>
      </motion.div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {projectCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="bg-[#2A2A2A] p-5 rounded-2xl border border-gray-700 flex flex-col gap-2 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              {card.icon}
              <span className="text-sm text-gray-400">{card.title}</span>
            </div>
            <h2 className="text-2xl font-bold">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Tasks and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="font-medium">{task.title}</span>
                <span className="text-sm text-gray-400">
                  {task.project} • Due {task.due}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
          <ul className="space-y-3 text-gray-300">
            {activities.map((act, idx) => (
              <li key={idx} className="border-b border-gray-700 pb-2">
                {act}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "New Project", icon: <Plus size={18} /> },
          { label: "Browse Projects", icon: <FolderKanban size={18} /> },
          { label: "View Reports", icon: <BarChart2 size={18} /> },
          { label: "Manage Team", icon: <Settings2 size={18} /> },
        ].map((action, idx) => (
          <button
            key={idx}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
          >
            {action.icon} {action.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
