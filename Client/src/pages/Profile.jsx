import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Check, Shield } from "lucide-react";

const Profile = () => {
  const { AuthUser, isUpdatingProfile, updateProfile, isDarkMode } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Added safeguard for AuthUser
  const user = AuthUser || {
    fullName: "Guest User",
    email: "guest@example.com",
    createdAt: new Date().toISOString(),
    profilePic: "/avatar.png"
  };

  // Theme variables
  const themeColors = {
    gradient: isDarkMode 
      ? 'bg-gradient-to-r from-cyan-900 to-blue-900' // Changed from purple to cyan in dark mode
      : 'bg-gradient-to-r from-blue-500 to-purple-600',
    headerGradient: isDarkMode
      ? 'bg-gradient-to-r from-blue-900 to-cyan-800'
      : 'bg-gradient-to-r from-blue-500 to-purple-600',
    background: isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800',
    card: isDarkMode ? 'bg-gray-800' : 'bg-white',
    infoCard: isDarkMode ? 'bg-gray-700/70 border-gray-600' : 'bg-gray-50 border-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-800',
    subtext: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    icon: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
  };

  return (
    <div className={`min-h-screen w-full ${themeColors.background}`}>
      {/* Header with gradient */}
      <div className={`w-full ${themeColors.headerGradient} p-6 shadow-lg`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className={`${themeColors.card} rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>
          {/* Banner gradient above photo - changed in dark mode */}
          <div className={`${themeColors.gradient} h-36 sm:h-56 transition-all duration-300`}></div>

          <div className="p-6 sm:p-8">
            {/* Profile header section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-10">
              <div className="-mt-20 sm:-mt-28 mb-4 sm:mb-0 flex flex-col items-center">
                <div className="relative group">
                  {/* Profile picture container */}
                  <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full ${
                    isDarkMode ? 'bg-gray-700 border-gray-800' : 'bg-gray-200 border-white'
                  } border-4 overflow-hidden shadow-xl transition-all duration-300`}>
                    <img
                      src={selectedImg || user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Camera icon button */}
                  <label
                    htmlFor="profilePic"
                    className={`absolute bottom-1 right-1 ${
                      isDarkMode ? 'bg-cyan-800 hover:bg-cyan-700' : 'bg-blue-100 hover:bg-blue-200'
                    } p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    <Camera className={`h-5 w-5 ${isDarkMode ? 'text-cyan-200' : 'text-blue-600'}`} />
                    <input
                      type="file"
                      id="profilePic"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>

                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-3`}>
                  {isUpdatingProfile
                    ? "Uploading..."
                    : "Click the camera to update photo"}
                </p>
              </div>

              <div className="sm:ml-10 text-center sm:text-left">
                <h2 className={`text-3xl font-bold ${themeColors.text} mb-1`}>Your Profile</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                  Manage your personal information
                </p>
              </div>
            </div>

            {/* Profile content */}
            <div className="space-y-10">
              {/* Personal Information Section */}
              <div>
                <h3 className={`text-xl font-semibold ${themeColors.text} mb-4 flex items-center`}>
                  <User className={`${themeColors.icon} mr-2 h-5 w-5`} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${themeColors.infoCard} rounded-xl p-5 border hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center mb-2">
                      <User className={`h-5 w-5 ${themeColors.icon} mr-2`} />
                      <span className={`text-sm font-medium ${themeColors.subtext}`}>
                        Full Name
                      </span>
                    </div>
                    <p className={`text-lg font-medium ${themeColors.text}`}>
                      {user.fullName}
                    </p>
                  </div>

                  <div className={`${themeColors.infoCard} rounded-xl p-5 border hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center mb-2">
                      <Mail className={`h-5 w-5 ${themeColors.icon} mr-2`} />
                      <span className={`text-sm font-medium ${themeColors.subtext}`}>
                        Email Address
                      </span>
                    </div>
                    <p className={`text-lg font-medium ${themeColors.text}`}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div>
                <h3 className={`text-xl font-semibold ${themeColors.text} mb-4 flex items-center`}>
                  <Shield className={`${themeColors.icon} mr-2 h-5 w-5`} />
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${themeColors.infoCard} rounded-xl p-5 border hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className={`h-5 w-5 ${themeColors.icon} mr-2`} />
                        <span className={`text-sm font-medium ${themeColors.subtext}`}>
                          Member Since
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300 bg-gray-600/50' : 'text-gray-800 bg-gray-100'
                      } px-3 py-1 rounded-md`}>
                        {user.createdAt?.split("T")[0]}
                      </span>
                    </div>
                  </div>

                  <div className={`${themeColors.infoCard} rounded-xl p-5 border hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-500'} mr-2`} />
                        <span className={`text-sm font-medium ${themeColors.subtext}`}>
                          Account Status
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-50 text-green-600'
                      } px-3 py-1 rounded-md`}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;