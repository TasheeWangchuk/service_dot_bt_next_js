// Freelancer Profile Component
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft,Star, MapPin, Mail, Phone, Badge, } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import type { FreelancerProfile } from '@/types/FindFreelancer';
interface ProfileProps {
    profileId: string | number;
  }
  
  const FreelancerProfile: React.FC<ProfileProps> = ({ profileId }) => {
    const [profile, setProfile] = useState<FreelancerProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    React.useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/v1/users/${profileId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: FreelancerProfile = await response.json();
          setProfile(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      if (profileId) {
        fetchProfile();
      }
    }, [profileId]);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="text-center text-red-500">
          Error: {error}
        </div>
      );
    }
  
    if (!profile) {
      return (
        <div className="text-center">
          Profile not found
        </div>
      );
    }
  
    const initials = `${profile.user.first_name?.[0] || ''}${profile.user.last_name?.[0] || ''}`.toUpperCase();
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
          type="button"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Listings
        </button>
  
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
          <Avatar className="absolute bottom-0 left-6 transform translate-y-1/2 h-32 w-32 border-4 border-white">
            <AvatarImage 
              src={profile.profile_picture || '/api/placeholder/150/150'} 
              alt={`${profile.user.first_name} ${profile.user.last_name}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
  
        <div className="mt-20 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {profile.user.first_name} {profile.user.last_name}
              </h1>
              <p className="text-gray-600">{profile.headline || 'Freelancer'}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-semibold">
                {parseFloat(profile.average_rating).toFixed(1)}
              </span>
            </div>
          </div>
  
          <div className="mt-6 space-y-4">
            {profile.user.email && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{profile.user.email}</span>
              </div>
            )}
            {profile.user.phone && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{profile.user.phone}</span>
              </div>
            )}
            {profile.address && (
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{profile.address}</span>
              </div>
            )}
          </div>
  
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-700">{profile.bio || 'No bio available'}</p>
          </div>
  
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <Badge key={index} >
                {skill}
              </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };