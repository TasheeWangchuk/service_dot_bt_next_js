"use client";

import React, { useState } from "react";

interface Category {
  name: string;
  role: string;
  img: string;
}

const Categories: React.FC = () => {
  const [categories] = useState<Category[]>([
    { name: "Tashi.design", role: "UI/UX Designer", img: "/portfolio.webp" },
    { name: "DxDy", role: "Graphic Designer", img: "/portfolio.webp" },
    { name: "Sonam", role: "Graphic Designer", img: "/portfolio.webp" },
    { name: "Web Guru", role: "Full Stack Developer", img: "/portfolio.webp" },
    { name: "ShutterClick", role: "Photographer", img: "/portfolio.webp" },
    { name: "Content Ninja", role: "Content Creator", img: "/portfolio.webp" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Paginate cards
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
    <div id="portfolio"
      className="p-10 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/Artboard.png')" }}
    >
      <div className="bg-white bg-opacity-10 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Checkout The Best <span className="text-orange-600">Portfolios</span> Here
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCards.map((category, idx) => (
            <div
              key={idx}
              className=" rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.role}</p>
              </div>
              <div className="flex justify-end p-2">
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-700 transition-colors duration-300"
                >
                  →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Prev
          </button>

          <span className="text-orange-600 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
