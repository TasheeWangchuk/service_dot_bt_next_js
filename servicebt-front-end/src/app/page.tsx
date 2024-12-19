"use client"
import React, { useState, useEffect } from "react";
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import Categories from '@/app/components/Category';
import Portfolio from '@/app/components/Portfolio';
import HeroTwo from '@/app/components/HeroTwo';
import Sidebar from '@/app/components/Sidebar';

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-sans">
      {/* Pass the scrolled prop to Navbar */}
      <Navbar scrolled={scrolled} />
      
      {/* Sidebar for Vertical Line and Dots */}
      <Sidebar />

      {/* Main Sections */}
      <Hero />
      
      <Categories />
      <Portfolio />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
