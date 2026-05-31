'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Container,
  Card,
  Skeleton,
  Avatar,
} from '@mui/material';
import MyAvatar from 'src/components/my-avatar';
import PropTypes from 'prop-types';

const RootStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: 280,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 0,
  borderBottomWidth: 1,
  backgroundColor: theme.palette.primary.main,
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const CoverImgStyle = styled('div')({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function ProfileCover({ data: user, isLoading }) {
  return (
    <RootStyle>
      <Container fixed>
        <InfoStyle>
          {/* Avatar */}
          {isLoading ? (
            <Skeleton
              variant='circular'
              width={128}
              height={128}
            />
          ) : user?.cover?.url ? (
            <MyAvatar
              data={{
                cover: user.cover.url,
                fullName: `${user.firstName || ''} ${
                  user.lastName || ''
                }`.trim(),
              }}
              sx={{
                mx: 'auto',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'common.white',
                width: { xs: 80, md: 128 },
                height: { xs: 80, md: 128 },
              }}
            />
          ) : (
            <Avatar
              sx={{
                mx: 'auto',
                width: { xs: 80, md: 128 },
                height: { xs: 80, md: 128 },
                fontSize: { xs: 32, md: 48 },
              }}>
              {user?.firstName?.charAt(0).toUpperCase() || '?'}
            </Avatar>
          )}

          {/* Name and email */}
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
            }}>
            <Typography variant='h4'>
              {isLoading ? (
                <Skeleton
                  variant='text'
                  width={220}
                />
              ) : user?.firstName || user?.lastName ? (
                `${user.firstName || ''} ${user.lastName || ''}`.trim()
              ) : (
                '—'
              )}
            </Typography>
            <Typography sx={{ opacity: 0.72 }}>
              {isLoading ? (
                <Skeleton
                  variant='text'
                  width={220}
                />
              ) : (
                user?.email || '—'
              )}
            </Typography>
          </Box>
        </InfoStyle>

        <CoverImgStyle />
      </Container>
    </RootStyle>
  );
}

ProfileCover.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};
