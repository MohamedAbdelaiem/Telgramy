const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 ">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-300 blur-xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-violet-300 blur-xl animate-pulse delay-700" />
          <div className="absolute top-2/3 left-1/3 w-24 h-24 rounded-full bg-purple-300 blur-xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-md text-center z-10">
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-white shadow-md ${
                  i % 3 === 0 
                    ? "bg-gradient-to-br from-indigo-100 to-indigo-200 animate-pulse" 
                  : i % 3 === 1 
                    ? "bg-gradient-to-br from-violet-100 to-violet-200 animate-pulse delay-700" 
                  : "bg-gradient-to-br from-purple-100 to-purple-200 animate-pulse delay-1000"
                }`}
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">{title}</h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;