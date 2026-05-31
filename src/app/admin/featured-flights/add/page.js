import React from 'react';

// components
import AddFlightRoute from '@/components/_admin/featured-flights/add-route';

import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Featured Flights Airport list'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Featured Flights Airport',
            href: '/admin/featured-flights',
          },
          {
            name: 'Featured Flights',
          },
        ]}
      />
      <AddFlightRoute />
    </div>
  );
}
