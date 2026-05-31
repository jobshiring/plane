import React from 'react';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
import InvoiceSkeleton from 'src/components/_main/skeletons/profile/invoice';

// Meta information
export const metadata = {
  title:
    'Invoice | React Flights - Your Order Details and Payment Confirmation',
  applicationName: 'React Flights',
  authors: 'React Flights',
};

const InvoiceHistory = dynamic(
  () => import('src/components/_main/profile/invoice-history'),
  {
    loading: () => <InvoiceSkeleton />,
  }
);

export default function OrderPage() {
  return (
    <Container>
      <InvoiceHistory />
    </Container>
  );
}
