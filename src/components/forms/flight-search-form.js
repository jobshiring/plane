'use client';

import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Stack,
  Fab,
  MenuItem,
  Select,
  Button,
  Grid,
} from '@mui/material';
import AirportsSelect from 'src/components/selects/airports';
import DateRange from '../selects/date-range';
import TravelersSelect from '../selects/flight-travelers';
import DatePicker from 'src/components/selects/date';
import { FiSearch } from 'react-icons/fi';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { _airportSuggestions } from '@/_mock/airports';
import { capitalize } from 'lodash';
import { useSelector, currency } from '@/redux';
import shape from '@/theme/shape';

function formatDate(date) {
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(date).getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function FlightSearchForm({ slug }) {
  const isHome = !slug;
  const currentCurrency = useSelector(currency);
  const [airportData, setAirportData] = React.useState([]);
  const searchParams = useSearchParams();

  let payload = null;

  if (Array.isArray(slug) && slug.length >= 8) {
    payload = {
      origin: slug[0]?.split('-') || ['London', 'LHR'],
      destination: slug[1]?.split('-') || ['Dubai', 'DXB'],
      trip: slug[2] || 'oneway',
      type: slug[3] || 'economy',
      adults: Number(slug[4]),
      infants: Number(slug[5]),
      childrens: Number(slug[6]),
      departure_date: slug[7],
      currency: currentCurrency || 'USD',
    };

    if (payload.trip === 'round' && slug[8]) {
      payload.return_date = slug[8];
    }
  } else {
    payload = {
      origin: ['London', 'LHR'],
      destination: ['Dubai', 'DXB'],
      trip: 'oneway',
      type: 'economy',
      adults: 1,
      infants: 0,
      childrens: 0,
      departure_date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      currency: currentCurrency || 'USD',
      return_date: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    };
  }

  const router = useRouter();
  const [cabinClass, setCabinClass] = React.useState(payload.type);
  const [tripType, setTripType] = React.useState(payload.trip);

  const [departureAirport, setDepartureAirport] = React.useState({
    city: capitalize(payload.origin[0].split('_').join(' ')),
    code: payload.origin[1]?.toUpperCase(),
  });

  const [arrivalAirport, setArrivalAirport] = React.useState({
    city: capitalize(payload.destination[0].split('_').join(' ')),
    code: payload.destination[1]?.toUpperCase(),
  });

  const [travelers, setTravelers] = React.useState({
    infants: payload.infants,
    childrens: payload.childrens,
    adults: payload.adults,
  });

  const [departureDate, setDepartureDate] = React.useState(
    payload?.departure_date
      ? dayjs(payload.departure_date)
      : dayjs().add(2, 'day')
  );

  const [returnDate, setReturnDate] = React.useState(
    payload?.trip === 'round' && payload?.return_date
      ? dayjs(payload.return_date)
      : dayjs().add(5, 'day')
  );

  const [provider, setProvider] = React.useState(
    searchParams?.get('provider') || 'skyscanner'
  );

  const handleCabinClassChange = (event) => {
    setCabinClass(event.target.value);
  };

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };

  const isRoundTrip = tripType === 'round';

  const handleSearch = () => {
    router.push(
      `/flights/${departureAirport?.city
        .toLocaleLowerCase()
        .split(' ')
        .join(
          '_'
        )}-${departureAirport?.code.toLocaleLowerCase()}/${arrivalAirport?.city
        .toLocaleLowerCase()
        .split(' ')
        .join(
          '_'
        )}-${arrivalAirport.code.toLocaleLowerCase()}/${tripType}/${cabinClass}/${
        travelers.adults
      }/${travelers.childrens}/${travelers.infants}/${formatDate(
        departureDate
      )}${tripType === 'round' ? '/' + formatDate(returnDate) : ''}?provider=${provider}`
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setAirportData(_airportSuggestions);
    }, 1000);
  }, []);

  return (
    <div>
      <Stack
        gap={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 2,
          flexDirection: {
            sm: 'row',
            xs: 'column',
          },
        }}
      >
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="trip-type-radio-group"
            name="trip-type-radio-group"
            onChange={(e) => setTripType(e.target.value)}
            value={tripType}
          >
            <FormControlLabel
              value="oneway"
              control={<Radio />}
              label="One Way"
            />
            <FormControlLabel
              value="round"
              control={<Radio />}
              label="Round Trip"
            />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" gap={1}>
          <FormControl fullWidth sx={{ width: 200 }} size="small">
            <Select
              size="small"
              labelId="cabin-class-select-label"
              id="cabin-class-select"
              value={cabinClass}
              onChange={handleCabinClassChange}
              sx={{
                '& .MuiSelect-select': {
                  fontWeight: 500,
                },
              }}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="economy-premium">Economy Premium</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ width: 200 }} size="small">
            <Select
              size="small"
              labelId="provider-select-label"
              id="provider-select"
              value={provider}
              onChange={handleProviderChange}
              sx={{
                '& .MuiSelect-select': {
                  fontWeight: 500,
                },
              }}
            >
              <MenuItem value="skyscanner">Skyscanner</MenuItem>
              <MenuItem value="kayak">Kayak</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid
            size={
              isHome
                ? 12
                : {
                    xs: 12,
                    md: isRoundTrip ? 5.6 : 6,
                  }
            }
          >
            <AirportsSelect
              data={airportData}
              setDepartureAirport={setDepartureAirport}
              setArrivalAirport={setArrivalAirport}
              departureAirport={departureAirport}
              arrivalAirport={arrivalAirport}
            />
          </Grid>
          <Grid
            size={
              isHome
                ? {
                    xs: 12,
                    sm: 6,
                  }
                : { xs: 12, md: isRoundTrip ? 3 : 2 }
            }
          >
            {isRoundTrip ? (
              <DateRange
                setStartDate={setDepartureDate}
                startDate={departureDate}
                setEndDate={setReturnDate}
                endDate={returnDate}
              />
            ) : (
              <DatePicker
                startDate={departureDate}
                setStartDate={setDepartureDate}
              />
            )}
          </Grid>

          <Grid
            size={
              isHome
                ? {
                    xs: 12,
                    sm: 6,
                  }
                : { xs: 12, sm: 10, md: isRoundTrip ? 2.6 : 3.2 }
            }
          >
            <TravelersSelect
              travelers={{
                infants: payload.infants,
                childrens: payload.childrens,
                adults: payload.adults,
              }}
              setTravelers={(v) => setTravelers(v)}
            />
          </Grid>
          <Grid
            size={
              isHome
                ? 12
                : {
                    xs: 12,
                    sm: 2,
                    md: 0.8,
                  }
            }
          >
            {isHome ? (
              <Button
                variant="contained"
                disabled={!departureAirport || !arrivalAirport}
                color="primary"
                size="large"
                fullWidth
                sx={{
                  borderRadius: '8px',
                  fontSize: 18,
                  p: '12px',
                  minHeight: 56,
                  width: '100%',
                }}
                onClick={handleSearch}
                startIcon={<FiSearch />}
              >
                Search Flights
              </Button>
            ) : (
              <Fab
                disabled={!departureAirport || !arrivalAirport}
                component={Button}
                color="primary"
                onClick={handleSearch}
                size="large"
                sx={{
                  borderRadius: shape.borderRadius + 'px',
                  width: '100%',
                  '& .search': {
                    fontSize: 28,
                  },
                }}
              >
                <FiSearch className="search" />
              </Fab>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
