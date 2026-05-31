import React from 'react';
import { useRouter } from '@bprogress/next';
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  styled,
  Avatar,
  Box,
} from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';
import { fDateShort } from '@/utils/formatTime';
import Image from 'next/image';

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

export default function BlogsRow({
  isLoading,
  row,
  handleClickOpen,
  index: _index,
}) {
  const router = useRouter();
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
              row?.title || 'Unnamed Blog'
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Category */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.category}
      </TableCell>

      {/* Description */}
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography
            variant="body2"
            color="text.primary"
            dangerouslySetInnerHTML={{
              __html: `${row?.description?.slice(0, 50) || ''}`,
            }}
          />
        )}
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
                <IconButton
                  onClick={() => router.push(`/admin/blogs/${row.slug}`)}
                >
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen(row._id || row.id)}>
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
