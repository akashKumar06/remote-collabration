const CircularLoader = ({ size = 20, color = "#6640e0", borderWidth = 2 }) => {
  return (
    <div
      className="rounded-full border-t-transparent animate-spin"
      style={{
        width: size,
        height: size,
        borderWidth: borderWidth,
        borderStyle: "solid",
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
};

export default CircularLoader;
