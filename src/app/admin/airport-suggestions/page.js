import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import AirportSuggestionsListComponent from '@/components/_admin/airport-suggestions';

// Meta information
export const metadata = {
  title: 'Airport Suggestions - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Airport Suggestion List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Airport Suggestions',
          },
        ]}
      />
      <AirportSuggestionsListComponent />
    </div>
  );
}
