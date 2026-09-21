import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { uploadFiles } from "../../../app/slices/project/projectThunk";
import { Button } from "../../../components/Button";

const FileUpload = () => {
  const { currentProject, isUploadingFiles } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (!files.length) return toast.error("Please select at least one file");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    await dispatch(uploadFiles({ projectId: currentProject._id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Files uploaded successfully");
      })
      .catch(() => {
        toast.error("Failed to upload files");
      });
    setFiles([]);
  };

  return (
    <div className="max-w-md card-surface p-6">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center gap-2 w-full text-center py-8 cursor-pointer border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/40 transition"
      >
        <UploadCloud className="w-6 h-6 text-primary-500" />
        <span className="text-sm text-slate-600 font-medium">
          Click to select files
        </span>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 text-sm text-slate-600">
          <p className="mb-2 font-semibold text-slate-700">Selected files:</p>
          <ul className="list-disc ml-5 space-y-1">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={handleUpload} loading={isUploadingFiles} className="mt-5 w-full">
        Upload files
      </Button>
    </div>
  );
};

export default FileUpload;
