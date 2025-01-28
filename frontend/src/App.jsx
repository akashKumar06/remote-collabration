import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/DashboardPage";
import { AccountSetupProvider } from "../features/AccountSetupContext";
import AccountSetup from "../features/AccountSetup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="account_setup"
          element={
            <AccountSetupProvider>
              <AccountSetup />
            </AccountSetupProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
