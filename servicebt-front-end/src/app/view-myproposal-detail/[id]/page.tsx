"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/app/api/apiClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import {
    DollarSign,
    Calendar,
    MapPin,
    Edit2,
    Trash2,
    AlertCircle,
    CheckCircle,
    XCircle,
    ArrowLeft,
    CheckIcon,
    ChevronDownIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Shared/Loading";
import Navbar from "@/components/NavBar/NavBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface Proposal {
    id: number;
    bid_amount: number;
    status: string;
    created_at: string;
    cover_letter: string;
    skills_details: { skill_id: number; name: string }[];
    user: {
        user_id: number;
        username: string;
        profile_picture: string;
        headline: string | null;
        address: string | null;
    };
}

const ViewProposalDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editedProposal, setEditedProposal] = useState({
        bid_amount: 0,
        cover_letter: "",
        skills: [] as number[],
    });
    const [skills, setSkills] = useState<{ skill_id: number; name: string }[]>([]);


    const fetchSkills = async () => {
        try {
            const response = await apiClient.get("/api/v1/skills/"); 
            setSkills(response.data);
        } catch (err) {
            console.error("API Fetch Error for Skills:", err);
            setError("Failed to load skills.");
        }
    };
    useEffect(() => {
        if (id) fetchProposal();
        fetchSkills();
    }, [id]);

    const fetchProposal = async () => {
        try {
            const response = await apiClient.get(`/api/v1/proposals/${id}/`);
            setProposal(response.data);
            setEditedProposal({
                bid_amount: parseFloat(response.data.bid_amount),
                cover_letter: response.data.cover_letter,
                skills: response.data.skills_details.map((skill: { skill_id: number }) => skill.skill_id)
            });
        } catch (err) {
            console.error("API Fetch Error:", err);
            setError("Failed to load proposal details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProposal();
    }, [id]);

    //   const handleEdit = async () => {
    //     try {
    //       await apiClient.put(`/api/v1/proposals/${id}/`, editedProposal);
    //       toast.success("Proposal updated successfully");
    //       setIsEditing(false);
    //       fetchProposal();
    //     } catch (err) {
    //       toast.error("Failed to update proposal");
    //     }
    //   };
    const handleEdit = async () => {
        try {
            const updatedProposalData = {
                ...editedProposal,
                skills: proposal?.skills_details.map((skill) => skill.skill_id) || []
            };

            await apiClient.put(`/api/v1/proposals/${id}/`, updatedProposalData);
            toast.success("Proposal updated successfully");
            setIsEditing(false);
            fetchProposal();
        } catch (err) {
            toast.error("Failed to update proposal");
        }
    };


    const handleDelete = async () => {
        try {
            await apiClient.delete(`/api/v1/proposals/${id}/`);
            toast.success("Proposal deleted successfully");
            router.push("MyProposals");
        } catch (err) {
            toast.error("Failed to delete proposal");
        }
    };

    const getStatusBadge = (status: "PENDING" | "APPROVED" | "REJECTED") => {
        const styles = {
            PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
            APPROVED: "bg-green-50 text-green-700 border-green-200",
            REJECTED: "bg-red-50 text-red-700 border-red-200"
        };

        const icons = {
            PENDING: <AlertCircle className="h-4 w-4" />,
            APPROVED: <CheckCircle className="h-4 w-4" />,
            REJECTED: <XCircle className="h-4 w-4" />
        };

        return (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${styles[status]}`}>
                {icons[status]}
                {status}
            </div>
        );
    };

    if (loading) return <Loading />;
    if (error) return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <Alert className="mb-4 bg-red-50 border-red-200">
                    <AlertDescription className="text-red-600">{error}</AlertDescription>
                </Alert>
            </div>
        </div>
    );

    function handleSkillsChange(value: string): void {
        const skillId = Number(value);
        setEditedProposal((prev) => ({
            ...prev,
            skills: prev.skills.includes(skillId)
                ? prev.skills.filter((id) => id !== skillId)
                : [...prev.skills, skillId]
        }));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("MyProposals")}
                            className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Proposals
                        </Button>
                    </div>
                    {proposal?.status && getStatusBadge(proposal.status as "PENDING" | "APPROVED" | "REJECTED")}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Top Section */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Bid Amount Card */}
                            <div className="bg-orange-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <DollarSign className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-700">Bid Amount</h3>
                                </div>
                                {isEditing ? (
                                    <Input
                                        type="number"
                                        value={editedProposal.bid_amount}
                                        onChange={(e) => setEditedProposal({
                                            ...editedProposal,
                                            bid_amount: Number(e.target.value)
                                        })}
                                        className="mt-2"
                                    />
                                ) : (
                                    <p className="text-3xl font-bold text-orange-600">
                                        Nu. {proposal?.bid_amount.toLocaleString()}
                                    </p>
                                )}
                            </div>

                            {/* Submission Date Card */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Calendar className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-700">Submitted On</h3>
                                </div>
                                <p className="text-xl font-semibold text-gray-800">
                                    {new Date(proposal?.created_at || "").toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cover Letter Section */}
                    <div className="p-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cover Letter</h3>
                        {isEditing ? (
                            <Textarea
                                value={editedProposal.cover_letter}
                                onChange={(e) => setEditedProposal({
                                    ...editedProposal,
                                    cover_letter: e.target.value
                                })}
                                className="min-h-[200px]"
                            />
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {proposal?.cover_letter}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Skills Section */}
                    <div className="p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {proposal?.skills_details.map((skill) => (
                                <span
                                    key={skill.skill_id}
                                    className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {proposal?.status === "PENDING" && (
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteDialog(true)}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Proposal
                                </Button>
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit Proposal
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dialogs */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">Delete Proposal</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-gray-600">
                                Are you sure you want to delete this proposal? This action cannot be undone.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteDialog(false)}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                className="w-full sm:w-auto"
                            >
                                Delete Proposal
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">Edit Proposal</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bid Amount</label>
                                <Input
                                    type="number"
                                    value={editedProposal.bid_amount}
                                    onChange={(e) => setEditedProposal({
                                        ...editedProposal,
                                        bid_amount: Number(e.target.value)
                                    })}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                                <Textarea
                                    value={editedProposal.cover_letter}
                                    onChange={(e) => setEditedProposal({
                                        ...editedProposal,
                                        cover_letter: e.target.value
                                    })}
                                    className="min-h-[200px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Skills</label>
                                <Select
                                    value={editedProposal.skills.map(String).join(",")}
                                    onValueChange={handleSkillsChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select skills" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {skills.map((skill) => (
                                            <SelectItem key={skill.skill_id} value={String(skill.skill_id)}>
                                                {skill.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleEdit}
                                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ViewProposalDetail;
