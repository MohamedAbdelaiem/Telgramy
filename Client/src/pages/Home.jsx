import useChatStore from '../store/useChatStore';
import useAuthStore from '../store/useAuthStore';


import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

function HomePage() {
    const { selectedUser } = useChatStore();
    const { isDarkMode } = useAuthStore();
    return (
      <div className={`h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex items-center justify-center pt-20 px-4">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]`}>
            <div className="flex h-full rounded-lg overflow-hidden">
              <SideBar />
  
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    );
}

export default HomePage;