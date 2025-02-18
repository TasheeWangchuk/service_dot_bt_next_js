"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader, 
  XCircle, 
  CheckCircle, 
  FileText, 
  DollarSign,
  Calendar,
  Briefcase,
  Tag,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import apiClient from "@/app/lib/apiClient";
import Navbar from "@/components/NavBar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "@/components/Shared/Loading";

interface Proposal {
  proposal_id: string;
  bid_amount: number;
  created_at: string;
  user: {
    username: string;
  };
  skills: {
    name: string;
  }[];
  status: string;
}

const MyProposals = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await apiClient.get("/api/v1/proposals/my-proposals/");
      setProposals(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setError("Failed to load proposals");
      toast.error("Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "APPROVED":
        return "bg-green-50 border-green-200 text-green-700";
      case "REJECTED":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Loader className="h-5 w-5 text-yellow-500 animate-spin" />;
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredProposals = filterStatus === "ALL" 
    ? proposals 
    : proposals.filter(p => p.status === filterStatus);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-gray-600 mt-1">Track and manage your submitted proposals</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">{proposals.length} Total Proposals</span>
          </div>
        </div>

        {error ? (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="mb-6 flex flex-wrap gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={`${filterStatus === status ? 'bg-blue-600' : 'bg-white'}`}
            >
              {status === "ALL" ? "All Proposals" : status}
            </Button>
          ))}
        </div>

        {filteredProposals.length === 0 ? (
          <Card className="text-center p-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Proposals Found</h3>
            <p className="text-gray-500 mb-4">You haven't submitted any proposals yet.</p>
            <Button 
              onClick={() => router.push('/jobs')}
              className="inline-flex items-center"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Browse Available Jobs
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProposals.map((proposal) => (
              <Card
                key={proposal.proposal_id}
                className="transition-all duration-200 hover:shadow-lg border-2 hover:border-blue-200"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                        {getStatusIcon(proposal.status)}
                        <span className="ml-1">{proposal.status}</span>
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">#{proposal.proposal_id}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-xl font-semibold text-gray-900">
                        Nu. {Number(proposal.bid_amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Tag className="h-4 w-4 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Required Skills</div>
                          <div className="flex flex-wrap gap-2">
                            {proposal.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 hover:bg-gray-50"
                      onClick={() => router.push(`/view-myproposal-detail/${proposal.proposal_id}`)}
                    >
                      <FileText className="h-4 w-4 mr-2" /> 
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MyProposals;