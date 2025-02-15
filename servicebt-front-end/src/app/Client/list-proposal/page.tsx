"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import apiClient from "@/app/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, CheckCircle, XCircle, Calendar, Clock, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/NavBar/NavBar";

interface Skill {
  name: string;
}

interface Freelancer {
  id: number;
  username: string;
  full_name: string;
  avatar_url: string;
  rating: number;
  completed_jobs: number;
}

interface Proposal {
  proposal_id: number;
  bid_amount: number;
  status: string;
  cover_letter: string;
  skills: Skill[];
  freelancer: Freelancer;
  created_at: string;
  estimated_duration: string;
}

const ClientProposals = ({ jobId }: { jobId: number }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
       
        const dummyData: Proposal[] = [
          {
            proposal_id: 1,
            bid_amount: 500,
            status: "PENDING",
            cover_letter: "I am an experienced developer with expertise in React and Node.js. I have completed similar projects in the past and can deliver high-quality results within the specified timeframe. I would love to discuss this project in detail and understand your specific requirements better.",
            skills: [
              { name: "React" },
              { name: "Node.js" },
              { name: "TypeScript" },
              { name: "MongoDB" }
            ],
            freelancer: {
              id: 1,
              username: "johndev",
              full_name: "Sonam Dorji",
              avatar_url: "/Profile_placeholder.png",
              rating: 4.8,
              completed_jobs: 25
            },
            created_at: "2024-02-06T10:30:00Z",
            estimated_duration: "2 weeks"
          }
        ];
        setProposals(dummyData);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, [jobId]);

  const handleStatusChange = async (proposalId: number, status: string) => {
    try {
      await apiClient.put(`/api/v1/proposals/${proposalId}/`, { status });
      setProposals((prev) =>
        prev.map((p) => (p.proposal_id === proposalId ? { ...p, status } : p))
      );
      setSelectedProposal(null);
    } catch (error) {
      console.error("Error updating proposal:", error);
    }
  };

  const filteredProposals = filter === "ALL" ? proposals : proposals.filter((p) => p.status === filter);

  const renderStarRating = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Proposals for Job #{jobId}</h1>

        <div className="flex items-center justify-between mb-6">
          <select
            className="p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Proposals</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <span className="text-sm text-gray-500">
            {filteredProposals.length} proposal(s) found
          </span>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-lg font-medium text-gray-900">No proposals available</p>
            <p className="mt-1 text-gray-500">Check back later for new proposals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <Card 
                key={proposal.proposal_id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProposal(proposal)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={proposal.freelancer.avatar_url}
                          alt={proposal.freelancer.username}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{proposal.freelancer.full_name}</h3>
                        <div className="text-sm text-yellow-500">
                          {renderStarRating(proposal.freelancer.rating)}
                          <span className="text-gray-500 ml-1">({proposal.freelancer.rating})</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={`
                        ${proposal.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                          proposal.status === "ACCEPTED" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"}
                      `}
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Nu. {proposal.bid_amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{proposal.estimated_duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{proposal.freelancer.completed_jobs} jobs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(proposal.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{proposal.cover_letter}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {proposal.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedProposal && (
        <Dialog open={true} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Proposal Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={selectedProposal.freelancer.avatar_url}
                    alt={selectedProposal.freelancer.username}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedProposal.freelancer.full_name}</h3>
                  <p className="text-gray-500">@{selectedProposal.freelancer.username}</p>
                  <div className="text-yellow-500">
                    {renderStarRating(selectedProposal.freelancer.rating)}
                    <span className="text-gray-500 ml-1">
                      ({selectedProposal.freelancer.rating})
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Bid Amount</p>
                  <p className="font-semibold">Nu. {selectedProposal.bid_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{selectedProposal.estimated_duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Jobs</p>
                  <p className="font-semibold">{selectedProposal.freelancer.completed_jobs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-semibold">
                    {new Date(selectedProposal.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Cover Letter</h4>
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedProposal.cover_letter}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProposal.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedProposal.status === "PENDING" && (
                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    onClick={() => handleStatusChange(selectedProposal.proposal_id, "REJECTED")}
                    variant="destructive"
                    className="flex items-center"
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(selectedProposal.proposal_id, "ACCEPTED")}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Accept
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientProposals;