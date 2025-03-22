export const Button = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const baseStyle =
    "rounded-2xl px-4 py-2 font-semibold focus:outline-none focus:ring transition";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-300",
  };

  return (
    <button
      className={`${baseStyle} ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
