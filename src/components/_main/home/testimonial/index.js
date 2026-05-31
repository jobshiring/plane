'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, Stack, Box, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import TestimonialCard from '@/components/cards/testimonial-card';
import UserReviewDialog from '@/components/dialog/create-review';

function Testimonial({ data }) {
  const [reviews, setReviews] = useState(data.data);
  const isLarge = useMediaQuery('(min-width:1200px)');
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isTablet = useMediaQuery('(min-width:600px)');

  const columns = isLarge ? 3 : isDesktop ? 3 : isTablet ? 2 : 1;

  return (
    <Stack
      sx={{
        gap: 4,
        display: { md: 'flex', xs: 'none' },
      }}
    >
      <div>
        <Typography variant="h2" gutterBottom>
          What Our Customers Say?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These alluring destinations are picked just for you.
        </Typography>
      </div>

      {reviews?.length ? (
        <Masonry columns={columns} spacing={2}>
          {reviews.map((item, index) => (
            <Box key={index}>
              <TestimonialCard item={item} />
            </Box>
          ))}
        </Masonry>
      ) : (
        <Typography variant="h5" color="text.secondary" sx={{ my: 5 }}>
          No testimonial data found!
        </Typography>
      )}
      <UserReviewDialog setstate={setReviews} />
    </Stack>
  );
}

Testimonial.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Testimonial;
