import { useState, useEffect } from 'react';
import { FreelancerProfile } from '@/types/FindFreelancer';
import apiClient from '@/app/lib/apiClient';


export const useFreelancers = () => {
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get<FreelancerProfile[]>('/api/v1/users/');

        // const freelancersList = data.filter(user => 
        //   user.role?.toLowerCase().includes('freelancer')
        // );
        setFreelancers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch freelancers');
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  return { freelancers, loading, error };
};