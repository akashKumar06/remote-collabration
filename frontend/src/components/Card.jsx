export const Card = ({ children, className = "", hoverable = false }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-card)] ${
        hoverable ? "transition-shadow hover:shadow-[var(--shadow-pop)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
