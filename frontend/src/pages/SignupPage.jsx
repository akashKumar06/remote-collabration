// SignupPage.jsx
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { CardContent } from "../components/CardContent";
import { Card } from "../components/Card";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/slices/auth/authThunks";
import { clearErrors } from "../app/slices/auth/authSlice";
// import axios from 'axios'

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

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setphoneNumber] = useState();
  const [password, setPassword] = useState();

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg shadow-lg p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.firstname && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.firstname}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.lastname && (
                  <p className="text-red-500 text-sm">{fieldErrors.lastname}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                {fieldErrors.phoneNo && (
                  <p className="text-red-500 text-sm">{fieldErrors.phoneNo}</p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm">{fieldErrors.password}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full py-2">
              {status === "loading" ? "Registering" : "Sign Up"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Button variant="outline" className="w-full py-2">
              Continue with Google
            </Button>
          </div>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-gray-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default SignupPage;
