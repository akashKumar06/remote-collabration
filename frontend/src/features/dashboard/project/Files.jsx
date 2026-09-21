import { Download, FileText, Image, File, FolderOpen } from "lucide-react";
import { useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { format } from "date-fns";

const getFileIcon = (type) => {
  switch (type) {
    case "pdf":
      return <FileText className="text-danger-500" size={22} />;
    case "jpg":
      return <Image className="text-info-500" size={22} />;
    case "text":
      return <FileText className="text-success-500" size={22} />;
    default:
      return <File className="text-slate-500" size={22} />;
  }
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
}

const FilesPage = () => {
  const { currentProject } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);
  const { owner } = currentProject;
  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-slate-900">Files</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Shared documents and assets for {currentProject.name}.
        </p>
      </div>

      {currentProject.files.length === 0 ? (
        <div className="card-surface flex flex-col items-center justify-center text-center py-16 mb-8">
          <FolderOpen className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-slate-400 text-sm">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {currentProject.files.map((file) => (
            <div
              key={file._id}
              className="card-surface p-5 flex flex-col justify-between hover:shadow-[var(--shadow-pop)] transition-shadow"
            >
              <div className="flex items-center gap-3.5 mb-4 overflow-hidden">
                <div className="bg-slate-50 p-2.5 rounded-lg shrink-0">
                  {getFileIcon(file.format)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-slate-800 truncate">{file.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {formatBytes(file.size)} &middot; Uploaded{" "}
                    {format(
                      new Date(file.uploadedAt || "2025-06-08T13:30:13.000Z"),
                      "MMM d, yyyy"
                    )}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition text-sm font-medium"
              >
                <Download size={15} />
                Download
              </a>
            </div>
          ))}
        </div>
      )}
      {user.id === owner._id && <FileUpload />}
    </div>
  );
};

export default FilesPage;
