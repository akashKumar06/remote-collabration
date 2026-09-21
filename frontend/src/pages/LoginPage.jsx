import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/slices/auth/authThunks";
import toast from "react-hot-toast";
import { clearErrors } from "../app/slices/auth/authSlice";
import GoogleAuth from "../components/Google";
import { Boxes, ListChecks, Users2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error, fieldErrors, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-primary-950 overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-700/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Boxes className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-display font-bold text-lg tracking-tight">
            RemoteSync
          </span>
        </Link>

        <div className="relative space-y-8">
          <h2 className="text-3xl font-display font-semibold text-white leading-snug">
            Everything your team needs to ship, in one workspace.
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary-100/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <ListChecks className="w-4 h-4" />
              </div>
              <span className="text-sm">Plan, assign and track tasks together</span>
            </div>
            <div className="flex items-center gap-3 text-primary-100/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Users2 className="w-4 h-4" />
              </div>
              <span className="text-sm">Bring your whole team into one project</span>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-primary-200/60">
          &copy; {new Date().getFullYear()} RemoteSync. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 justify-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 font-display font-bold text-lg">
              RemoteSync
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Log in to pick up right where your team left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email address
              </label>
              <Input
                type="email"
                id="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && (
                <p className="text-danger-600 text-xs mt-1.5">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {fieldErrors.password && (
                <p className="text-danger-600 text-xs mt-1.5">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Log in
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-grow border-slate-200" />
            <span className="text-xs font-medium text-slate-400">OR</span>
            <hr className="flex-grow border-slate-200" />
          </div>

          <GoogleAuth />

          <p className="text-sm text-slate-500 text-center mt-6">
            Don&rsquo;t have an account?{" "}
            <Link to="/signup" className="text-primary-600 font-medium hover:text-primary-700">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
