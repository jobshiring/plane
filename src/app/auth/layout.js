import React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Image from 'next/image';
import Logo from '@/components/logo';
import Link from 'next/link';

export default function UserLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* FIXED IMAGE (DESKTOP ONLY) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'fixed',
          top: 0,
          left: 0,
          width: '58%',
          height: '100vh',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 999,
            ml: 5,
            mt: 2,
          }}
        >
          <Logo />
        </Box>
        <Image
          src="/auth-bg.jpg"
          alt="Auth background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {/* SCROLLABLE CONTENT */}
      <Box
        sx={{
          ml: { md: '58%' },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="sm">{children}</Container>
      </Box>
    </Box>
  );
}
