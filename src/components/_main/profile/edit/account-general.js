'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Skeleton,
  Button,
} from '@mui/material';
import { MdVerified } from 'react-icons/md';

import UploadAvatar from '@/components/upload/upload-avatar';
import countries from '@/components/countries.json';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '@/lib/redux/slices/user';
import {_users} from 'src/_mock/users';

export default function AccountGeneral() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const storedUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  const currentUser = user || storedUser;
  const matchedUser = _users.data.find(
    (u) =>
      String(u.email).toLowerCase() ===
      String(currentUser?.email || '').toLowerCase()
  );
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // validation
  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    phoneNumber: Yup.string().required('Phone required'),
    gender: Yup.string().required('Gender required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: matchedUser?.firstName || '',
      lastName: matchedUser?.lastName || '',
      email: matchedUser?.email || '',
      photoURL: matchedUser?.cover?.url || '',
      phoneNumber: matchedUser?.phone || '',
      gender: matchedUser?.gender || '',
      about: matchedUser?.about || '',
      file: '',
      cover: matchedUser?.cover || null,
      address: matchedUser?.address || '',
      city: matchedUser?.city || '',
      state: matchedUser?.state || '',
      country: matchedUser?.country || 'Pakistan',
      zip: matchedUser?.zip || '',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const { file: _file, ...rest } = values;
      console.log('', _file);
      const updatedUser = {
        ...matchedUser,
        ...rest,
        fullName: `${values.firstName} ${values.lastName}`,
        avatarUrl: values.photoURL || matchedUser?.avatarUrl || null,
      };
      dispatch(setLogin(updatedUser));
      toast.success('Profile updated successfully');
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

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoadingUpload(true);
    const previewUrl = URL.createObjectURL(file);
    setFieldValue('photoURL', previewUrl);

    const newAvatar = { _id: 'local_' + Date.now(), url: previewUrl };
    setFieldValue('cover', newAvatar);
    // setAvatarId(newAvatar._id);
    setLoadingUpload(false);

    const updatedUser = { ...matchedUser, cover: newAvatar };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(setLogin(updatedUser));
    toast.success('Avatar updated');
  };

  const onVerifyAccount = () => {
    setVerifyLoading(true);
    setTimeout(() => {
      const verified = { ...matchedUser, isVerified: true };
      dispatch(setLogin(verified));
      toast.success('Account verified!');
      setVerifyLoading(false);
    }, 1200);
  };

  // redirect admin users away
  useEffect(() => {
    if (!pathname.includes('admin') && user?.role?.includes('admin')) {
      router.push('/admin/settings');
      toast("User can't access this page.", { duration: 6000 });
    }
  }, [pathname, router, user?.role]);

  const isLoading = !user; // only true before Redux state is loaded

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} my={3}>
          {/* === Left card: Avatar + Verify === */}
          <Grid
            item
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Card sx={{ py: 11.8, px: 3, textAlign: 'center' }}>
              {isLoading || loadingUpload ? (
                <Stack alignItems="center">
                  <Skeleton variant="circular" width={142} height={142} />
                  <Skeleton variant="text" width={150} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width={150} />
                </Stack>
              ) : (
                <UploadAvatar
                  accept="image/*"
                  file={values.photoURL}
                  loading={false}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.photoURL && errors.photoURL)}
                  caption={
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                          mb: 1,
                          position: 'relative',
                          svg: {
                            color: 'primary.main',
                            position: 'absolute',
                            top: '-123px',
                            right: '33%',
                            transform: 'translate(24%, -100%)',
                          },
                        }}
                      >
                        {user?.isVerified && <MdVerified size={24} />}
                        Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size 3MB
                      </Typography>
                    </>
                  }
                />
              )}
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              {!user?.isVerified && (
                <Button
                  loading={verifyLoading}
                  variant="text"
                  color="primary"
                  onClick={onVerifyAccount}
                >
                  Verify Account
                </Button>
              )}
            </Card>
          </Grid>

          {/* === Right card: Form === */}
          <Grid
            item
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Card
              sx={{
                p: 3,
                '& .MuiTypography-root': {
                  marginBottom: '8px !important',
                },
              }}
            >
              <Stack spacing={2}>
                {/* --- Name --- */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>
                </Stack>

                {/* --- Contact --- */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      Phone
                    </Typography>
                    <TextField
                      fullWidth
                      {...getFieldProps('phoneNumber')}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      Gender
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      {...getFieldProps('gender')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </TextField>
                  </Stack>
                </Stack>

                {/* --- Address --- */}
                <Stack spacing={0.5} width={1}>
                  <Typography variant="overline" color="text.primary">
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>

                {/* --- Country --- */}
                <Stack spacing={0.5} width={1}>
                  <Typography variant="overline" color="text.primary">
                    Country
                  </Typography>
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

                {/* --- City / State / Zip --- */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      City
                    </Typography>
                    <TextField
                      fullWidth
                      {...getFieldProps('city')}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      State
                    </Typography>
                    <TextField
                      fullWidth
                      {...getFieldProps('state')}
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      Zip Code
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      {...getFieldProps('zip')}
                      error={Boolean(touched.zip && errors.zip)}
                      helperText={touched.zip && errors.zip}
                    />
                  </Stack>
                </Stack>

                {/* --- About --- */}
                <Stack spacing={0.5} width={1}>
                  <Typography variant="overline" color="text.primary">
                    About
                  </Typography>
                  <TextField
                    {...getFieldProps('about')}
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                  />
                </Stack>
              </Stack>

              {/* --- Submit --- */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  loading={loadingUpload}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
