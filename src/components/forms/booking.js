'use client'; // Ensures this component runs only on the client side
import React from 'react';

// MUI Components (Material UI)
import { alpha, styled, useTheme } from '@mui/material';
import {
  Card,
  Stack,
  TextField,
  CardContent,
  Box,
  Grid,
  Button,
  Typography,
  Skeleton,
  CardHeader,
  MenuItem,
} from '@mui/material';

// Icons
// import { FaPaypal, FaStripeS } from 'react-icons/fa'; // PayPal icon
import { FaRegCircleCheck } from 'react-icons/fa6';

// Importing external JSON data (country list)
import { _countries } from '@/_mock/countries';

// Formik (form handling library)

// Custom Phone Input Component
import PhoneInput from 'src/components/phone-input';
import { capitalize } from 'lodash';
import DatePicker from 'src/components/selects/date';
import dayjs from 'dayjs';
import { paymentMethodsList } from '@/_mock/payment-methods/data';

const LabelStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default function CategoryForm({ ...props }) {
  const { formik, isLoading } = props;
  const theme = useTheme();

  const categoryLoading = false;

  const { errors, values, touched, setFieldValue, getFieldProps } = formik;
  return (
    <Box position="relative">
      <Stack gap={3}>
        <Card>
          <CardHeader title="Contact Information" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                {categoryLoading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  <LabelStyle
                    component={'label'}
                    variant="overline"
                    htmlFor="first-name"
                  >
                    First Name
                  </LabelStyle>
                )}
                {categoryLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    id="first-name"
                    fullWidth
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                )}
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                {categoryLoading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  <LabelStyle
                    component={'label'}
                    variant="overline"
                    htmlFor="last-name"
                  >
                    Last Name
                  </LabelStyle>
                )}
                {categoryLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    id="last-name"
                    fullWidth
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                )}
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                {categoryLoading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  <LabelStyle
                    component={'label'}
                    variant="overline"
                    htmlFor="meta-description"
                  >
                    Email
                  </LabelStyle>
                )}
                {categoryLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    id="meta-description"
                    fullWidth
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                {categoryLoading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  <LabelStyle
                    component={'label'}
                    variant="overline"
                    htmlFor="phone"
                  >
                    Phone
                  </LabelStyle>
                )}
                {categoryLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <PhoneInput
                    errors={errors}
                    onChange={(val) => setFieldValue('phone', val)}
                    value={values.phone}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Traveler Information" />
          <CardContent>
            <Box>
              {values.travelers.map((traveler, index) => (
                <Box key={index} mb={3}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight={600}
                    sx={{ pb: 2 }}
                  >
                    {capitalize(traveler.type)} {traveler.count}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <LabelStyle
                        component={'label'}
                        variant="overline"
                        htmlFor="first-name"
                      >
                        First Name
                      </LabelStyle>
                      <TextField
                        if="first-name"
                        fullWidth
                        {...getFieldProps(`travelers[${index}].name.firstName`)}
                        error={Boolean(
                          touched.travelers?.[index]?.name?.firstName &&
                          errors.travelers?.[index]?.name?.firstName
                        )}
                        helperText={
                          touched.travelers?.[index]?.name?.firstName &&
                          errors.travelers?.[index]?.name?.firstName
                        }
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <LabelStyle
                        component={'label'}
                        variant="overline"
                        htmlFor="last-name"
                      >
                        Last Name
                      </LabelStyle>
                      <TextField
                        id={'last-name'}
                        fullWidth
                        {...getFieldProps(`travelers[${index}].name.lastName`)}
                        error={Boolean(
                          touched.travelers?.[index]?.name?.lastName &&
                          errors.travelers?.[index]?.name?.lastName
                        )}
                        helperText={
                          touched.travelers?.[index]?.name?.lastName &&
                          errors.travelers?.[index]?.name?.lastName
                        }
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <LabelStyle
                        component={'label'}
                        variant="overline"
                        htmlFor="dob"
                      >
                        Date of Birth
                      </LabelStyle>

                      <DatePicker
                        setStartDate={(val) => {
                          setFieldValue(
                            `travelers[${index}].dateOfBirth`,
                            val.toDate()
                          );
                        }}
                        startDate={dayjs(values.travelers[index].dateOfBirth)}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <LabelStyle
                        component={'label'}
                        variant="overline"
                        htmlFor="gender"
                      >
                        Gender
                      </LabelStyle>
                      <TextField
                        id="gender"
                        select
                        fullWidth
                        {...getFieldProps(`travelers[${index}].gender`)}
                        error={Boolean(
                          touched.travelers?.[index]?.gender &&
                          errors.travelers?.[index]?.gender
                        )}
                        helperText={
                          touched.travelers?.[index]?.gender &&
                          errors.travelers?.[index]?.gender
                        }
                      >
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMAIL">Female</MenuItem>
                      </TextField>
                    </Grid>
                    {traveler.documents.map((document, docIndex) => (
                      <React.Fragment key={100 + docIndex}>
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <LabelStyle
                            component={'label'}
                            variant="overline"
                            htmlFor="doc-type"
                          >
                            Document Type
                          </LabelStyle>
                          <TextField
                            id="doc-type"
                            fullWidth
                            {...getFieldProps(
                              `travelers[${index}].documents[${docIndex}].documentType`
                            )}
                            error={Boolean(
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.documentType &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.documentType
                            )}
                            inputProps={{
                              readOnly: true,
                            }}
                            helperText={
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.documentType &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.documentType
                            }
                          />
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <LabelStyle
                            component={'label'}
                            variant="overline"
                            htmlFor="nationality"
                          >
                            Nationality
                          </LabelStyle>

                          <TextField
                            id="nationality"
                            select
                            fullWidth
                            placeholder="Country"
                            {...getFieldProps(
                              `travelers[${index}].documents[${docIndex}].nationality`
                            )}
                            SelectProps={{ native: true }}
                            error={Boolean(
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.nationality &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.nationality
                            )}
                            helperText={
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.nationality &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.nationality
                            }
                          >
                            {_countries.map((option) => (
                              <option
                                key={option.alpha3 + 'nationality'}
                                value={option.alpha3}
                              >
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <LabelStyle
                            component={'label'}
                            variant="overline"
                            htmlFor="issuance-country"
                          >
                            Issuance Country
                          </LabelStyle>

                          <TextField
                            id="issuance-country"
                            select
                            fullWidth
                            placeholder="Country"
                            {...getFieldProps(
                              `travelers[${index}].documents[${docIndex}].issuanceCountry`
                            )}
                            SelectProps={{ native: true }}
                            error={Boolean(
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.issuanceCountry &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.issuanceCountry
                            )}
                            helperText={
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.issuanceCountry &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.issuanceCountry
                            }
                          >
                            {_countries.map((option) => (
                              <option
                                key={option.alpha3 + 'country'}
                                value={option.alpha3}
                              >
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <LabelStyle
                            component={'label'}
                            variant="overline"
                            htmlFor="p-n"
                          >
                            Passport Number
                          </LabelStyle>
                          <TextField
                            id="p-n"
                            fullWidth
                            {...getFieldProps(
                              `travelers[${index}].documents[${docIndex}].number`
                            )}
                            error={Boolean(
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.number &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.number
                            )}
                            helperText={
                              touched.travelers?.[index]?.documents?.[docIndex]
                                ?.number &&
                              errors.travelers?.[index]?.documents?.[docIndex]
                                ?.number
                            }
                          />
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <LabelStyle
                            component={'label'}
                            variant="overline"
                            htmlFor="expiry"
                          >
                            Expiry Date
                          </LabelStyle>
                          <DatePicker
                            setStartDate={(val) => {
                              setFieldValue(
                                `travelers[${index}].documents[${docIndex}].expiryDate`,
                                val.toDate()
                              );
                            }}
                            startDate={dayjs(
                              values.travelers[index].expiryDate
                            )}
                          />
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title="Payment Method"
            subheader="Choose how you want to pay"
          />

          <CardContent>
            <Grid container spacing={2}>
              {paymentMethodsList.map((method) => {
                const isActive = values.paymentMethod === method.key;

                return (
                  <Grid size={{ xs: 12, md: 6 }} key={method.key}>
                    <Box
                      onClick={() => setFieldValue('paymentMethod', method.key)}
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: isActive ? 'primary.main' : 'divider',
                        p: 2.5,
                        transition: 'all 0.25s ease',
                        backgroundColor: isActive
                          ? alpha(theme.palette.primary.light, 0.05)
                          : 'background.paper',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 3,
                        },
                      }}
                    >
                      {isActive && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 8,
                          }}
                        >
                          <FaRegCircleCheck
                            color={theme.palette.primary.main}
                          />
                        </Box>
                      )}
                      <Stack direction="row" spacing={2} alignItems="center">
                        {/* Icon */}
                        <Box
                          sx={{
                            color: method.color,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {method.icon}
                        </Box>

                        {/* Text */}
                        <Box flexGrow={1}>
                          <Typography fontSize={16} fontWeight={600}>
                            {method.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {method.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader title="Payment Methods" />
          <CardContent>
            <Grid container spacing={2}>
              {paymentMethodsList.map((gateway) => (
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                  key={gateway}
                >
                  <Button
                    variant={
                      values.paymentMethod === gateway
                        ? 'contained'
                        : 'outlined'
                    }
                    color={
                      values.paymentMethod === gateway ? 'primary' : 'inherit'
                    }
                    size="large"
                    fullWidth
                    startIcon={
                      gateway === 'Paypal' ? <FaPaypal /> : <FaStripeS />
                    }
                    onClick={() => setFieldValue('paymentMethod', gateway)}
                    sx={{
                      height: 80,
                      flexDirection: 'column',
                      alignItems: 'center',
                      fontSize: 16,
                      span: {
                        marginLeft: 0,
                        marginRight: 0,
                      },
                    }}
                  >
                    {gateway || ''}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card> */}
        <Button
          type="submit"
          size="large"
          variant="contained"
          loading={isLoading}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
