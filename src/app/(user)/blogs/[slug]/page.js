'use client';
import React from 'react';
import BlogDetail from '@/components/_main/blogs/blog-detail';

export default function Page({ params }) {
  const { slug } = React.use(params);
  return <BlogDetail slug={slug || ''} />;
}
