'use client';
import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Grid, Skeleton } from '@mui/material';

import { alpha } from '@mui/material';

export default function FlightSearch({ ...props }) {
  const { isRoundTrip } = props;
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(4px)',
      }}
    >
      {' '}
      <Stack
        gap={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 2,
          flexDirection: {
            sm: 'row',
            xs: 'column',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={72} />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={72} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width={200} height={40} />
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid
            size={{
              xs: 12,
              md: isRoundTrip ? 5.6 : 6,
            }}
          >
            <Stack direction="row" gap={2}>
              <Skeleton variant="rounded" width={'100%'} height={56} />
              <Skeleton variant="rounded" width={'100%'} height={56} />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: isRoundTrip ? 3 : 2 }}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid size={{ xs: 12, sm: 10, md: isRoundTrip ? 2.6 : 3.2 }}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid size={{ xs: 12, sm: 2, md: 0.8 }}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
