'use client';

import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { Stack, Grid, Box, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import FeaturedPartners from 'src/components/_main/home/featured-partners';
import FlightSearchSkeleton from '@/components/skeletons/home/flight-search-skeleton';

const HeroSearch = dynamic(
  () => import('src/components/_main/home/hero/hero-search'),
  {
    loading: () => <FlightSearchSkeleton />,
  }
);

export default function Hero({ data }) {
  return (
    <Box>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction="column"
              sx={{
                position: 'relative',
                justifyContent: 'center',
                height: '100%',
                py: 7,
              }}
            >
              <Stack
                sx={{
                  position: 'relative',
                  alignItems: { md: 'start', xs: 'center' },
                  textAlign: { md: 'left', xs: 'center' },
                }}
                direction="column"
                gap={2}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  color="text.primary"
                  lineHeight={1}
                >
                  Book Your Next Adventure
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  color="text.secondary"
                >
                  Explore the world with amazing flight deals. Find the best
                  flights, compare prices, and book your trip with ease on
                  ReactFlights.
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    a: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textDecoration: 'none',
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/about"
                  >
                    About Us
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={Link}
                    href="/contact"
                  >
                    Contact Us
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <HeroSearch />
          </Grid>
        </Grid>
      </Box>
      <FeaturedPartners data={data} />
    </Box>
  );
}
