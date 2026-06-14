import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import ReviewsListComponent from '@/components/_admin/reviews';

// Meta information
export const metadata = {
  title: 'Reviews - Vliegtickets AI',
  applicationName: 'VliegticketsAI',
  authors: 'Vliegtickets AI',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Reviews List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Reviews',
          },
        ]}
        action={{ title: 'Add Review', href: '/admin/reviews/add' }}
      />
      <ReviewsListComponent />
    </div>
  );
}
