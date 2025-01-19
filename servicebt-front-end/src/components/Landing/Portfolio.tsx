"use client";

import React, { useState } from "react";

interface Category {
  name: string;
  role: string;
  img: string;
}

const Categories: React.FC = () => {
  const [categories] = useState<Category[]>([
    { name: "Tashi.design", role: "UI/UX Designer", img: "/logo_design.jpg" },
    { name: "DxDy", role: "Graphic Designer", img: "/logo_design.jpg" },
    { name: "Sonam", role: "Graphic Designer", img: "/logo_design.jpg" },
    { name: "Web Guru", role: "Full Stack Developer", img: "/logo_design.jpg" },
    { name: "Dendup", role: "Photographer", img: "/logo_design.jpg" },
    { name: "Content Ninja", role: "Content Creator", img: "/logo_design.jpg" },
    { name: "Pema", role: "Photographer", img: "/portfolio.webp" },
    { name: "Yangchen", role: "Content Creator", img: "/logo_design.jpg" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCards = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  return (
    <div
      id="Portfolio"
      className="sticky p-10 min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/Artboard.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className=" w-full max-w-screen-lg">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-black">
          Discover Top <span className="text-orange-500">Freelancers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentCards.map((category, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-xl group relative bg-gradient-to-t from-gray-800 to-gray-900"
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-orange/70 via-transparent to-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundBlendMode: "overlay",
                  pointerEvents: "none",
                }}
              />
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6 z-60 relative">
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
                <p className="text-lg text-gray-400 mt-2">{category.role}</p>
              </div>
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href="#"
                  className="bg-gold text-gray-400 px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button
            onClick={handlePrev}
            className="px-6 py-3 bg-gradient-to-r from-white to-gray-50 text-gray-800 rounded-full text-lg font-bold hover:bg-gold hover:text-orange-600 transition-all duration-300"
          >
            Prev
          </button>

          <span className="text-sm text-orange-400 font-bold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-white to-gray-50 text-gray-800 rounded-full text-lg font-bold hover:bg-gold hover:text-orange-600 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
