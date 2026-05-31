import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
export default function StopsSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={120} />
      <Stack>
        {/* Generating skeleton placeholders for 5 stop options */}
        {[...Array(5)].map((_, index) => (
          <Stack
            key={`stop-skeleton-${index}`}
            direction="row"
            alignItems="center"
          >
            {/* Circular skeleton for icons */}
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
            {/* Text skeleton for stop details */}
            <Skeleton variant="text" width={49} height={18.55} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
