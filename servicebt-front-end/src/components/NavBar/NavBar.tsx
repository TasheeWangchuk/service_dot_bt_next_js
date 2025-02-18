"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu, X, User, LogOut, PlusCircle, Search,
  FileText, Handshake, Bell, ChevronDown
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import NotificationBell from "../Notification/notification";
import { useUserStore } from "@/hooks/userStore";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { profile, first_name, last_name, fetchUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData().finally(() => setIsLoading(false));
  }, [fetchUserData]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 20);

      if (currentScrollPos > 60) {
        setVisible(prevScrollPos > currentScrollPos);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Handle profile menu clicks
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      
      // Handle mobile menu clicks
      const target = event.target as HTMLElement;
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(target) && 
        !target.closest('button[aria-label="Toggle mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle resize events to close mobile menu on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowProfileMenu(false);
  }, [pathname]);

  const getNavigationLinks = (): NavLinkProps[] => {
    const baseLinks: NavLinkProps[] = [
      { href: "/", label: "Home", icon: null },
      { href: "/about", label: "About", icon: null },
    ];

    if (isLoggedIn) {
      const roleSpecificLinks: NavLinkProps[] = user?.role === "Client"
        ? [
          { href: "/Client/Post", label: "Post Project", icon: <PlusCircle className="w-4 h-4" /> },
          { href: "/Client/MyPosts", label: "My Projects", icon: <FileText className="w-4 h-4" /> },
          { href: "/Client/FindServiceProvider", label: "Find Provider", icon: <Search className="w-4 h-4" /> },
          { href: "/Contract-list", label: "Contracts", icon: <Handshake className="w-4 h-4" /> }
        ]
        : [
          { href: "/ServiceProvider/FindJobs", label: "Find Work", icon: <Search className="w-4 h-4" /> },
          { href: "/ServiceProvider/MyProposals", label: "Proposals", icon: <FileText className="w-4 h-4" /> },
          { href: "/Contract-list", label: "Contracts", icon: <Handshake className="w-4 h-4" /> }
        ];

      return [...baseLinks, ...roleSpecificLinks];
    }

    return baseLinks;
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const NavLink: React.FC<NavLinkProps> = ({ href, label, icon }) => (
    <Link
      href={href}
      className={`
        group flex items-center px-3 py-2 rounded-lg transition-all duration-200
        ${pathname === href
          ? "bg-white/20 text-white"
          : "text-white/90 hover:bg-white/10"
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 
          transition-all duration-300 ease-in-out
          ${isScrolled
            ? "bg-gradient-to-r from-orange-500 to-red-400 shadow-lg"
            : "bg-gradient-to-r from-orange-400 to-red-400"
          }
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Service.bt</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {getNavigationLinks().map((link, index) => (
                <NavLink key={index} {...link} />
              ))}
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <div className="p-2 rounded-lg transition-colors">
                    <NotificationBell />
                  </div>

                  {/* Profile Menu */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={profile?.profile_picture || "/Profile_placeholder.png"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                      />
                      <ChevronDown
                        className={`w-4 h-4 text-white transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {first_name} {last_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href={user?.role === "Client" ? "/Client/Profile" : "/ServiceProvider/ServiceProvider-Profile"}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href="/Auth/SignIn"
                  className="px-4 py-2 rounded-lg bg-white text-orange-500 font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`
            md:hidden fixed top-16 left-0 w-full bg-gradient-to-r from-orange-500 to-red-400
            transform transition-all duration-300 ease-in-out shadow-lg
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
          `}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {getNavigationLinks().map((link, index) => (
                <NavLink key={index} {...link} />
              ))}
              {isLoggedIn ? (
                <>
                  <div className="h-px bg-white/20 my-2" />
                  <Link
                    href={user?.role === "Client" ? "/Client/Profile" : "/ServiceProvider/ServiceProvider-Profile"}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/Auth/SignIn"
                  className="px-4 py-2 rounded-lg bg-white text-orange-500 font-medium text-sm hover:bg-white/90 transition-colors text-center"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;