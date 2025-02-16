"use client";
import React, { useEffect, useState } from 'react';
import { Search, Briefcase, Clock, MapPin, DollarSign, Users, AlertCircle, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import apiClient from '@/app/lib/apiClient';
import Navbar from '@/components/NavBar/NavBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Skill {
  skill_id: number;
  name: string;
}

interface Job {
  job_id: number;
  title: string;
  payment_type: string;
  budget: number;
  experience_level: string;
  time_preference: string;
  description: string;
  job_category_name: string;
  location: string;
  status: string;
  created_at: string;
  skills: Skill[];
  proposals_count: number;
}

const FindJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get('/api/v1/jobs/');
        setJobs(response.data);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const contentType = response.headers.get("content-type");
        // if (!contentType || !contentType.includes("application/json")) {
        //   throw new TypeError("Received non-JSON response from server");
        // }

        // const data = await response.json();
        // setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs. Please try again later.');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? job.job_category_name === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Navbar />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find Jobs</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="IT & Networking">IT & Networking</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">
            {error}
          </AlertDescription>
        </Alert>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.job_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {job.experience_level}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {job.payment_type}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">Nu.{job.budget}</p>
                  <p className="text-sm text-gray-500">{formatDate(job.created_at)}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <span key={skill.skill_id} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.job_category_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.proposals_count} proposals</span>
                  </div>
                </div>

                <Button asChild className="w-full/4 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  <Link href={`/submit-proposal/${job.job_id}`}>
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Apply
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindJobs;