'use client';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

// mui
import {
  Typography,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  Skeleton,
  Select,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import UploadSingleFile from '../upload/upload-single-file';
import DatePicker from 'src/components/selects/date';
import DateRange from 'src/components/selects/date-range';
import dayjs from 'dayjs';
function formatText(text) {
  return text
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(date) {
  if (!date || isNaN(new Date(date).getTime())) return '';
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(date).getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const TRIP_TYPE = ['oneway', 'round'];
const STATUS_OPTIONS = ['active', 'inactive'];
const DEPARTURE_OPTIONS = [
  { city: 'Toronto', iataCode: 'YYZ' },
  { city: 'New York', iataCode: 'JFK' },
  { city: 'Los Angeles', iataCode: 'LAX' },
  { city: 'Chicago', iataCode: 'ORD' },
  { city: 'Miami', iataCode: 'MIA' },
  { city: 'San Francisco', iataCode: 'SFO' },
  { city: 'Houston', iataCode: 'IAH' },
  { city: 'Dallas', iataCode: 'DFW' },
  { city: 'Atlanta', iataCode: 'ATL' },
  { city: 'Boston', iataCode: 'BOS' },
];
const ARRIVAL_OPTIONS = [
  { city: 'London', iataCode: 'LHR' },
  { city: 'Paris', iataCode: 'CDG' },
  { city: 'Tokyo', iataCode: 'HND' },
  { city: 'Dubai', iataCode: 'DXB' },
  { city: 'Singapore', iataCode: 'SIN' },
  { city: 'Sydney', iataCode: 'SYD' },
  { city: 'Hong Kong', iataCode: 'HKG' },
  { city: 'Frankfurt', iataCode: 'FRA' },
  { city: 'Amsterdam', iataCode: 'AMS' },
  { city: 'Rome', iataCode: 'FCO' },
];
export default function FlightRouteForm({ flightRoute, isLoading }) {
  console.log('flightRoute', flightRoute);

  const router = useRouter();
  const [startDate, setStartDate] = useState(dayjs().add(2, 'day'));
  const [endDate, setEndDate] = useState(dayjs().add(5, 'day'));
  const [trip, setTrip] = useState(TRIP_TYPE[0]);
  const [uploadState, setUploadState] = useState({ loading: false });
  const [loading, setLoading] = useState(false);
  // Schema validation
  const ModulesSchema = Yup.object().shape({
    status: Yup.string().required('Status is required.'),
    cover: Yup.object().shape({
      url: Yup.string().required('Image URL is required'),
    }),
  });
  const params = useParams();
  const urlIdParam = params?.id;
  const formik = useFormik({
    initialValues: {
      departure: flightRoute?.departure || DEPARTURE_OPTIONS[0],
      arrival: flightRoute?.arrival || ARRIVAL_OPTIONS[0],
      cover: flightRoute?.cover || null,
      file: flightRoute?.cover || '',
      status: flightRoute?.status || STATUS_OPTIONS[0],
    },
    enableReinitialize: true,
    validationSchema: ModulesSchema,

    onSubmit: async (values) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        const newRoute = {
          _id: Date.now().toString(),
          ...values,
          departureDate: formatDate(startDate),
          tripType: trip,
          ...(trip === 'round' && { arrivalDate: formatDate(endDate) }),
          updatedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(
          localStorage.getItem('flightRoutes') || '[]'
        );

        const idsToRemove = new Set();
        if (urlIdParam) idsToRemove.add(String(urlIdParam));
        if (flightRoute?._id) idsToRemove.add(String(flightRoute._id));
        const filtered = existing.filter(
          (r) => !idsToRemove.has(String(r._id))
        );

        const updated = [...filtered, newRoute];

        localStorage.setItem('flightRoutes', JSON.stringify(updated));

        toast.success('Flight route saved successfully!');
        setLoading(false);
        router.push('/admin/featured-flights');
        router.refresh();
      }, 1000);
    },
  });
  const {
    errors,
    touched,
    values,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;
  useEffect(() => {
    if (flightRoute?.tripType) setTrip(flightRoute.tripType);
  }, [flightRoute?.tripType]);
  useEffect(() => {
    if (flightRoute?.departureDate)
      setStartDate(dayjs(new Date(flightRoute.departureDate)));
  }, [flightRoute?.departureDate]);
  useEffect(() => {
    if (flightRoute?.arrivalDate)
      setEndDate(dayjs(new Date(flightRoute.arrivalDate)));
  }, [flightRoute?.arrivalDate]);
  const handleDepartureChange = (e) => {
    const selected = DEPARTURE_OPTIONS.find(
      (d) => d.iataCode === e.target.value
    );
    if (selected) setFieldValue('departure', selected);
  };
  const handleArrivalChange = (e) => {
    const selected = ARRIVAL_OPTIONS.find((d) => d.iataCode === e.target.value);
    if (selected) setFieldValue('arrival', selected);
  };
  const handleDrop = async (acceptedFiles) => {
    setUploadState({ loading: 2 });
    const file = acceptedFiles[0];
    if (!file) return;
    Object.assign(file, { preview: URL.createObjectURL(file) });
    setFieldValue('file', file);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadState({ loading: progress });
      if (progress >= 100) {
        clearInterval(interval);
        const mockUrl = URL.createObjectURL(file);
        setFieldValue('cover', { _id: Date.now(), url: mockUrl });
        setUploadState({ loading: false });
        toast.success('Image uploaded!');
      }
    }, 200);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* LEFT COLUMN */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  {/* Departure */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Stack gap={0.5}>
                        <Typography
                          variant="overline"
                          color="text.primary"
                          component="label"
                          htmlFor="departure"
                        >
                          Departure
                        </Typography>
                        {isLoading ? (
                          <Skeleton variant="rectangular" height={56} />
                        ) : (
                          <Select
                            id="departure"
                            native
                            value={values.departure.iataCode}
                            onChange={handleDepartureChange}
                          >
                            <option value="" style={{ display: 'none' }} />
                            {DEPARTURE_OPTIONS.map((d) => (
                              <option key={d.iataCode} value={d.iataCode}>
                                {d.city} ({d.iataCode})
                              </option>
                            ))}
                          </Select>
                        )}
                      </Stack>
                      {touched.departure && errors.departure && (
                        <FormHelperText error>
                          {errors.departure}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Arrival */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Stack gap={0.5}>
                        <Typography
                          variant="overline"
                          color="text.primary"
                          component="label"
                          htmlFor="arrival"
                        >
                          Arrival
                        </Typography>
                        {isLoading ? (
                          <Skeleton variant="rectangular" height={56} />
                        ) : (
                          <Select
                            id="arrival"
                            native
                            value={values.arrival.iataCode}
                            onChange={handleArrivalChange}
                          >
                            <option value="" style={{ display: 'none' }} />
                            {ARRIVAL_OPTIONS.map((d) => (
                              <option key={d.iataCode} value={d.iataCode}>
                                {d.city} ({d.iataCode})
                              </option>
                            ))}
                          </Select>
                        )}
                      </Stack>
                      {touched.arrival && errors.arrival && (
                        <FormHelperText error>{errors.arrival}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {/* Trip Type */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Stack gap={0.5}>
                        <Typography
                          variant="overline"
                          color="text.primary"
                          component="label"
                        >
                          Trip Type
                        </Typography>
                        {isLoading ? (
                          <Skeleton variant="rectangular" height={56} />
                        ) : (
                          <Select
                            native
                            value={trip}
                            onChange={(e) => setTrip(e.target.value)}
                          >
                            <option value="" style={{ display: 'none' }} />
                            {TRIP_TYPE.map((t) => (
                              <option key={t} value={t}>
                                {formatText(t)}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Stack>
                    </FormControl>
                  </Grid>
                  {/* Dates */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack gap={0.5}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        component="label"
                      >
                        Date
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rectangular" height={56} />
                      ) : trip === 'round' ? (
                        <DateRange
                          startDate={startDate}
                          endDate={endDate}
                          setStartDate={(date) => {
                            setStartDate(date);
                            setFieldValue('departureDate', formatDate(date));
                          }}
                          setEndDate={(date) => {
                            setEndDate(date);
                            setFieldValue('arrivalDate', formatDate(date));
                          }}
                        />
                      ) : (
                        <DatePicker
                          startDate={startDate}
                          setStartDate={(date) => {
                            setStartDate(date);
                            setFieldValue('departureDate', formatDate(date));
                          }}
                        />
                      )}
                    </Stack>
                  </Grid>
                  {/* Status */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Stack gap={0.5}>
                        <Typography
                          variant="overline"
                          color="text.primary"
                          component="label"
                        >
                          Status
                        </Typography>
                        {isLoading ? (
                          <Skeleton variant="rectangular" height={56} />
                        ) : (
                          <Select
                            native
                            {...getFieldProps('status')}
                            error={Boolean(touched.status && errors.status)}
                          >
                            <option value="" style={{ display: 'none' }} />
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Stack>
                      {touched.status && errors.status && (
                        <FormHelperText error>{errors.status}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* RIGHT COLUMN */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Stack gap={0.5}>
                  <Typography
                    variant="overline"
                    color="text.primary"
                    component="label"
                  >
                    Cover Image
                  </Typography>
                  <UploadSingleFile
                    id="cover"
                    file={values.cover}
                    onDrop={handleDrop}
                    error={Boolean(touched.cover && errors.cover)}
                    category
                    accept="image/*"
                    loading={uploadState.loading}
                  />
                </Stack>
              </CardContent>
            </Card>
            <Box mt={2}>
              {isLoading ? (
                <Skeleton variant="rectangular" height={56} />
              ) : (
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Save Route
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
