'use client';

import React, { useState } from 'react';
import 'simplebar-react/dist/simplebar.min.css';

import {
  Button,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Box,
  Alert,
} from '@mui/material';

import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Components
import Travellers from '../table/travellers';
import FlightInvoice from './flight-invoice';
import FareDetails from '../table/fare-details';
import ConfirmDialog from '../dialog/confim-dialog';
import Logo from '../logo';

// Icons
import { FaWhatsapp } from 'react-icons/fa6';

import { FaRegFilePdf } from 'react-icons/fa';
import { MdDoNotDisturb } from 'react-icons/md';
import { useSelector } from '@/redux';
import { capitalize } from 'lodash';
import SimpleBar from 'simplebar-react';

export default function BookingPDF({ id, data }) {
  console.log(data, 'Booking Details');
  const [open, setOpen] = useState(false);
  const { booking: bookingDetails } = useSelector((state) => state.flight);
  const handleDownloadPDF = () => {
    const input = document.getElementById('bookingDetails');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('booking-details.pdf');
      });
    }
  };

  const handleShare = () => {
    const message = `Check out this booking: ${window.location.origin}/invoice/${id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const onClickCancel = () => {
    setOpen(true);
  };

  const mockData = {};

  const booking = { ...mockData, ...data };
  console.log(bookingDetails, 'asdasd');
  return (
    <>
      <Grid container justifyContent="center" spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ position: 'relative' }}>
            <Box sx={{ px: 3, pt: 3 }}>
              {booking.bookingStatus === 'canceled' && (
                <Alert variant="filled" severity="warning">
                  Cancel Booking request sent!
                </Alert>
              )}
            </Box>
            <SimpleBar
              forceVisible="x"
              style={{
                width: '100%',
              }}
            >
              <CardContent id="bookingDetails" sx={{ minWidth: 800 }}>
                <Stack spacing={4}>
                  <Card sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Logo isOnlyLogo />
                        <Stack direction="row" alignItems="center" spacing={4}>
                          <Stack spacing={0.2}>
                            <Typography variant="subtitle1">
                              Payment Status:{' '}
                              <Typography
                                component="span"
                                variant="body1"
                                color="error.main"
                              >
                                {capitalize(booking.paymentStatus)}
                              </Typography>
                            </Typography>
                            <Typography variant="subtitle1">
                              Booking Status:{' '}
                              <Typography
                                component="span"
                                variant="body1"
                                color={
                                  booking.bookingStatus === 'canceled'
                                    ? 'error.main'
                                    : 'success.main'
                                }
                              >
                                {capitalize(booking.bookingStatus)}
                              </Typography>
                            </Typography>
                            <Typography variant="subtitle1">
                              Phone:{' '}
                              <Typography
                                component="span"
                                color="text.secondary"
                              >
                                {booking.phone}
                              </Typography>
                            </Typography>
                            <Typography variant="subtitle1">
                              Email:{' '}
                              <Typography
                                component="span"
                                color="text.secondary"
                              >
                                {booking.email}
                              </Typography>
                            </Typography>
                          </Stack>
                          <Box sx={{ width: 100 }}>
                            <QRCode
                              style={{
                                height: 80,
                                width: '100%',
                                maxWidth: 80,
                              }}
                              value={`${window.location.origin}/invoice/${id}`}
                            />
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>

                  <Table
                    size="small"
                    sx={{
                      border: 1,
                      borderColor: (theme) => theme.palette.divider,
                      '& td, & th': {
                        border: 1,
                        borderColor: (theme) => theme.palette.divider,
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Booking ID</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>PNR</TableCell>
                        <TableCell>Booking Date</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>{booking._id || 'N/A'}</TableCell>
                        <TableCell>
                          {`${booking.firstName || ''} ${
                            booking.lastName || ''
                          }`.trim() || 'N/A'}
                        </TableCell>
                        <TableCell>{booking.PNR || 'N/A'}</TableCell>
                        <TableCell>
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : 'N/A'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Travellers data={booking} />
                  <FlightInvoice data={booking} />
                  <FareDetails
                    data={bookingDetails}
                    customerDetails={booking}
                  />
                </Stack>
              </CardContent>
            </SimpleBar>
            <CardContent sx={{ pt: { md: 0 } }}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                spacing={2}
                sx={{
                  button: {
                    borderColor: (theme) => theme.palette.divider,
                    color: 'text.primary',
                  },
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleDownloadPDF}
                  startIcon={<FaRegFilePdf />}
                  sx={{ mt: 2 }}
                >
                  Download as PDF
                </Button>
                <Button
                  size="large"
                  fullWidth
                  variant="outlined"
                  startIcon={<FaWhatsapp />}
                  onClick={handleShare}
                >
                  Share on WhatsApp
                </Button>
                <Button
                  size="large"
                  fullWidth
                  variant="outlined"
                  startIcon={<MdDoNotDisturb />}
                  onClick={onClickCancel}
                  disabled={booking.bookingStatus === 'canceled'}
                >
                  {booking.bookingStatus === 'canceled'
                    ? 'Cancel request sent'
                    : 'Cancel Booking'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ConfirmDialog open={open} setOpen={setOpen} />
    </>
  );
}
