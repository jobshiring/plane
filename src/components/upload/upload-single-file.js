'use client';

import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { UploadIllustration } from '@/components/illustrations';
import { fData } from '@/utils/formatNumber';

// ---------------- Styled Component ----------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.divider}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer',
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}));

const ShowRejectionItems = ({ fileRejections }) => (
  <Paper
    variant="outlined"
    sx={{
      py: 1,
      px: 2,
      mt: 3,
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

// ---------------- Main Component ----------------

export default function UploadSingleFile({
  error,
  file,
  sx,
  onDrop,
  loading,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    onDrop,
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(other.category && { padding: '8px 0' }),
        }}
      >
        {/* Upload progress overlay */}
        {loading > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${loading}%`,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
              zIndex: 10,
            }}
          >
            <Typography variant="h6" color="common.white">
              {loading}%
            </Typography>
          </Box>
        )}

        <input {...getInputProps()} />

        {/* Illustration and label */}
        {!other.category && <UploadIllustration sx={{ width: 220 }} />}

        <Box sx={{ p: 2, ml: { md: 2 } }}>
          <Typography variant={other.category ? 'subtitle1' : 'h5'}>
            Drop or Select image
          </Typography>

          {other.category ? (
            <UploadIllustration sx={{ width: 160 }} />
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Drop image here or Click{' '}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                Browse
              </Typography>{' '}
              through your machine
            </Typography>
          )}
        </Box>

        {/* Preview */}
        {file && (
          <Box
            component="img"
            alt="file preview"
            src={!file.preview ? file.url : file.preview}
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              objectFit: 'contain',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
              backgroundColor: 'background.paper',
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <ShowRejectionItems fileRejections={fileRejections} />
      )}
    </Box>
  );
}
