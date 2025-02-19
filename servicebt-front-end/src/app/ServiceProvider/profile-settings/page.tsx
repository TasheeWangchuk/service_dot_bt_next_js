"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera } from 'lucide-react';
import { AxiosError } from 'axios';
import apiClient from '@/app/api/apiClient';
import { toast } from 'react-toastify';
import Loading from '@/components/Shared/Loading';
import Navbar from '@/components/NavBar/NavBar';

// Types
interface ProfileData {
  headline: string;
  bio: string;
  address: string;
  profile_picture?: string;
  banner?: string; // Added for banner picture
  skills: string[];
}

interface FormData {
  headline: string;
  bio: string;
  address: string;
  skills: string[];
}

// const ProfileSettingsProps: React.FC<{ apiClient: AxiosInstance }> = ({ apiClient }) => {
const ProfileSettingsPage = () => {
  // State
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    headline: '',
    bio: '',
    address: '',
    skills: []
  });
  const [newSkill, setNewSkill] = useState<string>('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  // API Functions
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/v1/users/profile/');
      setProfileData(response.data);
      setFormData({
        headline: response.data.headline || '',
        bio: response.data.bio || '',
        address: response.data.address || '',
        skills: response.data.skills || []
      });
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async (data: FormData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiClient.put('/api/v1/users/profile/', data);
      setProfileData(response.data);
      setError(null);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        window.location.href = '/Auth/SignIn';
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profile_picture', file);
      
      const response = await apiClient.put(
        '/api/v1/users/upload_profile_picture/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      setProfileData(prev => prev ? {
        ...prev,
        profile_picture: response.data.profile_picture
      } : null);
      
      setError(null);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        window.location.href = '/Auth/SignIn';
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadBannerImage = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('banner', file);
      
      const response = await apiClient.put(
        '/api/v1/users/upload_banner/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      setProfileData(prev => prev ? {
        ...prev,
        banner: response.data.banner
      } : null);
      
      setError(null);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        window.location.href = '/Auth/SignIn';
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Event Handlers
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await updateProfileData(formData);
    if (success) {
      toast.success('Profile updated successfully!');
    }
  };

  const handleProfilePictureUpload = async (file: File) => {
    const success = await uploadProfilePicture(file);
    if (success) {
      toast.success('Profile picture uploaded successfully');
    }
  };

  const handleBannerImageUpload = async (file: File) => {
    const success = await uploadBannerImage(file);
    if (success) {
      toast.success('Banner image uploaded successfully');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Effects
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Loading State
  if (loading && !profileData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-8">
      <Navbar />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Banner Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              {profileData?.banner ? (
                <img
                  src={profileData.banner}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <label className="mt-2 w-32 h-10 bg-blue-500 rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBannerImageUpload(file);
                }}
                disabled={loading}
              />
            </label>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                {profileData?.profile_picture ? (
                  <img
                    src={profileData.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleProfilePictureUpload(file);
                  }}
                  disabled={loading}
                />
              </label>
            </div>
          </div>

          {/* Profile Form Section */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Headline</label>
              <Input
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Your professional headline"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows={4}
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                disabled={loading}
              />
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Skills</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  disabled={loading}
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={loading || !newSkill.trim()}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
