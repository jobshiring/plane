'use client';
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
// mui
import {
  styled,
  alpha,
  useMediaQuery,
  useTheme,
  Toolbar,
  IconButton,
  Skeleton,
  Stack,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
// icons
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiMenuAlt3 } from 'react-icons/hi';

// components
import Logo from 'src/components/logo';
import NotificationsPopover from './notification-popover';

// dynamic import
const UserSelect = dynamic(() => import('src/components/selects/userSelect'), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={50} height={50} />,
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  borderBottom: '1px solid ' + theme.palette.divider,
}));

export default function Topbar({ ...props }) {
  const { open, handleDrawerOpen, handleDrawerClose, data, contact } = props;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar
      position="fixed"
      sx={{ borderRadius: 0, boxShadow: 'none', zIndex: 999 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {!isMobile && <Logo theme={data.theme} name={data.businessName} />}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            size="small"
          >
            <HiMenuAlt3 size={24} />
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
          <NotificationsPopover />
          <UserSelect />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
Topbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};
