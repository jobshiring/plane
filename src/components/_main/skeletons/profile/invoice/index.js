import React from 'react';
// MUI
import { Box, Card, Skeleton, TableContainer, Table } from '@mui/material';
// Components
import TableBodyMain from './table-body';
import TableHeadMain from './table-head';

export default function TableSkeleton() {
  return (
    <Box mt={3}>
      <Card sx={{ padding: '8px 16px' }}>
        <TableContainer>
          <Table size='small'>
            <TableHeadMain />
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <TableBodyMain />
              </React.Fragment>
            ))}
          </Table>
        </TableContainer>
      </Card>
      <Box mt={3}>
        <Skeleton
          variant='rounded'
          width={114}
          height={32}
          sx={{ margin: 'auto' }}
        />
      </Box>
    </Box>
  );
}
