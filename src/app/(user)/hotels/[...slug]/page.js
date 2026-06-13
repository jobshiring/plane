import React from 'react';
import HotelListing from 'src/components/_main/hotels';

export default async function HotelsSlugPage({ params }) {
  const { slug } = await params;
  return <HotelListing slug={slug || []} />;
}
