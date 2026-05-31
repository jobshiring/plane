// 'use client';

// import React from 'react';
// import {
//   alpha,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   useTheme,
//   Typography,
//   Button,
// } from '@mui/material';
// import Image from 'next/image';
// import ImageBanner from 'public/images/hero-bg.jpg';
// import { useRouter } from '@bprogress/next';

// export default function CenterBanner() {
//   const theme = useTheme();
//   const router = useRouter();

//   return (
//     <Box
//       py={6}
//       sx={{
//         display: { md: 'block', xs: 'none' },
//       }}>
//       <Card>
//         <Image
//           src={ImageBanner}
//           alt='banner'
//           priority
//           fill
//           objectFit='cover'
//         />
//         <CardContent
//           sx={{
//             bgcolor: alpha(theme.palette.common.black, 0.5),
//             position: 'relative',
//             zIndex: 99,
//             height: 400,
//             backdropFilter: 'blur(2px)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Stack
//             spacing={1.5}
//             textAlign='center'>
//             <Typography
//               variant='subtitle1'
//               color='common.white'>
//               Can&lsquo;t decide where to go?
//             </Typography>
//             <Typography
//               variant='h2'
//               color='common.white'>
//               Explore every destination
//             </Typography>
//             <Box pt={1}>
//               <Button
//                 size='large'
//                 variant='contained'
//                 color='inherit'
//                 sx={{
//                   bgcolor: 'common.white',
//                   color: 'common.black',
//                 }}
//                 onClick={() =>
//                   router.push(
//                     '/flights/lahore-lhe/dubai-dxb/oneway/economy/1/0/0/'
//                   )
//                 }>
//                 Search Flights Everywhere
//               </Button>
//             </Box>
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
'use client';

import React from 'react';
import {
  alpha,
  Box,
  Card,
  Stack,
  useTheme,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';
import ImageBanner from 'public/images/hero-bg.jpg';
import { useRouter } from '@bprogress/next';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { MdTravelExplore } from 'react-icons/md';

export default function CenterBanner() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      py={6}
      sx={{
        display: { md: 'block', xs: 'none' },
      }}
    >
      <Card
        sx={{
          position: 'relative',
          height: 420,
          overflow: 'hidden',
          borderRadius: 3,
        }}
      >
        {/* Background Image */}
        <Image
          src={ImageBanner}
          alt="Explore destinations"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              180deg,
              ${alpha(theme.palette.common.black, 0.2)} 0%,
              ${alpha(theme.palette.common.black, 0.7)} 100%
            )`,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
          }}
        >
          <Stack spacing={2} maxWidth={720} textAlign="center">
            <Typography
              variant="subtitle1"
              sx={{
                color: alpha(theme.palette.common.white, 0.85),
                letterSpacing: 0.5,
              }}
            >
              Not sure where to travel next?
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: 'common.white',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Discover Flights to Every Destination
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: alpha(theme.palette.common.white, 0.85),
                maxWidth: 560,
                mx: 'auto',
              }}
            >
              Compare prices, explore routes, and book flights to anywhere in
              the world — all in one place.
            </Typography>

            <Box pt={1}>
              <Button
                size="large"
                variant="contained"
                startIcon={<MdTravelExplore />}
                sx={{
                  px: 4,
                  py: 1.4,
                  bgcolor: 'common.white',
                  color: 'common.black',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.9),
                    transform: 'translateY(-1px)',
                  },
                }}
                onClick={() =>
                  router.push(
                    '/flights/lahore-lhe/dubai-dxb/oneway/economy/1/0/0/'
                  )
                }
              >
                Search Flights Everywhere
              </Button>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
