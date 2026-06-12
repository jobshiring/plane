import React from 'react';
import HotelListing from 'src/components/_main/hotels';

export default function HotelsSlugPage({ params }) {
  const slug = params?.slug || [];
  return <HotelListing slug={slug} />;
}
