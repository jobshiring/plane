'use client';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import toast from 'react-hot-toast';
// mui
import {
  Typography,
  Stack,
  TextField,
  Grid,
  Select,
  FormControl,
  FormHelperText,
  Skeleton,
  Button,
} from '@mui/material';

// Static select options
const MODULE_OPTIONS = ['amadeus', 'duffel'];
const DEV_OPTIONS = ['development', 'production'];
const PNR_OPTIONS = ['manual', 'auto'];
const STATUS_OPTIONS = ['active', 'inactive'];

export default function ModulesForm({
  onClose,
  onSave,
  isLoading,
  currentModule,
}) {
  const [loading, setLoading] = useState(false);

  // Validation schema
  const ModulesSchema = Yup.object().shape({
    credentials1: Yup.string().required('Credentials 1 is required.'),
    devMode: Yup.string().required('Dev Mode is required.'),
    pnrType: Yup.string().required('PNR Type is required.'),
    color: Yup.string().required('Color is required.'),
    status: Yup.string().required('Status is required.'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: currentModule?.name || MODULE_OPTIONS[0],
      credentials1: currentModule?.credentials1 || '',
      credentials2: currentModule?.credentials2 || '',
      devMode: currentModule?.devMode || DEV_OPTIONS[0],
      pnrType: currentModule?.pnrType || PNR_OPTIONS[0],
      color: currentModule?.color || '#1A69BC',
      status: currentModule?.status || STATUS_OPTIONS[0],
    },
    enableReinitialize: true,
    validationSchema: ModulesSchema,

    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        console.log('Updated module:', values);
        toast.success(`${values.name} module updated successfully!`);
        if (currentModule?._id) {
          onSave({ ...currentModule, ...values });
        }

        setLoading(false);
        onClose();
      }, 800);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Module name */}
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <Stack gap={0.5} width={1}>
                <Typography variant="overline" htmlFor="name" component="label">
                  Name
                </Typography>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    id="name"
                    native
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                  >
                    <option value="" style={{ display: 'none' }} />
                    {MODULE_OPTIONS.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                )}
              </Stack>
              {touched.name && errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Credentials 1 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                htmlFor="credentials1"
                component="label"
              >
                Credentials 1
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={56} />
              ) : (
                <TextField
                  id="credentials1"
                  fullWidth
                  {...getFieldProps('credentials1')}
                  error={Boolean(touched.credentials1 && errors.credentials1)}
                  helperText={touched.credentials1 && errors.credentials1}
                />
              )}
            </Stack>
          </Grid>

          {/* Credentials 2 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                htmlFor="credentials2"
                component="label"
              >
                Credentials 2
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={56} />
              ) : (
                <TextField
                  id="credentials2"
                  fullWidth
                  {...getFieldProps('credentials2')}
                  error={Boolean(touched.credentials2 && errors.credentials2)}
                  helperText={touched.credentials2 && errors.credentials2}
                />
              )}
            </Stack>
          </Grid>

          {/* Dev Mode */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <Stack gap={0.5} width={1}>
                <Typography
                  variant="overline"
                  htmlFor="devMode"
                  component="label"
                >
                  Dev Mode
                </Typography>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    id="devMode"
                    native
                    {...getFieldProps('devMode')}
                    error={Boolean(touched.devMode && errors.devMode)}
                  >
                    <option value="" style={{ display: 'none' }} />
                    {DEV_OPTIONS.map((devMode) => (
                      <option key={devMode} value={devMode}>
                        {devMode}
                      </option>
                    ))}
                  </Select>
                )}
              </Stack>
              {touched.devMode && errors.devMode && (
                <FormHelperText error>{errors.devMode}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* PNR Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <Stack gap={0.5} width={1}>
                <Typography
                  variant="overline"
                  htmlFor="pnrType"
                  component="label"
                >
                  PNR Type
                </Typography>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    id="pnrType"
                    native
                    {...getFieldProps('pnrType')}
                    error={Boolean(touched.pnrType && errors.pnrType)}
                  >
                    <option value="" style={{ display: 'none' }} />
                    {PNR_OPTIONS.map((pnrType) => (
                      <option key={pnrType} value={pnrType}>
                        {pnrType}
                      </option>
                    ))}
                  </Select>
                )}
              </Stack>
              {touched.pnrType && errors.pnrType && (
                <FormHelperText error>{errors.pnrType}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <Stack gap={0.5} width={1}>
                <Typography
                  variant="overline"
                  htmlFor="status"
                  component="label"
                >
                  Status
                </Typography>
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
              </Stack>
              {touched.status && errors.status && (
                <FormHelperText error>{errors.status}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Color Picker */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" htmlFor="color" component="label">
                Color
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={56} />
              ) : (
                <TextField
                  id="color"
                  fullWidth
                  type="color"
                  {...getFieldProps('color')}
                  error={Boolean(touched.color && errors.color)}
                  helperText={touched.color && errors.color}
                />
              )}
            </Stack>
          </Grid>

          {/* Buttons */}
          <Grid size={{ xs: 12, md: 8 }}></Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={56} />
            ) : (
              <Button
                size="large"
                fullWidth
                color="inherit"
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={56} />
            ) : (
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Update
              </Button>
            )}
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
