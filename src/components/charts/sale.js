'use client';

import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardHeader,
  Box,
  Skeleton,
  useTheme,
  Stack,
  FormControl,
  Select,
} from '@mui/material';
import BaseOptionChart from './base-option-chart';

// Helper: create a month-year dropdown list
function getMonthYearArray(startDate) {
  const months = [];
  const now = new Date();
  let current = new Date(startDate);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  while (current <= now) {
    const monthYear = `${
      monthNames[current.getMonth()]
    } ${current.getFullYear()}`;
    months.push(monthYear);
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

export default function SaleChart({
  fCurrency,
  income_report,
  isLoading,
  setMonth,
  month,
  startedFrom,
}) {
  const theme = useTheme();

  const activeData = Array.isArray(income_report)
    ? income_report
    : income_report?.month || [];

  const chartOptions = merge(BaseOptionChart(theme), {
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: Array.from({ length: activeData.length }, (_, i) => i + 1),
    },
    tooltip: {
      y: {
        formatter: (val) => fCurrency(val),
      },
    },
    yaxis: {
      opposite: false,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '50%',
      },
    },
    colors: [theme.palette.primary.main],
  });

  const startDate = new Date(startedFrom || new Date().toLocaleString());
  const months = getMonthYearArray(startDate);

  return (
    <Card sx={{ pb: 1.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHeader title="Sales Report" />
        {!isLoading && (
          <FormControl sx={{ minWidth: 120, m: '24px 24px 0px' }} size="small">
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              native
            >
              {months.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {isLoading ? (
        <Box mx={3}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={219}
            sx={{ borderRadius: 2, mt: 3 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              mb: 3,
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} variant="text" sx={{ width: 40 }} />
            ))}
          </Box>
        </Box>
      ) : activeData.length > 0 ? (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={[
              {
                name: 'Income',
                data: activeData,
              },
            ]}
            options={chartOptions}
            height={260}
          />
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: theme.palette.text.secondary,
          }}
        >
          No income data available
        </Box>
      )}
    </Card>
  );
}

SaleChart.propTypes = {
  income_report: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  isLoading: PropTypes.bool.isRequired,
  fCurrency: PropTypes.func,
  setMonth: PropTypes.func,
  month: PropTypes.string,
  startedFrom: PropTypes.string,
};
