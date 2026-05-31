'use client';
import React from 'react';
// mui
import { Card, Container, Stack, Typography } from '@mui/material';
// next
import dynamic from 'next/dynamic';
// skeleton
import ChangePasswordSkeleton from '@/components/_main/skeletons/auth/change-password/change-password';

// dynamic import for password form
const AccountChangePassword = dynamic(
  () => import('@/components/_main/profile/edit/account-change-password'),
  {
    loading: () => <ChangePasswordSkeleton />,
  }
);

export default function ChangePassword() {
  return (
    <Container>
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
  );
}
