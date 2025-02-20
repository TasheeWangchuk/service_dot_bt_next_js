import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Mail, Phone } from 'lucide-react';

interface ProfileHeaderProps {
  userData: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-28 relative">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 bg-white/70 backdrop-blur-md p-6 shadow-lg rounded-lg">
      <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl -mt-12 md:-mt-16">
        <AvatarImage src={userData?.profile_picture || "/Profile_placeholder.png"} />
        <AvatarFallback className="text-2xl">
          {userData?.user.first_name?.[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-gray-700">
          {userData?.user.first_name} {userData?.user.last_name}
          <span className="text-gray-500 text-sm"> @ {userData?.user.username}</span>
        </h1>
        <p className="text-black text-sm font-semibold md:text-lg">
          {userData?.headline || "No headline provided"}
        </p>
        <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
          <MapPin className="w-4 h-4" />
          <span>{userData?.address || "Location not provided"}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-700 text-sm mt-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{userData?.user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{userData?.user.phone || "Phone not available"}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
