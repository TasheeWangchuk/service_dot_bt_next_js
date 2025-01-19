"use client";
import React from 'react';
import { Home, Briefcase, Users, Tags, Star, Grid, AlertCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => (
  <div className="fixed left-0 top-0 h-full w-64 bg-orange-500 text-white p-4">
    <div className="text-xl font-bold mb-8 p-2">Admin Panel</div>
    <nav className="space-y-2">
      {['dashboard', 'jobs', 'users', 'skills', 'categories', 'reviews', 'reports'].map((tab) => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex items-center w-full p-3 rounded ${activeTab === tab ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
        >
          {getIcon(tab)} {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  </div>
);

const getIcon = (tab: string) => {
  switch(tab) {
    case 'dashboard': return <Home className="mr-2" size={20} />;
    case 'jobs': return <Briefcase className="mr-2" size={20} />;
    case 'users': return <Users className="mr-2" size={20} />;
    case 'skills': return <Tags className="mr-2" size={20} />;
    case 'categories': return <Grid className="mr-2" size={20} />;
    case 'reviews': return <Star className="mr-2" size={20} />;
    case 'reports': return <AlertCircle className="mr-2" size={20} />;
    default: return null;
  }
};

export default Sidebar;
