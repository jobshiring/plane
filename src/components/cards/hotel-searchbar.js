import React from 'react';

// Material-UI (MUI) components
import { Card, alpha } from '@mui/material';

import HotelSearchForm from '../forms/hotel-searchbar';

export default function HotelSearchBar({ params }) {
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
      <HotelSearchForm params={params} />
    </Card>
  );
}
