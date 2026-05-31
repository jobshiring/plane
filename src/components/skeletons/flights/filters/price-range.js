import React from "react";
import { Box, Skeleton } from "@mui/material";
export default function PriceRangeSkeleton() {
  return (
    <Box>
      {/* Skeleton placeholder for the title */}
      <Skeleton variant="text" width={120} sx={{ mb: 3 }} />
      {/* Skeleton for the price range input */}
      <Skeleton variant="rounded" height={40} />
    </Box>
  );
}
