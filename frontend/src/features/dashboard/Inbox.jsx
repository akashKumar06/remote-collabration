import React from 'react';

const InboxPage = () => {
  return (
    <div className="flex h-screen bg-gray-1000 text-white">
      {/* Sidebar removed */}

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-500 pb-4 mb-4">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-500 text-white px-4 py-2 rounded border border-gray-500 w-72"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-6 mb-6 text-sm font-medium">
          <button className="text-blue-400 border-b-2 border-blue-500 pb-2">Activity</button>
          <button className="text-gray-400 hover:text-white">Archive</button>
          <button className="text-gray-400 hover:text-white">Messages I’ve sent</button>
          <div className="ml-auto space-x-4">
            <button className="hover:underline text-sm text-gray-400">Manage notifications</button>
            <button className="hover:underline text-sm text-gray-400">⋯</button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 flex">
          {/* Left side - List */}
          <div className="w-1/2 space-y-4 pr-6">
            <div className="bg-gray-600 p-4 rounded hover:bg-gray-700 cursor-pointer">
              <p className="font-semibold">📣 Teamwork makes work happen!</p>
              <p className="text-gray-400 text-sm mt-1">
                Inbox is where you get updates, notifications, and messages from your teammates.
              </p>
            </div>
            <button className="text-blue-500 text-sm hover:underline">Archive all notifications</button>
          </div>

          {/* Right side - Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-lg font-medium mb-2">Inbox is where you get updates, notifications, and messages from your teammates.</h2>
            <p className="mb-4">Send an invite to start collaborating.</p>
            <button className="bg-blue-600 px-4 py-2 rounded">Invite teammates</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InboxPage;
