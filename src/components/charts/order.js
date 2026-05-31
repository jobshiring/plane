'use client';

import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Skeleton, Box, useTheme } from '@mui/material';
import BaseOptionChart from './base-option-chart'; // or comment if unused

export default function Order({ data, isLoading }) {
  const theme = useTheme();

  // Safe mapping — fallback to sample mock data if empty
  const chartData =
    data && data.length > 0
      ? data
      : [
          { label: 'Confirmed', value: 240 },
          { label: 'Pending', value: 80 },
          { label: 'Cancelled', value: 29 },
        ];

  const series = chartData.map((item) => Number(item.value) || 0);
  const labels = chartData.map((item) => item.label);

  // Prevent chart crash — render only if we have valid data
  const hasValidData = series.length > 0 && series.some((v) => v > 0);

  const chartOptions = merge(BaseOptionChart?.('donut') || {}, {
    labels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    colors: [
      theme.palette.success.main,
      theme.palette.primary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ],
    stroke: { colors: [theme.palette.background.paper] },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      formatter: (_, opts) => {
        const value = series[opts.seriesIndex];
        return value;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: theme.palette.text.primary,
              offsetY: 6,
              formatter: (val) => val, // center big number
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 700,
              formatter: () =>
                series.reduce((acc, val) => acc + val, 0).toString(),
            },
          },
          size: '78%',
        },
        expandOnClick: true,
      },
    },
  });

  return (
    <Card
      sx={{
        pb: 2,
        '& .apexcharts-canvas': {
          margin: '0 auto',
        },
      }}
    >
      <CardHeader title="Bookings Report" sx={{ pb: 3 }} />

      {isLoading ? (
        <Box maxWidth="365px" width="100%" mx="auto">
          <Skeleton
            variant="circular"
            width={190}
            height={190}
            sx={{ mx: 'auto', mb: 2.4 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 1,
              px: 3,
            }}
          >
            <Skeleton variant="text" sx={{ width: '30%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
          </Box>
        </Box>
      ) : hasValidData ? (
        <ReactApexChart
          type="donut"
          series={series}
          options={chartOptions}
          width="340px"
        />
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: theme.palette.text.secondary,
          }}
        >
          No booking data available
        </Box>
      )}
    </Card>
  );
}

Order.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

Order.defaultProps = {
  data: [],
  isLoading: false,
};
