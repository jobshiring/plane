"use client";

import { Stack, Button, Skeleton } from "@mui/material";
import {
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaStarHalf,
} from "react-icons/fa";
export default function SortSelector({ sortBy, onSortChange, isLoading }) {
  const handleChange = (param) => {
    onSortChange(param);
  };

  return (
    <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
      {isLoading ? (
        <>
          <Skeleton
            variant="rounded"
            width="100%"
            height={48}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={48}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={48}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          />
        </>
      ) : (
        <>
          <Button
            variant={sortBy === "recommended" ? "contained" : "outlined"}
            color={sortBy === "recommended" ? "primary" : "inherit"}
            fullWidth
            size="large"
            onClick={() => handleChange("recommended")}
            startIcon={<FaStarHalf />}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          >
            Reviews (5-0)
          </Button>{" "}
          <Button
            variant={sortBy === "price-low" ? "contained" : "outlined"}
            color={sortBy === "price-low" ? "primary" : "inherit"}
            fullWidth
            size="large"
            startIcon={<FaSortNumericDown />}
            onClick={() => handleChange("price-low")}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          >
            Low to high
          </Button>
          <Button
            variant={sortBy === "price-high" ? "contained" : "outlined"}
            color={sortBy === "price-high" ? "primary" : "inherit"}
            fullWidth
            size="large"
            onClick={() => handleChange("price-high")}
            startIcon={<FaSortNumericDownAlt />}
            sx={{
              border: (theme) => "1px solid " + theme.palette.divider,
            }}
          >
            High to low
          </Button>
        </>
      )}
    </Stack>
  );
}
