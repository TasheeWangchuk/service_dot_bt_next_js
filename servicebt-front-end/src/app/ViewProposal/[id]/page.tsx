"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircle, DollarSign, Book, Briefcase, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Loading from "@/components/Shared/Loading";
import Navbar from "@/components/NavBar/NavBar";

interface Proposal {
  id: number;
  bid_amount: number;
  cover_letter: string;
  skills: string[];
}

interface RouteParams {
  id: string;
}

const JobProposals = () => {
  const { id } = useParams();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(`/api/v1/jobs/${id}/proposals/`);
        if (!response.ok) throw new Error("Failed to fetch proposals");
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProposals();
  }, [id]);

  const handleAccept = async (proposalId: number) => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/v1/proposals/${proposalId}/accept/`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to accept proposal");

      setProposals(proposals.filter((p) => p.id !== proposalId));
      setSelectedProposal(null);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (proposalId: number) => {
    setSelectedProposal(null);
    // Add rejection API call here if needed
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Navbar />
      {showConfirmation && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Proposal accepted successfully!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Proposals for Job #{id}
        </h1>
        <span className="text-sm text-gray-500">
          {proposals.length} proposal{proposals.length !== 1 ? "s" : ""}
        </span>
      </div>

      {!proposals.length ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No proposals</h3>
          <p className="mt-2 text-gray-500">No proposals have been submitted yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-xl font-semibold text-gray-900">
                      ${proposal.bid_amount}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ID: {proposal.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProposal(proposal)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProposal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Proposal Details
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 text-gray-500 mb-2">
                          <Book className="h-5 w-5" />
                          <span className="font-medium">Cover Letter</span>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
                          {selectedProposal.cover_letter}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-gray-500 mb-2">
                          <DollarSign className="h-5 w-5" />
                          <span className="font-medium">Bid Amount</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          ${selectedProposal.bid_amount}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-gray-500 mb-2">
                          <Briefcase className="h-5 w-5" />
                          <span className="font-medium">Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProposal.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button
                  type="button"
                  onClick={() => handleAccept(selectedProposal.id)}
                  disabled={processing}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? "Processing..." : "Accept Proposal"}
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(selectedProposal.id)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobProposals;