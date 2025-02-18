'use client';

import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/NavBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillsManager from "@/components/profile/SkillManager";
import ExperienceManager from "@/components/profile/ExperienceManager";
import CertificateManager from "@/components/profile/CertificateManager";
import Portfolio from "@/components/profile/portfolio";
import EducationManager from "@/components/profile/EducationManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/hooks/userStore";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { profile, fetchUserData } = useUserStore();

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "portfolio", label: "Portfolio" },
    { id: "certificates", label: "Certificates" },
    { id: "education", label: "Education" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId.toLowerCase());
    document.getElementById(sectionId.toLowerCase())?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Main Content */}
      <div className="pb-16">
        {/* Profile Header */}
        <div className="bg-white shadow-sm">
          <ProfileHeader />
        </div>

        {/* Navigation Tabs - Sticky */}
        <div className="sticky top-0 z-50 mt-32 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap transition-all
                    ${activeSection === section.id.toLowerCase()
                      ? "border-blue-500 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {profile?.bio || "No bio available."}
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
              <SkillsManager />
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <ExperienceManager />
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
              <Portfolio />
            </div>
          </section>

          {/* Certificates Section */}
          <section id="certificates" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificates</h2>
              <CertificateManager />
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <EducationManager />
            </div>
          </section>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProfilePage;