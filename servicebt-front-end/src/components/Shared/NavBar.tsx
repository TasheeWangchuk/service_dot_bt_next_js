// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import NotificationDropdown from "../Profile/NotificationDropdown";
// import Head from "next/head";

// const Navbar: React.FC = () => {
//   const router = useRouter();
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 50);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const handleMenuToggle = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       } bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg`}
//     >
//       <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
//         {/* Logo */}
//         <div className="text-2xl font-bold">Service.bt</div>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           onClick={handleMenuToggle}
//           className="lg:hidden text-3xl focus:outline-none"
//         >
//           <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
//         </button>

//         {/* Navigation */}
//         <nav
//           className={`lg:flex items-center space-x-8 ${
//             menuOpen ? "block" : "hidden"
//           } lg:block`}
//         >
//           <Link href="/" className="hover:text-yellow-300">
//             Home
//           </Link>
//           <Link href="/pages/ServiceProvider/FindJobs" className="hover:text-yellow-300">
//             Find Work
//           </Link>
//           <Link href="#" className="hover:text-yellow-300">
//             Find Freelancers
//           </Link>
//           <Link href="/pages/about" className="hover:text-yellow-300">
//             About
//           </Link>

//           {/* Notification Dropdown */}
//           <NotificationDropdown />

//           {/* Profile Section */}
//           <div className="relative group">
//             <button className="hover:text-yellow-300 focus:outline-none">
//               <img
//                 src="/profile-placeholder.jpg"
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//               />
//             </button>
//             <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md hidden group-hover:block">
//               <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </Link>
//               <button
//                 onClick={() => router.push("/logout")}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NotificationDropdown from "../Profile/NotificationDropdown";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication status

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  // Mock: Check if the user is logged in (replace with actual logic)
  useEffect(() => {
    const userLoggedIn = !!localStorage.getItem("userToken"); // Example: Check token
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="text-2xl font-bold">Service.bt</div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={handleMenuToggle}
          className="lg:hidden text-3xl focus:outline-none"
        >
          <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Navigation */}
        <nav
          className={`lg:flex items-center space-x-8 ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <Link href="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link
            href="/ServiceProvider/FindJobs"
            className="hover:text-yellow-300"
          >
            Find Work
          </Link>
          <Link href="#" className="hover:text-yellow-300">
            Find Freelancers
          </Link>
          <Link href="/about" className="hover:text-yellow-300">
            About
          </Link>

          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="hover:text-yellow-300 focus:outline-none"
            >
              <img
                src="/profile-placeholder.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("userToken"); // Mock logout
                        setIsLoggedIn(false);
                        router.push("/login");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Auth/SignIn"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      href="/Auth/SignUp"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

