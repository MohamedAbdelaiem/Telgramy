import { useRef, useState } from "react";
import  useChatStore  from "../store/useChatStore";
import  useAuthStore from "../store/useAuthStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import Picker from "@emoji-mart/react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { isDarkMode } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return; 
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const insertEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.native);
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className={`w-20 h-20 object-cover rounded-lg border ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            />
            <button
              onClick={removeImage}
              className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } flex items-center justify-center`}
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 relative">
          <input
            type="text"
            className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg border ${
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            } transition-colors ${showEmojiPicker ? "text-yellow-500" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={20} />
          </button>
          
          {/* Image Button */}
          <button
            type="button"
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            } transition-colors ${imagePreview ? "text-emerald-500" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div 
              ref={emojiPickerRef}
              className="absolute bottom-12 right-0 z-10"
            >
              <Picker 
                onEmojiSelect={insertEmoji} 
                theme={isDarkMode ? "dark" : "light"} 
              />
            </div>
          )}
        </div>
        
        {/* Send Button */}
        <button
          type="submit"
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            !text.trim() && !imagePreview
              ? isDarkMode 
                ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
