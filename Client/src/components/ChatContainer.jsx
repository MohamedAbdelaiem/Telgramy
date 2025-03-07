import { useEffect, useRef, useState } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { AuthUser, isDarkMode } = useAuthStore();
  console.log(AuthUser);
  const messageEndRef = useRef(null);

  // 🔹 State to track selected image for preview
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if(selectedUser?._id&&AuthUser?._id)
    {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => unsubscribeToMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    }
  }, [messages]);

  // 🔹 Close preview when pressing ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          const isMyMessage = message.senderId === AuthUser._id;
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
                          ? AuthUser.profilePic || "/avatar.png"
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
                    {/* 🔹 Image preview on click */}
                    {message.Image && (
                      <img
                        src={message.Image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-80 transition"
                        onClick={() => setPreviewImage(message.Image)}
                        onLoad={() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" })} 
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

      {/* 🔹 Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative p-4">
            <img 
              src={previewImage} 
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            />
            <button 
              className="absolute top-2 right-2 text-white text-2xl bg-gray-700 rounded-full px-2"
              onClick={() => setPreviewImage(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
