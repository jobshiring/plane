import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import Label from '@/components/label';
import { fDateShort } from '@/utils/formatTime';
import { MdEdit } from 'react-icons/md';
import styled from '@emotion/styled';
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

export default function PaymentGatewaysList({
  isLoading,
  row,
  handleClickOpen,
  index: _index,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Gateway Name + Image */}
      <TableCell component="th" scope="row">
        <Box
          sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <ThumbImgStyle>
              <Image
                priority
                fill
                alt={`${row?.name || 'Stripe'} thumbnail`}
                src={
                  row?.name === 'Stripe' ? '/stripe-logo.jpg' : '/paypal.png'
                }
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </ThumbImgStyle>
          )}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ textTransform: 'capitalize' }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.name || 'N/A'
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Mode */}
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {isLoading ? <Skeleton variant="text" /> : row?.mode || '—'}
      </TableCell>

      {/* Created Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateShort(row?.createdAt || new Date())
        )}
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
            {row?.status || 'inactive'}
          </Label>
        )}
      </TableCell>

      {/* Edit Action */}
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
              <IconButton onClick={handleClickOpen?.(row)}>
                <MdEdit />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
