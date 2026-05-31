'use client';
import * as Yup from 'yup';
import { useState } from 'react';
import RouterLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Link,
  Typography,
  Stack,
  Tooltip,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  AlertTitle,
  Button,
  Box,
} from '@mui/material';
import {
  MdOutlineVisibility,
  MdLock,
  MdOutlineVisibilityOff,
} from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/lib/redux/slices/user';
import { _users } from 'src/_mock/users';
import { FaRegCopy } from 'react-icons/fa6';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const { email } = values;
      const matchedUser = _users.data.find(
        (u) => String(u.email).toLowerCase() === String(email).toLowerCase()
      );

      if (!matchedUser) {
        toast.error('Invalid credentials!');
        return;
      }

      const userToStore = {
        ...matchedUser,
        fullName: `${matchedUser.firstName} ${matchedUser.lastName}`,
        avatarUrl: matchedUser.cover?.url || null,
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      dispatch(setLogin(userToStore));

      toast.success(`Logged in successfully as ${matchedUser.role}!`);

      setTimeout(() => {
        router.push(redirect || '/');
      }, 1000);
    }, 1000);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password should be 8 characters or longer.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <>
      <Box mb={3}>
        <Alert
          sx={{ mt: 1, alignItems: 'center' }}
          icon={false}
          severity="primary"
          variant="filled"
        >
          <AlertTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            Admin{' '}
            <Tooltip title="Copy" arrow>
              <IconButton
                size="small"
                color="inherit"
                aria-label="copy-admin"
                onClick={() => {
                  setFieldValue('email', 'admin@reactflights.com');
                  setFieldValue('password', 'test1234');
                }}
              >
                <FaRegCopy />
              </IconButton>
            </Tooltip>
          </AlertTitle>
          <b>Email:</b> admin@reactflights.com | <b>Password:</b> test1234
        </Alert>
      </Box>

      <Box mb={3}>
        <Alert
          sx={{ mt: 1, alignItems: 'center' }}
          icon={false}
          severity="secondary"
          variant="filled"
        >
          <AlertTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            User{' '}
            <Tooltip title="Copy" arrow>
              <IconButton
                size="small"
                color="inherit"
                aria-label="copy-admin"
                onClick={() => {
                  setFieldValue('email', 'user@reactflights.com');
                  setFieldValue('password', 'test1234');
                }}
              >
                <FaRegCopy />
              </IconButton>
            </Tooltip>
          </AlertTitle>
          <b>Email:</b> user@reactflights.com | <b>Password:</b> test1234
        </Alert>
      </Box>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
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
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('remember')}
                  checked={values.remember}
                />
              }
              label="Remember me"
            />
            <Link
              component={RouterLink}
              variant="subtitle2"
              href="/auth/forget-password"
            >
              Forgot password
            </Link>
          </Stack>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            login
          </Button>

          <Typography variant="subtitle2" mt={3} textAlign="center">
            Don{`'`}t have an account? &nbsp;
            <Link
              href={`/auth/register${redirect ? '?redirect=' + redirect : ''}`}
              component={RouterLink}
            >
              Register
            </Link>
          </Typography>
        </Form>
      </FormikProvider>
    </>
  );
}
