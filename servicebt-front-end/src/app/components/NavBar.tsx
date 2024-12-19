import React from "react";
import { useRouter } from 'next/navigation';

interface NavbarProps {
  scrolled: boolean; 
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const router = useRouter();

  const handleRedirect = () => {
      router.push('pages/JobPosting'); 
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="rounded-15 bg-white flex items-center justify-between p-2 shadow-md mx-auto max-w-full">
        {/* Logo */}
        <div className="ml-2">
          <h1 className="text-sm font-semibold text-black">Service.bt</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4 text-2xs text-gray-600">
            <li>
              <a href="#" className="text-orange-600 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600">
                Find work
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600">
                Find Freelancers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600">
                Log In
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>

        {/* Button */}
        <div className="mr-2">
          <button 
            onClick={handleRedirect}
            className="bg-orange-500 text-white font-medium px-4 py-1 text-xs rounded-full hover:bg-orange-600"
          >
            Post a project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
