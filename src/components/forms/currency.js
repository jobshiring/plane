'use client';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoInformationCircle } from 'react-icons/io5';

// MUI
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';

// Formik + Yup
import { FormikProvider, useFormik, Form } from 'formik';
import * as Yup from 'yup';
import { currencies } from '@/components/_admin/currencies/config';

const LabelStyle = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 1.5,
}));

const STATUS_OPTIONS = ['active', 'disabled'];

export default function CurrencyForm({ data, isLoading, onClose, onSave }) {
  const [value, setValue] = React.useState('default');
  const [isBase, setBase] = React.useState(false);
  const isCustom = value === 'custom';

  const handleChangeBase = (event) => {
    setBase(event.target.value === 'custom');
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const CurrencySchema = Yup.object().shape({
    rate: Yup.number()
      .nullable()
      .when(['base', 'rateType'], {
        is: (base, rateType) => !base && rateType === 'custom',
        then: (schema) => schema.required('Rate is required'),
      }),
  });

  const formik = useFormik({
    initialValues: {
      currency: data?.code || currencies[0].code,
      base: data?.base || isBase,
      rate: data?.rate || '',
      status: data?.status || 'active',
      rateType: 'default',
    },
    enableReinitialize: true,
    validationSchema: CurrencySchema,
    onSubmit: (values) => {
      const selectedCurrency = currencies.find(
        (c) => c.code === values.currency
      );

      if (!selectedCurrency) {
        console.error('Selected currency not found!');
        return;
      }

      const formData = {
        ...values,
        name: selectedCurrency.name,
        code: selectedCurrency.code,
        country: selectedCurrency.country,
      };

      console.log('Form submitted:', formData);
      onSave?.(formData);
      onClose?.();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    if (data) {
      setValue(data.rate ? 'custom' : 'default');
      setBase(!!data.base);
    }
  }, [data]);

  return (
    <Box position="relative">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={2}>
            {/* Currency Select */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                {isLoading ? (
                  <Skeleton variant="text" width={70} />
                ) : (
                  <LabelStyle htmlFor="currency">Currency</LabelStyle>
                )}

                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    id="currency"
                    native
                    {...getFieldProps('currency')}
                    error={Boolean(touched.currency && errors.currency)}
                  >
                    <option value="" style={{ display: 'none' }} />
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </Select>
                )}

                {touched.currency && errors.currency && (
                  <FormHelperText error>{errors.currency}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Base Currency */}
            <Grid size={{ xs: 12, md: 5 }}>
              <FormControl>
                <LabelStyle htmlFor="base-type">
                  Base Currency{' '}
                  <Tooltip
                    arrow
                    title="Base currency is the default currency"
                    placement="right"
                  >
                    <IconButton size="small" color="inherit">
                      <IoInformationCircle />
                    </IconButton>
                  </Tooltip>
                </LabelStyle>
                <RadioGroup
                  row
                  id="base-type"
                  value={isBase ? 'custom' : 'default'}
                  onChange={handleChangeBase}
                >
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="default"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Rate Type */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Collapse in={!isBase}>
                <FormControl fullWidth>
                  <LabelStyle htmlFor="rate-type">
                    Rate type{' '}
                    <Tooltip
                      arrow
                      title="Rate type is the default or custom rate for the currency"
                      placement="right"
                    >
                      <IconButton size="small" color="inherit">
                        <IoInformationCircle />
                      </IconButton>
                    </Tooltip>
                  </LabelStyle>
                  <RadioGroup
                    row
                    id="rate-type"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="default"
                      control={<Radio />}
                      label="Default"
                    />
                    <FormControlLabel
                      value="custom"
                      control={<Radio />}
                      label="Custom"
                    />
                  </RadioGroup>
                </FormControl>
              </Collapse>
            </Grid>
            {/* Rate Input */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Collapse in={isCustom && !isBase}>
                <FormControl fullWidth>
                  {isLoading ? (
                    <Skeleton variant="text" width={140} />
                  ) : (
                    <LabelStyle htmlFor="rate">Currency rate</LabelStyle>
                  )}
                  {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <TextField
                      id="rate"
                      type="number"
                      {...getFieldProps('rate')}
                      error={Boolean(touched.rate && errors.rate)}
                      helperText={touched.rate && errors.rate}
                    />
                  )}
                </FormControl>
              </Collapse>
            </Grid>
            {/* Status */}
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth>
                {isLoading ? (
                  <Skeleton variant="text" width={70} />
                ) : (
                  <LabelStyle htmlFor="status">Status</LabelStyle>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    id="status"
                    native
                    {...getFieldProps('status')}
                    error={Boolean(touched.status && errors.status)}
                  >
                    <option value="" style={{ display: 'none' }} />
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                )}
                {touched.status && errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="end"
            sx={{ mt: 3 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={56} />
            ) : (
              <Button fullWidth type="submit" variant="contained">
                {data ? 'Edit Currency' : 'Create Currency'}
              </Button>
            )}
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}

CurrencyForm.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
};
