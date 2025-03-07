import axios from "axios";
import { create } from "zustand";
import instance from "../lib/axios";
import toast from "react-hot-toast";
import useChatStore from "./useChatStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE==='development'?'http://localhost:3000':"https://tlgram-ddoouxioc-mohamedabdelaiems-projects.vercel.app/";

const useAuthStore = create((set,get) => ({
  AuthUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  ischeckingAuth: true,
  isDarkMode: false,
  onlineUsers: [],
  socket:null,

  checkAuth: async () => {
    try {
      const response = await instance.get("/auth/checkAuth");
      console.log(response.data);
      set({ AuthUser: response.data.user });
      get().connectSocket();
    } catch (err) {
      console.error(err);
      set({ AuthUser: null });
    } finally {
      set({ ischeckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await instance.post("/auth/signup", data);
      toast.success("Signed up successfully");
      console.log(response.data);
      set({ AuthUser: response.data.user });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await instance.post("/auth/logout");
      set({ AuthUser: null });
      useChatStore.setState({ messages: [], users: [], selectedUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await instance.post("/auth/login", data);
      toast.success("Logged in successfully");
      const user= response.data.user;
      user._id=(user.id||user._id);
      set({ AuthUser: user });
      get().connectSocket();

        

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await instance.put("/auth/update-profile", data);
      toast.success("Profile updated successfully");
      console.log(response.data.user);
      set({ AuthUser: response.data.user });
    } catch (error) {
      // toast.error(error.response.data);
      console.error(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  toogleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },
  connectSocket:()=>{
    const {AuthUser}=get();
    if(!AuthUser||get().socket?.connected)return;
    const socket=io(BASE_URL,{
      query:{
        userId:AuthUser._id,
      }
    });
    socket.connect();
    set({socket:socket});

    socket.on("onlineUsers",(users)=>{
      set({onlineUsers:users}); 
    });
  },
  disconnectSocket:()=>{
    if(get().socket?.connected){
      get().socket.disconnect();
      set({socket:null});
    }
  },
}));

export default useAuthStore;
