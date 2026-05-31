'use client';
import React from 'react';
// mui
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';
import Login from './login';

export default function Index() {
  return (
    <Box my={5}>
      <Stack mb={5}>
        <Typography textAlign="center" variant="h4" component="h1">
          <Skeleton variant="text" />
        </Typography>
        <Typography textAlign="center" color="text.secondary">
          <Skeleton variant="text" />
        </Typography>
      </Stack>
      <Login />
    </Box>
  );
}
