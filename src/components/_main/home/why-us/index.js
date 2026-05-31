'use client';

import React from 'react';
import {
  Typography,
  Stack,
  Grid,
  Card,
  Box,
  CardContent,
  alpha,
} from '@mui/material';
import BookingIllustration from '@/components/illustrations/booking';
import ServicesIllustration from '@/components/illustrations/services';
import PaymentIllustration from '@/components/illustrations/payment';
import RefundIllustration from '@/components/illustrations/refund';

const features = [
  {
    name: '24/7 Customer Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions or concerns.',
    vector: <ServicesIllustration />,
  },
  {
    name: 'Booking Confirmation',
    description:
      'Receive instant booking confirmations with all details sent directly to your email and phone.',
    vector: <BookingIllustration />,
  },
  {
    name: 'Flexible Payment',
    description:
      'Choose from multiple payment options including credit cards, PayPal, and bank transfers.',
    vector: <PaymentIllustration />,
  },
  {
    name: 'Refunds within 48 hours',
    description:
      'Get your money back quickly with our hassle-free refund policy within 48 hours of cancellation.',
    vector: <RefundIllustration />,
  },
];

export default function WhyUS() {
  return (
    <Stack sx={{ gap: 4 }}>
      <Box sx={{ textAlign: { md: 'left', xs: 'center' } }}>
        <Typography variant="h2" color="text.primary" gutterBottom>
          Why Choose Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover the advantages that make us your trusted travel partner.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="space-around">
        {features.map((feature) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={feature.name}>
            <Box
              sx={{
                position: 'relative',
                pt: 1,
                perspective: '1200px',
              }}
            >
              <Card
                sx={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',

                  '&:hover': {
                    transform: 'rotateX(-6deg) rotateY(8deg)', // top-right → bottom-left
                  },
                }}
              >
                <CardContent
                  sx={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Stack gap={1} alignItems="center">
                    <Box sx={{ height: 200, width: 200 }}>{feature.vector}</Box>
                    <Typography
                      textAlign="center"
                      variant="h6"
                      color="text.primary"
                    >
                      {feature.name}
                    </Typography>
                    <Typography
                      textAlign="center"
                      variant="subtitle2"
                      fontWeight={500}
                      color="text.secondary"
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  zIndex: -1,
                  height: { xs: 90, md: 110 },
                  width: { xs: 90, md: 110 },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                  borderRadius: '75% 75% 10% 75%',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: -1,
                  height: { xs: 90, md: 110 },
                  width: { xs: 90, md: 110 },
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                  borderRadius: '75% 75% 10% 75%',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
