import { useDispatch, useSelector } from "react-redux";
import { close } from "../app/slices/modal";
import CreateProjectForm from "../features/dashboard/project/CreateProjectForm";
import NewTeamForm from "../features/dashboard/project/NewTeamForm";

const components = new Map([
  ["new_project_form", <CreateProjectForm key="new_project_form" />],
  ["new_team_form", <NewTeamForm key="new_team_form" />],
]);

function Modal() {
  const { state, activeComponent } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  return (
    <div
      className={`fixed right-0 top-0 z-10 h-screen bg-slate-200 transition duration-700 ease-in-out  ${
        state ? "translate-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => dispatch(close())}
        className="text-white border-white border rounded"
      >
        close
      </button>
      {components.get(activeComponent)}
    </div>
  );
}

export default Modal;
