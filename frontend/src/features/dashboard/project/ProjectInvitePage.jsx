import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { Boxes, FolderKanban } from "lucide-react";
import { Button } from "../../../components/Button";

export default function ProjectInvitePage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const navigate = useNavigate();

  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  const handleAccept = async () => {
    try {
      const res = await api.post("/projects/accept-invite", { token });

      const projectId = res.data.projectId;

      navigate(`/dashboard/projects/${projectId}/overview`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing invitation token.");
      return;
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
          <Boxes className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-display font-bold text-slate-900">RemoteSync</span>
      </Link>

      <div className="w-full max-w-md card-surface p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
            <FolderKanban className="w-7 h-7 text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            {decoded.inviter} invites you
          </h2>
          <p className="text-slate-500 mb-2 text-sm">
            to collaborate on{" "}
            <span className="font-medium text-slate-700">{decoded?.projectName}</span>
          </p>

          <Button onClick={handleAccept} className="mt-4 w-full">
            Accept invite
          </Button>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          By accepting, you agree to our{" "}
          <a href="/terms" className="underline hover:text-slate-600">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="/privacy" className="underline hover:text-slate-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
