'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useRouter } from '@bprogress/next';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdLock,
} from 'react-icons/md';

export default function ResetPasswordForm({ _token }) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Local simulation of reset (no API)
  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Password successfully updated.');
      push('/auth/login');
    }, 1000);
  };

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Short password')
      .required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Password is not matched'
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: handleReset,
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Password Field */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              htmlFor="password"
              component="label"
            >
              Password
            </Typography>
            <TextField
              id="password"
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock size={24} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <MdOutlineVisibility size={24} />
                      ) : (
                        <MdOutlineVisibilityOff size={24} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          {/* Confirm Password Field */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              htmlFor="confirmPassword"
              component="label"
            >
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...getFieldProps('confirmPassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock size={24} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <MdOutlineVisibility size={24} />
                      ) : (
                        <MdOutlineVisibilityOff size={24} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Save
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
};
