// components/ProfileView.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  MessageCircle,
  Briefcase,
  Award,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import apiClient from '@/app/lib/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Shared/Loading";

interface ProfileViewProps {
  userId: string;
}

interface UserProfile {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  profile: {
    profile_id: number;
    profile_picture: string | null;
    banner: string | null;
    bio: string | null;
    address: string | null;
    headline: string | null;
    portfolios: any[];
    certificates: any[];
    experiences: any[];
    education: any[];
  };
}

const ProfileView: React.FC<ProfileViewProps> = ({ userId }) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/api/v1/users/${userId}/`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile data.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-96 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={userData?.profile.banner || "/banner.jpg"}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-28 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 bg-white/70 backdrop-blur-md p-6 shadow-lg rounded-lg">
          <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl -mt-12 md:-mt-16">
            <AvatarImage src={userData?.profile.profile_picture || "/Profile_placeholder.png"} />
            <AvatarFallback className="text-2xl">
              {userData?.first_name?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-700">
              {userData?.first_name} {userData?.last_name} 
              <span className="text-gray-500 text-sm"> @ {userData?.username}</span>
            </h1>
            <p className="text-black text-sm font-semibold md:text-lg">
              {userData?.profile.headline || "No headline provided"}
            </p>
            <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
              <MapPin className="w-4 h-4" /> 
              <span>{userData?.profile.address || "Location not provided"}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-sm mt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> 
                <span>{userData?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> 
                <span>{userData?.phone || "Phone not available"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <MessageCircle className="w-4 h-4 mr-2" /> Hire
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
              <Heart className="w-4 h-4 mr-2" /> Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {["overview", "experience", "portfolio", "certificates", "education"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section id="overview" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
          <p className="text-gray-600 leading-relaxed mt-2">
            {userData?.profile.bio || "No bio available."}
          </p>
        </section>

        <section id="experience" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
          <div className="space-y-4">
            {userData?.profile.experiences.map((experience, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{experience.title}</h3>
                      <p className="text-sm text-gray-600">{experience.company}</p>
                      <p className="text-sm text-gray-500">{experience.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData?.profile.portfolios.map((portfolio, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-medium">{portfolio.title}</h3>
                  <p className="text-sm text-gray-600">{portfolio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificates</h2>
          <div className="space-y-4">
            {userData?.profile.certificates.map((certificate, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{certificate.title}</h3>
                      <p className="text-sm text-gray-600">{certificate.issuer}</p>
                      <p className="text-sm text-gray-500">{certificate.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
          <div className="space-y-4">
            {userData?.profile.education.map((edu, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ProfileView;