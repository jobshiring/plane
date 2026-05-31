'use client'; // Ensures this component is rendered only on the client side (required in Next.js App Router)

// Core React import
import React from 'react'; // Provides the ability to use JSX and create components

// UI library components
import { Box } from '@mui/material'; // MUI Box component for layout and styling

// Routing and progress bar integration
import { useRouter } from '@bprogress/next'; // Custom hook to access Next.js router with integrated progress bar

// Optimized image component from Next.js
import Image from 'next/image'; // Handles image optimization and responsive loading

// Redux integration
import { useSelector, darkMode } from '@/redux'; // Custom Redux hooks/selectors for accessing state, specifically dark mode preference

// Static image imports (used as logos)
import LogoLight from 'public/images/logo/logo-light.png'; // Logo for light mode
import LogoDark from 'public/images/logo/logo-dark.png'; // Logo for dark mode
import OnlyLogo from 'public/images/logo/logo.png'; // Standalone logo image (used generically)
export default function Logo({ ...props }) {
  const { isOnlyLogo } = props;
  const isDarkMode = useSelector(darkMode);
  const router = useRouter();
  return (
    <Box
      sx={{
        position: 'relative',
        height: 56,
        width: '100%',
        maxWidth: isOnlyLogo ? 56 : 200,
        cursor: 'pointer',
      }}
      onClick={() => router.push('/')}>
      {isOnlyLogo ? (
        <Image
          src={OnlyLogo}
          alt={name + ' logo'}
          fill
        />
      ) : (
        <Image
          src={isDarkMode ? LogoDark : LogoLight}
          alt={name + ' logo'}
          fill
          sizes="200px"
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      )}
    </Box>
  );
}
