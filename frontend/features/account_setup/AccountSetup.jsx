import { useNavigate } from "react-router";
import { useAccountSetup } from "./AccountSetupContext";
import GetStarted from "./GetStarted";

function AccountSetup() {
  const { step, setStep } = useAccountSetup();
  const navigate = useNavigate();
  switch (step) {
    case 1:
      return <GetStarted />;
    case 2:
      return (
        <div>
          <h1 className="text-lg font-bold">
            first project setup step - project title page will come
          </h1>
          <button
            className="cursor-pointer bg-blue-500 rounded text-white p-2"
            onClick={() => setStep((step) => step + 1)}
          >
            Continue
          </button>
        </div>
      );
    case 3:
      return (
        <div>
          <h1 className="text-lg font-bold">
            task specification step page will come
          </h1>
          <button
            className="cursor-pointer bg-blue-500 rounded text-white p-2"
            onClick={() => setStep((step) => step + 1)}
          >
            Continue
          </button>
        </div>
      );
    case 4:
      return (
        <div>
          <h1 className="text-lg font-bold">
            invite the teammate page will come here
          </h1>
          <button
            className="cursor-pointer bg-blue-500 rounded text-white p-2"
            onClick={() => navigate("/dashboard")}
          >
            Continue
          </button>
        </div>
      );
    default:
      return null;
  }
}

export default AccountSetup;
