import React, { useEffect, useState } from 'react'; // React core functionalities

// Redux for state management
import { useDispatch, useSelector } from 'react-redux';
import { currency, baseCurrency, settingSlice } from '@/redux';
import currencies from 'src/static/currencies.json';
// Material-UI components for UI elements
import {
  FormControl,
  Typography,
  Select,
  Skeleton,
  MenuItem,
  CircularProgress,
} from '@mui/material';

export default function LocaleSelect() {
  const dispatch = useDispatch();
  const isCurrency = useSelector(currency);
  const isBaseCurrency = useSelector(baseCurrency);

  // State for selected currency
  const [selectedCurrency, setSelectedCurrency] = useState(isCurrency || 'USD');

  const handleCurrencyChange = (cur) => {
    setSelectedCurrency(cur);
    dispatch(
      settingSlice.actions.setCurrency({
        currency: cur,
        baseCurrency: isBaseCurrency || 'USD',
      })
    );
  };

  // Effect to initialize currency state
  useEffect(() => {
    if (!isCurrency || !isBaseCurrency) {
      const defaultCurrency = currencies?.find((v) => v.base)?.code || 'USD';
      dispatch(
        settingSlice.actions.setCurrency({
          currency: defaultCurrency,
          baseCurrency: defaultCurrency,
        })
      );
      setSelectedCurrency(defaultCurrency);
    } else {
      setSelectedCurrency(isCurrency);
    }
  }, [isCurrency, isBaseCurrency, currencies, dispatch]);

  return !currencies ? (
    <Skeleton variant="rounded" height={56} />
  ) : (
    <FormControl fullWidth>
      <Typography variant="overline" color="inherit" gutterBottom>
        Currency
      </Typography>
      <Select
        value={selectedCurrency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        fullWidth
        disabled={!currencies}
      >
        {!currencies ? (
          <MenuItem value="">
            <CircularProgress size={20} />
          </MenuItem>
        ) : (
          currencies.map((cur) => (
            <MenuItem key={cur.code} value={cur.code}>
              {cur.code}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
