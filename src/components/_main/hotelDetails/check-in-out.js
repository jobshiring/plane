'use client';
import { Stack, Typography, alpha, Avatar } from '@mui/material';
import React from 'react';
import { TbDoorEnter, TbDoorExit } from 'react-icons/tb';

export default function CheckInOut() {
  return (
    <Stack gap={3} direction={'row'} sx={{ mt: 2 }}>
      <Stack gap={1} direction={'row'} alignItems={'center'}>
        <Avatar
          sx={{
            height: 60,
            width: 60,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            border: (theme) => '1px solid' + theme.palette.primary.main,
            svg: {
              color: 'primary.main',
              fontSize: 32,
            },
          }}
        >
          <TbDoorEnter />
        </Avatar>
        <Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Check-in time
          </Typography>
          <Typography variant="h5" color="text.primary">
            12:12
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={1} direction={'row'} alignItems={'center'}>
        <Avatar
          sx={{
            height: 60,
            width: 60,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            border: (theme) => '1px solid' + theme.palette.primary.main,
            svg: {
              color: 'primary.main',
              fontSize: 32,
            },
          }}
        >
          <TbDoorExit />
        </Avatar>
        <Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Check-out time
          </Typography>
          <Typography variant="h5" color="text.primary">
            12:12
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
