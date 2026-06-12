import React from 'react';
import { Card, CardContent, Alert, useTheme } from '@mui/material';
import FlightSearchForm from 'src/components/forms/flight-search-form';
import HotelSearchForm from 'src/components/forms/hotel-search';

export default function HeroCard() {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        position: 'static',
        pt: 3,
      }}
    >
      <CardContent>
        <FlightSearchForm />
        <div style={{ height: 12 }} />
        <HotelSearchForm />
      </CardContent>
    </Card>
  );
}
