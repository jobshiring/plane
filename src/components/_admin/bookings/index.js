'use client';
import React, { useEffect, useState } from 'react';

// components
import Table from 'src/components/table/table';
import BookingList from 'src/components/table/tableRows/booking-list';
import { _bookings } from 'src/_mock/booking';

// Table header config
const TABLE_HEAD = [
  { id: 'name', label: 'Client Name', alignRight: false },
  { id: 'title', label: 'Roots', alignRight: false },
  { id: 'date', label: 'Booking Date', alignRight: false },
  { id: 'mail', label: 'Email', alignRight: false },
  { id: 'status', label: 'Booking Status', alignRight: false },
  { id: 'paymentStatus', label: 'Payment Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

const ITEMS_PER_PAGE = 10;

export default function BookingListComponent() {
  const [allBookings, setAllBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const shouldFail = false;

      if (shouldFail) {
        setError('Failed to load data');
        setAllBookings([]);
      } else {
        setAllBookings(_bookings?.data || _bookings || []);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination logic
  const bookingsArray = Array.isArray(allBookings) ? allBookings : [];
  const totalPages = Math.ceil(bookingsArray.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageData = bookingsArray.slice(startIndex, endIndex);

  return (
    <Table
      headData={TABLE_HEAD}
      data={{
        data: error ? [] : pageData,
        count: totalPages,
        total: bookingsArray.length,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }}
      isLoading={isLoading}
      row={BookingList}
      isSearch
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
