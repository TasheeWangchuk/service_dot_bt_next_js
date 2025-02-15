"use client";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Star, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import apiClient from '@/app/lib/apiClient';
import Link from 'next/link';
import Loading from "@/components/Shared/Loading";
import Navbar from '@/components/NavBar/NavBar';

interface UserProfile {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  profile: {
    rate: string;
    profile_picture: string | null;
    banner: string | null;
    bio: string | null;
    address: string | null;
    headline: string | null;
    hourly_rate?: number;
    completed_projects?: number;
    total_hours?: number;
    rating?: number;
    response_rate?: number;
    skills: string[];
  };
}

const FreelancerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [freelancers, setFreelancers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/v1/users/', {
          params: {
            role: 'Freelancer',
            search: searchTerm,
            location: selectedLocation,
            min_rate: minRate,
            max_rate: maxRate,
            skills: selectedSkills.join(','), // Pass skills as a comma-separated string
            page: currentPage
          }
        });

        const freelancerUsers = response.data.filter(
          (user: UserProfile) => user.role === 'Freelancer'
        );
        setFreelancers(freelancerUsers);

        const skillsSet = new Set<string>();
        freelancerUsers.forEach((freelancer: { profile: { skills: any[]; }; }) => {
          freelancer.profile.skills.forEach((skill: string) => skillsSet.add(skill));
        });
        setAllSkills([...skillsSet]);
      } catch (error) {
        console.error('Failed to fetch freelancers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, [searchTerm, selectedLocation, minRate, maxRate, selectedSkills, currentPage]);

  // Handle adding/removing skills from filter
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Navbar/>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Freelancers</h1>
        
        {/* Search Section */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by skill, title, or keyword"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters and Results */}
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="font-semibold mb-4">Filter by:</h2>
              
              <div className="space-y-4">
                {/* Location Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input 
                    type="text"
                    placeholder="Type location"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </div>

                {/* Service Rate Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Service Rate</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={minRate}
                      onChange={(e) => setMinRate(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={maxRate}
                      onChange={(e) => setMaxRate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Skill Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map(skill => (
                      <span 
                        key={skill} 
                        className="flex items-center px-3 py-1 bg-blue-50 text-orange-600 rounded-full text-sm font-medium"
                      >
                        {skill}
                        <X className="ml-1 cursor-pointer" size={14} onClick={() => toggleSkill(skill)} />
                      </span>
                    ))}
                  </div>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => toggleSkill(e.target.value)}
                  >
                    <option value="">Select skill</option>
                    {allSkills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
            {loading ? (
              <Loading />
            ) : freelancers.length === 0 ? (
              <div className="text-center py-8">No freelancers found</div>
            ) : (
              freelancers.map(freelancer => (
                <Link href={`/profile-view/${freelancer.user_id}`} key={freelancer.user_id}>
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-xl font-semibold">{freelancer.first_name} {freelancer.last_name}</h3>
                    <p className="text-gray-600">{freelancer.profile.headline || 'Freelancer'}</p>
                    <p className="text-orange-600 font-bold">${freelancer.profile.rate || 'N/A'} / hr</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSearch;
