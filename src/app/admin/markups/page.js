import React from 'react';

// Components
import MarkupList from '@/components/_admin/markups';
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

// Meta information
export const metadata = {
  title: 'Markups - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default function Markups() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading='Markups List'
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin',
          },
          {
            name: 'Markups',
          },
        ]}
      />
      <MarkupList />
    </>
  );
}
