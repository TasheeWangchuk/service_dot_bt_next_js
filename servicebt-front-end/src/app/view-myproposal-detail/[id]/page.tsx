"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/app/lib/apiClient";
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
        <div className="min-h-screen ">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("MyProposals")}
                            className="text-gray-600"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Proposals
                        </Button>
                        {proposal?.status && getStatusBadge(proposal.status as "PENDING" | "APPROVED" | "REJECTED")}
                    </div>

                    {proposal?.status === "PENDING" && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 border-blue-200 hover:border-blue-300"
                            >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit Proposal
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteDialog(true)}
                                className="text-red-600 border-red-200 hover:border-red-300"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start gap-4 pb-6 border-b">
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <DollarSign className="h-5 w-5" />
                                    <span className="font-medium">Bid Amount</span>
                                </div>
                                {isEditing ? (
                                    <Input
                                        type="number"
                                        value={editedProposal.bid_amount}
                                        onChange={(e) => setEditedProposal({
                                            ...editedProposal,
                                            bid_amount: Number(e.target.value)
                                        })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <p className="text-2xl font-semibold text-gray-900">
                                        Nu. {proposal?.bid_amount.toLocaleString()}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <Calendar className="h-5 w-5" />
                                    <span className="font-medium">Submitted On</span>
                                </div>
                                <p className="text-gray-900">
                                    {new Date(proposal?.created_at || "").toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Cover Letter</h3>
                            {isEditing ? (
                                <Textarea
                                    value={editedProposal.cover_letter}
                                    onChange={(e) => setEditedProposal({
                                        ...editedProposal,
                                        cover_letter: e.target.value
                                    })}
                                    className="min-h-[150px]"
                                />
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 whitespace-pre-wrap">{proposal?.cover_letter}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {proposal?.skills_details.map((skill) => (
                                    <span
                                        key={skill.skill_id}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex items-center gap-3 pt-4">
                                <Button onClick={handleEdit} className="w-full">
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit and Delete Dialog */}
                <Dialog open={isEditing || showDeleteDialog} onOpenChange={(open) => {
                    if (!open) {
                        setIsEditing(false);
                        setShowDeleteDialog(false);
                    }
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Proposal" : "Delete Proposal"}</DialogTitle>
                        </DialogHeader>

                        {isEditing ? (
                            <div className="space-y-4">
                                <Input
                                    value={editedProposal.bid_amount}
                                    onChange={(e) => setEditedProposal({ ...editedProposal, bid_amount: +e.target.value })}
                                />
                                <Textarea
                                    value={editedProposal.cover_letter}
                                    onChange={(e) => setEditedProposal({ ...editedProposal, cover_letter: e.target.value })}
                                    className="min-h-[150px]"
                                />
                                <div>
                                    <label>Skills</label>
                                    <Select
                                        value={editedProposal.skills.map(String).join(",")}  // Join array of strings into a single string
                                        onValueChange={handleSkillsChange} // Handle changes to selected skills
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
                        ) : (
                            <p className="text-gray-600">
                                Are you sure you want to delete this proposal? This action cannot be undone.
                            </p>
                        )}
                        <DialogFooter>
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleEdit}>
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        Delete Proposal
                                    </Button>
                                </>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ViewProposalDetail;
