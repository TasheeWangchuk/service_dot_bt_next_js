"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Award, BookOpen } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import Loading from '@/components/Shared/Loading';
import ProfileHeader from './ProfileHeader';
import ProfileSection from '@/components/Profile-View/ProfileSection';
import useProfileData from '@/hooks/useProfileData';
import {ProfileData, Experience, Education} from '@/types/profile';

interface ProfileViewProps {
  userId: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ userId }) => {
  const { userData, loading } = useProfileData(userId);

  if (loading) {
    return <Loading />;
  }

  const renderExperience = (experience: any, index: number) => (
    <Card key={index}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="font-medium">{experience.job_title}</h3>
            <p className="text-sm text-gray-600">{experience.company_name}</p>
            <p className="text-sm text-gray-500">
              {experience.start_date} - {experience.end_date}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEducation = (education: any, index: number) => (
    <Card key={index}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <BookOpen className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="font-medium">{education.institution}</h3>
            <p className="text-sm text-gray-600">{education.degree}</p>
            <p className="text-sm text-gray-500">
              {education.start_date} - {education.end_date}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCertificate = (certificate: any, index: number) => (
    <Card key={index}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Award className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="font-medium">{certificate.name}</h3>
            <p className="text-sm text-gray-600">{certificate.issuer}</p>
            <p className="text-sm text-gray-500">{certificate.issue_date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-96">
        <img
          src={userData?.profile?.banner || "/banner.jpg"}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <ProfileHeader userData={userData} />

      {/* Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <ProfileSection
          title="Experience"
          items={userData?.experiences || []}
          renderItem={renderExperience}
        />
        <ProfileSection
          title="Education"
          items={userData?.education || []}
          renderItem={renderEducation}
        />
        <ProfileSection
          title="Certificates"
          items={userData?.certificates || []}
          renderItem={renderCertificate}
        />
      </main>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ProfileView;