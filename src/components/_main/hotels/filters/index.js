'use client';

import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material';
import SearchFilter from './search';
import PriceRangeFilter from './price-range';
import StarRatingFilter from './star-rating';
import HotelAmenitiesFilter from './hotel-amenities';
import RoomAmenitiesFilter from './room-amenities';
import { CgClose } from 'react-icons/cg';

export default function Filters({
  searchQuery,
  priceRange,
  starRatings,
  selectedHotelAmenities,
  selectedRoomAmenities,
  allHotelAmenities,
  allRoomAmenities,
  onSearchChange,
  onPriceChange,
  onStarRatingChange,
  onHotelAmenityChange,
  onRoomAmenityChange,
  onClearFilter,
  isDrawer,
  toggleDrawer,
  hotelRatingsCount,
}) {
  return (
    <Card
      sx={{
        ...(isDrawer && {
          borderRadius: 0,
          border: 'none !important',
          boxShadow: 'none',
        }),
      }}
    >
      <CardContent
        sx={{
          p: 2,
        }}
      >
        <Stack gap={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5">Filters</Typography>
            <Tooltip title={isDrawer ? 'Close' : 'Clear filters'} arrow>
              <IconButton
                aria-label="close"
                onClick={() => (isDrawer ? toggleDrawer() : onClearFilter())}
              >
                <CgClose />
              </IconButton>
            </Tooltip>
          </Box>

          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
          <Divider />
          <PriceRangeFilter
            priceRange={priceRange}
            onPriceChange={onPriceChange}
          />
          <Divider />
          <StarRatingFilter
            starRatings={starRatings}
            hotelRatingsCount={hotelRatingsCount}
            onStarRatingChange={onStarRatingChange}
          />
          <Divider />
          <HotelAmenitiesFilter
            selectedAmenities={selectedHotelAmenities}
            allAmenities={allHotelAmenities}
            onAmenityChange={onHotelAmenityChange}
          />
          <Divider />
          <RoomAmenitiesFilter
            selectedAmenities={selectedRoomAmenities}
            allAmenities={allRoomAmenities}
            onRoomAmenityChange={onRoomAmenityChange}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
