import { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeletoon";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers, isDarkMode } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`h-full w-20 lg:w-72 border-r ${
        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      } flex flex-col transition-all duration-200`}
    >
      <div
        className={`border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } w-full p-5`}
      >
        <div className="flex items-center gap-2">
          <Users
            className={`w-6 h-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          />
          <span
            className={`font-medium hidden lg:block ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Contacts
          </span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className={`w-4 h-4 rounded ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Show online only
            </span>
          </label>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-200"
                  : "hover:bg-gray-100 text-gray-800"
              } transition-colors
              ${
                selectedUser?._id === user._id
                  ? isDarkMode
                    ? "bg-gray-700 ring-1 ring-gray-600"
                    : "bg-gray-100 ring-1 ring-gray-200"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                  rounded-full ring-2 ${
                    isDarkMode ? "ring-gray-800" : "ring-white"
                  }`}
                />
              )}
            </div>
            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div
                className={`font-medium truncate ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {user.fullName}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div
            className={`text-center py-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
