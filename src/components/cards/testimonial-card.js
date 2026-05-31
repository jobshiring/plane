import React from 'react';
import {
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
  Box,
  alpha,
} from '@mui/material';
import Image from 'next/image';

export default function TestimonialCard({ item }) {
  return (
    <Box
      sx={{
        position: 'relative',
        perspective: '1200px',
      }}>
      <Card
        sx={{
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',

          '&:hover': {
            transform: 'rotateX(8deg) rotateY(-8deg)', // top-left & bottom-right
          },
        }}>
        <CardContent
          sx={{
            backfaceVisibility: 'hidden',
          }}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            mb={2}>
            <Image
              src={item.cover.url}
              alt={item.name}
              height={40}
              width={40}
              style={{
                objectFit: 'cover',
                borderRadius: '50px',
              }}
              priority
            />

            <Stack>
              <Rating
                size='small'
                precision={0.5}
                value={item?.rating}
                readOnly
              />
              <Typography variant='subtitle1'>{item?.role}</Typography>
            </Stack>
          </Stack>
          <Typography variant='h5'> {item?.name.slice(0, 25)}</Typography>
          <Typography
            variant='body1'
            color='text.secondary'>
            {item?.comment.slice(0, 150)}
            {item?.comment.length > 150 && '...'}
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: -1,
          height: { xs: 60, md: 90 },
          width: { xs: 60, md: 90 },
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
          borderRadius: '75% 75% 10% 75%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: -1,
          height: { xs: 60, md: 90 },
          width: { xs: 60, md: 90 },
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
          borderRadius: '10% 75% 75% 75%',
        }}
      />
    </Box>
  );
}
