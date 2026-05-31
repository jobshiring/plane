'use client';

import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  alpha,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';
import { MdOpenInNew } from 'react-icons/md';
import { MdFlightTakeoff } from 'react-icons/md';

export default function PriceComparisonGrid({
  prices = [],
  isLoading = false,
  airlineLogo = null,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sort prices by lowest first
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0]?.price;

  const handleBookClick = (bookingUrl) => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 1.5,
          mt: 2,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            height={72}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 1.5, fontWeight: 600 }}
      >
        Compare prices from {sortedPrices.length} providers
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 1.5,
        }}
      >
        {sortedPrices.map((priceItem, index) => {
          const isBestPrice = priceItem.price === lowestPrice;
          const isDirect = priceItem.providerId === 'direct';
          const logoSrc = isDirect ? airlineLogo : priceItem.logo;

          return (
            <Box
              key={priceItem.providerId}
              sx={{
                position: 'relative',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isBestPrice
                  ? 'success.main'
                  : theme.palette.divider,
                bgcolor: isBestPrice
                  ? alpha(theme.palette.success.main, 0.04)
                  : 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: isBestPrice
                    ? 'success.main'
                    : theme.palette.primary.main,
                  boxShadow: theme.shadows[2],
                },
              }}
            >
              {isBestPrice && (
                <Chip
                  label="Best Price"
                  size="small"
                  color="success"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: 8,
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                />
              )}

              <Stack spacing={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {logoSrc ? (
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          position: 'relative',
                          borderRadius: 1,
                          overflow: 'hidden',
                          bgcolor: 'background.default',
                        }}
                      >
                        <Image
                          src={logoSrc}
                          alt={priceItem.providerName}
                          fill
                          sizes="28px"
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1,
                          bgcolor: alpha(priceItem.color || '#1976d2', 0.1),
                          color: priceItem.color || 'primary.main',
                        }}
                      >
                        <MdFlightTakeoff size={16} />
                      </Box>
                    )}
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      noWrap
                      sx={{ maxWidth: 80 }}
                    >
                      {priceItem.providerName}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color={isBestPrice ? 'success.main' : 'text.primary'}
                  >
                    {priceItem.currency} {priceItem.price.toLocaleString()}
                  </Typography>
                </Stack>

                <Button
                  variant={isBestPrice ? 'contained' : 'outlined'}
                  color={isBestPrice ? 'success' : 'primary'}
                  size="small"
                  fullWidth
                  endIcon={<MdOpenInNew size={14} />}
                  onClick={() => handleBookClick(priceItem.bookingUrl)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 0.5,
                  }}
                >
                  Book Now
                </Button>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
