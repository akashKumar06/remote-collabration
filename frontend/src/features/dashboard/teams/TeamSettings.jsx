import { useState } from 'react';
import { Trash2, Save } from 'lucide-react';

const TeamSettings = () => {
  const [projectName, setProjectName] = useState('Remote Collab');
  const [projectDescription, setProjectDescription] = useState('Team collaboration made easy.');
  const [members, setMembers] = useState([
    { id: 1, name: 'Vaishnavi', role: 'Admin' },
    { id: 2, name: 'Akash', role: 'Editor' },
  ]);

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

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 text-sm border dark:border-gray-700 mt-2">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold tracking-tight">Team Settings</h2>
        </div>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Team Details</h3>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-180 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Team Name"
          />
          <br></br>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-180 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Team Description"
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
          <h3 className="text-lg font-semibold text-white">Delete Team</h3>
          <button
            onClick={deleteProject}
            className="mt-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md font-medium"
          >
            <Trash2 className="w-4 h-4" /> Delete Team
          </button>
        </section>
      </div>
    </div>
  );
};

export default TeamSettings;
