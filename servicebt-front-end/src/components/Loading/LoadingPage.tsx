// "use client";

// import React from "react";

// // LoadingPage component
// const LoadingPage = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-600 via-orange-600 to-gray-600">
//       <div className="text-center space-y-6 animate-fadeIn">
//         <div className="relative inline-block">
//           {/* Spinning Circle */}
//           <div className="w-24 h-24 border-8 border-t-8 border-white rounded-full animate-spin-slow"></div>
//         </div>
//         <p className="text-white text-5xl font-extrabold tracking-wide animate-fadeIn">
//           Service.bt is Loading...
//         </p>
//         <p className="text-white text-xl font-light opacity-80 animate-fadeIn animate-delay-200">
//           Bringing you the best local services, please hold on.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;
import React, { useEffect, useState } from "react";
import Image from "next/image";

const LoadingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false); // Simulate loading complete after 3 seconds
    }, 3000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-red-600">
      {loading && (
        <div className="text-center">
          {/* Animated Logo (or placeholder text for now) */}
          <div className="mb-6 animate-pulse">
            <h1 className="text-4xl font-semibold text-white">Service.bt</h1>
          </div>

          {/* Spinner Animation */}
          <div className="border-8 border-t-8 border-gray-200 border-solid rounded-full w-24 h-24 mx-auto animate-spin border-t-orange-500"></div>

          {/* Loading Text */}
          <p className="text-white text-lg mt-4 font-medium animate-fadeIn">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
