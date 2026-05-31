'use client';

import React, { useState } from 'react';
import { Dialog } from '@mui/material';

// components
import Table from 'src/components/table/table';
import DeleteDialog from 'src/components/dialog/delete';
import MarkupRow from '@/components/table/tableRows/markup-list';
import MarkupDialog from '@/components/dialog/markup-dialog';
import { _markups } from 'src/_mock/markups';

const TABLE_HEAD = [
  { id: 'markup', label: 'Markup Name', alignRight: false },
  { id: 'b2c', label: 'B2C Markup', alignRight: false, sort: true },
  { id: 'b2b', label: 'B2B Markup', alignRight: false, sort: true },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function MarkupList() {
  // Initialize data safely
  const getInitialData = () => {
    try {
      if (Array.isArray(_markups?.data)) {
        return _markups.data;
      }
      if (Array.isArray(_markups)) {
        return _markups;
      }
      return [];
    } catch (error) {
      console.error('Error loading markup data:', error);
      return [];
    }
  };

  const [data, setData] = useState(getInitialData());
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Add new or edit existing markup
  const handleSave = (newData) => {
    setData((prev) => {
      if (!Array.isArray(prev)) {
        console.warn('prev is not an array, resetting to array');
        return singleData ? [{ ...singleData, ...newData }] : [newData];
      }

      if (singleData) {
        // Update existing
        const updated = prev.map((item) => {
          if (item._id === singleData._id) {
            return { ...item, ...newData, updatedAt: new Date().toISOString() };
          }
          return item;
        });
        return updated;
      } else {
        // Add new
        const newMarkup = {
          ...newData,
          _id: `temp_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        };
        return [...prev, newMarkup];
      }
    });

    setOpen(false);
    setSingleData(null);
  };

  // Delete markup
  const handleDelete = () => {
    setData((prev) => {
      if (!Array.isArray(prev)) {
        console.warn('prev is not an array in delete');
        return [];
      }
      const filtered = prev.filter((item) => item._id !== selectedId);
      return filtered;
    });

    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleClickOpenAdd = () => {
    setSingleData(null);
    setOpen(true);
  };

  const handleClickOpenEdit = (row) => () => {
    setSingleData(row);
    setOpen(true);
  };

  const handleClickOpenDelete = (id) => () => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSingleData(null);
  };

  const handleCloseDelete = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <>
      {/* Add/Edit Dialog */}
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <MarkupDialog
          onClose={handleClose}
          singleData={singleData}
          onSave={handleSave}
          isLoading={false}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog onClose={handleCloseDelete} open={openDialog} maxWidth="xs">
        <DeleteDialog
          onClose={handleCloseDelete}
          onConfirm={handleDelete}
          deleteMessage="Are you sure you want to delete this Markup? This action cannot be undone."
          type="Markup deleted"
        />
      </Dialog>

      {/* Table */}
      <Table
        headData={TABLE_HEAD}
        data={{ data }}
        isLoading={false}
        row={MarkupRow}
        handleClickOpen={handleClickOpenEdit}
        handleClickOpenDelete={handleClickOpenDelete}
        handleClickOpenAdd={handleClickOpenAdd}
        isbtnText="Add Markup"
      />
    </>
  );
}
