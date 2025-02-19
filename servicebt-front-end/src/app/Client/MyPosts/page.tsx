"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '@/components/NavBar/NavBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '@/app/api/apiClient';
import { useRouter } from 'next/navigation';
import ReactSelect from 'react-select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CalendarIcon, Trash2Icon, PencilIcon, ClockIcon, MapPinIcon, BriefcaseIcon, CoinsIcon, UserRound, UsersRound } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
const formatEnumValue = (value: string | undefined): string => {
    if (!value) return 'Unknown';

    return value
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Post = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState<{ skill_id: number; name: string }[]>([]);
    const [categories, setCategories] = useState<{ category_id: number; category_name: string }[]>([]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [jobToDelete, setJobToDelete] = useState<any>(null);

    interface FormData {
        title: string;
        description: string;
        budget: string;
        deadline: string;
        job_category: number;
        payment_type: string;
        time_preferences_type: string;
        experience_level: string;
        location: string;
        skills: number[];
    }

    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        job_category: 1,
        payment_type: "",
        time_preferences_type: "",
        experience_level: "",
        location: "",
        skills: [],
    });

    const fetchJobs = async () => {
        try {
            const response = await apiClient.get('/api/v1/jobs/');
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            toast.error("Failed to load jobs");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, categoriesRes] = await Promise.all([
                    apiClient.get('/api/v1/skills'),
                    apiClient.get('/api/v1/job-categories'),
                ]);
                setSkills(skillsRes.data);
                setCategories(categoriesRes.data);
                fetchJobs();
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load necessary data");
            }
        };
        fetchData();
    }, []);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEdit = (job: any) => {
        setEditingJob(job);
        // Format date if it exists
        const formattedDate = job.deadline ? job.deadline.split('T')[0] : '';

        setFormData({
            ...job,
            budget: job.budget.toString(),
            deadline: formattedDate,
            skills: Array.isArray(job.skills)
                ? job.skills.map((skill: any) => skill.skill_id)
                : []
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await apiClient.put(`/api/v1/jobs/${editingJob.job_id}/`, {
                ...formData,
                budget: parseFloat(formData.budget),
            });
            toast.success("Job updated successfully!");
            fetchJobs();
            setIsEditModalOpen(false);
        } catch (error: any) {
            console.error('Error updating job:', error);
            toast.error(error.response?.data?.message || "Failed to update job");
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = (job: any) => {
        setJobToDelete(job);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!jobToDelete) return;

        setIsLoading(true);
        try {
            await apiClient.delete(`/api/v1/jobs/${jobToDelete.job_id}/`);
            toast.success("Job deleted successfully!");
            fetchJobs();
        } catch (error: any) {
            console.error('Error deleting job:', error);
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setIsLoading(false);
            setIsDeleteDialogOpen(false);
            setJobToDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'No deadline set';
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch (error) {
            return dateString;
        }
    };

    const getExperienceBadgeColor = (level: string | undefined) => {
        if (!level) return 'bg-gray-100 text-gray-800';

        switch (level) {
            case 'ENTRY': return 'bg-blue-100 text-blue-800';
            case 'INTERMEDIATE': return 'bg-purple-100 text-purple-800';
            case 'EXPERT': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getLocationBadgeColor = (location: string | undefined) => {
        if (!location) return 'bg-gray-100 text-gray-800';

        switch (location) {
            case 'REMOTE': return 'bg-green-100 text-green-800';
            case 'ONSITE': return 'bg-orange-100 text-orange-800';
            case 'HYBRID': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentTypeBadge = (type: string | undefined) => {
        if (!type) return 'bg-gray-100 text-gray-800';

        switch (type) {
            case 'FIXED': return 'bg-yellow-100 text-yellow-800';
            case 'MILESTONE': return 'bg-cyan-100 text-cyan-800';
            case 'CONTRACT': return 'bg-fuchsia-100 text-fuchsia-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ToastContainer position="top-right" theme="light" />

            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Job Listings</h1>
                    <Button onClick={() => router.push('Post')} className="bg-blue-600 hover:bg-blue-700">
                        Create New Job
                    </Button>
                </div>

                {jobs.length === 0 ? (
                    <Card className="bg-white shadow-md">
                        <CardContent className="p-8 text-center">
                            <p className="text-gray-600">No job listings found. Create your first job posting!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map(job => (
                            <Card key={job.job_id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getExperienceBadgeColor(job.experience_level)}`}>
                                                    {formatEnumValue(job.experience_level)}
                                                </span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800${getLocationBadgeColor(job.location)}`}>
                                                    {formatEnumValue(job.location)}
                                                </span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentTypeBadge(job.payment_type)}`}>
                                                    {(job.payment_type)}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>Deadline:{job.deadline}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-medium text-orange-600">Budget: Nu.{parseFloat(job.budget).toLocaleString()}</span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <UsersRound className="w-4 h-4" />
                                                    <span className="font-medium text-orange-600">Applicants: {job.proposals_count}</span>
                                                </div>
                                                <Link
                                                    href={`/ViewProposal/${job.job_id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Proposals
                                                </Link>
                                                <div className="flex items-center gap-1.5">
                                                    <BriefcaseIcon className="w-4 h-4" />
                                                    <span>{job.job_category_name || 'Unknown Category'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ClockIcon className="w-4 h-4" />
                                                <span>Posted: {(job.created_at)}</span>
                                            </div>

                                            {job.skills && job.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {job.skills.map((skill: any) => (
                                                        <span key={skill.skill_id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex md:flex-col justify-end mt-4 md:mt-0 gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                                                onClick={() => handleEdit(job)}
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                                <span>Edit</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 border-red-600 text-red-600 hover:bg-red-50"
                                                onClick={() => confirmDelete(job)}
                                            >
                                                <Trash2Icon className="w-4 h-4" />
                                                <span>Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Job Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Job Listing</DialogTitle>
                        <DialogDescription>
                            Make changes to your job posting. Click update when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto py-4">
                        <form className="space-y-5">
                            <div>
                                <Label htmlFor="title" className="text-gray-700">Job Title*</Label>
                                <Input
                                    id="title"
                                    placeholder='Job Title'
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-gray-700">Description*</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Job description"
                                    value={formData.description}
                                    rows={5}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="budget" className="text-gray-700">Budget (Nu.)*</Label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        placeholder="Budget"
                                        value={formData.budget}
                                        onChange={(e) => handleChange("budget", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="deadline" className="text-gray-700">Deadline*</Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        placeholder="Deadline"
                                        value={formData.deadline}
                                        onChange={(e) => handleChange("deadline", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="job_category" className="text-gray-700">Job Category*</Label>
                                <Select
                                    onValueChange={(value) => handleChange("job_category", Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.category_id} value={category.category_id.toString()}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="skills" className="text-gray-700">Required Skills*</Label>
                                <ReactSelect
                                    id="skills"
                                    isMulti
                                    className="mt-1"
                                    placeholder="Select required skills"
                                    options={skills.map(skill => ({
                                        label: skill.name,
                                        value: skill.skill_id
                                    }))}
                                    value={formData.skills.map(skillId => {
                                        const skill = skills.find(s => s.skill_id === skillId);
                                        return skill ? { label: skill.name, value: skill.skill_id } : null;
                                    }).filter(Boolean)}
                                    onChange={(selected) => handleChange("skills", selected.filter(s => s !== null).map(s => s.value))}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: '#e2e8f0',
                                            '&:hover': {
                                                borderColor: '#cbd5e1',
                                            },
                                        }),
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="payment_type" className="text-gray-700">Payment Type*</Label>
                                    <Select
                                        value={formData.payment_type}
                                        onValueChange={(value) => handleChange("payment_type", value)}
                                    >
                                        <SelectTrigger id="payment_type" className="mt-1">
                                            <SelectValue placeholder="Select payment type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="FIXED">Fixed</SelectItem>
                                            <SelectItem value="MILESTONE">Milestone Based</SelectItem>
                                            <SelectItem value="CONTRACT">Contract Based</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="time_preferences_type" className="text-gray-700">Time Preference*</Label>
                                    <Select
                                        value={formData.time_preferences_type}
                                        onValueChange={(value) => handleChange("time_preferences_type", value)}
                                    >
                                        <SelectTrigger id="time_preferences_type" className="mt-1">
                                            <SelectValue placeholder="Select time preference" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                            <SelectItem value="PART_TIME">Part Time</SelectItem>
                                            <SelectItem value="FLEXIBLE">Flexible Hours</SelectItem>
                                            <SelectItem value="CONTRACT">Contract Based</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="experience_level" className="text-gray-700">Experience Level*</Label>
                                    <Select
                                        value={formData.experience_level}
                                        onValueChange={(value) => handleChange("experience_level", value)}
                                    >
                                        <SelectTrigger id="experience_level" className="mt-1">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ENTRY">Entry</SelectItem>
                                            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                            <SelectItem value="EXPERT">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="location" className="text-gray-700">Location Type*</Label>
                                    <Select
                                        value={formData.location}
                                        onValueChange={(value) => handleChange("location", value)}
                                    >
                                        <SelectTrigger id="location" className="mt-1">
                                            <SelectValue placeholder="Select location type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="REMOTE">Remote</SelectItem>
                                            <SelectItem value="ONSITE">On Site</SelectItem>
                                            <SelectItem value="HYBRID">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? "Updating..." : "Update Job"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isLoading ? "Deleting..." : "Delete Job"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Post;