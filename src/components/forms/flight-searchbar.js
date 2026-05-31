'use client';

import React, { useState, useEffect } from 'react';
import {
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Stack,
  MenuItem,
  Select,
  Grid,
} from '@mui/material';

import AirportSelect from 'src/components/selects/airports';
import DateRange from '../selects/date-range';
import TravelersSelect from '../selects/flight-travelers';
import DatePicker from 'src/components/selects/date';

import { FiSearch } from 'react-icons/fi';
import dayjs from 'dayjs';
import { useRouter } from '@bprogress/next';
import { _airportSuggestions } from '@/_mock/airports';

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function FlightSearchForrm(props) {
  const { params } = props;
  const [data, setData] = useState([]);
  const router = useRouter();
  const [type, setType] = useState('economy');
  const [trip, setTrip] = useState('oneway');
  const [loading, setLoading] = useState(true);

  const [departureAirport, setDepartureAirport] = useState({
    city: 'London',
    code: 'LHR',
  });
  const [arrivalAirport, setArrivalAirport] = useState({
    city: 'Dubai',
    code: 'DXB',
  });
  const [travelers, setTravelers] = useState({
    infants: 0,
    childrens: 0,
    adults: 1,
  });

  const [startDate, setStartDate] = useState(dayjs().add(2, 'day'));
  const [endDate, setEndDate] = useState(dayjs().add(5, 'day'));

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const isRoundTrip = trip === 'round';

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    if (params) {
      setDepartureAirport({
        city: toTitleCase(
          decodeURIComponent(params[0].split('-')[0]).split('_').join(' ')
        ),
        code: params[0].split('-')[1].toUpperCase(),
      });
      setArrivalAirport({
        city: toTitleCase(
          decodeURIComponent(params[1].split('-')[0]).split('_').join(' ')
        ),
        code: params[1].split('-')[1].toUpperCase(),
      });
      setTrip(params[2]);
      setType(params[3]);
      setStartDate(dayjs(params[7]));
      if (params[2] === 'round') {
        setEndDate(dayjs(params[8]));
      }
    }
  }, [params]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(_airportSuggestions);
    }, 1000);
  }, []);

  return (
    <Box>
      <Stack
        gap={1}
        alignItems='center'
        justifyContent='space-between'
        sx={{
          flexDirection: {
            sm: 'row',
            xs: 'column',
          },
        }}>
        <FormControl>
          <RadioGroup
            row
            onChange={(e) => setTrip(e.target.value)}
            value={trip}>
            <FormControlLabel
              value='oneway'
              control={<Radio />}
              label='One Way'
            />
            <FormControlLabel
              value='round'
              control={<Radio />}
              label='Round Trip'
            />
          </RadioGroup>
        </FormControl>
        <Stack
          direction='row'
          gap={1}>
          <FormControl
            fullWidth
            sx={{ width: 200 }}
            size='small'>
            <Select
              size='small'
              value={type}
              onChange={handleChange}
              sx={{
                '& .MuiSelect-select': {
                  fontWeight: 500,
                },
              }}>
              <MenuItem value='economy'>Economy</MenuItem>
              <MenuItem value='economy-premium'>Economy Premium</MenuItem>
              <MenuItem value='business'>Business</MenuItem>
              <MenuItem value='first'>First</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Box sx={{ width: '100%' }}>
        <Grid
          container
          spacing={1}>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}>
            <AirportSelect
              setDepartureAirport={setDepartureAirport}
              setArrivalAirport={setArrivalAirport}
              departureAirport={departureAirport}
              arrivalAirport={arrivalAirport}
              isLoading={loading}
              data={data}
            />
          </Grid>

          <Grid
            size={{
              md: isRoundTrip ? 3 : 2,
              xs: 12,
            }}>
            {isRoundTrip ? (
              <DateRange
                setStartDate={setStartDate}
                startDate={startDate}
                setEndDate={setEndDate}
                endDate={endDate}
              />
            ) : (
              <DatePicker
                setStartDate={setStartDate}
                startDate={startDate}
              />
            )}
          </Grid>

          <Grid
            size={{
              md: isRoundTrip ? 2 : 3,
              sm: 6,
              xs: 12,
            }}>
            <TravelersSelect
              params={params}
              travelers={
                params
                  ? {
                      adults: Number(params[4]),
                      childrens: Number(params[5]),
                      infants: Number(params[6]),
                    }
                  : travelers
              }
              setTravelers={setTravelers}
            />
          </Grid>

          <Grid
            size={{
              md: 1,
              xs: 12,
            }}>
            <Button
              variant='contained'
              disabled={!departureAirport || !arrivalAirport || loading}
              loading={loading}
              color='primary'
              size='large'
              fullWidth
              sx={{
                fontSize: 34,
                height: '56px',
              }}
              onClick={() => {
                setLoading(true);
                router.push(
                  `/flights/${departureAirport.city
                    .toLowerCase()
                    .split(' ')
                    .join(
                      '_'
                    )}-${departureAirport.code.toLowerCase()}/${arrivalAirport.city
                    .toLowerCase()
                    .split(' ')
                    .join(
                      '_'
                    )}-${arrivalAirport.code.toLowerCase()}/${trip}/${type}/${
                    travelers.adults
                  }/${travelers.childrens}/${travelers.infants}/${formatDate(
                    startDate
                  )}${trip === 'round' ? '/' + formatDate(endDate) : ''}`
                );
              }}>
              <FiSearch />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
