import React from 'react';
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import amadeusImg from '../../../../public/amadeus.svg';
import duffelImg from '../../../../public/duffel.png';

import Label from '@/components/label';
import { fDateShort } from '@/utils/formatTime';

import { MdEdit, MdDelete } from 'react-icons/md';

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

export default function ModulesList({
  isLoading,
  row,
  index,
  handleClickOpen,
  handleClickOpenDelete,
}) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Index */}
      <TableCell
        component='th'
        scope='row'
        sx={{ textTransform: 'uppercase' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          {isLoading ? (
            <Skeleton
              variant='text'
              width={20}
            />
          ) : (
            index + 1
          )}
        </Box>
      </TableCell>

      {/* Module Name + Image */}
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
          ) : (
            <ThumbImgStyle>
              <Image
                priority
                fill
                alt={`${row?.name || 'module'} thumbnail`}
                src={row?.name === 'amadeus' ? amadeusImg : duffelImg}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </ThumbImgStyle>
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
              row?.name || 'N/A'
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Color Label */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            sx={{
              bgcolor: row?.color || theme.palette.grey[400],
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
        )}
      </TableCell>

      {/* PNR Type */}
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {isLoading ? <Skeleton variant='text' /> : row?.pnrType || 'N/A'}
      </TableCell>

      {/* Created At */}
      <TableCell>
        {isLoading ? <Skeleton variant='text' /> : fDateShort(row?.createdAt)}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant='text' />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={(row?.status === 'active' && 'success') || 'error'}>
            {row?.status || 'unknown'}
          </Label>
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
                <IconButton onClick={handleClickOpen(row)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
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
