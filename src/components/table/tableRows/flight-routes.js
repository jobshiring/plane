import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from '@bprogress/next';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';
import { MdDelete, MdEdit } from 'react-icons/md';

function formatText(text) {
  if (!text) return '';
  return text
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

// Main Component
export default function FlightRoutesList({ isLoading, row, handleClickOpen }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TableRow hover>
      {/* Thumbnail */}
      <TableCell
        component='th'
        scope='row'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <Skeleton
              variant='circular'
              width={40}
              height={40}
            />
          ) : row?.cover?.url ? (
            <ThumbImgStyle>
              <Image
                priority
                fill
                alt='thumbnail'
                src={row.cover.url}
                style={{ objectFit: 'cover' }}
              />
            </ThumbImgStyle>
          ) : (
            <Avatar
              sx={{
                mr: 1,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}>
              {row?.departure?.iataCode?.slice(0, 2)?.toUpperCase() || 'FL'}
            </Avatar>
          )}
          <Typography
            variant='subtitle2'
            color='text.primary'>
            {isLoading ? (
              <Skeleton variant='text' />
            ) : (
              `${row?.arrival?.city || ''} (${row?.arrival?.iataCode || ''})`
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Departure */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          `${row?.departure?.city || ''} (${row?.departure?.iataCode || ''})`
        )}
      </TableCell>

      {/* Trip Type */}
      <TableCell>
        {isLoading ? <Skeleton variant='text' /> : formatText(row?.tripType)}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={row?.status === 'active' ? 'success' : 'error'}>
            {row?.status}
          </Label>
        )}
      </TableCell>

      {/* Dates */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : row?.tripType === 'round' ? (
          `${fDateShort(row?.departureDate)} - ${fDateShort(row?.arrivalDate)}`
        ) : (
          fDateShort(row?.departureDate)
        )}
      </TableCell>

      {/* Actions */}
      <TableCell align='right'>
        <Stack
          direction='row'
          justifyContent='flex-end'>
          {isLoading ? (
            <>
              <Skeleton
                variant='circular'
                width={34}
                height={34}
                sx={{ mr: 1 }}
              />
              <Skeleton
                variant='circular'
                width={34}
                height={34}
              />
            </>
          ) : (
            <>
              <Tooltip title='Edit'>
                <IconButton
                  onClick={() =>
                    router.push(`/admin/featured-flights/${row?._id}`)
                  }>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton onClick={handleClickOpen(row._id)}>
                  <MdDelete />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

FlightRoutesList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string,
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
    departure: PropTypes.shape({
      city: PropTypes.string,
      iataCode: PropTypes.string,
    }),
    arrival: PropTypes.shape({
      city: PropTypes.string,
      iataCode: PropTypes.string,
    }),
    status: PropTypes.string,
    tripType: PropTypes.string,
    departureDate: PropTypes.string,
    arrivalDate: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};
