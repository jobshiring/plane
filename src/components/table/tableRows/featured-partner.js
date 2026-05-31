import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import Image from 'next/image';
import { MdDelete, MdEdit } from 'react-icons/md';
import { fDateShort } from 'src/utils/formatTime';
import Label from '@/components/label';

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

export default function FeaturedPartnerList({
  isLoading,
  row,
  handleClickOpen,
  handleClickOpenDelete,
  index: _index,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Thumbnail + Name */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : row?.cover?.url ? (
            <ThumbImgStyle>
              <Image
                priority
                fill
                alt="thumbnail"
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
              }}
            >
              {row?.name?.slice(0, 2)?.toUpperCase() || 'FP'}
            </Avatar>
          )}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ textTransform: 'capitalize' }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.name || 'Unnamed Partner'
            )}
          </Typography>
        </Box>
      </TableCell>
      {/* iata */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.iata}
      </TableCell>
      {/* icao */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.icao}
      </TableCell>
      {/* country */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.country}
      </TableCell>
      {/* type */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.type}
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
      {/* website */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.website}
      </TableCell>
      {/* Created Date */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : fDateShort(row?.createdAt)}
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

FeaturedPartnerList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number,
  handleClickOpen: PropTypes.func.isRequired,
  handleClickOpenDelete: PropTypes.func.isRequired,
};
