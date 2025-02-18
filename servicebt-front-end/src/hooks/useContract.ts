import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/app/lib/apiClient';

interface Milestone {
  milestone_id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
}

interface Contract {
  contract_id: number;
  client_name: string;
  freelancer_name: string;
  job_title: string;
  total_amount: number;
  status: string;
  start_date: string;
  end_date: string;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export const useContract = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchContractDetail = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/api/v1/contracts/${id}/`);
        setContract(response.data);
      } catch (err) {
        setError('Failed to fetch contract details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractDetail();
  }, [id]);

  return { contract, isLoading, error, setContract };
};
