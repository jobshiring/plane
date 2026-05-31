import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function Travellers({ data }) {
  const travellers = Array.isArray(data)
    ? data
    : data?.travelers ||
      data?.bookingDetails?.travelers ||
      data?.bookingDetails?.travellers ||
      [];

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        Travellers
      </Typography>

      {travellers.length > 0 ? (
        <Table
          size="small"
          sx={{
            '& td, & th': {
              border: 1,
              borderColor: (theme) => theme.palette.divider,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Name / Type</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Passport No.</TableCell>
              <TableCell>Issuing Country</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Date of Birth</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {travellers.map((item, index) => {
              const firstName = item?.name?.firstName || '';
              const lastName = item?.name?.lastName || '';
              const displayName = `${firstName} ${lastName}`.trim();
              const doc = item?.documents?.[0] || {};

              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.gender === 'MALE' ? 'Mr' : 'Mrs'}</TableCell>
                  <TableCell>
                    {displayName || (item.type ? item.type : 'N/A')}
                  </TableCell>
                  <TableCell>{item.count || 1}</TableCell>
                  <TableCell>{doc.number || 'N/A'}</TableCell>
                  <TableCell>{doc.issuanceCountry || 'N/A'}</TableCell>
                  <TableCell>{doc.expiryDate || 'N/A'}</TableCell>
                  <TableCell>{item.dateOfBirth || 'N/A'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No traveller information available.
        </Typography>
      )}
    </Box>
  );
}
