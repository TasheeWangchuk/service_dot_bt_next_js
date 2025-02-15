import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { 
  Home, 
  Briefcase, 
  Users, 
  Star, 
  AlertCircle, 
  Menu, 
  X, 
  LogOut,
  Settings
} from "lucide-react";

interface SideNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideNav = ({ activeTab, setActiveTab }: SideNavProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger-button');
      
      if (sidebar && hamburger && 
          !sidebar.contains(event.target as Node) && 
          !hamburger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    router.push(`/Admin/${tab}`);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/Auth/SignIn');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { id: 'Dashboard', icon: Home, label: 'Dashboard' },
    { id: 'jobs', icon: Briefcase, label: 'Job Posts' },
    { id: 'userManage', icon: Users, label: 'User Management' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
    { id: 'reports', icon: AlertCircle, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Header with Hamburger */}
      <header className="fixed top-0 left-0 right-0 bg-orange-500 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              id="hamburger-button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-orange-600 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-white" />
            </button>
            <span className="font-bold text-lg text-white ">Admin Panel</span>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          pt-16
        `}
      >
        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id)}
              className={`
                w-full flex items-center px-4 py-3 rounded-lg
                transition-all duration-200
                ${activeTab === id 
                  ? "bg-white text-orange-500" 
                  : "text-white hover:bg-orange-400/50"}
              `}
            >
              <Icon 
                size={20} 
                className={activeTab === id ? 'text-orange-500' : 'text-white'}
              />
              <span className="ml-3 font-medium">
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            absolute bottom-8 left-4 right-4
            flex items-center px-4 py-3 rounded-lg
            text-white hover:bg-orange-400/50
            transition-all duration-200
          "
        >
          <LogOut size={20} />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
};

export default SideNav;