import axios from "axios";
import {create} from "zustand";
import instance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    AuthUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    ischeckingAuth: true,
    isDarkMode:false,

    checkAuth: async()=>{
        try{
            const response =await instance.get("/auth/checkAuth");
            console.log(response.data);
            set({AuthUser:response.data.user});
        }
        catch(err){
            console.error(err);
            set({AuthUser:null});
        }
        finally{
            set({ischeckingAuth:false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await instance.post("/auth/signup", data);
            toast.success("Signed up successfully");
            console.log(response.data);
            set({ AuthUser: response.data.user });
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
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await instance.post("/auth/login", data);
            toast.success("Logged in successfully");
            set({ AuthUser: response.data.user });
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
    toogleDarkMode:()=>{
        set((state)=>({isDarkMode:!state.isDarkMode}));
    }


}));

export default useAuthStore;