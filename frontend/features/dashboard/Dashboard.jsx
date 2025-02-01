import { Button } from "../../components/Button";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sidebar */}
      <div className="flex flex-row h-screen">
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Projects
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Tasks
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Teams
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Welcome, User</h1>
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Create New Project
            </Button>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Project 1</h3>
              <p className="text-gray-600">Project details...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Project 2</h3>
              <p className="text-gray-600">Project details...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Project 3</h3>
              <p className="text-gray-600">Project details...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
