'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@bprogress/next';
import { useSearchParams, usePathname } from 'next/navigation';
import { useSelector, darkMode } from '@/redux';
// mui
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import NotFound from 'src/components/noDataFound/no-data-found';
import Pagination from 'src/components/pagination';
import TableHead from './table-head';
import { IoMdAdd } from 'react-icons/io';
import { FiDownload } from 'react-icons/fi';
import Search from '../search';

export default function CustomTable(props) {
  const {
    type: _type,
    headData,
    data,
    isLoading,
    mobileRow: _mobileRow,
    row,
    handleClickOpenAdd,
    isbtnText,
    isCSV,
    heading: _heading,
    isSearch,
    hidePagination,
    filters,
    currentPage,
    setCurrentPage,
    ...rest
  } = props;

  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDarkMode = useSelector(darkMode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect mobile screen
  const [state, setState] = useState({});
  const queryString = searchParams.toString();
  const Component = row;

  //  Create query strings dynamically
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Handle filter changes
  const handleChange = (param, val) => {
    setState((prev) => ({ ...prev, [param]: val }));
    push(`${pathname}?` + createQueryString(param, val));
  };

  // Initialize query params into state
  useEffect(() => {
    const params = new URLSearchParams('?' + queryString);
    const paramsObject = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });
    setState((prev) => ({ ...prev, ...paramsObject }));
  }, [queryString]);

  const handleCSVDownload = () => {
    const allData = data?.allData || data?.data || [];

    if (allData.length === 0) {
      alert('No data available to download');
      return;
    }

    const firstItem = allData[0];
    const headers = Object.keys(firstItem).filter((key) => key !== '__v');

    const csvRows = allData.map((item) =>
      headers
        .map((header) => {
          const value = item?.[header];
          // Handle nested objects (like cover.url)
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${value || ''}"`;
        })
        .join(',')
    );

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card>
        {(isSearch || isbtnText || isCSV || filters) && (
          <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
            <Stack
              spacing={{ xs: 0.5, md: 2 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
            >
              {isSearch ? <Search isMobile={isMobile} /> : <div />}

              <Stack direction="row" spacing={2} alignItems="center">
                {isbtnText && (
                  <Button
                    size={isMobile ? 'small' : 'medium'}
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenAdd}
                    startIcon={<IoMdAdd size={20} />}
                  >
                    {isbtnText}
                  </Button>
                )}

                {isCSV && (
                  <Button
                    size={isMobile ? 'small' : 'medium'}
                    variant="contained"
                    color="primary"
                    onClick={handleCSVDownload}
                    startIcon={<FiDownload size={20} />}
                  >
                    Download CSV
                  </Button>
                )}

                {filters &&
                  filters.map((item) => (
                    <FormControl
                      key={item.name}
                      sx={{ maxWidth: 200, minWidth: 140, width: '100%' }}
                    >
                      <InputLabel id={'select-' + item.name}>
                        {item.name}
                      </InputLabel>
                      <Select
                        size={isMobile ? 'small' : 'medium'}
                        labelId={'select-' + item.name}
                        id={'select-' + item.name}
                        value={state[item.param] ?? ''}
                        label={item.name}
                        onChange={(e) =>
                          handleChange(item.param, e.target.value)
                        }
                      >
                        <MenuItem value="">None</MenuItem>
                        {item.data.map((v) => (
                          <MenuItem value={v.slug} key={v.slug}>
                            {v.name || v.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ))}
              </Stack>
            </Stack>
          </CardContent>
        )}

        {/* === Table or Empty State === */}
        {!isLoading && data?.data?.length === 0 ? (
          <NotFound title="No Order Found" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead headData={headData} />
              <TableBody>
                {(isLoading ? Array.from(new Array(6)) : data?.data || []).map(
                  (item, index) => (
                    <Component
                      key={index}
                      row={item}
                      index={index}
                      isLoading={isLoading}
                      isDarkMode={isDarkMode}
                      router={{ push }}
                      {...rest}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* === Pagination === */}
      {!isLoading && !hidePagination && (
        <Stack alignItems="flex-end" mt={2} pr={2}>
          <Pagination
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
      )}
    </>
  );
}
