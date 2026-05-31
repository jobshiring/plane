'use client';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import {
  CardContent,
  Card,
  Typography,
  Stack,
  Grid,
  alpha,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { SlLocationPin } from 'react-icons/sl';

import Map from './map';
import CheckInOut from './check-in-out';
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function Details() {
  const value = 4.5;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            size={{
              md: 8,
              xs: 12,
            }}
          >
            {' '}
            <Stack gap={1}>
              <Stack sx={{ width: 200 }} direction="row" alignItems="center">
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                />
                <Box sx={{ ml: 2 }}>{labels[value]}</Box>
              </Stack>
              <Typography
                variant="h3"
                color="text.primary
        "
              >
                Makkah Clock Royal Tower, A Fairmont Hotel
              </Typography>

              <Stack direction="row" alignItems="center" gap={0.7}>
                <SlLocationPin fontSize={18} />
                <Typography variant="subtitle1" color="text.secondary">
                  King Abdul Aziz Endownment
                </Typography>
              </Stack>
              <CheckInOut />
            </Stack>
          </Grid>
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Map />
          </Grid>
        </Grid>
      </CardContent>
      <Grid
        container
        // spacing={2}
        sx={{
          bgcolor: 'primary.main',
          px: 3,
          py: 2,
        }}
      >
        {[
          {
            name: 'Location',
            reviews: 3000,
            rating: '4.7',
          },
          {
            name: 'Food',
            reviews: 3000,
            rating: '4.7',
          },
          {
            name: 'Service',
            reviews: 3000,
            rating: '4.7',
          },
          {
            name: 'Breakfast',
            reviews: 3000,
            rating: '4.7',
          },
        ].map((item, i) => (
          <Grid
            size={{
              md: 3,

              xs: 6,
            }}
            key={item.name + i}
          >
            <Stack
              gap={1}
              direction={'row'}
              alignItems={'center'}
              key={item.name + i}
            >
              {i !== 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: alpha('#fff', 0.2),
                    mr: 2,
                    // opacity: i !== 0 ? 1 : 0,
                  }}
                />
              )}

              <Avatar
                sx={{
                  height: 60,
                  width: 60,
                  fontWeight: 600,
                  bgcolor: (_theme) => alpha('#fff', 0.1),
                  fontSize: 24,
                  color: 'common.white',
                }}
              >
                {item.rating}
              </Avatar>
              <Stack>
                <Typography variant="h4" color="common.white">
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  color={(theme) => theme.palette.grey[300]}
                >
                  {item.reviews} Reviews
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
