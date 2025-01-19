import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([
    { review_id: 1, rating: 4.5 },
    { review_id: 2, rating: 3.0 },
    { review_id: 3, rating: 5.0 },
  ]);

  const ratingData = [
    { name: '1-2 stars', value: reviews.filter((review) => review.rating <= 2).length },
    { name: '3-4 stars', value: reviews.filter((review) => review.rating > 2 && review.rating < 4).length },
    { name: '4-5 stars', value: reviews.filter((review) => review.rating >= 4).length },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Reviews Management</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={ratingData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
            {ratingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#FFBB28', '#00C49F', '#FF8042'][index % 3]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewsManager;
