"use client"; // Required in Next.js App Router
import Link from "next/link";
import React, { useEffect } from "react";

const Hero: React.FC = () => {
  useEffect(() => {
    // Scroll-triggered animations with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "opacity-100 translate-y-0",
            entry.isIntersecting
          );
          entry.target.classList.toggle("opacity-0 translate-y-10", !entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    document.querySelectorAll(".animate-card").forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
      {/* Hero Section One */}
      <section id="hero" className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/placeholder.jpg" // Optional: Lazy load poster
        >
          <source src="vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 leading-snug">
            Are you looking for <br />
            <span className="text-orange-600">Freelancers?</span>
          </h1>
          <p className="text-white text-lg mt-4 max-w-2xl mx-auto">
            Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/pages/Client/Post">
  <button className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
    Hire a freelancer
  </button>
</Link>
<Link href="/pages/ServiceProvider/FindJobs">
  <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition">
    Start Earning
  </button>
</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
