'use client';
import React, { useEffect, useState } from 'react';
// components
import Table from 'src/components/table/table';
import LatestBookingsRow from '@/components/table/tableRows/latest-bookings';
import { _bookings  } from 'src/_mock/booking';
import { Button, Box, Typography } from '@mui/material';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useRouter } from '@bprogress/next';

// Table header configuration
const TABLE_HEAD = [
  { id: 'name', label: 'Client Name', alignRight: false },
  { id: 'mail', label: 'Email', alignRight: false },
  { id: 'route', label: 'Route', alignRight: false },
  { id: 'status', label: 'Booking Status', alignRight: false },
  { id: 'paymentStatus', label: 'Payment Status', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true },
];

export default function LatestBookingList() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const allBookings = Array.isArray(_bookings)
          ? _bookings
          : _bookings?.data || [];

        const sliced = allBookings.slice(0, 10);

        const formatted = _bookings?.data
          ? { ..._bookings, data: sliced }
          : sliced;

        setData(formatted);
      } catch (err) {
        console.error('Error loading bookings:', err);
        setError('Failed to load booking data');
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Typography
        variant='h6'
        color='text.primary'
        mb={2}>
        Latest Bookings
      </Typography>
      <Table
        headData={TABLE_HEAD}
        data={error ? [] : data}
        isLoading={isLoading}
        row={LatestBookingsRow}
        hidePagination
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant='outlined'
          color='primary'
          endIcon={<IoArrowForwardOutline />}
          onClick={() => router.push('/admin/bookings')}>
          View All
        </Button>
      </Box>
    </>
  );
}
