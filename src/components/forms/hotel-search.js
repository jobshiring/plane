'use client'; // Ensures this component runs only on the client side
import React from 'react';

// Material-UI (MUI) components
import { Box, Grid, Button } from '@mui/material';

// Custom components
import CitySelect from 'src/components/selects/city'; // City selection dropdown
import DateRange from '../selects/date-range'; // Date range picker component
import TravelersSelect from '../selects/hotel-travelers'; // Traveler selection dropdown

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
export default function HotelSearchForm() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const [selectedCity, setSelectedCity] = React.useState({
    city: 'Mecca',
    code: 'JED',
  });

  const [travelers, setTravelers] = React.useState({
    rooms: 1,
    adults: 1,
    childrens: '',
  });

  const [startDate, setStartDate] = React.useState(dayjs().add(2, 'day'));
  const [endDate, setEndDate] = React.useState(dayjs().add(5, 'day'));
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      const filtered = _cities.filter(
        (city) =>
          city.city === 'New York' ||
          city.city === 'Toronto' ||
          city.city === 'Mecca' ||
          city.city === 'Mexico' ||
          city.city === 'London'
      );
      setData(filtered);
    }, 1000);
  }, []);

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              sm: 6,
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
              sm: 6,
            }}
          >
            <DateRange
              setStartDate={setStartDate}
              startDate={startDate}
              setEndDate={setEndDate}
              endDate={endDate}
            />
          </Grid>

          <Grid size={12}>
            <TravelersSelect
              travelers={[
                {
                  id: 1,
                  adults: 1,
                  children: [],
                },
              ]}
              setTravelers={({ _infants, ...v }) => setTravelers(v)}
            />
          </Grid>
          {/* md={0.7} */}
          <Grid size={12}>
            <Button
              // component={Fab}
              variant="contained"
              disabled={!selectedCity}
              loading={loading}
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
                  )}/${formatDate(endDate)}/${travelers.rooms}_room${
                    travelers.rooms > 1 ? 's' : ''
                  }/${travelers.adults}/${travelers.childrens}`
                );
              }}
              startIcon={<FiSearch />}
            >
              Search Hotels
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
