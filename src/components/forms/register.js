'use client';
import { useState } from 'react';
import * as Yup from 'yup';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import RouterLink from 'next/link';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Link,
  Button,
} from '@mui/material';
// Custom Phone Input Component
import PhoneInput from 'src/components/phone-input';
// Icons
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdLock,
  MdLocalPhone,
} from 'react-icons/md';
import { IoMdMale, IoMdFemale, IoMdMail } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender } from 'react-icons/fa6';
import { isValidPhoneNumber } from 'react-phone-number-input';

export default function RegisterForm() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'Too long!')
      .required('First name is required'),
    lastName: Yup.string()
      .max(50, 'Too long!')
      .required('Last name is required'),
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone is required')
      .test('is-valid-phone', 'Phone number is not valid', (value) =>
        isValidPhoneNumber(value || '')
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password should be 8 characters or longer.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .min(8, 'Password should be 8 characters or longer.'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'male',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        alert(`Welcome ${values.firstName}! Registration successful.`);
        setLoading(false);
        router.push(redirect || '/');
      }, 1200);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldValue,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Name Fields */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                component="label"
                htmlFor="firstName"
              >
                First Name
              </Typography>
              <TextField
                id="firstName"
                fullWidth
                type="text"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoPerson size={24} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                component="label"
                htmlFor="lastName"
              >
                Last Name
              </Typography>
              <TextField
                id="lastName"
                fullWidth
                type="text"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoPerson size={24} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>

          {/* Gender and Phone */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                component="label"
                htmlFor="gender"
              >
                Gender
              </Typography>
              <TextField
                id="gender"
                select
                fullWidth
                {...getFieldProps('gender')}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.gender === 'male' ? (
                        <IoMdMale size={24} />
                      ) : values.gender === 'female' ? (
                        <IoMdFemale size={24} />
                      ) : (
                        <FaTransgender size={24} />
                      )}
                    </InputAdornment>
                  ),
                }}
              >
                {['Male', 'Female', 'Other'].map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack gap={0.5} width={1}>
              <Typography
                variant="overline"
                color="text.primary"
                component="label"
                htmlFor="phone"
              >
                Phone
              </Typography>
              <PhoneInput
                errors={errors}
                onChange={(val) => setFieldValue('phone', val)}
                onBlur={() => formik.setFieldTouched('phone', true)}
                value={values.phone}
              />
            </Stack>
          </Stack>

          {/* Email */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              component="label"
              htmlFor="email"
            >
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              autoComplete="username"
              type="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Password */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              component="label"
              htmlFor="password"
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
          {/* Password */}
          <Stack gap={0.5} width={1}>
            <Typography
              variant="overline"
              color="text.primary"
              component="label"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
              fullWidth
              autoComplete="current-password"
              type={showPassword1 ? 'text' : 'password'}
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
                      onClick={() => setShowPassword1((prev) => !prev)}
                    >
                      {showPassword1 ? (
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

          {/* Submit */}
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Register
          </Button>
        </Stack>

        {/* Footer Links */}
        <Typography variant="subtitle2" mt={3} textAlign="center">
          Already have an account? &nbsp;
          <Link
            href={`/auth/login${redirect ? '?redirect=' + redirect : ''}`}
            component={RouterLink}
          >
            Login
          </Link>
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mt={2}
        >
          By registering, I agree to React Flights&nbsp;
          <Link
            component={RouterLink}
            underline="always"
            color="text.primary"
            href="/terms-conditions"
            fontWeight={700}
          >
            Terms
          </Link>
          &nbsp;and&nbsp;
          <Link
            component={RouterLink}
            underline="always"
            color="text.primary"
            href="/privacy-policy"
            fontWeight={700}
          >
            Privacy policy
          </Link>
          .
        </Typography>
      </Form>
    </FormikProvider>
  );
}
