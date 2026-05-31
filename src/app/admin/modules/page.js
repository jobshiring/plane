import React from 'react';
// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import ModulesListComponent from '@/components/_admin/modules';

// Meta information
export const metadata = {
  title: 'Modules - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default async function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Modules List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'Modules',
          },
        ]}
      />
      <ModulesListComponent />
    </div>
  );
}
