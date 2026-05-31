'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardHeader,
  Skeleton,
  Box,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import BaseOptionChart from './base-option-chart';

export default function ProviderTrendsChart({ data, isLoading }) {
  const theme = useTheme();
  const [view, setView] = React.useState('week');

  const chartData = data || {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { provider: 'Skyscanner', data: [412, 489, 523, 467, 501, 534, 495], color: '#00a698' },
      { provider: 'Google Flights', data: [356, 398, 445, 412, 389, 421, 435], color: '#4285f4' },
      { provider: 'Kayak', data: [289, 312, 298, 334, 321, 356, 324], color: '#ff690f' },
      { provider: 'Others', data: [398, 421, 456, 489, 512, 534, 526], color: '#9e9e9e' },
    ],
  };

  const series = chartData.datasets.map((dataset) => ({
    name: dataset.provider,
    data: dataset.data,
  }));

  const colors = chartData.datasets.map((dataset) => dataset.color);

  const chartOptions = merge(BaseOptionChart?.('line') || {}, {
    colors,
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    xaxis: {
      categories: chartData.labels,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: (val) => val.toLocaleString(),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} clicks`,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
    },
  });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Provider Click Trends"
        action={
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            onChange={(_, newView) => newView && setView(newView)}
          >
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleButtonGroup>
        }
        sx={{ pb: 1 }}
      />

      <Box sx={{ px: 3, pb: 3 }}>
        {isLoading ? (
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
        ) : (
          <ReactApexChart
            type="line"
            series={series}
            options={chartOptions}
            height={300}
          />
        )}
      </Box>
    </Card>
  );
}

ProviderTrendsChart.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

ProviderTrendsChart.defaultProps = {
  data: null,
  isLoading: false,
};
