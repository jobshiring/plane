'use client';
import React from 'react';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  Grid,
  IconButton,
  Card,
} from '@mui/material';
import Link from 'next/link';
import Logo from '@/components/logo';
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LuMapPin } from 'react-icons/lu';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaCcMastercard,
  FaCcVisa,
  FaCcStripe,
  FaCcPaypal,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BsInstagram } from 'react-icons/bs';
import { SiWhatsapp } from 'react-icons/si';

const aboutLinks = [
  { title: 'Home', path: '/' },
  { title: 'About us', path: '/about' },
  { title: 'Contact us', path: '/contact' },
  { title: 'Search Flights', path: '/flights' },
];

const legalLinks = [
  { title: 'Privacy Policy', path: '/privacy-policy' },
  { title: 'Terms & Conditions', path: '/terms-conditions' },
  { title: 'FAQs', path: '/faqs' },
];

const socialLinks = [
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/', color: 'primary' },
  { icon: <FaXTwitter />, url: 'https://www.x.com/', color: 'text.primary' },
  {
    icon: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/',
    color: 'primary',
  },
  { icon: <BsInstagram />, url: 'https://www.instagram.com/', color: 'error' },
  { icon: <SiWhatsapp />, url: 'https://www.whatsapp.com/', color: 'success' },
];

const paymentMethods = [
  <FaCcMastercard size={32} key="mastercard" />,
  <FaCcVisa size={32} key="visa" />,
  <FaCcStripe size={32} key="stripe" />,
  <FaCcPaypal size={32} key="paypal" />,
];

export default function Footer() {
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        borderWidth: '1px 0 0 0',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: 6 }}>
          <Grid container justifyContent="center" spacing={6}>
            {/* Company Info Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Logo />
              <Typography variant="body1" mt={1} color="text.secondary">
                React Flights offers a flight booking platform designed for
                flights agencies to enhance their services.
              </Typography>
              <Stack spacing={1} mt={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <LuMapPin size={18} />
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    href="/"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Rattokala PO Khas, Sargodha, Pakistan
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <MdOutlineMailOutline size={18} />
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    href="mailto:kamranansari5580@gmail.com"
                    target="_blank"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    kamranansari5580@gmail.com
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <PiPhoneIncoming size={18} />
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    href="tel:923035501602"
                    target="_blank"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    +92 303 550 1602
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* About Links Section */}
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <Typography variant="h6" mb={1.5}>
                About React Flights
              </Typography>
              <Stack spacing={1.5}>
                {aboutLinks.map((item) => (
                  <Typography
                    key={item.title}
                    variant="subtitle2"
                    component={Link}
                    href={item.path}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      ':hover': {
                        textDecoration: 'underline',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Legal Links Section */}
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <Typography variant="h6" mb={1.5}>
                Legal
              </Typography>
              <Stack spacing={1.5}>
                {legalLinks.map((item) => (
                  <Typography
                    key={item.title}
                    variant="subtitle2"
                    component={Link}
                    href={item.path}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      ':hover': {
                        textDecoration: 'underline',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Payment & Social Section */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="subtitle1">Pay With</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: 'text.secondary' }}
                    mt={1}
                  >
                    {paymentMethods}
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Follow us</Typography>
                  <Stack spacing={1} direction="row" alignItems="center">
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.url}
                        target="_blank"
                        color={social.color}
                        size="small"
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Typography textAlign="center" variant="body1" py={2}>
          © 2026 reactflights.com. All rights reserved.
        </Typography>
      </Container>
    </Card>
  );
}
