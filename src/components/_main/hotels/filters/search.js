"use client";

import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export default function SearchFilter({ searchQuery, onSearchChange }) {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Search for hotel name"
      variant="outlined"
      value={searchQuery}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaSearch />
          </InputAdornment>
        ),
      }}
    />
  );
}
