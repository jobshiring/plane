'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import toast from 'react-hot-toast';
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
  InputAdornment,
} from '@mui/material';
import { TbPercentage } from 'react-icons/tb';
import MarkupUserSelect from '../selects/markup-user';

const STATUS_OPTIONS = ['active', 'inactive'];

export default function MarkupForm(props) {
  const { isLoading, currentMarkup, modulesName, onClose, onSave } = props;
  const [selectedUsers, setSelectedUsers] = useState(
    currentMarkup?.users || []
  );
  const [loading, setLoading] = useState(false);
  const MarkupSchema = Yup.object().shape({
    b2cMarkup: Yup.number()
      .typeError('B2C Markup must be a number')
      .required('B2C Markup is required.'),
    b2bMarkup: Yup.number()
      .typeError('B2B Markup must be a number')
      .required('B2B Markup is required.'),
    moduleId: Yup.string().required('Module is required.'),
    status: Yup.string().required('Status is required.'),
  });

  const getModuleId = () => {
    if (!currentMarkup?.moduleId) return '';
    return typeof currentMarkup.moduleId === 'object'
      ? currentMarkup.moduleId._id
      : currentMarkup.moduleId;
  };

  //  Formik setup
  const formik = useFormik({
    initialValues: {
      b2cMarkup: currentMarkup?.b2cMarkup || 0,
      b2bMarkup: currentMarkup?.b2bMarkup || 0,
      moduleId: getModuleId(),
      status: currentMarkup?.status || STATUS_OPTIONS[0],
    },
    enableReinitialize: true,
    validationSchema: MarkupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const selectedModule = modulesName.find(
          (m) => m._id === values.moduleId
        );

        const payload = {
          _id: currentMarkup?._id,
          b2cMarkup: values.b2cMarkup,
          b2bMarkup: values.b2bMarkup,
          status: values.status,
          moduleId: selectedModule || { _id: values.moduleId, name: 'Unknown' },
          users: selectedUsers,
          updatedAt: new Date().toISOString(),
        };

        await new Promise((res) => setTimeout(res, 600)); // simulate delay
        toast.success(
          currentMarkup ? 'Markup updated successfully!' : 'Markup created!'
        );

        if (onSave) onSave(payload);
        onClose();
      } catch (_err) {
        console.log(_err);
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* B2C Markup */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                htmlFor="b2cMarkup"
                component="label"
              >
                B2C Markup
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={56} />
              ) : (
                <TextField
                  id="b2cMarkup"
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbPercentage />
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps('b2cMarkup')}
                  error={Boolean(touched.b2cMarkup && errors.b2cMarkup)}
                  helperText={touched.b2cMarkup && errors.b2cMarkup}
                />
              )}
            </Stack>
          </Grid>

          {/* B2B Markup */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                htmlFor="b2bMarkup"
                component="label"
              >
                B2B Markup
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={56} />
              ) : (
                <TextField
                  id="b2bMarkup"
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbPercentage />
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps('b2bMarkup')}
                  error={Boolean(touched.b2bMarkup && errors.b2bMarkup)}
                  helperText={touched.b2bMarkup && errors.b2bMarkup}
                />
              )}
            </Stack>
          </Grid>

          {/* Module Select */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              sx={{ select: { textTransform: 'capitalize' } }}
            >
              <Stack gap={0.5} width={1}>
                <Typography
                  variant="overline"
                  color="text.primary"
                  htmlFor="moduleId"
                  component="label"
                >
                  Module
                </Typography>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Select
                    native
                    id="moduleId"
                    {...getFieldProps('moduleId')}
                    error={Boolean(touched.moduleId && errors.moduleId)}
                  >
                    <option value="" style={{ display: 'none' }}>
                      Select Module
                    </option>
                    {modulesName?.map((module) => (
                      <option key={module._id} value={module._id}>
                        {module.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Stack>
              {touched.moduleId && errors.moduleId && (
                <FormHelperText error sx={{ px: 2 }}>
                  {errors.moduleId}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Status Select */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              sx={{ select: { textTransform: 'capitalize' } }}
            >
              <Stack gap={0.5} width={1}>
                <Typography
                  variant="overline"
                  color="text.primary"
                  htmlFor="status"
                  component="label"
                >
                  Status
                </Typography>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
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
                )}
              </Stack>
              {touched.status && errors.status && (
                <FormHelperText error sx={{ px: 2 }}>
                  {errors.status}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* User Selector */}
          <Grid size={{ xs: 12 }}>
            <MarkupUserSelect
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </Grid>

          {/* Actions */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="end"
            sx={{ mt: 3, width: '100%' }}
          >
            <Button color="inherit" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            {isLoading ? (
              <Skeleton variant="rectangular" width={80} height={56} />
            ) : (
              <Button type="submit" variant="contained" loading={loading}>
                {currentMarkup ? 'Update' : 'Create'}
              </Button>
            )}
          </Stack>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
