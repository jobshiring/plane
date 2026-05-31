'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { useSearchParams } from 'next/navigation';

import Table from 'src/components/table/table';
import DeleteDialog from '@/components/dialog/delete';
import FlightSuggestionsList from '@/components/table/tableRows/airport-suggestions';
import FlightSuggestionsDialog from '@/components/dialog/airportsuggestion';
import { _airportSuggestions } from 'src/_mock/airport_suggestions';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false, sort: true },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'airport', label: 'City Airport', alignRight: false },
  { id: 'order', label: 'Order', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function FlightSuggestionsListComponent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const localData =
        JSON.parse(localStorage.getItem('flightSuggestions')) ||
        _airportSuggestions.data ||
        [];

      let filtered = localData;

      if (searchParam) {
        filtered = filtered.filter((item) =>
          item.airport.toLowerCase().includes(searchParam.toLowerCase())
        );
      }

      setData(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchParam, pageParam]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('flightSuggestions', JSON.stringify(data));
    }
  }, [data, isLoading]);

  const handleClickOpenAdd = () => {
    setSingleData(null);
    setOpen(true);
  };

  const handleClickOpen = (row) => () => {
    setSingleData(row);
    setOpen(true);
  };

  const handleClickOpenDelete = (rowId) => () => {
    setId(rowId);
    setOpenDialog(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDialog(false);

  const handleDeleteConfirm = () => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setOpenDialog(false);
  };

  const handleSaveData = (values) => {
    setData((prev) => {
      if (singleData) {
        // Editing existing
        return prev.map((item) =>
          item.id === singleData.id ? { ...item, ...values } : item
        );
      } else {
        const newItem = {
          id: Date.now(),
          ...values,
          createdAt: new Date().toISOString(),
        };
        return [...prev, newItem];
      }
    });
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <FlightSuggestionsDialog
          onClose={handleClose}
          data={singleData}
          onSubmitData={handleSaveData}
        />
      </Dialog>

      <Dialog onClose={handleCloseDelete} open={openDialog} maxWidth="xs">
        <DeleteDialog
          onClose={handleCloseDelete}
          id={id}
          onConfirm={handleDeleteConfirm}
          type="Flight Suggestion deleted"
          deleteMessage="Are you sure you want to delete this Flight Suggestion? This action cannot be undone."
        />
      </Dialog>

      <Table
        headData={TABLE_HEAD}
        data={{ data }}
        isLoading={isLoading}
        row={FlightSuggestionsList}
        handleClickOpen={handleClickOpen}
        isbtnText="Add Suggestion"
        handleClickOpenAdd={handleClickOpenAdd}
        handleClickOpenDelete={handleClickOpenDelete}
        isSearch
      />
    </>
  );
}
