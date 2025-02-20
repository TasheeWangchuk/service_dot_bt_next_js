
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clipboard, Calendar, DollarSign, ExternalLink, Coins, CoinsIcon, Clock } from 'lucide-react';
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
        return 'bg-red-500 ';
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Contracts
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Track and manage all your ongoing and completed contracts
          </p>
        </div>

        <ScrollArea className="h-[750px] rounded-xl pr-4">
          <div className="space-y-6">
            {contracts.map((contract) => (
              <Card 
                key={contract.contract_id} 
                className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {contract.job_title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clipboard className="h-4 w-4" />
                      <span>Contract ID: #{contract.contract_id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={`${getStatusColor(
                        contract.status
                      )} px-4 py-1.5 flex items-center gap-2`}
                    >
                      {contract.status}
                    </Badge>
                    <Button
                      onClick={() => handleViewDetails(contract.contract_id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      View Details
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">Client:</span>
                          <span className="text-orange-600">{contract.client_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">Service Provider:</span>
                          <span className="text-orange-600">{contract.freelancer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Duration:</span>
                          <span>
                            {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CoinsIcon className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Total Amount:</span>
                          <span className="text-xl font-bold text-orange-600">
                            Nu. {contract.total_amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Milestones</h3>
                      <div className="space-y-3">
                        {contract.milestones.map((milestone) => (
                          <div
                            key={milestone.milestone_id}
                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <h4 className="font-semibold text-gray-800">
                                  {milestone.title}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="h-4 w-4" />
                                  Due: {formatDate(milestone.deadline)}
                                </div>
                              </div>
                              <div className="text-lg font-bold text-orange-600">
                                Nu. {milestone.amount.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContractList;