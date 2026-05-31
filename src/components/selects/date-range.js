'use client';
import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa6';

import dayjs from 'dayjs'; // dayjs is still necessary for date manipulation
import ReactDatePicker from '../react-date-picker';

/*
 * @param {object} props
 * @param {object | null} props.startDate - The currently selected start date (Dayjs object or null).
 * @param {object | null} props.endDate - The currently selected end date (Dayjs object or null).
 * @param {function} props.setStartDate - Function to update the start date.
 * @param {function} props.setEndDate - Function to update the end date.
 */
export default function RangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'range-picker-popover' : undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleClick = (event) => {
    // In JS, event target's type is inferred
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  // The 'dates' argument is an array of [Date object, Date object]
  const onChange = (dates) => {
    const [start, end] = dates;

    // Convert native Date objects back to Dayjs objects before setting state
    setStartDate(start ? dayjs(start) : null);
    setEndDate(end ? dayjs(end) : null);

    // Close the popover only when both start and end dates are selected
    if (start && end) handleClose();
  };

  // Formatting the dates for display
  const startDateFormatted = startDate?.format('MMM D, YYYY') || '';
  const endDateFormatted = endDate?.format('MMM D, YYYY') || '';

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <IoCalendarOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <FaAngleDown />
            </InputAdornment>
          ),
        }}
        // Display format: "Start Date - End Date" or just "Start Date"
        value={
          startDateFormatted && endDateFormatted
            ? `${startDateFormatted} - ${endDateFormatted}`
            : startDateFormatted
        }
        onClick={handleClick}
        sx={{
          input: {
            fontWeight: 500,
            cursor: 'pointer',
          },
        }}
        aria-describedby={id}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box>
          <ReactDatePicker
            // Convert Dayjs back to native Date objects for the date picker component
            selected={startDate?.toDate() ?? null}
            onChange={onChange}
            startDate={startDate?.toDate() ?? null}
            endDate={endDate?.toDate() ?? null}
            selectsRange
            inline
            minDate={new Date()}
            monthsShown={isMobile ? 1 : 2}
            calendarStartDay={0}
            showPopperArrow={false}
          />
        </Box>
      </Popover>
    </>
  );
}
