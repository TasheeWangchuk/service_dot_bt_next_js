"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clipboard, Calendar, DollarSign, CheckCircle, ArrowLeft, AlertCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import apiClient from '@/app/lib/apiClient';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import NavBar from '@/components/NavBar/NavBar';
import Loading from '@/components/Shared/Loading';
// import { useUserStore } from '@/store/userStore';
import { useAuth } from "@/app/context/AuthContext";


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

const ContractDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false);
  const [responseAction, setResponseAction] = useState<'accept' | 'reject' | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
//   const { role } = useUserStore();
const { user } = useAuth();
const role = user?.role;

//   console.log('role', role);

  useEffect(() => {
    const fetchContractDetail = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/api/v1/contracts/${id}/`);
        setContract(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contract details. Please try again later.');
        console.error('Error fetching contract:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractDetail();
  }, [id]);

  const handleComplete = async () => {
    if (!contract) return;
    
    try {
      setIsUpdating(true);
      await apiClient.post(`/api/v1/contracts/${contract.contract_id}/complete/`);
      
      // Refetch contract details to get updated status
      const response = await apiClient.get(`/api/v1/contracts/${contract.contract_id}/`);
      setContract(response.data);
      setIsCompleteDialogOpen(false);
    } catch (err) {
      setError('Failed to complete the contract. Please try again later.');
      console.error('Error completing contract:', err);
    } finally {
      setIsUpdating(false);
    }
  };
//   const handleResponseClick = (action: 'accept' | 'reject') => {
//     setResponseAction(action);
//     setIsRespondDialogOpen(true);
//   };
  
  const handleRespond = async () => {
    if (!contract || !responseAction) return;
    
    try {
      setIsUpdating(true);
      await apiClient.post(`/api/v1/contracts/${contract.contract_id}/respond/`, {
        action: responseAction
      });
      
      // Refetch contract details to get updated status
      const response = await apiClient.get(`/api/v1/contracts/${contract.contract_id}/`);
      setContract(response.data);
      setIsRespondDialogOpen(false);
      setResponseAction(null);
    } catch (err) {
      setError(`Failed to ${responseAction} the contract. Please try again later.`);
      console.error('Error responding to contract:', err);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const renderActionButtons = () => {
    if (role === 'Freelancer' && contract?.status.toUpperCase() === 'PENDING') {
      return (
        <div className="flex space-x-4">
          <Button
            onClick={() => handleRespond}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600"
            disabled={isUpdating}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Accept Contract</span>
          </Button>
          <Button
            // onClick={() => )}
            variant="destructive"
            className="flex items-center space-x-2"
            disabled={isUpdating}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Reject Contract</span>
          </Button>
        </div>
      );
    }

    if (role === 'Client' && contract?.status.toUpperCase() === 'ACCEPTED') {
      return (
        <Button
          onClick={() => setIsCompleteDialogOpen(true)}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600"
          disabled={isUpdating}
        >
          <CheckCircle className="h-4 w-4" />
          <span>Complete Contract</span>
        </Button>
      );
    }

    return null;
  };
  const getStatusBadge = () => {
    const color = getStatusColor(contract?.status || '');
    return (
      <div className="flex items-center space-x-2">
        <Badge className={`${color} text-white`}>
          {contract?.status}
        </Badge>
        {contract?.status.toUpperCase() === 'ACCEPTED' && role === 'client' && (
          <span className="text-sm text-gray-500">
            (You can mark this contract as complete)
          </span>
        )}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'COMPLETED':
        return 'bg-green-500';
      case 'ACCEPTED':
        return 'bg-blue-500';
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
      <Loading/>
    );
  }

  if (error) {
    return (
      <Loading/>
    );
  }

  if (!contract) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">Contract not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
        <NavBar />  
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/contracts')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Contracts</span>
        </Button>
        
        {renderActionButtons()}
      </div>

      

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {contract.job_title}
            </CardTitle>
            {getStatusBadge()}
          </div>
          <div className="text-sm text-gray-500">
            {role === 'Client' ? 'You are the client' : 'You are the freelancer'}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contract Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clipboard className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Client:</span>
                  <span>{contract.client_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clipboard className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Freelancer:</span>
                  <span>{contract.freelancer_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Start Date:</span>
                  <span>{formatDate(contract.start_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">End Date:</span>
                  <span>{formatDate(contract.end_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-semibold text-orange-500">Nu. {contract.total_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-3">
                {contract.milestones.map((milestone) => (
                  <div 
                    key={milestone.milestone_id}
                    className="bg-blue-50 p-4 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{milestone.title}</span>
                      <span className="font-medium">${milestone.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                    <div className="text-sm text-gray-500">
                      Due: {formatDate(milestone.deadline)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Complete Contract Dialog - Only shown for clients */}
      <AlertDialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Contract</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this contract as complete? 
              This action indicates that all deliverables have been received and approved.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleComplete}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600"
            >
              {isUpdating ? 'Completing...' : 'Complete Contract'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Contract</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this contract as complete? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleComplete}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600"
            >
              {isUpdating ? 'Completing...' : 'Complete Contract'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContractDetail;