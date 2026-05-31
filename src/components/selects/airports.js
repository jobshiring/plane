import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { FaAngleDown } from 'react-icons/fa6';
import { RiFlightTakeoffFill, RiFlightLandLine } from 'react-icons/ri';
import { TbArrowsExchange } from 'react-icons/tb';
// import * as api from "src/services";

export function CitySelect({
  label,
  isDeparture,
  setDepartureAirport,
  departureAirport,
  setArrivalAirport,
  arrivalAirport,
  data,
}) {
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Memoize filtered data
  const filtered = React.useMemo(
    () =>
      data.length
        ? data.filter((airport) =>
            isDeparture
              ? airport.type === 'origin'
              : airport.type === 'destination'
          )
        : [],
    [data, isDeparture]
  );

  const handleFocus = () => {
    if (inputValue.length === 0) {
      setOptions(filtered);
    }
  };

  // Update options only if filtered changes
  React.useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(filtered)) {
      setOptions(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  // Debounced API call
  React.useEffect(() => {
    let active = true;

    if (inputValue.length < 3) {
      setOptions(inputValue.length === 0 ? filtered : []);
      return;
    }

    (async () => {
      setLoading(true);
      // const response = await api.searchAirports(inputValue);
      setTimeout(() => {}, 500);
      if (active) {
        setOptions([]);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        width: { xs: '100%' },
        input: { fontWeight: 500 },
      }}
      options={options}
      autoHighlight
      loading={loading}
      onChange={(_, value) =>
        isDeparture ? setDepartureAirport?.(value) : setArrivalAirport?.(value)
      }
      value={isDeparture ? departureAirport : arrivalAirport || null}
      getOptionLabel={(option) => `${option.city} - ${option.code}`}
      loadingText="Loading flights..."
      noOptionsText="No flight found!"
      popupIcon={<FaAngleDown fontSize={16} />}
      onFocus={handleFocus}
      renderOption={(props, option) => (
        <Box
          {...props}
          key={option.code}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        >
          <Stack>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                textTransform: 'capitalize!important',
                fontSize: '14px!important',
                fontWeight: 600,
              }}
              noWrap
            >
              {option.city.toLowerCase()} Airport - {option.code}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textTransform: 'capitalize!important',
                fontSize: '12px!important',
              }}
              noWrap
            >
              {option.city.toLowerCase()} - {option.airport.toLowerCase()}
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
            autoComplete: 'new-password',
            startAdornment: (
              <InputAdornment position="start">
                {isDeparture ? (
                  <RiFlightTakeoffFill fontSize={20} />
                ) : (
                  <RiFlightLandLine fontSize={20} />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
export default function Asynchronous({
  setDepartureAirport,
  setArrivalAirport,
  departureAirport,
  arrivalAirport,
  data,
}) {
  const onExchangeRoute = () => {
    setDepartureAirport(arrivalAirport);
    setArrivalAirport(departureAirport);
  };

  return (
    <Stack
      gap={2}
      sx={{
        position: 'relative',
        flexDirection: { sm: 'row', xs: 'column' },
      }}
    >
      <CitySelect
        data={data}
        label="Leaving from"
        isDeparture
        departureAirport={departureAirport}
        setDepartureAirport={setDepartureAirport}
      />
      <CitySelect
        data={data}
        label="Going to"
        setArrivalAirport={setArrivalAirport}
        arrivalAirport={arrivalAirport}
      />
      <Fab
        color="default"
        aria-label="change-airports"
        size="small"
        onClick={onExchangeRoute}
        sx={{
          boxShadow: 'none',
          border: (theme) => '1px solid ' + theme.palette.primary.main,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          backdropFilter: 'blur(4px)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 32,
          height: 32,
          minHeight: 32,
          transform: 'translate(-50%, -50%)',
          svg: { fontSize: 20, color: 'primary.main' },
        }}
      >
        <TbArrowsExchange />
      </Fab>
    </Stack>
  );
}
