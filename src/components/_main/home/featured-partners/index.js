'use client';

import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  alpha,
  Tooltip,
  Stack,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import { priceProviders } from '@/_mock/price-providers';

export default function FeaturedPartners({ data }) {
  // Filter out the 'direct' provider as it doesn't have its own logo
  const comparisonProviders = priceProviders.filter((p) => p.id !== 'direct');

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <Card sx={{ position: 'static', overflow: 'visible' }}>
          <CardHeader
            title="Powered by Leading Travel Sites"
            sx={{
              textTransform: 'uppercase',
              position: 'absolute',
              top: -13,
              left: 22,
              bgcolor: 'background.paper',
              py: 0.5,
              px: 1.5,
              borderRadius: '17px',
              border: (theme) => '1px solid ' + theme.palette.divider,
              span: {
                fontSize: 10,
              },
            }}
          />
          <CardContent>
            <Stack spacing={3}>
              {/* Comparison Providers */}
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: 'block', textAlign: 'center' }}
                >
                  Compare prices from
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                  {comparisonProviders.map((provider) => (
                    <Grid key={provider.id} size={{ xs: 4, sm: 2, md: 'auto' }}>
                      <Tooltip title={provider.name} arrow>
                        <Box
                          sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            height: 40,
                            width: 60,
                            mx: 2,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            src={provider.logo}
                            alt={provider.name}
                            fill
                            sizes="60px"
                            style={{ objectFit: 'contain' }}
                            priority
                          />
                        </Box>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {data?.length > 0 && (
                <>
                  <Divider>
                    <Typography variant="caption" color="text.secondary">
                      Airlines
                    </Typography>
                  </Divider>

                  {/* Airline Partners */}
                  <Grid container justifyContent="center" spacing={2}>
                    {data.map((item, index) => (
                      <Grid key={index} size={{ xs: 3, sm: 2, md: 1 }}>
                        <Tooltip title={item.name} arrow>
                          <Box
                            sx={{
                              position: 'relative',
                              overflow: 'hidden',
                              height: 60,
                              width: 60,
                              mx: 2,
                              cursor: 'pointer',
                            }}
                          >
                            <Image
                              src={item.cover.url}
                              alt={item.name}
                              fill
                              sizes="60px"
                              style={{ objectFit: 'contain' }}
                              priority
                            />
                          </Box>
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
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
      </Box>
    </Box>
  );
}
