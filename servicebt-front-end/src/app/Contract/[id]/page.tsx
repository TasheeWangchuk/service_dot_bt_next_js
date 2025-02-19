"use client";
import { useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/app/api/apiClient';
import Loading from '@/components/Shared/Loading';
import Navbar from '@/components/NavBar/NavBar';

interface Milestone {
    title: string;
    description: string;
    amount: number;
    deadline: string;
}

interface ContractData {
    proposal_id: string;
    description: string;
    total_amount: number;
    start_date: string;
    end_date: string;
    milestones: Milestone[];
}

export default function ContractPage() {
    const params = useParams();
    const router = useRouter();
    const proposalId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [contractData, setContractData] = useState<ContractData>({
        proposal_id: proposalId,
        description: '',
        total_amount: 0,
        start_date: '',
        end_date: '',
        milestones: [],
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!proposalId) {
            setError('No proposal ID provided');
            return;
        }

        setLoading(true);
        try {
            await apiClient.post(`/api/v1/proposals/${proposalId}/contract/`, contractData);
            setSuccessMessage('Contract created successfully!');
            setTimeout(() => {
                router.push('/Contract-list');
            }, 2000);
        } catch (err: any) {
            console.error('Contract creation error:', err);
            setError(err.response?.data?.message || 'Failed to create contract. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addMilestone = () => {
        setContractData(prev => ({
            ...prev,
            milestones: [
                ...prev.milestones,
                {
                    title: '',
                    description: '',
                    amount: 0,
                    deadline: prev.start_date
                }
            ]
        }));
    };

    const removeMilestone = (index: number) => {
        setContractData(prev => ({
            ...prev,
            milestones: prev.milestones.filter((_, idx) => idx !== index)
        }));
    };

    const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
        setContractData(prev => ({
            ...prev,
            milestones: prev.milestones.map((m, idx) =>
                idx === index ? { ...m, [field]: value } : m
            )
        }));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Navbar/>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Contract</h1>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
            
            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <p className="text-green-700">{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contract Description</label>
                        <textarea
                            value={contractData.description}
                            onChange={(e) => setContractData(prev => ({ ...prev, description: e.target.value }))}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                            <input
                                type="number"
                                value={contractData.total_amount}
                                onChange={(e) => setContractData(prev => ({ ...prev, total_amount: parseFloat(e.target.value) }))}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={contractData.start_date}
                                onChange={(e) => setContractData(prev => ({ ...prev, start_date: e.target.value }))}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                value={contractData.end_date}
                                onChange={(e) => setContractData(prev => ({ ...prev, end_date: e.target.value }))}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                min={contractData.start_date}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Milestones Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Milestones</h2>
                        <button
                            type="button"
                            onClick={addMilestone}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                        >
                            Add Milestone
                        </button>
                    </div>

                    {contractData.milestones.map((milestone, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Milestone {index + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeMilestone(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={milestone.title}
                                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                                    <input
                                        type="number"
                                        value={milestone.amount}
                                        onChange={(e) => updateMilestone(index, 'amount', parseFloat(e.target.value))}
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={milestone.description}
                                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        rows={2}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                    <input
                                        type="date"
                                        value={milestone.deadline}
                                        onChange={(e) => updateMilestone(index, 'deadline', e.target.value)}
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        min={contractData.start_date}
                                        max={contractData.end_date}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Creating Contract...' : 'Create Contract'}
                </button>
            </form>
        </div>
    );
}