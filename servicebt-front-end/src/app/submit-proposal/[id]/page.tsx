"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Send } from "lucide-react";
import apiClient from "@/app/api/apiClient";
import Select from "react-select";
import Navbar from "@/components/NavBar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "@/components/Shared/Loading";

const JobProposal = () => {
  const router = useRouter();
  const { id: jobId } = useParams(); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]); 
  const [selectedSkills, setSelectedSkills] = useState<{ value: number; label: string }[]>([]); // Store skill IDs

  const [formData, setFormData] = useState({
    cover_letter: "",
    bid_amount: "",
  });

  useEffect(() => {
    const fetchSkills = async () => {
        try {
          const response = await apiClient.get("/api/v1/skills/");
          console.log("Fetched Skills from API:", response.data); // Debug log
      
          const formattedSkills = response.data.map((skill: { skill_id: number; name: string }) => ({
            value: skill.skill_id,  
            label: skill.name
          }));
      
          setSkills(formattedSkills);
        } catch (error) {
        //   console.error("Error fetching skills:", error);
          toast.error("Failed to load skills");
        }
      };      

    fetchSkills();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    console.log("Selected Skills before submission:", selectedSkills);
  
    try {
      const skillsToSend = selectedSkills.map(skill => skill.value);
    //   console.log("Skills being sent:", skillsToSend); 
  
      const response = await apiClient.post(`/api/v1/jobs/${jobId}/proposals/`, {
        ...formData,
        skills: skillsToSend, 
        bid_amount: parseFloat(formData.bid_amount)
      });
  
      if (response.status === 201) {
        toast.success("Proposal submitted successfully!");
        router.push("/ServiceProvider/MyProposals");
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      setError("Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Submit Your Proposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                  rows={6}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Write your cover letter here..."
                  required
                />
              </div>

              {/* Bid Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bid Amount (BTN)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    Nu.
                  </div>
                  <input
                    type="number"
                    value={formData.bid_amount}
                    onChange={(e) => setFormData({ ...formData, bid_amount: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your bid amount"
                    required
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Relevant Skills
                </label>
                <Select
                  isMulti
                  options={skills} 
                  value={selectedSkills}
                  onChange={(newValue) => setSelectedSkills(newValue as { value: number; label: string }[])}
                  placeholder="Select or type new skills..."
                  className="w-full"
                  isClearable
                  isSearchable
                  noOptionsMessage={() => "Type to add a new skill"}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full/4 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobProposal;
