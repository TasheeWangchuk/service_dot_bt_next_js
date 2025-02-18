import React from 'react';

interface ProfileBannerProps {
  bannerUrl: string;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ bannerUrl }) => (
  <div className="relative w-full h-72 md:h-96 bg-gradient-to-r from-blue-500 to-purple-600">
    <img
      src={bannerUrl || "/banner.jpg"}
      alt="Profile Banner"
      className="w-full h-full object-cover"
    />
  </div>
);