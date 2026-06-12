'use client'; // Ensures this component runs only on the client side
import React from 'react';

// Material-UI (MUI) components
import { Box, Grid, Button } from '@mui/material';

// Custom components
import CitySelect from 'src/components/selects/city'; // City selection dropdown
import DateRange from '@/components/selects/date-range'; // Date range picker component
import TravelersSelect from '@/components/selects/hotel-travelers'; // Traveler selection dropdown

// Icons
import { FiSearch } from 'react-icons/fi'; // Search icon

// Date manipulation library
import dayjs from 'dayjs';

// Next.js router for navigation
import { useRouter } from '@bprogress/next';
import { _cities } from '@/_mock/cities';

function formatDate(date) {
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(date).getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export default function HotelSearchForm({ params }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const [selectedCity, setSelectedCity] = React.useState({
    city: 'London',
    code: 'LHR',
  });

  const [travelers, setTravelers] = React.useState({
    rooms: 1,
    adults: 1,
    childrens: '',
  });

  const [startDate, setStartDate] = React.useState(dayjs().add(2, 'day'));
  const [endDate, setEndDate] = React.useState(dayjs().add(5, 'day'));
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  React.useEffect(() => {
    // If params are not provided or malformed, keep defaults and load mock cities
    if (!params || !Array.isArray(params) || params.length < 3) {
      setTimeout(() => {
        setLoading(false);
        setData(_cities);
      }, 500);
      return;
    }

    const rawLocation = params[0] || '';
    const [rawCityPart = '', rawCode = ''] = rawLocation.split('-');

    setSelectedCity({
      city: toTitleCase(decodeURIComponent(rawCityPart).split('_').join(' ')),
      code: (rawCode || 'LHR').toUpperCase(),
    });

    if (params[1]) setStartDate(dayjs(params[1]));
    if (params[2]) setEndDate(dayjs(params[2]));

    setTimeout(() => {
      setLoading(false);
      setData(_cities);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  // Function to convert traveler data object back to rooms state array
  const convertTravelerDataToRooms = (data) => {
    // Initialize rooms array based on the number of rooms
    const roomsArray = Array(data.rooms)
      .fill(null)
      .map((_, index) => ({
        id: index + 1, // Room IDs start from 1
        adults: 1, // Default value, will be updated
        children: [], // Will be populated with children
      }));

    // Parse adults string and update adults count for each room
    if (data.adults) {
      data.adults.split(',').forEach((adultInfo) => {
        const [roomIndex, adultCount] = adultInfo.split('_');
        const roomIdx = Number.parseInt(roomIndex);
        const adults = Number.parseInt(adultCount);

        if (roomsArray[roomIdx]) {
          roomsArray[roomIdx].adults = adults;
        }
      });
    }

    // Parse childrens string and add children to respective rooms
    if (data.childrens) {
      data.childrens.split(',').forEach((childInfo) => {
        const [roomIndex, childAge] = childInfo.split('_');
        const roomIdx = Number.parseInt(roomIndex);
        const age = Number.parseInt(childAge);

        if (roomsArray[roomIdx]) {
          roomsArray[roomIdx].children.push({ age });
        }
      });
    }

    return roomsArray;
  };
  const oldTravelers = (() => {
    try {
      const roomsPart = params && params[3] ? params[3] : null;
      const rooms = roomsPart ? Number((roomsPart || '1').split('_')[0]) : 1;
      const adults = params && params[4] ? params[4] : '1';
      const childrensRaw = params && params[5] ? params[5] : '';
      const childrens = childrensRaw ? decodeURIComponent(childrensRaw).replace(/%2C/g, ',') : '';
      return { rooms, adults, childrens };
    } catch (e) {
      return { rooms: 1, adults: '1', childrens: '' };
    }
  })();
  // Example of converting back to rooms array
  const reconstructedRooms = convertTravelerDataToRooms(oldTravelers);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <CitySelect
            data={data}
            isLoading={loading}
            setSelectedCity={(location) => setSelectedCity(location)}
            selectedCity={selectedCity}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 3,
          }}
        >
          <DateRange
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <TravelersSelect
            travelers={reconstructedRooms}
            setTravelers={({ infants: _infants, ...v }) => setTravelers(v)}
          />
        </Grid>
        {/* md={0.7} */}
        <Grid
          size={{
            xs: 12,
            md: 1,
          }}
        >
          <Button
            // component={Fab}
            variant="contained"
            disabled={!selectedCity}
            loading={loading}
            color="primary"
            size="large"
            fullWidth
            sx={{
              fontSize: 34,

              height: '56px',
            }}
            onClick={() => {
              setLoading(true);
              router.push(
                `/hotels/${selectedCity?.city
                  .toLocaleLowerCase()
                  .split(' ')
                  .join(
                    '_'
                  )}-${selectedCity?.code.toLocaleLowerCase()}/${formatDate(
                  startDate
                )}/${formatDate(endDate)}/${travelers.rooms}/${
                  travelers.adults
                }/${travelers.childrens}`
              );
            }}
          >
            <FiSearch />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
