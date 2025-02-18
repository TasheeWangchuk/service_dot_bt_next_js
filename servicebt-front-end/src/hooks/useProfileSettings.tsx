// // hooks/useProfileSettings.ts
// "use client";
// import { useState, useEffect } from 'react';
// import apiClient from '@/app/lib/apiClient'; // Axios client
// import { toast } from 'react-toastify';

// export const useProfileSettings = () => {
//   const [profileData, setProfileData] = useState<{
//     bio: string | null;
//     headline: string | null;
//     address: string | null;
//     profilePicture: string | null;
//     banner: string | null;
//   }>({
//     bio: null,
//     headline: null,
//     address: null,
//     profilePicture: null,
//     banner: null,
//   });

//   const [newProfileData, setNewProfileData] = useState({
//     bio: '',
//     headline: '',
//     address: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
//   const [uploadingBannerPic, setUploadingBannerPic] = useState(false);

//   // Fetch the profile data from the API
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await apiClient.get('/api/v1/users/profile/');
//         setProfileData({
//           bio: response.data.bio || '',
//           headline: response.data.headline || '',
//           address: response.data.address || '',
//           profilePicture: response.data.profile_picture || '/default-profile.jpg',
//           banner: response.data.banner || '/default-banner.jpg',
//         });

//         // Populate new profile data with current data
//         setNewProfileData({
//           bio: response.data.bio || '',
//           headline: response.data.headline || '',
//           address: response.data.address || '',
//         });
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle input changes for profile data
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewProfileData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Update profile data
//   const handleProfileUpdate = async () => {
//     setLoading(true);
//     try {
//        await apiClient.put('/api/v1/users/upload_profile_picture/', newProfileData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       toast.success('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Error updating profile!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle profile picture upload
//   const handleProfilePictureUpload = async (file: File) => {
//     if (file) {
//       setUploadingProfilePic(true);
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         const response = await apiClient.put('/api/v1/users/upload_profile_picture/', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setProfileData((prev) => ({
//           ...prev,
//           profilePicture: response.data.profile_picture,
//         }));
//         toast.success('Profile picture uploaded successfully!');
//       } catch (error) {
//         console.error('Error uploading profile picture:', error);
//         toast.error('Error uploading profile picture!');
//       } finally {
//         setUploadingProfilePic(false);
//       }
//     }
//   };

//   // Handle banner picture upload
//   const handleBannerPictureUpload = async (file: File) => {
//     if (file) {
//       setUploadingBannerPic(true);
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         const response = await apiClient.put('/api/v1/users/upload_banner/', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setProfileData((prev) => ({
//           ...prev,
//           banner: response.data.banner_picture,
//         }));
//         alert('Banner picture uploaded successfully!');
//       } catch (error) {
//         console.error('Error uploading banner picture:', error);
//         alert('Error uploading banner picture!');
//       } finally {
//         setUploadingBannerPic(false);
//       }
//     }
//   };

//   return {
//     profileData,
//     newProfileData,
//     loading,
//     uploadingProfilePic,
//     uploadingBannerPic,
//     handleInputChange,
//     handleProfileUpdate,
//     handleProfilePictureUpload,
//     handleBannerPictureUpload,
//   };
// };
"use client";
import { useState, useEffect } from 'react';
import apiClient from '@/app/lib/apiClient';
import { toast } from 'react-toastify';

interface ProfileData {
  bio: string;
  headline: string;
  address: string;
  profilePicture: string;
  banner: string;
}

const DEFAULT_PROFILE_PICTURE = '/default-profile.jpg';
const DEFAULT_BANNER = '/default-banner.jpg';

export const useProfileSettings = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: '',
    headline: '',
    address: '',
    profilePicture: DEFAULT_PROFILE_PICTURE,
    banner: DEFAULT_BANNER,
  });

  const [newProfileData, setNewProfileData] = useState<Omit<ProfileData, 'profilePicture' | 'banner'>>({
    bio: '',
    headline: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingProfilePic, setIsUploadingProfilePic] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get<ProfileData>('/api/v1/users/profile/');
        const profile = {
          bio: data.bio || '',
          headline: data.headline || '',
          address: data.address || '',
          profilePicture: data.profilePicture || DEFAULT_PROFILE_PICTURE,
          banner: data.banner || DEFAULT_BANNER,
        };
        
        setProfileData(profile);
        setNewProfileData({
          bio: profile.bio,
          headline: profile.headline,
          address: profile.address,
        });
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      await apiClient.put('/api/v1/users/profile/', newProfileData);
      setProfileData(prev => ({
        ...prev,
        ...newProfileData,
      }));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (
    file: File,
    endpoint: string,
    setIsUploading: (value: boolean) => void,
    updateKey: keyof ProfileData,
    successMessage: string
  ) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await apiClient.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setProfileData(prev => ({
        ...prev,
        [updateKey]: data[updateKey],
      }));
      toast.success(successMessage);
    } catch (error) {
      toast.error(`Failed to upload ${updateKey}`);
      console.error(`Error uploading ${updateKey}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfilePictureUpload = (file: File) => 
    uploadFile(
      file,
      '/api/v1/users/upload_profile_picture/',
      setIsUploadingProfilePic,
      'profilePicture',
      'Profile picture uploaded successfully'
    );

  const handleBannerUpload = (file: File) =>
    uploadFile(
      file,
      '/api/v1/users/upload_banner/',
      setIsUploadingBanner,
      'banner',
      'Banner uploaded successfully'
    );

  return {
    profileData,
    newProfileData,
    isLoading,
    isUploadingProfilePic,
    isUploadingBanner,
    handleInputChange,
    handleProfileUpdate,
    handleProfilePictureUpload,
    handleBannerUpload,
  };
};