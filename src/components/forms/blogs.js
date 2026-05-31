'use client';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from '@bprogress/next';

// mui
import {
  Typography,
  Stack,
  TextField,
  Grid,
  Select,
  FormControl,
  FormHelperText,
  Card,
  CardContent,
  Button,
} from '@mui/material';

import UploadSingleFile from '../upload/upload-single-file';
// import { MdDelete } from 'react-icons/md';
// import { IoMdAdd } from 'react-icons/io';

const CATEGORY_OPTIONS = ['Hotels', 'Flights', 'Food'];
const STATUS_OPTIONS = ['active', 'inactive'];

const emptyBlog = {
  title: '',
  metatitle: '',
  slug: '',
  description: '',
  metadescription: '',
  category: '',
  // section: [{ name: '', description: '', cover: null }],
  cover: null,
  status: 'active',
};

export default function BlogForm({ currentBlog }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ loading: false, SectionLoading: false });

  const initialValues = currentBlog
    ? {
        title: currentBlog.title || '',
        metatitle: currentBlog.metatitle || '',
        slug: currentBlog.slug || '',
        description: currentBlog.description || '',
        metadescription: currentBlog.metadescription || '',
        category: currentBlog.category || CATEGORY_OPTIONS[0],
        // section:
        //   Array.isArray(currentBlog.section) && currentBlog.section.length > 0
        //     ? currentBlog.section
        //     : [{ name: '', description: '', cover: null }],
        cover: currentBlog.cover || null,
        status: currentBlog.status || 'active',
      }
    : emptyBlog;

  const ModulesSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    metatitle: Yup.string().required('Meta title is required.'),
    description: Yup.string().required('Description is required.'),
    slug: Yup.string().required('Slug is required.'),
    metadescription: Yup.string().required('Meta description is required.'),
    category: Yup.string().required('Category is required.'),
    cover: Yup.object().nullable(),
    status: Yup.string().required('Status is required.'),
    // section: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       name: Yup.string().required('Section name is required.'),
    //       description: Yup.string().required(
    //         'Section description is required.'
    //       ),
    //       cover: Yup.object().nullable(),
    //     })
    //   )
    //   .required('At least one section is required.'),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ModulesSchema,
    onSubmit: async (values) => {
      setLoading(true);

      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('blogs') || '[]');

        const duplicateSlug = existing.find((b) => {
          const isDifferentBlog =
            b.slug === values.slug && b.slug !== currentBlog?.slug;

          return isDifferentBlog;
        });

        if (duplicateSlug) {
          setLoading(false);
          toast.error(
            'A blog with this title/slug already exists. Please use a different title.'
          );
          return;
        }

        let filtered;

        if (currentBlog) {
          filtered = existing.filter((b) => {
            const isSameBlog =
              (currentBlog._id &&
                (b._id === currentBlog._id || b.id === currentBlog._id)) ||
              (currentBlog.id &&
                (b._id === currentBlog.id || b.id === currentBlog.id)) ||
              b.slug === currentBlog.slug;

            return !isSameBlog;
          });
        } else {
          filtered = existing;
        }

        const newBlog = {
          ...values,
          _id: currentBlog?._id || crypto.randomUUID(),
          id: currentBlog?.id || currentBlog?._id || crypto.randomUUID(),
          updatedAt: new Date().toISOString(),
          createdAt: currentBlog?.createdAt || new Date().toISOString(),
        };

        const updated = [...filtered, newBlog];
        localStorage.setItem('blogs', JSON.stringify(updated));

        setLoading(false);
        toast.success('Blog saved successfully!');
        router.push('/admin/blogs');
        router.refresh();
      }, 1000);
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setState({ ...state, loading: true });
    setTimeout(() => {
      setFieldValue('cover', { id: 'mock-id', url: URL.createObjectURL(file) });
      setState({ ...state, loading: false });
      toast.success('Cover image uploaded');
    }, 800);
  };

  // const handleCoverDrop = (index, acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   if (!file) return;
  //   setState({ ...state, SectionLoading: true });
  //   setTimeout(() => {
  //     setFieldValue(`section.${index}.cover`, {
  //       id: 'mock-section-id',
  //       url: URL.createObjectURL(file),
  //     });
  //     setState({ ...state, SectionLoading: false });
  //     toast.success('Section image uploaded');
  //   }, 800);
  // };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .replace(/\s+/g, '-');
    formik.setFieldValue('slug', slug);
    formik.handleChange(event);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack gap={0.5}>
                      <Typography variant="overline">Title</Typography>
                      <TextField
                        fullWidth
                        {...getFieldProps('title')}
                        onChange={handleTitleChange}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack gap={0.5}>
                      <Typography variant="overline">Meta Title</Typography>
                      <TextField
                        fullWidth
                        {...getFieldProps('metatitle')}
                        error={Boolean(touched.metatitle && errors.metatitle)}
                        helperText={touched.metatitle && errors.metatitle}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack gap={0.5}>
                      <Typography variant="overline">Slug</Typography>
                      <TextField
                        fullWidth
                        {...getFieldProps('slug')}
                        error={Boolean(touched.slug && errors.slug)}
                        helperText={touched.slug && errors.slug}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="overline">Category</Typography>
                      <Select
                        native
                        {...getFieldProps('category')}
                        error={Boolean(touched.category && errors.category)}
                      >
                        <option value="" style={{ display: 'none' }} />
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Select>
                      {touched.category && errors.category && (
                        <FormHelperText error>{errors.category}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack gap={0.5}>
                      <Typography variant="overline">
                        Meta Description
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        {...getFieldProps('metadescription')}
                        error={Boolean(
                          touched.metadescription && errors.metadescription
                        )}
                        helperText={
                          touched.metadescription && errors.metadescription
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack gap={0.5}>
                      <Typography variant="overline">Description</Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        helperText={touched.description && errors.description}
                      />
                    </Stack>
                  </Grid>
                  {/* <Grid
                    item
                    size={{ xs: 12 }}>
                    <Typography variant='h6'>Sections</Typography>
                    <FieldArray
                      name='section'
                      render={(arrayHelpers) => (
                        <div>
                          {values.section?.map((section, index) => (
                            <Grid
                              container
                              spacing={2}
                              key={index}>
                              <Grid
                                item
                                size={{ xs: 12 }}>
                                <Typography variant='overline'>Name</Typography>
                                <TextField
                                  fullWidth
                                  {...getFieldProps(`section.${index}.name`)}
                                  error={Boolean(
                                    touched.section?.[index]?.name &&
                                      errors.section?.[index]?.name
                                  )}
                                  helperText={
                                    errors.section?.[index]?.name || ''
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                size={{ xs: 12 }}>
                                <Typography variant='overline'>
                                  Description
                                </Typography>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={3}
                                  {...getFieldProps(
                                    `section.${index}.description`
                                  )}
                                  error={Boolean(
                                    touched.section?.[index]?.description &&
                                      errors.section?.[index]?.description
                                  )}
                                  helperText={
                                    errors.section?.[index]?.description || ''
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                size={{ xs: 12 }}>
                                <Typography variant='overline'>
                                  Cover Image
                                </Typography>
                                <UploadSingleFile
                                  file={section.cover || null}
                                  onDrop={(files) =>
                                    handleCoverDrop(index, files)
                                  }
                                  loading={state.SectionLoading}
                                  accept='image/*'
                                />
                              </Grid>
                              <Grid
                                item
                                size={{ xs: 12 }}>
                                <Button
                                  color='error'
                                  variant='contained'
                                  startIcon={<MdDelete />}
                                  onClick={() => arrayHelpers.remove(index)}>
                                  Delete Section
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            variant='contained'
                            startIcon={<IoMdAdd />}
                            onClick={() =>
                              arrayHelpers.push({
                                name: '',
                                description: '',
                                cover: null,
                              })
                            }>
                            Add Section
                          </Button>
                        </div>
                      )}
                    />
                  </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="overline">Cover Image</Typography>
                  <UploadSingleFile
                    file={values.cover || null}
                    onDrop={handleDrop}
                    accept="image/*"
                    loading={state.loading}
                    category
                  />
                  <FormControl
                    fullWidth
                    sx={{ select: { textTransform: 'capitalize' } }}
                  >
                    <Typography variant="overline">Status</Typography>
                    <Select
                      native
                      {...getFieldProps('status')}
                      error={Boolean(touched.status && errors.status)}
                    >
                      <option value="" style={{ display: 'none' }} />
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </Select>
                    {touched.status && errors.status && (
                      <FormHelperText error>{errors.status}</FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
              loading={loading}
            >
              Save Blog
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
