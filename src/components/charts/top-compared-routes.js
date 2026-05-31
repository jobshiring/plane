'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Box,
  Typography,
  Avatar,
  Stack,
  Skeleton,
  LinearProgress,
  useTheme,
} from '@mui/material';

export default function TopComparedRoutes({ data, isLoading }) {
  const theme = useTheme();

  const routes = data && data.length > 0
    ? data
    : [
        { route: 'LHR → DXB', searches: 1234, avgSavings: 52.30 },
        { route: 'JFK → LAX', searches: 1089, avgSavings: 38.50 },
        { route: 'CDG → FCO', searches: 876, avgSavings: 41.20 },
        { route: 'SIN → HND', searches: 754, avgSavings: 67.80 },
        { route: 'SYD → AKL', searches: 621, avgSavings: 29.90 },
      ];

  const maxSearches = Math.max(...routes.map(r => r.searches));

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Top Compared Routes" sx={{ pb: 1 }} />
      
      <Box sx={{ px: 3, pb: 3 }}>
        {isLoading ? (
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={8} sx={{ mt: 1, borderRadius: 1 }} />
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            {routes.map((item, index) => (
              <Box key={index}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        fontSize: '0.75rem',
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      {index + 1}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>
                      {item.route}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {item.searches.toLocaleString()} searches
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: 600,
                        minWidth: 70,
                        textAlign: 'right',
                      }}
                    >
                      Avg. ${item.avgSavings.toFixed(2)} saved
                    </Typography>
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(item.searches / maxSearches) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    bgcolor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 1,
                      bgcolor: theme.palette.primary.main,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Card>
  );
}

TopComparedRoutes.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

TopComparedRoutes.defaultProps = {
  data: [],
  isLoading: false,
};
