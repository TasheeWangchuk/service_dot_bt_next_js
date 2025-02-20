"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from 'lucide-react';
import apiClient from '@/app/api/apiClient';

const RatingPage = ({ params }: { params: { id: string } }) => {
    const { id } = useParams();  // contract ID
  const { user } = useAuth();
  const role = user?.role;
  const router = useRouter();
  const [rating, setRating] = useState(0);  
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const submitReview = async () => {
    if (rating === 0) {
      alert('Please provide a rating.');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post(`/api/v1/contracts/${id}/reviews/`, {
        rating,
      });
      ('Review submitted successfully!');
      router.push('/Contract-list');  
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('you already reviewed .');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (role !== 'Client') {
    return <div>You do not have permission to rate this contract.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold">Rate Freelancer</h2>
      <div className="mt-4">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 cursor-pointer ${rating >= star ? 'text-orange-400 fill-yellow-400' : 'text-gray-400'}`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
      </div>

      {/* <div className="mt-4">
        <Textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here"
          rows={4}
        />
      </div> */}

      <div className="mt-4">
        <Button onClick={submitReview} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </div>
  );
};

export default RatingPage;
