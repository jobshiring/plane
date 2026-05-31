import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

export default function FareDetails({ data, customerDetails }) {
  console.log(data, 'fare details data');
  // === Handle price data ===

  const price = {
    currency: data?.currency || '$',
    baseFare: data?.actual_price || '0.00',
    taxes: data?.tax || '0.00',
    total: data?.actual_price || data?.tax || '0.00',
  };

  // === Handle customer data ===
  const user = {
    name:
      `${customerDetails?.firstName || ''} ${customerDetails?.lastName || ''}`.trim() ||
      'N/A',
    email: customerDetails?.email || 'user@example.com',
    phone: customerDetails?.phone || '+0000000000',
    address: customerDetails?.address || 'N/A',
    gender: customerDetails?.gender || 'N/A',
  };

  return (
    <Box>
      {/* === Fare Details === */}
      <Typography variant="h6" mb={1}>
        Fare Details
      </Typography>

      <Table
        size="small"
        sx={{
          '& td, & th': {
            border: 1,
            fontWeight: 600,
            borderColor: (theme) => theme.palette.divider,
          },
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell scope="row">Base Fare</TableCell>
            <TableCell align="right">
              {price.currency} {price.baseFare}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">TAX</TableCell>
            <TableCell align="right">
              {price.currency} {price.taxes}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">Total</TableCell>
            <TableCell align="right">
              {price.currency} {price.total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* === Customer Details === */}
      <Typography variant="h6" mt={4} mb={1}>
        Customer Details
      </Typography>

      <Table
        size="small"
        sx={{
          '& td, & th': {
            border: 1,
            borderColor: (theme) => theme.palette.divider,
          },
          '& th': {
            fontWeight: 600,
          },
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell align="right">{user.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell align="right">{user.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">{user.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* === Support Info === */}
      <Typography variant="h6" mt={4} mb={1}>
        Customer Care
      </Typography>

      <Table
        size="small"
        sx={{
          '& td, & th': {
            border: 1,
            borderColor: (theme) => theme.palette.divider,
          },
          '& th': {
            fontWeight: 600,
          },
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">support@reactflights.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell align="right">+123456789</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Website</TableCell>
            <TableCell align="right">https://www.reactflights.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
