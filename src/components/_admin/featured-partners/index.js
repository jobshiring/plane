'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

// components
import Table from 'src/components/table/table';
import DeleteDialog from '@/components/dialog/delete';
import FeaturedPartnerDialog from '@/components/dialog/featured-partner';
import FeaturedParnterList from '@/components/table/tableRows/featured-partner';
import { _featuredPartnersData } from 'src/_mock/featured_partners';

const TABLE_HEAD = [
  { id: 'name', label: 'Featured Partner', alignRight: false, sort: true },
  { id: 'iata', label: 'IATA', alignRight: false },
  { id: 'icao', label: 'ICAO', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

const ITEMS_PER_PAGE = 10;

export default function FeaturedPartnersComponent() {
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem('featuredPartners');
    if (saved) {
      setPartners(JSON.parse(saved));
    } else {
      setPartners(_featuredPartnersData.data || []);
    }
  }, []);

  // --- Save to localStorage whenever partners change
  useEffect(() => {
    localStorage.setItem('featuredPartners', JSON.stringify(partners));
  }, [partners]);

  // --- Pagination logic
  const totalPages = Math.ceil(partners.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageData = partners.slice(startIndex, endIndex);

  // --- Add / Edit
  const handleSavePartner = (newPartner) => {
    if (singleData) {
      setPartners((prev) =>
        prev.map((p) =>
          p._id === singleData._id ? { ...p, ...newPartner } : p
        )
      );
    } else {
      setPartners((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          name: newPartner.name,
          cover: newPartner.cover,
          iata: newPartner.iata,
          icao: newPartner.icao,
          country: newPartner.country,
          type: newPartner.type,
          status: newPartner.status,
          website: newPartner.website,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setOpenDialog(false);
    setSingleData(null);
  };

  // --- Delete
  const handleDeletePartner = () => {
    setPartners((prev) => prev.filter((p) => p._id !== selectedId));
    setOpenDeleteDialog(false);
    setSelectedId(null);

    const newTotalPages = Math.ceil((partners.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // --- Dialog handlers
  const handleOpenAdd = () => {
    setSingleData(null);
    setOpenDialog(true);
  };
  const handleOpenEdit = (partner) => () => {
    setSingleData(partner);
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
      {/* Add/Edit Dialog */}
      <Dialog onClose={handleCloseAddEdit} open={openDialog} maxWidth="md">
        <FeaturedPartnerDialog
          onClose={handleCloseAddEdit}
          data={singleData}
          type={singleData ? 'Edit Featured Partner' : 'Add Featured Partner'}
          onSave={handleSavePartner}
        />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog onClose={handleCloseDelete} open={openDeleteDialog} maxWidth="xs">
        <DeleteDialog
          onClose={handleCloseDelete}
          onConfirm={handleDeletePartner}
          type="Featured Partner deleted"
          deleteMessage="Are you sure you want to delete this Featured Partner? This action cannot be undone."
        />
      </Dialog>

      {/* Table */}
      <Table
        headData={TABLE_HEAD}
        data={{
          data: pageData,
          count: totalPages,
          total: partners.length,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        }}
        row={FeaturedParnterList}
        handleClickOpen={handleOpenEdit}
        handleClickOpenDelete={handleOpenDelete}
        handleClickOpenAdd={handleOpenAdd}
        isbtnText="Add Partner"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
