import React, { useState } from 'react';
import { Bell, Moon, Sun, User, Lock, Globe, Volume2, Trash2, LogOut, Palette, Shield, Mail, Camera } from 'lucide-react';

import useAuthStore from '../store/useAuthStore';

// Since useAuthStore implementation isn't provided, let's create a simple version
// You can replace this with your actual store implementation


const Settings = () => {
  // Use dark mode from the store
  const { isDarkMode, toogleDarkMode,AuthUser } = useAuthStore();
  
  const [notifications, setNotifications] = useState(true);
  const [messageSound, setMessageSound] = useState(true);
  const [language, setLanguage] = useState('english');
  const [activeTab, setActiveTab] = useState('appearance');
  
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
    { id: 'notifications', label: 'Notifications (soon)', icon: <Bell size={20} /> },
    { id: 'privacy', label: 'Privacy (soon)', icon: <Shield size={20} /> }
  ];
  
  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header with gradient */}
      <div className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'} p-6 shadow-lg`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <button 
            onClick={toogleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} hover:opacity-90 transition-all duration-200`}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className={`lg:col-span-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
            <div className="p-6 flex flex-col items-center border-b border-gray-700">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'} mb-4`}>
                <User size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-medium">{AuthUser.fullName||"example"}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{AuthUser.email||"example.com"}</p>
            </div>
            
            <nav className="p-4">
              <ul>
                {tabs.map(tab => (
                  <li key={tab.id} className="mb-2">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200
                        ${activeTab === tab.id 
                          ? (isDarkMode ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-700')
                          : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                        }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6`}>
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Palette size={24} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                  Appearance
                </h2>
                
                <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={toogleDarkMode}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                        ${!isDarkMode 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'}`}
                    >
                      <Sun size={24} />
                      <span>Light</span>
                    </button>
                    <button 
                      onClick={toogleDarkMode}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                        ${isDarkMode 
                          ? 'border-purple-500 bg-purple-900/30 text-purple-400' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                    >
                      <Moon size={24} />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
                
                <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-medium mb-4">Language</h3>
                  <div className="relative">
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`w-full p-3 pl-10 pr-10 appearance-none rounded-lg border focus:outline-none focus:ring-2 transition-all
                        ${isDarkMode 
                          ? 'bg-gray-800 border-gray-600 focus:ring-purple-500 text-white' 
                          : 'bg-white border-gray-300 focus:ring-purple-500 text-gray-900'}`}
                    >
                      <option value="english">English</option>
                    </select>
                    <Globe size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Bell size={24} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                  Notifications
                </h2>
                
                <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Receive alerts when you get new messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                      />
                      <div className={`w-14 h-7 rounded-full peer peer-focus:ring-4 
                        ${isDarkMode ? 'peer-focus:ring-purple-800 bg-gray-600' : 'peer-focus:ring-purple-100 bg-gray-300'} 
                        peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                        after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all 
                        ${notifications ? 'bg-purple-600' : ''}`}></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Message Sounds</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Play sounds for incoming messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={messageSound}
                        onChange={() => setMessageSound(!messageSound)}
                      />
                      <div className={`w-14 h-7 rounded-full peer peer-focus:ring-4 
                        ${isDarkMode ? 'peer-focus:ring-purple-800 bg-gray-600' : 'peer-focus:ring-purple-100 bg-gray-300'} 
                        peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                        after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all 
                        ${messageSound ? 'bg-purple-600' : ''}`}></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield size={24} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                  Privacy
                </h2>
                
                <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-medium mb-4">Who can contact you</h3>
                  <div className="space-y-3">
                    {['Everyone', 'Friends only', 'Nobody'].map(option => (
                      <button 
                        key={option}
                        className={`w-full p-3 rounded-lg flex items-center justify-between transition-all
                          ${option === 'Friends only' 
                            ? (isDarkMode ? 'bg-purple-900/50 border-l-4 border-purple-500' : 'bg-purple-100 border-l-4 border-purple-500')
                            : (isDarkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-white hover:bg-gray-100')}`}
                      >
                        <span>{option}</span>
                        {option === 'Friends only' && (
                          <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-medium mb-4">Read receipts</h3>
                  <button className={`w-full p-3 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <span>Show read receipts</span>
                    <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;