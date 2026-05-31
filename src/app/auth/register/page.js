import React from 'react';
// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Box, Card, Container, Typography } from '@mui/material';
// components
import RegisterMain from 'src/components/_main/auth/register';
export const metadata = {
  title:
    'Create Your React Flights Account | Join Us for Exclusive Deals and Seamless Shopping',
  description:
    'Register with React Flights today to unlock a world of exclusive deals, personalized recommendations, and secure transactions. Join our community for a seamless shopping experience. Sign up now and elevate your online shopping journey!',
  applicationName: 'React Flights',
  authors: 'React Flights',
  keywords:
    'ecommerce, React Flights, Commerce, Register React Flights, RegisterFrom React Flights',
};

export default function Register() {
  return (
    <GuestGuard>
      <Box my={5}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Register
        </Typography>
        <Typography color="text.secondary" mb={5} textAlign="center">
          Create an account to get started, manage your activity, and enjoy a
          personalized experience.
        </Typography>
        <RegisterMain />
      </Box>
    </GuestGuard>
  );
}
