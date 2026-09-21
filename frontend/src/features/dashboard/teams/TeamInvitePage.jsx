import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useSearchParams } from "react-router";
import api from "../../../api/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Boxes, Users2 } from "lucide-react";
import { Button } from "../../../components/Button";

export default function TeamInvitePage() {
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isAccepting, setIsAccepting] = useState(false);
  const navigate = useNavigate();
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await api.post("/teams/accept-invite", { token });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept invite");
    }
    setIsAccepting(false);
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing invitation token.");
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [token, navigate, user]);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full px-4 sm:px-6 py-4 border-b border-slate-200 bg-white">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Boxes className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-slate-900">RemoteSync</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg card-surface p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
              <Users2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{decoded.teamName}</h2>
              <p className="text-slate-500 text-sm">
                A team focused on frontend excellence.
              </p>
            </div>
          </div>

          <div className="text-slate-600 text-sm">
            <p>
              <span className="text-slate-800 font-medium">{decoded.inviter}</span>{" "}
              has invited you to join this team as a {decoded.role}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={handleAccept} loading={isAccepting}>
              Accept
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
