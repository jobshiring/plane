'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

// components
import Table from 'src/components/table/table';
import DeleteDialog from '@/components/dialog/delete';
import FlightRoutesList from '@/components/table/tableRows/flight-routes';
import { _featuredFlightsData } from 'src/_mock/featured_flights';

const TABLE_HEAD = [
  { id: 'to-airport', label: 'To Airport', alignRight: false },
  { id: 'from-airport', label: 'From Airport', alignRight: false },
  { id: 'tripType', label: 'Trip Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function FlightRoutesListComponent() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRoutes = JSON.parse(
      localStorage.getItem('flightRoutes') || '[]'
    );
    if (savedRoutes.length > 0) {
      setData(savedRoutes);
    } else {
      // initial seed from mock file
      setData(_featuredFlightsData.data || []);
      localStorage.setItem(
        'flightRoutes',
        JSON.stringify(_featuredFlightsData.data || [])
      );
    }
    setIsLoading(false);
  }, []);

  const handleClickOpen = (rowId) => () => {
    setId(rowId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    const updated = data.filter((item) => item._id !== id);
    setData(updated);
    localStorage.setItem('flightRoutes', JSON.stringify(updated));
    setOpen(false);
  };
  const handleClickOpenDelete = (rowId) => () => {
    setId(rowId);
    setOpen(true);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <DeleteDialog
          onClose={handleClose}
          id={id}
          onConfirm={handleDelete}
          type="Flight Route deleted"
          deleteMessage="Are you sure you want to delete this Flight Route? This action cannot be undone."
        />
      </Dialog>

      <Table
        headData={TABLE_HEAD}
        data={{ data }}
        isLoading={isLoading}
        row={FlightRoutesList}
        isSearch
        handleClickOpen={handleClickOpen}
        handleClickOpenDelete={handleClickOpenDelete}
      />
    </>
  );
}
