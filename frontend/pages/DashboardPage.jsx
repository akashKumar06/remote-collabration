import { Card } from "../components/Card";
// import {CardContent} from "../components/CardContent";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Bell, User, Settings, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      {/* Navbar */}
      <motion.div 
        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600">CollabTrack</h1>
        <div className="flex items-center gap-4">
          <Input placeholder="Search..." className="w-64" />
          <Search className="text-gray-500" />
          <Bell className="text-gray-500" />
          <User className="text-gray-500" />
          <Settings className="text-gray-500" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Card 1 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-gray-600">Manage and track your projects easily.</p>
          <Button className="mt-4">View Projects</Button>
          <motion.img
            src="../public/project.jpg"
            alt="Projects"
            className="mt-4 w-50 h-50 mx-auto"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </motion.div>
        
        {/* Card 2 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="text-gray-600">Assign and complete tasks efficiently.</p>
          <Button className="mt-4">Manage Tasks</Button>
          <motion.img
            src="../public/task.avif"
            alt="Tasks"
            className="mt-4 w-50 h-50 mx-auto"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </motion.div>
        
        {/* Card 3 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold">Team</h2>
          <p className="text-gray-600">Collaborate with your team members.</p>
          <Button className="mt-4">View Team</Button>
          <motion.img
            src="../public/Team.webp"
            alt="Team"
            className="mt-4 w-50 h-50 mx-auto"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        className="text-center text-gray-500 mt-12" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
      >
        &copy; 2025 .care | All rights reserved
      </motion.div>
    </div>
  );
}
