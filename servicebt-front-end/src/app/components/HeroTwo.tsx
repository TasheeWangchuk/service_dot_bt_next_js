"use client"; 

import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="heroTwo" className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Optimized Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata" // Only preload metadata to improve load time
        poster="/placeholder.jpg" // Display a poster image while the video is loading
      >
        <source src="vid1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12">
        {/* Floating Stats */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-lg p-4 w-36 text-center">
            <h3 className="text-2xl font-bold text-orange-500">100+</h3>
            <p className="text-gray-500 text-sm">freelancers</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-44 text-center">
            <h3 className="text-2xl font-bold text-orange-500">300+</h3>
            <p className="text-gray-500 text-sm">freelance work posted</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md ml-auto">
          <h2 className="text-3xl font-bold text-gray-800 leading-tight">
            Find The Best <span className="text-orange-500">Freelancers</span> Here
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna,
            cursus eget convallis. Feugiat imperdiet posuere justo, ultrices interdum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
