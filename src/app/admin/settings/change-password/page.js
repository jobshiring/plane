'use client';

import React from 'react';
// mui
import { Card, Container, Stack, Typography } from '@mui/material';

// components
import AccountChangePassword from 'src/components/_main/profile/edit/account-change-password';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';

export default function Page() {
  return (
    <div>
      <HeaderBreadcrumbs
        heading='Dashboard'
        admin
        links={[
          { name: 'Dashboard', href: '/admin' },
          { name: 'Settings', href: '/admin/settings' },
          { name: 'Change Password' },
        ]}
      />
      <Container maxWidth='sm'>
        <Card
          sx={{
            maxWidth: 560,
            m: 'auto',
            my: '80px',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 3,
          }}>
          <Stack mb={5}>
            <Typography
              textAlign='center'
              variant='h4'
              component='h1'
              gutterBottom>
              Change Password
            </Typography>
            <Typography
              textAlign='center'
              color='text.secondary'>
              Change your password by logging into your account.
            </Typography>
          </Stack>
          <AccountChangePassword />
        </Card>
      </Container>
    </div>
  );
}
