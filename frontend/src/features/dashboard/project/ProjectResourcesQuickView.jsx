import { ChevronDown, ChevronRight, FileText, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

function ProjectResourcesQuickView({ files }) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-surface p-6"
    >
      {files.length === 0 ? (
        <div className="flex items-center gap-2.5 text-sm text-slate-400">
          <Paperclip size={16} />
          No files currently.
        </div>
      ) : (
        <>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
          >
            <h2 className="text-base font-semibold text-slate-900">Resources</h2>
            {isResourcesOpen ? (
              <ChevronDown className="text-slate-400" size={18} />
            ) : (
              <ChevronRight className="text-slate-400" size={18} />
            )}
          </div>
          {isResourcesOpen && (
            <ul className="space-y-2.5 mt-4">
              {files.map((file) => (
                <li key={file._id}>
                  <Link
                    className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    <FileText size={15} />
                    {file.name || "Untitled file"}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </motion.div>
  );
}

export default ProjectResourcesQuickView;
