import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import EditBlogs from '@/components/_admin/blogs/edit-blog';

export default async function Page({ ...props }) {
  const { slug } = await props.params;

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
            name: 'Edit',
          },
        ]}
      />
      <EditBlogs slug={slug} />
    </div>
  );
}
