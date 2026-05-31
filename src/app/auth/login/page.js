import React from 'react';
// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Stack, Box, Typography } from '@mui/material';
// components
import LoginMain from 'src/components/_main/auth/login';

export const metadata = {
  title:
    'Login to React Flights | Your Gateway to Seamless Shopping and Secure Transactions',
  description:
    'Log in to React Flights for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
  applicationName: 'React Flights',
  authors: 'React Flights',
  keywords:
    'ecommerce, React Flights, Commerce, Login React Flights, LoginFrom React Flights',
};

export default function Login() {
  return (
    <GuestGuard>
      <Box my={5}>
        <Stack mb={5} spacing={2}>
          <Typography
            textAlign="center"
            variant="h4"
            component="h1"
            gutterBottom
          >
            Log In
          </Typography>
          <Typography textAlign="center" color="text.secondary">
            Log in to access your account, manage your activity, and continue
            where you left off.
          </Typography>
        </Stack>
        <LoginMain />
      </Box>
    </GuestGuard>
  );
}
