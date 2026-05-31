import React from 'react';
import Box from '@mui/material/Box';
import NavBar from '@/layout/_main/nav-bar';
import Footer from '@/layout/_main/footer';
import { Toolbar } from '@mui/material';

export default async function UserLayout({ children }) {
  return (
    <Box>
      <NavBar />
      <Toolbar />
      <Box py={3}>{children}</Box>
      <Footer />
    </Box>
  );
}
