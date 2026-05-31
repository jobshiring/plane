"use client";

import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Rating,
} from "@mui/material";

export default function StarRatingFilter({
  starRatings,
  onStarRatingChange,
  hotelRatingsCount,
}) {
  const handleChange = (star) => {
    onStarRatingChange(star);
  };
  console.log(hotelRatingsCount, [11, 2, 3, 4], "hotelRatingsCount");
  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Star rating
      </Typography>

      <FormGroup>
        {[5, 4, 3, 2, 1].map((star, i) => (
          <FormControlLabel
            key={star}
            control={
              <Checkbox
                checked={starRatings[star]}
                onChange={() => handleChange(star)}
                size="small"
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Rating value={star} readOnly size="small" />
                <Typography variant="body2">
                  ({hotelRatingsCount?.length > 0 ? hotelRatingsCount[i] : ""})
                </Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>
    </>
  );
}
