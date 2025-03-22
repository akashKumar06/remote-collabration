import { Calendar, CheckCircle, Search, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";
const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  return (
    <div>
      <div className="h-16 bg-gray-800 text-white shadow-md flex items-center px-4 justify-between">
        <h1 className="text-lg font-semibold">Home</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <Button className="bg-gray-700 text-white">Customize</Button>
        </div>
      </div>
      <div className="flex h-screen bg-gray-700 text-white overflow-y-auto">
        <div className="flex-1 flex flex-col">
          {/* <TopNav /> */}
          <div className="p-6 text-center">
            <p className="text-sm text-gray-400">Thursday, February 6</p>
            <h2 className="text-3xl font-bold">Good morning, Vaishnavi</h2>
            <div className="mt-4 flex justify-center space-x-4">
              <Button className="bg-gray-700 text-white flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> My Week
              </Button>
              <Button className="bg-gray-700 text-white flex items-center">
                0 tasks completed
              </Button>
              <Button className="bg-gray-700 text-white flex items-center">
                <Users className="h-4 w-4 mr-2" /> 0 collaborators
              </Button>
            </div>
            <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">My Tasks</h3>
              <div className="flex space-x-4 mt-2 text-gray-400">
                <span
                  className={`${
                    activeTab === "upcoming"
                      ? "border-b-2 border-white pb-1"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </span>
                <span
                  className={`${
                    activeTab === "overdue"
                      ? "border-b-2 border-white pb-1"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setActiveTab("overdue")}
                >
                  Overdue (3)
                </span>
                <span
                  className={`${
                    activeTab === "completed"
                      ? "border-b-2 border-white pb-1"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </span>
              </div>
              <div className="mt-4">
                {activeTab === "upcoming" && (
                  <button className="text-gray-400">+ Create task</button>
                )}
                {activeTab === "overdue" && (
                  <ul className="text-gray-300">
                    <li className="flex justify-between border-b border-gray-600 py-2">
                      Task 3 <span className="text-red-500">Jan 30</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-600 py-2">
                      Task 2 <span className="text-red-500">Jan 29</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-600 py-2">
                      Task 1 <span className="text-red-500">Jan 28</span>
                    </li>
                  </ul>
                )}
                {activeTab === "completed" && (
                  <div className="flex flex-col items-center text-gray-400">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <p>
                      Your completed tasks will appear here, so you can
                      reference them later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
