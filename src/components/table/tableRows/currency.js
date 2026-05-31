import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

// mui
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';

// components
import Label from 'src/components/label';

// icons
import { MdEdit, MdDelete } from 'react-icons/md';

export default function BrandsRow({
  isLoading,
  row,
  handleClickOpen,
  handleClickOpenDelete,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Name + Code */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <>
            {row?.name || '—'} ({row?.code || 'N/A'})
            {row?.base ? ' (Base Currency)' : ''}
          </>
        )}
      </TableCell>

      {/* Country */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.country || '—'}
      </TableCell>

      {/* Rate */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.rate || 'Default rate'}
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
            {capitalize(row?.status || 'inactive')}
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

BrandsRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.string,
    country: PropTypes.string,
    rate: PropTypes.string,
    base: PropTypes.bool,
    status: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClickOpenDelete: PropTypes.func.isRequired,
};
