'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import CurrencyForm from '../forms/currency';

export default function CurrencyDialog({
  onClose,
  singleData,
  isLoading,
  onSave,
}) {
  const isEdit = Boolean(singleData);
  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          textTransform: 'capitalize',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {isEdit ? 'Edit Currency' : 'Create Currency'}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {isEdit
              ? 'You are about to update this currency. Any changes may affect existing transactions, pricing, and reports. Please ensure the details are accurate before confirming.'
              : 'You are about to create a new currency. Make sure the currency code, name, and symbol are correct, as this will affect all future transactions and pricing.'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <CurrencyForm
          onClose={onClose}
          data={singleData}
          isLoading={isLoading}
          onSave={onSave} // ✅ Pass callback
        />
      </DialogContent>
    </>
  );
}

CurrencyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  singleData: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
};
