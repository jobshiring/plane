'use client'; // Ensures this component runs on the client side
import React from 'react';

// Importing UI components from MUI
import {
  Stack,
  Divider,
  Card,
  Typography,
  Button,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Importing icons
import { BsAirplaneEngines } from 'react-icons/bs';
import { PiSlidersHorizontalBold } from 'react-icons/pi';

export default function ModuleInfo({
  slug,
  toggleDrawer,
  isLoading,
  count,
  isHotel,
}) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ p: 2 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={2}
        justifyContent="space-between"
      >
        <Stack direction="row" gap={2} justifyContent="space-between">
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{
              textTransform: 'capitalize',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              svg: {
                transform: 'rotate(90deg)',
              },
            }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={140} />
            ) : (
              <>
                {(() => {
                  try {
                    const loc0 = Array.isArray(slug) && slug[0] ? slug[0] : '';
                    const city = loc0.split('-')[0].split('_').join(' ');
                    return city;
                  } catch (e) {
                    return '';
                  }
                })()}{' '}
                {!isHotel && (
                  <>
                    <BsAirplaneEngines />{' '}
                    {(() => {
                      try {
                        const loc1 = Array.isArray(slug) && slug[1] ? slug[1] : '';
                        return loc1.split('-')[0].split('_').join(' ');
                      } catch (e) {
                        return '';
                      }
                    })()}
                  </>
                )}
              </>
            )}
          </Typography>
          <Button
            onClick={toggleDrawer(true)}
            size="small"
            startIcon={<PiSlidersHorizontalBold />}
            variant="outlined"
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            Filter
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={120} />
            ) : (
              parseInt(count) + (isHotel ? ' Hotels found' : ' Flights found')
            )}
          </Typography>
          {!isMobile && <Divider orientation="vertical" flexItem />}
          <Stack direction={'row'} gap={2}>
            {!isHotel && (
              <>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={90.59} />
                  ) : (
                    slug[7]
                  )}
                </Typography>
              </>
            )}

            {slug[2] === 'round' ? (
              <>
                <Typography variant="subtitle1" color="text.primary">
                  {isLoading ? <Skeleton variant="text" width={6.69} /> : '-'}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={90.59} />
                  ) : (
                    slug[8]
                  )}
                </Typography>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
