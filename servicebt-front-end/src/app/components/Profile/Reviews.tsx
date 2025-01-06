// Reviews.js
import React from "react";

export default function Reviews() {

    // Dummy review data
    const reviews = [
      {
        id: 1,
        title: "Amazing Product!",
        description: "This product exceeded my expectations. Highly recommended!",
        rating: 5,
      },
      {
        id: 2,
        title: "Good Value for Money",
        description: "The quality is decent for the price. Satisfied overall.",
        rating: 4,
      },
      {
        id:3,
        title: "Not Bad",
        description: "It's okay but could be improved in terms of durability.",
        rating: 3,
      },
      {
        id:4,
        title: "Disappointed",
        description: "The product didn't match the description. Not worth it.",
        rating: 2,
      },
    ];
    
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {reviews.map((review) => (
          <div
          key={review.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-sm font-bold text-gray-800">{review.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{review.description}</p>
            <div className="mt-4">
              <span className="inline-block text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
