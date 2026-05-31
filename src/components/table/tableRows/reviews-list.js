import React from 'react';
import { styled } from '@mui/material/styles';
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
  Rating,
} from '@mui/material';
import Image from 'next/image';
import { fDateShort } from '@/utils/formatTime';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useRouter } from '@bprogress/next';

// Styled thumbnail box
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

export default function ReviewList({ isLoading, row, handleClickOpen }) {
  const router = useRouter();
  return (
    <TableRow hover>
      {/* Thumbnail + Name */}
      <TableCell component="th" scope="row">
        <Box
          sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : row?.cover?.url ? (
            <ThumbImgStyle>
              <Image
                priority
                fill
                alt="Thumbnail"
                src={row?.cover?.url}
                style={{ objectFit: 'cover' }}
              />
            </ThumbImgStyle>
          ) : (
            <Avatar color="primary" sx={{ mr: 1 }}>
              {row?.title?.slice(0, 2)?.toUpperCase() || 'U'}
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
              row?.name || 'Anonymous User'
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Title */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.title || 'Untitled'}
      </TableCell>

      {/* Comment */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography
            variant="body2"
            noWrap
            sx={{
              width: 150,
              textOverflow: 'ellipsis',
            }}
          >
            {row?.comment || 'No comment provided'}
          </Typography>
        )}
      </TableCell>

      {/* Rating */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Rating
            size="small"
            name="read-only"
            precision={0.5}
            value={row?.rating || 0}
            readOnly
          />
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateShort(row?.createdAt || new Date())
        )}
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
              <IconButton
                onClick={() => router.push(`/admin/reviews/${row?._id}`)}
              >
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
              <IconButton onClick={handleClickOpen?.(row?._id)}>
                <MdDelete />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
