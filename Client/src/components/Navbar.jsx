import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, AuthUser } = useAuthStore();
  

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-80 shadow-sm mb-[5px]">
      <div className="max-w-6xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Telgramy</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {AuthUser && (
              <>
                <Link 
                  to="/profile" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;