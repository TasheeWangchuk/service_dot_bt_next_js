"use client";
import { useProfileSettings } from '@/hooks/useProfileSettings';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Camera, ImageIcon } from 'lucide-react';

const ProfileUpdatePage = () => {
  const {
    profileData,
    newProfileData,
    isLoading,
    isUploadingProfilePic,
    isUploadingBanner,
    handleInputChange,
    handleProfileUpdate,
    handleProfilePictureUpload,
    handleBannerUpload,
  } = useProfileSettings();

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadFn: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFn(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-center mb-8">Profile Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    src={profileData.profilePicture}
                    alt="Profile"
                  />
                  <label 
                    htmlFor="profile-upload" 
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="w-5 h-5 text-gray-600" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, handleProfilePictureUpload)}
                    className="hidden"
                  />
                </div>
                {isUploadingProfilePic && (
                  <p className="text-sm text-blue-600">Uploading profile picture...</p>
                )}
              </div>

              {/* Banner Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                  <div className="aspect-[3/1] rounded-lg overflow-hidden border-4 border-white shadow-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={profileData.banner}
                      alt="Banner"
                    />
                  </div>
                  <label 
                    htmlFor="banner-upload" 
                    className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                  </label>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, handleBannerUpload)}
                    className="hidden"
                  />
                </div>
                {isUploadingBanner && (
                  <p className="text-sm text-blue-600">Uploading banner...</p>
                )}
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    name="headline"
                    value={newProfileData.headline}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Your professional headline"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={newProfileData.bio}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Location</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newProfileData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Your location"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;