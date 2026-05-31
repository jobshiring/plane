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
} from '@mui/material';
import Image from 'next/image';

export default function FeaturedPartners({ data }) {
  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <Card sx={{ position: 'static', overflow: 'visible' }}>
          <CardHeader
            title="Featured Partners"
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
            {data?.length ? (
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
            ) : (
              <Typography variant="h3" color="text.primary">
                No partners data found!
              </Typography>
            )}
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
