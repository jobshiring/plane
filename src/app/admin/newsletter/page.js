import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import NewsletterList from 'src/components/_admin/newsletter/newsletter-list';

// Meta information
export const metadata = {
  title: 'Newsletter - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};
export default function page() {
  return (
    <div>
      {' '}
      <HeaderBreadcrumbs
        admin
        heading='Newsletter List'
        links={[
          {
            name: 'Dashboard',
            href: '/admin',
          },
          {
            name: 'newsletter',
          },
        ]}
      />
      <NewsletterList />
    </div>
  );
}
