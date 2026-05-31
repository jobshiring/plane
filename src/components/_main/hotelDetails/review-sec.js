import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Grid,
  LinearProgress,
  Rating,
  Button,
  Stack,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
// images
import Image from "next/image";
import HotelReview from "public/images/hotels/hotel_1.jpg";

const reviewStats = [
  { rating: 5, count: 14 },
  { rating: 4, count: 6 },
  { rating: 3, count: 4 },
  { rating: 2, count: 8 },
  { rating: 1, count: 9 },
];

const categoryScores = [
  { label: "Cleanliness", value: 4.0 },
  { label: "Safety & Security", value: 4.0 },
  { label: "Staff", value: 4.0 },
  { label: "Amenities", value: 3.5 },
  { label: "Location", value: 3.0 },
];

const reviews = [
  {
    name: "Alexander Rity",
    date: "4 months ago",
    avater: "public/images/hotels/hotel_2.jpg",
    rating: 5,
    comment:
      "Easy booking, great value! Cozy rooms at a reasonable price in Sheffield’s vibrant center. Surprisingly quiet with nearby Traveller’s accommodations. Highly recommended!",
    images: [HotelReview, HotelReview, HotelReview, HotelReview],
  },
  {
    name: "Emma Creight",
    date: "4 months ago",
    rating: 4,
    comment:
      "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant housing, it’s a peaceful gem. Thumbs up!",
  },
];

const ReviewSection = () => {
  const totalReviews = reviewStats.reduce((acc, r) => acc + r.count, 0);

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reviews
      </Typography>

      <Box display="flex" alignItems="center" gap={3}>
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold">
            4.0
          </Typography>
          <Rating value={4} precision={0.5} readOnly />
          <Typography variant="body2">35k ratings</Typography>
        </Box>

        <Box flex={1}>
          {reviewStats.map((item) => (
            <Box key={item.rating} display="flex" alignItems="center" mb={1}>
              
              <Box width="90%" mx={1}>
                <LinearProgress
                  variant="determinate"
                  value={(item.count / totalReviews) * 100}
                  sx={{ height: 10, borderRadius: 5 }}
                  color="secondary"
                />
              </Box>
              <Stack direction={'row'} gap={'6px'}>
              <Typography sx={{ fontWeight: "800" }} width={20}>
                {item.rating.toFixed(1)}
                </Typography>
                <Typography width={100}>
                {item.count.toLocaleString()}K reviews
              </Typography>
              </Stack>
              
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container my={2}>
        {categoryScores.map((item) => (
          <Grid key={item.label}>
            <Box px={1} py={1} borderRadius={2}>
              <Stack gap={"6px"} direction={'row'}
                sx={{
                  
                  
                  alignItems: 'center',
                  border: '1px solid #eeeeee',
                  padding: '8px 12px',
                  borderRadius:'8px'

              }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold" 
                  color={item.value >= 4 ? "#c92438" : "#000"}
                >
                  {item.value.toFixed(1)} 
                </Typography>
                <Typography variant="body1" color="initial">
                {item.label}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      {reviews.map((review, index) => (
        <Box key={index} borderTop="1px solid #eee" pt={2} mt={2}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display="flex" alignItems="center" gap={"12px"}>
              <Avatar alt={review.name} />
              <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {review.date}
                </Typography>
              </Stack>
            </Box>

            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography fontWeight="bold">
                {review.rating.toFixed(1)}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
          </Stack>

          <Box mt={1}>
            <Typography>{review.comment}</Typography>
            {review.images && (
              <Box mt={1} display="flex" gap={1}>
                {review.images.map((src, i) => (
                  <Box key={i} position="relative" width={60} height={60}>
                    <Image
                      src={src}
                      alt={`review-image-${i}`}
                      fill
                      style={{ borderRadius: 8, objectFit: "cover" }}
                      priority
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}

      <Box mt={2} textAlign="left">
        <Button
          variant="text"
          endIcon={<IoIosArrowDown />}
          sx={{ textTransform: "none", color: "#6a1b9a" }}
        >
          Read all reviews
        </Button>
      </Box>
    </Card>
  );
};

export default ReviewSection;
