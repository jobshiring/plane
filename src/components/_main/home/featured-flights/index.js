'use client';

import React from 'react';
import { Typography, Grid, Box, Stack } from '@mui/material';
import RouteCard from 'src/components/cards/route-card';

export default function FeaturedFlights({ data }) {
  return (
    <Stack gap={4}>
      <Box
        sx={{
          textAlign: { md: 'left', xs: 'center' },
        }}
      >
        <Typography variant="h2" color="text.primary" gutterBottom>
          Featured Flights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These alluring destinations are picked just for you.
        </Typography>
      </Box>
      {data?.length ? (
        <Grid container spacing={2} justifyContent="space-around">
          {data.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <RouteCard item={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" color="text.primary" sx={{ mt: 5 }}>
          No flights data found!
        </Typography>
      )}
    </Stack>
  );
}
