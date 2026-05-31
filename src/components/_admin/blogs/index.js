'use client';
import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

// components
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import BlogsRow from '@/components/table/tableRows/blogs';
import { _blogs } from 'src/_mock/blogs';

const TABLE_HEAD = [
  { id: 'title', label: 'Blog Name', alignRight: false, sort: true },
  { id: 'category', label: 'Category', alignRight: false, sort: true },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function BlogsList() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeBlogs = (arr) =>
    arr.map((b) => ({
      ...b,
      id: b._id || Date.now().toString() + Math.random(),
      createdAt: b.createdAt || new Date().toISOString(),
      updatedAt: b.updatedAt || new Date().toISOString(),
    }));

  useEffect(() => {
    try {
      let saved = JSON.parse(localStorage.getItem('blogs') || '[]');

      // if saved is an object with data, extract it
      if (saved?.data) saved = saved.data;

      const initialBlogs =
        Array.isArray(saved) && saved.length
          ? normalizeBlogs(saved)
          : normalizeBlogs(_blogs.data || []);

      setBlogs(initialBlogs);
      localStorage.setItem('blogs', JSON.stringify(initialBlogs));
    } catch (err) {
      console.error('Failed to load blogs:', err);
      const initialBlogs = normalizeBlogs(_blogs.data || []);
      setBlogs(initialBlogs);
      localStorage.setItem('blogs', JSON.stringify(initialBlogs));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClickOpen = (blogId) => () => {
    setId(blogId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirmDelete = () => {
    if (!Array.isArray(blogs)) return;

    const updated = blogs.filter((b) => b.id !== id && b._id !== id);
    setBlogs(updated);
    localStorage.setItem('blogs', JSON.stringify(updated));
    setOpen(false);
  };

  return (
    <>
      {/* Delete Dialog */}
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <DeleteDialog
          onClose={handleClose}
          id={id}
          onConfirm={handleConfirmDelete}
          type="Blog deleted"
          deleteMessage="Are you sure you want to delete this blog? This action cannot be undone."
        />
      </Dialog>

      {/* Table */}
      <Table
        headData={TABLE_HEAD}
        data={{ data: blogs }}
        isLoading={isLoading}
        row={BlogsRow}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}
