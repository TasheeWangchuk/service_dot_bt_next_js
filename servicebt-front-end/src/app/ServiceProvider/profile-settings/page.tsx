"use client"; 
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Camera, 
  Edit2, 
  Save, 
  X, 
  Phone, 
  Info, 
  LucideProps
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "@/app/lib/apiClient";

// Dynamic Textarea Component
const DynamicTextarea = ({ 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  placeholder = 'Enter your text here...', 
  maxHeight = 300 
}: {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  placeholder?: string;
  maxHeight?: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [value, maxHeight]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        className="w-full p-2 border-b border-blue-500 outline-none resize-none overflow-hidden transition-all duration-300 text-gray-800"
        rows={3}
      />
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={onSave} className="text-green-500 hover:text-green-600">
          <Save className="w-5 h-5" />
        </button>
        <button onClick={onCancel} className="text-red-500 hover:text-red-600">
          <X className="w-5 h-5" />
        </button>
        {value && (
          <span className="text-xs text-gray-500 ml-auto">
            {value.length} characters
          </span>
        )}
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    headline: '',
    bio: '',
    phone: '',
    address: '',
    education: '',
    rate: '',
    projectsCompleted: '',
    profile_picture: '/Profile_placeholder.png',
    banner: '/banner.jpg',
  
    
  });

  const [editingFields, setEditingFields] = useState<Record<keyof typeof profile, boolean>>({
    first_name: false,
    last_name: false,
    username: false,
    headline: false,
    bio: false,
    phone: false,
    address: false,
    education: false,
    rate: false,
    projectsCompleted: false,
    banner: false,
    profile_picture: false
  });

  const [originalProfile, setOriginalProfile] = useState<typeof profile>(profile);

  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState('/Profile_placeholder.png');
  const [bannerImage, setBannerImage] = useState('/banner.jpg');

  const profileImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/api/v1/users/profile/');
        setProfile(response.data);
        console.log(response.data);
        setOriginalProfile(response.data);
        setProfileImage(response.data.profile_picture|| '/Profile_placeholder.png');
        setBannerImage(response.data.banner || '/banner.jpg');
        setLoading(false);
      } catch (error) {
        // console.error('Error fetching profile:', error);
        toast.error('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (file: File, type: 'profile' | 'banner') => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    try {
      await apiClient.post(`/api/v1/users/upload-${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (type === 'profile') {
        setProfileImage(URL.createObjectURL(file));
      } else {
        setBannerImage(URL.createObjectURL(file));
      }

      toast.success(`${type === 'profile' ? 'Profile' : 'Banner'} picture updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update ${type} picture.`);
    }
  };

  const updateProfile = async () => {
    try {
      const payload = {
       
        username: profile.username,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        
        profile: {
           
          profile_picture: profile.profile_picture,  
          banner: profile.banner,  
          bio: profile.bio,
          address: profile.address,
          headline: profile.headline,
        },
        address: profile.address  // Update address here as well if needed
      };

      await apiClient.patch('/api/v1/users/profile/', payload);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const renderEditableField = (field: keyof typeof profile, icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, type = 'text', placeholder = '') => {
    const isEditing = editingFields[field];
    const value = field === 'headline' || field === 'bio' || field ==='address'  ? profile.profile[field] : profile[field] || '';  
    

    return (
      <div className="flex items-center space-x-4 py-3 border-b  hover:bg-gray-50">
        {React.createElement(icon, { className: "text-gray-500 w-5 h-5" })}
        {isEditing ? (
          <div className="flex-grow flex items-center space-x-2">
            <input
              type={type}
              value={value}
              onChange={(e) => setProfile((prev) => ({ ...prev, [field]: e.target.value }))}
              placeholder={placeholder}
              className="flex-grow border-b border-blue-500 outline-none"
            />
            <button onClick={updateProfile} className="text-green-500 hover:text-green-600">
              <Save className="w-5 h-5" />
            </button>
            <button onClick={() => setEditingFields((prev) => ({ ...prev, [field]: false }))} className="text-red-500 hover:text-red-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex-grow flex justify-between items-center">
            <span className={`${!value ? 'text-gray-400' : 'text-gray-800'}`}>{value || placeholder}</span>
            <button onClick={() => setEditingFields((prev) => ({ ...prev, [field]: true }))} className="text-gray-500 hover:text-blue-600">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Banner and Profile Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
          <img src={bannerImage} alt="Profile Banner" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2">
            <button onClick={() => bannerImageInputRef.current && bannerImageInputRef.current.click()} className="bg-white/70 p-2 rounded-full hover:bg-white/90">
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
            <input
              type="file"
              ref={bannerImageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'banner')}
            />
          </div>
        </div>

        <div className="flex justify-center -mt-16">
          <div className="relative">
            <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
            <button onClick={() => profileImageInputRef.current.click()} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="file"
              ref={profileImageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'profile')}
            />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg p-8 mt-4 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
          <div className="grid md:grid-cols-2 gap-4">
            {renderEditableField('first_name', User, 'text', 'First Name')}
            {renderEditableField('last_name', User, 'text', 'Last Name')}
          </div>
          {renderEditableField('username', Briefcase, 'text', 'Username')}
          {renderEditableField('headline', Star, 'text', 'Professional Headline')}
          {renderEditableField('phone', Phone, 'text', 'Contact Info')}
          <div className="grid md:grid-cols-2 gap-4">
            {renderEditableField('address', MapPin, 'text', 'Address')}
            {renderEditableField('education', GraduationCap, 'text', 'Education')}
          </div>
          <DynamicTextarea
            value={profile.bio}
            onChange={(value) => setProfile((prev) => ({ ...prev, bio: value }))}
            onSave={updateProfile}
            onCancel={() => setProfile((prev) => ({ ...prev, bio: originalProfile.bio }))}
            placeholder="Tell us about yourself..."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {renderEditableField('rate', Briefcase, 'number', 'Service Rate')}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;
