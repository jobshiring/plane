"use client";

import { Box, Typography, Button, Grid } from "@mui/material";
import HotelCard from "@/components/cards/hotel";

export default function HotelList({ hotels, onClearFilter, isLoading, slug }) {
  if (hotels.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h6">
          No hotels found matching your criteria
        </Typography>
        <Button color="primary" onClick={onClearFilter} sx={{ mt: 2 }}>
          Clear Filters
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {(isLoading ? [...new Array(3)] : hotels).map((hotel, i) => (
        <Grid size={{ md: 12, sm: 6, xs: 12 }} key={hotel?._id + `${i}`}>
          <HotelCard hotel={hotel} isLoading={isLoading} slug={slug} />
        </Grid>
      ))}
    </Grid>
  );
}
