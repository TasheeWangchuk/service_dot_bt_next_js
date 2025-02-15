// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { Menu, X, Bell, User, LogOut } from 'lucide-react';
// import { useAuth } from "@/app/context/AuthContext";

// const Navbar = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, isLoggedIn, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMenuOpen]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [prevScrollPos]);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   const getNavigationLinks = () => {
//     const baseLinks = [
//       { href: '/', label: 'Home' },
//       { href: '/about', label: 'About' }
//     ];

//     if (isLoggedIn) {
//       if (user?.role === 'Client') {
//         baseLinks.push({ href: '/Client/FindServiceProvider', label: 'Find Freelancers' });
//       } else if (user?.role === 'Freelancer') {
//         baseLinks.push({ href: '/ServiceProvider/FindJobs', label: 'Find Work' });
//       }
//     }

//     return baseLinks;
//   };

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//     setIsMenuOpen(false);
//   };

//   const handleProfileClick = () => {
//     const profilePath = user?.role === 'Client' 
//       ? '/Client/Client-Profile'
//       : '/ServiceProvider/ServiceProvider-Profile';
//     router.push(profilePath);
//     setIsMenuOpen(false);
//   };

//   const NavLinks = () => (
//     <>
//       {getNavigationLinks().map((link) => (
//         <Link 
//           key={link.href}
//           href={link.href}
//           className={`
//             px-4 py-2 rounded-lg transition-all duration-200
//             font-medium text-sm
//             ${pathname === link.href 
//               ? 'text-yellow-300 shadow-sm' 
//               : 'text-white hover:bg-white/10'}
//           `}
//         >
//           {link.label}
//         </Link>
//       ))}
//     </>
//   );

//   return (
//     <>
//       <header 
//         className={`
//           fixed top-0 left-0 w-full z-50
//           transform transition-transform duration-300 ease-out
//           ${visible ? 'translate-y-0' : '-translate-y-full'}
//           bg-gradient-to-r from-orange-500 to-rose-500
//         `}
//       >
//         <div className="container mx-auto flex justify-between items-center px-4 h-16">
//           {/* Logo */}
//           <Link 
//             href="/" 
//             className="text-2xl font-bold text-white"
//           >
//             Service.bt
//           </Link>

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setIsMenuOpen(!isMenuOpen)} 
//             className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-4">
//             <div className="flex space-x-2">
//               <NavLinks />
//             </div>

//             <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
//               {isLoggedIn ? (
//                 <>
//                   <button 
//                     className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
//                     aria-label="Notifications"
//                   >
//                     <Bell size={20} />
//                   </button>
//                   <button 
//                     onClick={handleProfileClick}
//                     className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
//                     aria-label="Profile"
//                   >
//                     <User size={20} />
//                   </button>
//                   <button 
//                     onClick={handleLogout}
//                     className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
//                     aria-label="Logout"
//                   >
//                     <LogOut size={20} />
//                   </button>
//                 </>
//               ) : (
//                 <Link 
//                   href="/Auth/SignIn"
//                   className="px-4 py-2 rounded-lg bg-white text-orange-500 font-medium text-sm hover:bg-white/90 transition-colors"
//                 >
//                   Sign In
//                 </Link>
//               )}
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div 
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu */}
//       <div 
//         className={`
//           md:hidden fixed inset-x-0 top-16 z-50
//           transition-all duration-300 ease-out
//           ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
//           bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg
//           max-h-[calc(100vh-4rem)] overflow-y-auto
//         `}
//       >
//         <div className="container mx-auto p-4">
//           <div className="flex flex-col space-y-3">
//             <NavLinks />

//             {isLoggedIn ? (
//               <div className="border-t border-white/20 pt-3 space-y-2">
//                 <button className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white">
//                   <Bell size={20} /> 
//                   <span>Notifications</span>
//                 </button>
//                 <button 
//                   onClick={handleProfileClick}
//                   className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white"
//                 >
//                   <User size={20} /> 
//                   <span>Profile</span>
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white"
//                 >
//                   <LogOut size={20} /> 
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <Link 
//                 href="/Auth/SignIn"
//                 className="w-full text-center px-4 py-2 rounded-lg bg-white text-orange-500 font-medium hover:bg-white/90 transition-colors"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Navbar;
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
import { useUserStore } from "@/store/userStore";

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
          { href: "/Client/Contracts", label: "Contracts", icon: <Handshake className="w-4 h-4" /> }
        ]
        : [
          { href: "/ServiceProvider/FindJobs", label: "Find Work", icon: <Search className="w-4 h-4" /> },
          { href: "/ServiceProvider/MyProposals", label: "Proposals", icon: <FileText className="w-4 h-4" /> },
          { href: "/ServiceProvider/Contracts", label: "Contracts", icon: <Handshake className="w-4 h-4" /> }
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