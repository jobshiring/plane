'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, DialogContent } from '@mui/material';
import MarkupForm from '../forms/markup';
import markupsData from 'src/components/_admin/modules/data.json';

const MOCK_MODULES = Array.isArray(markupsData?.data)
  ? markupsData.data
  : Array.isArray(markupsData)
  ? markupsData
  : [];

export default function MarkupDialog(props) {
  const { onClose, singleData, isLoading, onSave } = props;

  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}>
        {singleData ? 'Edit Markup' : 'Create Markup'}
      </DialogTitle>

      <DialogContent>
        <MarkupForm
          modulesName={MOCK_MODULES}
          onClose={onClose}
          currentMarkup={singleData}
          isLoading={isLoading}
          onSave={onSave}
        />
      </DialogContent>
    </>
  );
}

MarkupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  singleData: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};
