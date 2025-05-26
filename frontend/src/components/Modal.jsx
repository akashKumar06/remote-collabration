import { useSelector } from "react-redux";
import NewProject from "../features/dashboard/project/NewProject";
import CreateTeam from "../features/dashboard/project/CreateTeam";
import ProjectDescription from "../features/dashboard/project/ProjectDescription";
import Task from "../features/dashboard/Task";

const components = new Map([
  ["new_project_form", <NewProject key="new_project_form" />],
  ["new_team_form", <CreateTeam key="new_team_form" />],
  ["set_project_description", <ProjectDescription key="project_description" />],
  ["view_task", <Task key="view_task" />],
]);

function Modal() {
  const { state, activeComponent } = useSelector((state) => state.modal);

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-screen transition duration-700 ease-in-out  ${
        state ? "translate-0" : "translate-x-full"
      }`}
    >
      {components.get(activeComponent)}
      {/* {children} */}
    </div>
  );
}

export default Modal;
