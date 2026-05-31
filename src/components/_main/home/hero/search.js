'use client';

import React from 'react';
import { Box, Stack, alpha, Fab, useMediaQuery } from '@mui/material';
import { BsAirplaneEngines } from 'react-icons/bs';
import HeroCard from 'src/components/cards/hero-card';

const modules = [
  {
    name: 'flights',
    icon: <BsAirplaneEngines />,
  },
];

export default function HeroSearch({ data }) {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ pt: 2.4, position: 'relative' }}>
      <Stack
        direction="row"
        gap={1}
        sx={{
          bgcolor: 'background.paper',
          position: 'absolute',
          top: 0,
          left: '24px',
          p: 0.5,
          zIndex: 11,
          borderRadius: '27px',
          border: (theme) => '1px solid ' + theme.palette.divider,
        }}
      >
        {modules.map((module) => (
          <Fab
            variant={isSmallScreen ? 'circular' : 'extended'}
            color="inherit"
            disableTouchRipple
            sx={{
              textTransform: 'uppercase',
              fontSize: 14,
              fontWeight: 600,
              svg: { mr: isSmallScreen ? 0 : 1 },
              bgcolor: 'transparent',
              boxShadow: 'none',
            }}
            size="small"
            key={module.name}
          >
            {module.icon} {isSmallScreen ? null : module.name}
          </Fab>
        ))}
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: -1,
          height: { xs: 120, md: 180 },
          width: { xs: 120, md: 180 },
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: -1,
          height: { xs: 120, md: 180 },
          width: { xs: 120, md: 180 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
          borderRadius: '10% 75% 75% 75%',
        }}
      />
      <HeroCard data={data} />
    </Box>
  );
}
