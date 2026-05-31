'use client';

import React from 'react';
import EditReview from '@/components/_admin/reviews/edit-review';
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

export default function Page(props) {
  const params = React.use(props.params);
  const { id } = params;

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Edit Review List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Edit Review',
            href: '/admin/reviews',
          },
          {
            name: 'Edit Review',
          },
        ]}
      />
      <EditReview id={id} />
    </div>
  );
}
