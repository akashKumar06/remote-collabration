import { useNavigate } from "react-router";
import { useAccountSetup } from "./AccountSetupContext";
import GetStarted from "./GetStarted";
import ProjectSetup from "./ProjectSetup";
import TaskSetup from "./TaskSetup";

function AccountSetup() {
  const { step } = useAccountSetup();
  const navigate = useNavigate();
  switch (step) {
    case 1:
      return <GetStarted />;
    case 2:
      return <ProjectSetup />;
    case 3:
      return <TaskSetup />;
    case 4:
      return (
        <>
          <h1>Team invite page ayega yha pe</h1>
          <button
            className="bg-amber-200 rounded p-4"
            onClick={() => navigate("/dashboard")}
          >
            Continue
          </button>
        </>
      );
    default:
      return null;
  }
}

export default AccountSetup;
