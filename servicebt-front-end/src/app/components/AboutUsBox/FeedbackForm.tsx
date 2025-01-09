"use client";
import StarRatings from 'react-star-ratings';
import { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(4.5);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFeedbackSubmit = () => {
    alert("Thank you for your feedback!");
    setFeedback('');
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="text-4xl font-bold mr-2">{rating}</span>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="24px"
          starSpacing="4px"
          changeRating={handleRatingChange}
        />
      </div>

      <textarea
        placeholder="Leave your feedback"
        className="w-full p-4 border rounded mb-4"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        onClick={handleFeedbackSubmit}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
