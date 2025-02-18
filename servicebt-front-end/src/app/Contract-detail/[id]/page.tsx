"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import StatusBadge from '@/components/Contract/statusBadge';
import MilestoneList from '@/components/Contract/MilestoneList';
import NavBar from '@/components/NavBar/NavBar';
import Loading from '@/components/Shared/Loading';
import apiClient from '@/app/lib/apiClient';

const ContractDetail = () => {
  const router = useRouter();
  const { contract, isLoading, error, setContract } = useContract();
  const { user } = useAuth();
  const role = user?.role;

  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [responseAction, setResponseAction] = useState<'accept' | 'reject' | null>(null);

  const handleUpdate = async (url: string) => {
    try {
      setIsUpdating(true);
      await apiClient.post(url);
      const response = await apiClient.get(`/api/v1/contracts/${contract?.contract_id}/`);
      setContract(response.data);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error || !contract) return <div className="p-6 text-center">Contract not found</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <NavBar />  
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/contracts')} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Contracts</span>
        </Button>
        {role === 'Freelancer' && contract.status.toUpperCase() === 'PENDING' && (
          <div className="flex space-x-4">
            <Button onClick={() => handleUpdate(`/api/v1/contracts/${contract.contract_id}/respond/`)} className="bg-green-500">
              <ThumbsUp className="h-4 w-4" /> Accept
            </Button>
            <Button variant="destructive" onClick={() => handleUpdate(`/api/v1/contracts/${contract.contract_id}/respond/?action=reject`)}>
              <ThumbsDown className="h-4 w-4" /> Reject
            </Button>
          </div>
        )}
        {role === 'Client' && contract.status.toUpperCase() === 'ACCEPTED' && (
          <Button onClick={() => setIsCompleteDialogOpen(true)} className="bg-green-500">
            <CheckCircle className="h-4 w-4" /> Complete Contract
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{contract.job_title}</CardTitle>
          <StatusBadge status={contract.status} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold">Contract Details</h3>
              <p>Client: {contract.client_name}</p>
              <p>Freelancer: {contract.freelancer_name}</p>
              <p>Total Amount: Nu. {contract.total_amount.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Milestones</h3>
              <MilestoneList milestones={contract.milestones} />
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Contract</AlertDialogTitle>
            <AlertDialogDescription>Are you sure?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleUpdate(`/api/v1/contracts/${contract.contract_id}/complete/`)}>Complete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContractDetail;
