import { create } from "zustand";
import toast from "react-hot-toast";
import instance from "../lib/axios";
import useAuthStore from "./useAuthStore";

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
          console.log('res', res);
          set({ messages: res.data });
        } catch (error) {
          toast.error("Failed to get messages");
        }
        set({ isMessagesLoading: false });
    },

    sendMessage: async (data) => {
      const {selectedUser, messages} = get();
      try {
        const res = await instance.post(`/message/send/${selectedUser._id}`, data);
        set({ messages: [...messages, res.data.newMessage] });
      } catch (error) {
        toast.error("Failed to send message");
      }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;
      const socket=useAuthStore.getState().socket;
      socket.on("newMessage", (newMessage) => {
        if(newMessage.senderId===selectedUser._id)
        {
          set({ messages: [...get().messages, newMessage] });
        }

      });
    },

    unsubscribeToMessages: () => {
      const socket=useAuthStore.getState().socket;
      socket.off("newMessage");
    },


}));

export default useChatStore;
