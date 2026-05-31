'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
  Stack,
  TextField,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const LabelStyle = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5,
}));

FlightSuggestionsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  onSubmitData: PropTypes.func,
};

const STATUS_OPTIONS = ['active', 'inactive'];
const TYPE_OPTIONS = ['origin', 'destination'];

export default function FlightSuggestionsDialog({
  onClose,
  data,
  onSubmitData,
}) {
  const [loading, setLoading] = useState(false);

  const ValidationSchema = Yup.object().shape({
    status: Yup.string().required('Status is required.'),
    airport: Yup.string().required('Airport is required.'),
    order: Yup.number()
      .typeError('Order must be a number')
      .required('Order is required.'),
    type: Yup.string().required('Type is required.'),
  });

  const formik = useFormik({
    initialValues: {
      status: data?.status || STATUS_OPTIONS[0],
      airport: data?.airport || '',
      order: data?.order || 0,
      type: data?.type || TYPE_OPTIONS[0],
    },
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (onSubmitData) onSubmitData(values);
        onClose();
      }, 400);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <DialogTitle>{data ? 'Edit' : 'Create'} Airport Suggestion</DialogTitle>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent sx={{ pb: 1 }}>
            <Stack spacing={2}>
              <FormControl
                fullWidth
                sx={{ select: { textTransform: 'capitalize' } }}
              >
                <LabelStyle htmlFor="status">Status</LabelStyle>
                <Select
                  id="status"
                  native
                  {...getFieldProps('status')}
                  error={Boolean(touched.status && errors.status)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{ select: { textTransform: 'capitalize' } }}
              >
                <LabelStyle htmlFor="type">Type</LabelStyle>
                <Select
                  id="type"
                  native
                  {...getFieldProps('type')}
                  error={Boolean(touched.type && errors.type)}
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Stack>
                <LabelStyle htmlFor="airport">Airport</LabelStyle>
                <TextField
                  id="airport"
                  {...getFieldProps('airport')}
                  error={Boolean(touched.airport && errors.airport)}
                  helperText={touched.airport && errors.airport}
                />
              </Stack>

              <Stack>
                <LabelStyle htmlFor="order">Order</LabelStyle>
                <TextField
                  id="order"
                  type="number"
                  {...getFieldProps('order')}
                  error={Boolean(touched.order && errors.order)}
                  helperText={touched.order && errors.order}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {data ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
}
