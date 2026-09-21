import { useState } from "react";
import { X, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../app/slices/modal";
import { updateProjectDescription } from "../../../app/slices/project/projectThunk";
import toast from "react-hot-toast";
import { Button } from "../../../components/Button";

const ProjectDescription = () => {
  const { currentProject, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(currentProject.description);

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
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-primary-600" />
          </div>
          <h1 className="text-lg font-display font-semibold text-slate-900">
            Project description
          </h1>
        </div>
        <button
          onClick={handleCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar px-6 py-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a detailed description about the project..."
          className="w-full h-full min-h-80 p-4 bg-white text-slate-800 border border-slate-300 rounded-xl resize-none outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
        />
      </div>

      <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-200 shrink-0">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} loading={loading}>
          Save description
        </Button>
      </div>
    </div>
  );
};

export default ProjectDescription;
