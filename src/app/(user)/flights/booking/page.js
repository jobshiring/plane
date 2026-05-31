'use client';
import { Container } from '@mui/material';
import React from 'react';
import Booking from '@/components/_main/booking/booking';

export default function BookingPage() {
  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Booking />
    </Container>
  );
}
