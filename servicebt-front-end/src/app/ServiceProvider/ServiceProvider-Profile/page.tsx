'use client';

import React, { useState, useEffect } from "react";
import {
  Mail, Phone, MapPin, Heart, MessageCircle, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ServicesManager from "@/components/profile/SeviceManager";
import SkillsManager from "@/components/profile/SkillManager";
import ExperienceManager from "@/components/profile/ExperienceManager";
import CertificateManager from "@/components/profile/CertificateManager";
import Portfolio from "@/components/profile/portfolio";
import apiClient from "@/app/api/apiClient";
import Navbar from "@/components/NavBar/NavBar";
import Link from "next/link";
import EducationManager from "@/components/profile/EducationManager";
import { useUserStore } from "@/hooks/userStore";
interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  profile: {
    banner: string;
    profile_picture: string;
    headline: string;
    address: string;
    bio: string;
  };
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const { profile, first_name, last_name, phone, username, email, fetchUserData } = useUserStore();

     useEffect(() => {
        fetchUserData().finally(() => setLoading(false));
      // }, []);

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
  }, []);

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

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm">
      <Navbar />
      <div className="relative w-full h-72 md:h-96 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={profile? profile.banner || "/banner.jpg":"/banner.jpg"}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-4 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 bg-white/70 backdrop-blur-md p-6 shadow-lg rounded-lg">
          <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl -mt-12 md:-mt-16">
            <AvatarImage src={profile ? profile.profile_picture || "/Profile_placeholder.png" : "/Profile_placeholder.png"} />
            <AvatarFallback className="text-2xl">
              {first_name?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-700">
              {first_name} {last_name} <span className="text-gray-500 text-sm">@ {username}</span>
            </h1>
            <p className="text-black text-sm font-semibold md:text-lg">{profile? profile.headline || "":""}</p>
            <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
              <MapPin className="w-4 h-4" /> 
              <span>{profile? profile.address || "Location not provided":"Location not provided"}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-sm mt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" /> 
                <span>{phone || "Phone not available"}</span>
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
            <Link href="profile-settings">
              <Button 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-100"
                title="Profile Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Sticky */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {["overview", "Services & Skills", "Experience", "portfolio", "Certificates", "Education"].map((section) => (
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
            {profile?profile.bio || "No bio available.":""}
          </p>
        </section>
        

        <section id="Skills" className="bg-white rounded-xl shadow-sm p-6">
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
          <ServicesManager /> */}
          <div className="mt-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
          <SkillsManager/></div>
        </section>

        <section id="Experience" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
          <ExperienceManager/>
        </section>
        <section id="portfolio" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio</h2>
          <Portfolio />
        </section>
        <section id="Certificates" className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificates</h2>
          <CertificateManager/>
        </section>
        <section id="Education" className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <div><EducationManager/></div>
        </section>
      </main>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProfilePage;