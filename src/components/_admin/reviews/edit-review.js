'use client';

import React, { useState, useEffect } from 'react';
import AdminReviewFrom from '@/components/forms/admin-reviews';
import { _reviews as reviewData } from 'src/_mock/reviews';

const STORAGE_KEY = 'reviews_data';

export default function EditReview({ id }) {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedReviews = localStorage.getItem(STORAGE_KEY);
    let reviews;

    if (storedReviews) {
      reviews = JSON.parse(storedReviews);
    } else {
      reviews = reviewData.data || reviewData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }

    const foundReview = reviews.find((item) => item._id === String(id));

    setReview(foundReview);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!review) {
    return <div>Review not found with ID: {id}</div>;
  }

  return <AdminReviewFrom data={review} isLoading={false} />;
}
