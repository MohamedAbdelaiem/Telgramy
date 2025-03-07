import { Users } from "lucide-react";
import  useAuthStore  from "../../store/useAuthStore";

const SidebarSkeleton = () => {
  const { isDarkMode } = useAuthStore();
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);
  
  return (
    <aside
      className={`h-full w-20 lg:w-72 border-r ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      } flex flex-col transition-all duration-200`}
    >
      {/* Header */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} w-full p-5`}>
        <div className="flex items-center gap-2">
          <Users className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          <span className={`font-medium hidden lg:block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Contacts
          </span>
        </div>
      </div>
      
      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
            </div>
            
            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className={`h-4 w-32 mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse rounded`} />
              <div className={`h-3 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse rounded`} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;