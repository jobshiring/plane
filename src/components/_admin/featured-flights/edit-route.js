'use client';

import React, { useEffect, useState } from 'react';
import FlightRouteForm from '@/components/forms/flight-route';
import { _featuredFlightsData as FlightRoutes } from 'src/_mock/featured_flights';

export default function EditFlightRoutes({ id }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Trim id just in case
    const routeId = id?.toString().trim();

    // Debug: check all IDs
    console.log(
      'All flight route IDs:',
      FlightRoutes.data.map((r) => r._id)
    );
    console.log('Looking for id:', routeId);

    const foundRoute = FlightRoutes.data.find(
      (route) => route._id.toString().trim() === routeId
    );

    if (foundRoute) {
      setData(foundRoute);
    } else {
      console.warn('Flight route not found for id:', routeId);
      setData(null);
    }

    setIsLoading(false);
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Flight route not found!</div>;

  return <FlightRouteForm flightRoute={data} isLoading={false} />;
}
