import AddBlogs from '@/components/_admin/blogs/add-blog';
import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Blogs list'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Blogs',
            href: '/admin/blogs',
          },
          {
            name: 'Add',
          },
        ]}
      />
      <AddBlogs />
    </div>
  );
}
