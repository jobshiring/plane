'use client';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { PiWhatsappLogoThin } from 'react-icons/pi';
// Images
import Taman from 'public/images/taman.svg';
import Tamara from 'public/images/TAMARA.svg';

import Image from 'next/image';
export default function ReservationSummary() {
  return (
    <Box
      sx={{
        width: 350,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 2,
        backgroundColor: '#fff',
        fontFamily: 'Arial',
      }}
    >
      {/* Header */}
      <Box sx={{ backgroundColor: '#efe3fd', py: 2, textAlign: 'center' }}>
        <Typography fontWeight="600" fontSize="20px">
          Reservation summary
        </Typography>
      </Box>

      {/* Dates & Guest Info */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography fontWeight="700" fontSize={'16px'}>
              Check in
            </Typography>
            <Typography fontSize={'16px'}>03 of Jun 2025</Typography>
          </Box>
          <Box>
            <Typography fontWeight="700" fontSize={'16px'}>
              Check out
            </Typography>
            <Typography fontSize={'16px'}>04 of Jun 2025</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography fontWeight="700" fontSize={'16px'}>
              Guests
            </Typography>
            <Typography fontSize={'16px'}>1 Adult</Typography>
          </Box>
          <Box>
            <Typography fontWeight="700" fontSize={'16px'}>
              Rooms
            </Typography>
            <Typography fontSize={'16px'}>
              Standard Room - <br />
              TWIN Bed
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ margin: '0px 16px' }} />

      {/* Amount Details */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight="bold" mb={1}>
          Amount Details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography fontWeight={500}>Selected Rooms</Typography>
            <Typography fontSize={14}>Standard Room - TWIN Bed</Typography>
            <Typography fontSize={14}>1 Adult</Typography>
          </Box>
          <Typography fontWeight={500}>AED 8,496</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography fontWeight={500}>Taxes</Typography>
          <Typography>AED 1,626</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Cancellation Policy */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography color="primary" fontSize={14} sx={{ cursor: 'pointer' }}>
          Cancellation policy &rarr;
        </Typography>
      </Box>

      <Divider />

      {/* Total */}
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontWeight="bold" fontSize={18}>
            Total Amount
          </Typography>
          <Typography fontWeight="bold" fontSize={20}>
            AED 10,121
          </Typography>
        </Box>
        <Stack direction={'row'} gap={'8px'}>
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Include Taxes & Fees except Tourism Tax if applied
          </Typography>
          <Box
            mt={1}
            position={'relative'}
            sx={{ display: 'flex', gap: '4px' }}
          >
            <Image
              src={Tamara}
              alt="Tamara"
              height={24}
              width={40}
              priority
            ></Image>
            <Image
              src={Taman}
              alt="Taman"
              height={24}
              width={40}
              priority
            ></Image>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Help Section */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight="bold">Need help ?</Typography>
        <Typography fontSize={14}>
          Our Team is available for help 24/7
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <PiWhatsappLogoThin color="#9147ff" fontSize={'22px'} />
          <Typography color="#9147ff" fontWeight="bold" ml={1}>
            (+966) 92 000 55 11
          </Typography>
        </Box>

        {/* Optional illustration */}
        <Box mt={2}>
          <img src="/support-illustration.png" alt="help" width="100%" />
        </Box>
      </Box>
    </Box>
  );
}
