// 'use client';
import React from 'react';
// guard
import AuthGuard from 'src/guards/auth';
// mui
import { Box } from '@mui/material';
// components
import OTPMain from '@/components/_main/auth/otp';

// Meta information
export const metadata = {
  title:
    'Verify Your Email with React Flights | Confirm Your Account for Secure Shopping',
  description:
    'Complete the email verification process at React Flights to ensure a secure and personalized shopping experience. Confirm your account and gain access to exclusive features. Shop confidently with a verified email. Verify now!',
  applicationName: 'React Flights',
  authors: 'React Flights',
  keywords:
    'ecommerce, React Flights, Commerce, VerifyEmail React Flights, VerifyEmail Page React Flights',
};

export default function VerifyOTP() {
  return (
    <AuthGuard>
      <Box className='auth-pages'>
        <OTPMain />
      </Box>
    </AuthGuard>
  );
}
