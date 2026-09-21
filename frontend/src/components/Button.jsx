import CircularLoader from "./CircularLoader";

export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    icon: "p-2",
  };

  const variants = {
    default:
      "bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus-visible:ring-primary-400",
    secondary:
      "bg-primary-50 text-primary-700 hover:bg-primary-100 focus-visible:ring-primary-300",
    outline:
      "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus-visible:ring-slate-300",
    ghost:
      "text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300",
    danger:
      "bg-danger-600 text-white hover:bg-danger-500 focus-visible:ring-danger-300 shadow-sm",
    "danger-outline":
      "border border-danger-200 text-danger-600 bg-white hover:bg-danger-50 focus-visible:ring-danger-200",
  };

  return (
    <button
      className={`${baseStyle} ${sizes[size] || sizes.md} ${
        variants[variant] || variants.default
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <CircularLoader
          size={16}
          borderWidth={2}
          color={variant === "default" || variant === "danger" ? "#ffffff" : "#6640e0"}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
