import { useState, useEffect } from "react";
import { Save, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { updateProjectDescription } from "../../../app/slices/project/projectThunk";
import toast from "react-hot-toast";

const ProjectDescription = () => {
  const { currentProject, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(currentProject.description);

  // To update description if currentProject changes
  useEffect(() => {
    setDescription(currentProject.description);
  }, [currentProject.description]);

  const handleSave = () => {
    dispatch(
      updateProjectDescription({
        projectId: currentProject._id,
        description,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Description updated successfully!");
        dispatch(close());
      });
  };

  const handleCancel = () => {
    dispatch(close());
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 sm:p-8 bg-[#1E1E1E] text-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Project Description</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a detailed description about the project..."
        className="flex-grow w-full min-h-[250px] sm:min-h-[400px] p-4 bg-[#121212] border border-gray-700 rounded-lg resize-y focus:outline-none scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      />
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition font-medium text-sm"
        >
          <XCircle size={16} />
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {loading ? "Saving..." : "Save Description"}
        </button>
      </div>
    </div>
  );
};

export default ProjectDescription;
