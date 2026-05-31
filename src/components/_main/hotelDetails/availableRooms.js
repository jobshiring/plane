'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  Grid,
  Stack,
} from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { TbAirConditioning } from 'react-icons/tb';
import { IoIosArrowForward } from 'react-icons/io';

import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdOutlineMeetingRoom,
} from 'react-icons/md';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
// Images
import Taman from 'public/images/taman.svg';
import Tamara from 'public/images/TAMARA.svg';
// Sample data for 3 rooms

const RoomCard = ({ room }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      {/* Embla Carousel */}
      <Box position="relative">
        <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
          <Box display="flex">
            {room.images.map((src, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',

                  minWidth: '100%',
                  height: 200,

                  // backgroundImage: `url(${src})`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                }}
              >
                <Image
                  src={require('public/images/hotels/' + src)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton
          sx={{ position: 'absolute', top: '45%', left: 8 }}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <MdArrowBackIos />
        </IconButton>
        <IconButton
          sx={{ position: 'absolute', top: '45%', right: 8 }}
          onClick={() => emblaApi?.scrollNext()}
        >
          <MdArrowForwardIos />
        </IconButton>
        <Typography
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: '#fff',
            px: 1,
            borderRadius: 1,
          }}
          variant="caption"
        >
          {`${selectedIndex + 1} of ${room.images.length}`}
        </Typography>
      </Box>

      <CardContent>
        <Stack gap={2}>
          <Typography variant="h5" fontWeight="bold">
            {room.name}
          </Typography>
          <Stack gap={1}>
            <Box display="flex" alignItems="center">
              <AiOutlineFullscreen style={{ marginRight: 8 }} />
              <Typography variant="body1">
                {' '}
                Room size {room.roomSize}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IoBedOutline
                sx={{ fontWeight: '800' }}
                style={{ marginRight: 8 }}
              />
              <Typography variant="body1">{room.roomType}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <MdOutlineMeetingRoom style={{ marginRight: 8 }} />
              <Typography variant="body1">{room.addon}</Typography>
            </Box>

            {room.amenities.includes('Air conditioning') && (
              <Box display="flex" alignItems="center">
                <TbAirConditioning style={{ marginRight: 8 }} />
                <Typography variant="body1">Air conditioning</Typography>
              </Box>
            )}

            {room.amenities.includes('Separate bedroom') && (
              <Box display="flex" alignItems="center">
                <MdOutlineMeetingRoom style={{ marginRight: 8 }} />
                <Typography variant="body1">Separate bedroom</Typography>
              </Box>
            )}
          </Stack>
          <Stack gap={1}>
            <Divider />
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle1">Non-refundable</Typography>
              <IoIosArrowForward />
            </Box>
            <Divider />
          </Stack>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction={'row'} gap={1} alignItems="center">
              <FaUser />
              <Typography variant="body2">x {1}</Typography>
            </Stack>
            <Box textAlign="right">
              <Stack direction={'row'} justifyContent={'end'}>
                <Image
                  alt="image"
                  src={Tamara}
                  width={40}
                  height={24}
                  priority
                ></Image>
                <Image
                  alt="image"
                  src={Taman}
                  width={40}
                  height={24}
                  priority
                ></Image>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Total for (1) Room
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {room.price}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>

      <Box textAlign="center" p={2}>
        <Button variant="contained" color="primary" fullWidth>
          Customize this room
        </Button>
      </Box>
    </Card>
  );
};

const RoomList = ({ rooms }) => {
  return (
    <Grid container spacing={2}>
      {rooms.map((room, index) => (
        <Grid
          item
          size={{ xs: 6, md: 4 }}
          key={room.id || room.name || `room-${index}`}
        >
          <RoomCard room={room} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomList;
