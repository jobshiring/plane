'use client';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import GoogleMapMain from '../google-map';
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LuMapPin } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactUs(props) {
  const { contact } = props;

  return (
    <Box my={8}>
      <Stack
        gap={3}
        sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', mb: 8 }}>
        <Typography
          variant='h2'
          color='text.primary'
          lineHeight={1}>
          Get in Touch with Us
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          pb={1}>
          We’re here to help you with any questions or support you need. Reach
          out to us, and let’s start a conversation!
        </Typography>
      </Stack>

      <Container>
        <Card>
          <CardContent>
            <Typography
              variant='h3'
              mb={4}>
              Contact Us
            </Typography>

            <Grid
              container
              spacing={2}>
              {/* Left Section */}
              <Grid
                item
                size={{ xs: 12, md: 5 }}>
                <Stack spacing={5}>
                  {/* Address */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1.5}>
                    <Box
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                      }}>
                      <LuMapPin size={32} />
                    </Box>
                    <Stack>
                      <Typography
                        variant='h5'
                        noWrap>
                        Address
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        noWrap
                        component={Link}
                        href='/'
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}>
                        {contact.address}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Email */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1.5}>
                    <Box
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                      }}>
                      <MdOutlineMailOutline size={32} />
                    </Box>
                    <Stack>
                      <Typography
                        variant='h5'
                        noWrap>
                        Email
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        noWrap
                        component={Link}
                        href='/'
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}>
                        {contact.email}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Phone */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1.5}>
                    <Box
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                      }}>
                      <PiPhoneIncoming size={32} />
                    </Box>
                    <Stack>
                      <Typography
                        variant='h5'
                        noWrap>
                        Phone
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        noWrap
                        component={Link}
                        href='/'
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}>
                        {contact.phone}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* WhatsApp */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1.5}>
                    <Box
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                      }}>
                      <FaWhatsapp size={32} />
                    </Box>
                    <Stack>
                      <Typography
                        variant='h5'
                        noWrap>
                        Whatsapp
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        noWrap
                        component={Link}
                        href={`https://api.whatsapp.com/send/?phone=${contact.whatsappNo}&text&type=phone_number&app_absent=0`}
                        target='_blank'
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}>
                        {contact.whatsappNo}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              {/* Right Section */}
              <Grid
                item
                size={{ xs: 12, md: 7 }}>
                <GoogleMapMain
                  lat={contact?.lat}
                  long={contact?.long}
                  address={contact.addressOnMap}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
