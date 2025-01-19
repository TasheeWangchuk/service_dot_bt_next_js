import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-10">

       {/* Dots as Navigation */}
       <div className="flex flex-col items-center gap-6 mt-20">
        {/* Dot 1 - Custom Icon */}
        <a href="#hero">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-300 w-6 h-6 hover:text-orange-600 transition -mt-4"
          >
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
          </svg>
        </a>

        

        {/* Dot 2 - Custom Icon */}
        <a href="#category">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-300 w-6 h-6 hover:text-orange-600 transition -mt-4"
          >
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
          </svg>
        </a>

        {/* Dot 3 - Custom Icon */}
        <a href="#Portfolio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-300 w-6 h-6 hover:text-orange-600 transition -mt-4"
          >
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
          </svg>
        </a>

        
      </div>
      {/* Vertical Line */}
      <div className="w-1 bg-orange-500 h-[80vh]"></div>


    </div>
  );
};

export default Sidebar;
