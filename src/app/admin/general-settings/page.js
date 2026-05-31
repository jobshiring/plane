import ThemeSetting from '@/components/_admin/theme-setting';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import React from 'react';
// components

// Meta information
export const metadata = {
  title: 'General Settings - ReactFlights',
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
            name: 'General Settings',
          },
        ]}
      />
      <ThemeSetting />
    </>
  );
}
