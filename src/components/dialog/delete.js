import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

// MUI
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  alpha,
  Box,
  Typography,
  Divider,
} from '@mui/material';

// Icons
import { IoWarning } from 'react-icons/io5';

export default function DeleteDialog({
  onClose,
  id,
  onConfirm,
  type,
  deleteMessage,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = () => {
    setLoading(true);

    setTimeout(() => {
      if (onConfirm) onConfirm(id);
      toast.success(type);
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <>
      {/* HEADER */}
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
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.15),
              borderRadius: '12px',
              color: 'error.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IoWarning size={22} />
          </Box>

          <Box>
            <Typography variant="h6">Delete Confirmation</Typography>
            <Typography variant="body2" color="text.secondary">
              This action cannot be undone
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      {/* CONTENT */}
      <DialogContent sx={{ pt: 3 }}>
        <DialogContentText
          sx={{
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {deleteMessage}
        </DialogContentText>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1,
          gap: 1,
        }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit" fullWidth>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          loading={loading}
          onClick={handleDelete}
          fullWidth
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </>
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onConfirm: PropTypes.func,
  type: PropTypes.string.isRequired,
  deleteMessage: PropTypes.string.isRequired,
};
