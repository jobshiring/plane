import React from 'react';
import {
  Card,
  Stack,
  Skeleton,
  Grid,
  Box,
  alpha,
  CardContent,
} from '@mui/material';

export default function FlightSearchSkeleton() {
  return (
    <Box sx={{ pt: 2.4, position: 'relative' }}>
      <Stack
        direction="row"
        gap={0.5}
        sx={{
          bgcolor: 'background.paper',
          position: 'absolute',
          top: 0,
          left: 24,
          p: 0.5,
          zIndex: 11,
          borderRadius: '27px',
          overflow: 'hidden',
          border: (theme) => '1px solid ' + theme.palette.divider,
          span: {
            borderRadius: '27px',
          },
        }}
      >
        <Skeleton variant="rounded" width={100.6} height={32} />
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: -1,
          height: { xs: 120, md: 80 },
          width: { xs: 120, md: 80 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: -1,
          height: { xs: 30, md: 80 },
          width: { xs: 30, md: 80 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
          borderRadius: '10% 75% 75% 75%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: -1,
          height: { xs: 120, md: 80 },
          width: { xs: 120, md: 80 },
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.5),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
      <Card
        sx={{
          position: 'static',
          pt: 3,
        }}
      >
        <CardContent>
          <Stack
            gap={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              flexDirection: {
                sm: 'row',
                xs: 'column',
              },
            }}
          >
            <Stack direction="row" gap={2}>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                >
                  <Skeleton variant="circular" width={24} height={24} />
                </Stack>
                <Skeleton variant="text" width={49} height={18.55} />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                  justifyContent="center"
                >
                  <Skeleton variant="circular" width={24} height={24} />
                </Stack>
                <Skeleton variant="text" width={49} height={18.85} />
              </Stack>
            </Stack>

            <Skeleton variant="rounded" width={200} height={40} />
          </Stack>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Stack direction="row" gap={2}>
                  <Skeleton variant="rounded" width="100%" height={56} />
                  <Skeleton variant="rounded" width="100%" height={56} />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rounded" width="100%" height={56} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rounded" width="100%" height={56} />
              </Grid>
              <Grid size={12}>
                <Skeleton variant="rounded" width="100%" height={56} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
