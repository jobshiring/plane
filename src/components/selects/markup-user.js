"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaAngleDown } from "react-icons/fa6";
import { _users  } from 'src/_mock/users';


const MOCK_USERS = Array.isArray(_users?.data)
  ? _users.data
  : Array.isArray(_users)
  ? _users
  : [];

function UserSelect({ label, setSelectedUsers, selectedUsers }) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  let active = true;
  setLoading(true);

  setTimeout(() => {
    if (active) {
      const filtered =
        inputValue.length === 0
          ? MOCK_USERS 
          : MOCK_USERS.filter(
              (user) =>
                user.firstName
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) ||
                user.lastName
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) ||
                user.email.toLowerCase().includes(inputValue.toLowerCase())
            );

      setOptions(filtered);
      setLoading(false);
    }
  }, 300);

  return () => {
    active = false;
  };
}, [inputValue]);


  return (
    <Autocomplete
      multiple
      id="user-select-demo"
      sx={{
        width: "100%",
        input: { fontWeight: 500 },
      }}
      options={options}
      autoHighlight
      loading={loading}
      onChange={(e, value) => setSelectedUsers(value)}
      value={selectedUsers}
      getOptionLabel={(option) => option.email || ""}
      loadingText="Loading Users..."
      noOptionsText="No Users found!"
      popupIcon={<FaAngleDown fontSize={16} />}
      onFocus={() => {
        if (inputValue.length >= 3) {
          setOptions(options);
        }
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <Stack>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  textTransform: "capitalize!important",
                  fontSize: "14px!important",
                  fontWeight: 600,
                }}
                noWrap
              >
                {option.firstName} {option.lastName} - {option.email}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize!important",
                  fontSize: "12px!important",
                }}
                noWrap
              >
                {option.address}, {option.city}, {option.country}
              </Typography>
            </Stack>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}

export default function MarkupUserSelect({ selectedUsers, setSelectedUsers }) {
  return (
    <UserSelect
      label="Select Users"
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
    />
  );
}
