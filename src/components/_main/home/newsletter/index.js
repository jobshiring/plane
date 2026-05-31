'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Typography,
  Card,
  Stack,
  Box,
  alpha,
  CardContent,
  FormControl,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { Form, FormikProvider, useFormik } from 'formik';

const newsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default function NewsLetter() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: newsletterSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success('Subscribed successfully!');
        resetForm();
      } catch {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <Container maxWidth="lg">
        <Box position="relative">
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              zIndex: -1,
              height: { xs: 120, md: 180 },
              width: { xs: 120, md: 180 },
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
              borderRadius: '75% 75% 10% 75%',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: -1,
              height: { xs: 120, md: 180 },
              width: { xs: 120, md: 180 },
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              borderRadius: '10% 75% 75% 75%',
            }}
          />

          <Card sx={{ position: 'static', zIndex: 99 }}>
            <CardContent>
              <Box sx={{ py: 5, maxWidth: 768, mx: 'auto', display: 'flex' }}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  width={1}
                  spacing={3}
                >
                  <Stack width={1} spacing={1}>
                    <Typography variant="h3">
                      Be the first one to get the deal.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Subscribe now to know about our new deals, offers and
                      travel prices
                    </Typography>
                  </Stack>

                  <FormikProvider value={formik}>
                    <Form
                      style={{ width: '100%' }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <Stack
                        sx={{ width: '100%' }}
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={2}
                      >
                        <FormControl fullWidth variant="outlined">
                          <TextField
                            placeholder="Enter your Email"
                            {...getFieldProps('email')}
                            sx={{
                              '& .MuiInputBase-root': {
                                bgcolor: (theme) =>
                                  theme.palette.background.paper,
                              },
                            }}
                          />
                        </FormControl>

                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          type="submit"
                          loading={loading}
                          sx={{
                            marginTop: 8,
                            paddingX: 4,
                            minHeight: 56,
                          }}
                        >
                          Subscribe
                        </Button>
                      </Stack>
                    </Form>
                  </FormikProvider>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            height: 200,
            width: 200,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
            borderRadius: '50%',
            animation: 'moveBackAndForth 5s infinite alternate ease-in-out',
          }}
        />
      </Container>
    </Box>
  );
}
