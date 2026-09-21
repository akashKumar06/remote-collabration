// SignupPage.jsx
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/slices/auth/authThunks";
import { clearErrors } from "../app/slices/auth/authSlice";
import GoogleAuth from "../components/Google";
import { Boxes, Sparkles, Workflow } from "lucide-react";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { user, status, error, fieldErrors } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
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
            Set your team up for its best work, in minutes.
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary-100/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Workflow className="w-4 h-4" />
              </div>
              <span className="text-sm">Organize projects into clear workflows</span>
            </div>
            <div className="flex items-center gap-3 text-primary-100/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm">Free forever for small teams</span>
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
              Create your account
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Start collaborating with your team today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  First name
                </label>
                <Input
                  type="text"
                  placeholder="Jane"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.firstname && (
                  <p className="text-danger-600 text-xs mt-1.5">
                    {fieldErrors.firstname}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Last name
                </label>
                <Input
                  type="text"
                  placeholder="Doe"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.lastname && (
                  <p className="text-danger-600 text-xs mt-1.5">{fieldErrors.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@company.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && (
                <p className="text-danger-600 text-xs mt-1.5">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <p className="text-danger-600 text-xs mt-1.5">{fieldErrors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              loading={status === "loading"}
              className="w-full mt-2"
            >
              Create account
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-grow border-slate-200" />
            <span className="text-xs font-medium text-slate-400">OR</span>
            <hr className="flex-grow border-slate-200" />
          </div>

          <GoogleAuth />

          <p className="text-sm text-slate-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
