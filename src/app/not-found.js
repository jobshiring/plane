// app/not-found.tsx
'use client';

import React from 'react';
import { Typography, Button, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        sx={{ minHeight: '100vh', textAlign: 'center' }}
      >
        <Image
          src="/images/logo/logo.png"
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 1, md: 1 }}
        >
          <Typography
            variant="h1"
            component="h1"
            color="secondary.main"
            sx={{ fontStyle: 'italic' }}
          >
            404
          </Typography>
          <Typography variant="h5">Oops! Page not found</Typography>
          <Typography variant="body1" color="text.secondary">
            The page you are looking for does not exist or has been moved.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
        >
          Go Back Home
        </Button>
      </Stack>
    </Container>
  );
}
