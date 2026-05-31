'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
import { fData } from '@/utils/formatNumber';

const isString = (val) => typeof val === 'string' || val instanceof String;

const ShowRejectionItems = ({ fileRejections }) => (
  <Paper
    variant="outlined"
    sx={{
      py: 1,
      px: 2,
      my: 2,
      borderColor: 'error.light',
      bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
    }}
  >
    {fileRejections.map(({ file, errors }) => {
      const { path, size } = file;
      return (
        <Box key={path || size} sx={{ my: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {path} - {fData(size)}
          </Typography>
          {errors.map((e) => (
            <Typography key={e.code} variant="caption" component="p">
              - {e.message}
            </Typography>
          ))}
        </Box>
      );
    })}
  </Paper>
);

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.divider}`,
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));

// ---------------- Main Component ----------------

export default function UploadAvatar({ error, file, caption, sx, ...other }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <>
      <RootStyle sx={sx}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter',
            }),
          }}
        >
          <input {...getInputProps()} />

          {file && (
            <Box
              component="img"
              alt="avatar"
              src={isString(file) ? file : file.preview}
              sx={{
                zIndex: 8,
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 },
              }),
            }}
          >
            <MdOutlineAddPhotoAlternate style={{ marginBottom: 4 }} />
            <Typography variant="caption">
              {file ? 'Update photo' : 'Upload photo'}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {caption}

      {fileRejections.length > 0 && (
        <ShowRejectionItems fileRejections={fileRejections} />
      )}
    </>
  );
}
