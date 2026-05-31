import React from 'react';
import { Box, Typography, Card, LinearProgress } from '@mui/material';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function review() {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Guest Ratings
      </Typography>

      <Box
        sx={{
          display: 'inline-block',
          bgcolor: 'rgb(229, 246, 253)',
          p: 2,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="primary">
          4.8
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Excellent hotel.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Based On 45605 reviews
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FaMapMarkerAlt size={18} />
        <Typography variant="body2" fontWeight="medium">
          Location rated{' '}
          <Box component="span" fontWeight="bold">
            4.7/5
          </Box>{' '}
          based on reviews
        </Typography>
      </Box>

      {/* Star ratings */}
      <Box sx={{ mt: 3 }}>
        <RatingBar rating={5} percentage={79} />
        <RatingBar rating={4} percentage={12} />
        <RatingBar rating={3} percentage={4} />
        <RatingBar rating={2} percentage={2} />
        <RatingBar rating={1} percentage={3} />
      </Box>
    </Card>
  );
}

function RatingBar({ rating, percentage }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <Typography variant="body2" sx={{ width: 16, textAlign: 'right' }}>
        {rating}
      </Typography>
      <FaStar color="#1976d2" size={18} />
      <Box sx={{ flexGrow: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgb(238, 238, 238)',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#1976d2',
              borderRadius: 4,
            },
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ width: 32, textAlign: 'right' }}>
        {percentage}%
      </Typography>
    </Box>
  );
}
