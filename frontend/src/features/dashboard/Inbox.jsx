import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User2 } from "lucide-react";

const dummyMessages = {
  received: [
    {
      id: 1,
      from: "Ayesha",
      message: "Hey, can you check the UI for Project Beta?",
      time: "2h ago",
    },
    {
      id: 2,
      from: "Raj",
      message: "We need to finalize the backend APIs by tomorrow.",
      time: "1d ago",
    },
  ],
  sent: [
    {
      id: 3,
      to: "Dev Team",
      message: "Please update the GitHub repo by EOD.",
      time: "3h ago",
    },
    {
      id: 4,
      to: "Ayesha",
      message: "Sure! I'll check and get back to you soon.",
      time: "22h ago",
    },
  ],
};

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("received");

  const messages = dummyMessages[activeTab];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
          <Mail className="text-primary-600" size={18} />
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Inbox</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
            activeTab === "received"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Received
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
            activeTab === "sent"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Sent
        </button>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-slate-400 text-sm">No messages found.</p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              className="card-surface p-4 hover:shadow-[var(--shadow-pop)] transition-shadow"
              whileHover={{ y: -1 }}
            >
              <div className="flex justify-between items-center mb-1.5 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center">
                    <User2 size={13} className="text-primary-600" />
                  </span>
                  {activeTab === "received" ? (
                    <span className="font-medium text-slate-800">{msg.from}</span>
                  ) : (
                    <span className="font-medium text-slate-800">To: {msg.to}</span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{msg.time}</span>
              </div>
              <p className="text-slate-600 text-sm pl-8">{msg.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
