import React from 'react';
import GuestGuard from 'src/guards/guest';
import ForgetPasswordMain from 'src/components/_main/auth/forget-password';

export const metadata = {
  title:
    'Forgot Password | React Flights - Reset Your Password and Regain Access',
  description:
    'Forgot your password? Reset it with React Flights for seamless access to your account. Regain control and enjoy hassle-free browsing, secure transactions, and personalized experiences. Get back on track with React Flights now!',
  applicationName: 'React Flights',
  authors: 'React Flights',
  keywords:
    'forgot password, React Flights, reset password, React Flights password recovery, password reset, password recovery, account access, regain access, secure login, secure access, hassle-free login, personalized login, password recovery tool, forgotten password',
};

export default function ForgetPassword() {
  return (
    <GuestGuard>
      <ForgetPasswordMain />
    </GuestGuard>
  );
}
