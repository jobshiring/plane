import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { FaAngleDown } from 'react-icons/fa6';
import { BiHotel } from 'react-icons/bi';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HotelCitySelect({
  label,
  selectedCity,
  setSelectedCity,
  data,
  isLoading: _isLoading,
}) {
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleFocus = () => {
    if (inputValue.length === 0) {
      setOptions(data);
    }
  };

  React.useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(data)) {
      setOptions(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    let active = true;

    if (inputValue.length < 3) {
      setOptions(inputValue.length === 0 ? data : []);
      return;
    }

    (async () => {
      // Simulate API call
      setTimeout(() => {}, 500);
      if (active) {
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <Autocomplete
      fullWidth
      options={options}
      autoHighlight
      onChange={(_, value) => setSelectedCity(value)}
      value={selectedCity || null}
      getOptionLabel={(option) => (option?.city ? option.city : '')}
      loadingText="Loading cities..."
      noOptionsText="No city found!"
      popupIcon={<FaAngleDown fontSize={16} />}
      onFocus={handleFocus}
      renderOption={(props, option) => (
        <Box {...props} key={option.code} component="li">
          <Stack>
            <Typography
              fontWeight={600}
              fontSize="14px"
              textTransform="capitalize"
            >
              {option?.city ? option.city.toLowerCase() : ''}
            </Typography>
            <Typography
              fontSize="12px"
              textTransform="capitalize"
              color="text.secondary"
            >
              {option?.country ? option.country.toLowerCase() : ''}
            </Typography>
          </Stack>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <BiHotel fontSize={20} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
