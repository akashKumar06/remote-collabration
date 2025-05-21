const SplashScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
      <h1 className="text-2xl font-semibold animate-pulse">Loading App...</h1>
    </div>
  );
};

export default SplashScreen;
