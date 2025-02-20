
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/app/api/apiClient";

// Define User Profile Type
interface UserProfile {
  profile_id: number;
  profile_picture: string | null;
  banner: string | null;
  bio: string | null;
  address: string | null;
  headline: string | null;
  skills: string[];
  average_rating: string;
  created_at: string;
  updated_at: string;
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
      email: "",
      profile: {
        profile_id: 0,
        profile_picture: null,
        banner: null,
        bio: null,
        address: null,
        headline: null,
        skills: [],
        average_rating: "0.00",
        created_at: "",
        updated_at: "",
      },

      // Set user data in the state
      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      // Fetch user data from API
      fetchUserData: async () => {
        try {
          const response = await apiClient.get("/api/v1/users/profile/");
          const userData = response.data;
          set({
            username: userData.user.username,
            first_name: userData.user.first_name,
            last_name: userData.user.last_name,
            phone: userData.user.phone,
            role: userData.user.role,
            email: userData.user.email,
            profile: {
              profile_id: userData.profile_id,
              profile_picture: userData.profile_picture,
              banner: userData.banner,
              bio: userData.bio,
              address: userData.address,
              headline: userData.headline,
              skills: userData.skills,
              average_rating: userData.average_rating,
              created_at: userData.created_at,
              updated_at: userData.updated_at,
            },
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
            bio: null,
            address: null,
            headline: null,
            skills: [],
            average_rating: "0.00",
            created_at: "",
            updated_at: "",
          },
        }),
    }),
    { name: "user-storage" } // Persist data in LocalStorage
  )
);
