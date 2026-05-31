'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, Badge, Box, CardActionArea, Chip } from '@mui/material';
import { LuPlane } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';
import { fDateShort } from 'src/utils/formatTime';

function formatDate(date) {
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(date).getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function RouteCard({ item }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          transition: 'border-color 0.3s ease',

          '&:hover': {
            borderColor: (theme) => theme.palette.primary.main + '!important',

            '.plane-icon': {
              animation:
                'plane-smooth-fly 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            },
          },

          '@keyframes plane-smooth-fly': {
            '0%': {
              transform: 'translate(0, 0) rotate(0deg)',
            },
            '25%': {
              transform: 'translate(4px, -4px) rotate(4deg)', // top-right
            },
            '50%': {
              transform: 'translate(8px, -8px) rotate(6deg)', // peak
            },
            '75%': {
              transform: 'translate(4px, -4px) rotate(4deg)',
            },
            '100%': {
              transform: 'translate(0, 0) rotate(0deg)',
            },
          },
        }}
      >
        <CardActionArea
          component={Link}
          href={`/flights/${item?.departure.city
            .toLocaleLowerCase()
            .split(' ')
            .join(
              '_'
            )}-${item?.departure.iataCode.toLocaleLowerCase()}/${item?.arrival.city
            .toLocaleLowerCase()
            .split(' ')
            .join('_')}-${item?.arrival.iataCode.toLocaleLowerCase()}/${
            item?.tripType
          }/economy/1/0/0/${formatDate(item?.departureDate)}${
            item?.tripType === 'round'
              ? '/' + formatDate(item?.arrivalDate)
              : ''
          }`}
        >
          <Box
            sx={{
              position: 'relative',
              height: 240,
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={require(`public/images/cities/${item?.arrival.city}.jpg`)}
              alt="flights"
              fill
              objectFit="cover"
              placeholder="blur"
              priority
            />
            <Chip
              color={4 >= item?.totalSeats ? 'warning' : 'info'}
              size="small"
              label={
                4 >= item?.totalSeats
                  ? `Only ${item?.totalSeats} Seats Left`
                  : `${item?.totalSeats} Seats Available`
              }
              sx={{
                position: 'absolute',
                left: 2,
                bottom: 5,
                borderRadius: 0.5,
              }}
            />
          </Box>
          <CardContent sx={{ p: 2 }}>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {item?.departure.city} To {item?.arrival.city}
            </Typography>
            <Stack>
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  gap={1}
                  sx={{
                    svg: {
                      color: 'primary.main',
                    },
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    noWrap
                    color="text.secondary"
                  >
                    {item?.departure.iataCode}
                  </Typography>
                  <LuPlane
                    size={20}
                    className="plane-icon"
                    style={{
                      willChange: 'transform',
                      transition: 'transform 0.2s linear',
                    }}
                  />

                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    noWrap
                    color="text.secondary"
                  >
                    {item?.arrival.iataCode}
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  {item.tripType === 'oneway' ? 'One way' : 'Return'}
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {fDateShort(item.departureDate)}{' '}
                {item.tripType === 'oneway' ? '' : ' - '}{' '}
                {item.tripType !== 'oneway'
                  ? fDateShort(item.arrivalDate)
                  : null}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          zIndex: -1,
          height: { xs: 60, md: 90 },
          width: { xs: 60, md: 90 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 60,
          left: 40,
          zIndex: -1,
          height: { xs: 60, md: 90 },
          width: { xs: 60, md: 90 },
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.5),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
    </Box>
  );
}
