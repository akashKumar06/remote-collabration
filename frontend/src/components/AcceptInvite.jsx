//vaishvi.sisodiya28@gmail.com
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { getProjectById } from "../app/slices/project/projectThunk";

const AcceptInvite = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [inviter, setInviter] = useState("Someone");
  const [projectName, setProjectName] = useState("a Project");
  const [message, setMessage] = useState("You're invited to collaborate!");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing invitation token.");
      return;
    }
    // check if you are valid user or not
    if (!user) {
      navigate("/login");
    }
  }, [token, navigate, user]);

  const handleAccept = async () => {
    try {
      const res = await api.post("/projects/accept-invite", { token });
      const projectId = res.data.projectId;
      dispatch(getProjectById(projectId));
      navigate(`/dashboard/projects`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {inviter} invites you
          </h2>
          <p className="text-gray-600 mb-2">
            to collaborate on <span className="font-medium">{projectName}</span>
          </p>
          <div className="bg-yellow-100 text-yellow-800 text-sm italic px-4 py-2 rounded-lg mb-4">
            "{message}"
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <button
            onClick={handleAccept}
            className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg transition"
          >
            Accept Invite
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          By accepting, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AcceptInvite;
