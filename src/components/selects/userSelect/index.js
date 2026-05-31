'use client'; // Enables Next.js client-side rendering

import React from 'react';

// MUI components for UI elements
import { Avatar, IconButton, Box, Stack, Button } from '@mui/material';

// Custom components
import MenuPopover from 'src/components/popover/popover';
import { UserList } from 'src/components/lists';
import BlurImageAvatar from '@/components/avatar'; // Optimized avatar with blur effect

// Next.js utilities
import { usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';

// Routing constants
import { PATH_PAGE } from 'src/routes/paths';

// Redux hooks for state management
import { useSelector } from 'react-redux';
import { getUser } from '@/redux';

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function UserSelect() {
  const { user, isAuthenticated } = useSelector(getUser);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPath = getKeyByValue(PATH_PAGE.auth, pathname);
  const isHomePath = pathname === '/';
  const anchorRef = React.useRef(null);
  const [openUser, setOpen] = React.useState(false);

  const handleOpenUser = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      setOpen(true);
    }
  };
  const handleCloseUser = () => {
    setOpen(false);
  };
  return (
    <>
      {!isAuthenticated ? (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={{ xs: 1, md: 2 }}
          width={1}
          sx={{ maxWidth: { xs: '100%', md: 210 } }}
        >
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            // size="small"
            onClick={() =>
              router.push(
                `/auth/login${
                  isAuthPath || isHomePath ? '' : `?redirect=${pathname}`
                }`
              )
            }
          >
            Log in
          </Button>
          <Button
            variant="contained"
            // size="small"
            fullWidth
            color="primary"
            onClick={() =>
              router.push(
                `/auth/register${
                  isAuthPath || isHomePath ? '' : `?redirect=${pathname}`
                }`
              )
            }
          >
            Register
          </Button>
        </Stack>
      ) : (
        <Box>
          <IconButton
            ref={anchorRef}
            onClick={handleOpenUser}
            size="small"
            name="user-select"
          >
            {user?.cover?.url ? (
              <BlurImageAvatar
                priority
                alt={user.firstName}
                src={user?.cover?.url}
              />
            ) : (
              <Avatar>{user.firstName.slice(0, 1).toUpperCase()}</Avatar>
            )}
          </IconButton>
          <MenuPopover
            open={openUser}
            onClose={handleCloseUser}
            anchorEl={anchorRef.current}
            sx={{
              width: 300,
            }}
          >
            <UserList
              openUser={openUser}
              isAuthenticated={isAuthenticated}
              user={user}
              setOpen={() => setOpen(false)}
            />
          </MenuPopover>
        </Box>
      )}
    </>
  );
}
