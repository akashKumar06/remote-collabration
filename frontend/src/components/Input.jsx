export const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100 ${className}`}
      {...props}
    />
  );
};

export default Input;
