'use client';

import React, { useState, useEffect } from 'react';
import BlogForm from '@/components/forms/blogs';

export default function EditBlogs({ slug }) {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

      const foundBlog = savedBlogs.find((b) => b.slug === slug) || null;

      setBlog(foundBlog);

      if (!foundBlog) {
        console.warn(`Blog with slug "${slug}" not found`);
      }
    } catch (error) {
      console.error('Error loading blog:', error);
      setBlog(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  return (
    <BlogForm
      currentBlog={blog}
      isLoading={isLoading}
    />
  );
}
