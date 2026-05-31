'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Skeleton, Box, useTheme } from '@mui/material';
import BaseOptionChart from './base-option-chart';

export default function ProviderClicksChart({ data, isLoading }) {
  const theme = useTheme();

  // Map data to chart format
  const chartData = data && data.length > 0 
    ? data 
    : [
        { provider: 'Skyscanner', clicks: 3421, color: '#00a698' },
        { provider: 'Google Flights', clicks: 2856, color: '#4285f4' },
        { provider: 'Kayak', clicks: 2234, color: '#ff690f' },
        { provider: 'Momondo', clicks: 1789, color: '#ff6b35' },
        { provider: 'Expedia', clicks: 1456, color: '#00355f' },
        { provider: 'Booking.com', clicks: 891, color: '#003580' },
      ];

  const series = chartData.map((item) => Number(item.clicks) || 0);
  const labels = chartData.map((item) => item.provider);
  const colors = chartData.map((item) => item.color);

  const hasValidData = series.length > 0 && series.some((v) => v > 0);

  const chartOptions = merge(BaseOptionChart?.('donut') || {}, {
    labels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    colors,
    stroke: { colors: [theme.palette.background.paper] },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      formatter: (val) => `${val.toFixed(1)}%`,
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
              formatter: (val) => Number(val).toLocaleString(),
            },
            total: {
              show: true,
              label: 'Total Clicks',
              fontSize: '14px',
              fontWeight: 600,
              formatter: () =>
                series.reduce((acc, val) => acc + val, 0).toLocaleString(),
            },
          },
          size: '78%',
        },
        expandOnClick: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} clicks`,
      },
    },
  });

  return (
    <Card
      sx={{
        pb: 2,
        height: '100%',
        '& .apexcharts-canvas': {
          margin: '0 auto',
        },
      }}
    >
      <CardHeader title="Provider Click Distribution" sx={{ pb: 3 }} />

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
          No click data available
        </Box>
      )}
    </Card>
  );
}

ProviderClicksChart.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

ProviderClicksChart.defaultProps = {
  data: [],
  isLoading: false,
};
