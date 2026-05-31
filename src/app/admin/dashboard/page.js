import React from 'react';

// components
import Dashboard from '@/components/_admin/dashboard';

// Meta information
export const metadata = {
  title: 'ReactFlights - Dashboard',
  description:
    'Welcome to the ReactFlights Dashboard. Manage your traveling operations with ease.',
  applicationName: 'ReactFlights Dashboard',
  authors: 'ReactFlights',
  keywords: 'dashboard, flights, management, ReactFlights',
  icons: {
    icon: '/favicon.png',
  },
};

export default function page() {
  return <Dashboard />;
}
