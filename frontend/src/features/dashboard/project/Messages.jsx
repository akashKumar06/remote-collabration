import { useState } from "react";
import { Send } from "lucide-react";

// Dummy data for project members
const projectMembers = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Eve", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Frank", avatar: "https://i.pravatar.cc/150?img=6" },
];

function MessagesPage() {
  const [selectedMember, setSelectedMember] = useState(projectMembers[0]);
  const [messages, setMessages] = useState({
    1: [{ text: "Hey, Alice! How's the project going?", type: "sent" }],
    2: [{ text: "Hi, Bob! Any updates?", type: "received" }],
    3: [{ text: "Hey, Charlie! Let's catch up.", type: "received" }],
  });
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages({
        ...messages,
        [selectedMember.id]: [
          ...(messages[selectedMember.id] || []),
          { text: newMessage, type: "sent" },
        ],
      });
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-slate-900">Messages</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Direct conversations with your project members.
        </p>
      </div>

      <div className="card-surface h-[28rem] flex overflow-hidden">
        {/* Left - Project Members List */}
        <div className="w-[240px] shrink-0 border-r border-slate-200 p-3 flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-2 mb-2">
            Members
          </h3>
          <div className="flex-1 overflow-y-auto thin-scrollbar space-y-0.5">
            {projectMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center gap-2.5 p-2 cursor-pointer rounded-lg transition ${
                  selectedMember.id === member.id
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Messages Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 shrink-0">
            <img
              src={selectedMember.avatar}
              alt={selectedMember.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <h2 className="text-sm font-semibold text-slate-900">
              {selectedMember.name}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto thin-scrollbar bg-slate-50/60 p-4">
            {(messages[selectedMember.id] || []).map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "sent" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${
                    message.type === "sent"
                      ? "bg-primary-600 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-3 flex items-center gap-2.5 border-t border-slate-200 shrink-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full bg-slate-100 text-slate-800 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-200"
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary-600 text-white rounded-xl p-2.5 hover:bg-primary-700 transition shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
