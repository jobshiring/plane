'use client';

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Stack, Skeleton, Typography, Container } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';

const CurrencySelect = dynamic(
  () => import('src/components/selects/currencySelect'),
  {
    loading: () => <Skeleton variant="rounded" width={64} height={24} />,
  }
);

export default function TopBar({ currencies }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { md: 'block', xs: 'none' },
      }}
    >
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 0,
          boxShadow: 'none',
          bgcolor: 'background.paper',
          borderBottom: (theme) => '1px solid ' + theme.palette.divider,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" gap={1} alignItems="center" height={28}>
            <Stack direction="row" gap={2}>
              <Typography
                component={Link}
                href="mailto:info@reactflights.com"
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <FiPhoneCall size={14} />
                info@vliegtickets.ai
              </Typography>
              <Typography
                component={Link}
                href="tel:923035501602"
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  lineHeight: 0,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <MdOutlineEmail size={18} />
                +92 303 550 1602
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" gap={1} alignItems="center">
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  height: 32,
                }}
              >
                <CurrencySelect isTop data={currencies} />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </AppBar>
    </Box>
  );
}

TopBar.propTypes = {
  currencies: PropTypes.array.isRequired,
};
