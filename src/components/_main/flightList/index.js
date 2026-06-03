'use client'; // Ensures this component runs on the client side
import React from 'react'; // Importing React for component rendering
import dynamic from 'next/dynamic';
import { useSelector, currency } from '@/redux';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import PropTypes from 'prop-types';

// Importing UI components from MUI
import {
  Grid,
  Container,
  Stack,
  Drawer,
  Pagination,
  Button,
  Skeleton,
  Box,
} from '@mui/material';

// Importing icons

import { FaSortNumericDown, FaSortNumericDownAlt } from 'react-icons/fa';

// Importing components
import Filters from '@/components/_main/flightList/filters';
import FlightLongCardSkeleton from 'src/components/skeletons/flights/flight-long-card';
import FlightSearchLongSkeleton from 'src/components/skeletons/flights/flight-search-long';
// import ExpiryCountDown from "@/components/expiryCountdown";
import ModuleInfo from '@/components/cards/module-info';

// Dynamically importing FlightSearch component with a loading skeleton
const FlightSearch = dynamic(
  () => import('src/components/cards/flight-searchbar'),
  {
    ssr: false, // Disables server-side rendering for this component
    loading: () => <FlightSearchLongSkeleton isRoundTrip={false} />, // Displays a skeleton while loading
  }
);

// Dynamically importing FlightCard component with a loading skeleton
const FlightCard = dynamic(() => import('src/components/cards/flight'), {
  ssr: false, // Disables server-side rendering for this component
  loading: () => <FlightLongCardSkeleton />, // Displays a skeleton while loading
});

export default function FlightList({ ...props }) {
  const { slug } = props;
  const currentCurrency = useSelector(currency);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const price = searchParams.get('price');
  const airlines = searchParams.get('airlines');
  const stops = searchParams.get('stop');
  const provider = searchParams.get('provider') || 'skyscanner';
  const runId = searchParams.get('runId') || null;
  const payload = {
    origin: slug[0].split('-')[1]?.toUpperCase(),
    destination: slug[1].split('-')[1]?.toUpperCase(),
    type: slug[2],
    class: slug[3],
    adults: slug[4],
    infants: slug[5],
    childrens: slug[6],
    departure_date: slug[7],
    currency: currentCurrency || 'USD',
    provider,
    runId,
  };

  if (slug[2] === 'round') {
    payload.return_date = slug[8];
  }
  const [repeat, setRepeat] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [sort, setSort] = React.useState('down');
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  // const data = response?.data || [];

  const [page, setPage] = React.useState(1);
  const [flights, setFlights] = React.useState([]);

  const itemsPerPage = 10;

  React.useEffect(() => {
    if (data?.length) {
      // Filter the data based on the criteria
      const filtered = data?.filter((group) =>
        group.some((subgroup) => {
          const flight = subgroup[0];
          const flightPrice = parseInt(flight.price);

          // Check price filter
          let withinPriceRange = true;
          if (price) {
            const minPrice = parseInt(price.split('_')[0]);
            const maxPrice = parseInt(price.split('_')[1]);
            withinPriceRange =
              flightPrice >= minPrice && flightPrice <= maxPrice;
          }

          // Check airline filter
          let isCorrectAirline = true;
          if (airlines) {
            const airlineList = airlines.split('_');
            isCorrectAirline = airlineList.includes(flight.airline);
          }

          // Check stops filter
          let isCorrectStop = true;
          if (stops) {
            const stopCount = parseInt(stops);
            isCorrectStop = subgroup.length - 1 === stopCount;
          }

          return withinPriceRange && isCorrectAirline && isCorrectStop;
        })
      );
      // Update the state
      setPage(1);
      setCount(Math.ceil(filtered?.length / itemsPerPage) || 0);
      setFlights(filtered);
    }
  }, [data, price, airlines, stops, itemsPerPage, repeat]);
  const createQueryString = React.useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleChangePage = (event, value) => {
    const queryString = createQueryString('count', value);
    router.push(`${pathname}?${queryString}`);
    setTimeout(() => {
      setPage(value);
    }, 1000);
  };

  // drawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const paginatedData = !isLoading
    ? flights
        ?.sort((a, b) => {
          const priceA = parseInt(a[0][0].price);
          const priceB = parseInt(b[0][0].price);
          if (sort === 'down') {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
        })
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : Array.from(new Array(3));

  const normalizeCabinClass = (value) => {
    if (typeof value === 'string') return value;
    if (value?.class) return value.class;
    if (value?.name) return value.name;
    return payload.class || 'economy';
  };

  const normalizeBaggage = (baggage) => {
    if (baggage == null) return null;
    if (typeof baggage === 'string') return baggage;
    if (typeof baggage === 'number') return `${baggage}KG`;
    if (typeof baggage === 'object') {
      const parts = [];
      if (baggage.includedCheckedBags != null) {
        parts.push(`${baggage.includedCheckedBags} checked`);
      }
      if (baggage.includedHandBags != null) {
        parts.push(`${baggage.includedHandBags} hand`);
      }
      if (baggage.includedPersonalItem != null) {
        parts.push(`${baggage.includedPersonalItem} personal`);
      }
      return parts.length ? parts.join(' + ') : JSON.stringify(baggage);
    }
    return String(baggage);
  };

  const createLegacyFlightGroup = React.useCallback(
    (flight) => {
      const departureDate = flight.departTime ? new Date(flight.departTime) : null;
      const arrivalDate = flight.arriveTime
        ? new Date(flight.arriveTime)
        : departureDate && flight.durationMinutes
        ? new Date(departureDate.getTime() + flight.durationMinutes * 60000)
        : null;

      const formatTime = (date) =>
        date && !Number.isNaN(date.getTime())
          ? date.toISOString().slice(11, 19)
          : '00:00:00';
      const formatDate = (date) =>
        date && !Number.isNaN(date.getTime())
          ? date.toISOString().slice(0, 10)
          : '0000-00-00';
      const duration =
        flight.duration ||
        `${Math.floor((flight.durationMinutes || 0) / 60)}h ${Math.round(
          (flight.durationMinutes || 0) % 60
        )}m`;
      const bookingLinks = flight.links || {};

      return [
        [
          {
            id: flight.id || `${flight.origin}-${flight.departTime}`,
            airline: flight.airline || flight.carrier || 'Unknown',
            img: flight.airline || 'airline',
            flight_no: flight.flightNumber || flight.flight_no || '',
            class: normalizeCabinClass(flight.cabinClasses),
            price: flight.bestPrice || flight.prices?.cached || 0,
            currency: flight.currency || payload.currency || 'USD',
            departure_code: flight.from?.airport || flight.origin || '',
            arrival_code: flight.to?.airport || flight.destination || '',
            departure_time: formatTime(departureDate),
            departure_date: formatDate(departureDate),
            arrival_time: formatTime(arrivalDate),
            arrival_date: formatDate(arrivalDate),
            departure_airport: flight.from?.airport || flight.origin || '',
            arrival_airport: flight.to?.airport || flight.destination || '',
            arrivalAirportName: flight.to?.airport || flight.destination || '',
            duration_time: duration,
            baggage: normalizeBaggage(flight.baggage),
            refundable: Boolean(flight.refundable),
            links: bookingLinks,
            sourcesFound: flight.sourcesFound || [],
            cheapestSource: flight.cheapestSource || null,
          },
        ],
      ];
    },
    [payload.class, payload.currency]
  );

  React.useEffect(() => {
    const controller = new AbortController();
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/skyscanner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origin: payload.origin,
            destination: payload.destination,
            departDate: payload.departure_date,
            returnDate: payload.return_date,
            currency: payload.currency,
            tripType: slug[2],
            cabinClass: payload.class,
            provider: payload.provider,
            runId: payload.runId,
            adults: Number(payload.adults),
            childrens: Number(payload.childrens),
            infants: Number(payload.infants),
          }),
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          throw new Error(errorPayload?.error || 'Failed to fetch flight results');
        }

        const { items } = await response.json();
        const legacyFlights = Array.isArray(items)
          ? items.map((item) => createLegacyFlightGroup(item))
          : [];

        setData(legacyFlights);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Skyscanner request failed');
          setData([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRepeat((prev) => prev + 1);
        }
      }
    };

    fetchFlights();

    return () => controller.abort();
  }, [payload.origin, payload.destination, payload.departure_date, payload.return_date, payload.currency, payload.class, payload.adults, payload.childrens, payload.infants, slug, createLegacyFlightGroup]);

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <FlightSearch slug={slug} />
        <Grid container spacing={2}>
          <Grid
            size={{
              lg: 3,
              md: 3,
              xs: 12,
            }}
          >
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                  position: 'sticky',
                  top: 24,
                },
              }}
            >
              <Filters
                isLoading={isLoading}
                completeLoading={isLoading}
                data={data}
              />
            </Box>
          </Grid>
          <Grid
            size={{
              lg: 9,
              md: 9,
              xs: 12,
            }}
          >
            <Stack gap={2}>
              <ModuleInfo
                slug={slug}
                toggleDrawer={toggleDrawer}
                isLoading={isLoading}
                count={data?.length}
              />
              {error ? (
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'error.lighter', color: 'error.main' }}>
                  {error}
                </Box>
              ) : null}
              <Stack gap={2} mb={2} direction={{ sm: 'row', xs: 'column' }}>
                {isLoading ? (
                  <>
                    <Skeleton variant="rounded" width="100%" height={48} />
                    <Skeleton variant="rounded" width="100%" height={48} />
                  </>
                ) : (
                  <>
                    {' '}
                    <Button
                      variant={sort === 'down' ? 'contained' : 'outlined'}
                      color={sort === 'down' ? 'primary' : 'inherit'}
                      fullWidth
                      size="large"
                      startIcon={<FaSortNumericDown />}
                      onClick={() => setSort('down')}
                    >
                      Low to high
                    </Button>
                    <Button
                      variant={sort === 'up' ? 'contained' : 'outlined'}
                      color={sort === 'up' ? 'primary' : 'inherit'}
                      fullWidth
                      size="large"
                      onClick={() => setSort('up')}
                      startIcon={<FaSortNumericDownAlt />}
                    >
                      High to low
                    </Button>
                  </>
                )}
              </Stack>
              {paginatedData?.map((flight, index) => (
                <FlightCard
                  isRound={slug[2] === 'round'}
                  key={index}
                  isLoading={isLoading}
                  flight={flight}
                  slug={slug}
                  payload={payload}
                />
              ))}
              <Pagination
                color="primary"
                count={count}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
          </Grid>
        </Grid>
        <Drawer
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 320,
              borderRadius: ' 0px 8px 8px 0px',
            },
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Filters isLoading={isLoading} data={data} isDrawer />
        </Drawer>
        {/* <ExpiryCountDown setCount={setCount} popupOnly />  */}
      </Stack>
    </Container>
  );
}

FlightList.propTypes = {
  slug: PropTypes.array.isRequired,
  payload: PropTypes.object.isRequired,
};