'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {
  Stack,
  Skeleton,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { CgMenuRight } from 'react-icons/cg';
import { IoHomeOutline } from 'react-icons/io5';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { MdOutlineArticle } from 'react-icons/md';

const UserSelect = dynamic(() => import('src/components/selects/userSelect'), {
  ssr: false,
  loading: () => (
    <Skeleton variant="circular" width={50} height={50} sx={{ minWidth: 50 }} />
  ),
});

const navigationMenu = [
  {
    name: 'Home',
    path: '/',
    icon: <IoHomeOutline />,
  },
  {
    name: 'About',
    path: '/about',
    icon: <HiOutlineBuildingOffice />,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: <TfiHeadphoneAlt />,
  },
  {
    name: 'Blogs',
    path: '/blogs',
    icon: <MdOutlineArticle />,
  },
];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState('');
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname) {
      setActivePath(pathname || '/');
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigationClick = () => {
    setDrawerOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          top: 0,
          borderRadius: 0,
          boxShadow: 'none',
          bgcolor: 'background.paper',
          borderBottom: (theme) => '1px solid ' + theme.palette.divider,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" gap={1} alignItems="center" height={72}>
            <Logo />

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              aria-label="toggle navigation drawer"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <CgMenuRight />
            </IconButton>
            <Stack direction="row" spacing={4} alignItems="center">
              <Stack
                direction="row"
                spacing={2}
                sx={{ display: { md: 'flex', xs: 'none' } }}
              >
                {navigationMenu.map((item) => (
                  <Typography
                    component={Link}
                    color={activePath === item.path ? 'primary' : 'inherit'}
                    href={item.path}
                    key={item.path}
                    sx={{
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      fontWeight: activePath === item.path ? 500 : 400,
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                ))}
              </Stack>
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                sx={{ display: { md: 'flex', xs: 'none' } }}
              >
                <UserSelect />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Logo />
        </Box>
        <Divider />
        <List>
          {navigationMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={handleNavigationClick}
                selected={activePath === item.path}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      activePath === item.path
                        ? 'primary.main'
                        : 'text.secondary',
                    minWidth: 20,
                    mr: 1,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: activePath === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          sx={{ display: { md: 'none', xs: 'flex' }, p: 2 }}
        >
          <UserSelect />
        </Stack>
      </Drawer>
    </Box>
  );
}
