'use client';
import React from 'react';
import {
  Card,
  Stack,
  Box,
  Typography,
  Divider,
  Chip,
  Skeleton,
  alpha,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function FlightLongCard({ ...props }) {
  const { isRound } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      sx={{
        mb: 2,
        borderColor: (theme) => theme.palette.divider + '!important',
      }}
    >
      <CardContent>
        <Stack gap={1}>
          {Array.from(new Array(isRound ? 2 : 1)).map((segment, index) => (
            <Stack
              key={`flight-skeleton-segment-${index}`}
              direction={{ xs: 'column', md: 'row' }}
              gap={2}
              width="100%"
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                position: 'relative',
              }}
            >
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: -14,
                  left: -14,
                  zIndex: 99,
                }}
              >
                <Skeleton variant="circular" width={32} height={32} />
              </Box> */}
              <Stack
                spacing={0.3}
                alignItems="center"
                justifyContent="center"
                maxWidth={120}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
                width="100%"
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    position: 'relative',

                    img: {
                      borderRadius: '4px',
                      overflow: 'hidden',
                    },
                  }}
                >
                  <Skeleton variant="circular" height={40} width={40} />
                </Box>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  textAlign="center"
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: 120,
                  }}
                  noWrap
                >
                  <Skeleton variant="text" width={120} />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: 120,
                  }}
                  noWrap
                >
                  <Skeleton variant="text" width={120} />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: 120,
                  }}
                  noWrap
                >
                  <Skeleton variant="text" width={120} />
                </Typography>
              </Stack>
              {isMobile ? (
                <Divider
                  orientation="horizontal"
                  sx={{
                    width: '100%',
                  }}
                />
              ) : (
                <Divider orientation="vertical" flexItem />
              )}
              <Stack sx={{ flexGrow: 1, width: '100%' }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    color="text.primary"
                  >
                    <Skeleton variant="text" width={120} />
                  </Typography>
                  <Chip
                    sx={{
                      borderRadius: '8px !important',
                      color: 'primary.main',
                      fontWeight: 600,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      height: isMobile ? 24 : 32,
                      '& .MuiChip-label': {
                        px: isMobile ? 0.6 : 1.5,
                      },
                    }}
                    label={<Skeleton variant="text" width={80} />}
                  />

                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    color="text.primary"
                  >
                    <Skeleton variant="text" width={120} />
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Stack>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ textTransform: 'capitalize', maxWidth: 160 }}
                      noWrap
                    >
                      <Skeleton variant="text" width={120} />
                    </Typography>
                    <Typography variant="body2" component="span">
                      <Skeleton variant="text" width={40} />
                    </Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%' }}>
                    {!(segment?.length - 1) ? (
                      <Divider sx={{ width: 'calc(100%)' }} />
                    ) : null}
                    {Boolean(segment?.length - 1) && segment?.length - 1 > 0 ? (
                      <Divider
                        sx={{
                          width:
                            segment?.length - 1 === 2
                              ? 'calc(50%)'
                              : 'calc(100%)',
                        }}
                      >
                        <Chip
                          label={segment[1].departure_code}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 500,
                          }}
                        />
                      </Divider>
                    ) : null}
                    {Boolean(segment?.length - 1) &&
                    segment?.length - 1 === 2 ? (
                      <Divider sx={{ width: 'calc(50%)' }}>
                        <Chip
                          label={segment[2].departure_code}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 500,
                          }}
                        />
                      </Divider>
                    ) : null}
                  </Stack>
                  <Stack alignItems="end">
                    <Typography
                      variant="subtitle1"
                      textAlign="end"
                      color="text.secondary"
                      sx={{ textTransform: 'capitalize', maxWidth: 160 }}
                      noWrap
                    >
                      <Skeleton variant="text" width={120} />
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      textAlign="right"
                    >
                      <Skeleton variant="text" width={40} />
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          gap={1}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            button: {
              width: { xs: '100%', md: 'auto' },
            },
          }}
        >
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Skeleton variant="text" width={150} />
          </Typography>

          <Skeleton variant="rounded" height={40} width={112} />

          <Skeleton variant="rounded" height={40} width={104} />
        </Stack>
      </CardContent>
    </Card>
  );
}
