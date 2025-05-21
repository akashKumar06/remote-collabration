import { FcGoogle } from "react-icons/fc";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
// import axios from 'axios'
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/slices/auth/authThunks";
import toast from "react-hot-toast";
import { clearErrors } from "../app/slices/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error, fieldErrors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    dispatch(loginUser(formData));
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm">{fieldErrors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mb-4"
          >
            Login
          </Button>
        </form>

        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 border border-gray-300"
        >
          <FcGoogle className="mr-2 text-lg" />
          Continue with Google
        </Button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
