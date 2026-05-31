import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from '@bprogress/next';
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { IoEyeOutline } from 'react-icons/io5';

// components
import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function LatestBookingsRow({ isLoading, row }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TableRow hover>
      {/* Name */}
      <TableCell sx={{ color: 'text.primary !important' }}>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          `${row?.firstName || ''} ${row?.lastName || ''}`
        )}
      </TableCell>

      {/* Email */}
      <TableCell>
        <Box sx={{ color: 'text.primary !important' }}>
          {isLoading ? <Skeleton variant='text' /> : row?.email || ''}
        </Box>
      </TableCell>

      {/* Route */}
      <TableCell
        component='th'
        scope='row'>
        <Box
          sx={{
            color: (theme) => `${theme.palette.text.primary} !important`,
          }}>
          {isLoading ? (
            <Skeleton
              variant='text'
              width={120}
            />
          ) : row?.bookingDetails?.supplier === 'duffel' ? (
            `${row?.bookingDetails?.slices?.[0]?.origin?.iata_code || ''} to ${
              row?.bookingDetails?.slices?.[0]?.destination?.iata_code || ''
            }`
          ) : (
            `${
              row?.bookingDetails?.itineraries?.[0]?.segments?.[0]?.departure
                ?.iataCode || ''
            } to ${
              row?.bookingDetails?.itineraries?.[0]?.segments?.[
                row?.bookingDetails?.itineraries?.[0]?.segments?.length - 1
              ]?.arrival?.iataCode || ''
            }`
          )}
        </Box>
      </TableCell>

      {/* Booking Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              row?.bookingStatus === 'confirmed'
                ? 'success'
                : row?.bookingStatus === 'pending'
                ? 'primary'
                : 'error'
            }>
            {row?.bookingStatus || 'unknown'}
          </Label>
        )}
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={row?.paymentStatus === 'paid' ? 'success' : 'error'}>
            {row?.paymentStatus || 'unpaid'}
          </Label>
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          (() => {
            const raw = row?.createdAt ?? row?.date ?? row?.bookingDate;
            if (!raw) return 'N/A';

            const d = new Date(raw);
            if (Number.isNaN(d.getTime())) return 'N/A';

            return fDateShort(d);
          })()
        )}
      </TableCell>

      {/* Action */}
      <TableCell align='right'>
        <Stack
          direction='row'
          justifyContent='flex-end'>
          {isLoading ? (
            <Skeleton
              variant='circular'
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
          ) : (
            <Tooltip title='Preview'>
              <IconButton
                onClick={() => router.push(`/admin/bookings/${row?._id}`)}>
                <IoEyeOutline />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------
// PropTypes validation
LatestBookingsRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    bookingStatus: PropTypes.string,
    paymentStatus: PropTypes.string,
    createdAt: PropTypes.string,
    bookingDetails: PropTypes.shape({
      supplier: PropTypes.string,
      slices: PropTypes.arrayOf(
        PropTypes.shape({
          origin: PropTypes.shape({
            iata_code: PropTypes.string,
          }),
          destination: PropTypes.shape({
            iata_code: PropTypes.string,
          }),
        })
      ),
      itineraries: PropTypes.arrayOf(
        PropTypes.shape({
          segments: PropTypes.arrayOf(
            PropTypes.shape({
              departure: PropTypes.shape({
                iataCode: PropTypes.string,
              }),
              arrival: PropTypes.shape({
                iataCode: PropTypes.string,
              }),
            })
          ),
        })
      ),
    }),
  }).isRequired,
};
