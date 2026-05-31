'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import BlogCard from 'src/components/cards/blog';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import PaginationRounded from 'src/components/pagination';
import { NoDataFound } from '@/components/noDataFound';
import { _blogs } from 'src/_mock/blogs';

const sampleBlogs = _blogs;

const categories = ['all', 'hotels', 'travel', 'food'];

export default function Blogs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') || 'all';
  const [state, setState] = useState(category);
  const [filteredBlogs, setFilteredBlogs] = useState(sampleBlogs);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (value) => {
    setState(value);
    router.push(`${pathname}?${createQueryString('category', value)}`);
  };

  useEffect(() => {
    if (state === 'all') {
      setFilteredBlogs(sampleBlogs);
    } else {
      setFilteredBlogs(sampleBlogs.filter((b) => b.category === state));
    }
  }, [state]);

  return (
    <Box>
      <Box my={{ xs: 4, md: 8 }}>
        <Container>
          <Stack alignItems="center" spacing={2} mb={6}>
            <Typography variant="h3">Blog Categories</Typography>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={state === cat ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleChange(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </Stack>
          </Stack>

          {filteredBlogs.length < 1 ? (
            <NoDataFound />
          ) : (
            <>
              <Grid container spacing={2}>
                {filteredBlogs.map((item) => (
                  <Grid key={item.id} item size={{ xs: 12, md: 4 }}>
                    <BlogCard item={item} />
                  </Grid>
                ))}
              </Grid>

              <Stack alignItems="center" mt={4}>
                <PaginationRounded />
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
