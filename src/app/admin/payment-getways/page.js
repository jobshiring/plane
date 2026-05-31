import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import PaymentListComponent from '@/components/_admin/payment-getways';

// Meta information
export const metadata = {
  title: 'Payment Getways - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Payment Getways List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Payment Getways',
          },
        ]}
      />
      <PaymentListComponent />
    </div>
  );
}
