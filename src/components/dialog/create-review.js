'use client';
import * as React from 'react';

// MUI components
import { styled } from '@mui/material/styles';
import {
  Stack,
  TextField,
  Box,
  FormHelperText,
  Skeleton,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

import toast from 'react-hot-toast';

// Form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

// State & Routing
import { useSelector } from 'react-redux';
import { useRouter } from '@bprogress/next';
import { getUser } from '@/redux';

const LabelStyle = styled('label')(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 1.5,
}));

export default function UserReviewDialog({ _setstate }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector(getUser);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CurrencySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    rating: Yup.number()
      .min(1, 'Rating is required')
      .required('Rating is required'),
    comment: Yup.string().required('Comment is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      rating: 0,
      comment: '',
    },
    enableReinitialize: true,
    validationSchema: CurrencySchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Review Submitted:', values);
      setLoading(true);
      setTimeout(() => {
        toast.success('Review Submitted!');
        setLoading(false);
        resetForm();
        handleClose();
      }, 500);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Create a Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle>
              Share Your Travel Experience
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Tell others about your journey. Your feedback helps travelers
                make better decisions.
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={2}>
                <Stack width={1}>
                  <LabelStyle htmlFor="title">Review Title</LabelStyle>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <TextField
                      id="title"
                      fullWidth
                      type="text"
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  )}
                </Stack>
                <Stack width={1}>
                  <LabelStyle htmlFor="rating">Overall Rating</LabelStyle>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <>
                      <Rating
                        id="rating"
                        name="rating"
                        value={formik.values.rating}
                        onChange={(_, newValue) => {
                          setFieldValue('rating', newValue);
                        }}
                        precision={0.5}
                      />
                      {touched.rating && errors.rating ? (
                        <FormHelperText error>{errors.rating}</FormHelperText>
                      ) : (
                        <FormHelperText>
                          How would you rate your overall experience?
                        </FormHelperText>
                      )}
                    </>
                  )}
                </Stack>
                <Stack width={1}>
                  <LabelStyle htmlFor="comment">Your Review</LabelStyle>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
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
                  )}
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                color="info"
                variant="outlined"
                size="small"
                onClick={handleClose}
                sx={{ px: 3 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="small"
                variant="contained"
                loading={loading}
              >
                Create Review
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </Box>
  );
}
