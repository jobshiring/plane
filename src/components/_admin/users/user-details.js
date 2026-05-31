'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@mui/material';
import Table from 'src/components/table/table';
import OrderList from 'src/components/table/tableRows/order-list';
import ProfileCover from 'src/components/_main/profile/profile-cover';
import { _users } from 'src/_mock/users';
import { NoDataFound } from '@/components/noDataFound';
import PropTypes from 'prop-types';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false, sort: true },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'date', label: 'Booking Date', alignRight: false },
  { id: 'name', label: 'Client Name', alignRight: false },
  { id: 'mail', label: 'Email', alignRight: false },
  { id: 'status', label: 'Booking Status', alignRight: false },
  { id: 'paymentStatus', label: 'Payment Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true },
];

export default function UserProfile({ id }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const foundUser = _users.data.find((u) => u._id === id) || null;

      if (foundUser && !Array.isArray(foundUser.orders)) {
        foundUser.orders = [];
      }

      setUser(foundUser);
      setIsLoading(false);
    }, 600);
  }, [id, pageParam]);

  const orders = user?.orders || [];

  if (!isLoading && !user) {
    return (
      <Card sx={{ p: 3, mt: 3 }}>
        <NoDataFound message='No data available for this user.' />
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}>
        <ProfileCover
          data={user}
          isLoading={isLoading}
        />
      </Card>

      <Card sx={{ p: 2 }}>
        {isLoading ? (
          <Table
            headData={TABLE_HEAD}
            data={[]}
            isLoading={true}
            row={OrderList}
            isUser
          />
        ) : orders.length === 0 ? (
          <NoDataFound message='No orders found for this user.' />
        ) : (
          <Table
            headData={TABLE_HEAD}
            data={orders}
            isLoading={false}
            row={OrderList}
            isUser
          />
        )}
      </Card>
    </>
  );
}

UserProfile.propTypes = {
  id: PropTypes.node.isRequired,
};