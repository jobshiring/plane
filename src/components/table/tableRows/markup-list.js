import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';

import Label from 'src/components/label';
import { fDateShort } from '@/utils/formatTime';

import { MdEdit, MdDelete } from 'react-icons/md';

// ----------------------------------------------------------------------

export default function MarkupRow({
  isLoading,
  row,
  handleClickOpen,
  handleClickOpenDelete,
  index: _index,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Module Name */}
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {isLoading ? <Skeleton variant="text" /> : row?.moduleId?.name || 'N/A'}
      </TableCell>

      {/* B2C Markup */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : `${row?.b2cMarkup || 0}%`}
      </TableCell>

      {/* B2B Markup */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : `${row?.b2bMarkup || 0}%`}
      </TableCell>

      {/* Created At */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : fDateShort(row?.createdAt)}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              row?.status?.toLowerCase() === 'active' ? 'success' : 'error'
            }
          >
            {capitalize(row?.status || 'unknown')}
          </Label>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                width={34}
                height={34}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="circular" width={34} height={34} />
            </>
          ) : (
            <>
              <Tooltip title="Edit">
                <IconButton onClick={handleClickOpen(row)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpenDelete(row._id)}>
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

// ----------------------------------------------------------------------

MarkupRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  index: PropTypes.number,
  row: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    moduleId: PropTypes.shape({
      name: PropTypes.string,
    }),
    b2cMarkup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    b2bMarkup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClickOpenDelete: PropTypes.func.isRequired,
};
