import React from 'react';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import Logo from '@/components/logo';
// icons
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LuMapPin } from 'react-icons/lu';
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

import { SiWhatsapp } from 'react-icons/si';

import { FaCcMastercard } from 'react-icons/fa';
import { FaCcVisa } from 'react-icons/fa';
import { FaCcStripe } from 'react-icons/fa';
import { FaCcPaypal } from 'react-icons/fa';

// import Master from '../../../../public/master.webp';
// import Paypal from '../../../../public/paypal.webp';
// import Stripe from '../../../../public/stripe.jpg';

export default function Footer({ ...props }) {
  const { data } = props;
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 6,
          }}
        >
          <Grid container justifyContent="center" spacing={6}>
            <Grid
              size={{
                lg: 5,
                md: 4,
                xs: 12,
              }}
            >
              <Logo theme={data.theme} name={data.businessName} />
              <Typography variant="body1" mt={1} color="text.secondary">
                {data?.seo?.description}
              </Typography>
              <Stack spacing={1} mt={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <LuMapPin size={18} />
                  <Typography
                    variant="subtitle2"
                    noWrap
                    component={Link}
                    href="/"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {data?.address}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <MdOutlineMailOutline size={18} />
                  <Typography
                    variant="subtitle2"
                    noWrap
                    component={Link}
                    href={'mailto:' + data?.email}
                    target="_blank"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {data?.email}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <PiPhoneIncoming size={18} />
                  <Typography
                    variant="subtitle2"
                    noWrap
                    component={Link}
                    href={'tel:' + data?.phone}
                    target="_blank"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {data?.phone}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              size={{
                lg: 2,
                md: 2,
                xs: 12,
              }}
            >
              <Typography variant="subtitle1" mb={1.5}>
                About ReactFlights
              </Typography>
              <Stack spacing={1.5}>
                {['Home', 'About us', 'Contact us', 'Search Flights'].map(
                  (item, index) => (
                    <Typography
                      key={`footer-link-${index}`}
                      variant="subtitle2"
                      noWrap
                      component={Link}
                      href="/å"
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        ':hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  )
                )}
              </Stack>
            </Grid>
            <Grid
              size={{
                lg: 2,
                md: 2,
                xs: 12,
              }}
            >
              <Typography variant="subtitle1" mb={1.5}>
                Legal
              </Typography>

              <Stack spacing={1.5}>
                {[
                  {
                    title: 'Privacy Policy',
                    link: 'privacy-policy',
                  },
                  {
                    title: 'Terms & Conditions',
                    link: 'terms-conditions',
                  },
                  {
                    title: 'FAQs',
                    link: 'faqs',
                  },
                ].map((item) => (
                  <Typography
                    key={item.link}
                    variant="subtitle2"
                    noWrap
                    component={Link}
                    href={item.link}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      ':hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid
              size={{
                lg: 3,
                md: 4,
                xs: 12,
              }}
            >
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="subtitle1">Pay With</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      color: 'text.secondary',
                    }}
                    mt={1}
                  >
                    <FaCcMastercard size={32} />
                    <FaCcVisa size={32} />
                    <FaCcStripe size={32} />
                    <FaCcPaypal size={32} />
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Follow us</Typography>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <IconButton
                      component={'a'}
                      href={data?.facebook}
                      target="_blank"
                      color="primary"
                      size="small"
                    >
                      <FaFacebookF />
                    </IconButton>
                    <IconButton
                      component={'a'}
                      href={data?.twitter}
                      target="_blank"
                      sx={{
                        color: 'text.primary',
                      }}
                      size="small"
                    >
                      <FaXTwitter />
                    </IconButton>
                    <IconButton
                      component={'a'}
                      href={data?.linkedin}
                      target="_blank"
                      color="primary"
                      size="small"
                    >
                      <FaLinkedinIn />
                    </IconButton>
                    <IconButton
                      component={'a'}
                      href={data?.instagram}
                      target="_blank"
                      color="error"
                      size="small"
                    >
                      <BsInstagram />
                    </IconButton>
                    <IconButton
                      component={'a'}
                      href={data?.whatsapp}
                      target="_blank"
                      color="success"
                      size="small"
                    >
                      <SiWhatsapp />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Typography textAlign="center" variant="body1" py={2}>
          © 2024 reactflights.com. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
