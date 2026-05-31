'use client';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// mui
import {
  Typography,
  Stack,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Select,
  Chip,
  Autocomplete,
  Button,
} from '@mui/material';
import UploadSingleFile from '../upload/upload-single-file';
import toast from 'react-hot-toast';

// Default options
const Website_multiLanguage = [
  { label: 'Disabled', value: false },
  { label: 'Enabled', value: true },
];

const Website_multiCurrency = [
  { label: 'Disabled', value: false },
  { label: 'Enabled', value: true },
];

const Website_Offline = [
  { label: 'Disabled', value: false },
  { label: 'Enabled', value: true },
];

// localStorage key
const STORAGE_KEY = 'themeSettings';

export default function ThemeSettingForm(props) {
  const { currentSetting } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    logoDarkLoading: false,
    logoLightLoading: false,
    faviconLoading: false,
    loading: false,
  });

  // Load settings from localStorage or use currentSetting
  const getInitialSettings = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored settings:', e);
        }
      }
    }
    return currentSetting;
  };

  const ThemeSettingFormSchema = Yup.object().shape({
    mainSettings: Yup.object().shape({
      businessName: Yup.string().required('Business Name is required'),
      domainName: Yup.string().required('Domain Name is required'),
      licenceKey: Yup.string().required('Licence Key is required'),
      websiteStatus: Yup.boolean().required('Website Status is required'),
      offlineMessage: Yup.string().required('Offline Message is required'),
      seo: Yup.object().shape({
        metaTitle: Yup.string().required('Meta Title is required'),
        description: Yup.string().required('Description is required'),
        metaDescription: Yup.string().required('Meta Description is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
      }),
      theme: Yup.object().shape({
        palette: Yup.object().shape({
          primary: Yup.string().required('Primary color is required'),
          secondary: Yup.string().required('Secondary color is required'),
          defaultDark: Yup.string().required('Default Dark color is required'),
          defaultLight: Yup.string().required(
            'Default Light color is required'
          ),
          paperDark: Yup.string().required('Paper Dark color is required'),
          paperLight: Yup.string().required('Paper Light color is required'),
        }),
        themeName: Yup.string().required('Theme Name is required'),
        logoDark: Yup.object().shape({
          url: Yup.string().required('Dark logo URL is required'),
        }),
        logoLight: Yup.object().shape({
          url: Yup.string().required('Light logo URL is required'),
        }),
        favicon: Yup.object().shape({
          url: Yup.string().required('favicon URL is required'),
        }),
      }),
    }),
    contact: Yup.object().shape({
      address: Yup.string().required('Address is required'),
      addressOnMap: Yup.string().required('Address on Map is required'),
      lat: Yup.string().required('Latitude is required'),
      long: Yup.string().required('Longitude is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      whatsappNo: Yup.string().required('Whatsapp Number is required'),
    }),
    socialLinks: Yup.object().shape({
      facebook: Yup.string().required('Facebook link is required'),
      twitter: Yup.string().required('Twitter link is required'),
      linkedin: Yup.string().required('LinkedIn link is required'),
      instagram: Yup.string().required('Instagram link is required'),
      whatsapp: Yup.string().required('WhatsApp link is required'),
    }),
    systemSettings: Yup.object().shape({
      gaId: Yup.string().required('GA Id is required'),
      gtmId: Yup.string().required('GTM Id is required'),
    }),
    languageAndCurrencies: Yup.object().shape({
      multiLanguage: Yup.boolean().required(
        'Multi Language setting is required'
      ),
      multiCurrency: Yup.boolean().required(
        'Multi Currency setting is required'
      ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      mainSettings: {
        businessName: '',
        domainName: '',
        licenceKey: '',
        websiteStatus: false,
        offlineMessage: '',
        seo: {
          metaTitle: '',
          description: '',
          metaDescription: '',
          tags: [],
        },
        theme: {
          palette: {
            primary: '#7E6767',
            secondary: '#7E6767',
            defaultDark: '#7E6767',
            defaultLight: '#7E6767',
            paperDark: '#7E6767',
            paperLight: '#7E6767',
          },
          themeName: 'default',
          logoDark: null,
          logoLight: null,
          favicon: null,
        },
      },
      contact: {
        address: '',
        addressOnMap: '',
        lat: '',
        long: '',
        email: '',
        phone: '',
        whatsappNo: '',
      },
      socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        whatsapp: '',
      },
      systemSettings: {
        gaId: '',
        gtmId: '',
      },
      languageAndCurrencies: {
        multiLanguage: false,
        multiCurrency: false,
      },
    },
    validationSchema: ThemeSettingFormSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));

        setTimeout(() => {
          toast.success('Theme Updated successfully!');
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save settings');
        setLoading(false);
      }
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
  } = formik;

  // Load initial data
  useEffect(() => {
    const settings = getInitialSettings();
    if (settings) {
      setValues({
        mainSettings: {
          businessName: settings.mainSettings?.businessName || '',
          domainName: settings.mainSettings?.domainName || '',
          licenceKey: settings.mainSettings?.licenceKey || '',
          websiteStatus: settings.mainSettings?.websiteStatus ?? false,
          offlineMessage: settings.mainSettings?.offlineMessage || '',
          seo: {
            metaTitle: settings.mainSettings?.seo?.metaTitle || '',
            description: settings.mainSettings?.seo?.description || '',
            metaDescription: settings.mainSettings?.seo?.metaDescription || '',
            tags: settings.mainSettings?.seo?.tags || [],
          },
          theme: {
            palette: {
              primary:
                settings.mainSettings?.theme?.palette?.primary || '#7E6767',
              secondary:
                settings.mainSettings?.theme?.palette?.secondary || '#7E6767',
              defaultDark:
                settings.mainSettings?.theme?.palette?.defaultDark || '#7E6767',
              defaultLight:
                settings.mainSettings?.theme?.palette?.defaultLight ||
                '#7E6767',
              paperDark:
                settings.mainSettings?.theme?.palette?.paperDark || '#7E6767',
              paperLight:
                settings.mainSettings?.theme?.palette?.paperLight || '#7E6767',
            },
            themeName: settings.mainSettings?.theme?.themeName || 'default',
            logoDark: settings.mainSettings?.theme?.logoDark || null,
            logoLight: settings.mainSettings?.theme?.logoLight || null,
            favicon: settings.mainSettings?.theme?.favicon || null,
          },
        },
        contact: {
          address: settings.contact?.address || '',
          addressOnMap: settings.contact?.addressOnMap || '',
          lat: settings.contact?.lat || '',
          long: settings.contact?.long || '',
          email: settings.contact?.email || '',
          phone: settings.contact?.phone || '',
          whatsappNo: settings.contact?.whatsappNo || '',
        },
        socialLinks: {
          facebook: settings.socialLinks?.facebook || '',
          twitter: settings.socialLinks?.twitter || '',
          linkedin: settings.socialLinks?.linkedin || '',
          instagram: settings.socialLinks?.instagram || '',
          whatsapp: settings.socialLinks?.whatsapp || '',
        },
        systemSettings: {
          gaId: settings.systemSettings?.gaId || '',
          gtmId: settings.systemSettings?.gtmId || '',
        },
        languageAndCurrencies: {
          multiLanguage: settings.languageAndCurrencies?.multiLanguage ?? false,
          multiCurrency: settings.languageAndCurrencies?.multiCurrency ?? false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSetting, setValues]);

  // Handle drop logo dark
  const handleDropLogoDark = async (acceptedFiles) => {
    setState({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }

    // Simulate upload
    const uploadProgress = setInterval(() => {
      setState((prev) => {
        const newProgress = prev.logoDarkLoading + 20;
        if (newProgress >= 100) {
          clearInterval(uploadProgress);
          setFieldValue('mainSettings.theme.logoDark', {
            _id: `logo-dark-${Date.now()}`,
            url: file.preview,
          });
          return { ...prev, logoDarkLoading: 0, loading: false };
        }
        return { ...prev, logoDarkLoading: newProgress };
      });
    }, 200);
  };

  // Handle drop logo light
  const handleDropLogoLight = async (acceptedFiles) => {
    setState({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }

    // Simulate upload
    const uploadProgress = setInterval(() => {
      setState((prev) => {
        const newProgress = prev.logoLightLoading + 20;
        if (newProgress >= 100) {
          clearInterval(uploadProgress);
          setFieldValue('mainSettings.theme.logoLight', {
            _id: `logo-light-${Date.now()}`,
            url: file.preview,
          });
          return { ...prev, logoLightLoading: 0, loading: false };
        }
        return { ...prev, logoLightLoading: newProgress };
      });
    }, 200);
  };

  // Handle drop favicon
  const handleDropLogoFavicon = async (acceptedFiles) => {
    setState({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }

    // Simulate upload
    const uploadProgress = setInterval(() => {
      setState((prev) => {
        const newProgress = prev.faviconLoading + 20;
        if (newProgress >= 100) {
          clearInterval(uploadProgress);
          setFieldValue('mainSettings.theme.favicon', {
            _id: `favicon-${Date.now()}`,
            url: file.preview,
          });
          return { ...prev, faviconLoading: 0, loading: false };
        }
        return { ...prev, faviconLoading: newProgress };
      });
    }, 200);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 8, xs: 12 }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Main Setting</Typography>
                  <Typography variant="body1">
                    Application name and tags
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="businessName"
                        component={'label'}
                      >
                        Business Name
                      </Typography>
                      <TextField
                        id="businessName"
                        fullWidth
                        type="text"
                        {...getFieldProps('mainSettings.businessName')}
                        error={Boolean(
                          touched.mainSettings?.businessName &&
                            errors.mainSettings?.businessName
                        )}
                        helperText={
                          touched.mainSettings?.businessName &&
                          errors.mainSettings?.businessName
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="domainName"
                        component={'label'}
                      >
                        Domain Name
                      </Typography>
                      <TextField
                        id="domainName"
                        fullWidth
                        type="text"
                        {...getFieldProps('mainSettings.domainName')}
                        error={Boolean(
                          touched.mainSettings?.domainName &&
                            errors.mainSettings?.domainName
                        )}
                        helperText={
                          touched.mainSettings?.domainName &&
                          errors.mainSettings?.domainName
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="licenceKey"
                        component={'label'}
                      >
                        Licence Key
                      </Typography>
                      <TextField
                        id="licenceKey"
                        fullWidth
                        autoComplete="licenceKey"
                        type="text"
                        {...getFieldProps('mainSettings.licenceKey')}
                        error={Boolean(
                          touched.mainSettings?.licenceKey &&
                            errors.mainSettings?.licenceKey
                        )}
                        helperText={
                          touched.mainSettings?.licenceKey &&
                          errors.mainSettings?.licenceKey
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <FormControl
                      fullWidth
                      sx={{ select: { textTransform: 'capitalize' } }}
                    >
                      <Stack gap={0.5} width={1}>
                        <Typography
                          variant="overline"
                          color="text.primary"
                          htmlFor="websiteStatus"
                          component={'label'}
                        >
                          Website Offline
                        </Typography>

                        <Select
                          id="websiteStatus"
                          native
                          value={values.mainSettings?.websiteStatus}
                          onChange={(e) => {
                            const val = e.target.value === 'true';
                            setFieldValue('mainSettings.websiteStatus', val);
                          }}
                          error={Boolean(
                            touched.mainSettings?.websiteStatus &&
                              errors.mainSettings?.websiteStatus
                          )}
                        >
                          <option value="" style={{ display: 'none' }} />
                          {Website_Offline.map((websiteStatus, index) => (
                            <option
                              key={`website-offline-${index}`}
                              value={websiteStatus.value}
                            >
                              {websiteStatus.label}
                            </option>
                          ))}
                        </Select>
                      </Stack>

                      {touched.mainSettings?.websiteStatus &&
                        errors.mainSettings?.websiteStatus && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.mainSettings?.websiteStatus &&
                              errors.mainSettings?.websiteStatus}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="title"
                        component={'label'}
                      >
                        Meta Title
                      </Typography>
                      <TextField
                        id="title"
                        fullWidth
                        autoComplete="username"
                        type="text"
                        {...formik.getFieldProps('mainSettings.seo.metaTitle')}
                        error={Boolean(
                          formik.touched.mainSettings?.seo?.metaTitle &&
                            formik.errors.mainSettings?.seo?.metaTitle
                        )}
                        helperText={
                          formik.touched.mainSettings?.seo?.metaTitle &&
                          formik.errors.mainSettings?.seo?.metaTitle
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="tags"
                        component={'label'}
                      >
                        Meta Tags
                      </Typography>
                      <Autocomplete
                        id="tags"
                        multiple
                        freeSolo
                        value={values.mainSettings?.seo?.tags}
                        onChange={(event, newValue) => {
                          setFieldValue('mainSettings.seo.tags', newValue);
                        }}
                        options={[]}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={index}
                              size="small"
                              label={option}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              touched.mainSettings?.seo?.tags &&
                                errors.mainSettings?.seo?.tags
                            )}
                            helperText={
                              touched.mainSettings?.seo?.tags &&
                              errors.mainSettings?.seo?.tags
                            }
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="meta-description"
                        component={'label'}
                      >
                        Meta Description
                      </Typography>
                      <TextField
                        id="meta-description"
                        fullWidth
                        {...getFieldProps('mainSettings.seo.metaDescription')}
                        error={Boolean(
                          touched.mainSettings?.seo?.metaDescription &&
                            errors.mainSettings?.seo?.metaDescription
                        )}
                        helperText={
                          touched.mainSettings?.seo?.metaDescription &&
                          errors.mainSettings?.seo?.metaDescription
                        }
                        rows={5}
                        multiline
                      />
                    </Stack>
                  </Grid>

                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="offlineMessage"
                        component={'label'}
                      >
                        Offline Message
                      </Typography>
                      <TextField
                        id="offlineMessage"
                        fullWidth
                        {...getFieldProps('mainSettings.offlineMessage')}
                        error={Boolean(
                          touched.mainSettings?.offlineMessage &&
                            errors.mainSettings?.offlineMessage
                        )}
                        helperText={
                          touched.mainSettings?.offlineMessage &&
                          errors.mainSettings?.offlineMessage
                        }
                        rows={5}
                        multiline
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 12, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="description"
                        component={'label'}
                      >
                        Description
                      </Typography>
                      <TextField
                        id="description"
                        fullWidth
                        {...getFieldProps('mainSettings.seo.description')}
                        error={Boolean(
                          touched.mainSettings?.seo?.description &&
                            errors.mainSettings?.seo?.description
                        )}
                        helperText={
                          touched.mainSettings?.seo?.description &&
                          errors.mainSettings?.seo?.description
                        }
                        rows={7}
                        multiline
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Website Theme</Typography>
                  <Typography variant="body1">Select Color Theme</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="themeName"
                        component={'label'}
                      >
                        Theme Name
                      </Typography>
                      <TextField
                        id="themeName"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        type="text"
                        {...getFieldProps('mainSettings.theme.themeName')}
                        error={Boolean(
                          touched.mainSettings?.theme?.themeName &&
                            errors.mainSettings?.theme?.themeName
                        )}
                        helperText={
                          touched.mainSettings?.theme?.themeName &&
                          errors.mainSettings?.theme?.themeName
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="primary"
                        component={'label'}
                      >
                        Primary Color
                      </Typography>
                      <TextField
                        id="primary"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.primary')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.primary &&
                            errors.mainSettings?.theme?.palette?.primary
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.primary &&
                          errors.mainSettings?.theme?.palette?.primary
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="secondary"
                        component={'label'}
                      >
                        Secondary Color
                      </Typography>
                      <TextField
                        id="secondary"
                        fullWidth
                        type="color"
                        {...getFieldProps(
                          'mainSettings.theme.palette.secondary'
                        )}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.secondary &&
                            errors.mainSettings?.theme?.palette?.secondary
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.secondary &&
                          errors.mainSettings?.theme?.palette?.secondary
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="defaultDark"
                        component={'label'}
                      >
                        Dark Background
                      </Typography>
                      <TextField
                        id="defaultDark"
                        fullWidth
                        type="color"
                        {...getFieldProps(
                          'mainSettings.theme.palette.defaultDark'
                        )}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.defaultDark &&
                            errors.mainSettings?.theme?.palette?.defaultDark
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.defaultDark &&
                          errors.mainSettings?.theme?.palette?.defaultDark
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="defaultLight"
                        component={'label'}
                      >
                        Light Background
                      </Typography>
                      <TextField
                        id="defaultLight"
                        fullWidth
                        type="color"
                        {...getFieldProps(
                          'mainSettings.theme.palette.defaultLight'
                        )}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.defaultLight &&
                            errors.mainSettings?.theme?.palette?.defaultLight
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.defaultLight &&
                          errors.mainSettings?.theme?.palette?.defaultLight
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="paperDark"
                        component={'label'}
                      >
                        Dark Paper
                      </Typography>
                      <TextField
                        id="paperDark"
                        fullWidth
                        type="color"
                        {...getFieldProps(
                          'mainSettings.theme.palette.paperDark'
                        )}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.paperDark &&
                            errors.mainSettings?.theme?.palette?.paperDark
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.paperDark &&
                          errors.mainSettings?.theme?.palette?.paperDark
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="paperLight"
                        component={'label'}
                      >
                        Light Paper
                      </Typography>
                      <TextField
                        id="paperLight"
                        fullWidth
                        type="color"
                        {...getFieldProps(
                          'mainSettings.theme.palette.paperLight'
                        )}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.paperLight &&
                            errors.mainSettings?.theme?.palette?.paperLight
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.paperLight &&
                          errors.mainSettings?.theme?.palette?.paperLight
                        }
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">System Settings</Typography>
                  <Typography variant="body1">
                    System settings and configurations
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="gaId"
                        component={'label'}
                      >
                        GA ID
                      </Typography>
                      <TextField
                        id="gaId"
                        fullWidth
                        {...getFieldProps('systemSettings.gaId')}
                        error={Boolean(
                          touched.systemSettings?.gaId &&
                            errors.systemSettings?.gaId
                        )}
                        helperText={
                          touched.systemSettings?.gaId &&
                          errors.systemSettings?.gaId
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="gtmId"
                        component={'label'}
                      >
                        GTM ID
                      </Typography>
                      <TextField
                        id="gtmId"
                        fullWidth
                        {...getFieldProps('systemSettings.gtmId')}
                        error={Boolean(
                          touched.systemSettings?.gtmId &&
                            errors.systemSettings?.gtmId
                        )}
                        helperText={
                          touched.systemSettings?.gtmId &&
                          errors.systemSettings?.gtmId
                        }
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Contact</Typography>
                  <Typography variant="body1">Contact Details</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={{ md: 12, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="address"
                        component={'label'}
                      >
                        Address
                      </Typography>
                      <TextField
                        id="address"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.address')}
                        error={Boolean(
                          touched.contact?.address && errors.contact?.address
                        )}
                        helperText={
                          touched.contact?.address && errors.contact?.address
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="addressOnMap"
                        component={'label'}
                      >
                        Address Map
                      </Typography>
                      <TextField
                        id="addressOnMap"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.addressOnMap')}
                        error={Boolean(
                          touched.contact?.addressOnMap &&
                            errors.contact?.addressOnMap
                        )}
                        helperText={
                          touched.contact?.addressOnMap &&
                          errors.contact?.addressOnMap
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="lat"
                        component={'label'}
                      >
                        Latitude
                      </Typography>
                      <TextField
                        id="lat"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.lat')}
                        error={Boolean(
                          touched.contact?.lat && errors.contact?.lat
                        )}
                        helperText={touched.contact?.lat && errors.contact?.lat}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="long"
                        component={'label'}
                      >
                        Longitude
                      </Typography>
                      <TextField
                        id="long"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.long')}
                        error={Boolean(
                          touched.contact?.long && errors.contact?.long
                        )}
                        helperText={
                          touched.contact?.long && errors.contact?.long
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="email"
                        component={'label'}
                      >
                        Email
                      </Typography>
                      <TextField
                        id="email"
                        fullWidth
                        type="email"
                        {...getFieldProps('contact.email')}
                        error={Boolean(
                          touched.contact?.email && errors.contact?.email
                        )}
                        helperText={
                          touched.contact?.email && errors.contact?.email
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="phone"
                        component={'label'}
                      >
                        Phone
                      </Typography>
                      <TextField
                        id="phone"
                        fullWidth
                        type="phone"
                        {...getFieldProps('contact.phone')}
                        error={Boolean(
                          touched.contact?.phone && errors.contact?.phone
                        )}
                        helperText={
                          touched.contact?.phone && errors.contact?.phone
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="whatsappNo"
                        component={'label'}
                      >
                        Whatsapp No
                      </Typography>
                      <TextField
                        id="whatsappNo"
                        fullWidth
                        type="whatsappNo"
                        {...getFieldProps('contact.whatsappNo')}
                        error={Boolean(
                          touched.contact?.whatsappNo &&
                            errors.contact?.whatsappNo
                        )}
                        helperText={
                          touched.contact?.whatsappNo &&
                          errors.contact?.whatsappNo
                        }
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Branding</Typography>
                  <Typography variant="body1">
                    Business logo and favicon.
                  </Typography>
                </Stack>
                <Stack gap={3} width={1}>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="fileLogoDark"
                      component={'label'}
                    >
                      Business Logo Dark
                    </Typography>
                    <UploadSingleFile
                      id="fileLogoDark"
                      file={values.mainSettings?.theme?.logoDark}
                      onDrop={handleDropLogoDark}
                      error={Boolean(
                        touched.mainSettings?.theme?.logoDark &&
                          errors.mainSettings?.theme?.logoDark
                      )}
                      category
                      accept="image/*"
                      loading={state.logoDarkLoading}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="fileLogoLight"
                      component={'label'}
                    >
                      Business Logo Light
                    </Typography>
                    <UploadSingleFile
                      id="fileLogoLight"
                      file={values.mainSettings?.theme?.logoLight}
                      onDrop={handleDropLogoLight}
                      error={Boolean(
                        touched.mainSettings?.theme?.logoLight &&
                          errors.mainSettings?.theme?.logoLight
                      )}
                      category
                      accept="image/*"
                      loading={state.logoLightLoading}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="fileFavico"
                      component={'label'}
                    >
                      Favicon Logo
                    </Typography>
                    <UploadSingleFile
                      id="fileFavico"
                      file={values.mainSettings?.theme?.favicon}
                      onDrop={handleDropLogoFavicon}
                      error={Boolean(
                        touched.mainSettings?.theme?.favicon &&
                          errors.mainSettings?.theme?.favicon
                      )}
                      category
                      accept="image/*"
                      loading={state.faviconLoading}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Language & Currencies</Typography>
                  <Typography variant="body1">
                    Configure default settings
                  </Typography>
                </Stack>
                <FormControl
                  fullWidth
                  sx={{ mb: 2, select: { textTransform: 'capitalize' } }}
                >
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="multiLanguage"
                      component={'label'}
                    >
                      Multi Language
                    </Typography>

                    <Select
                      id="multiLanguage"
                      native
                      value={values.languageAndCurrencies?.multiLanguage}
                      error={Boolean(
                        touched.languageAndCurrencies?.multiLanguage &&
                          errors.languageAndCurrencies?.multiLanguage
                      )}
                      onChange={(event) => {
                        const selectedValue = event.target.value === 'true';
                        formik.setFieldValue(
                          'languageAndCurrencies.multiLanguage',
                          selectedValue
                        );
                      }}
                    >
                      <option value="" style={{ display: 'none' }} />
                      {Website_multiLanguage.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Stack>

                  {touched.languageAndCurrencies?.multiLanguage &&
                    errors.languageAndCurrencies?.multiLanguage && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.languageAndCurrencies?.multiLanguage &&
                          errors.languageAndCurrencies?.multiLanguage}
                      </FormHelperText>
                    )}
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ select: { textTransform: 'capitalize' } }}
                >
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="multiCurrency"
                      component={'label'}
                    >
                      Multi Currency
                    </Typography>

                    <Select
                      id="multiCurrency"
                      native
                      value={values.languageAndCurrencies?.multiCurrency}
                      error={Boolean(
                        touched.languageAndCurrencies?.multiCurrency &&
                          errors.languageAndCurrencies?.multiCurrency
                      )}
                      onChange={(event) => {
                        const selectedValue = event.target.value === 'true';
                        formik.setFieldValue(
                          'languageAndCurrencies.multiCurrency',
                          selectedValue
                        );
                      }}
                    >
                      <option value="" style={{ display: 'none' }} />
                      {Website_multiCurrency.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Stack>

                  {touched.languageAndCurrencies?.multiCurrency &&
                    errors.languageAndCurrencies?.multiCurrency && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.languageAndCurrencies?.multiCurrency &&
                          errors.languageAndCurrencies?.multiCurrency}
                      </FormHelperText>
                    )}
                </FormControl>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Social Links</Typography>
                  <Typography variant="body1">
                    Social media pages links
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="facebook"
                      component={'label'}
                    >
                      Facebook
                    </Typography>
                    <TextField
                      id="facebook"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.facebook')}
                      error={Boolean(
                        touched.socialLinks?.facebook &&
                          errors.socialLinks?.facebook
                      )}
                      helperText={
                        touched.socialLinks?.facebook &&
                        errors.socialLinks?.facebook
                      }
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="twitter"
                      component={'label'}
                    >
                      Twitter
                    </Typography>
                    <TextField
                      id="twitter"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.twitter')}
                      error={Boolean(
                        touched.socialLinks?.twitter &&
                          errors.socialLinks?.twitter
                      )}
                      helperText={
                        touched.socialLinks?.twitter &&
                        errors.socialLinks?.twitter
                      }
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="linkedin"
                      component={'label'}
                    >
                      Linkedin
                    </Typography>
                    <TextField
                      id="linkedin"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.linkedin')}
                      error={Boolean(
                        touched.socialLinks?.linkedin &&
                          errors.socialLinks?.linkedin
                      )}
                      helperText={
                        touched.socialLinks?.linkedin &&
                        errors.socialLinks?.linkedin
                      }
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="instagram"
                      component={'label'}
                    >
                      Instagram
                    </Typography>
                    <TextField
                      id="instagram"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.instagram')}
                      error={Boolean(
                        touched.socialLinks?.instagram &&
                          errors.socialLinks?.instagram
                      )}
                      helperText={
                        touched.socialLinks?.instagram &&
                        errors.socialLinks?.instagram
                      }
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography
                      variant="overline"
                      color="text.primary"
                      htmlFor="whatsapp"
                      component={'label'}
                    >
                      Whatsapp
                    </Typography>
                    <TextField
                      id="whatsapp"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.whatsapp')}
                      error={Boolean(
                        touched.socialLinks?.whatsapp &&
                          errors.socialLinks?.whatsapp
                      )}
                      helperText={
                        touched.socialLinks?.whatsapp &&
                        errors.socialLinks?.whatsapp
                      }
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Save Settings
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
