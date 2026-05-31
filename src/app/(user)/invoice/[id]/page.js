import React from 'react';
import { Box } from '@mui/material';
import BookingPDF from '@/components/cards/booking-pdf';
import staticData from 'src/static/data.json';
import { _bookings } from 'src/_mock/booking';
import { _paymentGateways } from 'src/_mock/payment';

export default async function Invoice({ params }) {
  const { id } = await params;
  const booking = _bookings.data.find((b) => b._id === id);

  return (
    <Box my={4}>
      <BookingPDF
        id={id}
        data={booking}
        paymentGateway={_paymentGateways.data}
        logoData={{
          ...staticData.mainSettings,
          ...staticData.languageAndCurrencies,
        }}
      />
    </Box>
  );
}
