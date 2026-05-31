'use client';
import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import Table from 'src/components/table/table';
import DeleteDialog from '@/components/dialog/delete';
import ReviewList from '@/components/table/tableRows/reviews-list';
import { _reviews } from 'src/_mock/reviews';

const TABLE_HEAD = [
  { id: 'name', label: 'User', alignRight: false },
  { id: 'title', label: 'Designation', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'rating', label: 'Rating', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

const STORAGE_KEY = 'reviews_data';

export default function ReviewsListComponent() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedReviews = localStorage.getItem(STORAGE_KEY);

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      const initialData = _reviews.data || _reviews;
      setReviews(initialData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
  }, []);

  const updateLocalStorage = (updatedReviews) => {
    setReviews(updatedReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
  };

  const handleClickOpen = (prop) => () => {
    setId(prop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const updatedReviews = reviews.filter((review) => review._id !== id);
    updateLocalStorage(updatedReviews);
    setOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth='xs'>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={() => {}}
          endPoint={() => {}}
          type='Review deleted'
          deleteMessage='Are you sure you want to delete this Review? Please consider carefully before making irreversible changes.'
          onConfirm={handleDelete}
        />
      </Dialog>

      <Table
        headData={TABLE_HEAD}
        data={{ data: reviews }}
        isLoading={false}
        row={ReviewList}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}
