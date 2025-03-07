import { X } from "lucide-react";
import  useAuthStore  from "../store/useAuthStore";
import  useChatStore  from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, isDarkMode } = useAuthStore();
  
  return (
    <div className={`p-2.5 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          {/* User info */}
          <div>
            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        
        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className={`p-1 rounded-full hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
        >
          <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;