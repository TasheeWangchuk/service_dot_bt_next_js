import { useState, useEffect } from 'react';
import apiClient from '@/app/api/apiClient';
import { toast } from 'react-toastify';
import { UserProfile } from '@/types/profile';

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
