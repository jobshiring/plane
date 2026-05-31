'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  MenuItem,
  Select,
  Menu,
  Grid,
  Card,
  Divider,
} from '@mui/material';

// MUI components for styling and UI elements
import { styled, alpha } from '@mui/material/styles';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'; // Plus & minus icons for increment/decrement
import { IoMdClose as Close } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa6'; // Downward arrow icon
import { IoPeopleOutline } from 'react-icons/io5'; // People outline icon
import { GoDotFill } from 'react-icons/go';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    // minWidth: 320,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
export default function HotelTravelerSelector({ travelers, setTravelers }) {
  // State for rooms
  const [rooms, setRooms] = useState(travelers);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle adult count change
  const handleAdultChange = (roomId, increment) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const currentAdults = room.adults;
          const totalTravelers = currentAdults + room.children.length;

          // Ensure at least 1 adult and max 8 travelers per room
          if (increment && totalTravelers < 8) {
            return { ...room, adults: currentAdults + 1 };
          } else if (!increment && currentAdults > 1) {
            return { ...room, adults: currentAdults - 1 };
          }
        }
        return room;
      })
    );
  };

  // Handle child count change
  const handleChildChange = (roomId, increment) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const currentChildren = room.children;
          const totalTravelers = room.adults + currentChildren.length;

          if (increment && totalTravelers < 8) {
            return {
              ...room,
              children: [...currentChildren, { age: 1 }],
            };
          } else if (!increment && currentChildren.length > 0) {
            const newChildren = [...currentChildren];
            newChildren.pop();
            return { ...room, children: newChildren };
          }
        }
        return room;
      })
    );
  };

  // Handle child age change
  const handleChildAgeChange = (roomId, childIndex, age) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const newChildren = [...room.children];
          newChildren[childIndex] = { age };
          return { ...room, children: newChildren };
        }
        return room;
      })
    );
  };

  // Add a new room
  const addRoom = () => {
    if (rooms.length < 4) {
      const newRoomId = Math.max(...rooms.map((room) => room.id)) + 1;
      setRooms([...rooms, { id: newRoomId, adults: 1, children: [] }]);
    }
  };

  // Remove a room
  const removeRoom = (roomId) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((room) => room.id !== roomId));
    }
  };

  // Generate age options from 1 to 17
  const ageOptions = Array.from({ length: 17 }, (_, i) => i + 1);
  // Calculate totals
  const totalRooms = rooms.length;
  const totalTravelers = rooms.reduce((sum, room) => {
    return sum + room.adults + room.children.length;
  }, 0);

  // Create adults string in format "roomIndex_adultCount_adults, ..."
  const adultsString = rooms
    .map((room, index) => `${index}_${room.adults}_adults`)
    .join(',');

  // Create childrens string in format "roomIndex_childAge_children, ..."
  const childrenString = rooms
    .flatMap((room, roomIndex) =>
      room.children.map((child) => `${roomIndex}_${child.age}_children`)
    )
    .join(',');

  // Create the final object
  const travelerData = {
    rooms: totalRooms,
    adults: adultsString,
    childrens: childrenString,
  };

  useEffect(() => {
    setTravelers(travelerData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        color="text.primary"
        onClick={handleClick}
        fullWidth
        endIcon={<FaAngleDown />}
        sx={{
          justifyContent: 'space-between',
          bgcolor: 'transparent',
          minHeight: 56,
          fontSize: 14,
          fontWeight: 500,
          svg: {
            color: 'text.secondary',
          },
          '& .MuiButton-endIcon': {
            svg: {
              fontSize: 16,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            },
          },
          border: (theme) => '1px solid ' + theme.palette.divider,
          ...(open && {
            border: (theme) => '1px solid ' + theme.palette.primary.main,
            outline: (theme) => '1px solid ' + theme.palette.primary.main,
          }),
          '&:hover': {
            bgcolor: 'transparent',
            border: (theme) => '1px solid ' + theme.palette.text.primary,
          },
          textTransform: 'capitalize',
        }}
      >
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          component={Typography}
          color="text.primary"
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          <IoPeopleOutline fontSize={20} />
          {totalTravelers} Guest{totalTravelers > 1 ? 's' : ''} <GoDotFill />
          {totalRooms} Room{totalRooms > 1 ? 's' : ''}
        </Stack>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Stack gap={1} sx={{ px: 2, py: 1 }}>
          {rooms.map((room) => (
            <Stack
              gap={1.5}
              key={room.id}
              sx={{
                bgcolor: 'background.paper',
                border: (theme) => '1px solid ' + theme.palette.divider,
                borderRadius: 1,
                boxShadow: 'none!important',
              }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={1}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}
                >
                  {/* <Hotel sx={{ color: "primary.main", mr: 1 }} /> */}
                  <Typography color="text.primary" variant="h6">
                    Room {room.id}
                  </Typography>
                </Box>

                {room.id !== 1 && (
                  <IconButton onClick={() => removeRoom(room.id)}>
                    <Close />
                  </IconButton>
                )}
              </Stack>
              <Divider />
              <Stack gap={1} p={2}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Typography
                      color="text.primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Adult
                    </Typography>
                    <Stack
                      direction={'row'}
                      gap={1}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      component={Card}
                      sx={{
                        boxShadow: 'none!important',
                        p: 0.5,
                      }}
                    >
                      <IconButton
                        onClick={() => handleAdultChange(room.id, false)}
                        disabled={room.adults <= 1}
                        sx={{ color: 'primary.main' }}
                      >
                        <CiCircleMinus />
                      </IconButton>
                      <Typography color="text.primary" variant="h6" width={16}>
                        {room.adults}
                      </Typography>
                      <IconButton
                        onClick={() => handleAdultChange(room.id, true)}
                        disabled={room.adults + room.children.length >= 8}
                        sx={{ color: 'primary.main' }}
                      >
                        <CiCirclePlus />
                      </IconButton>
                    </Stack>
                  </Grid>

                  <Grid size={6}>
                    <Typography
                      color="text.primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Child
                    </Typography>
                    <Stack
                      direction={'row'}
                      gap={1}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      component={Card}
                      sx={{
                        boxShadow: 'none!important',

                        p: 0.5,
                      }}
                    >
                      <IconButton
                        onClick={() => handleChildChange(room.id, false)}
                        disabled={room.children.length <= 0}
                        sx={{ color: 'primary.main' }}
                      >
                        <CiCircleMinus />
                      </IconButton>
                      <Typography color="text.primary" variant="h6" width={16}>
                        {room.children.length}
                      </Typography>
                      <IconButton
                        onClick={() => handleChildChange(room.id, true)}
                        disabled={room.adults + room.children.length >= 8}
                        sx={{ color: 'primary.main' }}
                      >
                        <CiCirclePlus />
                      </IconButton>
                    </Stack>
                    {room.children.length > 0 && (
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
                      >
                        From 1 to 17 years
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {room.children.length > 0 && (
                  <Box>
                    <Grid container spacing={2}>
                      {room.children.map((child, index) => (
                        <Grid size={6} key={index}>
                          <Typography
                            color="text.primary"
                            variant="body2"
                            gutterBottom
                            fontWeight={600}
                          >
                            Child {index + 1} age *
                          </Typography>
                          <Select
                            value={child.age}
                            onChange={(e) =>
                              handleChildAgeChange(
                                room.id,
                                index,
                                Number(e.target.value)
                              )
                            }
                            fullWidth
                          >
                            {ageOptions.map((age) => (
                              <MenuItem key={age} value={age}>
                                {age}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Stack>
            </Stack>
          ))}

          {rooms.length < 4 && (
            <Button
              startIcon={<CiCirclePlus />}
              onClick={addRoom}
              sx={{
                color: 'primary.main',
                justifyContent: 'center',
                width: '100%',
                py: 1.5,
              }}
            >
              Add Room
            </Button>
          )}
        </Stack>
      </StyledMenu>
    </div>
  );
}
