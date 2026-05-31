import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import AddReview from '@/components/_admin/reviews/add-review';

export default function Page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Add Review List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Add Review',
            href: '/admin/currencies',
          },
          {
            name: 'Add Review',
          },
        ]}
      />
      <AddReview />
    </div>
  );
}
