// // import React, { useEffect, useState } from "react";
// // import { useRouter } from 'next/navigation';
// // import Link from "next/link";

// // const Navbar: React.FC = () => {
// //   const router = useRouter();
// //   const [isVisible, setIsVisible] = useState(true);
// //   const [lastScrollY, setLastScrollY] = useState(0);

// //   useEffect(() => {
// //     // Function to handle scroll behavior
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;

// //       // Hide the navbar when scrolling down, show when scrolling up
// //       if (currentScrollY > lastScrollY && currentScrollY > 50) {
// //         setIsVisible(false);
// //       } else {
// //         setIsVisible(true);
// //       }

// //       setLastScrollY(currentScrollY);
// //     };

// //     // Attach the scroll event listener for all pages
// //     window.addEventListener("scroll", handleScroll);

// //     return () => {
// //       // Cleanup the event listener
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [lastScrollY]);

// //   return (
// //     <div
// //       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
// //         isVisible ? "transform translate-y-0" : "transform -translate-y-full"
// //       } bg-white shadow-md`}
// //     >
// //       <div className="rounded-15 flex items-center justify-between px-4 py-2 mx-auto max-w-7xl">
// //         {/* Logo */}
// //         <div>
// //           <h1 className="text-lg font-semibold text-black">Service.bt</h1>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex space-x-6 text-sm text-gray-600">
// //           <Link href="../" className="text-orange-600 font-medium">
// //             Home
// //           </Link>
// //           <Link href="ServiceProvider/FindJobs" className="hover:text-orange-600">
// //             Find work
// //           </Link>
// //           <Link href="#" className="hover:text-orange-600">
// //             Find Freelancers
// //           </Link>
// //           <Link href="#" className="hover:text-orange-600">
// //             Log In
// //           </Link>
// //           <Link href="#" className="hover:text-orange-600">
// //             Sign Up
// //           </Link>
// //         </nav>

// //         {/* Button */}
// //         <div>
// //           <button
// //             onClick={() => router.push("Client/Post")}
// //             className="bg-orange-500 text-white font-medium px-4 py-2 text-xs rounded-full hover:bg-orange-600 shadow-md"
// //           >
// //             Post a project
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import NotificationDropdown from "./Profile/NotificationDropdown"; 
// import { useEffect, useState } from "react";
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
//     setMenuOpen(!menuOpen);
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
//           className="lg:hidden text-3xl"
//         >
//           <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
//         </button>

//         {/* Navigation */}
//         <nav
//           className={`lg:flex items-center space-x-8 ${menuOpen ? "block" : "hidden"} lg:block`}
//         >
//           <Link href="/" className="hover:text-yellow-300">
//             Home
//           </Link>
//           <Link href="/ServiceProvider/FindJobs" className="hover:text-yellow-300">
//             Find Work
//           </Link>
//           <Link href="#" className="hover:text-yellow-300">
//             Find Freelancers
//           </Link>

//           {/* Notification Dropdown */}
//           <NotificationDropdown /> 

//           {/* Profile Section */}
//           <div className="relative group">
//             <button className="hover:text-yellow-300">
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
import NotificationDropdown from "./Profile/NotificationDropdown";
import Head from "next/head";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/pages/ServiceProvider/FindJobs" className="hover:text-yellow-300">
            Find Work
          </Link>
          <Link href="#" className="hover:text-yellow-300">
            Find Freelancers
          </Link>

          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Profile Section */}
          <div className="relative group">
            <button className="hover:text-yellow-300 focus:outline-none">
              <img
                src="/profile-placeholder.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={() => router.push("/logout")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
