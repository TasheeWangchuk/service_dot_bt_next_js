"use client"
import React, { useState, useEffect } from "react";
import Navbar from '@/app/components/Shared/NavBar';
import Footer from '@/app/components/Shared/Footer';
import Hero from '@/app/components/Landing/Hero';
import Categories from '@/app/components/Landing/Category';
import Portfolio from '@/app/components/Landing/Portfolio';
// import HeroTwo from '@/app/components/Landing/HeroTwo';
import Sidebar from '@/app/components/Landing/Sidebar';
//import LoadingPage from "./components/Loading/loadingPage";

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
  
    <div className="font-sans" >    
      {/* Pass the scrolled prop to Navbar */}
      <Navbar />
      <div
      className="sticky"
      style={{
        backgroundImage: "url('/Artboard.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar for Vertical Line and Dots */}
      <Sidebar />

      {/* Main Sections */}
      <Hero />
      <Categories />
      <Portfolio />
      {/* Footer */}
      <Footer />
    </div></div>
  );
};

export default LandingPage;
