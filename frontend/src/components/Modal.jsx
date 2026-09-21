import { useSelector, useDispatch } from "react-redux";
import NewProject from "../features/dashboard/project/NewProject";
import CreateTeam from "../features/dashboard/teams/CreateTeam";
import ProjectDescription from "../features/dashboard/project/ProjectDescription";
import { close } from "../app/slices/modal";

const components = new Map([
  ["new_project_form", <NewProject key="new_project_form" />],
  ["new_team_form", <CreateTeam key="new_team_form" />],
  ["set_project_description", <ProjectDescription key="project_description" />],
]);

function Modal() {
  const { state, activeComponent } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed inset-0 z-50 ${state ? "" : "pointer-events-none"}`}
      aria-hidden={!state}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          state ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => dispatch(close())}
      />

      {/* Sliding panel */}
      <div
        className={`absolute right-0 top-0 h-screen w-full max-w-lg bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto thin-scrollbar ${
          state ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {components.get(activeComponent)}
      </div>
    </div>
  );
}

export default Modal;
