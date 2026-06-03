'use client'; // Ensures this component runs on the client side
import React from 'react';
// Importing UI components from MUI
import {
  Card,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  Chip,
  Skeleton,
  Collapse,
  alpha,
  CardContent,
  useTheme,
  Tooltip,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Image from 'next/image';
// Importing necessary icons

import { MdFlightLand, MdFlightTakeoff } from 'react-icons/md';
import { MdAccessTime } from 'react-icons/md';
import { MdOutlineAirlines } from 'react-icons/md';
import { RiRefund2Line } from 'react-icons/ri';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineAirplaneTicket } from 'react-icons/md';
import { LuBaggageClaim } from 'react-icons/lu';
import { IoInformationCircle } from 'react-icons/io5';

// Price comparison components
import PriceComparisonGrid from './price-comparison-grid';
import { generateComparisonPrices } from '@/_mock/price-providers';
// Importing TimelineOppositeContent for timeline layout
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { parse, parseISO, format, isValid } from 'date-fns';

function convertToAmPm(time24) {
  const timeString = String(time24 || '').trim();
  if (!timeString) {
    return 'TBD';
  }

  try {
    const hhmmssMatch = timeString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (hhmmssMatch) {
      const [, hours, minutes, seconds = '00'] = hhmmssMatch;
      const normalized = `${hours.padStart(2, '0')}:${minutes}:${seconds}`;
      const parsedTime = parse(normalized, 'HH:mm:ss', new Date());
      if (isValid(parsedTime)) {
        return format(parsedTime, 'hh:mm a');
      }
    }

    const isoParsed = parseISO(timeString);
    if (isValid(isoParsed)) {
      return format(isoParsed, 'hh:mm a');
    }

    const dateParsed = new Date(timeString);
    if (!Number.isNaN(dateParsed.getTime())) {
      return format(dateParsed, 'hh:mm a');
    }
  } catch (error) {
    return timeString;
  }

  return timeString;
}

function formatDuration(duration) {
  if (!duration) {
    return '0:00 hours';
  }

  const normalized = String(duration).toUpperCase().replace(/\s+/g, '');
  const hoursMatch = normalized.match(/(\d+)H/);
  const minutesMatch = normalized.match(/(\d+)M/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
}
function generateTravelers(payload) {
  const { adults = 0, childrens = 0, infants = 0 } = payload;

  const result = [];

  // Helper to generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Add adults
  for (let i = 0; i < adults; i++) {
    result.push({ id: generateId(), type: 'adult', count: i + 1 });
  }

  // Add children
  for (let i = 0; i < childrens; i++) {
    result.push({ id: generateId(), type: 'children', count: i + 1 });
  }

  // Add infants
  for (let i = 0; i < infants; i++) {
    result.push({ id: generateId(), type: 'infant', count: i + 1 });
  }

  return result;
}

export default function FlightCard({ ...props }) {
  const { flight, isLoading, isRound, slug, payload } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Generate comparison prices for this flight
  const comparisonPrices = React.useMemo(() => {
    if (isLoading || !flight?.[0]?.[0]) return [];
    const basePrice = flight[0][0].price;
    const currency = flight[0][0].currency;
    return generateComparisonPrices(basePrice, currency, flight[0][0]);
  }, [flight, isLoading]);

  // Get the best (lowest) price
  const bestPrice = React.useMemo(() => {
    if (!comparisonPrices.length) return null;
    return Math.min(...comparisonPrices.map((p) => p.price));
  }, [comparisonPrices]);

  return (
    <Card
      sx={{
        borderColor: (theme) =>
          open
            ? theme.palette.primary.main + '!important'
            : theme.palette.divider + '!important',
      }}
    >
      <CardContent>
        <Stack gap={1}>
          {(isLoading ? Array.from(new Array(isRound ? 2 : 1)) : flight).map(
            (segment, i) => {
              return (
                <Stack
                  key={i}
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
                    {isLoading ? (
                      <Skeleton variant="circular" width={32} height={32} />
                    ) : (
                      <Tooltip
                        arrow
                        title={segment[0]?.supplier.toUpperCase()}
                        placement="right"
                      >
                        <IconButton
                          size="small"
                          aria-label="info"
                          sx={{
                            color:
                              segment[0]?.supplier === 'amadeus'
                                ? 'secondary.main'
                                : 'success.main',
                          }}
                        >
                          <IoInformationCircle />
                        </IconButton>
                      </Tooltip>
                    )}
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
                      {isLoading ? (
                        <Skeleton variant="circular" height={40} width={40} />
                      ) : (
                        <Image
                          alt={segment[0].img}
                          src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${segment[0].img}.svg`}
                          fill
                          sizes="40px"
                          priority
                        />
                      )}
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
                      {isLoading ? (
                        <Skeleton variant="text" width={120} />
                      ) : (
                        segment[0].airline
                      )}
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
                      {isLoading ? (
                        <Skeleton variant="text" width={120} />
                      ) : (
                        segment[0].img + '-' + segment[0].flight_no
                      )}
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
                      {isLoading ? (
                        <Skeleton variant="text" width={120} />
                      ) : (
                        segment[0].class
                      )}
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
                        {isLoading ? (
                          <Skeleton variant="text" width={120} />
                        ) : (
                          convertToAmPm(segment[0].departure_time)
                        )}
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
                        label={
                          isLoading ? (
                            <Skeleton variant="text" width={80} />
                          ) : (
                            formatDuration(segment[0].total_duration)
                          )
                        }
                      />

                      <Typography
                        variant={isMobile ? 'h4' : 'h3'}
                        color="text.primary"
                      >
                        {isLoading ? (
                          <Skeleton variant="text" width={120} />
                        ) : (
                          convertToAmPm(
                            segment[segment?.length - 1].arrival_time
                          )
                        )}
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
                          {isLoading ? (
                            <Skeleton variant="text" width={120} />
                          ) : (
                            <>
                              {i === 1
                                ? slug[1]?.split('-')[0].split('_').join(' ')
                                : slug[0]?.split('-')[0].split('_').join(' ')}
                            </>
                          )}
                        </Typography>
                        <Typography variant="body2" component="span">
                          {' '}
                          {isLoading ? (
                            <Skeleton variant="text" width={40} />
                          ) : (
                            `(${segment[0].departure_code})`
                          )}
                        </Typography>
                      </Stack>

                      <Stack direction="row" sx={{ width: '100%' }}>
                        {!(segment?.length - 1) ? (
                          <Divider sx={{ width: 'calc(100%)' }} />
                        ) : // <DividerWithUltraSlowIcon />
                        // <Divider sx={{ width: 'calc(100%)' }} />
                        null}
                        {Boolean(segment?.length - 1) &&
                        segment?.length - 1 > 0 ? (
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
                          {isLoading ? (
                            <Skeleton variant="text" width={120} />
                          ) : (
                            <>
                              {i === 0
                                ? slug[1]?.split('-')[0]
                                : slug[0]?.split('-')[0]}
                            </>
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          textAlign="right"
                        >
                          {' '}
                          {isLoading ? (
                            <Skeleton variant="text" width={40} />
                          ) : (
                            `(${segment[segment?.length - 1].arrival_code})`
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              );
            }
          )}
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
            {isLoading ? (
              <Skeleton variant="text" width={150} />
            ) : (
              <>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="span"
                >
                  From
                </Typography>
                {flight[0][0]?.currency}{' '}
                {bestPrice?.toLocaleString() || flight[0][0]?.price}
                <Chip
                  label="Compare below"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 1, height: 24, fontSize: '0.7rem' }}
                />
              </>
            )}
          </Typography>

          {isLoading ? (
            <Skeleton variant="rounded" height={40} width={112} />
          ) : (
            <Button
              variant="text"
              color="primary"
              endIcon={<IoIosArrowDown />}
              onClick={() => setOpen((prev) => !prev)}
            >
              more details
            </Button>
          )}
        </Stack>

        {/* Price Comparison Grid */}
        <PriceComparisonGrid
          prices={comparisonPrices}
          isLoading={isLoading}
          airlineLogo={
            flight?.[0]?.[0]?.img
              ? `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${flight[0][0].img}.svg`
              : null
          }
        />
        <Collapse in={open}>
          <>
            {flight?.map((parentSegment, parentIndex) => (
              <React.Fragment
                key={parentSegment.id || `parent-segment-${parentIndex}`}
              >
                {parentSegment.map((childSegment, childIndex) => (
                  <Card
                    sx={{ mt: 2, p: 1, boxShadow: 'none' }}
                    key={
                      childSegment.id ||
                      `child-segment-${parentIndex}-${childIndex}`
                    }
                  >
                    <Timeline
                      sx={{
                        p: 0,
                        [`& .${timelineOppositeContentClasses.root}`]: {
                          flex: 0.2,
                        },
                      }}
                    >
                      <TimelineItem>
                        <TimelineOppositeContent
                          sx={{
                            m: 'auto 0',
                            px: { xs: 1, md: 2 },
                            minWidth: 80,
                          }}
                          align="right"
                        >
                          <Typography
                            variant={isMobile ? 'subtitle2' : 'subtitle1'}
                            color="text.primary"
                          >
                            {convertToAmPm(childSegment.departure_time)}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {childSegment.departure_date}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineConnector />
                          <TimelineDot color="primary">
                            <MdFlightTakeoff />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                          sx={{ py: '12px', px: { xs: 1, md: 2 } }}
                        >
                          <Typography
                            variant="h6"
                            noWrap
                            sx={{ textOverflow: 'ellipsis' }}
                            component="span"
                          >
                            Depart From {childSegment.departure_code}
                          </Typography>
                          <Typography
                            noWrap
                            sx={{ textOverflow: 'ellipsis' }}
                            color="text.secondary"
                          >
                            {childSegment.departure_airport}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineOppositeContent
                          sx={{
                            m: 'auto 0',
                            px: { xs: 1, md: 2 },
                            minWidth: 80,
                          }}
                          align="right"
                        >
                          <Typography
                            variant={isMobile ? 'subtitle2' : 'subtitle1'}
                            color="text.primary"
                          >
                            {convertToAmPm(childSegment.arrival_time)}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {childSegment.arrival_date}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineConnector />
                          <TimelineDot color="primary">
                            <MdFlightLand />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                          sx={{ py: '12px', px: { xs: 1, md: 2 } }}
                        >
                          <Typography variant="h6" component="span">
                            Arrival To {childSegment.arrival_code}
                          </Typography>
                          <Typography color="text.secondary">
                            {childSegment.arrivalAirportName ||
                              childSegment.arrival_airport}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                    <Stack
                      mt={1}
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={1}
                      justifyContent={'end'}
                    >
                      <Chip
                        icon={<MdOutlineAirlines fontSize={18} />}
                        label={<>{childSegment.airline}</>}
                      />
                      <Chip
                        icon={<MdAccessTime fontSize={18} />}
                        label={
                          <>{formatDuration(childSegment.duration_time)}</>
                        }
                      />

                      {childSegment.baggage && (
                        <Chip
                          icon={<LuBaggageClaim fontSize={18} />}
                          label={<>{childSegment.baggage}KG</>}
                        />
                      )}

                      <Chip
                        sx={{
                          span: {
                            textTransform: 'capitalize',
                          },
                        }}
                        icon={<LiaBusinessTimeSolid fontSize={18} />}
                        label={childSegment.class.toLowerCase()}
                      />
                      <Chip
                        icon={<RiRefund2Line fontSize={18} />}
                        label={
                          <>
                            {childSegment.refundable
                              ? 'Refundable'
                              : 'Non Refundable'}
                          </>
                        }
                      />
                    </Stack>
                  </Card>
                ))}
              </React.Fragment>
            ))}
          </>
        </Collapse>
      </CardContent>
    </Card>
  );
}
