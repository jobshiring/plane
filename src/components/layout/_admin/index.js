'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// components
import DashboardAppbar from './topbar';
import DashboardSidebar from './sidebar';

// styles
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer({ children, data, contact }) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardAppbar
        open={open}
        data={data}
        contact={contact}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <DashboardSidebar
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
        data={data}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

MiniDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any,
  contact: PropTypes.any,
};
