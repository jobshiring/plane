'use client';
import React from 'react';

// MUI Components
import { Grid } from '@mui/material';

// React Query (Data fetching & mutations)
// import { useQuery, useMutation } from "react-query";

// Formik for form handling
import { FormikProvider, useFormik, Form } from 'formik';
import * as Yup from 'yup';

// Phone validation
import { isValidPhoneNumber } from 'react-phone-number-input';

// API Calls
// import * as api from "src/services";

// Notifications
// import toast from 'react-hot-toast';

// Navigation
import { useRouter } from '@bprogress/next';

// Custom Components
import BookingForm from 'src/components/forms/booking';
import FlightDetails from '@/components/cards/flight-details';

// Redux State Management
import { useSelector, useDispatch, booking, flightSlice } from '@/redux';
// import ExpiryCountDown from "@/components/expiryCountdown";

const Booking = () => {
  const router = useRouter();
  const bookingState = useSelector(booking);
  const bookingData = bookingState?.bookingDetails || bookingState;

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { setFieldValue, ...formikRest } = useFormik({
    initialValues: {
      travelers:
        bookingData?.travelers?.map((trav) => ({
          id: trav.id,
          type: trav.type,
          count: trav.count,
          dateOfBirth: '1998-02-02',
          name: { firstName: '', lastName: '' },
          gender: '',
          documents: [
            {
              documentType: 'Passport',
              number: '',
              expiryDate: '',
              issuanceCountry: 'USA',
              nationality: 'USA',
              holder: true,
            },
          ],
        })) || [],
      phone: '',
      email: '',
      firstName: '',
      lastName: '',
      paymentMethod: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      paymentMethod: Yup.string().required('Payment Method is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
      phone: Yup.string()
        .required('Phone is required')
        .test('is-valid-phone', 'Phone number is not valid', (value) =>
          isValidPhoneNumber(value || '')
        ),
      travelers: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().required('ID is required'),
          name: Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
          }),
          dateOfBirth: Yup.string().required('Date of Birth is required'),
          gender: Yup.string().required('Gender is required'),
          // documents: Yup.array().of(
          //   Yup.object().shape({
          //     documentType: Yup.string().required('Document Type is required'),
          //     number: Yup.string().required('Number is required'),
          //     expiryDate: Yup.string().required('Expiry Date is required'),
          //     issuanceCountry: Yup.string().required(
          //       'Issuance Country is required'
          //     ),
          //     nationality: Yup.string().required('Nationality is required'),
          //   })
          // ),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          bookingDetails: bookingData,
          contactDetails: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
          },
          paymentMethod: values.paymentMethod,
          travelers: values.travelers,
        };
        console.log('Booking payload:', payload);
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        dispatch(flightSlice.actions.confirmBooking(payload));

        router.push('/invoice/' + '68e375bca3cb569213c388ee');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { handleSubmit } = formikRest;

  // const { data: paymentGateways, isLoading: paymentLoading } = useQuery(
  //   ["get-payment-gateways"],
  //   () => api.paymentMethods(),
  //   {
  //     onSuccess: (res) =>
  //       setFieldValue("paymentMethod", res?.data[0]?.name || ""),
  //   }
  // );

  // const { mutate, isLoading } = useMutation("order", api.createFlightBooking, {
  //   onSuccess: (data) => {
  //     toast.success("Invoice generated.");
  //     dispatch(flightSlice.actions.confirmBooking(data));
  //     router.push("/en/invoice/" + data.bookingId);
  //   },
  //   onError: (err) => {
  //     toast.error(err?.response?.data?.message || "Something went wrong");
  //   },
  // });

  return (
    <FormikProvider value={{ ...formikRest, setFieldValue }}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* <ExpiryCountDown /> */}
        <Grid
          container
          spacing={3}
          sx={{
            flexDirection: {
              md: 'row',
              xs: 'column-reverse',
            },
          }}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <BookingForm
              isLoading={loading}
              formik={{ ...formikRest, setFieldValue }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FlightDetails data={bookingData} />
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default Booking;
