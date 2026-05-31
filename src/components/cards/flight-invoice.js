import React from 'react'; // Importing React

// MUI components for layout, styling, and theming
import { Box, Card, Typography, Stack, Divider, useTheme } from '@mui/material';

// MUI Lab components for building a timeline UI
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

// Next.js Image optimization for better performance
import Image from 'next/image';

// React Icons for displaying icons
import { BsFillSuitcaseFill } from 'react-icons/bs'; // Suitcase icon
import { FaRegCalendarMinus } from 'react-icons/fa6'; // Calendar icon
import { WiTime5 } from 'react-icons/wi'; // Clock icon

const addFormattedDateTimeKeys = (segments) => {
  return segments.map((segment) => {
    const departureAt = segment.departing_at || segment.departure?.at;
    const arrivalAt = segment.arriving_at || segment.arrival?.at;

    const departureDate = departureAt ? new Date(departureAt) : null;
    const arrivalDate = arrivalAt ? new Date(arrivalAt) : null;

    return {
      ...segment,
      departureAt: departureDate
        ? {
            date: departureDate.toLocaleDateString(),
            time: departureDate.toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
          }
        : {},
      arrivalAt: arrivalDate
        ? {
            date: arrivalDate.toLocaleDateString(),
            time: arrivalDate.toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
          }
        : {},
    };
  });
};

export default function FlightInvoice({ ...props }) {
  const { data } = props;
  const theme = useTheme();
  const supplier =
    data?.bookingDetails?.supplier ||
    data?.supplier ||
    data?.bookingDetails?.supplier;
  const isDuffel = supplier === 'duffel';

  const flightDetail =
    data?.bookingDetails?.slices ||
    data?.slices ||
    data?.bookingDetails?.itineraries ||
    data?.itineraries;

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        Flights
      </Typography>
      <Stack spacing={2}>
        {flightDetail?.map((item, itemIndex) => {
          const processedSegments = addFormattedDateTimeKeys(item.segments);
          return (
            <React.Fragment key={item.id || `flight-item-${itemIndex}`}>
              {processedSegments?.map((segment, segmentIndex) => (
                <Card
                  key={segment.id || `segment-${itemIndex}-${segmentIndex}`}
                  sx={{
                    boxShadow: 'none',
                    borderRadius: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      p={2}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          position: 'relative',
                          img: {
                            borderRadius: '4px',
                            overflow: 'hidden',
                          },
                        }}
                      >
                        <Image
                          alt={
                            isDuffel
                              ? segment.operating_carrier.name
                              : segment.carrierCode
                          }
                          src={
                            isDuffel
                              ? segment.operating_carrier.logo_symbol_url
                              : `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${segment.carrierCode}.svg`
                          }
                          fill
                          sizes="40px"
                          priority
                        />
                      </Box>
                      <Stack>
                        <Typography
                          variant="subtitle2"
                          color="text.primary"
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: 150,
                          }}
                          noWrap
                        >
                          {isDuffel
                            ? segment.operating_carrier.name
                            : segment?.airline}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: 150,
                          }}
                          noWrap
                        >
                          {isDuffel
                            ? segment.operating_carrier.iata_code
                            : segment.carrierCode + '-' + segment.aircraft.code}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: 150,
                          }}
                          noWrap
                        >
                          {isDuffel
                            ? null
                            : data?.bookingDetails?.travelerPricings[0]
                                ?.fareDetailsBySegment[0]?.cabin}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        pr: 2,
                        svg: {
                          color: 'text.secondary',
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          variant="subtitle1"
                          color="text.primary"
                          mb={0}
                        >
                          Cabin Baggage:
                        </Typography>
                        <Typography variant="body1" color="text.primary" noWrap>
                          Baggage:{' '}
                          {isDuffel
                            ? null
                            : data?.bookingDetails?.travelerPricings[0]
                                ?.fareDetailsBySegment[0]?.includedCheckedBags
                                ?.quantity}
                        </Typography>
                      </Stack>
                      <Box sx={{ width: 50 }}>
                        <BsFillSuitcaseFill size={50} />
                      </Box>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Box
                    sx={{
                      bgcolor: theme.palette.background.default,
                      p: 2,
                      '& .MuiTimelineItem-root': {
                        '&:before': {
                          display: 'none',
                        },
                        '& .MuiTimelineSeparator-root': {
                          '& .MuiTimelineDot-root': {
                            borderColor: 'text.primary',
                            p: 0.7,
                          },
                          '& .MuiTimelineConnector-root': {
                            bgcolor: 'text.primary',
                          },
                        },
                        '&:last-child': {
                          minHeight: 'auto',
                        },
                      },
                    }}
                  >
                    <Timeline>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot variant="outlined" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          {' '}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <FaRegCalendarMinus />
                              <Typography variant="subtitle1">
                                {segment.departureAt?.date}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <WiTime5 size={20} />
                              <Typography variant="subtitle1">
                                {segment.departureAt?.time}
                              </Typography>
                            </Stack>
                            <Typography variant="body1">
                              Depart From{' '}
                              <Typography variant="subtitle1" component="span">
                                {isDuffel
                                  ? segment?.origin?.iata_code
                                  : segment?.departure?.iataCode}
                              </Typography>{' '}
                              {`(${
                                isDuffel
                                  ? segment?.origin?.name
                                  : segment?.departure?.airportName
                              })`}
                            </Typography>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot variant="outlined" />
                        </TimelineSeparator>
                        <TimelineContent>
                          {' '}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <FaRegCalendarMinus />
                              <Typography variant="subtitle1">
                                {segment.arrivalAt?.date}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <WiTime5 size={20} />
                              <Typography variant="subtitle1">
                                {segment.arrivalAt?.time}
                              </Typography>
                            </Stack>
                            <Typography variant="body1">
                              Arrive At{' '}
                              <Typography variant="subtitle1" component="span">
                                {isDuffel
                                  ? segment.destination.iata_code
                                  : segment.arrival?.iataCode}
                              </Typography>{' '}
                              {`(${
                                isDuffel
                                  ? segment.destination.name
                                  : segment?.arrival?.airportName
                              })`}
                            </Typography>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Box>
                </Card>
              ))}
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
}
