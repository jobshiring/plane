import React from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
// mui
import {
  styled,
  useTheme,
  alpha,
  useMediaQuery,
  Fab,
  Box,
  ListItemText,
  List,
  Tooltip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Divider,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

// icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsGrid } from 'react-icons/bs';
import { MdOutlineAirplaneTicket } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsCashCoin } from 'react-icons/bs';
import { LuSlidersVertical } from 'react-icons/lu';

import { CgDarkMode } from 'react-icons/cg';
import { IoAirplaneOutline } from 'react-icons/io5';
import { BsAirplane } from 'react-icons/bs';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { LiaUsersSolid } from 'react-icons/lia';
import { RiBloggerLine } from 'react-icons/ri';

import { MdOutlineRateReview } from 'react-icons/md';

// components
import Scrollbar from '@/components/scrollbar';
import Logo from '@/components/logo';

// Dashboard Side NevLinks
export const navlinks = [
  {
    id: 1,
    title: 'Dashboard',
    slug: 'dashboard',
    icon: <BsGrid />,
  },
  {
    id: 2,
    title: 'Modules',
    slug: 'modules',
    icon: <LuLayoutDashboard />,
    isSearch: true,
  },
  {
    id: 3,
    title: 'Featured Flights',
    slug: 'featured-flights',
    icon: <IoAirplaneOutline />,
    isSearch: true,
  },
  {
    id: 4,
    title: 'Airport Suggestions',
    slug: 'airport-suggestions',
    icon: <BsAirplane />,
    isSearch: true,
  },
  {
    id: 6,
    title: 'Markups',
    slug: 'markups',
    icon: <LuSlidersVertical />,
    isSearch: true,
  },
  {
    id: 7,
    title: 'Bookings',
    slug: 'bookings',
    icon: <MdOutlineAirplaneTicket />,
    isSearch: true,
  },
  {
    id: 8,
    title: 'Featured Partners',
    slug: 'featured-partners',
    icon: <LiaUsersSolid />,
    isSearch: true,
  },
  {
    id: 9,
    title: 'Users',
    slug: 'users',
    icon: <LuUsers />,
    isSearch: true,
  },
  {
    id: 10,
    title: 'Currencies',
    slug: 'currencies',
    icon: <AiOutlineDollarCircle />,
    isSearch: true,
  },
  {
    id: 11,
    title: 'Payment Getways',
    slug: 'payment-getways',
    icon: <BsCashCoin />,
    isSearch: true,
  },
  {
    id: 5,
    title: 'Blogs',
    slug: 'blogs',
    icon: <RiBloggerLine />,
    isSearch: false,
  },
  {
    id: 12,
    title: 'Reviews',
    slug: 'reviews',
    icon: <MdOutlineRateReview />,
    isSearch: false,
  },
  {
    id: 13,
    title: 'Newsletter',
    slug: 'newsletter',
    icon: <SlEnvolopeLetter />,
    isSearch: false,
  },
  {
    id: 14,
    title: 'Settings',
    slug: 'settings',
    icon: <IoSettingsOutline />,
    isSearch: false,
  },
  {
    id: 15,
    title: 'General Settings',
    slug: 'general-settings',
    icon: <CgDarkMode />,
    isSearch: false,
  },
];

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRadius: 0,
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
  },
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0px`,
  borderRadius: 0,
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  zIndex: 999,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Sidebar({ ...props }) {
  const { handleDrawerClose, handleDrawerOpen, open, data } = props;
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = React.useState('');
  const [initial, setInitial] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  React.useEffect(() => {
    setActive(pathname);
    setInitial(true);
  }, [pathname]);
  console.log(active, 'active tab');
  return (
    <div>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '&.MuiDrawer-root': {
            '.MuiPaper-root': {
              overflow: { xs: 'hidden', md: 'unset' },
              zIndex: 998 + '!important',
            },
          },
        }}
      >
        {isMobile ? (
          <DrawerHeader>
            <Logo theme={data.theme} name={data.businessName} />
            <IconButton
              size="small"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{ ml: 'auto' }}
            >
              {open ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </IconButton>
          </DrawerHeader>
        ) : (
          <DrawerHeader />
        )}
        <Divider />
        <Box
          sx={{
            position: 'absolute',
            right: -15,
            top: 85,
            zIndex: 9999999,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Fab
            size="small"
            sx={{
              bgcolor: theme.palette.background.paper,
              border: '1px solid' + theme.palette.divider,
              boxShadow: 'none',
              height: 25,
              minHeight: 25,

              width: 25,
              ':hover': {
                bgcolor: theme.palette.background.paper,
              },
              svg: {
                color: theme.palette.text.primary,
                ml: open ? 0 : 0.2,
                mr: open ? 0.2 : 0,
              },
            }}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            {open ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </Fab>
        </Box>
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <List
            sx={{
              px: 1.5,
              gap: 1,
              display: 'flex',
              flexDirection: 'column',
              py: 2,
            }}
          >
            {navlinks?.map((item) => (
              <ListItem
                key={item.id}
                disablePadding
                sx={{
                  display: 'block',
                  borderRadius: '8px',
                  border: `1px solid transparent`,
                  ...(active === '/admin/' + item.slug &&
                    initial && {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.2),
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      '& .MuiTypography-root': {
                        fontWeight: 600,
                      },
                    }),
                }}
              >
                <Tooltip
                  title={open ? '' : item.title}
                  placement="left"
                  arrow
                  leaveDelay={200}
                >
                  <ListItemButton
                    onClick={() => {
                      setActive(item.slug);
                      router.push('/admin/' + item.slug);
                      isMobile && handleDrawerClose();
                    }}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      borderRadius: '8px',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.title}
                      sx={{
                        overflow: 'hidden',
                        height: open ? 'auto' : 0,
                        textTransform: 'capitalize',
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </div>
  );
}
Sidebar.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
