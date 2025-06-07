import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const { currentProject } = useSelector((state) => state.project);

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Please select at least one file");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await axios.post(
        `/projects/${currentProject._id}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded files:", res.data);
      toast.success("Files uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl bg-gray-800 text-white">
      <label
        htmlFor="file-upload"
        className="block w-full text-center py-3 cursor-pointer border-2 border-dashed border-gray-500 rounded-lg hover:border-blue-500"
      >
        Click to select files
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* File names preview */}
      {files.length > 0 && (
        <div className="mt-4 text-sm text-gray-300">
          <p className="mb-2 font-semibold">Selected Files:</p>
          <ul className="list-disc ml-5 space-y-1">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 w-full px-4 py-2 mb-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
      >
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;
