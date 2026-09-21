export default function Badge({ text, color = "gray", className = "" }) {
  const colorClasses = {
    gray: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
    blue: "bg-info-50 text-info-600 ring-1 ring-inset ring-blue-200",
    green: "bg-success-50 text-success-600 ring-1 ring-inset ring-emerald-200",
    yellow: "bg-warning-50 text-warning-600 ring-1 ring-inset ring-amber-200",
    red: "bg-danger-50 text-danger-600 ring-1 ring-inset ring-red-200",
    purple: "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200",
    pink: "bg-pink-50 text-pink-600 ring-1 ring-inset ring-pink-200",
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
        colorClasses[color] || colorClasses.gray
      } ${className}`}
    >
      {text}
    </span>
  );
}
