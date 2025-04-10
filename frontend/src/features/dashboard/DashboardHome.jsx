import React from 'react';
import { PlusCircle, Settings, Search } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-purple-400">Welcome back, Vaishnavi 👋</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-gray-900 border border-gray-700 rounded-full p-2 shadow hover:bg-gray-800">
            <Settings className="w-5 h-5 text-purple-400" />
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">My Tasks</h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span>Draft project brief</span>
              <span className="text-pink-400">Mar 25</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Schedule kickoff meeting</span>
              <span className="text-pink-400">Mar 26</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Projects</h2>
          <div className="flex items-center justify-between">
            <button className="text-pink-400 flex items-center gap-2 text-sm">
              <PlusCircle className="w-4 h-4" /> Create Project
            </button>
            <span className="text-sm text-gray-400">3 due soon</span>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-700 to-pink-600 text-white font-medium text-sm">
            📋 Cross-functional project plan
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-all">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">This Week</h2>
          <p className="text-sm text-gray-400">You have 0 tasks completed and 0 collaborators yet.</p>
        </div>
      </section>

      {/* Footer or Customize Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full shadow hover:from-purple-700 hover:to-pink-600 transition-all">
          ✨ Customize your homepage
        </button>
      </div>
    </div>
  );
};

export default HomePage;

