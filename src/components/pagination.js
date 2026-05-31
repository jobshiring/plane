'use client';

import React, { useCallback, useState, useEffect } from 'react';
// MUI
import Pagination from '@mui/material/Pagination';
// Next.js
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
// PropTypes
import PropTypes from 'prop-types';

export default function PaginationRounded({
  data,
  currentPage,
  setCurrentPage,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [state, setState] = useState(1);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event, value) => {
    if (setCurrentPage) {
      setCurrentPage(value);
    } else {
      setState(value);
      router.push(`${pathname}?${createQueryString('page', value)}`);
    }
  };

  useEffect(() => {
    if (page && !currentPage) {
      setState(Number(page));
    }
  }, [page, currentPage]);

  const displayPage = currentPage || state;

  return (
    <Pagination
      count={data?.count ? data.count : 1}
      page={displayPage}
      onChange={handleChange}
      variant='outlined'
      shape='rounded'
      color='primary'
      sx={{
        mx: 'auto',
        mb: 3,
        '.MuiPagination-ul': {
          justifyContent: 'center',
        },
      }}
    />
  );
}

PaginationRounded.propTypes = {
  data: PropTypes.shape({
    count: PropTypes.number,
  }),
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
