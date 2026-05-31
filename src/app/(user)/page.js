import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Hero from 'src/components/_main/home/hero';
import FeaturedFlights from 'src/components/_main/home/featured-flights';
import WhyUS from 'src/components/_main/home/why-us';
import Testimonial from 'src/components/_main/home/testimonial';
import CenterBanner from '@/components/_main/home/center-banner';
import NewsLetter from 'src/components/_main/home/newsletter';
import { _featuredPartners } from '@/_mock/partners';
import { _featuredFlights } from '@/_mock/flights';
import { _reviews } from '@/_mock/reviews';

export default function HomePage() {
  return (
    <Container maxWidth="xl">
      <Stack gap={7}>
        <Hero data={_featuredPartners} />
        <FeaturedFlights data={_featuredFlights} />
        <WhyUS />
        <CenterBanner />
        <Testimonial data={_reviews} />
        <NewsLetter />
      </Stack>
    </Container>
  );
}
