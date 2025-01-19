"use client";

import React, { useState } from "react";

interface Category {
  title: string;
  img: string;
}

const Categories: React.FC = () => {
  const [categories] = useState<Category[]>([
    { title: "Graphic & Design", img: "/illust.jpg" },
    { title: "Cartoon Animation", img: "/animation.jpg" },
    { title: "Illustration", img: "/illust.jpg" },
    { title: "Flyers & Vouchers", img: "/marketing.jpg" },
    { title: "Logo Design", img: "/logo_design.jpg" },
    { title: "Social Graphics", img: "/vid_edit.jpg" },
    { title: "Article Writing", img: "/writing.jpg" },
    { title: "Video Editing", img: "/vid_edit.jpg" },
  ]);

  const handleMoreCategories = () => {
    alert("More categories coming soon!");
    // Navigate or load more categories dynamically
  };

  return (
    <section id="category" className="relative py-10 ml-10 mr-10 ">

      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-black">
          Choose Different <span className="text-orange-500">Category</span>
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={category.img}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <h3 className="absolute inset-x-0 bottom-4 text-center text-white font-semibold text-lg">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        {/* More Categories Button */}
        <button
          onClick={handleMoreCategories}
          className="mt-8 px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300"
        >
          More Categories
        </button>
      </div>
    </section>
  );
};

export default Categories;
