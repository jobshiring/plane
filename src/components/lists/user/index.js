import React from 'react';
import { useRouter } from '@bprogress/next'; // Handles navigation with a progress bar effect
import { usePathname } from 'next/navigation'; // Gets the current route path

// Redux
import { useDispatch } from 'react-redux'; // Dispatches actions to update the global state
import { setLogout } from '@/redux/slices/user/user'; // Action to handle user logout

// Material-UI Components
import {
  Typography,
  Divider,
  ListItemIcon,
  Button,
  MenuItem,
  Box,
} from '@mui/material';

// Icons
import { LuLogOut } from 'react-icons/lu'; // Logout icon
import { MdKey } from 'react-icons/md'; // Key icon for password management
import { LiaFileInvoiceSolid } from 'react-icons/lia'; // Invoice icon
import { SlHome } from 'react-icons/sl'; // Home icon
import { TbUserSquareRounded } from 'react-icons/tb'; // User profile icon
import { BsGrid1X2 } from 'react-icons/bs';

// Styled Components
import RootStyled from './styled'; // Custom styled component

// Utility Functions
import { deleteSession } from '@/hooks/session'; // Function to remove user session data

// PropTypes
import PropTypes from 'prop-types'; // Defines expected component props

UserList.propTypes = {
  openUser: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default function UserList({ ...props }) {
  const { openUser, user, setOpen } = props;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleLogout = () => {
    if (pathname.includes('admin') || pathname.includes('profile')) {
      router.push('/auth/login');
    }
  };

  return (
    <RootStyled autoFocusItem={openUser} id="composition-menu">
      <Box px={2}>
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight={600}
          noWrap
        >
          {user?.firstName + ' ' + user?.lastName}{' '}
          {user?.role === 'admin' ? '( Admin )' : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary" pb={1} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuItem
        className="menu-item"
        onClick={() => {
          router.push('/');
          setOpen(false);
        }}
      >
        <ListItemIcon className="menu-icon">
          <SlHome />
        </ListItemIcon>
        Home
      </MenuItem>
      {user.role === 'admin' && (
        <MenuItem
          onClick={() => {
            setOpen(false);
            router.push('/admin/dashboard');
          }}
        >
          <ListItemIcon className="menu-icon">
            <BsGrid1X2 />
          </ListItemIcon>
          Admin Dashboard
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          setOpen(false);
          router.push('/invoice');
        }}
      >
        <ListItemIcon className="menu-icon">
          <LiaFileInvoiceSolid />
        </ListItemIcon>
        Bookings
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          router.push(
            user.role === 'admin' || user.role === 'super admin'
              ? '/admin/settings'
              : '/profile/general'
          );
        }}
      >
        <ListItemIcon className="menu-icon">
          <TbUserSquareRounded />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          router.push(
            user.role === 'admin' || user.role === 'super admin'
              ? '/admin/settings/change-password'
              : '/profile/change-password'
          );
        }}
      >
        <ListItemIcon className="menu-icon">
          <MdKey />
        </ListItemIcon>
        Change Password
      </MenuItem>
      <Box px={2} mt={1}>
        <Button
          onClick={() => {
            deleteSession();
            dispatch(setLogout());
            setOpen(false);
            toggleLogout();
          }}
          variant="outlined"
          color="inherit"
          startIcon={<LuLogOut />}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </RootStyled>
  );
}
