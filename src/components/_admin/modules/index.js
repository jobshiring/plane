'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// mui
import { Dialog } from '@mui/material';

// components
import Table from 'src/components/table/table';
import ModulesList from 'src/components/table/tableRows/modules-list';
import ModulesDialog from '@/components/dialog/modules';
import DeleteDialog from '@/components/dialog/delete';

// mock data
import ModuleData from './data.json';

const TABLE_HEAD = [
  { id: '_id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Module', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'pnrType', label: 'PNR Type', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function ModulesListComponent() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search');

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [data, setData] = useState({ data: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        data: ModuleData.data || [],
        count: (ModuleData.data || []).length,
      });
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // ====== SEARCH FILTER ======
  const filteredData = searchParam
    ? data.data.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase())
      )
    : data.data;

  // ====== EDIT HANDLERS ======
  const handleClickOpen = (row) => () => {
    setSingleData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveEdit = (updatedModule) => {
    setData((prev) => {
      const newData = prev.data.map((item) =>
        item._id === updatedModule._id ? updatedModule : item
      );
      return { ...prev, data: newData };
    });
    setOpen(false);
  };

  // ====== DELETE HANDLERS ======
  const handleClickOpenDelete = (id) => () => {
    setIdToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDelete = () => setOpenDialog(false);

  const handleConfirmDelete = () => {
    setData((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item._id !== idToDelete),
    }));
    setOpenDialog(false);
  };

  return (
    <>
      {/* ====== EDIT DIALOG ====== */}
      <Dialog onClose={handleClose} open={open} maxWidth="md">
        <ModulesDialog
          onClose={handleClose}
          singleData={singleData}
          isLoading={isLoading}
          onSave={handleSaveEdit}
        />
      </Dialog>

      {/* ====== DELETE DIALOG ====== */}
      <Dialog onClose={handleCloseDelete} open={openDialog} maxWidth="xs">
        <DeleteDialog
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
          id={idToDelete}
          type="Module deleted"
          deleteMessage="Are you sure you want to delete this Module? This cannot be undone."
        />
      </Dialog>

      {/* ====== TABLE ====== */}
      <Table
        headData={TABLE_HEAD}
        data={{
          data: filteredData,
          count: Math.ceil(filteredData.length / 10),
        }}
        isLoading={isLoading}
        row={ModulesList}
        handleClickOpen={handleClickOpen}
        handleClickOpenDelete={handleClickOpenDelete}
        isSearch
      />
    </>
  );
}
