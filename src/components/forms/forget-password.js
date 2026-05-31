'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  TextField,
  Stack,
  InputAdornment,
  Typography,
  Button,
} from '@mui/material';

import { IoMdMail } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useRouter } from '@bprogress/next';

export default function ForgetPasswordForm({ onSent, onGetEmail }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onGetEmail(values.email);
        onSent();
        toast.success('OTP sent successfully!');
        // router.push(`/auth/verify-otp?otp=123456`);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Email Field */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              htmlFor="email"
              component="label"
            >
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              type="text"
              {...getFieldProps('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          {/* Submit Button */}
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Send Email
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

ForgetPasswordForm.propTypes = {
  onSent: PropTypes.func.isRequired,
  onGetEmail: PropTypes.func.isRequired,
};
