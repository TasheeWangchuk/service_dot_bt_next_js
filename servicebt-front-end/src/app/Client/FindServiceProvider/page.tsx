
"use client";
import React from 'react';
import { useFreelancers } from '@/hooks/useFreelancers';
import FreelancerCard from '@/components/Find-Freelancer/FreelancerCard'; // Assuming this path
import Loading from '@/components/Shared/Loading';
import Navbar from '@/components/NavBar/NavBar';


const FreelancerListPage: React.FC = () => {
  const { freelancers, loading, error } = useFreelancers();

  if (loading) {
    return < Loading/>; 
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Navbar/>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-7xl mx-auto min-h-screen'>
      <Navbar/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer.profile_id} freelancer={freelancer} />
      ))}
    </div>
    </div>
  );
};

export default FreelancerListPage;
