'use client';

import {
  Box,
  Card,
  CardHeader,
  Typography,
  Chip,
  Button,
  Avatar,
  Stack,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';
import {
  FaEye,
  FaWifi,
  FaParking,
  FaUtensils,
  FaSwimmingPool,
  FaConciergeBell,
  FaDumbbell,
  FaBusinessTime,
  FaExchangeAlt,
  FaShieldAlt,
  FaUserClock,
  FaSnowflake,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { FaElevator } from 'react-icons/fa6';
import { useRouter } from '@bprogress/next';
import Link from 'next/link';

// Icon map
const amenityIcons = {
  wifi: <FaWifi />,
  parking: <FaParking />,
  restaurant: <FaUtensils />,
  'swimming-pool': <FaSwimmingPool />,
  concierge: <FaConciergeBell />,
  'fitness-center': <FaDumbbell />,
  'business-center': <FaBusinessTime />,
  'currency-exchange': <FaExchangeAlt />,
  elevator: <FaElevator />,
  '24h-security': <FaShieldAlt />,
  '24h-reception': <FaUserClock />,
  'air-conditioning': <FaSnowflake />,
  atm: <FaMoneyBillWave />,
};

export default function HotelCard({ hotel, isLoading, slug }) {
  const router = useRouter();
  const topHotelAmenities = isLoading
    ? []
    : hotel?.hotelAmenities?.slice(0, 3) || [];

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: {
          md: 'row',
          xs: 'column',
        },
        ...(!isLoading && {
          '&:hover': {
            border: (theme) =>
              '1px solid ' + theme.palette.primary.main + '!important',
          },
        }),
      }}
    >
      <Box
        sx={{
          minWidth: 300,
          height: {
            md: 'auto',
            sm: 240,
            xs: 200,
          },
          position: 'relative',
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width={1} height="100%" />
        ) : (
          <Image
            src={require('public/images/hotels/' + hotel.image)}
            alt={hotel.name}
            placeholder="blur"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </Box>

      <Stack spacing={2} sx={{ p: 2, width: 1 }}>
        <div>
          <Typography
            variant="h5"
            fontWeight={600}
            noWrap
            color="primary"
            href={'/hotel' + hotel?.slug + '/' + slug.join('/')}
            component={Link}
          >
            {isLoading ? (
              <Skeleton variant="text" width={'100%'} sx={{ maxWidth: 300 }} />
            ) : (
              hotel.name
            )}
          </Typography>
          {/* <Stack direction="row" gap={1}>
            <Rating
              value={hotel.stars}
              readOnly
              size="small"
              icon={<FaStar color="#faaf00" />}
              emptyIcon={<FaStar color="#e0e0e0" />}
            />
            <Typography variant="body1" color="text.secondary">
              {hotel.reviews} reviews
            </Typography>
          </Stack> */}

          <Typography variant="body2" color="text.secondary">
            {isLoading ? (
              <Skeleton variant="text" width={'100%'} sx={{ maxWidth: 180 }} />
            ) : (
              hotel.location
            )}
          </Typography>
        </div>
        <Box
          sx={{
            display: {
              sm: 'block',
              xs: 'none',
            },
          }}
        >
          <Typography
            variant="subtitle2"
            color="text.primary"
            noWrap
            fontWeight={500}
          >
            {isLoading ? (
              <Skeleton variant="text" width={'100%'} sx={{ maxWidth: 240 }} />
            ) : (
              'Comfortable hotel in the heart of Makkah'
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? (
              <>
                <Skeleton variant="text" width={'100%'} />
                <Skeleton
                  variant="text"
                  width={'100%'}
                  sx={{ maxWidth: 240 }}
                />
              </>
            ) : (
              "Located just minutes away from Masjid Al Haram, Islam's most sacred destination, our hotel is the perfect base for any trip"
            )}
          </Typography>
        </Box>

        {/* <Chip
            label={hotel.accommodationType}
            size="small"
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1565c0",
              width: "fit-content",
              fontWeight: 500,
            }}
          /> */}

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          sx={{
            display: {
              md: 'flex',
              xs: 'none',
            },
          }}
        >
          {(isLoading ? [...new Array(3)] : topHotelAmenities).map(
            (amenity, i) =>
              isLoading ? (
                <Skeleton
                  key={amenity + `${i}`}
                  height={32}
                  width={110}
                  variant="rounded"
                  sx={{
                    borderRadius: 16,
                  }}
                />
              ) : (
                <Chip
                  key={amenity}
                  icon={amenityIcons[amenity] || <FaConciergeBell />}
                  label={amenity
                    .split('-')
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(' ')}
                  variant="outlined"
                  sx={{
                    pl: 0.5,
                    border: (theme) => '1px solid ' + theme.palette.divider,
                    svg: {
                      color: 'text.primary' + '!important',
                    },
                  }}
                />
              )
          )}
        </Stack>
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={'space-between'}
          sx={{
            minWsidth: '100%',
          }}
        >
          <Stack gap={1} justifyContent={'end'}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {isLoading ? (
                <Skeleton width={14} height={14} variant="circular" />
              ) : (
                <FaEye size={14} color="gray" />
              )}

              <Typography variant="caption" color="text.secondary">
                {isLoading ? null : hotel.viewing}{' '}
                {isLoading ? (
                  <Skeleton variant="text" width={120} />
                ) : (
                  'others are viewing this hotel'
                )}
              </Typography>
            </Stack>
            <CardHeader
              avatar={
                isLoading ? (
                  <Skeleton width={40} height={40} variant="circular" />
                ) : (
                  <Avatar aria-label="recipe" sx={{ fontSize: 16 }}>
                    {hotel.rating}
                  </Avatar>
                )
              }
              title={
                isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  hotel.ratingText
                )
              }
              subheader={
                isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  hotel.reviews + ' Reviews'
                )
              }
              sx={{
                p: 0,

                '& .MuiTypography-body2': {
                  mt: 0,
                },
              }}
            />
          </Stack>
          <Stack gap={1}>
            <div>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                textAlign={'right'}
              >
                {isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  hotel.price + 'SAR'
                )}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                textAlign={'right'}
              >
                {isLoading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  'Total 1 night including VAT'
                )}
              </Typography>
            </div>
            {isLoading ? (
              <Skeleton variant="rounded" width={100} height={40} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  router.push('/hotel/' + hotel?.slug + '/' + slug.join('/'))
                }
              >
                View Rooms
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
