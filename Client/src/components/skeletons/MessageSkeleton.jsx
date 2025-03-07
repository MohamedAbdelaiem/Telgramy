import  useAuthStore  from "../../store/useAuthStore";

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);
  const { isDarkMode } = useAuthStore();
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isLeft = idx % 2 === 0;
        
        return (
          <div 
            key={idx} 
            className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
          >
            <div className={`max-w-[70%] flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-start gap-2`}>
              {/* Avatar skeleton */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div 
                    className={`w-full h-full rounded-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } animate-pulse`} 
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                {/* Time skeleton */}
                <div className="flex items-center mb-1">
                  <div 
                    className={`h-4 w-16 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } animate-pulse`} 
                  />
                </div>
                
                {/* Message bubble skeleton */}
                <div 
                  className={`h-16 w-[200px] rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } animate-pulse`} 
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;