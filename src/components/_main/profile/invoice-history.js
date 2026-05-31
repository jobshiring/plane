'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { _bookings  } from 'src/_mock/booking';

const Table = dynamic(() => import('src/components/table/table'));
const OrderRow = dynamic(() =>
  import('src/components/table/tableRows/order-row')
);

export default function InvoiceHistory() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search');
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const itemsPerPage = 10;

  const [data, setData] = useState({ data: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allData = _bookings?.data || [];
      setData({ data: allData, count: allData.length });
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = searchParam
    ? data.data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchParam.toLowerCase())
      )
    : data.data;

  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const TABLE_HEAD = [
    { id: 'name', label: 'Client Name', alignRight: false },
    { id: 'id', label: 'Booking ID', alignRight: false },
    { id: 'pnr', label: 'PNR', alignRight: false },
    { id: 'payment', label: 'Payment', alignRight: false },
    { id: 'booking', label: 'Booking', alignRight: false },
    { id: 'createdAt', label: 'Date', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'action', label: 'Action', alignRight: true },
  ];

  return (
    <Box mt={3}>
      <Table
        headData={TABLE_HEAD}
        data={{ data: paginatedData, count: totalPages, allData: filteredData }}
        isLoading={isLoading}
        row={OrderRow}
        isSearch
      />
    </Box>
  );
}
