'use client';
import React from 'react';
import PropTypes from 'prop-types';
// mui
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
  Box,
  alpha,
  Typography,
  Divider,
} from '@mui/material';
import { IoIosWarning } from 'react-icons/io';
import { IoWarning } from 'react-icons/io5';

export default function DeleteDialog({ ...props }) {
  const { onClose, open, onClick, loading } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              height: 44,
              width: 44,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              borderRadius: '12px',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IoWarning size={22} />
          </Box>

          <Box>
            <Typography variant="h6"> Update role Confirmation</Typography>
            <Typography variant="body2" color="text.secondary">
              This action cannot be undone
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          You are about to update the role for this user. This action may change
          the permissions and access levels assigned to them.
        </DialogContentText>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 0,
          gap: 1,
        }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit" fullWidth>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          loading={loading}
          onClick={onClick}
          fullWidth
        >
          Yes, Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
