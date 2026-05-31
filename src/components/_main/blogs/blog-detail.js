'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Container,
  Chip,
  Typography,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import { _blogs } from '@/_mock/blogs';

const sampleBlogs = _blogs;

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = sampleBlogs.find((b) => b.slug === slug);

  if (!blog)
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" textAlign={'center'}>
          Blog not found{' '}
        </Typography>
      </Container>
    );

  return (
    <Container>
      <Card sx={{ my: 8 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Chip label={blog.category} />
            </Box>

            <Typography gutterBottom variant="h3" component="div">
              {blog.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Date: {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>

            <Box
              sx={{
                position: 'relative',
                height: 500,
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {blog.cover?.url && (
                <Image
                  src={blog.cover.url}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              )}
            </Box>

            <Typography
              variant="body1"
              color="text.primary"
              dangerouslySetInnerHTML={{
                __html: blog.description,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
