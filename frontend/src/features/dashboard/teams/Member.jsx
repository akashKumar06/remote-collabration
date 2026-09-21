import { CalendarCheck, Mail } from "lucide-react";
import { format } from "date-fns";

const avatarTints = [
  "bg-primary-100 text-primary-700",
  "bg-info-50 text-info-600",
  "bg-success-50 text-success-600",
  "bg-warning-50 text-warning-600",
  "bg-pink-50 text-pink-600",
];

const tintFor = (id) => {
  if (!id) return avatarTints[0];
  const sum = String(id)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarTints[sum % avatarTints.length];
};

function Member({ member }) {
  return (
    <div className="card-surface p-5 space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${tintFor(
            member.user._id
          )}`}
        >
          {member.user.firstname?.[0]?.toUpperCase()}
        </span>
        <div>
          <p className="font-semibold text-slate-800">{`${member.user.firstname} ${member.user.lastname}`}</p>
          <p className="text-sm text-slate-400 capitalize">{member.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <CalendarCheck size={15} />
        Joined on {format(new Date(member.joined), "MMM d, yyyy")}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Mail size={15} />
        <span>{member.user.email}</span>
      </div>
    </div>
  );
}

export default Member;
