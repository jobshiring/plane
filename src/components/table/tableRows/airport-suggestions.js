import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function FlightSuggestionsList({
  isLoading,
  row,
  handleClickOpen,
  handleClickOpenDelete,
  index,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Index */}
      <TableCell sx={{ textTransform: 'uppercase' }}>
        {isLoading ? <Skeleton variant="text" width={20} /> : index + 1}
      </TableCell>

      {/* Type */}
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {isLoading ? <Skeleton variant="text" /> : row?.type}
      </TableCell>

      {/* Airport */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.airport}
      </TableCell>

      {/* Order */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.order}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={row?.status === 'active' ? 'success' : 'error'}
          >
            {row?.status}
          </Label>
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : fDateShort(row?.createdAt)}
      </TableCell>

      {/* Actions */}
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
            <Tooltip title="Edit">
              <IconButton onClick={handleClickOpen(row)}>
                <MdEdit />
              </IconButton>
            </Tooltip>
          )}

          {isLoading ? (
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
          ) : (
            <Tooltip title="Delete">
              <IconButton onClick={handleClickOpenDelete(row._id || row.id)}>
                <MdDelete />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

FlightSuggestionsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    type: PropTypes.string,
    airport: PropTypes.string,
    order: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    _id: PropTypes.string,
  }),
  index: PropTypes.number,
  handleClickOpen: PropTypes.func,
  handleClickOpenDelete: PropTypes.func,
};
