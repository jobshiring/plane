import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import FeaturedPartnersComponent from '@/components/_admin/featured-partners';

// Meta information
export const metadata = {
  title: 'Featured Partners - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Featured Partners List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Featured Partners',
          },
        ]}
      />
      <FeaturedPartnersComponent />
    </div>
  );
}
