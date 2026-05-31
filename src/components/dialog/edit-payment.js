'use client';
import React, { useState } from 'react';
// import toast from "react-hot-toast";
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
  marginBottom: theme.spacing(0.5),
  lineHeight: 1.5,
}));

EditPaymentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  apicall: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const STATUS_OPTIONS = ['active', 'inactive'];
const DEV_OPTIONS = ['development', 'production'];

export default function EditPaymentDialog({ onClose, data, apicall }) {
  const [loading, setLoading] = useState(false);

  const EditPaymentSchema = Yup.object().shape({
    status: Yup.string().required('Status is required.'),
    publicKey: Yup.string().required('Public Key is required.'),
    secretKey: Yup.string().required('Secret Key is required.'),
    mode: Yup.string().required('Mode is required.'),
  });

  const handleSubmitForm = (values) => {
    setLoading(true);
    const updated = {
      ...data,
      publicKey: values.publicKey,
      secretKey: values.secretKey,
      status: values.status,
      mode: values.mode,
    };
    apicall(updated);
    const stored = JSON.parse(localStorage.getItem('paymentGetways') || '[]');
    const newStored = stored.map((item) =>
      item._id === updated._id ? updated : item
    );
    localStorage.setItem('paymentGetways', JSON.stringify(newStored));
    setLoading(false);

    onClose();
  };

  const formik = useFormik({
    initialValues: {
      status: data?.status || STATUS_OPTIONS[0],
      name: data?.name || '',
      publicKey: data?.publicKey || '',
      secretKey: data?.secretKey || '',
      mode: data?.mode || DEV_OPTIONS[0],
    },
    enableReinitialize: true,
    validationSchema: EditPaymentSchema,
    onSubmit: handleSubmitForm,
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <DialogTitle>Edit Payment Gateway</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent sx={{ pb: '16px !important' }}>
            <Stack spacing={1.5}>
              <Stack width={1}>
                <LabelStyle htmlFor="name">Name</LabelStyle>
                <TextField
                  id="name"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  type="text"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack width={1}>
                <LabelStyle htmlFor="publicKey">Public Key</LabelStyle>
                <TextField
                  id="publicKey"
                  fullWidth
                  type="text"
                  {...getFieldProps('publicKey')}
                  error={Boolean(touched.publicKey && errors.publicKey)}
                  helperText={touched.publicKey && errors.publicKey}
                />
              </Stack>
              <Stack width={1}>
                <LabelStyle htmlFor="secretKey">Secret Key</LabelStyle>
                <TextField
                  id="secretKey"
                  fullWidth
                  type="text"
                  {...getFieldProps('secretKey')}
                  error={Boolean(touched.secretKey && errors.secretKey)}
                  helperText={touched.secretKey && errors.secretKey}
                />
              </Stack>
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
                  <option value="" style={{ display: 'none' }} />
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
                <LabelStyle htmlFor="mode">Mode</LabelStyle>
                <Select
                  id="mode"
                  native
                  {...getFieldProps('mode')}
                  error={Boolean(touched.mode && errors.mode)}
                >
                  <option value="" style={{ display: 'none' }} />
                  {DEV_OPTIONS.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ pt: '8px !important' }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
}
