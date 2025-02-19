
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clipboard, Calendar, DollarSign, ExternalLink, Coins, CoinsIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import apiClient from '@/app/api/apiClient';
import Loading from '@/components/Shared/Loading';
import Navbar from '@/components/NavBar/NavBar';

// TypeScript interfaces
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

const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/api/v1/contract/list/');
        setContracts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contracts. Please try again later.');
        console.error('Error fetching contracts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleViewDetails = (contractId: number) => {
    router.push(`/Contract-detail/${contractId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'COMPLETED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Navbar/>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Navbar />
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contracts</h1>
        <p className="text-gray-500 mt-2">Manage and track all your contracts</p>
      </div>

      <ScrollArea className="h-[800px] rounded-md">
        <div className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.contract_id} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {contract.job_title}
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge 
                    className={`${getStatusColor(contract.status)} text-white`}
                  >
                    {contract.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(contract.contract_id)}
                    className="flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clipboard className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Client:</span>
                      <span>{contract.client_name}</span>
                      <span className="font-medium">Service Provider:</span>
                      <span>{contract.freelancer_name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Duration:</span>
                      <span>
                        {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CoinsIcon className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-orange-500">Total Amount:</span>
                      <span className='font-semibold'>Nu. {contract.total_amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium mb-2">Milestones:</div>
                    {contract.milestones.map((milestone) => (
                      <div 
                        key={milestone.milestone_id}
                        className="bg-gray-50 p-2 rounded"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{milestone.title}</span>
                          <span>${milestone.amount}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Due: {formatDate(milestone.deadline)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContractList;