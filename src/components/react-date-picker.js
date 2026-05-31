import React from 'react';
import Box from '@mui/material/Box';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { alpha, useTheme } from '@mui/material/styles';

import 'react-datepicker/dist/react-datepicker.css';

export default function ReactDatePicker({ ...props }) {
  const theme = useTheme();

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className={className}>
        <Box
          sx={{
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            minWidth: 280,
            borderWidth: 0,
            '& .react-datepicker__header': {
              fontFamily: 'poppins',
              bgcolor: 'primary.main',
              borderBottom: 'none',
              py: 1.7,
              borderRadius: 0,
            },
            '& .react-datepicker__month, & .react-datepicker__month-container':
              {
                bgcolor: theme.palette.background.default + '!important',
                borderWidth: 0,
              },
            '& .react-datepicker__day-names': {
              display: 'flex',
              justifyContent: 'space-around',
            },
            '& .react-datepicker__day-name': {
              color: 'common.white',
              fontWeight: 500,
            },
            '& .react-datepicker__current-month, .react-datepicker-time__header':
              {
                fontWeight: 600,
                fontSize: '16px',
                color: '#fff',
              },
            '& .react-datepicker__day': {
              borderRadius: '50%',
              width: 36,
              fontFamily: 'poppins',
              height: 36,
              lineHeight: '36px',
              color: 'text.secondary',
              fontWeight: 500,
              transition: '0.2s',
              '&:hover': {
                bgcolor: theme.palette.primary.light,
                borderRadius: '50%',
                color: '#fff',
              },
            },
            '& .react-datepicker__day--today': {
              fontWeight: 700,
              border: `1px solid ${theme.palette.divider}`,
            },
            '& .react-datepicker__day--in-selecting-range': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '0',
            },
            '& .react-datepicker__day--in-range': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              color: 'text.primary',
              borderRadius: '0',
            },
            '& .react-datepicker__day--selecting-range-start': {
              bgcolor: theme.palette.primary.main + ' !important',
              color: 'common.white',
              borderRadius: '50%',
            },
            '& .react-datepicker__day--range-start': {
              color: 'common.white',
            },
            '& .react-datepicker__day--selecting-range-end': {
              bgcolor: theme.palette.primary.main + ' !important',
              color: 'common.white',
              borderRadius: '50%',
            },
            '& .react-datepicker__day--selected': {
              bgcolor: theme.palette.primary.main + ' !important',
              color: 'common.white',
              borderRadius: '50%',
            },
            '& .react-datepicker__day--range-end': {
              bgcolor: theme.palette.primary.main + ' !important',
              color: 'common.white',
              borderRadius: '50%',
            },
            '& .react-datepicker__navigation': {
              top: 10,
            },
            '& .react-datepicker__navigation-icon::before': {
              borderColor: '#fff',
            },
            '& .react-datepicker__day:hover': {
              borderRadius: '50%',
              borderColor: theme.palette.text.primary,
            },
            '& .react-datepicker__week': {
              height: 41.3,
              display: 'flex',
            },
            '& .react-datepicker__day--outside-month': {
              bgcolor: 'transparent',
            },
          }}
        >
          {children}
        </Box>
      </CalendarContainer>
    );
  };

  return (
    <Box
      sx={{
        '& .react-datepicker-wrapper': {
          display: 'block',
        },
        '& .react-datepicker': {
          borderWidth: 0,
        },
      }}
    >
      <DatePicker calendarContainer={MyContainer} {...props} />
    </Box>
  );
}
