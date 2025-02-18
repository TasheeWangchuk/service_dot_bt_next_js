import React from 'react';
import { Mail, Phone, MapPin, Heart, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface ProfileHeaderProps {
  profile: any;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  first_name,
  last_name,
  username,
  email,
  phone
}) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-4 relative">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 bg-white/70 backdrop-blur-md p-6 shadow-lg rounded-lg">
      <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl -mt-12 md:-mt-16">
        <AvatarImage src={profile ? profile.profile_picture || "/Profile_placeholder.png" : "/Profile_placeholder.png"} />
        <AvatarFallback className="text-2xl">{first_name?.[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-gray-700">
          {first_name} {last_name} <span className="text-gray-500 text-sm">@ {username}</span>
        </h1>
        <p className="text-black text-sm font-semibold md:text-lg">{profile?.headline || ""}</p>
        <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
          <MapPin className="w-4 h-4" />
          <span>{profile?.address || "Location not provided"}</span>
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
          <Button variant="outline" className="border-gray-300 hover:bg-gray-100" title="Profile Settings">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
export default ProfileHeader;