import {create} from 'zustand'
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/me", {
        withCredentials: true,
      });
      set({ user: res.data.user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },
   setUser: (user) => set({ user }),

    logout: async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      set({ user: null });
    } catch (error) {
      console.error("Logout failed", error);
    }
 }
}));

export default useAuthStore;
