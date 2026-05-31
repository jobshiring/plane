import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from '@bprogress/next'; // updated for newer router support
import { fDateShort } from '@/utils/formatTime';

// icons
import { FiEye, FiUser } from 'react-icons/fi';
import { FaUserCheck } from 'react-icons/fa6';

// styled image wrapper
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

export default function UserRow({ isLoading, row, setId }) {
  const router = useRouter();

  return (
    <TableRow hover>
      {/* User Image + Name */}
      <TableCell
        component='th'
        scope='row'>
        <Box
          sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
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
                alt={`${row?.firstName || 'User'} thumbnail`}
                src={row?.cover?.url}
                style={{ objectFit: 'cover' }}
              />
            </ThumbImgStyle>
          ) : (
            <Avatar
              color='primary'
              sx={{ mr: 1 }}>
              {row?.firstName?.slice(0, 1)?.toUpperCase() || 'U'}
            </Avatar>
          )}

          <Typography
            variant='subtitle2'
            noWrap
            sx={{ textTransform: 'capitalize' }}>
            {isLoading ? (
              <Skeleton
                variant='text'
                width={120}
                sx={{ ml: 1 }}
              />
            ) : (
              row?.firstName + ' ' + row?.lastName || 'Unknown User'
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell style={{ minWidth: 160 }}>
        {isLoading ? <Skeleton variant='text' /> : row?.email || '—'}
      </TableCell>

      {/* Phone */}
      <TableCell style={{ minWidth: 80 }}>
        {isLoading ? <Skeleton variant='text' /> : row?.phone || '—'}
      </TableCell>

      {/* Total Orders */}
      <TableCell style={{ minWidth: 40 }}>
        {isLoading ? <Skeleton variant='text' /> : row?.totalOrders || 0}
      </TableCell>

      {/* Role */}
      <TableCell style={{ minWidth: 40, textTransform: 'capitalize' }}>
        {isLoading ? <Skeleton variant='text' /> : row?.role || 'user'}
      </TableCell>

      {/* Created At */}
      <TableCell style={{ minWidth: 40 }}>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          fDateShort(row?.createdAt || new Date())
        )}
      </TableCell>

      {/* Action Buttons */}
      <TableCell>
        <Stack
          direction='row'
          justifyContent='flex-end'
          gap={1}>
          {isLoading ? (
            <>
              <Skeleton
                variant='circular'
                width={40}
                height={40}
              />
              <Skeleton
                variant='circular'
                width={40}
                height={40}
              />
            </>
          ) : (
            <>
              {row?.role === 'super admin' ? (
                <IconButton disabled>
                  <FaUserCheck />
                </IconButton>
              ) : (
                <Tooltip
                  title={
                    row?.role === 'admin' ? 'Remove an admin' : 'Make an admin'
                  }>
                  <IconButton onClick={() => setId?.(row?._id)}>
                    {row?.role === 'admin' ? <FaUserCheck /> : <FiUser />}
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title='Preview'>
                <IconButton
                  onClick={() => router.push(`/admin/users/${row?._id}`)}>
                  <FiEye />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
