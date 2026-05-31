import React from 'react';
// mui
import { Container } from '@mui/material';
// next
import dynamic from 'next/dynamic';
// Meta information
export const metadata = {
  title:
    'React Flights - Your Gateway to Seamless Shopping and Secure Transactions',
  applicationName: 'React Flights',
  authors: 'React Flights',
};
import GeneralSkeleton from '@/components/_main/skeletons/profile/general';

const AccountGeneral = dynamic(
  () => import('src/components/_main/profile/edit/account-general'),
  {
    loading: () => <GeneralSkeleton />,
  }
);
export default function General() {
  return (
    <Container>
      <AccountGeneral />
    </Container>
  );
}
