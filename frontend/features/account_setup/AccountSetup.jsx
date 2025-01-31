import { useNavigate } from "react-router";
import { useAccountSetup } from "./AccountSetupContext";
import GetStarted from "./GetStarted";
import ProjectSetup from "./ProjectSetup";
import TaskSetup from "./TaskSetup";
import ToDoDoneTask from "./ToDoDoneTask";

function AccountSetup() 
{
  const { step, setStep} = useAccountSetup();
  const navigate = useNavigate();
  switch (step) {
    case 1:
      return <GetStarted />;
    case 2:
      return <ProjectSetup/>;
    case 3:
      return <TaskSetup/>
    case 4:
      return <ToDoDoneTask/>
    default:
      return null;
  }
}

export default AccountSetup;
