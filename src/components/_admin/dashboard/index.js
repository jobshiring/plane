'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// mui
import { Grid, Box } from '@mui/material';

// components
import DashboardCard from '@/components/_admin/dashboard/dashboard-card';
import OrderChart from 'src/components/charts/order';
import SaleChart from 'src/components/charts/sale';
import LatestBookingList from '../bookings/latest-bookings';

// icons
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { FiFileText } from 'react-icons/fi';

// utils
import { useSelector, baseCurrency } from '@/lib/redux';
import { fCurrency } from '@/utils/formatNumber';

// mock data
import { _dashboardMetrics as metrics } from '@/_mock/dashboard';

Dashboard.propTypes = {
  isVendor: PropTypes.bool,
};

export default function Dashboard() {
  const currency = useSelector(baseCurrency);
  const [month, setMonth] = useState('Sep 2024');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const combined = {
        ...metrics.data,
      };

      const bookingsArray = Array.isArray(combined.bookingsReport)
        ? [
            { label: 'Confirmed', value: combined.bookingsReport[0] || 0 },
            { label: 'Pending', value: combined.bookingsReport[1] || 0 },
            { label: 'Cancelled', value: combined.bookingsReport[2] || 0 },
          ]
        : [];

      const incomeReport = combined.incomeReport || {
        week: [],
        month: [],
        year: [],
      };

      // Final merged + formatted data
      setData({
        ...combined,
        bookingsReport: bookingsArray,
        incomeReport,
      });

      setIsLoading(false);
    }, 500);
  }, [month]);

  // === Key metrics ===
  const totalEarnings = data?.totalEarnings || 0;
  const totalBookings = data?.totalBookings || 0;
  const totalUsers = data?.totalUsers || 0;
  const totalModules = data?.totalModules || 0;
  const income_report = data?.incomeReport;
  const bookings_report = data?.bookingsReport || [];

  // === Render ===
  return (
    <Box>
      <Grid container spacing={3}>
        {/* === Dashboard Cards === */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <DashboardCard
            color="primary"
            isAmount
            icon={<AiOutlineDollarCircle size={24} />}
            title="Total Earning"
            value={fCurrency(totalEarnings, currency)}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <DashboardCard
            color="secondary"
            title="Total Bookings"
            value={totalBookings}
            icon={<FiFileText size={24} />}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <DashboardCard
            color="warning"
            title="Total Users"
            value={totalUsers}
            icon={<PiUsersThree size={30} />}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <DashboardCard
            color="error"
            title="Total Modules"
            value={totalModules}
            icon={<BiSolidShoppingBags size={24} />}
            isLoading={isLoading}
          />
        </Grid>

        {/* === Charts === */}
        <Grid
          size={{
            xs: 12,
            md: 12,
            lg: 8,
          }}
        >
          <SaleChart
            startedFrom={data?.startedFrom?.createdAt}
            income_report={income_report}
            isLoading={isLoading}
            setMonth={setMonth}
            month={month}
            fCurrency={fCurrency}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 12,
            lg: 4,
          }}
        >
          <OrderChart data={bookings_report} isLoading={isLoading} />
        </Grid>

        {/* === Latest Bookings === */}
        <Grid
          size={{
            xs: 12,
            md: 12,
          }}
        >
          <LatestBookingList />
        </Grid>
      </Grid>
    </Box>
  );
}
