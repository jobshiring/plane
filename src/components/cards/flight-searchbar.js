'use client';

import React from 'react';
import { Card, alpha } from '@mui/material';
import FlightSearchForm from '../forms/flight-search-form';
export default function FlightSearchCard(props) {
  const { slug } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 2,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(4px)',
      }}
    >
      <FlightSearchForm slug={slug} />
    </Card>
  );
}
