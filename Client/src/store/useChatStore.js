import { create } from "zustand";
import toast from "react-hot-toast";
import instance from "../lib/axios";

const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,//to show sceletons
  isMessagesLoading: false,//same as above
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await instance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Failed to get users");
    }
    set({ isUsersLoading: false });
  },

    getMessages: async (id) => {
        set({ isMessagesLoading: true });
        try {
        const res = await instance.get(`/message/messagesBetweenTwoUsers/${id}`);
        set({ messages: res.data });
        } catch (error) {
        toast.error("Failed to get messages");
        }
        set({ isMessagesLoading: false });
    },

    sendMessage: async (data) => {
      const {selectedUser, messages} = get();
      try {
        const res = await instance.post(`/message/sendMessage/${selectedUser._id}`, data);
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast.error("Failed to send message");
      }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),

}));

export default useChatStore;
