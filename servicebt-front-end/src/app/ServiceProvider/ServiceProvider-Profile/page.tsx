"use client";
import apiClient from "@/app/lib/apiClient";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Shared/NavBar";
import ServicesManager from "@/components/profile/SeviceManager";
import SkillsManager from "@/components/profile/SkillManager";
import Portfolio from "@/components/profile/portfolio";
import Skeleton from "react-loading-skeleton";
import {
  Star,
  MapPin,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Camera,
  Settings,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null); // Store user data
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [bannerImage, setBannerImage] = useState("/banner.jpg");
  const [profileImage, setProfileImage] = useState("/Profile_placeholder.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/api/v1/users/profile/");
        setUserData(response.data);
        console.log('respones', response)

        setBannerImage(response.data.profile.banner || "/banner.jpg");
        setProfileImage(response.data.profile.profile_picture || "/Profile_placeholder.png");

        setLoading(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(true);
        setLoading(false);
        toast.error("Failed to load profile data.");
      }
    };

    fetchUserData();
  }, []);

  const uploadImage = async (file: File, type: "profile" | "banner") => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await apiClient.post(`/api/v1/users/upload_${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`${type === "profile" ? "Profile" : "Banner"} picture updated successfully!`);
    } catch (error) {
      console.error(`Failed to update ${type} picture:`, error);
      toast.error(`Failed to update ${type} picture.`);
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      uploadImage(file, "profile");
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
      uploadImage(file, "banner");
    }
  };

  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="relative h-48">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="max-w-full mx-auto px-4 mt-8">
        <div className="p-6">
          {/* Profile Skeleton */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Skeleton circle width={96} height={96} />
            <div className="flex-1">
              <Skeleton width={200} height={24} />
              <Skeleton width={150} height={20} className="mt-2" />
              <Skeleton width={250} height={20} className="mt-2" />
              <Skeleton width={100} height={20} className="mt-4" />
            </div>
          </div>

          {/* About Section Skeleton */}
          <div className="mt-8 ml-5 mr-5">
            <Skeleton width={100} height={24} />
            <Skeleton count={3} height={16} className="mt-2" />
          </div>

          {/* Location & Education Skeleton */}
          <div className="mt-8 ml-5 mr-5">
            <Skeleton width={300} height={20} />
            <Skeleton width={200} height={20} className="mt-2" />
          </div>

          {/* Services, Skills, and Portfolio Skeleton */}
          <div className="mt-6">
            <Skeleton height={200} />
          </div>
          <div className="mt-2">
            <Skeleton height={200} />
          </div>
          <div className="mt-4">
            <Skeleton height={200} />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile. Please try again later :( <br />
        Try logging out and logging in again.


      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer position="top-center" />

      {/* Banner Section */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 mt-16">
        <img
          src={bannerImage}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <label
            className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
            title="Edit Banner"
          >
            <Camera className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </label>
          <a
            href="/ServiceProvider/profile-settings"
            className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors group"
            title="Profile Settings"
          >
            <Settings className="w-5 h-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-full mx-auto px-4 mt-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <label
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                title="Edit Profile Picture"
              >
                <Camera className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileChange}
                />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-gray-600">@{userData.username}</p>
              <p className="text-gray-700 mt-2 font-semibold">{userData.profile.headline}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-orange-500"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium ml-16 ">
                  {userData.projectsCompleted} projects completed
                </span>
                <span className="font-semibold text-orange-600 ml-10">
                  Service Rate: Nu. {userData.Rate}
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8 ml-5 mr-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            {userData?.profile.bio ? (
              <p className="text-gray-700">
                {showFullAbout ? userData.profile.bio : `${userData.profile.bio.slice(0, 150)}...`}
                <button
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  {showFullAbout ? (
                    <span className="flex items-center">
                      Less <ChevronUp className="w-4 h-4 ml-1" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      More <ChevronDown className="w-4 h-4 ml-1" />
                    </span>
                  )}
                </button>
              </p>
            ) : (
              <p className="text-gray-600">No bio available.</p>
            )}
          </div>


          {/* Location & Education */}
          <div className="mt-8 ml-5 mr-5">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{userData.profile.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <GraduationCap className="w-5 h-5" />
              <span>{userData.education}</span>
            </div>
          </div>

          {/* Services, Skills, and Portfolio */}
          <div className="mt-6">
            <ServicesManager />
          </div>
          <div className="mt-2">
            <SkillsManager />
          </div>
          <div className="mt-4">
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

