'use client';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useRouter } from '@bprogress/next';

// mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  IconButton,
} from '@mui/material';

// components
import { Popover as MenuPopover } from 'src/components/popover';
import NoDataFoundIllustration from 'src/components/noDataFound/no-data-found';

// icons
import { GoClock } from 'react-icons/go';
import { IoNotificationsOutline, IoRefreshOutline } from 'react-icons/io5';
import { TbCheck, TbChecks } from 'react-icons/tb';

const NotificationPopover = ({
  item,
  onClose,
  setNotifications,
  setTotalUnread,
}) => {
  const router = useRouter();

  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          router.push(`/admin/bookings/${item?.booking}`);

          // Mark notification as opened
          setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, opened: true } : n))
          );

          setTotalUnread((prev) => (prev > 0 ? prev - 1 : 0));

          onClose();
        }}
        sx={{
          bgcolor: (theme) =>
            item?.opened
              ? theme.palette.background.paper
              : 'rgba(145, 158, 171, 0.08)',
        }}
      >
        <ListItemAvatar>
          <Avatar alt={item?.title?.slice(3, 4) || ''} src={item?.avatar} />
        </ListItemAvatar>

        <ListItemText
          secondary={
            <>
              <Typography
                variant="body2"
                color="text.primary"
                dangerouslySetInnerHTML={{ __html: `${item?.title}` }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <GoClock size={14} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDistanceToNow(new Date(item?.createdAt), {
                      locale: enUS,
                    })}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    color: item?.opened ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item?.opened ? (
                    <TbChecks size={16} />
                  ) : (
                    <TbCheck size={16} />
                  )}
                </Box>
              </Stack>
            </>
          }
        />
      </ListItemButton>
      <Divider component="li" />
    </>
  );
};

NotificationPopover.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setNotifications: PropTypes.func.isRequired,
  setTotalUnread: PropTypes.func.isRequired,
};

const SkeletonComponent = () => (
  <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        secondary={
          <>
            <Typography variant="body2" color="text.primary">
              <Skeleton variant="text" />
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Skeleton
                  variant="circular"
                  height={14}
                  width={14}
                  sx={{ mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="text" width={140} />
                </Typography>
              </Stack>
              <Skeleton variant="circular" height={14} width={14} />
            </Stack>
          </>
        }
      />
    </ListItem>
    <Divider component="li" />
  </>
);

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const jsonData = {
    totalNotifications: 10,
    data: [
      {
        id: 1,
        booking: 'BKG123',
        title: 'New booking from <b>John Doe</b>',
        createdAt: '2025-10-25T09:00:00Z',
        opened: false,
        avatar: '/avatars/1.png',
      },
      {
        id: 2,
        booking: 'BKG124',
        title: 'Payment received for <b>Flight #242</b>',
        createdAt: '2025-10-25T07:30:00Z',
        opened: true,
        avatar: '/avatars/2.png',
      },
      {
        id: 3,
        booking: 'BKG125',
        title: 'Your booking <b>has been confirmed</b>',
        createdAt: '2025-10-24T11:00:00Z',
        opened: false,
        avatar: '/avatars/3.png',
      },
      {
        id: 4,
        booking: 'BKG126',
        title: 'New message from <b>Support</b>',
        createdAt: '2025-10-23T15:00:00Z',
        opened: false,
        avatar: '/avatars/4.png',
      },
      {
        id: 5,
        booking: 'BKG127',
        title: 'Booking cancelled for <b>Flight #245</b>',
        createdAt: '2025-10-22T12:00:00Z',
        opened: false,
        avatar: '/avatars/5.png',
      },
      {
        id: 6,
        booking: 'BKG128',
        title: 'Reminder: Check-in for <b>Flight #246</b>',
        createdAt: '2025-10-21T08:00:00Z',
        opened: false,
        avatar: '/avatars/6.png',
      },
      {
        id: 7,
        booking: 'BKG129',
        title: 'Special offer for <b>Flights</b>',
        createdAt: '2025-10-20T09:30:00Z',
        opened: false,
        avatar: '/avatars/7.png',
      },
      {
        id: 8,
        booking: 'BKG130',
        title: 'Payment failed for <b>Flight #247</b>',
        createdAt: '2025-10-19T11:00:00Z',
        opened: false,
        avatar: '/avatars/8.png',
      },
      {
        id: 9,
        booking: 'BKG131',
        title: 'Your booking has been updated',
        createdAt: '2025-10-18T10:00:00Z',
        opened: false,
        avatar: '/avatars/9.png',
      },
      {
        id: 10,
        booking: 'BKG132',
        title: 'New flight schedule released',
        createdAt: '2025-10-17T09:00:00Z',
        opened: false,
        avatar: '/avatars/10.png',
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setNotifications(jsonData.data.slice(0, Math.max(page * 5, 5))); // minimum 5 notifications
      setTotalUnread(jsonData.data.filter((n) => !n.opened).length);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <IoNotificationsOutline size={24} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            px: 2.5,
          }}
        >
          <Typography variant="subtitle1">Notifications</Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Refresh Button */}
            <IconButton
              size="small"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setNotifications(
                    jsonData.data.slice(0, Math.max(page * 5, 5))
                  );
                  setTotalUnread(jsonData.data.filter((n) => !n.opened).length);
                  setIsLoading(false);
                }, 500);
              }}
            >
              <IoRefreshOutline size={18} />
            </IconButton>

            {/* Mark all as Read */}
            <IconButton
              size="small"
              onClick={() => {
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, opened: true }))
                );
                setTotalUnread(0);
              }}
            >
              <TbChecks size={18} />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        {notifications?.length < 1 ? (
          <NoDataFoundIllustration />
        ) : (
          <Box sx={{ height: { xs: 340, sm: 400, md: 460 }, overflow: 'auto' }}>
            <List
              disablePadding
              sx={{ '& .MuiListItemAvatar-root': { mt: 0 } }}
            >
              {isLoading
                ? Array.from(new Array(5)).map((_, idx) => (
                    <SkeletonComponent key={idx} />
                  ))
                : notifications.map((item) => (
                    <NotificationPopover
                      key={item.id}
                      item={item}
                      onClose={handleClose}
                      setNotifications={setNotifications}
                      setTotalUnread={setTotalUnread}
                    />
                  ))}
            </List>

            <Box textAlign="center">
              {!isLoading &&
                jsonData.totalNotifications > notifications.length && (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ my: 2 }}
                    size="small"
                    onClick={() => setPage(page + 1)}
                  >
                    View more
                  </Button>
                )}
            </Box>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}
