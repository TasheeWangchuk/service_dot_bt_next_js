import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/app/lib/apiClient"; 

// Define User Profile Type
interface UserProfile {
  first_name: string;
  last_name: string;
  profile_id: number;
  profile_picture: string | null;
  banner: string | null;
  bio: string;
  address: string | null;
  headline: string | null;
}

// Define User State Type
interface UserState {
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  email: string;
  profile: UserProfile;
  setUser: (userData: Partial<UserState>) => void;
  fetchUserData: () => Promise<void>;
  clearUser: () => void;
}

// Create Zustand Store with Persist
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      first_name: "",
      last_name: "",
      phone: "",
      role: "",
      email:"",
      profile: {
          profile_id: 0,
          profile_picture: null,
          banner: null,
          bio: "",
          address: null,
          headline: null,
          first_name: "",
          last_name: ""
      },

      // Set user data in the state
      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      // Fetch user data from API
      fetchUserData: async () => {
        try {
          const response = await apiClient.get("/api/v1/users/profile/");
          set({
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone: response.data.phone,
            role: response.data.role,
            profile: response.data.profile, 
            email: response.data.email,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },

      // Clear user data on logout
      clearUser: () =>
        set({
          username: "",
          first_name: "",
          last_name: "",
          phone: "",
          role: "",
          email: "",
          profile: {
              profile_id: 0,
              profile_picture: null,
              banner: null,
              bio: "",
              address: null,
              headline: null,
              first_name: "",
              last_name: ""
          },
        }),
    }),
    { name: "user-storage" } // Persist data in LocalStorage
  )
);
