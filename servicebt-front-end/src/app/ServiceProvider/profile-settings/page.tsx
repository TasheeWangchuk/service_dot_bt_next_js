"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Phone,
  Save,
  X,
  Edit2,
  Squirrel,
  Camera,
  MapPin,
  AtSign,
  Shield,
  FileText,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "@/app/lib/apiClient";
import Loading from "@/components/Shared/Loading"
import Navbar from "@/components/NavBar/NavBar";

// EditableField Component
const EditableField = ({
  label,
  value,
  onChange,
  onSave,
  onCancel,
  placeholder,
  Icon,
}: {
  label: string;
  value: string;
  
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  placeholder?: string;
  Icon: React.ForwardRefExoticComponent<any>;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center space-x-4 py-3 border-b hover:bg-gray-50">
      <Navbar/>
      <Icon className="text-gray-500 w-5 h-5 mt-8" />
      {isEditing ? (
        <div className="flex-grow flex items-center space-x-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-grow border-b border-blue-500 outline-none"
          />
          <button
            onClick={() => {
              onSave();
              setIsEditing(false);
            }}
            className="text-green-500 hover:text-green-600"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onCancel();
              setIsEditing(false);
            }}
            className="text-red-500 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex-grow flex justify-between items-center">
          <span className={`${!value ? "text-gray-400" : "text-gray-800"}`}>
            {value || placeholder}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// ProfileSettings Component
const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    profile: {
      profile_picture: null as string | null,
      banner: null as string | null,
      bio: "",
      address: "",
      headline: "",
    },
  });

  const [originalProfile, setOriginalProfile] = useState(profile);
  const [loading, setLoading] = useState(true);

  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/api/v1/users/profile/");
        setProfile(response.data);
        setOriginalProfile(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  type ProfileField = 'username' | 'email' | 'first_name' | 'last_name' | 'phone' | 'bio' | 'address' | 'headline';

  const updateProfile = async (field: ProfileField, value: string) => {
    try {
      const updatedProfile = { ...profile };
      if (field === "bio" || field === "address" || field === "headline") {
        updatedProfile.profile = {
          ...updatedProfile.profile,
          [field]: value,
        };
      } else {
        updatedProfile[field] = value;
      }
      console.log('Payload being sent to the API:', updatedProfile);
      await apiClient.put("/api/v1/users/profile/", updatedProfile);
      setProfile(updatedProfile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };
  

  const handleImageUpload = async (
    file: File,
    type: "profile" | "banner"
  ) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture" , file); // or "banner"
    formData.append("banner" , file);
    try {
      const endpoint =
        type === "profile"
          ? "/api/v1/users/upload_profile_picture/"
          : "/api/v1/users/upload_banner/";
      await apiClient.put(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        `${type === "profile" ? "Profile" : "Banner"} picture updated successfully!`
      );

      if (type === "profile") {
        setProfile((prev) => ({
          ...prev,
          profile: { ...prev.profile, profile_picture: URL.createObjectURL(file) },
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          profile: { ...prev.profile, banner: URL.createObjectURL(file) },
        }));
      }
    } catch (error) {
      toast.error(`Failed to update ${type} picture.`);
    }
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
          <img
            src={profile.profile.banner || "/banner.jpg"}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => bannerImageInputRef.current?.click()}
              className="bg-white/70 p-2 rounded-full hover:bg-white/90"
            >
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
            <input
              type="file"
              ref={bannerImageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0], "banner")
              }
            />
          </div>
        </div>

        <div className="flex justify-center -mt-16">
          <div className="relative">
            <img
              src={profile.profile.profile_picture || "/Profile_placeholder.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <button
              onClick={() => profileImageInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="file"
              ref={profileImageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0], "profile")
              }
            />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg p-8 mt-4 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Profile Settings
          </h1>
          <EditableField
            label="Username"
            
            value={profile.username}
            onChange={(value) => setProfile((prev) => ({ ...prev, username: value }))}
            onSave={() => updateProfile("username", profile.username)}
            onCancel={() => setProfile(originalProfile)}
            placeholder="Enter your username"
            Icon={AtSign}
          />
          <EditableField
            label="First Name"
            value={profile.first_name}
            onChange={(value) => setProfile((prev) => ({ ...prev, first_name: value }))}
            onSave={() => updateProfile("first_name", profile.first_name)}
            onCancel={() => setProfile(originalProfile)}
            placeholder="Enter your first name"
            Icon={User}
          />
          <EditableField
            label="Last Name"
            value={profile.last_name}
            onChange={(value) => setProfile((prev) => ({ ...prev, last_name: value }))}
            onSave={() => updateProfile("last_name", profile.last_name)}
            onCancel={() => setProfile(originalProfile)}
            placeholder="Enter your last name"
            Icon={User}
          />
          <EditableField
  label="Bio"
  value={profile.profile.bio || ""}
  onChange={(value) =>
    setProfile((prev) => ({
      ...prev,
      profile: { ...prev.profile, bio: value },
    }))
  }
  onSave={() => updateProfile("bio", profile.profile.bio)}
  onCancel={() => setProfile(originalProfile)}
  placeholder="Write about yourself"
  Icon={Squirrel}
/>
          <EditableField
            label="Phone"
            value={profile.phone}
            onChange={(value) => setProfile((prev) => ({ ...prev, phone: value }))}
            onSave={() => updateProfile("phone", profile.phone)}
            onCancel={() => setProfile(originalProfile)}
            placeholder="Enter your phone number"
            Icon={Phone}
          />
          <EditableField
  label="Address"
  value={profile.profile.address || ""}
  onChange={(value) =>
    setProfile((prev) => ({
      ...prev,
      profile: { ...prev.profile, address: value },
    }))
  }
  onSave={() => updateProfile("address", profile.profile.address || "")}
  onCancel={() => setProfile(originalProfile)}
  placeholder="Enter your address"
  Icon={MapPin}
/>
<EditableField
  label="Headline"
  value={profile.profile.headline || ""}
  onChange={(value) =>
    setProfile((prev) => ({
      ...prev,
      profile: { ...prev.profile, headline: value },
    }))
  }
  onSave={() => updateProfile("headline", profile.profile.headline || "")}
  onCancel={() => setProfile(originalProfile)}
  placeholder="Enter your headline"
  Icon={FileText}
/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   User,
//   Phone,
//   Save,
//   X,
//   Edit2,
//   Squirrel,
//   Camera,
//   MapPin,
//   AtSign,
//   Shield,
//   FileText,
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiClient from "@/app/lib/apiClient";
// import Loading from "@/components/Shared/Loading"
// import Navbar from "@/components/NavBar/NavBar";
// const EditableField = ({
//   label,
//   value,
//   onChange,
//   onSave,
//   onCancel,
//   placeholder,
//   Icon,
// }: {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   onSave: () => void;
//   onCancel: () => void;
//   placeholder?: string;
//   Icon: React.FC;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className="flex items-center space-x-4 py-3 border-b hover:bg-gray-50">
//       <Icon className="text-gray-500 w-5 h-5" />
//       {isEditing ? (
//         <div className="flex-grow flex items-center space-x-2">
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder={placeholder}
//             className="flex-grow border-b border-blue-500 outline-none"
//           />
//           <button
//             onClick={() => {
//               onSave();
//               setIsEditing(false);
//             }}
//             className="text-green-500 hover:text-green-600"
//           >
//             <Save className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => {
//               onCancel();
//               setIsEditing(false);
//             }}
//             className="text-red-500 hover:text-red-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       ) : (
//         <div className="flex-grow flex justify-between items-center">
//           <span className={`${!value ? "text-gray-400" : "text-gray-800"}`}>
//             {value || placeholder}
//           </span>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-gray-500 hover:text-blue-600"
//           >
//             <Edit2 className="w-4 h-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProfileSettings = () => {
//   const [profile, setProfile] = useState({
//     username: "",
//     email: "",
//     first_name: "",
//     last_name: "",
//     phone: "",
//     profile: {
//       profile_picture: null as string | null,
//       banner: null as string | null,
//       bio: "",
//       address: "",
//       headline: "",
//     },
//   });
  

//   const [originalProfile, setOriginalProfile] = useState(profile);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await apiClient.get("/api/v1/users/profile/");
//         setProfile(response.data);
//         setOriginalProfile(response.data);
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to load profile. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   type ProfileField = 'username' | 'email' | 'first_name' | 'last_name' | 'phone' | 'bio' | 'address' | 'headline';

//   const updateProfile = async (field: ProfileField, value: string) => {
//     try {
//       const updatedField = field === "bio" || field === "address" || field === "headline"
//         ? { profile: { ...profile.profile, [field]: value } }
//         : { [field]: value };

//       console.log('Payload being sent to the API:', updatedField);
//       await apiClient.put("/api/v1/users/profile/", updatedField);
//       setProfile((prev) => ({ ...prev, ...updatedField }));
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       toast.error("Failed to update profile.");
//     }
//   };

//   if (loading) {
//     return <Loading/>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
//         <EditableField
//           label="Username"
//           value={profile.username}
//           onChange={(value) => setProfile((prev) => ({ ...prev, username: value }))}
//           onSave={() => updateProfile("username", profile.username)}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your username"
//           Icon={AtSign}
//         />
//         <EditableField
//           label="First Name"
//           value={profile.first_name}
//           onChange={(value) => setProfile((prev) => ({ ...prev, first_name: value }))}
//           onSave={() => updateProfile("first_name", profile.first_name)}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your first name"
//           Icon={User}
//         />
//         <EditableField
//           label="Last Name"
//           value={profile.last_name}
//           onChange={(value) => setProfile((prev) => ({ ...prev, last_name: value }))}
//           onSave={() => updateProfile("last_name", profile.last_name)}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your last name"
//           Icon={User}
//         />
//         <EditableField
//           label="Bio"
//           value={profile.profile.bio || ""}
//           onChange={(value) =>
//             setProfile((prev) => ({
//               ...prev,
//               profile: { ...prev.profile, bio: value },
//             }))
//           }
//           onSave={() => updateProfile("bio", profile.profile.bio)}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Write about yourself"
//           Icon={Squirrel}
//         />
//         <EditableField
//           label="Phone"
//           value={profile.phone}
//           onChange={(value) => setProfile((prev) => ({ ...prev, phone: value }))}
//           onSave={() => updateProfile("phone", profile.phone)}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your phone number"
//           Icon={Phone}
//         />
//         <EditableField
//           label="Address"
//           value={profile.profile.address || ""}
//           onChange={(value) =>
//             setProfile((prev) => ({
//               ...prev,
//               profile: { ...prev.profile, address: value },
//             }))
//           }
//           onSave={() => updateProfile("address", profile.profile.address || "")}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your address"
//           Icon={MapPin}
//         />
//         <EditableField
//           label="Headline"
//           value={profile.profile.headline || ""}
//           onChange={(value) =>
//             setProfile((prev) => ({
//               ...prev,
//               profile: { ...prev.profile, headline: value },
//             }))
//           }
//           onSave={() => updateProfile("headline", profile.profile.headline || "")}
//           onCancel={() => setProfile(originalProfile)}
//           placeholder="Enter your headline"
//           Icon={FileText}
//         />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProfileSettings;
