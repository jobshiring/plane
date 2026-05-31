'use client';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useRouter } from '@bprogress/next';

// mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  TextField,
  Box,
  Select,
  FormControl,
  Skeleton,
  Rating,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import UploadAvatar from '../upload/upload-avatar';

// formik
import { Form, FormikProvider, useFormik } from 'formik';

const LabelStyle = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5,
}));

const STATUS_OPTIONS = ['active', 'inactive'];
const STORAGE_KEY = 'reviews_data';

export default function AdminReviewForm({
  data: currentReview,
  isLoading: _reviewLoading,
}) {
  const router = useRouter();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loading, setLoading] = useState(100);

  const callbackLoading = useCallback((value) => {
    setLoading(value);
  }, []);

  const handleSave = (values) => {
    const isEdit = !!currentReview;

    const storedReviews = localStorage.getItem(STORAGE_KEY);
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];

    if (isEdit) {
      const updatedReviews = reviews.map((review) =>
        review._id === currentReview._id
          ? {
              ...review,
              name: values.name,
              title: values.title,
              rating: values.rating,
              comment: values.comment,
              status: values.status,
              cover: values.cover,
              updatedAt: new Date().toISOString(),
            }
          : review
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
      toast.success('Review updated successfully!');
    } else {
      // Create new review
      const newReview = {
        _id: Date.now().toString(),
        name: values.name,
        title: values.title,
        rating: values.rating,
        comment: values.comment,
        status: values.status,
        cover: values.cover,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      reviews.unshift(newReview); // Add to beginning
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      toast.success('Review created!');
    }

    router.push('/admin/reviews');
  };

  const formik = useFormik({
    initialValues: {
      title: currentReview?.title || '',
      name: currentReview?.name || '',
      rating: currentReview?.rating || 0,
      comment: currentReview?.comment || '',
      status: currentReview?.status || 'active',
      photoURL: currentReview?.cover?.url || '',
      cover: currentReview?.cover || null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoadingUpload(true);
      const preview = URL.createObjectURL(file);
      setFieldValue('photoURL', preview);
      setFieldValue('cover', { _id: Date.now().toString(), url: preview });
      setTimeout(() => {
        setLoadingUpload(false);
        callbackLoading(100);
        toast.success('Image uploaded (simulated)');
      }, 1000);
    }
  };

  return (
    <Box position="relative">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ position: 'sticky', top: 24, py: 4 }}>
                <CardContent>
                  {loadingUpload ? (
                    <Stack alignItems="center">
                      <Skeleton variant="circular" width={142} height={142} />
                      <Skeleton variant="text" width={150} sx={{ mt: 1 }} />
                      <Skeleton variant="text" width={150} />
                    </Stack>
                  ) : (
                    <UploadAvatar
                      accept="image/*"
                      file={values.photoURL}
                      loading={loading}
                      maxSize={3145728}
                      onDrop={handleDrop}
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
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of 3MB
                          </Typography>
                        </>
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems={'center'}
                      spacing={2}
                    >
                      <Stack width={1}>
                        <LabelStyle htmlFor="name">User name</LabelStyle>
                        <TextField
                          id="name"
                          fullWidth
                          type="text"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>

                      <Stack width={1}>
                        <LabelStyle htmlFor="title">Title</LabelStyle>
                        <TextField
                          id="title"
                          fullWidth
                          type="text"
                          {...getFieldProps('title')}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      </Stack>
                    </Stack>
                    <Stack width={1}>
                      <LabelStyle htmlFor="rating">Rating</LabelStyle>
                      <Rating
                        id="rating"
                        name="rating"
                        value={formik.values.rating}
                        onChange={(event, newValue) => {
                          setFieldValue('rating', newValue);
                        }}
                        precision={0.5}
                      />
                    </Stack>

                    <FormControl fullWidth>
                      <LabelStyle htmlFor="status">Status</LabelStyle>
                      <Select id="status" native {...getFieldProps('status')}>
                        <option value="" style={{ display: 'none' }} />
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <Stack width={1}>
                      <LabelStyle htmlFor="comment">Comment</LabelStyle>
                      <TextField
                        id="comment"
                        fullWidth
                        multiline
                        rows={5}
                        type="text"
                        {...getFieldProps('comment')}
                        error={Boolean(touched.comment && errors.comment)}
                        helperText={touched.comment && errors.comment}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
                <Button type="submit" variant="contained" size="large">
                  {currentReview ? 'Update Review' : 'Create Review'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}

AdminReviewForm.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};
