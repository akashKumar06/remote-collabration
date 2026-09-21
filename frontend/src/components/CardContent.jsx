export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export default CardContent;
