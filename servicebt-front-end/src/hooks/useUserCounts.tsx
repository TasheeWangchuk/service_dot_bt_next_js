import { useState, useEffect } from 'react';
import apiClient from '@/app/api/apiClient';

export const useUserCounts = () => {
    const [freelancerCount, setFreelancerCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserCounts = async () => {
        try {
          const response = await apiClient.get("/api/v1/users/");
          const users = response.data;
  
          // Debug logging for all users' roles
          users.forEach((user: { user_id: any; role: any; }) => {
            console.log(`User ID ${user.user_id} - Role: "${user.role}" - Type: ${typeof user.role}`);
          });
  
          const freelancers = users.filter((user: { role: string; }) => 
            user.role === "Freelancer"
          ).length;
          const clients = users.filter((user: { role: string; }) => 
            user.role === "Client"
          ).length;
  
          setFreelancerCount(freelancers);
          setClientCount(clients);
        } catch (error) {
          // Handle error
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserCounts();
    }, []);
  
    return { freelancerCount, clientCount, loading };
  };