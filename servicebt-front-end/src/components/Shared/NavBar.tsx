import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' }
    ];

    if (isLoggedIn) {
      if (user?.role === 'Client') {
        baseLinks.push({ href: '/Client/FindServiceProvider', label: 'Find Freelancers' });
      } else if (user?.role === 'Freelancer') {
        baseLinks.push({ href: '/ServiceProvider/FindJobs', label: 'Find Work' });
      }
    }

    return baseLinks;
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    const profilePath = user?.role === 'Client' 
      ? '/Client/Client-Profile'
      : '/ServiceProvider/ServiceProvider-Profile';
    router.push(profilePath);
    setIsMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      {getNavigationLinks().map((link) => (
        <Link 
          key={link.href}
          href={link.href}
          className={`
            px-4 py-2 rounded-lg transition-all duration-200
            font-medium text-sm
            ${pathname === link.href 
              ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md' 
              : 'text-white hover:bg-white/10'}
          `}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 w-full z-50
          transform transition-transform duration-300 ease-out
          ${visible ? 'translate-y-0' : '-translate-y-full'}
          bg-gradient-to-r from-orange-500 to-rose-500
        `}
      >
        <div className="container mx-auto flex justify-between items-center px-4 h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-white"
          >
            Service.bt
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              <NavLinks />
            </div>

            <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
              {isLoggedIn ? (
                <>
                  <button 
                    className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                  </button>
                  <button 
                    onClick={handleProfileClick}
                    className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                    aria-label="Profile"
                  >
                    <User size={20} />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <Link 
                  href="/Auth/SignIn"
                  className="px-4 py-2 rounded-lg bg-white text-orange-500 font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden fixed inset-x-0 top-16 z-50
          transition-all duration-300 ease-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg
          max-h-[calc(100vh-4rem)] overflow-y-auto
        `}
      >
        <div className="container mx-auto p-4">
          <div className="flex flex-col space-y-3">
            <NavLinks />
            
            {isLoggedIn ? (
              <div className="border-t border-white/20 pt-3 space-y-2">
                <button className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white">
                  <Bell size={20} /> 
                  <span>Notifications</span>
                </button>
                <button 
                  onClick={handleProfileClick}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white"
                >
                  <User size={20} /> 
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-white"
                >
                  <LogOut size={20} /> 
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/Auth/SignIn"
                className="w-full text-center px-4 py-2 rounded-lg bg-white text-orange-500 font-medium hover:bg-white/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;