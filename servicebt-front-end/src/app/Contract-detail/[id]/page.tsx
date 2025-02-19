// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { CheckCircle, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
// import { useContract } from '@/hooks/useContract';
// import { useAuth } from '@/app/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
// import StatusBadge from '@/components/Contract/statusBadge';
// import MilestoneList from '@/components/Contract/MilestoneList';
// import NavBar from '@/components/NavBar/NavBar';
// import Loading from '@/components/Shared/Loading';
// import apiClient from '@/app/lib/apiClient';

// const ContractDetail = () => {
//   const router = useRouter();
//   const { contract, isLoading, error, setContract } = useContract();
//   const { user } = useAuth();
//   const role = user?.role;

//   const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleUpdate = async (url: string, payload: any) => {
//     try {
//       setIsUpdating(true);
//       await apiClient.put(url, payload); // Send the action (ACCEPTED or REJECTED)
//       const response = await apiClient.put(`/api/v1/contracts/${contract?.contract_id}/`);
//       setContract(response.data); // Update contract data
//     } catch (err: any) {
//       console.error('Error while updating contract status:', err);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleAcceptReject = (action: 'accept' | 'reject') => {
//     const url = `/api/v1/contracts/${contract?.contract_id}/respond/`;
//     const payload = {
//       status: action === 'accept' ? 'ACCEPTED' : 'REJECTED', // Set status based on action
//     };

//     handleUpdate(url, payload); // Call the update handler with the correct payload
//   };

//   if (isLoading) return <Loading />;
//   if (error || !contract) return <div className="p-6 text-center">Contract not found</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <NavBar />  
//       <div className="mb-6 flex items-center justify-between">
//         <Button variant="outline" onClick={() => router.push('/Contract-list')} className="flex items-center space-x-2">
//           <ArrowLeft className="h-4 w-4" />
//           <span>Back to Contracts</span>
//         </Button>
//         {role === 'Freelancer' && contract.status.toUpperCase() === 'PENDING' && (
//           <div className="flex space-x-4">
//             <Button onClick={() => handleAcceptReject('accept')} className="bg-green-500">
//               <ThumbsUp className="h-4 w-4" /> Accept
//             </Button>
//             <Button variant="destructive" onClick={() => handleAcceptReject('reject')}>
//               <ThumbsDown className="h-4 w-4" /> Reject
//             </Button>
//           </div>
//         )}
//         {role === 'Client' && contract.status.toUpperCase() === 'ACCEPTED' && (
//           <Button onClick={() => setIsCompleteDialogOpen(true)} className="bg-green-500">
//             <CheckCircle className="h-4 w-4" /> Complete Contract
//           </Button>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">{contract.job_title}</CardTitle>
//           <StatusBadge status={contract.status} />
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold">Contract Details</h3>
//               <p>Client: {contract.client_name}</p>
//               <p>Freelancer: {contract.freelancer_name}</p>
//               <p>Total Amount: Nu. {contract.total_amount.toLocaleString()}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">Milestones</h3>
//               <MilestoneList milestones={contract.milestones} />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <AlertDialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Complete Contract</AlertDialogTitle>
//             <AlertDialogDescription>Are you sure?</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={() => handleUpdate(`/api/v1/contracts/${contract.contract_id}/complete/`, {})}>Complete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ContractDetail;
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import StatusBadge from '@/components/Contract/statusBadge';
import MilestoneList from '@/components/Contract/MilestoneList';
import NavBar from '@/components/NavBar/NavBar';
import Loading from '@/components/Shared/Loading';
import apiClient from '@/app/api/apiClient';
import { toast } from 'react-toastify';
import Navbar from '@/components/NavBar/NavBar';

const ContractDetail = () => {
  const router = useRouter();
  const { contract, isLoading, error, setContract } = useContract();
  const { user } = useAuth();
  const role = user?.role;

  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReviewButtonVisible, setIsReviewButtonVisible] = useState(false);

  useEffect(() => {
    if (contract?.status === 'COMPLETED') {
      setIsReviewButtonVisible(true);
    } else {
      setIsReviewButtonVisible(false);
    }
  }, [contract?.status]); 

  const handleUpdate = async (url: string, payload: any) => {
    try {
      setIsUpdating(true);
      await apiClient.put(url, payload); // Send the action (ACCEPTED or REJECTED)
      const response = await apiClient.get(`/api/v1/contracts/${contract?.contract_id}/`);
      setContract(response.data); // Update contract data
    } catch (err: any) {
      console.error('Error while updating contract status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAcceptReject = (action: 'accept' | 'reject') => {
    const url = `/api/v1/contracts/${contract?.contract_id}/respond/`;
    const payload = {
      status: action === 'accept' ? 'ACCEPTED' : 'REJECTED', // Set status based on action
    };

    handleUpdate(url, payload); // Call the update handler with the correct payload
  };

  const handleCompleteContract = async () => {
    try {
      setIsUpdating(true);
      await apiClient.put(`/api/v1/contracts/${contract?.contract_id}/complete/`);
      toast.success('Contract completed successfully!');
      
    } catch (error) {
      toast.error('Error completing contract');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReviewRedirect = () => {
    // Redirect to the review page
    router.push(`/Rating/${contract?.contract_id}`);
  };

  if (isLoading) return <Loading />;
  if (error || !contract) return <div className="p-6 text-center">Contract not found</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <NavBar />
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/Contract-list')} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Contracts</span>
        </Button>
        {role === 'Freelancer' && contract.status.toUpperCase() === 'PENDING' && (
          <div className="flex space-x-4">
            <Button onClick={() => handleAcceptReject('accept')} className="bg-green-500">
              <ThumbsUp className="h-4 w-4" /> Accept
            </Button>
            <Button variant="destructive" onClick={() => handleAcceptReject('reject')}>
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
            <AlertDialogAction onClick={handleCompleteContract}>Complete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Button */}
      {isReviewButtonVisible && role === 'Client' && contract.status === 'COMPLETED' && (
        <Button onClick={handleReviewRedirect} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
          <Star className="h-4 w-4 mr-2" />
          Leave a Review
        </Button>
      )}
    </div>
  );
};

export default ContractDetail;
