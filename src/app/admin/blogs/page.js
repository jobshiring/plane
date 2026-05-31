import React from 'react';

// Components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import BlogsList from '@/components/_admin/blogs';

// Meta information
export const metadata = {
  title: 'Blogs - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default function Blogs() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading='Blogs List'
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin',
          },
          {
            name: 'Blogs',
          },
        ]}
        action={{ title: 'Add Blog', href: '/admin/blogs/add' }}
      />
      <BlogsList />
    </>
  );
}
