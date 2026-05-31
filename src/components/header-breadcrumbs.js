'use client';

import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Link,
  Button,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
import { isString } from 'lodash';
import { MBreadcrumbs } from './@material-extend';
import { createGradient } from 'src/theme/palette';

export default function HeaderBreadcrumbs(props) {
  const {
    links = [],
    action,
    icon,
    heading = '',
    moreLink = [],
    sx,
    admin = false,
    ...other
  } = props;

  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: '100%',
        ...(admin && {
          mb: 3,
        }),
        ...(!admin && {
          p: 3,
          mt: 3,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          background: createGradient(
            theme.palette.primary.main,
            theme.palette.primary.dark
          ),
          borderRadius: '8px',
          border: `1px solid ${theme.palette.primary.main}`,
          '&:before': {
            content: "''",
            position: 'absolute',
            top: '-23%',
            left: '20%',
            transform: 'translateX(-50%)',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0,
          },
          '&:after': {
            content: "''",
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '-3%',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0,
          },
          '& .MuiBreadcrumbs-separator': {
            color: 'common.white',
          },
        }),
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{
          alignItems: { xs: 'start', md: 'center' },
          justifyContent: 'space-between',
          ...(!admin && {
            '&:before': {
              content: "''",
              position: 'absolute',
              bottom: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: alpha(theme.palette.primary.light, 0.5),
              height: { xs: 60, md: 80 },
              width: { xs: 60, md: 80 },
              borderRadius: '50px',
              zIndex: 0,
            },
          }),
        }}
      >
        {/* Left section — Title + Breadcrumbs */}
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textTransform: 'capitalize', width: '80vw' }}
            noWrap
          >
            {heading}
          </Typography>

          <MBreadcrumbs icon={icon} admin={admin} links={links} {...other} />
        </Box>

        {/* Right section — Action Button */}
        {action ? (
          action.href ? (
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                component={NextLink}
                href={action.href}
                startIcon={action.icon ? action.icon : <IoMdAdd size={20} />}
              >
                {action.title}
              </Button>
            </Box>
          ) : (
            action
          )
        ) : null}
      </Stack>

      {/* Optional external links */}
      <Box>
        {isString(moreLink) ? (
          <Link
            href={moreLink}
            target="_blank"
            variant="body2"
            sx={{ color: 'common.white' }}
          >
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              target="_blank"
              variant="body2"
              sx={{ display: 'table', color: 'common.white' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
