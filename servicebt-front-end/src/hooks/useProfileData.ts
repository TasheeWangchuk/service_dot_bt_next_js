import { useState, useEffect } from 'react';
import apiClient from '@/app/lib/apiClient';
import { toast } from 'react-toastify';

interface UserProfile {
  profile_id: number;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
  };
  profile: {
    profile_id: number;
    profile_picture: string;
    banner: string;
    bio: string;
    address: string | null;
    headline: string | null;
    portfolios: any[];
    certificates: any[];
    experiences: any[];
    education: any[];
  };
}

const useProfileData = (userId: string) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(userId)
      try {
        const response = await apiClient.get(`/api/v1/users/${userId}/`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile data.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { userData, loading };
};

export default useProfileData;
