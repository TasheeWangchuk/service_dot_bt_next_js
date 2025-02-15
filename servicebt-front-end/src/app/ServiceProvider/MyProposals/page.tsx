"use client";

import { useState, useEffect } from "react";
import apiClient from "@/app/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Edit } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/NavBar/NavBar";
import Loading from "@/components/Shared/Loading"
const ProposalsList = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      job_id: 11,
      job_title: "Frontend Developer Needed",
      bid_amount: 500,
      cover_letter: "I have 3 years of experience in React and Next.js. I'm confident in delivering high-quality UI/UX.",
    },
  ]); // Dummy proposal added
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ cover_letter: "", bid_amount: "" });

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await apiClient.get("/api/v1/proposals/my-proposals/");
      setProposals(response.data.length ? response.data : proposals); // Keep dummy if empty
    } catch (error) {
      setError("Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (proposal: { id: any; job_id?: number; job_title?: string; bid_amount: any; cover_letter: any; }) => {
    setEditMode(proposal.id);
    setEditData({ cover_letter: proposal.cover_letter, bid_amount: proposal.bid_amount });
  };

  const handleSave = async (id: number) => {
    try {
      await apiClient.put(`/api/v1/proposals/${id}/`, editData);
      toast.success("Proposal updated successfully");
      fetchProposals();
      setEditMode(null);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;
    try {
      await apiClient.delete(`/api/v1/proposals/${id}/`);
      toast.success("Proposal removed");
      setProposals(proposals.filter((proposal) => proposal.id !== id));
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleRetrieveProposal = async (jobId: number, proposalId: number) => {
    try {
      const response = await apiClient.get(`/api/v1/jobs/${jobId}/proposals/${proposalId}/`);
      toast.success("Proposal details retrieved");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to retrieve proposal");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">My Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <p className="text-center text-gray-500">No proposals found.</p>
            ) : (
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    {editMode === proposal.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editData.cover_letter}
                          onChange={(e) => setEditData({ ...editData, cover_letter: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                          placeholder="Edit cover letter"
                        />
                        <input
                          type="number"
                          value={editData.bid_amount}
                          onChange={(e) => setEditData({ ...editData, bid_amount: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                          placeholder="Edit bid amount"
                        />
                        <div className="flex gap-2">
                          <Button onClick={() => handleSave(proposal.id)} className="bg-green-600 hover:bg-green-700 text-white">Save</Button>
                          <Button onClick={() => setEditMode(null)} className="bg-gray-400 hover:bg-gray-500 text-white">Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-semibold">{proposal.job_title}</p>
                          <p className="text-sm text-gray-600">Bid: ${proposal.bid_amount}</p>
                          <p className="text-sm text-gray-500">{proposal.cover_letter}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleEdit(proposal)} className="bg-blue-600 hover:bg-blue-700 text-white"><Edit className="h-5 w-5" /></Button>
                          <Button onClick={() => handleDelete(proposal.id)} className="bg-red-600 hover:bg-red-700 text-white"><Trash2 className="h-5 w-5" /></Button>
                          <Button onClick={() => handleRetrieveProposal(proposal.job_id, proposal.id)} className="bg-gray-700 hover:bg-gray-800 text-white">View</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProposalsList;
