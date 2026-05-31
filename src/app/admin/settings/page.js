import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import React from 'react';
// components
import AccountGeneral from 'src/components/_main/profile/edit/account-general';

// Meta information
export const metadata = {
  title: 'Setting - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default function page() {
  return (
    <>
      <HeaderBreadcrumbs
        heading='Dashboard'
        admin
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Settings',
          },
        ]}
      />
      <AccountGeneral />
    </>
  );
}
