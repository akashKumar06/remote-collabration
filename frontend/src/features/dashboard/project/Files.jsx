import { Download, FileText, Image, File } from "lucide-react";
import { useSelector } from "react-redux";
import FileUpload from "./FileUpload";
const files = [
  {
    id: 1,
    name: "Project_Plan.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedAt: "2025-04-10",
    url: "#",
  },
  {
    id: 2,
    name: "UI_Mockup.png",
    type: "image",
    size: "3.4 MB",
    uploadedAt: "2025-04-09",
    url: "#",
  },
  {
    id: 3,
    name: "TeamNotes.txt",
    type: "text",
    size: "12 KB",
    uploadedAt: "2025-04-08",
    url: "#",
  },
];

const getFileIcon = (type) => {
  switch (type) {
    case "pdf":
      return <FileText className="text-red-500" size={24} />;
    case "image":
      return <Image className="text-blue-400" size={24} />;
    case "text":
      return <FileText className="text-green-400" size={24} />;
    default:
      return <File className="text-white" size={24} />;
  }
};

const FilesPage = () => {
  const { currentProject } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);

  const { owner } = currentProject;
  return (
    <div className="min-h-screen bg-space-900 text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-gray-1000 p-5 rounded-2xl border border-gray-800 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-900 p-2 rounded-lg">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {file.size} • Uploaded on {file.uploadedAt}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm font-medium"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          ))}
        </div>
        {user.id === owner._id && <FileUpload />}
      </div>
    </div>
  );
};

export default FilesPage;
