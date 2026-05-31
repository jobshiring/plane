'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// components
import Table from 'src/components/table/table';
import Newsletter from 'src/components/table/tableRows/newsletter';
import { _newsletter } from 'src/_mock/newsletter';

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Date', alignRight: false, sort: true },
  { id: 'action', label: 'Actions', alignRight: 'right' },
];

const STORAGE_KEY = 'newsletter_data';
const ITEMS_PER_PAGE = 10;

export default function NewsletterList() {
  const [allNewsletters, setAllNewsletters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize data from localStorage or JSON file
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const storedNewsletters = localStorage.getItem(STORAGE_KEY);

        if (storedNewsletters) {
          setAllNewsletters(JSON.parse(storedNewsletters));
        } else {
          const initialData = _newsletter.data || _newsletter;
          setAllNewsletters(initialData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
      } catch (_err) {
        console.log(_err);
        setError('Failed to load data');
        setAllNewsletters([]);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
    const updatedNewsletters = allNewsletters.filter((item) => item._id !== id);
    setAllNewsletters(updatedNewsletters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNewsletters));
    toast.success('Email deleted successfully!');

    const newTotalPages = Math.ceil(updatedNewsletters.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const newslettersArray = Array.isArray(allNewsletters) ? allNewsletters : [];
  const totalPages = Math.ceil(newslettersArray.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageData = newslettersArray.slice(startIndex, endIndex);

  return (
    <Table
      headData={TABLE_HEAD}
      data={{
        data: error ? [] : pageData,
        allData: error ? [] : newslettersArray, // Pass full array for CSV
        count: totalPages,
        total: newslettersArray.length,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }}
      isLoading={isLoading}
      row={Newsletter}
      isCSV
      onClickCopy={() => toast.success('Email copied!')}
      handleDelete={handleDelete}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
