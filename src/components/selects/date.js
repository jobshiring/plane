'use client';
import React, { useState, useRef } from 'react';

import { IoCalendarOutline } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa6';
import { TextField, Popover, Box, InputAdornment } from '@mui/material';
import dayjs from 'dayjs'; // dayjs abhi bhi zaroori hai
import ReactDatePicker from '../react-date-picker';

// Component props ab JavaScript mein hain, koi type definition zaroori nahi.
// Lekin hum comments mein props ki umeed ko dikha sakte hain.
/*
 * @param {object} props
 * @param {object | null} props.startDate - The currently selected date (Dayjs object or null).
 * @param {function} props.setStartDate - Function to update the selected date.
 */
export default function SingleDatePicker({ startDate, setStartDate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const handleClick = (event) => {
    // TypeScript mein event.currentTarget ka type automatically infer ho jaata hai,
    // JS mein hum seedhe istemaal karte hain.
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (date) => {
    // date abhi bhi Date object hoga.
    if (date) {
      // dayjs() ka istemaal karte hue Date object ko Dayjs object mein badalna zaroori hai.
      setStartDate(dayjs(date));
      handleClose();
    }
  };

  // formattedDate ab bhi Dayjs ki availability par depend karta hai.
  const formattedDate = startDate ? startDate.format('MMM D, YYYY') : '';

  return (
    <>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={formattedDate}
        onClick={handleClick}
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
        sx={{
          input: {
            fontWeight: 500,
            cursor: 'pointer',
          },
        }}
      />

      <Popover
        // Boolean(anchorEl) null ko false mein convert karta hai
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          <ReactDatePicker
            // startDate?.toDate() ?? null: Optional chaining aur nullish coalescing JS mein bhi kaam karta hai.
            selected={startDate?.toDate() ?? null}
            onChange={handleChange}
            inline
            minDate={new Date()}
            calendarStartDay={0}
          />
        </Box>
      </Popover>
    </>
  );
}
