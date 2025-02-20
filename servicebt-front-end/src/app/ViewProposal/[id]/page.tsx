"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, DollarSign, Calendar, User, Clock, Tag } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/NavBar/NavBar";
import apiClient from "@/app/api/apiClient";
import Loading from "@/components/Shared/Loading";


interface Proposal {
    proposal_id: number;
    bid_amount: number;
    status: string;
    created_at: string;
    skills_details: { skill_id: number; name: string }[];
    user: {
        user_id: number;
        username: string;
        profile_picture: string;
        headline: string | null;
        address: string | null;
    };
    cover_letter: string | null;
}

const JobProposals = () => {
    const { id } = useParams();
    const router = useRouter();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await apiClient.get(`/api/v1/jobs/${id}/proposals/`);
                setProposals(response.data);
                // console.log("response",response.data);
            } catch (err) {
                setError("Failed to fetch proposals");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProposals();
    }, [id]);

    const handleAccept = async (proposal_id: number) => {
        if (!selectedProposal) {
            setError("No proposal selected.");
            return;
        }

        const proposalId = selectedProposal.proposal_id; // Ensure correct ID is used
        console.log("Accepting proposal with ID:", proposalId); // Debugging log

        setProcessing(true);
        try {
            const response = await apiClient.put(
                `/api/v1/proposals/${proposalId}/accept/`,
                { status: "ACCEPTED" } // Send correct payload
            );
            console.log("Response:", response.data);
            router.push(`/Contract/${proposalId}`);

            // // Remove the accepted proposal from the list
            // setProposals((prev) => prev.filter((p) => p.proposal_id !== proposalId));
            // setSelectedProposal(null);
        } catch (error) {
            // console.error("Error:", error.response?.data || error.message);
            setError("Failed to accept proposal.");
        } finally {
            setProcessing(false);
        }
    };


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'ACCEPTED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Navbar />
            {error && (
                <Alert className="mb-4 bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600">{error}</AlertDescription>
                </Alert>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-orange-500">Proposals for Job #{id}</h1>
                <span className="text-gray-900 text-sm">{proposals.length} Proposals</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {proposals.map((proposal) => (
                    <Card
                        key={proposal.proposal_id}
                        className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md h-full"
                        onClick={() => {
                            // console.log("Selected Proposal:", proposal); 
                            setSelectedProposal(proposal);
                        }}
                    >
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={proposal.user.profile_picture || ''} />
                                        <AvatarFallback>{proposal.user.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{proposal.user.username}</CardTitle>
                                        {proposal.user.headline && (
                                            <p className="text-sm text-gray-500">{proposal.user.headline}</p>
                                        )}
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(proposal.status)}`}>
                                    {proposal.status}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <span className="text-xl font-semibold text-gray-900">
                                        Nu. {proposal.bid_amount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDate(proposal.created_at)}</span>
                                </div>
                                {proposal.user.address && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <User className="h-4 w-4" />
                                        <span>{proposal.user.address}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
                <DialogContent className="sm:max-w-lg">
                    {selectedProposal && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Proposal Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={selectedProposal.user.profile_picture || ''} />
                                        <AvatarFallback>{selectedProposal.user.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-semibold">{selectedProposal.user.username}</h3>
                                        {selectedProposal.user.headline && (
                                            <p className="text-gray-500">{selectedProposal.user.headline}</p>
                                        )}
                                        {selectedProposal.user.address && (
                                            <p className="text-sm text-gray-500">{selectedProposal.user.address}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <DollarSign className="h-5 w-5" />
                                            <span className="text-sm">Bid Amount</span>
                                        </div>
                                        <p className="text-xl font-semibold text-gray-900">
                                            Nu. {selectedProposal.bid_amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Calendar className="h-5 w-5" />
                                            <span className="text-sm">Submitted On</span>
                                        </div>
                                        <p className="text-gray-900">{formatDate(selectedProposal.created_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>{selectedProposal.cover_letter}</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                                        <Tag className="h-5 w-5" />
                                        <span>Skills</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProposal.skills_details.map((skill) => (
                                            <span
                                                key={skill.skill_id}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => handleAccept(selectedProposal.proposal_id)}
                                    disabled={processing}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {processing ? "Processing..." : "Accept Proposal"}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default JobProposals;