'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// mui
import { Grid, Box, Typography, Divider } from '@mui/material';

// components
import DashboardCard from '@/components/_admin/dashboard/dashboard-card';
import OrderChart from 'src/components/charts/order';
import SaleChart from 'src/components/charts/sale';
import LatestBookingList from '../bookings/latest-bookings';
import ProviderClicksChart from 'src/components/charts/provider-clicks';
import TopComparedRoutes from 'src/components/charts/top-compared-routes';
import ProviderTrendsChart from 'src/components/charts/provider-trends';

// icons
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { FiFileText } from 'react-icons/fi';
import { MdCompareArrows, MdTrendingUp, MdSavings, MdAdsClick } from 'react-icons/md';

// utils
import { useSelector, baseCurrency } from '@/lib/redux';
import { fCurrency } from '@/utils/formatNumber';

// mock data
import { _dashboardMetrics as metrics } from '@/_mock/dashboard';
import { comparisonMetrics } from '@/_mock/dashboard/comparison-data';

Dashboard.propTypes = {
  isVendor: PropTypes.bool,
};

export default function Dashboard() {
  const currency = useSelector(baseCurrency);
  const [month, setMonth] = useState('Sep 2024');
  const [data, setData] = useState({});
  const [comparisonData, setComparisonData] = useState({});
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

      // Set comparison data
      setComparisonData(comparisonMetrics);

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

  // === Comparison metrics ===
  const totalComparisonClicks = comparisonData?.totalComparisonClicks || 0;
  const totalSearches = comparisonData?.totalSearches || 0;
  const averageSavings = comparisonData?.averageSavings || 0;
  const conversionRate = comparisonData?.conversionRate || 0;

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

        {/* === Comparison Analytics Section === */}
        <Grid size={12}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline" color="text.secondary">
              Price Comparison Analytics
            </Typography>
          </Divider>
        </Grid>

        {/* === Comparison Metrics Cards === */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <DashboardCard
            color="#00a698"
            icon={<MdAdsClick size={24} />}
            title="Provider Clicks"
            value={totalComparisonClicks.toLocaleString()}
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
            color="#4285f4"
            icon={<MdCompareArrows size={24} />}
            title="Comparison Searches"
            value={totalSearches.toLocaleString()}
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
            color="#ff6b35"
            isAmount
            icon={<MdSavings size={24} />}
            title="Avg. User Savings"
            value={`$${averageSavings.toFixed(2)}`}
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
            color="#1976d2"
            icon={<MdTrendingUp size={24} />}
            title="Conversion Rate"
            value={`${conversionRate}%`}
            isLoading={isLoading}
          />
        </Grid>

        {/* === Provider Trends Chart === */}
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <ProviderTrendsChart
            data={comparisonData?.dailyClicks}
            isLoading={isLoading}
          />
        </Grid>

        {/* === Provider Clicks Distribution === */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <ProviderClicksChart
            data={comparisonData?.clicksByProvider}
            isLoading={isLoading}
          />
        </Grid>

        {/* === Top Compared Routes === */}
        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <TopComparedRoutes
            data={comparisonData?.topComparedRoutes}
            isLoading={isLoading}
          />
        </Grid>

        {/* === Original Charts Section === */}
        <Grid size={12}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline" color="text.secondary">
              Bookings & Revenue
            </Typography>
          </Divider>
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
