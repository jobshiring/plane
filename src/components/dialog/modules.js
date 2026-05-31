'use client';
import React from 'react';
import PropTypes from 'prop-types';
// mui
import {
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';
// form
import ModulesForm from '../forms/modules-form';

export default function ModulesDialog(props) {
  const { onClose, singleData, isLoading, onSave } = props;

  const isEdit = Boolean(singleData);
  const moduleName = singleData?.name || 'Module';

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
        <Typography variant="h6">
          {isEdit
            ? `Edit ${moduleName} Module Integration`
            : 'Create New Module'}
        </Typography>

        {/* Contextual description for Amadeus / Duffel */}
        {moduleName?.toLowerCase() === 'amadeus' && (
          <Typography variant="body2" color="text.secondary">
            Amadeus provides access to global flight inventory, pricing, and
            booking services. Please enter your API credentials carefully to
            enable real-time flight search, availability, and ticketing.
          </Typography>
        )}

        {moduleName?.toLowerCase() === 'duffel' && (
          <Typography variant="body2" color="text.secondary">
            Duffel connects you directly with airlines through modern APIs.
            Configure your Duffel access token to enable fast, flexible, and
            commission-free flight bookings.
          </Typography>
        )}
      </DialogTitle>

      <DialogContent>
        <ModulesForm
          onClose={onClose}
          onSave={onSave}
          currentModule={singleData}
          isLoading={isLoading}
        />
      </DialogContent>
    </>
  );
}

ModulesDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  singleData: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
};
