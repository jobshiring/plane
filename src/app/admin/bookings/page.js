import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import BookingListComponent from '@/components/_admin/bookings';

// Meta information
export const metadata = {
  title: 'Bookings - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Booking List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Bookings',
          },
        ]}
      />
      <BookingListComponent />
    </div>
  );
}
