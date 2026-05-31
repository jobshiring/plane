import React from 'react';
import PropTypes from 'prop-types';

import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';

// components
import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';
import { IoEye } from 'react-icons/io5';

// ----------------------------------------------------------------------

export default function OrderList({
  isLoading,
  row,
  handleClickOpen: _handleClickOpen,
  index: _index,
  isDarkMode,
  router,
}) {
  const getRouteLabel = () => {
    if (!row?.bookingDetails) return '—';

    if (row.bookingDetails.supplier === 'duffel') {
      const slice = row.bookingDetails.slices?.[0];
      if (slice?.origin?.iata_code && slice?.destination?.iata_code) {
        return `${slice.origin.iata_code} to ${slice.destination.iata_code}`;
      }
    }

    const itinerary = row.bookingDetails.itineraries?.[0];
    if (itinerary?.segments?.length > 0) {
      const first = itinerary.segments[0];
      const last = itinerary.segments[itinerary.segments.length - 1];
      return `${first.departure?.iataCode} to ${last.arrival?.iataCode}`;
    }

    return '—';
  };

  return (
    <TableRow hover>
      {/* Name */}
      <TableCell scope="row">
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          `${row?.firstName || ''} ${row?.lastName || ''}`
        )}
      </TableCell>

      {/* Route */}
      <TableCell component="th" scope="row">
        <Box sx={{ color: 'text.primary' }}>
          {isLoading ? (
            <Skeleton variant="text" width={120} />
          ) : (
            getRouteLabel()
          )}
        </Box>
      </TableCell>

      {/* Booking Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateShort(row?.bookingDate || new Date())
        )}
      </TableCell>

      {/* Email */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.email}
      </TableCell>

      {/* Booking Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={!isDarkMode ? 'ghost' : 'filled'}
            color={
              (row?.bookingStatus === 'confirmed' && 'success') ||
              (row?.bookingStatus === 'pending' && 'info') ||
              'error'
            }
          >
            {row?.bookingStatus}
          </Label>
        )}
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={!isDarkMode ? 'ghost' : 'filled'}
            color={row?.paymentStatus === 'paid' ? 'success' : 'error'}
          >
            {row?.paymentStatus}
          </Label>
        )}
      </TableCell>

      {/* Action */}
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
          ) : (
            <Tooltip title="Preview">
              <IconButton
                onClick={() => router.push(`/admin/bookings/${row._id}`)}
              >
                <IoEye />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

OrderList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  index: PropTypes.number,
  handleClickOpen: PropTypes.func,
  row: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    bookingStatus: PropTypes.string,
    paymentStatus: PropTypes.string,
    bookingDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    bookingDetails: PropTypes.shape({
      supplier: PropTypes.string,
      slices: PropTypes.array,
      itineraries: PropTypes.array,
    }),
  }),
};
