import React from 'react';

// Components
import CurrencyList from 'src/components/_admin/currencies/currency-list';
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

// Meta information
export const metadata = {
  title: 'Currencies - ReactFlights',
  applicationName: 'ReactFlights ',
  authors: 'ReactFlights',
};
export default function Currencies() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading='Currencies List'
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin',
          },
          {
            name: 'Currencies',
          },
        ]}
      />
      <CurrencyList />
    </>
  );
}
