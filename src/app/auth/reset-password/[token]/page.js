import React from 'react';
// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Container, Typography, Card } from '@mui/material';
// component
import ResetPasswordMain from 'src/components/_main/auth/reset-password';

export default async function ResetPassword({ params }) {
  const { token } = await params;

  return (
    <GuestGuard>
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
          <Typography
            textAlign='center'
            mb={1}
            variant='h4'
            gutterBottom>
            Reset Password
          </Typography>
          <Typography
            color='text.secondary'
            mb={5}
            textAlign='center'
            lineHeight={0.9}>
            Enter your new password
          </Typography>
          <ResetPasswordMain token={token} />
        </Card>
      </Container>
    </GuestGuard>
  );
}
