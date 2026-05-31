import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
export default function AirlinesSkeleton() {
  return (
    <Box>
      {/* Skeleton placeholder for the title */}
      <Skeleton variant="text" width={120} />
      <Stack>
        {/* Generating skeleton placeholders for 10 airline options */}
        {[...Array(10)].map((_, index) => (
          <Stack
            key={`airline-skeleton-${index}`}
            direction="row"
            alignItems="center"
          >
            {/* Circular skeleton for airline logos */}
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
            {/* Text skeleton for airline names */}
            <Skeleton variant="text" width={49} height={18.55} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
