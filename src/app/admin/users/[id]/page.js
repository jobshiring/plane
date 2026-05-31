'use client';

import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';
import UsersDetails from 'src/components/_admin/users/user-details';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();

  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="User Details"
        links={[
          { name: 'Dashboard', href: '/admin' },
          { name: 'Users', href: '/admin/users' },
          { name: 'Users details' },
        ]}
      />
      <UsersDetails id={id} />
    </>
  );
}
