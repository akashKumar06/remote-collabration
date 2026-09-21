function UserLogo({ src, size = 120 }) {
  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center bg-primary-50 ring-4 ring-white shadow-[var(--shadow-card)]"
      style={{ width: size, height: size }}
    >
      <img
        src={src || "/userlogoimg.png"}
        alt="User avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default UserLogo;
