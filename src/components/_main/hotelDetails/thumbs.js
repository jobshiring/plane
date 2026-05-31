import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
export const Thumb = ({ selected, _index, onClick }) => {
  return (
    <Box
      sx={{
        flex: {
          xs: '0 0 22%',
          sm: '0 0 15%',
        },
        minWidth: 0,
        pl: '0.8rem',
      }}
    >
      <Button
        onClick={onClick}
        sx={{
          borderRadius: '12px',
          appearance: 'none',
          touchAction: 'manipulation',
          width: '100%',
          height: '6rem',
          boxShadow: 'inset 0 0 0 0.2rem #999',
          opacity: selected ? 1 : 0.7,
          border: (theme) =>
            selected ? '2px solid ' + theme.palette.primary.main : 'none',
          position: 'relative',
          img: {
            borderRadius: '12px',
          },
        }}
      >
        <Image
          alt="hotel"
          src={require('public/images/cities/Cairo.jpg')}
          fill
          sizes="100px"
          priority
        />
      </Button>
    </Box>
  );
};
