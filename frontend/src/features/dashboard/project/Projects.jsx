import { ChevronLeft, ChevronRight, FolderKanban, User } from "lucide-react";
import { marked } from "marked";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserProjects } from "../../../app/slices/project/projectThunk";
import { setCurrentPage } from "../../../app/slices/project/projectSlice";
import CircularLoader from "../../../components/CircularLoader";

const getAvatar = (firstname, lastname) => {
  if (!firstname || !lastname) return "?";
  return `${firstname[0]?.toUpperCase() || ""}${lastname[0]?.toUpperCase() || ""}`;
};

const avatarTints = [
  "bg-primary-100 text-primary-700",
  "bg-info-50 text-info-600",
  "bg-success-50 text-success-600",
  "bg-warning-50 text-warning-600",
  "bg-pink-50 text-pink-600",
];

const tintFor = (id) => {
  if (!id) return avatarTints[0];
  const sum = String(id)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarTints[sum % avatarTints.length];
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/projects/${project._id}/overview`)}
      className="card-surface p-6 hover:shadow-[var(--shadow-pop)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
              <FolderKanban className="w-4.5 h-4.5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 truncate">{project.name}</h3>
          </div>
          {project.owner && (
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${tintFor(
                project.owner._id
              )}`}
              title={`${project.owner.firstname} ${project.owner.lastname}`}
            >
              {getAvatar(project.owner.firstname, project.owner.lastname)}
            </div>
          )}
        </div>
        <p
          className="text-slate-500 mb-5 text-sm leading-relaxed min-h-[40px] line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: marked((project.description || "").slice(0, 100) + "..."),
          }}
        ></p>
      </div>
      <div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <User size={14} />
          <span className="ml-2">
            {project.owner
              ? `${project.owner.firstname} ${project.owner.lastname}`
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags &&
            project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const { projects, currentPage, totalPages, isFetchingProjects, error } =
    useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProjects({ query: { page: currentPage } }));
  }, [currentPage, dispatch]);

  const handleLeft = () => {
    if (currentPage > 1 && !isFetchingProjects) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleRight = () => {
    if (currentPage < totalPages && !isFetchingProjects) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      !isFetchingProjects
    ) {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 min-h-full flex flex-col">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
          Projects
        </h1>
        <p className="text-slate-500 mt-1">
          Every project you own or collaborate on, in one place.
        </p>
      </header>

      {isFetchingProjects ? (
        <div className="flex-grow flex items-center justify-center py-20">
          <CircularLoader size={28} />
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center py-20">
          <p className="text-danger-600 font-medium">Error: {error}. Please try again later.</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
            <FolderKanban className="w-7 h-7 text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">No projects yet</h2>
          <p className="text-slate-500 text-sm mt-1">
            Create your first project from the sidebar to get started.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in flex-grow"
          style={{ animationDelay: "0.1s" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {totalPages > 1 && !isFetchingProjects && (
        <footer className="mt-10 flex justify-center items-center gap-1.5 flex-wrap">
          <button
            onClick={handleLeft}
            disabled={currentPage === 1 || isFetchingProjects}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
            const isCurrent = pageNumber === currentPage;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                disabled={isCurrent || isFetchingProjects}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition disabled:cursor-not-allowed ${
                  isCurrent
                    ? "bg-primary-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={handleRight}
            disabled={currentPage === totalPages || isFetchingProjects}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      )}
    </div>
  );
}

export default Projects;
