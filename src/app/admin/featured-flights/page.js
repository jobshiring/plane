import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import FlightRoutesListComponent from '@/components/_admin/featured-flights';

// Meta information
export const metadata = {
  title: 'Featured Flights - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Featured Flights Airport list"
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Featured Flights Airport',
          },
        ]}
        action={{
          title: 'Add Featured Flight',
          href: '/admin/featured-flights/add',
        }}
      />
      <FlightRoutesListComponent />
    </div>
  );
}
