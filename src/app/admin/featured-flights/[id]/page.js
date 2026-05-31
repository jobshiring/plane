import React from 'react';

// components
import EditFlightRoute from '@/components/_admin/featured-flights/edit-route';
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Featured Flights Airport list"
        links={[
          { name: 'Dashboard', href: '/admin' },
          { name: 'Featured Flights Airport', href: '/admin/featured-flights' },
          { name: 'Edit Flight' },
        ]}
      />
      <EditFlightRoute id={id} />
    </div>
  );
}
