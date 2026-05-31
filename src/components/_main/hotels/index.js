'use client';

import { useState, useEffect, useCallback } from 'react';
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
// Get unique amenities from all hotels
const getUniqueAmenities = () => {
  const hotelAmenities = new Set();
  const roomAmenities = new Set();

  hotelData.forEach((hotel) => {
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

  useEffect(() => {
    setHotels(hotelData);
    setFilteredHotels(hotelData);
  }, []);

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

    hotelData.forEach((hotel) => {
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
