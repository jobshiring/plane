'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import Table from 'src/components/table/table';
import DeleteDialog from '@/components/dialog/delete';
import CurrencyDialog from '@/components/dialog/currency-dialog';
import Currency from 'src/components/table/tableRows/currency';
import toast from 'react-hot-toast';
import { _currencies } from 'src/_mock/currencies';

const TABLE_HEAD = [
  { id: 'name', label: 'Currency', alignRight: false, sort: true },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'rate', label: 'Rate', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

const ITEMS_PER_PAGE = 10;

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('currencies');
    if (saved) {
      setCurrencies(JSON.parse(saved));
    } else {
      setCurrencies(_currencies.data || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currencies', JSON.stringify(currencies));
  }, [currencies]);

  const totalPages = Math.ceil(currencies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageData = currencies.slice(startIndex, endIndex);

  const handleSaveCurrency = (newCurrency) => {
    const exists = currencies.some(
      (c) => c.name.toLowerCase() === newCurrency.name.toLowerCase()
    );

    if (exists && !singleData) {
      toast.error(
        `Currency ${newCurrency.name} (${newCurrency.code}) already exists`
      );
      return;
    }

    if (singleData) {
      setCurrencies((prev) =>
        prev.map((c) =>
          c._id === singleData._id ? { ...c, ...newCurrency } : c
        )
      );
    } else {
      setCurrencies((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          ...newCurrency,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setOpenDialog(false);
    setSingleData(null);
  };

  const handleDeleteCurrency = () => {
    setCurrencies((prev) => prev.filter((c) => c._id !== selectedId));
    setOpenDeleteDialog(false);
    setSelectedId(null);

    const newTotalPages = Math.ceil((currencies.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handleOpenAdd = () => {
    setSingleData(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (currency) => () => {
    setSingleData(currency);
    setOpenDialog(true);
  };

  const handleOpenDelete = (id) => () => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseAddEdit = () => {
    setOpenDialog(false);
    setSingleData(null);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  return (
    <>
      <Dialog onClose={handleCloseAddEdit} open={openDialog} maxWidth="sm">
        <CurrencyDialog
          onClose={handleCloseAddEdit}
          data={singleData}
          type={singleData ? 'Edit Currency' : 'Add Currency'}
          onSave={handleSaveCurrency}
        />
      </Dialog>

      <Dialog onClose={handleCloseDelete} open={openDeleteDialog} maxWidth="xs">
        <DeleteDialog
          onClose={handleCloseDelete}
          onConfirm={handleDeleteCurrency}
          type="Currency deleted"
          deleteMessage="Are you sure you want to delete this currency? This action cannot be undone."
        />
      </Dialog>

      <Table
        headData={TABLE_HEAD}
        data={{
          data: pageData,
          count: totalPages,
          total: currencies.length,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        }}
        row={Currency}
        handleClickOpen={handleOpenEdit}
        handleClickOpenDelete={handleOpenDelete}
        handleClickOpenAdd={handleOpenAdd}
        isbtnText="Add Currency"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
