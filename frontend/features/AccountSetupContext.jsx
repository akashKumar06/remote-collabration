import { createContext, useContext, useState } from "react";

const AccountSetupContext = createContext();

// eslint-disable-next-line react/prop-types
export function AccountSetupProvider({ children }) {
  const [step, setStep] = useState(1);
  return (
    <AccountSetupContext.Provider value={{ setStep, step }}>
      {children}
    </AccountSetupContext.Provider>
  );
}

export function useAccountSetup() {
  const context = useContext(AccountSetupContext);
  console.log(context);
  if (!context) console.log("Account setup is used outside provider");
  return context;
}

// start step - continue with a project
// first project setup step - project title
// task specification step
// invite the teammate
