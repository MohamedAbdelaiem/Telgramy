import  useChatStore  from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import  useAuthStore  from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, isDarkMode } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    // subscribeToMessages();
    // return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        {messages.map((message, index) => {
          const isMyMessage = message.senderId === authUser._id;
          const isLastMessage = index === messages.length - 1;
          
          return (
            <div
              key={message._id}
              className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
              ref={isLastMessage ? messageEndRef : null}
            >
              <div className={`max-w-[70%] flex ${isMyMessage ? "flex-row-reverse" : "flex-row"} items-start gap-2`}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border overflow-hidden">
                    <img
                      src={
                        isMyMessage
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <time className="text-xs opacity-50 mx-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                  <div 
                    className={`rounded-lg p-3 ${
                      isMyMessage 
                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
                        : isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;