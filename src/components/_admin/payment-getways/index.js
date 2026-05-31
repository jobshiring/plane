'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

// mui
import { Dialog } from '@mui/material';

// components
import Table from 'src/components/table/table';
import EditPaymentDialog from '@/components/dialog/edit-payment';
import PaymentGetwaysList from '@/components/table/tableRows/payment-list';
import DeleteDialog from '@/components/dialog/delete';
import { _paymentGateways } from 'src/_mock/payment';

// table header
const TABLE_HEAD = [
  { id: 'title', label: 'Payment Method', alignRight: false },
  { id: 'mode', label: 'Mode', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function PaymentListComponent() {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('paymentGetways');
    const source = saved ? JSON.parse(saved) : _paymentGateways.data;
    setIsLoading(true);
    setTimeout(() => {
      const perPage = 5;
      const start = (pageParam - 1) * perPage;
      const paginated = source.slice(start, start + perPage);
      setData({ data: paginated });
      setIsLoading(false);
    }, 400);
  }, [pageParam]);

  useEffect(() => {
    if (data.data.length) {
      localStorage.setItem('paymentGetways', JSON.stringify(data.data));
    }
  }, [data]);

  const handleClickOpen = (item) => () => {
    setSingleData(item);
    setOpen(true);
  };
  const handleClickOpenDelete = (itemId) => () => {
    setId(itemId);
    setOpenDialog(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDialog(false);

  const handleDelete = () => {
    setData((prev) => {
      const updated = prev.data.filter((item) => item._id !== id);
      localStorage.setItem('paymentGetways', JSON.stringify(updated));
      return { data: updated };
    });
    setOpenDialog(false);
    toast.success('Payment method deleted!');
  };

  const handleUpdate = (updatedItem) => {
    setData((prev) => {
      const updated = prev.data.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      );
      localStorage.setItem('paymentGetways', JSON.stringify(updated));
      return { data: updated };
    });
    setOpen(false);
    toast.success('Payment method updated!');
  };

  return (
    <>
      {/* Edit Dialog */}
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth='xs'
        fullWidth>
        <EditPaymentDialog
          onClose={handleClose}
          data={singleData}
          type='Payment Gateways Update'
          apicall={handleUpdate}
        />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        onClose={handleCloseDelete}
        open={openDialog}
        maxWidth='xs'
        fullWidth>
        <DeleteDialog
          onClose={handleCloseDelete}
          id={id}
          apicall={handleDelete}
          type='Payment Gateway Delete'
          deleteMessage='Are you sure you want to delete this Payment Gateway? This action cannot be undone.'
        />
      </Dialog>

      {/* Table */}
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={PaymentGetwaysList}
        handleClickOpen={handleClickOpen}
        handleClickOpenDelete={handleClickOpenDelete}
      />
    </>
  );
}
