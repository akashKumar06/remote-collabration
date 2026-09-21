const SplashScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-surface text-slate-800">
      <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-[var(--shadow-pop)] mb-5">
        <span className="text-white font-display font-bold text-lg">R</span>
      </div>
      <div className="w-8 h-8 rounded-full border-[3px] border-primary-200 border-t-primary-600 animate-spin mb-4" />
      <h1 className="text-sm font-medium text-slate-500 tracking-wide">
        Loading your workspace…
      </h1>
    </div>
  );
};

export default SplashScreen;
