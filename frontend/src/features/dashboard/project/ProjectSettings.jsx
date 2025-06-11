import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Trash2, Save, Moon } from 'lucide-react';

const ProjectSettings = () => {
  const [projectName, setProjectName] = useState('Remote Collab');
  const [projectDescription, setProjectDescription] = useState('Team collaboration made easy.');
  const [members, setMembers] = useState([
    { id: 1, name: 'Vaishnavi', role: 'Admin' },
    { id: 2, name: 'Akash', role: 'Editor' },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  const handleRoleChange = (id, newRole) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  const removeMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const deleteProject = () => {
    if (window.confirm('Are you sure you want to delete the project?')) {
      console.log('Project deleted');
    }
  };

  const updateProject = () => {
    console.log('Project updated:', { projectName, projectDescription });
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 text-sm border dark:border-gray-700 mt-2">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold tracking-tight">Project Settings</h2>
          <div className="flex items-center space-x-2">
            <Moon className="w-4 h-4" />
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              className={`${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              } relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span
                className={`${
                  darkMode ? 'translate-x-5' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
        </div>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Project Details</h3>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-180 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Project Name"
          />
          <br></br>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-180 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Project Description"
          />
          <br></br>
          <button
            onClick={updateProject}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <ul className="space-y-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 max-w-180"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{member.name}</p>
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value)}
                    className="p-1.5 rounded-md border text-sm dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t pt-4">
          <h3 className="text-lg font-semibold text-white">Delete Project</h3>
          <button
            onClick={deleteProject}
            className="mt-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md font-medium"
          >
            <Trash2 className="w-4 h-4" /> Delete Project
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProjectSettings;
