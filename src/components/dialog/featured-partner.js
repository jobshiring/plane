'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import countries from '@/components/countries.json';
// mui
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Grid,
  FormHelperText,
  Select,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// formik & yup
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// components
import UploadSingleFile from '../upload/upload-single-file';

// Styled label
const LabelStyle = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 1.5,
}));

const STATUS_OPTIONS = ['active', 'inactive'];

export default function FeaturedPartnerDialog({
  onClose,
  data,
  onSave,
  _type,
}) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Validation schema
  const Schema = Yup.object().shape({
    name: Yup.string().required('Partner Name is required.'),
    iata: Yup.string().required('IATA is required.'),
    icao: Yup.string().required('ICAO is required.'),
    country: Yup.string().required('Country is required.'),
    status: Yup.string().required('Status is required.'),
    website: Yup.string()
      .url('Enter a valid URL')
      .required('Website is required.'),
    type: Yup.string().required('Type is required.'),
    cover: Yup.object().shape({
      url: Yup.string().required('Image URL is required'),
    }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      cover: data?.cover || null,
      iata: data?.iata || '',
      icao: data?.icao || '',
      country: data?.country || 'Pakistan',
      type: data?.type || '',
      status: data?.status || STATUS_OPTIONS[0],
      website: data?.website || '',
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);

      // Simulate async save delay
      setTimeout(() => {
        onSave(values);
        setLoading(false);
        toast.success(data ? 'Updated successfully!' : 'Created successfully!');
      }, 800);
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  // Mock image upload (no Cloudinary)
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const mockUrl = URL.createObjectURL(file);

    // Simulate upload progress
    setUploadProgress(50);
    setTimeout(() => {
      setFieldValue('cover', {
        _id: String(Date.now()),
        url: mockUrl,
      });
      setUploadProgress(false);
      toast.success('Image uploaded successfully!');
    }, 1000);
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        {data ? 'Edit Featured Partner' : 'Create Featured Partner'}
      </DialogTitle>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent sx={{ pb: '16px !important' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* Partner Name */}
                <Stack width={1}>
                  <LabelStyle htmlFor="name">Partner Name</LabelStyle>
                  <TextField
                    id="name"
                    fullWidth
                    type="text"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* type */}
                <Stack width={1}>
                  <LabelStyle htmlFor="type">Type</LabelStyle>
                  <TextField
                    id="type"
                    fullWidth
                    type="text"
                    {...getFieldProps('type')}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* iata */}
                <Stack width={1}>
                  <LabelStyle htmlFor="iata">IATA</LabelStyle>
                  <TextField
                    id="iata"
                    fullWidth
                    type="text"
                    {...getFieldProps('iata')}
                    error={Boolean(touched.iata && errors.iata)}
                    helperText={touched.iata && errors.iata}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* icao */}
                <Stack width={1}>
                  <LabelStyle htmlFor="icao">ICAO</LabelStyle>
                  <TextField
                    id="icao"
                    fullWidth
                    type="text"
                    {...getFieldProps('icao')}
                    error={Boolean(touched.icao && errors.icao)}
                    helperText={touched.icao && errors.icao}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* website */}
                <Stack width={1}>
                  <LabelStyle htmlFor="website">Website</LabelStyle>
                  <TextField
                    id="website"
                    fullWidth
                    type="text"
                    {...getFieldProps('website')}
                    error={Boolean(touched.website && errors.website)}
                    helperText={touched.website && errors.website}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* status */}
                <FormControl
                  fullWidth
                  sx={{ select: { textTransform: 'capitalize' } }}
                >
                  <Stack>
                    <LabelStyle htmlFor="status">Status</LabelStyle>
                    <Select
                      native
                      id="status"
                      {...getFieldProps('status')}
                      error={Boolean(touched.status && errors.status)}
                    >
                      <option value="" style={{ display: 'none' }}>
                        Select Status
                      </option>
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                  {touched.status && errors.status && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.status}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                {/* country */}
                <Stack width={1}>
                  <LabelStyle htmlFor="country">Country</LabelStyle>
                  <TextField
                    select
                    fullWidth
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                {/* Cover Image */}
                <Stack>
                  <LabelStyle htmlFor="cover">Cover Image</LabelStyle>
                  <UploadSingleFile
                    id="cover"
                    file={values.cover}
                    onDrop={handleDrop}
                    error={Boolean(touched.cover && errors.cover)}
                    accept="image/*"
                    loading={uploadProgress}
                    category
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ pt: '8px !important' }}>
            <Button onClick={onClose} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              loading={loading}
              type="submit"
              color="primary"
            >
              {data ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
}

FeaturedPartnerDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
  type: PropTypes.string,
};
