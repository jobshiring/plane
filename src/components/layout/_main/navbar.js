'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
  Stack,
  Skeleton,
  Button,
  Drawer,
  IconButton,
  Divider,
  FormGroup,
  FormControl,
  Typography,
  Select,
} from '@mui/material';
import { useSelector, useDispatch, darkMode, settingSlice } from '@/lib/redux';
// next
import dynamic from 'next/dynamic';
import Logo from '@/components/logo';
import { CgMenuRight } from 'react-icons/cg';
import { CgClose } from 'react-icons/cg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoHomeOutline } from 'react-icons/io5';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoMoonOutline } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CurrencySelect from 'src/components/selects/currencySelect';

const UserSelect = dynamic(() => import('src/components/selects/userSelect'), {
  ssr: false,
  loading: () => (
    <Skeleton variant="circular" width={50} height={50} sx={{ minWidth: 50 }} />
  ),
});
// const LocaleSwitcher = dynamic(() => import("src/components/locale-switcher"), {
//   loading: () => (
//     <Skeleton variant="circular" width={50} height={50} sx={{ minWidth: 50 }} />
//   ),
// });

const menu = [
  {
    name: 'Home',
    path: '/',
    icon: <IoHomeOutline />,
  },
  // {
  //   name: 'Flights',
  //   path: '/flights',
  //   icon: <IoAirplaneOutline />,
  // },
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
    icon: <TfiHeadphoneAlt />,
  },
];

export default function Navbar({ ...props }) {
  const { data, contact, currencyData } = props;
  const isDarkMode = useSelector(darkMode);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    dispatch(
      settingSlice.actions.setThemePalette({
        ...data.theme.palette,
        isLoading: false,
      })
    );
    dispatch(settingSlice.actions.setContectInfo(contact));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const [active, setactive] = React.useState('');
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname) {
      setactive(pathname?.split('/')[2] || '');
    }
  }, [pathname]);

  const handleChange = (event) => {
    const selectedMode = event.target.value === 'dark';
    dispatch(settingSlice.actions.changeMode(selectedMode));
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar
        color="inherit"
        sx={{
          position: 'sticky',
          top: 0,
          borderRadius: 0,
          boxShadow: 'none',
          bgcolor: 'background.paper',
          borderBottom: (theme) => '1px solid ' + theme.palette.divider,
        }}
      >
        <Toolbar>
          <Logo theme={data.theme} name={data.businessName} />

          <Box
            sx={{
              flexGrow: 1,
            }}
          />

          <Stack direction="row" gap={1} alignItems={'center'}>
            <Stack
              direction="row"
              sx={{ ml: 8, display: { md: 'flex', xs: 'none' } }}
            >
              {menu.map((item) => (
                <Button
                  variant="text"
                  color="inherit"
                  component={Link}
                  href={item.path}
                  key={item.path}
                  sx={{
                    textTransform: 'capitalize',
                    color:
                      (active === '' && item.name === 'Home') ||
                      active === item.name.toLowerCase()
                        ? 'text.primary'
                        : 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
            <Stack
              direction="row"
              gap={1}
              alignItems={'center'}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Divider orientation="vertical" flexItem sx={{ my: 1 }} />
              {data.multiCurrency ? (
                <CurrencySelect isTop data={currencyData} />
              ) : null}
              <FormGroup>
                <IconButton
                  onClick={() => dispatch(settingSlice.actions.changeMode())}
                >
                  {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </IconButton>
              </FormGroup>
            </Stack>

            <IconButton
              aria-label="sidebar-drawer"
              onClick={() => setOpen(!open)}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <CgMenuRight />
            </IconButton>

            <UserSelect />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { borderRadius: ' 8px 0px 0px 8px' },
        }}
        anchor="right"
      >
        <Stack gap={2} sx={{ width: 260 }}>
          <div>
            <IconButton
              aria-label="drawer-close"
              onClick={() => setOpen(false)}
            >
              <CgClose />
            </IconButton>
          </div>

          <nav aria-label="main mailbox folders">
            <List>
              {menu.map((item) => (
                <ListItem disablePadding key={item.name}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name.replace(/-/g, ' ')} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
          <Divider />
          <Stack gap={1} sx={{ px: 2 }}>
            {/* <LocaleSwitcher /> */}
            {data.multiCurrency ? <CurrencySelect data={currencyData} /> : null}
            <FormControl fullWidth size="small">
              <Typography variant="subtitle2" mb={0.5} color="text.primary">
                Theme Mode
              </Typography>
              <Select
                size="small"
                value={isDarkMode ? 'dark' : 'light'} // Sets value based on current mode
                onChange={handleChange} // Changes the mode on selection
                native
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
}
