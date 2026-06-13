'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Drawer, Container, Grid, Box, Pagination, Stack } from '@mui/material';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import SortSelector from '@/components/_main/hotels/sort-selector';
import Filters from '@/components/_main/hotels/filters';
import HotelList from '@/components/_main/hotels/hotel-list';
import ModuleInfo from '@/components/cards/module-info';
import { _hotels as hotelData } from '@/_mock/hotels';
import HotelSearchLongSkeleton from '@/components/skeletons/flights/flight-search-long';
// Dynamically importing FlightSearch component with a loading skeleton
const HotelSearch = dynamic(
  () => import('src/components/cards/hotel-searchbar'),
  {
    ssr: false, // Disables server-side rendering for this component
    loading: () => <HotelSearchLongSkeleton isRoundTrip={false} />, // Displays a skeleton while loading
  }
);
// Normalize mock export to an array if necessary
const hotelsSource = Array.isArray(hotelData) ? hotelData : (hotelData && hotelData.data) ? hotelData.data : [];

// Fallback sample hotels to display when mocks and API return nothing
const SAMPLE_HOTELS = [
  {
    id: 'sample-1',
    name: 'Sample Grand Hotel',
    location: 'Sample City',
    price: 129,
    stars: 4,
    rating: 4.3,
    hotelAmenities: ['Free WiFi', 'Breakfast included'],
    roomAmenities: ['AC', 'TV'],
    image: 'sample-1.jpg',
  },
  {
    id: 'sample-2',
    name: 'Cozy Sample Suites',
    location: 'Sample City',
    price: 89,
    stars: 3,
    rating: 3.9,
    hotelAmenities: ['Free WiFi'],
    roomAmenities: ['AC'],
    image: 'sample-2.jpg',
  },
];

const defaultHotels = hotelsSource && hotelsSource.length > 0 ? hotelsSource : SAMPLE_HOTELS;

// Get unique amenities from all hotels
const getUniqueAmenities = () => {
  const hotelAmenities = new Set();
  const roomAmenities = new Set();

  defaultHotels.forEach((hotel) => {
    if (hotel.hotelAmenities) {
      hotel.hotelAmenities.forEach((amenity) => hotelAmenities.add(amenity));
    }
    if (hotel.roomAmenities) {
      hotel.roomAmenities.forEach((amenity) => roomAmenities.add(amenity));
    }
  });

  return {
    hotelAmenities: Array.from(hotelAmenities),
    roomAmenities: Array.from(roomAmenities),
  };
};

const { hotelAmenities: allHotelAmenities, roomAmenities: allRoomAmenities } =
  getUniqueAmenities();

export default function HotelListing({ slug }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const [starRatings, setStarRatings] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });
  const [hotelRatingsCount, setHotelRatingsCount] = useState([0, 0, 0, 0, 0]);

  const [selectedHotelAmenities, setSelectedHotelAmenities] = useState([]);
  const [selectedRoomAmenities, setSelectedRoomAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [isInitialized, setIsInitialized] = useState(false);
  const [open, setOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Add ref to prevent multiple simultaneous fetch attempts for the same slug
  const lastSlugRef = useRef(null);

  useEffect(() => {
    // Only load if the slug actually changed
    const currentSlugKey = slug ? slug.join('-') : null;
    
    if (currentSlugKey === lastSlugRef.current) return; // Skip if same slug
    lastSlugRef.current = currentSlugKey;
    
    // Load hotels from API when `slug` (search params) is present,
    // otherwise fall back to mock data.
    async function loadHotels() {
      // Set default hotels immediately so user sees something fast!
      setHotels(defaultHotels);
      setFilteredHotels(defaultHotels);
      setIsInitialized(true);

      if (slug && slug.length > 0) {
        try {
          setIsInitialized(false);

          const [location, checkin, checkout, roomsPart, adults] = slug;
          const rooms = roomsPart ? parseInt((roomsPart || '1').split('_')[0]) : 1;

          // First try the existing run ID the user provided
          const existingRunId = '928VJ9VfxaBU2zFoh';
          let items = [];
          
          try {
            console.log('Trying existing run ID:', existingRunId);
            const ds = await fetch(`/api/hotels?runId=${existingRunId}&maxItems=100`);
            if (ds.ok) {
              const dsJson = await ds.json();
              if (dsJson.items && dsJson.items.length > 0) {
                items = dsJson.items;
                console.log('Got items from existing run:', items.length);
              }
            }
          } catch (existingErr) {
            console.warn('Existing run ID failed, trying to start new run:', existingErr);
          }

          // If existing run didn't work, try to start a new one (but with shorter wait)
          if (items.length === 0) {
            const input = {
              locationSlug: location,
              checkinDate: checkin,
              checkoutDate: checkout,
              adults: Number(adults) || 1,
              rooms: rooms || 1,
              maxItems: 100,
            };

            const startRes = await fetch('/api/hotels', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(input),
            });
            const startJson = await startRes.json();

            items = startJson.items || [];

            const runId = startJson.runId || (startJson.run && (startJson.run.data?.id || startJson.run.id));
            if (runId && items.length === 0) {
              // Poll, but only 3 times (max 9s total)
              let pollCount = 0;
              const maxPolls = 3;
              while (pollCount < maxPolls) {
                pollCount++;
                // wait 3s between polls
                await new Promise((r) => setTimeout(r, 3000));
                // Check if we should still be polling this run (slug didn't change)
                const currentSlugKeyNow = slug ? slug.join('-') : null;
                if (currentSlugKeyNow !== currentSlugKey) {
                  console.log('Slug changed, stopping poll');
                  break;
                }
                try {
                  const ds = await fetch(`/api/hotels?runId=${runId}&maxItems=100`);
                  const dsJson = await ds.json();
                  if (dsJson.items && dsJson.items.length > 0) {
                    items = dsJson.items;
                    break;
                  }
                } catch (pollErr) {
                  console.warn('Poll attempt failed', pollErr);
                }
              }
            }
          }

          if (items && items.length > 0) {
            setHotels(items);
            setFilteredHotels(items);
          } 
        } catch (err) {
          console.error('Hotel API error', err);
        } finally {
          setIsInitialized(true);
        }
      } 
    }

    loadHotels();
  }, [slug]);

  // Initialize filters from URL params
  useEffect(() => {
    if (!searchParams || isInitialized) return;

    const query = searchParams.get('q');
    if (query) setSearchQuery(query);

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)]);
    }
    const ratingCount = [0, 0, 0, 0, 0]; // index 0 => 5 stars, 4 => 1 star

    defaultHotels.forEach((hotel) => {
      const stars = Number(hotel.stars); // Ensure it's a number
      if (stars >= 1 && stars <= 5) {
        const index = 5 - stars; // 5 stars go to index 0, etc.
        ratingCount[index]++;
      }
    });

    setHotelRatingsCount(ratingCount);
    const stars = searchParams.get('stars');
    if (stars) {
      const selectedStars = stars.split(',');
      const newStarRatings = { ...starRatings };
      selectedStars.forEach((star) => {
        if (['1', '2', '3', '4', '5'].includes(star)) {
          newStarRatings[star] = true;
        }
      });
      setStarRatings(newStarRatings);
    }

    const hotelAmenities = searchParams.get('hotelAmenities');
    if (hotelAmenities) {
      setSelectedHotelAmenities(hotelAmenities.split(','));
    }

    const roomAmenities = searchParams.get('roomAmenities');
    if (roomAmenities) {
      setSelectedRoomAmenities(roomAmenities.split(','));
    }

    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
    setTimeout(() => {
      setIsInitialized(true);
    }, 2000);
  }, [searchParams, isInitialized, starRatings]);

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);

    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    const selectedStars = Object.keys(starRatings).filter(
      (star) => starRatings[star]
    );
    if (selectedStars.length > 0) {
      params.set('stars', selectedStars.join(','));
    }

    if (selectedHotelAmenities.length > 0) {
      params.set('hotelAmenities', selectedHotelAmenities.join(','));
    }

    if (selectedRoomAmenities.length > 0) {
      params.set('roomAmenities', selectedRoomAmenities.join(','));
    }

    if (sortBy !== 'recommended') {
      params.set('sort', sortBy);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    searchQuery,
    priceRange,
    starRatings,
    selectedHotelAmenities,
    selectedRoomAmenities,
    sortBy,
    router,
    pathname,
  ]);

  // Apply filters and update URL
  useEffect(() => {
    if (!isInitialized) return;

    let result = hotels;

    if (searchQuery) {
      result = result.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    const selectedStars = Object.keys(starRatings).filter(
      (star) => starRatings[star]
    );
    if (selectedStars.length > 0) {
      result = result.filter((hotel) =>
        selectedStars.includes(hotel.stars.toString())
      );
    }

    if (selectedHotelAmenities.length > 0) {
      result = result.filter((hotel) =>
        selectedHotelAmenities.every(
          (amenity) =>
            hotel.hotelAmenities && hotel.hotelAmenities.includes(amenity)
        )
      );
    }

    if (selectedRoomAmenities.length > 0) {
      result = result.filter((hotel) =>
        selectedRoomAmenities.every(
          (amenity) =>
            hotel.roomAmenities && hotel.roomAmenities.includes(amenity)
        )
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    setFilteredHotels(result);
    setPage(1); // Reset page to 1 when filters change
    updateSearchParams();
  }, [
    hotels,
    searchQuery,
    priceRange,
    starRatings,
    selectedHotelAmenities,
    selectedRoomAmenities,
    sortBy,
    isInitialized,
    router,
    pathname,
    updateSearchParams,
  ]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleStarRatingChange = (star) => {
    setStarRatings({
      ...starRatings,
      [star]: !starRatings[star],
    });
  };

  const handleHotelAmenityChange = (amenity) => {
    setSelectedHotelAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleRoomAmenityChange = (amenity) => {
    setSelectedRoomAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
    setPriceRange([100, 5000]);
    setStarRatings({
      5: false,
      4: false,
      3: false,
      2: false,
      1: false,
    });

    setSelectedHotelAmenities([]);
    setSelectedRoomAmenities([]);
    setSortBy('recommended');
    setPage(1);
    router.replace(pathname, { scroll: false });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  console.log(hotelRatingsCount, 'ratingCount');
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <HotelSearch params={slug} />
        <Grid container spacing={3}>
          <Grid size={{ lg: 3, xs: 12 }}>
            <Box
              sx={{
                display: { lg: 'block', xs: 'none' },
                position: 'sticky',
                top: 24,
              }}
            >
              <Filters
                searchQuery={searchQuery}
                priceRange={priceRange}
                starRatings={starRatings}
                selectedHotelAmenities={selectedHotelAmenities}
                selectedRoomAmenities={selectedRoomAmenities}
                allHotelAmenities={allHotelAmenities}
                allRoomAmenities={allRoomAmenities}
                onSearchChange={handleSearchChange}
                onPriceChange={handlePriceChange}
                onStarRatingChange={handleStarRatingChange}
                onHotelAmenityChange={handleHotelAmenityChange}
                onRoomAmenityChange={handleRoomAmenityChange}
                onClearFilter={handleClearFilter}
                isLoading={!isInitialized}
                hotelRatingsCount={hotelRatingsCount}
              />
            </Box>
          </Grid>

          <Grid size={{ lg: 9, xs: 12 }}>
            <Stack gap={2}>
              <ModuleInfo
                isHotel
                slug={slug}
                toggleDrawer={toggleDrawer}
                isLoading={!isInitialized}
                count={filteredHotels.length}
              />
              <SortSelector
                sortBy={sortBy}
                isLoading={!isInitialized}
                onSortChange={handleSortChange}
              />
              <HotelList
                hotels={paginatedHotels}
                onClearFilter={handleClearFilter}
                isLoading={!isInitialized}
                slug={slug}
              />
              {isInitialized && (
                <Pagination
                  color="primary"
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handleChangePage}
                  sx={{ ml: 'auto' }}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
        <Drawer
          ModalProps={{ keepMounted: true }}
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
          <Filters
            searchQuery={searchQuery}
            priceRange={priceRange}
            starRatings={starRatings}
            selectedHotelAmenities={selectedHotelAmenities}
            selectedRoomAmenities={selectedRoomAmenities}
            allHotelAmenities={allHotelAmenities}
            allRoomAmenities={allRoomAmenities}
            onSearchChange={handleSearchChange}
            onPriceChange={handlePriceChange}
            onStarRatingChange={handleStarRatingChange}
            onHotelAmenityChange={handleHotelAmenityChange}
            onRoomAmenityChange={handleRoomAmenityChange}
            onClearFilter={handleClearFilter}
            isLoading={true}
            isDrawer
            toggleDrawer={toggleDrawer(false)}
          />
        </Drawer>
      </Stack>
    </Container>
  );
}
