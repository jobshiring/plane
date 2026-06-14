'use client';
import React from 'react';
import { Container, Stack, Grid, Box, Typography } from '@mui/material';

export default function AboutUs() {
  return (
    <Container fixed sx={{ py: 8 }}>
      <Stack gap={3}>
        <Typography variant="h2" color="text.primary" lineHeight={1}>
          Our Journey to Elevate Flight Booking
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" pb={5}>
          At Vliegtickets AI, zorgen wij met zorgvuldigheid and aandacht voor zakelijke klanten and reizigers
          alike. Our story is one of innovation, dedication, and a commitment to
          excellence.
        </Typography>
      </Stack>

      {/* Content Sections */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Who We Are */}
          <Grid size={{xs:12}}>
            <Typography variant="h4" gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We are a team of experienced developers, designers, and travel
              enthusiasts who came together with a shared vision: to
              revolutionize the flight booking industry. With years of
              experience in web development and a deep understanding of the
              travel sector, we created Reactflights—a cutting-edge platform
              that meets the evolving needs of modern businesses.
            </Typography>
          </Grid>

          {/* Our Mission */}
          <Grid size={{xs:12}}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Our mission is simple: to provide businesses with a robust,
              user-friendly flight booking system that empowers them to offer
              the best possible experience to their customers. We believe that
              booking a flight should be as seamless and stress-free as
              possible, and we’ve worked tirelessly to make that a reality.
            </Typography>
          </Grid>

          {/* Why Choose Reactflights? */}
          <Grid size={{xs:12}}>
            <Typography variant="h4" gutterBottom>
              Why Choose Reactflights?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Reactflights stands out because of our commitment to quality and
              user satisfaction. We understand the challenges businesses face in
              the travel industry, and we’ve designed our platform to address
              those challenges head-on. From our intuitive user interface to our
              powerful admin tools, every aspect of Reactflights is crafted with
              your success in mind.
            </Typography>
          </Grid>

          {/* Our Values */}
          <Grid size={{xs:12}}>
            <Typography variant="h4" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              <ul>
                <li>
                  <strong>Innovation:</strong> We continually push the
                  boundaries of what’s possible in the flight booking space.
                </li>
                <li>
                  <strong>Customer Focus:</strong> Your success is our success.
                  We prioritize your needs at every step.
                </li>
                <li>
                  <strong>Reliability:</strong> You can count on Reactflights to
                  deliver consistent, dependable performance.
                </li>
                <li>
                  <strong>Transparency:</strong> We believe in clear
                  communication and honest business practices.
                </li>
              </ul>
            </Typography>
          </Grid>

          {/* Join Us */}
          <Grid size={{xs:12}}>
            <Typography variant="h4" gutterBottom>
              Join Us on Our Journey
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We’re just getting started. As we continue to grow and evolve, we
              invite you to join us on this exciting journey. Whether you’re a
              business looking for a reliable flight booking system or a
              traveler seeking a better booking experience, Reactflights is here
              to help you reach new heights.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
